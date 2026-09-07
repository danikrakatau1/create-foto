import React from 'react';
import {
  AbsoluteFill,
  Img,
  interpolate,
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
      return {x: 0, y: -5 * Math.sin(t * 0.55), rotation: 0, scale: 1 + 0.004 * Math.sin(t * 0.4)};
    case 'cloud-right':
      return {x: 18 * Math.sin(t * 0.55), y: 4 * Math.sin(t * 0.35), rotation: 0, scale: 1};
    case 'cloud-left':
      return {x: -14 * Math.sin(t * 0.5), y: 3 * Math.sin(t * 0.3), rotation: 0, scale: 1};
    case 'sway-left':
      return {x: 0, y: 0, rotation: 1.15 * Math.sin(t * 1.0), scale: 1};
    case 'sway-right':
      return {x: 0, y: 0, rotation: -0.9 * Math.sin(t * 0.92), scale: 1};
    case 'sakura-left':
      return {x: 0, y: 0, rotation: 1.45 * Math.sin(t * 1.15), scale: 1};
    case 'sakura-right':
      return {x: 0, y: 0, rotation: -1.2 * Math.sin(t * 1.02), scale: 1};
    case 'side-sway':
      return {x: -8 * Math.sin(t * 0.9), y: 0, rotation: 0.7 * Math.sin(t * 0.8), scale: 1};
    case 'flower-a':
      return {x: 0, y: -6 * Math.sin(t * 0.82), rotation: 0.35 * Math.sin(t * 0.7), scale: 1};
    case 'flower-b':
      return {x: 0, y: -4 * Math.sin(t * 0.72), rotation: -0.25 * Math.sin(t * 0.62), scale: 1};
    case 'flower-c':
      return {x: 0, y: -7 * Math.sin(t * 0.78), rotation: -0.35 * Math.sin(t * 0.66), scale: 1};
    default:
      return {x: 0, y: 0, rotation: 0, scale: 1};
  }
};

const ArtworkLayer = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const startFrame = Math.round(layer.start * fps);
  const revealFrames = 24;
  const opacity = interpolate(frame, [startFrame, startFrame + revealFrames], [0, 1], clamp);
  const enterProgress = interpolate(frame, [startFrame, startFrame + revealFrames], [0, 1], clamp);
  const enterX = (layer.enterX || 0) * (1 - enterProgress);
  const enterY = (layer.enterY || 0) * (1 - enterProgress);
  const enterScale = interpolate(frame, [startFrame, startFrame + revealFrames], [0.985, 1], clamp);
  const t = Math.max(0, frame - startFrame) / fps;
  const living = motionFor(layer.motion, t);

  if (layer.kind === 'background') {
    const sceneProgress = interpolate(frame, [0, 239], [0, 1], clamp);
    const backgroundScale = 1 + sceneProgress * 0.035;
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
          transform: `scale(${backgroundScale})`,
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
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
  );
};

export const JapaneseScene = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#dce8f1', overflow: 'hidden'}}>
      {sceneConfig.layers.map((layer) => (
        <ArtworkLayer key={layer.id} layer={layer} />
      ))}
    </AbsoluteFill>
  );
};
