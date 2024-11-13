<template>
	<div>
		<!-- <dv-border-box-12 class="box1 box3" style="height: 45%;">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">任务分类</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<centerLeft1 />
			</div>
		</dv-border-box-12> -->
		<dv-border-box-12 class="box1 box4">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">CO2浓度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<div class="water" style="height: 240px">
					<dv-water-level-pond class="dv-wa-le-po" style="height: 240px" :config="water" />
				</div>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box6">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">空气温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart ref="echartId" :options="airOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">光照强度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart ref="echartId" :options="lightOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box3" style="left: auto; right: 0; width: 23%; height: 360px">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">设备控制</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(20% - 30px)">
				<ul style="margin-top: 25px">
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯一组</span>
						<el-switch v-model="light1Value" @change="light1ValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯二组</span>
						<el-switch v-model="light2Value" @change="light2ValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯三组</span>
						<el-switch v-model="light3Value" @change="light3ValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>风机1号</span>
						<el-switch v-model="fan1Value" @change="fan1ValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>风机2号</span>
						<el-switch v-model="fan2Value" @change="fan2ValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="display: flex; justify-content: space-between; 							padding-left: 20px;
; font-size: 16px;">
						<span>灌溉系统</span>
						<el-switch v-model="irrigationValue" @change="irrigationValueChange"> </el-switch>
					</li>
				</ul>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box5">
			<div class="box1-title" style="background-size: 100% 100%">
				<div class="d-flex">
					<span class="px-4">告警列表</span>
				</div>
			</div>
			<div
				class="p-1"
				style="
					height: calc(100% - 40px);
					display: flex;
					overflow: hidden;
				"
			>
				<el-table
					:header-cell-style="{
						'background-color': 'rgba(194, 217, 255, 0.08)',
					}"
					class="custom-table-header mt-3"
					height="100%"
					:data="tableData"
					style="width: 100%"
				>
					<el-table-column prop="name1" label="告警时间" />
					<el-table-column prop="name2" label="告警位置" />
					<el-table-column prop="name3" label="告警类型" />
				</el-table>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box8">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">温棚实景</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<el-carousel
					:interval="4000"
					height="100%"
					indicator-position="none"
				>
					<el-carousel-item v-for="item in imgs" :key="item">
						<img width="100%" height="100%" :src="item" />
					</el-carousel-item>
				</el-carousel>
			</div>
		</dv-border-box-12>
		<div class="box1 box3" style="
				right: auto;
				height: 80px;
				width: 20%;
				left: 40%;
				top: auto;
				bottom: 2%;
				background-color: rgba(255, 255, 255, 0);
			">
			<div class="d-flex">
				<div @click="focusOnLeft().catch(err => err), item_idx = 9" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background: 'rgba(103, 0, 229, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/greenhouse1.png" class="icon-style">
						<span class="text">室外</span>
					</div>
				</div>
				<div @click="focusOnRight().catch(err => err), item_idx = 10" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background: 'rgba(240, 91, 114, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/greenhouse2.png" class="icon-style">
						<span class="text">室内</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import centerLeft1 from './centerLeft1';
import centerRight2 from '@/components/centerRightChart';
import { MQTT_TOPIC } from '@/utils/mqttConfig';
import { MODEL_KEY } from '@/utils/modelKeys';

import {
	getSoilOption,
	getPhOption,
	getLightData,
	getairData,
} from './echarts-data';
import * as THREE from "three";
var animateId;

