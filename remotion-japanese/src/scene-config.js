// FUJI V2.1 — rebuilt against the supplied reference video + source ZIP.
// Principle: complete Japanese tableau first; web research is only gap-filling.
// Fuji/pagoda/clouds establish together, foliage frames the scene, flowers stay at edges.
export const sceneConfig = {
  durationSeconds: 10,
  motionLock: {cameraPush: 0.003, cameraX: 0, cameraY: -2, petalCount: 0},
  layers: [
    {id:'background',file:'background-main.jpg',x:540,y:960,width:1080,start:0,z:1,kind:'background'},

    // Landscape core: visible immediately as one coherent Japanese illustration.
    {id:'fuji',file:'fuji-main.png',x:548,y:1025,width:930,start:.05,z:2,enterY:10,motion:'fuji-still'},
    {id:'cloud1',file:'cloud-01.png',x:245,y:1125,width:620,start:.12,z:3,enterX:-8,motion:'cloud-right-soft'},
    {id:'cloud2',file:'cloud-02.png',x:850,y:1190,width:590,start:.18,z:3,enterX:8,motion:'cloud-left-soft'},
    {id:'pagoda',file:'pagoda-main.png',x:260,y:1395,width:360,start:.35,z:5,enterX:-10,enterY:10,motion:'structure-still'},

    // Asymmetric natural frame, matching the reference instead of a symmetrical gate.
    {id:'pineLeft',file:'pine-left.png',x:40,y:1550,width:405,start:.62,z:6,enterX:-14,motion:'micro-sway-left',origin:'18% 94%'},
    {id:'pineRight',file:'pine-right.png',x:1065,y:1600,width:330,start:.78,z:6,enterX:14,motion:'micro-sway-right',origin:'82% 94%'},

    // Sakura enters as foreground framing; no extra web SVGs unless a real gap remains.
    {id:'sakuraTopLeft',file:'sakura-top-left.png',x:95,y:225,width:525,start:1.00,z:8,enterX:-14,enterY:-10,motion:'sakura-left-soft',origin:'0% 0%',rotation:-2},
    {id:'sakuraTopRight',file:'sakura-top-right.png',x:1015,y:275,width:455,start:1.16,z:8,enterX:14,enterY:-10,motion:'sakura-right-soft',origin:'100% 0%',rotation:1},
    {id:'sakuraSideRight',file:'sakura-side-right.png',x:1060,y:730,width:245,start:1.34,z:8,enterX:12,motion:'side-sway-soft',origin:'100% 100%'},

    // Bottom florals are cropped edge accents like the reference, never a central altar.
    {id:'peonyLeft',file:'peony-left.png',x:-5,y:1880,width:360,start:1.72,z:10,enterY:14,motion:'flower-anchor-a'},
    {id:'peonyCenter',file:'peony-center.png',x:365,y:2010,width:215,start:1.88,z:9,enterY:12,motion:'flower-anchor-b'},
    {id:'peonyRight',file:'peony-right.png',x:1080,y:1900,width:345,start:2.02,z:10,enterY:14,motion:'flower-anchor-c'}
  ]
};
