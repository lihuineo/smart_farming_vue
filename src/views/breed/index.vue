<template>
	<div>
		<dv-border-box-12 class="box1 box3" style="height: 340px">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">分区情况</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<centerRight2 />
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box5">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">任务统计</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 20px)">
				<div class="down">
					<div class="percent">
						<div class="item bg-color-black">
							<span>全量任务通过率</span>
							<CenterChart :id="rate[0].id" :tips="rate[0].tips" :colorObj="rate[0].colorData" />
						</div>
						<div class="item bg-color-black">
							<span>核心任务达标率</span>
							<CenterChart :id="rate[1].id" :tips="rate[1].tips" :colorObj="rate[1].colorData" />
						</div>
						<div class="water">
							<dv-water-level-pond class="dv-wa-le-po" :config="water" />
						</div>
					</div>
				</div>
			</div>
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="left: auto; right: 1.72%; width: 300px; height: 360px"
		>
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">控制面板</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(20% - 30px)">
				<ul style="margin-top: 25px">
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						"
					>
						<span>温棚风机1</span>
						<el-switch v-model="fanValue" @change="fanValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						"
					>
						<span>温棚风机2</span>
						<el-switch v-model="fanValue" @change="fanValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						"
					>
						<span>补光灯1</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						"
					>
						<span>补光灯2</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						"
					>
						<span>补光灯3</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li
						class="mb-4"
						style="display: flex; justify-content: space-between; 							padding-left: 20px;
; font-size: 16px;"
					>
						<span>灌溉开关</span>
						<el-switch v-model="irrigationValue" @change="irrigationValueChange"> </el-switch>
					</li>
				</ul>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box3" style="
				right: auto;
				height: 220px;
				width: 50%;
				left: 25%;
				top: 860px;
			">
			<div class="box1-title" style="background-size: 50% 100%">
				<div class="d-flex">
					<span class="text px-4">核心指标</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<center />
			</div>
		</dv-border-box-12>
	</div>
</template>

<script>
import centerRight2 from '@/components/centerRightChart';
import CenterChart from '@/components/centerChartRate';
import center from './center';
import { MQTT_TOPIC } from '@/utils/mqttConfig';
import {
	getSoilOption,
	getPhOption,
	getLightData,
	getairData,
} from './echarts-data';
export default {
	components: { centerRight2, CenterChart, center },
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
			// 通过率和达标率的组件复用数据
			rate: [
				{
					id: 'centerRate1',
					tips: 83.2,
					colorData: {
						textStyle: '#3fc0fb',
						series: {
							color: ['#00bcd44a', 'transparent'],
							dataColor: {
								normal: '#03a9f4',
								shadowColor: '#97e2f5',
							},
						},
					},
				},
				{
					id: 'centerRate2',
					tips: 91.6,
					colorData: {
						textStyle: '#67e0e3',
						series: {
							color: ['#faf3a378', 'transparent'],
							dataColor: {
								normal: '#ff9800',
								shadowColor: '#fcebad',
							},
						},
					},
				},
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
				position: [73.16, 44.52, 73.48],
				controls: [13.83, -22.17, -4.28],
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
	left: 0%;
	right: 1.76%;
	top: calc(66% - 120px);
	font-size: 12px;
	bottom: 10%;
	height: 39vh;
	overflow: hidden;
	pointer-events: all;
}

.box5 {
	left: 0;
	right: 0%;
	top: 480px;
	font-size: 12px;
	height: 380px;
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

.down {
	padding: 6px 4px;
	padding-bottom: 0;
	width: 100%;
	display: flex;
	height: 100%;
	justify-content: space-between;

	.bg-color-black {
		border-radius: 5px;
	}

	.ranking {
		padding: 10px;
		width: 59%;

		.dv-scr-rank-board {
			height: 225px;
		}
	}

	.percent {
		width: 100%;
		display: flex;
		height: 100%;
		flex-wrap: wrap;

		.item {
			width: 50%;
			height: 50%;

			span {
				margin-top: 8px;
				font-size: 14px;
				display: flex;
				justify-content: center;
			}
		}

		.water {
			width: 100%;
			margin-top: 10px;

			.dv-wa-le-po {
				height: 120px;
			}
		}
	}
}
</style>
