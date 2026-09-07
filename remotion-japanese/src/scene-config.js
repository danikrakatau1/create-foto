export const sceneConfig = {
  durationSeconds: 12,
  panelStart: 8.6,
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},
    {id: 'fuji', file: 'fuji-main.png', x: 540, y: 980, width: 886, start: 0.8, z: 2, enterY: 32, motion: 'fuji'},
    {id: 'pagoda', file: 'pagoda-main.png', x: 275, y: 1240, width: 324, start: 1.6, z: 5, enterY: 24, enterX: -12},
    {id: 'pineLeft', file: 'pine-left.png', x: 150, y: 1270, width: 464, start: 2.0, z: 6, enterX: -42, motion: 'sway-left', origin: '18% 92%'},
    {id: 'pineRight', file: 'pine-right.png', x: 930, y: 1320, width: 400, start: 2.25, z: 6, enterX: 42, motion: 'sway-right', origin: '82% 92%'},
    {id: 'cloud1', file: 'cloud-01.png', x: 330, y: 620, width: 475, start: 2.6, z: 4, motion: 'cloud-right'},
    {id: 'cloud2', file: 'cloud-02.png', x: 790, y: 770, width: 389, start: 3.0, z: 4, motion: 'cloud-left'},
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 130, y: 250, width: 562, start: 3.8, z: 7, enterX: -26, enterY: -18, motion: 'sakura-left', origin: '8% 8%'},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 950, y: 280, width: 540, start: 4.4, z: 7, enterX: 26, enterY: -18, motion: 'sakura-right', origin: '92% 8%'},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1010, y: 930, width: 356, start: 5.0, z: 7, enterX: 30, motion: 'side-sway', origin: '92% 18%'},
    {id: 'peonyLeft', file: 'peony-left.png', x: 140, y: 1740, width: 475, start: 6.0, z: 8, enterY: 42, motion: 'flower-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 540, y: 1820, width: 432, start: 6.6, z: 8, enterY: 48, motion: 'flower-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 950, y: 1740, width: 475, start: 7.2, z: 8, enterY: 42, motion: 'flower-c'}
  ]
};
