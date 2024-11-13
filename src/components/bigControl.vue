<template>
  <div>
    <div class="container">
      <form>
        <label
          v-for="(item, index) in controls"
          :key="index"
          @click="activeFun(index)"
        >
          <input type="radio" name="radio" :checked="index === activeVar" />
          <span>{{ item.name }}</span>
        </label>
      </form>
      <!-- 楼层返回 -->
      <div
        class="back animated fadeIn"
        @click="backFloorBase"
        v-if="isShowFloorBack"
      >
        <img src="./../assets/image/back.png" alt="" />
        <p>返回</p>
      </div>
      <!-- 楼层ui -->
      <layer
        :layers="layerData"
        :active="currentLayer"
        :styles="{ top: '40%', left: '72%', height: '400px' }"
        @change="changeLayer"
        v-if="isShowFloorBack"
      ></layer>
      <tooltip :data="roomTooltipStyle" />
    </div>
  </div>
</template>

<script>
import { loaderFloorManage, setModelLayer } from "@/three/floorManage";
import {
  destroyControlGroup,
  setModelDefaultMatrial,
} from "@/three/loaderModel";
import layer from "@/components/layer";
import tooltip from "@/components/tooltip";
import { parkData, cameraUrls } from "@/assets/mock/mock";
import {
  loaderParkElectricity,
  destroyParkElectricity,
} from "@/three/parkElectricity";
import { loaderParkWater, destroyParkWater } from "@/three/parkWater";
import { log } from "@/utils/mqtt.min";
import { MQTT_URL, MQTT_OPTIONS, MQTT_TOPIC } from "../utils/mqttConfig";

