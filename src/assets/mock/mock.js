import * as THREE from 'three';

const floors = ['信息学院', 'B栋', 'C栋', 'D栋'];
const layers = ['1F', '2F', '3F', '4F', '5F', '6F', '7F', '8F', '9F', '10F'];
const rooms = ['101', '102', '306', '104'];

const parkData = {};

floors.forEach((v) => {
  parkData[v] = {};
  layers.forEach((k) => {
    parkData[v][k] = {};
    rooms.forEach((j) => {
      parkData[v][k][j] = {
        s: THREE.MathUtils.randInt(6, 20),
        d: THREE.MathUtils.randInt(500, 600)
      };
    });
  });
});

console.log(parkData);

const cameraUrls = {
  摄像头306: `movie/${THREE.MathUtils.randInt(1, 3)}.mp4`,
  摄像头B: `movie/${THREE.MathUtils.randInt(1, 3)}.mp4`,
  摄像头C: `movie/${THREE.MathUtils.randInt(1, 3)}.mp4`
};

const roomTexts = [
  {
    name: '摄像头',
    x: 0,
    y: 0.5,
    z: 0,
    class: 'camera-bg',
    type: '摄像头'
  },
  {
    name: '电表',
    x: 0,
    y: 0.5,
    z: 0,
    class: 'water-bg',
    type: '电'
  },
  {
    name: '火灾预警器',
    x: 0,
    y: 0.5,
    z: 0,
    class: 'electricity-bg',
    type: '火'
  }
];

export { parkData, roomTexts, cameraUrls };
