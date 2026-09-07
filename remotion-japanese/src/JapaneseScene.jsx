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

const clamp = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
};

const motionFor = (motion, t) => {
  switch (motion) {
    case 'fuji':
      return {x: 0, y: -4 * Math.sin(t * 0.42), rotation: 0, scale: 1 + 0.0035 * Math.sin(t * 0.34)};
    case 'cloud-right':
      return {x: 24 * Math.sin(t * 0.38), y: 5 * Math.sin(t * 0.27), rotation: 0, scale: 1};
    case 'cloud-left':
      return {x: -20 * Math.sin(t * 0.34), y: 4 * Math.sin(t * 0.24), rotation: 0, scale: 1};
    case 'sway-left':
      return {x: 0, y: 0, rotation: 0.75 * Math.sin(t * 0.58), scale: 1};
    case 'sway-right':
      return {x: 0, y: 0, rotation: -0.68 * Math.sin(t * 0.54), scale: 1};
    case 'sakura-left':
      return {x: 0, y: 1.5 * Math.sin(t * 0.5), rotation: 0.95 * Math.sin(t * 0.68), scale: 1};
    case 'sakura-right':
      return {x: 0, y: 1.5 * Math.sin(t * 0.47), rotation: -0.88 * Math.sin(t * 0.64), scale: 1};
    case 'side-sway':
      return {x: -6 * Math.sin(t * 0.5), y: 1.5 * Math.sin(t * 0.4), rotation: 0.55 * Math.sin(t * 0.52), scale: 1};
    case 'flower-a':
      return {x: 0, y: -4 * Math.sin(t * 0.46), rotation: 0.24 * Math.sin(t * 0.42), scale: 1};
    case 'flower-b':
      return {x: 0, y: -3 * Math.sin(t * 0.42), rotation: -0.18 * Math.sin(t * 0.38), scale: 1};
    case 'flower-c':
      return {x: 0, y: -4.5 * Math.sin(t * 0.44), rotation: -0.24 * Math.sin(t * 0.4), scale: 1};
    default:
      return {x: 0, y: 0, rotation: 0, scale: 1};
  }
};

const ArtworkLayer = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const startFrame = Math.round(layer.start * fps);
  const revealFrames = 30;
  const localFrame = Math.max(0, frame - startFrame);
  const reveal = spring({
    frame: localFrame,
    fps,
    config: {damping: 18, stiffness: 95, mass: 0.85},
    durationInFrames: revealFrames,
  });
  const opacity = interpolate(localFrame, [0, 18], [0, 1], clamp);
  const enterX = (layer.enterX || 0) * (1 - reveal);
  const enterY = (layer.enterY || 0) * (1 - reveal);
  const enterScale = 0.975 + reveal * 0.025;
  const t = localFrame / fps;
  const living = motionFor(layer.motion, t);

  if (layer.kind === 'background') {
    const p = interpolate(frame, [0, sceneConfig.durationSeconds * fps - 1], [0, 1], clamp);
    const backgroundScale = 1.045 - p * 0.02;
    const backgroundY = 8 - p * 12;
    return (
      <Img
        src={staticFile(`assets/${layer.file}`)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: layer.z,
          transform: `translateY(${backgroundY}px) scale(${backgroundScale})`,
          transformOrigin: '50% 50%',
        }}
      />
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: layer.x,
        top: layer.y,
        width: layer.width,
        opacity,
        zIndex: layer.z,
        transformOrigin: layer.origin || '50% 50%',
        transform: `translate(-50%, -50%) translate(${enterX + living.x}px, ${enterY + living.y}px) scale(${enterScale * living.scale}) rotate(${living.rotation}deg)`,
      }}
    >
      <Img
        src={staticFile(`assets/${layer.file}`)}
        style={{display: 'block', width: '100%', height: 'auto'}}
      />
    </div>
  );
};

const CenterPanel = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const start = sceneConfig.panelStart * fps;
  const p = interpolate(frame, [start, start + 28], [0, 1], clamp);
  const scale = interpolate(p, [0, 1], [0.965, 1]);
  const y = interpolate(p, [0, 1], [22, 0]);

  return (
    <div
      style={{
        position: 'absolute',
        left: 540,
        top: 1035,
        width: 610,
        height: 720,
        transform: `translate(-50%, -50%) translateY(${y}px) scale(${scale})`,
        opacity: p * 0.96,
        zIndex: 20,
        borderRadius: 28,
        background: 'linear-gradient(180deg, rgba(252,247,238,0.80), rgba(247,238,224,0.69))',
        border: '3px solid rgba(126,48,37,0.68)',
        boxShadow: '0 26px 80px rgba(55,32,20,0.16), inset 0 0 0 8px rgba(255,255,255,0.18)',
        backdropFilter: 'blur(2px)',
      }}
    />
  );
};

export const JapaneseScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = sceneConfig.durationSeconds * fps;
  const cameraP = interpolate(frame, [0, total - 1], [0, 1], clamp);
  const cameraScale = 1 + cameraP * 0.024;
  const cameraX = interpolate(cameraP, [0, 1], [0, -5]);
  const cameraY = interpolate(cameraP, [0, 1], [0, -8]);

  return (
    <AbsoluteFill style={{backgroundColor: '#dce8f1', overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        {sceneConfig.layers.map((layer) => (
          <ArtworkLayer key={layer.id} layer={layer} />
        ))}
        <CenterPanel />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 45%, rgba(255,255,255,0) 54%, rgba(40,29,23,0.12) 100%), linear-gradient(180deg, rgba(255,250,242,0.04), rgba(79,48,29,0.03))',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
