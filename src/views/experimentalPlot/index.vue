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
					<span class="text px-4">光照强度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart ref="echartId" :options="lightOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box6">
			<div class="box1-title" v-if="isReloadData">
				<div class="d-flex">
					<span class="text px-4">土壤pH</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<QtEchart ref="echartId" :options="phOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box3" style="left: auto; right: 1.72%; width: 300px; height: 360px">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">控制面板</span>
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
						<span>温棚风机1</span>
						<el-switch v-model="fanValue" @change="fanValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>温棚风机2</span>
						<el-switch v-model="fanValue" @change="fanValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯1</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯2</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="
							display: flex;
							justify-content: space-between;
							padding-left: 20px;
							padding-bottom: 10px;
							border-bottom: 1px solid #418889;
							font-size: 16px;
						">
						<span>补光灯3</span>
						<el-switch v-model="lightValue" @change="lightValueChange"> </el-switch>
					</li>
					<li class="mb-4" style="display: flex; justify-content: space-between; 							padding-left: 20px;
; font-size: 16px;">
						<span>灌溉系统</span>
						<el-switch v-model="irrigationValue" @change="irrigationValueChange"> </el-switch>
					</li>
				</ul>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">土壤温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 36px)">
				<QtEchart ref="echartId" :options="soilOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<div class="box1 box3" style="
				right: auto;
				height: 80px;
				width: 40%;
				left: 30%;
				top: auto;
				bottom: 2%;
			">
			<div class="d-flex">
				<div @click="focusOnA().catch(err => err), (active = 5)" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background:
							active == 5
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(0, 0, 229, 0.4)',
					}">
					<div class="menu-text">
						<img src="./../../assets/image/camera.png" class="icon-style">
						<span class="text">镜头A</span>
					</div>
				</div>
				<div @click="focusOnB().catch(err => err), (active = 6)" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background:
							active == 6
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 0, 229, 0.4)',
					}">
					<div class="menu-text">
						<img src="./../../assets/image/camera.png" class="icon-style">
						<span class="text">镜头B</span>
					</div>
				</div>
				<div @click="focusOnC().catch(err => err), (active = 7)" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background:
							active == 7
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(0, 0, 229, 0.4)',
					}">
					<div class="menu-text">
						<img src="./../../assets/image/camera.png" class="icon-style">
						<span class="text">镜头C</span>
					</div>
				</div>
				<div @click="focusOnD().catch(err => err), (active = 8)" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background:
							active == 8
								? 'rgba(103, 161, 229, 0.8)'
								: 'rgba(103, 161, 0, 0.4)',
					}">
					<div class="menu-text">
						<img src="./../../assets/image/camera.png" class="icon-style">
						<span class="text">镜头D</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import centerLeft1 from './centerLeft1';
import centerRight2 from '@/components/centerRightChart';
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
			rate: [
				{
					id: 'centerRate1',
					tips: 50,
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
					tips: 40,
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
			isReloadData: true,
			active: 5,
		};
	},
	computed: {},
	mounted() {
		this.drawTimingFn();
		this.setOptions();
		this.focusOnView();
	},
	methods: {
		setData() {
			// 清空轮询数据
			this.cdata.weekCategory = [];
			this.cdata.weekMaxData = [];
			this.cdata.weekLineData = [];
			this.cdata.radarData = [];
			this.cdata.radarDataAvg = [];

			const dateBase = new Date();
			this.cdata.year = dateBase.getFullYear();
			// 周数据
			for (let i = 0; i < 7; i++) {
				// 日期
				const date = new Date();
				this.cdata.weekCategory.unshift(
					[date.getMonth() + 1, date.getDate() - i].join('/')
				);

				// 折线图数据
				this.cdata.weekMaxData.push(this.cdata.maxData);
				const distance = Math.round(Math.random() * 11000 + 500);
				this.cdata.weekLineData.push(distance);

				// 雷达图数据
				// 我的指标
				const averageSpeed = +(Math.random() * 5 + 3).toFixed(3);
				const maxSpeed = averageSpeed + +(Math.random() * 3).toFixed(2);
				const hour = +(distance / 1000 / averageSpeed).toFixed(1);
				const radarDayData = [distance, averageSpeed, maxSpeed, hour];
				this.cdata.radarData.unshift(radarDayData);

				// 平均指标
				const distanceAvg = Math.round(Math.random() * 8000 + 4000);
				const averageSpeedAvg = +(Math.random() * 4 + 4).toFixed(3);
				const maxSpeedAvg =
					averageSpeedAvg + +(Math.random() * 2).toFixed(2);
				const hourAvg = +(distance / 1000 / averageSpeed).toFixed(1);
				const radarDayDataAvg = [
					distanceAvg,
					averageSpeedAvg,
					maxSpeedAvg,
					hourAvg,
				];
				this.cdata.radarDataAvg.unshift(radarDayDataAvg);
			}
		},
		drawTimingFn() {
			this.setData();
			this.drawTiming = setInterval(() => {
				this.setData();
			}, 6000);
		},
		setOptions() {
			this.soilOption = getSoilOption(this.cdata);
			this.phOption = getPhOption(this.cdata);
			this.lightOption = getLightData();
			this.airOption = getairData();
		},
		focusOnView() {
			window.app.flyTo({
				position: [5.52, 7.05, -17.21],
				controls: [-1.76, -0.76, -0.69],
				duration: 3000,
			});
		},
		focusOnA() {
			window.app.flyTo({
				position: [73.16, 44.52, 73.48],
				controls: [13.83, -22.17, -4.28],
				duration: 3000,
			});
		},
		focusOnB() {
			window.app.flyTo({
				position: [73.16, 44.52, 73.48],
				controls: [13.83, -22.17, -4.28],
				duration: 3000,
			});
			var phData = [
				11.09, 9.17, 9.55, 9.10, 9.19, 9.33, 9.44, 8.85, 9.08, 7.09, 9.17, 10.00, 11.55, 10.21, 10.19
			];
			// this.phOption = getPhOption(phData);
			setOptions(phData);
			// this.$refs.phChart.$forceUpdate();
			this.isReloadData = false
			this.$nextTick(() => {
				this.isReloadData = true;
			})
		},
		focusOnC() {
			window.app.flyTo({
				position: [73.16, 44.52, 73.48],
				controls: [13.83, -22.17, -4.28],
				duration: 3000,
			});
		},
		focusOnD() {
			window.app.flyTo({
				position: [73.16, 44.52, 73.48],
				controls: [13.83, -22.17, -4.28],
				duration: 3000,
			});
		}
	},
};
</script>
<style lang="less" scoped>
.box1 {
	position: absolute;
	width: 23%;
	left: 0%;
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

.camera-menu-item {
	font-size: 20px;
	width: 30%;
	height: 30%;
	line-height: 25px;
	text-align: center;
	margin-left: 16px;
	margin-right: 16px;
	border-radius: 20px;
	overflow: hidden;
}

.text {
	display: inline-block;
	margin-left: 8px;
}

.icon-style {
	padding-left: 0%;
	width: 20%;
	height: 20%;
}
</style>
