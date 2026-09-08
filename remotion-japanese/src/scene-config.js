// FUJI V3 — REFERENCE FIRST
// Goal: match the supplied reference structure before adding decoration.
// Source order: supplied artwork first; web assets only if a real visual gap remains.
export const sceneConfig = {
  durationSeconds: 6,
  motionLock: {
    cameraPush: 0.012,
    cameraX: 0,
    cameraY: 0,
    petalCount: 4,
  },
  layers: [
    // quiet ivory-paper background
    {id:'background',file:'background-main.jpg',x:540,y:960,width:1080,start:0,z:1,kind:'background'},

    // one compact landscape cluster — Fuji stays central and dominant
    {id:'fuji',file:'fuji-main.png',x:555,y:1125,width:940,start:0.12,z:2,enterY:20,motion:'fuji-still'},

    // mist/clouds hug the mountain base rather than floating independently
    {id:'cloud1',file:'cloud-01.png',x:285,y:1110,width:590,start:0.45,z:3,enterX:-16,motion:'cloud-right-soft'},
    {id:'cloud2',file:'cloud-02.png',x:825,y:1170,width:530,start:0.62,z:3,enterX:16,motion:'cloud-left-soft'},

    // pagoda is secondary and partially nestled into the lower landscape
    {id:'pagoda',file:'pagoda-main.png',x:220,y:1425,width:295,start:0.82,z:4,enterY:20,motion:'structure-still'},

    // foreground framing — asymmetrical, never a symmetrical gate
    {id:'pineLeft',file:'pine-left.png',x:65,y:1590,width:360,start:1.08,z:5,enterX:-28,motion:'micro-sway-left',origin:'20% 96%'},
    {id:'pineRight',file:'pine-right.png',x:1050,y:1640,width:310,start:1.26,z:5,enterX:28,motion:'micro-sway-right',origin:'80% 96%'},

    // sakura canopy enters last and frames rather than covers the hero
    {id:'sakuraTopLeft',file:'sakura-top-left.png',x:130,y:255,width:500,start:1.55,z:7,enterX:-36,enterY:-24,motion:'sakura-left-soft',origin:'0% 0%',rotation:-2},
    {id:'sakuraTopRight',file:'sakura-top-right.png',x:1020,y:330,width:405,start:1.78,z:7,enterX:34,enterY:-22,motion:'sakura-right-soft',origin:'100% 0%',rotation:2},
    {id:'sakuraSideRight',file:'sakura-side-right.png',x:1080,y:780,width:205,start:2.02,z:7,enterX:26,motion:'side-sway-soft',origin:'100% 100%'},

    // only edge floral anchors; no central altar arrangement
    {id:'peonyLeft',file:'peony-left.png',x:55,y:1885,width:300,start:2.28,z:9,enterY:28,motion:'flower-anchor-a'},
    {id:'peonyRight',file:'peony-right.png',x:1045,y:1900,width:285,start:2.46,z:9,enterY:28,motion:'flower-anchor-c'}
  ]
};
