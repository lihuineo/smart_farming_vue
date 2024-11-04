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
				<QtEchart
					ref="echartId"
					:options="lightOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box6">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">土壤pH</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<QtEchart
					ref="echartId"
					:options="phOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12>
		<!-- <dv-border-box-12 class="box2 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">空气温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<QtEchart
					ref="echartId"
					:options="airOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12> -->
		<dv-border-box-12 class="box2 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="text px-4">土壤温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 36px)">
				<QtEchart
					ref="echartId"
					:options="soilOption"
					width="100%"
				></QtEchart>
			</div>
		</dv-border-box-12>
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
</style>
