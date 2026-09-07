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
      return {x: 0, y: -0.55 * Math.sin(t * 0.22), rotation: 0, scale: 1};
    case 'structure-still':
      return {x: 0, y: 0, rotation: 0, scale: 1};
    case 'cloud-right-soft':
      return {
        x: 9 * Math.sin(t * 0.42),
        y: 1.6 * Math.sin(t * 0.25),
        rotation: 0,
        scale: 1,
      };
    case 'cloud-left-soft':
      return {
        x: -8 * Math.sin(t * 0.38),
        y: 1.3 * Math.sin(t * 0.23),
        rotation: 0,
        scale: 1,
      };
    case 'micro-sway-left':
      return {x: 0, y: 0, rotation: 0.11 * Math.sin(t * 0.42), scale: 1};
    case 'micro-sway-right':
      return {x: 0, y: 0, rotation: -0.10 * Math.sin(t * 0.40), scale: 1};
    case 'sakura-left-soft':
      return {x: 0, y: 0.7 * Math.sin(t * 0.38), rotation: 0.26 * Math.sin(t * 0.46), scale: 1};
    case 'sakura-right-soft':
      return {x: 0, y: 0.65 * Math.sin(t * 0.36), rotation: -0.24 * Math.sin(t * 0.44), scale: 1};
    case 'side-sway-soft':
      return {x: -1.5 * Math.sin(t * 0.34), y: 0.55 * Math.sin(t * 0.30), rotation: 0.17 * Math.sin(t * 0.41), scale: 1};
    case 'flower-soft-a':
      return {x: 0, y: -1.2 * Math.sin(t * 0.34), rotation: 0.06 * Math.sin(t * 0.30), scale: 1};
    case 'flower-soft-b':
      return {x: 0, y: -0.9 * Math.sin(t * 0.31), rotation: -0.05 * Math.sin(t * 0.28), scale: 1};
    case 'flower-soft-c':
      return {x: 0, y: -1.1 * Math.sin(t * 0.33), rotation: -0.06 * Math.sin(t * 0.29), scale: 1};
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
    config: {damping: 38, stiffness: 68, mass: 1.1},
    durationInFrames: 30,
  });

  const opacity = interpolate(localFrame, [0, 18], [0, 1], clamp);
  const enterX = (layer.enterX || 0) * (1 - reveal);
  const enterY = (layer.enterY || 0) * (1 - reveal);
  const enterScale = 0.982 + reveal * 0.018;
  const t = localFrame / fps;
  const living = motionFor(layer.motion, t);
  const flipX = layer.flipX ? -1 : 1;
  const staticRotation = layer.rotation || 0;
  const totalRotation = staticRotation + living.rotation;

  if (layer.kind === 'background') {
    const p = interpolate(frame, [0, sceneConfig.durationSeconds * fps - 1], [0, 1], clamp);
    const backgroundScale = 1.006 + p * 0.003;
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

const ForegroundBlossomPass = ({secondary = false}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const motion = sceneConfig.motionLock;
  const start = (secondary ? motion.secondaryPassStart : motion.foregroundPassStart) * fps;
  const end = (secondary ? motion.secondaryPassEnd : motion.foregroundPassEnd) * fps;
  const p = interpolate(frame, [start, end], [0, 1], clamp);
  const opacity = interpolate(p, [0, 0.12, 0.82, 1], [0, secondary ? 0.32 : 0.58, secondary ? 0.28 : 0.50, 0], clamp);

  if (opacity <= 0.001) return null;

  const x = secondary
    ? interpolate(p, [0, 1], [-260, 760], clamp)
    : interpolate(p, [0, 1], [1320, 360], clamp);
  const y = secondary
    ? interpolate(p, [0, 1], [1500, 1320], clamp)
    : interpolate(p, [0, 1], [560, 820], clamp);
  const rotation = secondary
    ? interpolate(p, [0, 1], [8, -3], clamp)
    : interpolate(p, [0, 1], [-8, 3], clamp);
  const scale = secondary
    ? interpolate(p, [0, 1], [0.88, 1.02], clamp)
    : interpolate(p, [0, 1], [1.02, 1.14], clamp);

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: secondary ? 690 : 860,
        opacity,
        zIndex: secondary ? 27 : 28,
        pointerEvents: 'none',
        transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: secondary ? '20% 80%' : '80% 20%',
        filter: secondary ? 'blur(3.5px)' : 'blur(5.5px)',
      }}
    >
      <Img
        src={staticFile(secondary ? 'assets/sakura-top-left.png' : 'assets/sakura-top-right.png')}
        style={{display: 'block', width: '100%', height: 'auto'}}
      />
    </div>
  );
};

const petalSeeds = [
  {x: 90, start: 0.9, duration: 5.0, size: 18, sway: 42, tilt: -18},
  {x: 210, start: 1.5, duration: 5.8, size: 24, sway: 58, tilt: 24},
  {x: 330, start: 2.1, duration: 4.9, size: 16, sway: 34, tilt: -30},
  {x: 450, start: 0.6, duration: 6.3, size: 20, sway: 48, tilt: 12},
  {x: 565, start: 2.8, duration: 5.4, size: 26, sway: 64, tilt: -22},
  {x: 680, start: 1.2, duration: 5.9, size: 17, sway: 38, tilt: 28},
  {x: 790, start: 3.1, duration: 5.2, size: 22, sway: 52, tilt: -14},
  {x: 905, start: 1.9, duration: 5.7, size: 15, sway: 30, tilt: 34},
  {x: 1010, start: 2.5, duration: 5.0, size: 19, sway: 46, tilt: -26},
  {x: 150, start: 4.1, duration: 4.6, size: 14, sway: 32, tilt: 18},
  {x: 390, start: 4.6, duration: 4.8, size: 21, sway: 55, tilt: -36},
  {x: 610, start: 3.7, duration: 5.3, size: 16, sway: 40, tilt: 20},
  {x: 835, start: 4.3, duration: 4.7, size: 23, sway: 60, tilt: -16},
  {x: 970, start: 5.0, duration: 4.4, size: 15, sway: 36, tilt: 30},
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
        const opacity = interpolate(p, [0, 0.08, 0.86, 1], [0, 0.58, 0.46, 0], clamp);
        if (opacity <= 0.001) return null;

        const y = interpolate(p, [0, 1], [-70, 1990], clamp);
        const x = petal.x + Math.sin(p * Math.PI * 2.2 + index * 0.77) * petal.sway;
        const rotation = petal.tilt + p * (index % 2 === 0 ? 210 : -190);
        const squash = 0.72 + 0.16 * Math.sin(p * Math.PI * 4 + index);

        return (
          <div
            key={`${petal.x}-${petal.start}`}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              width: petal.size,
              height: petal.size * 1.55,
              borderRadius: '70% 20% 70% 30%',
              background: 'linear-gradient(145deg, rgba(255,206,215,0.96), rgba(229,117,142,0.92))',
              boxShadow: '0 1px 3px rgba(126,61,76,0.16)',
              opacity,
              transform: `translate(-50%, -50%) rotate(${rotation}deg) scaleX(${squash})`,
              filter: index % 5 === 0 ? 'blur(0.6px)' : 'none',
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

      <ForegroundBlossomPass />
      <ForegroundBlossomPass secondary />
      <PetalField />

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 44%, rgba(255,255,255,0) 62%, rgba(62,45,34,0.07) 100%), linear-gradient(180deg, rgba(255,250,242,0.02), rgba(82,54,36,0.012))',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
