export const sceneConfig = {
  durationSeconds: 8,
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},
    {id: 'fuji', file: 'fuji-main.png', x: 540, y: 980, width: 886, start: 0.5, z: 2, enterY: 36, motion: 'fuji'},
    {id: 'cloud1', file: 'cloud-01.png', x: 330, y: 620, width: 475, start: 2.2, z: 4, motion: 'cloud-right'},
    {id: 'cloud2', file: 'cloud-02.png', x: 790, y: 770, width: 389, start: 2.6, z: 4, motion: 'cloud-left'},
    {id: 'pagoda', file: 'pagoda-main.png', x: 275, y: 1240, width: 324, start: 1.0, z: 5, enterY: 30, enterX: -16},
    {id: 'pineLeft', file: 'pine-left.png', x: 150, y: 1270, width: 464, start: 1.4, z: 6, enterX: -40, motion: 'sway-left', origin: '20% 95%'},
    {id: 'pineRight', file: 'pine-right.png', x: 930, y: 1320, width: 400, start: 1.8, z: 6, enterX: 40, motion: 'sway-right', origin: '80% 95%'},
    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 130, y: 250, width: 562, start: 3.0, z: 7, enterY: -24, motion: 'sakura-left', origin: '10% 10%'},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 950, y: 280, width: 540, start: 3.3, z: 7, enterY: -24, motion: 'sakura-right', origin: '90% 10%'},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1010, y: 930, width: 356, start: 3.6, z: 7, enterX: 24, motion: 'side-sway', origin: '90% 20%'},
    {id: 'peonyLeft', file: 'peony-left.png', x: 140, y: 1740, width: 475, start: 4.0, z: 8, enterY: 38, motion: 'flower-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 540, y: 1820, width: 432, start: 4.3, z: 8, enterY: 38, motion: 'flower-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 950, y: 1740, width: 475, start: 4.6, z: 8, enterY: 38, motion: 'flower-c'}
  ]
};