export default {
  name: "",
  components: {
    layer,
    tooltip,
  },
  props: {},
  data() {
    return {
      // 当前超声波数值
      currentCsb: 0,
      roomTooltipStyle: {
        show: false,
        x: 0,
        y: 0,
        name: "",
      },
      layerData: [],
      currentLayer: "全楼",
      curFloorModel: null,
      isShowFloorBack: false,
      controls: [
        {
          name: "首页",
          goFunction: () => {
            window.app.flyTo({
              position: app.cameraPostion,
              controls: app.controlsTarget,
              duration: 1000,
            });
          },
          backFunction: () => {},
        },
        {
          name: "楼层管理",
          goFunction: () => {
            loaderFloorManage(window.app);
          },
          backFunction: () => {
            destroyControlGroup(window.app, "floorText-3d");
            this.isShowFloorBack = false;
            this.roomTooltipStyle.show = false;
            if (this.curFloorModel && this.currentLayer !== "全楼") {
              this.currentLayer = "全楼";
              setModelLayer(
                window.app,
                this.curFloorModel,
                this.currentLayer,
                this.layerData,
                () => {
                  setModelDefaultMatrial(window.app);
                  this.curFloorModel = null;
                }
              );
            } else {
              setModelDefaultMatrial(window.app);
            }
          },
        },
        {
          name: "火灾预警",
          goFunction: (msg) => {
            console.log("开启火灾预警------------");
            loaderParkElectricity(window.app, msg);
          },
          backFunction: () => {
            destroyParkElectricity(window.app);
          },
        },
        {
          name: "电力监测",
          goFunction: () => {
            loaderParkWater(window.app);
          },
          backFunction: () => {
            destroyParkWater(window.app);
          },
        },
      ],
      activeVar: 0,
    };
  },
  watch: {
    currentCsb(newVal, oldVal) {
      console.log("当前镜头", this.currentNewVal);
      console.log("当前超声波", newVal);
      console.log("旧的超声波", oldVal);
      if (this.currentNewVal === 2) {
        const newControl = this.controls.find(
          (item) => item.name === this.controls[2].name
        );
        newControl.goFunction(newVal);
      }
    },
    activeVar(newVal, oldVal) {
      this.currentNewVal = newVal;
      console.log("当前镜头", newVal);
      let msg;
      if (newVal === 2) {
        this.getCurrtntMqttMsg();
      }
      const oldControl = this.controls.find(
        (item) => item.name === this.controls[oldVal].name
      );
      oldControl.backFunction();
      const newControl = this.controls.find(
        (item) => item.name === this.controls[newVal].name
      );
      newControl.goFunction();
    },
  },
  methods: {
    doPublic(data) {
      const topic = data.topic;
      const payload = data.payload;
      const qos = data.qos;
      this.$mqttClient.publish(
        topic,
        payload,
        {
          qos,
        },
        (error) => {
          if (error) {
            console.log("Publish error", error);
          }
        }
      );
    },
    // 订阅主题
    doSubscribe(topic, qos) {
      this.$mqttClient.subscribe(
        topic,
        {
          qos,
        },
        (error, res) => {
          if (error) {
            console.log("订阅主题错误！", error);
            uni.showToast({
              title: "获取环境数据错误",
              duration: 2000,
              icon: "error",
            });
            return;
          }
          this.subscribeSuccess = true;
          console.log("订阅的主题：", res);
        }
      );
    },
    getCurrtntMqttMsg() {
      let totalMsg;
      this.$mqttClient.on("message", (topic, message) => {
        switch (topic) {
          case MQTT_TOPIC.CSB_TOPIC: {
            // this.receiveNews = JSON.parse(message)
            // const keyValue = Object.values(this.receiveNews)
            let msg;
            try {
              const checkMsg = message.toString();
              console.log("bigControl组件接收的checkMsg", checkMsg);
              msg = JSON.parse(checkMsg);
            } catch (e) {
              return;
            }
            console.log("bigControl组件接收的msg", msg);
            totalMsg = msg;
            console.log("bigControl组件接收的totalMsg", totalMsg);
            this.currentCsb = totalMsg;
          }
        }
      });
    },
    activeFun(index) {
      this.activeVar = index;
    },
    // 返回到楼层初始化状态
    backFloorBase() {
      this.isShowFloorBack = false;
      this.roomTooltipStyle.show = false;
      if (this.curFloorModel && this.currentLayer !== "全楼") {
        this.currentLayer = "全楼";
        setModelLayer(
          window.app,
          this.curFloorModel,
          this.currentLayer,
          this.layerData,
          () => {
            setModelDefaultMatrial(window.app);
            loaderFloorManage(window.app);
            this.curFloorModel = null;
          }
        );
      } else {
        setModelDefaultMatrial(window.app);
        loaderFloorManage(window.app);
      }
    },
    // 改变楼层函数
    changeLayer(layer) {
      this.currentLayer = layer;
      setModelLayer(window.app, this.curFloorModel, layer, this.layerData);
    },
  },
  mounted() {
    this.$EventBus.$on("changeFloorUI", (obj) => {
      this.isShowFloorBack = obj.isShowFloorBack;
      this.curFloorModel = obj.model;
      const layerNames = obj.model.children
        .filter((item) => item.name.indexOf("F") > -1)
        .map((item) => {
          const name = item.name.substr(0, item.name.indexOf("F") + 1);
          return name;
        });
      this.currentLayer = "全楼";
      this.layerData = [this.currentLayer].concat(layerNames);
    });

    this.$EventBus.$on("changeRoomTooltip", (obj) => {
      const data = parkData[this.curFloorModel.name];
      if (obj.name.indexOf("摄像头") > -1) {
        this.roomTooltipStyle = Object.assign(
          {
            楼栋: this.curFloorModel.name,
            楼层: this.currentLayer,
            摄像头: obj.name,
            视频: cameraUrls[obj.name.substr(0, 4)],
          },
          obj
        );
      } else {
        const roomName = obj.name.substr(0, 3);
        this.roomTooltipStyle = Object.assign(
          {
            楼栋: this.curFloorModel.name,
            楼层: this.currentLayer,
            房间号: roomName,
            度数: data[this.currentLayer][roomName].d,
          },
          obj
        );
      }
    });
    this.$EventBus.$on("changeTooltip", (obj) => {
      Object.assign(this.roomTooltipStyle, obj);
    });
  },
};
</script>
<style lang="less" scoped>
.img-responsive {
  width: 2200px;
  height: 60px;
}
.head_top {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: -1130px;
  margin-left: -750px;
}

.back {
  width: 48px;
  position: fixed;
  bottom: 4%;
  left: 25%;
  z-index: 3;
  cursor: pointer;
  font-size: 18px;
  img {
    width: 100%;
  }
  p {
    color: #fff;
    text-align: center;
  }
}
.container form {
  display: flex;
  flex-wrap: wrap;
  margin-left: -250px;
  margin-top: -50px;
}

.container label {
  display: flex;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  overflow: hidden;
  margin-bottom: 0.375em;
}

.container label input {
  position: absolute;
  left: -9999px;
}

.container label input:checked + span {
  background-color: #414181;
  color: white;
}

.container label input:checked + span:before {
  box-shadow: inset 0 0 0 0.4375em #00005c;
}

.container label span {
  display: flex;
  align-items: center;
  padding: 0.375em 0.75em 0.375em 0.375em;
  border-radius: 99em;
  transition: 0.25s ease;
  color: #414181;
}

.container label span:hover {
  background-color: #d6d6e5;
}

.container label span:before {
  display: flex;
  flex-shrink: 0;
  content: "";
  background-color: #fff;
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  margin-right: 0.375em;
  transition: 0.25s ease;
  box-shadow: inset 0 0 0 0.125em #00005c;
}
</style>
