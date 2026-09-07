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
    case 'fuji-still':
      return {x: 0, y: -0.25 * Math.sin(t * 0.20), rotation: 0, scale: 1};
    case 'structure-still':
      return {x: 0, y: 0, rotation: 0, scale: 1};
    case 'cloud-right-soft':
      return {
        x: 6 * Math.sin(t * 0.36),
        y: 1.0 * Math.sin(t * 0.22),
        rotation: 0,
        scale: 1,
      };
    case 'cloud-left-soft':
      return {
        x: -5 * Math.sin(t * 0.34),
        y: 0.9 * Math.sin(t * 0.21),
        rotation: 0,
        scale: 1,
      };
    case 'micro-sway-left':
      return {x: 0, y: 0, rotation: 0.07 * Math.sin(t * 0.38), scale: 1};
    case 'micro-sway-right':
      return {x: 0, y: 0, rotation: -0.07 * Math.sin(t * 0.37), scale: 1};
    case 'sakura-left-soft':
      return {x: 0, y: 0, rotation: 0.20 * Math.sin(t * 0.42), scale: 1};
    case 'sakura-right-soft':
      return {x: 0, y: 0, rotation: -0.18 * Math.sin(t * 0.40), scale: 1};
    case 'side-sway-soft':
      return {x: 0, y: 0, rotation: 0.12 * Math.sin(t * 0.38), scale: 1};
    case 'flower-anchor-a':
      return {x: 0, y: -0.35 * Math.sin(t * 0.30), rotation: 0.02 * Math.sin(t * 0.28), scale: 1};
    case 'flower-anchor-b':
      return {x: 0, y: -0.25 * Math.sin(t * 0.28), rotation: -0.015 * Math.sin(t * 0.26), scale: 1};
    case 'flower-anchor-c':
      return {x: 0, y: -0.32 * Math.sin(t * 0.29), rotation: -0.02 * Math.sin(t * 0.27), scale: 1};
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
    config: {damping: 40, stiffness: 64, mass: 1.12},
    durationInFrames: 30,
  });

  const opacity = interpolate(localFrame, [0, 18], [0, 1], clamp);
  const enterX = (layer.enterX || 0) * (1 - reveal);
  const enterY = (layer.enterY || 0) * (1 - reveal);
  const enterScale = 0.985 + reveal * 0.015;
  const t = localFrame / fps;
  const living = motionFor(layer.motion, t);
  const flipX = layer.flipX ? -1 : 1;
  const staticRotation = layer.rotation || 0;
  const totalRotation = staticRotation + living.rotation;

  if (layer.kind === 'background') {
    const p = interpolate(frame, [0, sceneConfig.durationSeconds * fps - 1], [0, 1], clamp);
    const backgroundScale = 1.004 + p * 0.002;
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

// Only tiny procedural petals are allowed to cross the frame.
// Full blossom/branch assets stay anchored in the composition.
const petalSeeds = [
  {x: 150, start: 1.4, duration: 6.0, size: 12, sway: 18, tilt: -12},
  {x: 320, start: 2.0, duration: 6.4, size: 14, sway: 22, tilt: 16},
  {x: 500, start: 0.9, duration: 6.8, size: 11, sway: 20, tilt: -18},
  {x: 690, start: 2.7, duration: 6.1, size: 13, sway: 24, tilt: 10},
  {x: 860, start: 1.8, duration: 6.5, size: 12, sway: 19, tilt: -14},
  {x: 990, start: 3.3, duration: 5.9, size: 10, sway: 16, tilt: 18},
];

const PetalField = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{zIndex: 29, pointerEvents: 'none'}}>
      {petalSeeds.slice(0, sceneConfig.motionLock.petalCount).map((petal, index) => {
        const start = petal.start * fps;
        const end = (petal.start + petal.duration) * fps;
        const p = interpolate(frame, [start, end], [0, 1], clamp);
        const opacity = interpolate(p, [0, 0.10, 0.88, 1], [0, 0.38, 0.30, 0], clamp);
        if (opacity <= 0.001) return null;

        const y = interpolate(p, [0, 1], [-45, 1960], clamp);
        const x = petal.x + Math.sin(p * Math.PI * 1.7 + index * 0.71) * petal.sway;
        const rotation = petal.tilt + p * (index % 2 === 0 ? 95 : -85);
        const squash = 0.82 + 0.08 * Math.sin(p * Math.PI * 3 + index);

        return (
          <div
            key={`${petal.x}-${petal.start}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: petal.size,
              height: petal.size * 1.45,
              borderRadius: '70% 20% 70% 30%',
              background: 'linear-gradient(145deg, rgba(255,214,221,0.88), rgba(229,133,151,0.80))',
              boxShadow: '0 1px 2px rgba(126,61,76,0.10)',
              opacity,
              transform: `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${squash})`,
              filter: index % 4 === 0 ? 'blur(0.35px)' : 'none',
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

export const JapaneseScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const total = sceneConfig.durationSeconds * fps;
  const cameraP = interpolate(frame, [0, total - 1], [0, 1], clamp);
  const cameraScale = 1 + cameraP * sceneConfig.motionLock.cameraPush;
  const cameraX = interpolate(cameraP, [0, 1], [0, sceneConfig.motionLock.cameraX]);
  const cameraY = interpolate(cameraP, [0, 1], [0, sceneConfig.motionLock.cameraY]);

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

      <PetalField />

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 44%, rgba(255,255,255,0) 64%, rgba(62,45,34,0.06) 100%), linear-gradient(180deg, rgba(255,250,242,0.018), rgba(82,54,36,0.010))',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
