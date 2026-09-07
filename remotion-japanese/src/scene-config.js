// render-trigger: 2026-09-08 02:07 WIB
export const sceneConfig = {
  durationSeconds: 20,
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},

    // Hero landscape
    {id: 'fuji', file: 'fuji-main.png', x: 555, y: 1290, width: 970, start: 0.7, z: 2, enterY: 28, motion: 'fuji'},

    // Atmosphere / mid-ground
    {id: 'cloud1', file: 'cloud-01.png', x: 230, y: 870, width: 510, start: 2.0, z: 4, enterX: -28, motion: 'cloud-right'},
    {id: 'cloud2', file: 'cloud-02.png', x: 865, y: 1020, width: 450, start: 2.6, z: 4, enterX: 28, motion: 'cloud-left'},

    // Pagoda hero accent — replaces the extra third pine so the stack stays at 13 assets.
    {id: 'pagoda', file: 'pagoda-main.png', x: 225, y: 1435, width: 390, start: 3.0, z: 5, enterX: -20, enterY: 24},

    // Foreground trees
    {id: 'pineLeft', file: 'pine-left.png', x: 105, y: 1530, width: 390, start: 3.5, z: 6, enterX: -42, motion: 'sway-left', origin: '24% 94%'},
    {id: 'pineRight', file: 'pine-right.png', x: 980, y: 1540, width: 360, start: 4.0, z: 6, enterX: 42, motion: 'sway-right', origin: '76% 94%'},

    // Sakura framing
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 185, y: 285, width: 620, start: 5.0, z: 8, enterX: -26, enterY: -18, motion: 'sakura-left', origin: '10% 10%', flipX: true, rotation: -2},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 930, y: 360, width: 500, start: 5.7, z: 8, enterX: 26, enterY: -18, motion: 'sakura-right', origin: '88% 10%', rotation: 1},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1030, y: 760, width: 300, start: 6.4, z: 8, enterX: 30, motion: 'side-sway', origin: '90% 18%'},

    // Bottom foreground flowers
    {id: 'peonyLeft', file: 'peony-left.png', x: 120, y: 1790, width: 430, start: 7.0, z: 10, enterY: 44, motion: 'flower-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 520, y: 1880, width: 390, start: 7.7, z: 10, enterY: 48, motion: 'flower-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 970, y: 1800, width: 430, start: 8.4, z: 10, enterY: 44, motion: 'flower-c'}
  ]
};
