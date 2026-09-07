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
      return {
        x: 0,
        y: -3.5 * Math.sin(t * 0.34),
        rotation: 0,
        scale: 1 + 0.0025 * Math.sin(t * 0.28),
      };
    case 'cloud-right':
      return {
        x: 28 * Math.sin(t * 0.30),
        y: 4 * Math.sin(t * 0.22),
        rotation: 0,
        scale: 1,
      };
    case 'cloud-left':
      return {
        x: -24 * Math.sin(t * 0.27),
        y: 3 * Math.sin(t * 0.20),
        rotation: 0,
        scale: 1,
      };
    case 'sway-left':
      return {x: 0, y: 0, rotation: 0.62 * Math.sin(t * 0.48), scale: 1};
    case 'sway-right':
      return {x: 0, y: 0, rotation: -0.58 * Math.sin(t * 0.45), scale: 1};
    case 'sway-side':
      return {x: -4 * Math.sin(t * 0.36), y: 0, rotation: 0.48 * Math.sin(t * 0.43), scale: 1};
    case 'sakura-left':
      return {x: 0, y: 1.8 * Math.sin(t * 0.41), rotation: 0.82 * Math.sin(t * 0.54), scale: 1};
    case 'sakura-right':
      return {x: 0, y: 1.6 * Math.sin(t * 0.39), rotation: -0.78 * Math.sin(t * 0.50), scale: 1};
    case 'side-sway':
      return {x: -5 * Math.sin(t * 0.40), y: 1.4 * Math.sin(t * 0.33), rotation: 0.52 * Math.sin(t * 0.46), scale: 1};
    case 'flower-a':
      return {x: 0, y: -4.5 * Math.sin(t * 0.38), rotation: 0.20 * Math.sin(t * 0.34), scale: 1};
    case 'flower-b':
      return {x: 0, y: -3.5 * Math.sin(t * 0.35), rotation: -0.16 * Math.sin(t * 0.31), scale: 1};
    case 'flower-c':
      return {x: 0, y: -4.2 * Math.sin(t * 0.37), rotation: -0.20 * Math.sin(t * 0.33), scale: 1};
    default:
      return {x: 0, y: 0, rotation: 0, scale: 1};
  }
};

const ArtworkLayer = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const startFrame = Math.round(layer.start * fps);
  const localFrame = Math.max(0, frame - startFrame);

  const reveal = spring({
    frame: localFrame,
    fps,
    config: {damping: 20, stiffness: 82, mass: 0.95},
    durationInFrames: 38,
  });

  const opacity = interpolate(localFrame, [0, 24], [0, 1], clamp);
  const enterX = (layer.enterX || 0) * (1 - reveal);
  const enterY = (layer.enterY || 0) * (1 - reveal);
  const enterScale = 0.965 + reveal * 0.035;
  const t = localFrame / fps;
  const living = motionFor(layer.motion, t);
  const flipX = layer.flipX ? -1 : 1;
  const staticRotation = layer.rotation || 0;
  const totalRotation = staticRotation + living.rotation;

  if (layer.kind === 'background') {
    const p = interpolate(frame, [0, sceneConfig.durationSeconds * fps - 1], [0, 1], clamp);
    const backgroundScale = 1.015 + p * 0.012;
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
        transform: `translate(-50%, -50%) translate(${enterX + living.x}px, ${enterY + living.y}px) scale(${enterScale * living.scale}) rotate(${totalRotation}deg) scaleX(${flipX})`,
      }}
    >
      <Img
        src={staticFile(`assets/${layer.file}`)}
        style={{display: 'block', width: '100%', height: 'auto'}}
      />
    </div>
  );
};

export const JapaneseScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = sceneConfig.durationSeconds * fps;
  const cameraP = interpolate(frame, [0, total - 1], [0, 1], clamp);
  const cameraScale = 1 + cameraP * 0.018;
  const cameraX = interpolate(cameraP, [0, 1], [0, -4]);
  const cameraY = interpolate(cameraP, [0, 1], [0, -6]);

  return (
    <AbsoluteFill style={{backgroundColor: '#f4f0e7', overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translate(${cameraX}px, ${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        {sceneConfig.layers.map((layer) => (
          <ArtworkLayer key={layer.id} layer={layer} />
        ))}
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 44%, rgba(255,255,255,0) 58%, rgba(62,45,34,0.09) 100%), linear-gradient(180deg, rgba(255,250,242,0.035), rgba(82,54,36,0.018))',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
