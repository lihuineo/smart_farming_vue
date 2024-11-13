import * as THREE from "three";
import {
  secondaryTexture,
  trunkTexture,
  primaryTexture,
  pointTexture,
  gifTexture,
} from "./texture";

export const floorBaseMaterial = new THREE.MeshBasicMaterial({
  color: 0x00beff,
  transparent: true,
  opacity: 0.3,
  depthWrite: false,
});

export const floorBaseMaterial2 = new THREE.MeshBasicMaterial({
  color: 0x00beff,
  transparent: true,
  opacity: 0.3,
  wireframe: true,
});

export const darkMaterial = new THREE.MeshBasicMaterial({ color: "#000" });

// 地图线材质
export const secondaryMaterial = new THREE.MeshBasicMaterial({
  map: secondaryTexture,
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 1,
  lightMapIntensity: 4,
});
export const trunkMaterial = new THREE.MeshBasicMaterial({
  map: trunkTexture,
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 1,
  lightMapIntensity: 4,
});
export const primaryMaterial = new THREE.MeshBasicMaterial({
  map: primaryTexture,
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 1,
  lightMapIntensity: 4,
});
// 创建基于GIF纹理的材质
export const gifMaterial = new THREE.MeshBasicMaterial({
  map: gifTexture(),
  transparent: true,
  side: THREE.DoubleSide,
  opacity: 1,
  lightMapIntensity: 4,
});
