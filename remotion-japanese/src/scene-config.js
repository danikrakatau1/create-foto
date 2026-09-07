// FUJI V2 — composition rebuild
// V1.3 remains untouched on main. This branch deliberately rebalances the scene
// around Fuji and Japanese negative-space composition instead of patching V1.3.
export const sceneConfig = {
  durationSeconds: 10,
  motionLock: {
    cameraPush: 0.004,
    cameraX: 0,
    cameraY: -3,
    petalCount: 0,
  },
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},

    // Hero: Fuji is the visual anchor, higher and cleaner than V1.3.
    {id: 'fuji', file: 'fuji-main.png', x: 570, y: 1110, width: 1080, start: 0.20, z: 2, enterY: 24, motion: 'fuji-still'},

    // Mist crosses the mountain base asymmetrically to create depth.
    {id: 'cloud1', file: 'cloud-01.png', x: 255, y: 1035, width: 560, start: 0.72, z: 4, enterX: -18, motion: 'cloud-right-soft'},
    {id: 'cloud2', file: 'cloud-02.png', x: 865, y: 1160, width: 500, start: 0.92, z: 4, enterX: 18, motion: 'cloud-left-soft'},

    // Pagoda is a secondary landmark, not the central subject.
    {id: 'pagoda', file: 'pagoda-main.png', x: 205, y: 1390, width: 310, start: 1.35, z: 5, enterX: -18, enterY: 18, motion: 'structure-still'},

    // Pine frames the lower scene without forming a symmetrical gate.
    {id: 'pineLeft', file: 'pine-left.png', x: 70, y: 1575, width: 345, start: 1.75, z: 6, enterX: -24, motion: 'micro-sway-left', origin: '20% 96%'},
    {id: 'pineRight', file: 'pine-right.png', x: 1025, y: 1640, width: 300, start: 2.00, z: 6, enterX: 24, motion: 'micro-sway-right', origin: '80% 96%'},

    // Sakura is restrained to the upper corners; no dense floral canopy.
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 120, y: 225, width: 470, start: 2.35, z: 8, enterX: -18, enterY: -12, motion: 'sakura-left-soft', origin: '0% 0%', rotation: -3},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 1015, y: 320, width: 390, start: 2.65, z: 8, enterX: 18, enterY: -12, motion: 'sakura-right-soft', origin: '100% 0%', rotation: 2},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1070, y: 745, width: 215, start: 2.95, z: 8, enterX: 18, motion: 'side-sway-soft', origin: '100% 100%'},

    // Foreground flowers become edge accents instead of a three-flower altar.
    {id: 'peonyLeft', file: 'peony-left.png', x: 70, y: 1870, width: 330, start: 3.20, z: 10, enterY: 24, motion: 'flower-anchor-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 455, y: 1990, width: 235, start: 3.42, z: 9, enterY: 22, motion: 'flower-anchor-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 1040, y: 1900, width: 315, start: 3.62, z: 10, enterY: 24, motion: 'flower-anchor-c'}
  ]
};
