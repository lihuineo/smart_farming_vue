import * as THREE from "three";
import { secondaryMaterial, trunkMaterial, primaryMaterial } from "./material";

let mixer; // 添加一个全局变量用于存储动画混合器
const clock = new THREE.Clock(); // 添加一个时钟对象

function animate () {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();
  mixer.update(delta); // 更新动画混合器

  // controls.update(); // 如果有控制器，请将其更新放在这里

  // renderer.render(scene, camera); // 如果有渲染器，请将其渲染操作放在这里
}

export function loaderModel (app) {
  return new Promise((resolve) => {
    // 模型控制组
    app.controlGroup = new THREE.Group();
    app.scene.add(app.controlGroup);
    // 用于存储模型的所有材质
    app.modelMaterials = {};
    app.rayModel = [];
    let urls = [
     {
        type: "glb",
        url: "model/养殖区/养殖区1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/养殖区/养殖区2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/养殖区/养殖区3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/养殖区/养殖区4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/办公区/办公区1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/办公区/办公区2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/办公区/办公区3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/办公区/办公区4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路5.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/小路6.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/路面1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/路面2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/土地/土地.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/大棚/大棚.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/大棚/大棚2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/大棚/大棚3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/大棚/大棚4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/大棚/大棚植被1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
        },
      },
      // {
      //   type: "glb",
      //   url: "model/大棚/大棚植被2.glb",
      //   onLoad: (object) => {
      //     app.scene.add(object.scene);

      //     // app.model = object.scene;
      //     object.scene.traverse((obj) => {
      //       // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
      //       if (obj.material) {
      //         app.modelMaterials[obj.name] = {
      //           material: obj.material,
      //         };
      //         // console.log("材质", app.modelMaterials[obj.name].material.name)
      //       }
      //       // 将模型的坐标也储存一份，在做楼层动画使用
      //       let { x, y, z } = obj.position;
      //       obj.position_tmp = { x, y, z };
      //     });
      //   },
      // },
      {
        type: "glb",
        url: "model/架子和布料/布料1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/布料2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/布料3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/架子1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/架子2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/架子3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/架子4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/架子和布料/架子5.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树5.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树6.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树7.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树8.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树9.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/树/树10.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);

          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田1.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田2.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田3.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田4.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田5.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田6.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田7.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田8.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田9.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田10.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
      {
        type: "glb",
        url: "model/水稻/试验田11.glb",
        onLoad: (object) => {
          app.scene.add(object.scene);
          // app.model = object.scene;
          object.scene.traverse((obj) => {
            // 将所有模型的材质储存在app.modelMaterials，在后续改变材质使用
            if (obj.material) {
              app.modelMaterials[obj.name] = {
                material: obj.material,
              };
              // console.log("材质", app.modelMaterials[obj.name].material.name)
            }
            // 将模型的坐标也储存一份，在做楼层动画使用
            let { x, y, z } = obj.position;
            obj.position_tmp = { x, y, z };
          });
        },
      },
    ];
    console.log("存储的材质", app.modelMaterials);
    let urlsLength = urls.length;
    app.iterateLoad(urls, null, () => { });

    resolve();
  });
}

export function setModelDefaultMatrial (app) {
  app.model.traverse((obj) => {
    if (obj.material) {
      obj.material = app.modelMaterials[obj.name].material;
    }
  });
}

export function destroyControlGroupText (app, className) {
  const textDoms = document.getElementsByClassName(className);
  for (let i = 0; i < textDoms.length; i++) {
    const textDom = textDoms[i];
    textDom.onclick = null;
  }
  app.instance.removeAll(app.controlGroup);
}

export function destroyControlGroup (app, className) {
  if (app?.controlGroup?.children?.length === 0) {
    return;
  }
  if (className) {
    destroyControlGroupText(app, className);
  }
  for (let i = app.controlGroup.children.length - 1; i > -1; i--) {
    const obj = app.controlGroup.children[i];
    if (obj.isMesh) {
      obj.geometry.dispose();
      obj.material.dispose();
      app.controlGroup.remove(obj);
    }
  }
}
