import * as THREE from 'three';
import { parkData } from '@/assets/mock/mock';
import { Notification } from 'element-ui';
import EventBus from '../bus';
import { setModelDefaultMatrial } from '@/three/loaderModel';
import { floorBaseMaterial2 } from './material';
import { secondaryMaterial, trunkMaterial, primaryMaterial } from './material';
import { MQTT_URL, MQTT_OPTIONS, MQTT_TOPIC } from "../utils/mqttConfig";





export function loaderParkElectricity(app, msg) {
  app.flyTo({
    position: [-3.7424218566583374, 7.423061202264966, 2.3530322040864586],
    controls: [-1.3326413090350246, -0.5519077581036703, -3.2829283749098073],
    done: () => {
      createElectricityModel(app, msg);
    }
  });
}

export function createElectricityModel(app, msg) {
  console.log("获取到的超声波数值", msg);
  // 确保在app对象中初始化selectedObjects为一个空数组
  if (!app.selectedObjects) {
    app.selectedObjects = [];
  }
  let notifIndex = 0; // 初始化notifIndex

  // 封装逻辑到新的函数中
  function processElectricityModel(obj) {
    // 排除含有'火灾预警器'和'车流线'的
    if (obj.name.indexOf('火灾预警器') === -1 && obj.name.indexOf('安全路线') === -1) {
      obj.material = floorBaseMaterial2;
    } else if (obj.name.indexOf('安全路线1') > -1) {
      obj.material = secondaryMaterial;
    } else if (obj.name.indexOf('安全路线2') > -1) {
      if (msg && msg.Distan) {
        if (msg.Distan === 2) {
          obj.material = trunkMaterial;
        } else if (msg.Distan === 1) {
          obj.material = secondaryMaterial;
        } else {
          obj.material = secondaryMaterial;
        }
      } else {
        obj.material = secondaryMaterial;
      }
    } else {
      // 获取到每一个电表的值
      const floorName = obj.parent.parent.name;
      const layerName = obj.parent.name.substr(0, 2);
      const roomName = obj.name.substr(0, 3);
      console.log(parkData[floorName][layerName]);
      const value = parkData[floorName][layerName][roomName]?.d;


      // if (value > 460) {
      //   app.selectedObjects.push(obj);
      //   if (notifIndex < 6) {
      //     setTimeout(() => {
      //       Notification({
      //         title: '警告',
      //         message: `${floorName}的${layerName}${roomName}触发火灾预警`,
      //         type: 'warning',
      //         duration: 6000
      //       });
      //     }, notifIndex * 200);
      //     notifIndex++;
      //   }
      //   app.rayModel.push(obj);
      // }
    }
  }

  app.model.traverse(processElectricityModel);

  // 其他逻辑...

  app.initRaycaster(
    (activeObj, app, event) => {
      if (activeObj.object) {
        const obj = activeObj.object;
        const floorName = obj.parent.parent.name;
        const layerName = obj.parent.name.substr(0, 2);
        const roomName = obj.name.substr(0, 3);
        const value = parkData[floorName][layerName][roomName].d;
        EventBus.$emit('changeTooltip', {
          楼栋: floorName,
          楼层: layerName,
          房间号: roomName,
          度数: value,
          name: obj.name,
          type: '火',
          x: event.x,
          y: event.y,
          show: true
        });
      } else {
        EventBus.$emit('changeTooltip', {
          show: false
        });
      }
    },
    app.rayModel,
    'click'
  );
}

export function destroyParkElectricity(app) {
  app.selectedObjects = [];
  app.outlinePass.selectedObjects = app.selectedObjects;
  EventBus.$emit('changeTooltip', {
    show: false
  });
  setModelDefaultMatrial(app);
  app.destroyRaycaster('click');
}

