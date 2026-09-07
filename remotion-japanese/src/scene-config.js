export const sceneConfig = {
  durationSeconds: 20,
  layers: [
    {id: 'background', file: 'background-main.jpg', x: 540, y: 960, width: 1080, start: 0.0, z: 1, kind: 'background'},

    {id: 'fuji', file: 'fuji-main.png', x: 540, y: 930, width: 980, start: 0.7, z: 2, enterY: 28, motion: 'fuji'},

    {id: 'cloud1', file: 'cloud-01.png', x: 250, y: 650, width: 470, start: 2.0, z: 3, enterX: -28, motion: 'cloud-right'},
    {id: 'cloud2', file: 'cloud-02.png', x: 820, y: 770, width: 410, start: 2.6, z: 3, enterX: 28, motion: 'cloud-left'},

    {id: 'pineLeft', file: 'pine-left.png', x: 115, y: 1305, width: 445, start: 3.2, z: 5, enterX: -42, motion: 'sway-left', origin: '24% 94%'},
    {id: 'pineRight', file: 'pine-right.png', x: 960, y: 1325, width: 425, start: 3.8, z: 5, enterX: 42, motion: 'sway-right', origin: '76% 94%'},
    {id: 'pineSide', file: 'pine-center.png', x: 1015, y: 980, width: 320, start: 4.4, z: 5, enterX: 36, motion: 'sway-side', origin: '82% 88%'},

    {id: 'sakuraTopLeft', file: 'sakura-top-left.png', x: 175, y: 315, width: 515, start: 5.0, z: 7, enterX: -26, enterY: -18, motion: 'sakura-left', origin: '10% 10%'},
    {id: 'sakuraTopRight', file: 'sakura-top-right.png', x: 900, y: 380, width: 455, start: 5.7, z: 7, enterX: 26, enterY: -18, motion: 'sakura-right', origin: '88% 10%'},
    {id: 'sakuraSideRight', file: 'sakura-side-right.png', x: 1015, y: 930, width: 340, start: 6.4, z: 7, enterX: 30, motion: 'side-sway', origin: '90% 18%'},

    {id: 'peonyLeft', file: 'peony-left.png', x: 125, y: 1715, width: 420, start: 7.0, z: 8, enterY: 44, motion: 'flower-a'},
    {id: 'peonyCenter', file: 'peony-center.png', x: 540, y: 1815, width: 390, start: 7.7, z: 8, enterY: 48, motion: 'flower-b'},
    {id: 'peonyRight', file: 'peony-right.png', x: 955, y: 1720, width: 420, start: 8.4, z: 8, enterY: 44, motion: 'flower-c'}
  ]
};
