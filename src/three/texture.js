import * as THREE from "three";
// import { GIFTexture } from "three-gif-texture";
import GifLoader from "three-gif-loader";
// import { THREE_GetGifTexture } from "three-gif-texture";
const loader = new GifLoader();
const textureLoader = new THREE.TextureLoader();
// let gifTexture;
// function createGifTexture() {
//   THREE_GetGifTexture("texture/火12常用特效动图_爱给网_aigei_com.gif").then(
//     (texture) => {
//       // const cube = new THREE.Mesh(
//       //   new THREE.BoxGeometry(),
//       //   new THREE.MeshBasicMaterial({ map: texture })
//       // );
//       gifTexture = texture;
//       gifTexture.wrapS = gifTexture.wrapT = THREE.RepeatWrapping;
//       gifTexture.repeat.set(lineReatCount, lineReatCount);
//     }
//   );
// }
// createGifTexture();
// 线条贴图
const lineReatCount = 1;
export const secondaryTexture = textureLoader.load("texture/green_line.png");
secondaryTexture.wrapS = secondaryTexture.wrapT = THREE.RepeatWrapping;
secondaryTexture.repeat.set(lineReatCount, lineReatCount);
export const trunkTexture = textureLoader.load("texture/red_line.png");
trunkTexture.wrapS = trunkTexture.wrapT = THREE.RepeatWrapping;
trunkTexture.repeat.set(lineReatCount, lineReatCount);
export const primaryTexture = textureLoader.load("texture/blue_line.png");
primaryTexture.wrapS = primaryTexture.wrapT = THREE.RepeatWrapping;
primaryTexture.repeat.set(lineReatCount, lineReatCount);
// 加载GIF纹理
// export const gifTexture = textureLoader.load(
//   "texture/火12常用特效动图_爱给网_aigei_com.gif"
// );
export const gifTexture = () => {
  const texture = loader.load(
    // resource URL
    "texture/火焰.gif",

    // onLoad callback
    function (reader) {
      // You probably don't need to set onLoad, as it is handled for you. However,
      // if you want to manipulate the reader, you can do so here:
      console.log(reader.numFrames());
    },

    // onProgress callback
    function (xhr) {
      console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    },

    // onError callback
    function () {
      console.error("An error happened.");
    }
  );
  return texture;
};
// 设置GIF纹理的重复包裹方式
