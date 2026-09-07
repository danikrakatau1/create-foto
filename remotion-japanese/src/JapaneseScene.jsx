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

const easeOutCubic = (p) => 1 - Math.pow(1 - p, 3);

// MOTION LOCK V1.3 — choreography matched to the supplied reference:
// scene builds in visible stages, then the central ivory panel grows in and its border draws.
// After each entrance the artwork becomes almost static; no full flowers/branches fly across frame.
const referenceChoreography = {
  fuji: {start: 0.45, x: 0, y: 44, scale: 0.945, duration: 42},
  cloud1: {start: 0.95, x: -54, y: 8, scale: 0.97, duration: 38},
  cloud2: {start: 1.15, x: 54, y: 8, scale: 0.97, duration: 38},
  pagoda: {start: 1.45, x: 0, y: 126, scale: 0.90, duration: 44},
  pineLeft: {start: 2.45, x: -105, y: 20, scale: 0.95, duration: 44},
  pineRight: {start: 2.75, x: 105, y: 20, scale: 0.95, duration: 44},
  peonyLeft: {start: 3.05, x: -28, y: 92, scale: 0.92, duration: 40},
  peonyCenter: {start: 3.25, x: 0, y: 98, scale: 0.92, duration: 40},
  peonyRight: {start: 3.45, x: 28, y: 92, scale: 0.92, duration: 40},
  sakuraTopLeft: {start: 3.90, x: -118, y: -62, scale: 0.93, duration: 46},
  sakuraTopRight: {start: 4.20, x: 118, y: -62, scale: 0.93, duration: 46},
  sakuraSideRight: {start: 4.55, x: 92, y: 8, scale: 0.95, duration: 42},
};

const motionFor = (motion, t) => {
  switch (motion) {
    case 'fuji-still':
    case 'structure-still':
      return {x: 0, y: 0, rotation: 0, scale: 1};
    case 'cloud-right-soft':
      return {x: 3.2 * Math.sin(t * 0.30), y: 0.55 * Math.sin(t * 0.20), rotation: 0, scale: 1};
    case 'cloud-left-soft':
      return {x: -3.0 * Math.sin(t * 0.29), y: 0.50 * Math.sin(t * 0.19), rotation: 0, scale: 1};
    case 'micro-sway-left':
      return {x: 0, y: 0, rotation: 0.035 * Math.sin(t * 0.32), scale: 1};
    case 'micro-sway-right':
      return {x: 0, y: 0, rotation: -0.035 * Math.sin(t * 0.31), scale: 1};
    case 'sakura-left-soft':
      return {x: 0, y: 0, rotation: 0.10 * Math.sin(t * 0.34), scale: 1};
    case 'sakura-right-soft':
      return {x: 0, y: 0, rotation: -0.09 * Math.sin(t * 0.33), scale: 1};
    case 'side-sway-soft':
      return {x: 0, y: 0, rotation: 0.07 * Math.sin(t * 0.31), scale: 1};
    case 'flower-anchor-a':
    case 'flower-anchor-b':
    case 'flower-anchor-c':
      return {x: 0, y: 0, rotation: 0, scale: 1};
    default:
      return {x: 0, y: 0, rotation: 0, scale: 1};
  }
};

const ArtworkLayer = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  if (layer.kind === 'background') {
    const cameraBuild = easeOutCubic(interpolate(frame, [0, 5.8 * fps], [0, 1], clamp));
    const scale = interpolate(cameraBuild, [0, 1], [1.028, 1.004], clamp);
    const y = interpolate(cameraBuild, [0, 1], [18, 0], clamp);
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
          transform: `translateY(${y}px) scale(${scale})`,
          transformOrigin: '50% 50%',
        }}
      />
    );
  }

  const cue = referenceChoreography[layer.id] || {
    start: layer.start || 0,
    x: layer.enterX || 0,
    y: layer.enterY || 0,
    scale: 0.97,
    duration: 38,
  };
  const startFrame = Math.round(cue.start * fps);
  const localFrame = Math.max(0, frame - startFrame);

  const reveal = spring({
    frame: localFrame,
    fps,
    config: {damping: 24, stiffness: 55, mass: 1.05},
    durationInFrames: cue.duration,
  });
  const opacity = interpolate(localFrame, [0, Math.min(28, cue.duration * 0.65)], [0, 1], clamp);
  const enterX = cue.x * (1 - reveal);
  const enterY = cue.y * (1 - reveal);
  const enterScale = cue.scale + reveal * (1 - cue.scale);
  const t = localFrame / fps;
  const living = motionFor(layer.motion, t);
  const flipX = layer.flipX ? -1 : 1;
  const staticRotation = layer.rotation || 0;
  const totalRotation = staticRotation + living.rotation;

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

const InvitationPanel = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const start = 6.05 * fps;
  const growRaw = interpolate(frame, [start, start + 44], [0, 1], clamp);
  const grow = easeOutCubic(growRaw);
  const opacity = interpolate(frame, [start, start + 18], [0, 0.94], clamp);
  const borderP = interpolate(frame, [7.10 * fps, 8.55 * fps], [0, 1], clamp);

  if (frame < start) return null;

  const scaleX = interpolate(grow, [0, 1], [0.68, 1], clamp);
  const scaleY = interpolate(grow, [0, 1], [0.18, 1], clamp);

  const path = 'M120 24 Q380 -8 640 24 Q704 34 726 94 L726 150 L758 150 L758 1128 L726 1128 L726 1184 Q380 1322 34 1184 L34 1128 L2 1128 L2 150 L34 150 L34 94 Q56 34 120 24 Z';

  return (
    <div
      style={{
        position: 'absolute',
        left: 540,
        top: 1015,
        width: 760,
        height: 1325,
        zIndex: 7,
        opacity,
        transform: `translate(-50%, -50%) scaleX(${scaleX}) scaleY(${scaleY})`,
        transformOrigin: '50% 50%',
        pointerEvents: 'none',
      }}
    >
      <svg viewBox="0 0 760 1325" width="100%" height="100%" style={{display: 'block', overflow: 'visible'}}>
        <path d={path} fill="rgba(248,244,233,0.91)" stroke="none" />
        <path
          d={path}
          fill="none"
          stroke="rgba(112,30,38,0.96)"
          strokeWidth="3"
          vectorEffect="non-scaling-stroke"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - borderP}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export const JapaneseScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const build = easeOutCubic(interpolate(frame, [0, 5.8 * fps], [0, 1], clamp));
  const cameraScale = interpolate(build, [0, 1], [1.024, 1], clamp);
  const cameraY = interpolate(build, [0, 1], [14, 0], clamp);

  return (
    <AbsoluteFill style={{backgroundColor: '#f4f0e7', overflow: 'hidden'}}>
      <AbsoluteFill
        style={{
          transform: `translateY(${cameraY}px) scale(${cameraScale})`,
          transformOrigin: '50% 50%',
        }}
      >
        {sceneConfig.layers.map((layer) => (
          <ArtworkLayer key={layer.id} layer={layer} />
        ))}
      </AbsoluteFill>

      <InvitationPanel />

      <AbsoluteFill
        style={{
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 44%, rgba(255,255,255,0) 64%, rgba(62,45,34,0.055) 100%), linear-gradient(180deg, rgba(255,250,242,0.014), rgba(82,54,36,0.008))',
          zIndex: 50,
        }}
      />
    </AbsoluteFill>
  );
};
