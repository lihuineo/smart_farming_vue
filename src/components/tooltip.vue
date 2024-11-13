<template>
  <div
    class="tooltip-wrapper"
    :style="{
      visibility: data.show ? 'visible' : 'hidden',
      left: `${data.x}px`,
      top: `${data.y}px`,
      width: '100px',
      height: '50px',
    }"
  >
    <div class="tooltip bottom">
      <el-button type="text" style="float: right" @click="onClose"
        >关闭</el-button
      >
      <h3>{{ data["楼栋"] }}</h3>
      <h6>楼层: {{ data["楼层"] }}</h6>
      <div v-if="data['type'] !== '摄像头'" style="width: 250px">
        <h6>房间号：{{ data["房间号"] }}</h6>
        <h6 v-if="data['type'] === '火' && data['度数']">预警：室内有明火</h6>
        <!-- <h6 v-if="data['type'] === '火'">预警：正常</h6> -->
        <h6 v-else-if="data['type'] === '火'">预警：正常</h6>
        <h6 v-else>电量：{{ data["度数"] }} 度</h6>
      </div>
      <div v-else>
        <h6>摄像头：{{ data["name"] }}</h6>
        <!-- <video autoplay loop controls muted :src="data['视频']" style="width: 300px;"></video> -->
        <video
          autoplay
          loop
          controls
          muted
          src="movie/4.mp4"
          style="width: 300px"
        ></video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {},
  methods: {
    onClose() {
      this.$EventBus.$emit("changeTooltip", {
        show: false,
      });
    },
  },
};
</script>
<style lang="less" scoped>
.tooltip-wrapper {
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  width: auto;
  height: auto;
  color: #fff;
  opacity: 1;
  transition: none;
  z-index: 3;
}

.tooltip-wrapper .tooltip {
  padding: 10px 15px 15px 15px;
  border-radius: 0;
  display: inline-block;
  position: relative;
  margin-left: -50%;
  margin-top: -100%;
  top: -83px;
  opacity: 1;
  border: 1px solid #2294ff;
  background: linear-gradient(to bottom, #081a30, #003678);
  box-shadow: inset 0 0 10px rgba(13, 150, 255, 0.8);
}

.tipnav {
  position: relative;
  z-index: 10;
}

.tooltip-wrapper .tooltip::before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 0;
  pointer-events: none;
}

.tooltip-wrapper .tooltip::before {
  background: url("./../assets/image/mdbg.png") center top no-repeat,
    url(./../assets/image/ft_mdbg.png) left bottom no-repeat;
}

.tooltip-wrapper .tooltip > h3 {
  font-size: 32px;
  position: initial !important;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 0 13px 0;
  text-align: center;
}

.tooltip-wrapper .tooltip > h3:before {
  position: absolute;
  content: "";
  pointer-events: none;
  left: -10px;
  top: -10px;
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: rgba(5, 7, 9, 0.2);
  border: 1px solid rgba(124, 192, 255, 0.1);
  z-index: -1;
}

.tooltip-wrapper .tooltip h6 {
  font-size: 24px;
  height: 36px;
}
</style>
