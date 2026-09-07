// JAPANESE SCENE — MOTION LOCK V1.2
// Auto-render trigger: V1.2 no-flying-flowers validation.
// Fix: no full blossom/branch assets may fly across frame.
// Motion stays in soft clouds, microscopic branch sway, subtle camera push, and a sparse petal field.
export const sceneConfig = {
  durationSeconds: 10,
  motionLock: {
    cameraPush: 0.006,
    cameraX: -1,
    cameraY: -2,
    petalCount: 6,
  },
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},

    // Hero landscape — locked after reveal.
    {id: 'fuji', file: 'fuji-main.png', x: 555, y: 1290, width: 970, start: 0.20, z: 2, enterY: 10, motion: 'fuji-still'},

    // Atmosphere — slow drift only.
    {id: 'cloud1', file: 'cloud-01.png', x: 230, y: 870, width: 510, start: 0.65, z: 4, enterX: -12, motion: 'cloud-right-soft'},
    {id: 'cloud2', file: 'cloud-02.png', x: 865, y: 1020, width: 450, start: 0.90, z: 4, enterX: 12, motion: 'cloud-left-soft'},

    // Architecture — completely stable after reveal.
    {id: 'pagoda', file: 'pagoda-main.png', x: 225, y: 1435, width: 390, start: 0.45, z: 5, enterX: -10, enterY: 12, motion: 'structure-still'},

    // Trees — almost static.
    {id: 'pineLeft', file: 'pine-left.png', x: 105, y: 1530, width: 390, start: 1.10, z: 6, enterX: -16, motion: 'micro-sway-left', origin: '24% 94%'},
    {id: 'pineRight', file: 'pine-right.png', x: 980, y: 1540, width: 360, start: 1.25, z: 6, enterX: 16, motion: 'micro-sway-right', origin: '76% 94%'},

    // Sakura framing — anchored at the branch root, never translated across frame.
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 185, y: 285, width: 620, start: 1.40, z: 8, enterX: -10, enterY: -8, motion: 'sakura-left-soft', origin: '0% 0%', flipX: true, rotation: -2},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 930, y: 360, width: 500, start: 1.60, z: 8, enterX: 10, enterY: -8, motion: 'sakura-right-soft', origin: '100% 0%', rotation: 1},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1030, y: 760, width: 300, start: 1.85, z: 8, enterX: 12, motion: 'side-sway-soft', origin: '100% 100%'},

    // Peony foreground — visual anchor, effectively static after reveal.
    {id: 'peonyLeft', file: 'peony-left.png', x: 120, y: 1790, width: 430, start: 2.05, z: 10, enterY: 18, motion: 'flower-anchor-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 520, y: 1880, width: 390, start: 2.20, z: 10, enterY: 20, motion: 'flower-anchor-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 970, y: 1800, width: 430, start: 2.35, z: 10, enterY: 18, motion: 'flower-anchor-c'}
  ]
};
