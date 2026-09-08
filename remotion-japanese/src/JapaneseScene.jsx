import React from 'react';
import {AbsoluteFill,Img,interpolate,spring,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {sceneConfig} from './scene-config';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'};
const easeOutCubic=(p)=>1-Math.pow(1-p,3);

const motionFor=(motion,t)=>{
  switch(motion){
    case 'fuji-still':
    case 'structure-still':
    case 'flower-anchor-a':
    case 'flower-anchor-c':
      return {x:0,y:0,rotation:0,scale:1};
    case 'cloud-right-soft': return {x:4.2*Math.sin(t*.24),y:.7*Math.sin(t*.18),rotation:0,scale:1};
    case 'cloud-left-soft': return {x:-3.8*Math.sin(t*.23),y:.6*Math.sin(t*.17),rotation:0,scale:1};
    case 'micro-sway-left': return {x:0,y:0,rotation:.05*Math.sin(t*.26),scale:1};
    case 'micro-sway-right': return {x:0,y:0,rotation:-.045*Math.sin(t*.25),scale:1};
    case 'sakura-left-soft': return {x:0,y:0,rotation:.08*Math.sin(t*.27),scale:1};
    case 'sakura-right-soft': return {x:0,y:0,rotation:-.075*Math.sin(t*.26),scale:1};
    case 'side-sway-soft': return {x:0,y:0,rotation:.06*Math.sin(t*.24),scale:1};
    default:return {x:0,y:0,rotation:0,scale:1};
  }
};

const ArtworkLayer=({layer})=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();

  if(layer.kind==='background'){
    const p=easeOutCubic(interpolate(frame,[0,6*fps],[0,1],clamp));
    return <Img src={staticFile(`assets/${layer.file}`)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',zIndex:layer.z,transform:`scale(${interpolate(p,[0,1],[1.018,1.006])})`,transformOrigin:'50% 48%'}}/>;
  }

  const startFrame=Math.round((layer.start||0)*fps);
  const localFrame=Math.max(0,frame-startFrame);
  const reveal=spring({frame:localFrame,fps,config:{damping:27,stiffness:52,mass:1.08},durationInFrames:40});
  const opacity=interpolate(localFrame,[0,22],[0,1],clamp);
  const living=motionFor(layer.motion,localFrame/fps);
  const enterX=(layer.enterX||0)*(1-reveal);
  const enterY=(layer.enterY||0)*(1-reveal);
  const scale=.982+reveal*.018;
  const rotation=(layer.rotation||0)+living.rotation;
  const flipX=layer.flipX?-1:1;

  return <div style={{position:'absolute',left:layer.x,top:layer.y,width:layer.width,opacity,zIndex:layer.z,transformOrigin:layer.origin||'50% 50%',transform:`translate(-50%,-50%) translate(${enterX+living.x}px,${enterY+living.y}px) scale(${scale*living.scale}) rotate(${rotation}deg) scaleX(${flipX})`}}><Img src={staticFile(`assets/${layer.file}`)} style={{display:'block',width:'100%',height:'auto'}}/></div>;
};

const ReferencePetals=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const petals=[
    {x:135,y:330,s:18,d:1.55,dx:70,dy:145,r:-55},
    {x:940,y:245,s:14,d:2.00,dx:-55,dy:125,r:70},
    {x:805,y:470,s:12,d:2.45,dx:-36,dy:110,r:48},
    {x:285,y:555,s:15,d:2.85,dx:48,dy:118,r:-62},
  ];
  return <>{petals.map((p,i)=>{const t=Math.max(0,frame/fps-p.d);const life=interpolate(t,[0,.35,2.7,3.6],[0,.82,.68,0],clamp);const x=p.x+p.dx*(t/3.6)+6*Math.sin(t*1.1+i);const y=p.y+p.dy*(t/3.6)+4*Math.sin(t*1.35+i);const r=p.r*(t/3.6);return <Img key={i} src={staticFile('assets/sakura-cc0.svg')} style={{position:'absolute',left:x,top:y,width:p.s,opacity:life,zIndex:12,transform:`rotate(${r}deg)`,transformOrigin:'50% 50%'}}/>})}</>;
};

export const JapaneseScene=()=>{
  const frame=useCurrentFrame();
  const {fps}=useVideoConfig();
  const p=easeOutCubic(interpolate(frame,[0,6*fps],[0,1],clamp));
  const scale=interpolate(p,[0,1],[1.014,1.028],clamp);
  const y=interpolate(p,[0,1],[7,-5],clamp);

  return <AbsoluteFill style={{backgroundColor:'#f4f0e7',overflow:'hidden'}}>
    <AbsoluteFill style={{transform:`translateY(${y}px) scale(${scale})`,transformOrigin:'50% 50%'}}>
      {sceneConfig.layers.map(layer=><ArtworkLayer key={layer.id} layer={layer}/>)}
    </AbsoluteFill>
    <ReferencePetals/>
    <AbsoluteFill style={{pointerEvents:'none',zIndex:50,background:'radial-gradient(circle at 50% 42%, rgba(255,255,255,0) 70%, rgba(68,52,40,0.045) 100%)'}}/>
  </AbsoluteFill>;
};