export default {
	components: { centerLeft1, centerRight2 },
	props: {},
	data() {
		return {
			fan1Value: false,
			fan2Value: false,
			light1Value: false,
			light2Value: false,
			light3Value: false,
			irrigationValue: false,
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
			tableData: [
				{
					name1: '2024-11-08',
					name2: '办公室',
					name3: '设备故障',
				},
				{
					name1: '2024-11-08',
					name2: '大棚区',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '粮仓',
					name3: '温度过高',
				},
				{
					name1: '2024-11-08',
					name2: '库房',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '办公室',
					name3: '设备故障',
				},
				{
					name1: '2024-11-08',
					name2: '大棚区',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '办公室',
					name3: '设备故障',
				},
				{
					name1: '2024-11-08',
					name2: '库房',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '粮仓',
					name3: '温度过高',
				},
				{
					name1: '2024-11-08',
					name2: '大棚区',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '办公室',
					name3: '设备故障',
				},
				{
					name1: '2024-11-08',
					name2: '粮仓',
					name3: '温度过高',
				},
				{
					name1: '2024-11-08',
					name2: '大棚区',
					name3: '烟雾报警',
				},
				{
					name1: '2024-11-08',
					name2: '大棚区',
					name3: '烟雾报警',
				},
			],
			imgs: [
				require('./../../assets/image/greenhouse_live.jpg'),
			],
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
				// 坐标
				position: [24.33, 12.08, 47.76],
				controls: [-19.91, -8.03, 2.36],
				duration: 2000,
			});
		},
		focusOnLeft() {
			window.app.flyTo({
				// 棚外坐标
				position: [-42.50, 19.17, 8.95], 
				controls: [6.07, -11.0, 37.53],
				duration: 2000,
			});
			item_idx = 9;

			item_idx
		},
		focusOnRight() {
			window.app.flyTo({
				// 棚内坐标
				position: [-2.91, 1.51, 21.56],
				controls: [5.12, 1.34, 20.44], 
				duration: 2000,
			});
			item_idx = 10;
		},

		irrigationValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? "{\"open\":0}" : "{\"clos\":1}",
				qos: 2
			}
			this.doPublic(data);
		},

		fan1ValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? '{\"open\":2}' : '{\"clos\":3}',
				qos: 2
			}
			this.doPublic(data);

			//大棚内部朝北视角
			//{x: 5.090693552250058, y: 1.19427143804426, z: 24.00752087711681}
			//{x: 5.12, y: 1.34, z: 20.44}

			const clock = new THREE.Clock();
			window.app.scene.children.forEach(element => {
				if (element.name == MODEL_KEY.GREENHOUSE_FAN_1) {
					let animate = function () {
						animateId = requestAnimationFrame(animate);
						const frameT = clock.getDelta();
						element.AnimationMixer.update(frameT);
					};

					if (val) {
						element.clipAction.play();
						animate();
					} else {
						element.clipAction.stop();
						cancelAnimationFrame(animateId);
					}
					// element.visible = val ? true : false; //元素显隐
				}
			});
		},

		fan2ValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? '{\"open\":6}' : '{\"clos\":7}',
				qos: 2
			}
			this.doPublic(data);

			const clock = new THREE.Clock();
			window.app.scene.children.forEach(element => {
				if (element.name == MODEL_KEY.GREENHOUSE_FAN_2) {
					let animate = function () {
						animateId = requestAnimationFrame(animate);
						const frameT = clock.getDelta();
						element.AnimationMixer.update(frameT);
					};

					if (val) {
						element.clipAction.play();
						animate();
					} else {
						element.clipAction.stop();
						cancelAnimationFrame(animateId);
					}
				}
			});
		},

		light1ValueChange(val) {
			const data = {
				topic: MQTT_TOPIC.DEV_TOPIC,
				payload: val ? "{\"open\":4}" : "{\"clos\":5}",
				qos: 2
			}
			this.doPublic(data);

			window.app.scene.children.forEach(element => {
				if (element.name == MODEL_KEY.GREENHOUSE_LIGHT_1) {
					element.visible = val ? true : false; //元素显隐
				}
			});
		},

		light2ValueChange(val) {
			window.app.scene.children.forEach(element => {
				if (element.name == MODEL_KEY.GREENHOUSE_LIGHT_2) {
					element.visible = val ? true : false; 
				}
			});
		},

		light3ValueChange(val) {
			window.app.scene.children.forEach(element => {
				if (element.name == MODEL_KEY.GREENHOUSE_LIGHT_3) {
					element.visible = val ? true : false; //元素显隐
				}
			});
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
	left: 0;
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
	left: 0;
	right: 0%;
	top: 120px;
	font-size: 12px;
	bottom: 10%;
	height: 39vh;
	overflow: hidden;
	pointer-events: all;
}

.box4 {
	left: 0;
	right: auto;
	top: 120px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box5 {
	left: auto;
	right: 0;
	top: 480px;
	font-size: 12px;
	height: 240px;
	overflow: hidden;
	pointer-events: all;
}

.box6 {
	left: 0;
	right: auto;
	top: 430px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box7 {
	left: 0;
	right: auto;
	top: 740px;
	font-size: 12px;
	height: 300px;
	overflow: hidden;
	pointer-events: all;
}

.box8 {
	left: auto;
	right: 0;
	top: 67%;
	font-size: 12px;
	height: 30%;
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

::v-deep {
	.el-table {
		background: transparent;
		tr {
			background: transparent;
		}
		th {
			border: none !important;
			color: rgb(205, 224, 255);
		}
		td {
			border: none !important;
			color: white;
		}
		.el-table__header-wrapper {
			color: white; /* 表头文本颜色 */
		}
		.el-table__header {
			margin-bottom: 10px;
		}
	}
	.el-table .el-table__body tr.el-table__row:nth-child(odd) {
		background-color: rgba(194, 217, 255, 0.08);
	}
	.el-table .el-table__body tr.el-table__row:nth-child(even) {
		background-color: rgba(194, 217, 255, 0.24);
	}

	.el-table__row:hover {
		background-color: rgba(194, 217, 255, 0.24);
	}
	.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
		background: transparent;
	}
	.el-table--enable-row-hover .el-table__body tr:hover > td {
		background-color: rgba(194, 217, 255, 0.24);
	}
	.el-table__inner-wrapper::before {
		height: 0;
	}
	.el-input {
		border: none;
	}
	.el-input__wrapper {
		background: transparent;
		box-shadow: none;
	}
	.gutter {
		display: none;
	}
}

.menu-text {
	animation: menu-text-size 3s linear infinite;
}

.camera-menu-item {
	font-size: 20px;
	width: 40%;
	height: 30%;
	line-height: 25px;
	text-align: center;
	margin-left: 5%;
	margin-right: 5%;
	border-radius: 20px;
	overflow: hidden;
}

.icon-style {
	padding-left: 0%;
	width: 20%;
	height: 20%;
}

.text {
	display: inline-block;
	margin-left: 8px;
}

@keyframes menu-text-size {
	from {
		transform: scale(0.8);
	}

	to {
		transform: scale(1.0);
	}
}
</style>
