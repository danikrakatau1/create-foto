import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {sceneConfig} from './scene-config';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const easeOutCubic=(p)=>1-Math.pow(1-p,3);

const motionFor=(motion,t)=>{
  switch(motion){
    case 'fuji-still': case 'structure-still': return {x:0,y:0,rotation:0,scale:1};
    case 'cloud-right-soft': return {x:7*Math.sin(t*.20),y:1.2*Math.sin(t*.16),rotation:0,scale:1};
    case 'cloud-left-soft': return {x:-6*Math.sin(t*.18),y:1*Math.sin(t*.15),rotation:0,scale:1};
    case 'micro-sway-left': return {x:0,y:0,rotation:.08*Math.sin(t*.26),scale:1};
    case 'micro-sway-right': return {x:0,y:0,rotation:-.07*Math.sin(t*.25),scale:1};
    case 'sakura-left-soft': return {x:0,y:0,rotation:.12*Math.sin(t*.30),scale:1};
    case 'sakura-right-soft': return {x:0,y:0,rotation:-.11*Math.sin(t*.28),scale:1};
    case 'side-sway-soft': return {x:0,y:0,rotation:.10*Math.sin(t*.27),scale:1};
    default:return {x:0,y:0,rotation:0,scale:1};
  }
};

const ArtworkLayer=({layer})=>{
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  if(layer.kind==='background'){
    const p=easeOutCubic(interpolate(frame,[0,9*fps],[0,1],clamp));
    return <Img src={staticFile(`assets/${layer.file}`)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:layer.z,transform:`translateY(${interpolate(p,[0,1],[4,0])}px) scale(${interpolate(p,[0,1],[1.008,1.018])})`,transformOrigin:'50% 48%'}}/>;
  }
  const startFrame=Math.round((layer.start||0)*fps); const localFrame=Math.max(0,frame-startFrame);
  const reveal=spring({frame:localFrame,fps,config:{damping:30,stiffness:52,mass:1.0},durationInFrames:36});
  const opacity=interpolate(localFrame,[0,18],[0,1],clamp);
  const living=motionFor(layer.motion,localFrame/fps);
  const enterX=(layer.enterX||0)*(1-reveal), enterY=(layer.enterY||0)*(1-reveal);
  return <div style={{position:'absolute',left:layer.x,top:layer.y,width:layer.width,opacity,zIndex:layer.z,transformOrigin:layer.origin||'50% 50%',transform:`translate(-50%,-50%) translate(${enterX+living.x}px,${enterY+living.y}px) scale(${(.992+reveal*.008)*living.scale}) rotate(${(layer.rotation||0)+living.rotation}deg)`}}><Img src={staticFile(`assets/${layer.file}`)} style={{display:'block',width:'100%',height:'auto'}}/></div>;
};

const ReferencePetals=()=>{
  const frame=useCurrentFrame(); const {fps}=useVideoConfig();
  // Petals are CSS silhouettes derived from the existing sakura palette: no foreign SVG asset.
  const petals=[
    {x:118,y:380,s:18,d:.8,vx:20,vy:40,r:-20},
    {x:925,y:470,s:14,d:1.6,vx:-14,vy:36,r:25},
    {x:790,y:210,s:11,d:2.5,vx:-10,vy:32,r:-28},
    {x:300,y:610,s:13,d:3.4,vx:15,vy:34,r:22},
    {x:1010,y:760,s:10,d:4.4,vx:-18,vy:30,r:-18},
  ];
  return <>{petals.map((p,i)=>{const t=frame/fps-p.d;if(t<0)return null;const life=interpolate(t,[0,.35,4.6,5.5],[0,.78,.62,0],clamp);const x=p.x+p.vx*t+8*Math.sin(t*.9+i);const y=p.y+p.vy*t+4*Math.sin(t*1.1+i);return <div key={i} style={{position:'absolute',left:x,top:y,width:p.s,height:p.s*.62,zIndex:9,opacity:life,background:'linear-gradient(135deg,rgba(247,191,195,.92),rgba(230,137,150,.88))',borderRadius:'75% 18% 75% 18%',transform:`rotate(${p.r*t}deg)`,filter:'blur(.15px)'}}/>;})}</>;
};

const InvitationPanel=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();const start=6.15*fps;if(frame<start)return null;const grow=easeOutCubic(interpolate(frame,[start,start+42],[0,1],clamp));const opacity=interpolate(frame,[start,start+18],[0,.9],clamp);const borderP=interpolate(frame,[6.85*fps,8.15*fps],[0,1],clamp);const path='M120 24 Q380 -8 640 24 Q704 34 726 94 L726 150 L758 150 L758 1128 L726 1128 L726 1184 Q380 1322 34 1184 L34 1128 L2 1128 L2 150 L34 150 L34 94 Q56 34 120 24 Z';return <div style={{position:'absolute',left:540,top:1020,width:710,height:1240,zIndex:7,opacity,transform:`translate(-50%,-50%) scale(${interpolate(grow,[0,1],[.965,1],clamp)})`,pointerEvents:'none'}}><svg viewBox="0 0 760 1325" width="100%" height="100%"><path d={path} fill="rgba(248,244,233,.86)"/><path d={path} fill="none" stroke="rgba(112,30,38,.88)" strokeWidth="3" vectorEffect="non-scaling-stroke" pathLength="1" strokeDasharray="1" strokeDashoffset={1-borderP} strokeLinecap="round"/></svg></div>};

export const JapaneseScene=()=>{const frame=useCurrentFrame();const {fps}=useVideoConfig();const p=easeOutCubic(interpolate(frame,[0,9*fps],[0,1],clamp));const cameraScale=interpolate(p,[0,1],[1,1.012],clamp);const cameraY=interpolate(p,[0,1],[3,-3],clamp);return <AbsoluteFill style={{backgroundColor:'#f4f0e7',overflow:'hidden'}}><AbsoluteFill style={{transform:`translateY(${cameraY}px) scale(${cameraScale})`,transformOrigin:'50% 48%'}}>{sceneConfig.layers.map(layer=><ArtworkLayer key={layer.id} layer={layer}/>)}</AbsoluteFill><ReferencePetals/><InvitationPanel/><AbsoluteFill style={{pointerEvents:'none',background:'radial-gradient(circle at 50% 42%,rgba(255,255,255,0) 70%,rgba(62,45,34,.035) 100%)',zIndex:50}}/></AbsoluteFill>};
