<template>
	<div>
		<dv-border-box-12 class="box1 box3" style="height: 45%;">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">任务分类</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<centerLeft1 />
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box5" style="height: 39%">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">分区情况</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<centerRight2 />
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box4">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">CO2浓度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<div class="water" style="height: 240px">
					<dv-water-level-pond
						class="dv-wa-le-po"
						style="height: 240px"
						:config="water"
					/>
				</div>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box6">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">空气温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart
					ref="echartId"
					:options="airOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">光照强度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart
					ref="echartId"
					:options="lightOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12>
		<!-- <dv-border-box-12
			class="box1 box3"
			style="left: auto; right: 1.72%; width: 200px; height: 230px"
		>
			<div class="box1-title">
				<div class="d-flex">
					<span class="text mx-2">控制面板</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(20% - 30px)">
				<ul style="margin-top: 25px">
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
						"
					>
						<span>风机开关</span>
						<el-switch v-model="fanValue" @change="fanValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
						"
					>
						<span>补光灯开关</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="display: flex; justify-content: space-between"
					>
						<span>灌溉开关</span>
						<el-switch v-model="irrigationValue" @change="irrigationValueChange"> </el-switch>
					</li>
				</ul>
			</div>
		</dv-border-box-12> -->
	</div>
</template>

<script>
import centerLeft1 from './centerLeft1';
import centerRight2 from '@/components/centerRightChart';
import { MQTT_TOPIC } from '@/utils/mqttConfig';
import {
	getSoilOption,
	getPhOption,
	getLightData,
	getairData,
} from './echarts-data';
export default {
	components: { centerLeft1, centerRight2 },
	props: {},
	data() {
		return {
			fanValue: false,
			lightValue: false,
			irrigationValue:false,
			soilOption: {},
			phOption: {},
			lightOption: {},
			airOption: {},
			drawTiming: 0,
			cdata: {
				year: null,
				weekCategory: [],
				radarData: [],
				radarDataAvg: [],
				maxData: 12000,
				weekMaxData: [],
				weekLineData: [],
			},
			water: {
				data: [24, 86],
				shape: 'roundRect',
				formatter: '{value}%',
				waveNum: 3,
			},
		};
	},
	mounted() {
		this.setOptions();
		this.focusOnView();
	},
	methods: {
		setOptions() {
			this.soilOption = getSoilOption(this.cdata);
			this.phOption = getPhOption(this.cdata);
			this.lightOption = getLightData();
			this.airOption = getairData();
			console.log(this.soilOption);
		},
		focusOnView() {
			window.app.flyTo({
			position: [18.45, 4.33, 31.30],
			controls: [-16.53, 1.49, 21.71],
			duration: 3000,
			});
		},
		irrigationValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? "{\"open\":0}" : "{\"clos\":1}",
				qos: 2
			}
			this.doPublic(data);
		},
		fanValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? '{\"open\":2}' : '{\"clos\":3}',
				qos: 2
			}
			this.doPublic(data);
		},
		lightValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? "{\"open\":4}" : "{\"clos\":5}",
				qos: 2
			}
			this.doPublic(data);
		},
		doPublic(data) {
			const topic = data.topic;
			const payload = data.payload;
			const qos = data.qos;
			console.log("Publish mqtt msg.");
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
	}
};
</script>
<style lang="less" scoped>
.box1 {
	position: absolute;
	width: 23%;
	left: 1.76%;
	height: 38vh;
	top: 42vh;
	background: rgba(4, 0, 0, 0.5);
	padding: 0.1rem 0.15rem;
	border-radius: 0.05rem;
	box-sizing: border-box;
}

.box2 {
	position: absolute;
	width: 23%;
	left: 0%;
	height: 38vh;
	top: 80vh;
	background: rgba(4, 0, 0, 0.5);
	padding: 0.1rem 0.15rem;
	border-radius: 0.05rem;
	box-sizing: border-box;
}

.box3 {
	left: 0%;
	right: 1.76%;
	top: 120px;
	font-size: 12px;
	bottom: 10%;
	height: 39vh;
	overflow: hidden;
	pointer-events: all;
}

.box4 {
	left: auto;
	right: 0;
	top: 120px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box5 {
	left: 0;
	right: auto;
	top: 620px;
	font-size: 12px;
	height: 30vh;
	overflow: hidden;
	pointer-events: all;
}

.box6 {
	left: auto;
	right: 0;
	top: 430px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box7 {
	left: auto;
	right: 0;
	top: 740px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box1-title {
	background: url(@/assets/icon_bg-a521a281.png) no-repeat;
	background-size: 100% 100%;
	height: 25px;
	line-height: 25px;
	margin-top: 5px;
	font-size: 15px;
}
.el-carousel {
	height: 100%;
}
</style>
