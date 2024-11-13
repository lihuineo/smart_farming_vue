import { CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';
import * as THREE from 'three';
import { floorBaseMaterial } from './material';
import { destroyControlGroupText } from '@/three/loaderModel';
import EventBus from '../bus';
import { roomTexts, parkData } from '@/assets/mock/mock';
import { secondaryMaterial, trunkMaterial, primaryMaterial, gifMaterial } from './material';



export function loaderFloorManage(app) {
  app.flyTo({
    position: [7.38, 17.84, 17.68],
    controls: [-3.74, 4.37, -0.66],
    done: () => {
      createFloorText(app);
    }
  });
}

// 点击楼层管理菜单后调用
export function createFloorText(app) {
  app.model.traverse((obj) => {
    if (obj.name.indexOf('楼顶') > -1) {
      const name = obj.parent.name;
      const position = Object.values(app.getModelWorldPostion(obj));
      position[1] += 1;
      const html = `
        <div class="floorText-3d animated fadeIn" id="${name}" position="${position}" ><p class="text">${name}</p></div>`;
      app.instance.add({
        parent: app.controlGroup,
        cssObject: CSS3DSprite,
        name,
        element: html,
        position,
        scale: [0.02, 0.02, 0.02]
      });
    }
  });

  const textDoms = document.getElementsByClassName('floorText-3d');
  for (let i = 0; i < textDoms.length; i++) {
    const textDom = textDoms[i];
    textDom.onclick = () => {
      for (let i = 0; i < app.model.children.length; i++) {
        const obj = app.model.children[i];
        if (obj.name === textDom.id) {
          // 显示返回文本和楼层ui
          EventBus.$emit('changeFloorUI', {
            isShowFloorBack: true,
            model: obj
          });

          // 计算当前点击模型的中心点
          const centerPosition = Object.values(app.getModelWorldPostion(obj));

          app.flyTo({
            position: [centerPosition[0], centerPosition[1] + 10, centerPosition[2] + 10],
            controls: centerPosition
          });


          // 恢复点击模型组的材质
          obj.traverse((childrenObj) => {
            if (childrenObj.material) {
              if (app.modelMaterials[childrenObj.name]) {
                childrenObj.material = app.modelMaterials[childrenObj.name].material;
              }
            }
          });

        } else {
          // 设置除点击模型的组以外的基础色
          obj.traverse((childrenObj) => {
            if (childrenObj.material) {
              childrenObj.material = floorBaseMaterial;
            }
          });
        }
      }

      destroyControlGroupText(app, 'floorText-3d');
    };

  }
}

// 点击楼层列表选项会触发创建房间内容
export function createRoomText(app, model) {
  model.traverse((obj) => {
    if (obj.name.indexOf("火焰") !== -1) {
      console.log("000", obj.material.name)
      obj.material = gifMaterial;
    }

    else if (obj.isMesh) {
      roomTexts.forEach((item) => {
        if (obj.name.indexOf(item.name) > -1) {
          console.log(obj.name);
          const name = obj.name;
          const position = Object.values(app.getModelWorldPostion(obj));
          position[0] += item.x;
          position[1] += item.y;
          position[2] += item.z;
          const html = `
        <div class="room-3d animated fadeIn"  _type="${item.type}"  id="${name}" position="${position}" >
          <p class="text">${name}</p>
          <div class="${item.class}"></div>
        </div>`;
          app.instance.add({
            parent: app.controlGroup,
            cssObject: CSS3DSprite,
            name: name,
            element: html,
            position: position,
            scale: [0.005, 0.005, 0.005]
          });
        }
      });
    }

  });

  const textDoms = document.getElementsByClassName('room-3d');
  for (let i = 0; i < textDoms.length; i++) {
    const textDom = textDoms[i];
    textDom.onclick = (event) => {
      const type = textDom.getAttribute('_type');
      const model = app.model.getObjectByName(textDom.id);
      EventBus.$emit('changeRoomTooltip', {
        name: model.name,
        type: type,
        x: event.x,
        y: event.y,
        show: true
      });
    };
  }
}

// 点击楼层列表选项后触发设置模型
export function setModelLayer(app, model, layerName, layerData, callback) {
  // 清除当前楼层文本
  destroyControlGroupText(app, 'room-3d');
  const currentLayer = Number(layerName.substring(0, layerName.indexOf('F')));
  for (let i = 0; i < model.children.length; i++) {
    let mesh = model.children[i];
    let name = mesh.name;
    let num;

    // 对楼顶特殊处理
    if (name.indexOf('楼顶') > -1) {
      num = Object.values(layerData).length + 1;
    } else {
      num = Number(name.substring(0, name.indexOf('F')));
    }

    let value = num - currentLayer;
    let position = mesh.position;
    let position_tmp = mesh.position_tmp;
    let toPosition;
    if (layerName === '全楼') {
      // 点击全部楼层时执行
      toPosition = [position_tmp.x, position_tmp.y, position_tmp.z];
    } else {
      if (value >= 1) {
        toPosition = [position_tmp.x, position_tmp.y + value * 10, position_tmp.z];
      } else {
        toPosition = [position_tmp.x, position_tmp.y, position_tmp.z];
      }
    }

    app.modelMove(
      {
        fromPosition: [position.x, position.y, position.z],
        toPosition,
        duration: 300,
        done: () => {
          if (layerName === '全楼') {
            if (callback) {
              callback();
              return;
            }
            const centerPosition = Object.values(app.getModelWorldPostion(model));
            app.flyTo({
              position: [centerPosition[0] + 10, centerPosition[1] + 10, centerPosition[2] + 10],
              controls: centerPosition
            });
            return;
          }
          if (mesh.name.indexOf(layerName) > -1) {
            if (callback) {
              callback();
              return;
            }
            // 计算当前点击模型的中心点
            const centerPosition = Object.values(app.getModelWorldPostion(mesh));
            app.flyTo({
              position: [centerPosition[0] + 1, centerPosition[1] + 10, centerPosition[2] + 11],
              controls: centerPosition,
              done: () => {
                createRoomText(app, mesh);
              }
            });
          }
        }
      },
      mesh
    );
  }
}
