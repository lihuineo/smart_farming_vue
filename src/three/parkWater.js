import * as THREE from 'three';
import { floorBaseMaterial2 } from './material';
import { parkData } from '@/assets/mock/mock';
import { Notification } from 'element-ui';
import EventBus from '../bus';
import { setModelDefaultMatrial } from '@/three/loaderModel';

export function loaderParkWater (app) {
  app.flyTo({
    position: [11.18, 7.26, -5.05],
    controls: [-3.50, 1.03, -4.91],
    done: () => {
      createElectricityModel(app);
    }
  });
}

export function createElectricityModel (app) {
  let notifIndex = 0;
  app.model.traverse((obj) => {
    if (obj.isMesh) {
      if (obj.name.indexOf('电表') === -1) {
        obj.material = floorBaseMaterial2;
      } else {
        // 获取到每一个电表的值
        const floorName = obj.parent.parent.name;
        const layerName = obj.parent.name.substr(0, 2);
        const roomName = obj.name.substr(0, 3);
        const value = parkData[floorName][layerName][roomName].d;
        // 定义阈值
        if (value > 460) {
          app.selectedObjects.push(obj);
          console.log("78678678", obj)
          if (notifIndex > 6) {
            setTimeout(() => {
              Notification({
                title: '警告',
                message: `${floorName}的${layerName}${roomName}的用水量为${value}方, 已超过平均标准，请留意`,
                type: 'warning',
                duration: 6000
              });
            }, notifIndex * 200);
          }
          notifIndex++;
          app.rayModel.push(obj);
        }
      }
    }
  });

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
          type: '电',
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

export function destroyParkWater (app) {
  app.selectedObjects = [];
  app.outlinePass.selectedObjects = app.selectedObjects;
  EventBus.$emit('changeTooltip', {
    show: false
  });
  setModelDefaultMatrial(app);
  app.destroyRaycaster('click');
}
