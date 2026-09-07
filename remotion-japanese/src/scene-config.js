// JAPANESE SCENE — MOTION LOCK V1.1
// Direction: cinematic living artwork. Hero landscape stays stable; motion lives in atmosphere,
// sakura framing, foreground blossom passes, and a restrained petal field.
export const sceneConfig = {
  durationSeconds: 10,
  motionLock: {
    cameraPush: 0.008,
    cameraX: -2,
    cameraY: -3,
    foregroundPassStart: 1.55,
    foregroundPassEnd: 4.65,
    secondaryPassStart: 6.7,
    secondaryPassEnd: 9.25,
    petalCount: 14,
  },
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},

    // Hero landscape — deliberately stable.
    {id: 'fuji', file: 'fuji-main.png', x: 555, y: 1290, width: 970, start: 0.20, z: 2, enterY: 14, motion: 'fuji-still'},

    // Atmosphere / mid-ground — slow drift only.
    {id: 'cloud1', file: 'cloud-01.png', x: 230, y: 870, width: 510, start: 0.65, z: 4, enterX: -16, motion: 'cloud-right-soft'},
    {id: 'cloud2', file: 'cloud-02.png', x: 865, y: 1020, width: 450, start: 0.90, z: 4, enterX: 16, motion: 'cloud-left-soft'},

    // Pagoda accent — stable after reveal.
    {id: 'pagoda', file: 'pagoda-main.png', x: 225, y: 1435, width: 390, start: 0.45, z: 5, enterX: -12, enterY: 16, motion: 'structure-still'},

    // Foreground trees — almost static, just a microscopic breeze.
    {id: 'pineLeft', file: 'pine-left.png', x: 105, y: 1530, width: 390, start: 1.10, z: 6, enterX: -20, motion: 'micro-sway-left', origin: '24% 94%'},
    {id: 'pineRight', file: 'pine-right.png', x: 980, y: 1540, width: 360, start: 1.25, z: 6, enterX: 20, motion: 'micro-sway-right', origin: '76% 94%'},

    // Sakura framing — visible breeze, still restrained.
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 185, y: 285, width: 620, start: 1.40, z: 8, enterX: -14, enterY: -10, motion: 'sakura-left-soft', origin: '10% 10%', flipX: true, rotation: -2},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 930, y: 360, width: 500, start: 1.60, z: 8, enterX: 14, enterY: -10, motion: 'sakura-right-soft', origin: '88% 10%', rotation: 1},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1030, y: 760, width: 300, start: 1.85, z: 8, enterX: 16, motion: 'side-sway-soft', origin: '90% 18%'},

    // Bottom foreground flowers — stable visual anchor.
    {id: 'peonyLeft', file: 'peony-left.png', x: 120, y: 1790, width: 430, start: 2.05, z: 10, enterY: 22, motion: 'flower-soft-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 520, y: 1880, width: 390, start: 2.20, z: 10, enterY: 24, motion: 'flower-soft-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 970, y: 1800, width: 430, start: 2.35, z: 10, enterY: 22, motion: 'flower-soft-c'}
  ]
};
