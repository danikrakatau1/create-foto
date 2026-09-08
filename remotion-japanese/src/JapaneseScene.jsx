import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {sceneConfig} from './scene-config';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'};
const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

const motionFor = (motion, t) => {
  switch (motion) {
    case 'fuji-still':
    case 'structure-still':
      return {x: 0, y: 0, rotation: 0, scale: 1};
    case 'cloud-right-soft':
      return {x: 5.0 * Math.sin(t * 0.22), y: 0.8 * Math.sin(t * 0.17), rotation: 0, scale: 1};
    case 'cloud-left-soft':
      return {x: -4.6 * Math.sin(t * 0.21), y: 0.7 * Math.sin(t * 0.16), rotation: 0, scale: 1};
    case 'micro-sway-left':
      return {x: 0, y: 0, rotation: 0.045 * Math.sin(t * 0.28), scale: 1};
    case 'micro-sway-right':
      return {x: 0, y: 0, rotation: -0.04 * Math.sin(t * 0.27), scale: 1};
    case 'sakura-left-soft':
      return {x: 0, y: 0, rotation: 0.07 * Math.sin(t * 0.28), scale: 1};
    case 'sakura-right-soft':
      return {x: 0, y: 0, rotation: -0.065 * Math.sin(t * 0.27), scale: 1};
    case 'side-sway-soft':
      return {x: 0, y: 0, rotation: 0.05 * Math.sin(t * 0.25), scale: 1};
    default:
      return {x: 0, y: 0, rotation: 0, scale: 1};
  }
};

const ArtworkLayer = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  if (layer.kind === 'background') {
    const p = easeOutCubic(interpolate(frame, [0, 5.5 * fps], [0, 1], clamp));
    return <Img src={staticFile(`assets/${layer.file}`)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:layer.z,transform:`translateY(${interpolate(p,[0,1],[10,0])}px) scale(${interpolate(p,[0,1],[1.016,1.003])})`,transformOrigin:'50% 50%'}} />;
  }

  const startFrame = Math.round((layer.start || 0) * fps);
  const localFrame = Math.max(0, frame - startFrame);
  const reveal = spring({frame:localFrame,fps,config:{damping:28,stiffness:48,mass:1.05},durationInFrames:42});
  const opacity = interpolate(localFrame,[0,24],[0,1],clamp);
  const enterX = (layer.enterX || 0) * (1 - reveal);
  const enterY = (layer.enterY || 0) * (1 - reveal);
  const enterScale = 0.985 + reveal * 0.015;
  const living = motionFor(layer.motion, localFrame / fps);
  const flipX = layer.flipX ? -1 : 1;
  const rotation = (layer.rotation || 0) + living.rotation;

  return <div style={{position:'absolute',left:layer.x,top:layer.y,width:layer.width,opacity,zIndex:layer.z,transformOrigin:layer.origin || '50% 50%',transform:`translate(-50%, -50%) translate(${enterX + living.x}px, ${enterY + living.y}px) scale(${enterScale * living.scale}) rotate(${rotation}deg) scaleX(${flipX})`}}><Img src={staticFile(`assets/${layer.file}`)} style={{display:'block',width:'100%',height:'auto'}} /></div>;
};

const InvitationPanel = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = 6.35 * fps;
  if (frame < start) return null;
  const grow = easeOutCubic(interpolate(frame,[start,start+46],[0,1],clamp));
  const opacity = interpolate(frame,[start,start+20],[0,0.92],clamp);
  const borderP = interpolate(frame,[7.25*fps,8.75*fps],[0,1],clamp);
  const path='M120 24 Q380 -8 640 24 Q704 34 726 94 L726 150 L758 150 L758 1128 L726 1128 L726 1184 Q380 1322 34 1184 L34 1128 L2 1128 L2 150 L34 150 L34 94 Q56 34 120 24 Z';
  return <div style={{position:'absolute',left:540,top:1020,width:720,height:1260,zIndex:7,opacity,transform:`translate(-50%, -50%) scale(${interpolate(grow,[0,1],[0.94,1],clamp)})`,transformOrigin:'50% 50%',pointerEvents:'none'}}><svg viewBox="0 0 760 1325" width="100%" height="100%" style={{display:'block',overflow:'visible'}}><path d={path} fill="rgba(248,244,233,0.88)"/><path d={path} fill="none" stroke="rgba(112,30,38,0.90)" strokeWidth="3" vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1" strokeDashoffset={1-borderP} strokeLinecap="round" strokeLinejoin="round"/></svg></div>;
};

export const JapaneseScene = () => {
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const build=easeOutCubic(interpolate(frame,[0,5.5*fps],[0,1],clamp));
  const cameraScale=interpolate(build,[0,1],[1.012,1],clamp);
  const cameraY=interpolate(build,[0,1],[8,0],clamp);
  return <AbsoluteFill style={{backgroundColor:'#f4f0e7',overflow:'hidden'}}><AbsoluteFill style={{transform:`translateY(${cameraY}px) scale(${cameraScale})`,transformOrigin:'50% 50%'}}>{sceneConfig.layers.map((layer)=><ArtworkLayer key={layer.id} layer={layer}/>)}</AbsoluteFill><InvitationPanel/><AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(circle at 50% 42%, rgba(255,255,255,0) 68%, rgba(62,45,34,0.045) 100%)',zIndex:50}}/></AbsoluteFill>;
};
