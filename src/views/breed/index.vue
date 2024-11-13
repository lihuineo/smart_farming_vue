<template>
	<div>
		<!-- <dv-border-box-12 class="box1 box3" style="height: 340px">
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
		</dv-border-box-12> -->
		
		<!-- <dv-border-box-12 class="box1 box3" style="
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
		</dv-border-box-12> -->
		<dv-border-box-12 class="box1 box4">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">光照强度</span>
				</div>
			</div>
			<div class="p-3" style="height: 300px">
				<QtEchart ref="echartId" :options="lightOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box6">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">土壤pH</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<QtEchart ref="echartId" :options="phOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box1 box7">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">土壤温湿度</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<QtEchart ref="echartId" :options="soilOption" width="100%"></QtEchart>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box5">
			<div class="box1-title" style="background-size: 100% 100%">
				<div class="d-flex">
					<span class="px-4">告警列表</span>
				</div>
			</div>
			<div class="p-1" style="
					height: calc(100% - 40px);
					display: flex;
					overflow: hidden;
				">
				<el-table :header-cell-style="{
					'background-color': 'rgba(194, 217, 255, 0.08)',
				}" class="custom-table-header mt-3" height="100%" :data="tableData" style="width: 100%">
					<el-table-column prop="name1" label="告警时间" />
					<el-table-column prop="name2" label="告警位置" />
					<el-table-column prop="name3" label="告警类型" />
				</el-table>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box8">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">养区实景</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<el-carousel :interval="4000" height="100%" indicator-position="none">
					<el-carousel-item v-for="item in imgs" :key="item">
						<img width="100%" height="100%" :src="item" />
					</el-carousel-item>
				</el-carousel>
			</div>
		</dv-border-box-12>
		<div class="box1 box3" style="
				right: auto;
				height: 80px;
				width: 40%;
				left: 30%;
				top: auto;
				bottom: 2%;
				background-color: rgba(255, 255, 255, 0);
			">
			<div class="d-flex">
				<div @click="focusOnA().catch(err => err), item_idx = 5" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background: 'rgba(240, 91, 114, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/rice1.png" class="icon-style">
						<span class="text">区域A</span>
					</div>
				</div>
				<div @click="focusOnB().catch(err => err), item_idx = 6" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background:
							'rgba(103, 0, 229, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/rice2.png" class="icon-style">
						<span class="text">区域B</span>
					</div>
				</div>
				<div @click="focusOnC().catch(err => err), item_idx = 7" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background: 'rgba(0, 0, 229, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/rice3.png" class="icon-style">
						<span class="text">区域C</span>
					</div>
				</div>
				<div @click="focusOnD().catch(err => err), item_idx = 8" class="camera-menu-item"
					style="cursor: pointer" :style="{
						background: 'rgba(103, 161, 0, 0.6)'
					}">
					<div class="menu-text">
						<img src="./../../assets/image/rice4.png" class="icon-style">
						<span class="text">区域D</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import centerLeft1 from './centerLeft1';
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
	components: { centerLeft1, centerRight2, CenterChart, center },
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
				require('./../../assets/image/breed_live.jpg'),
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
				position: [61.88, 5.94, -5.75],
				controls: [23.78, -12.70, -6.92],
			duration: 2000,
			});
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
	top: 120px;
	font-size: 12px;
	overflow: hidden;
	pointer-events: all;
	height: 610px
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
	top: 68%;
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
			color: white;
			/* 表头文本颜色 */
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

	.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell {
		background: transparent;
	}

	.el-table--enable-row-hover .el-table__body tr:hover>td {
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

@keyframes menu-text-size {
	from {
		transform: scale(0.8);
	}

	to {
		transform: scale(1.0);
	}
}
</style>
