<template>
	<div>
		<dv-border-box-12
			class="box1 box3"
			style="left: 0; right: auto"
		>
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">农场介绍</span>
				</div>
			</div>
			<div class="p-3">
				<marquee
					direction="up"
					width="100%"
					height="150px"
					scrollamount="1"
					scrolldelay="1"
					behaviou="Scroll"
					align="Middle"
				>
					<p style="text-indent: 2em">
						海南科技职业大学信息工程学院创建于2008年，是海南科技职业大学成立最早的院系之一，始终秉持着以学校服务地方，培养工科类应用型人才的办学宗旨。作为学校获批的省级特色重点学科“计算机科学与技术”、省级高水平专业群“计算机网络技术”及省级科研平台“智慧物联网工程技术研究中心”的建设学院。
					</p>
					<p style="text-indent: 2em">
						海南科技职业大学信息工程学院智慧农业项目团队致力于推动农业领域的数字化和智能化发展，通过整合先进的信息技术、物联网、大数据和人工智能等技术，为农业生产提供高效、智能的解决方案。
					</p> </marquee
				>
			</div>
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="left: 0; top: 340px; height: 36%"
		>
		<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">农场分区</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<centerRight2 />
			</div>
			
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="left: 0; right: auto; top: 68%; height: 30%"
		>
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">农场掠影</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 30px)">
				<el-carousel
					:interval="4000"
					height="100%"
				>
					<el-carousel-item v-for="item in imgs" :key="item">
						<img width="100%" height="100%" :src="item" />
					</el-carousel-item>
				</el-carousel>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box4" style="height: 40%">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">任务统计</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 20px)">
				<div class="down">
					<div class="percent">
						<div class="item bg-color-black">
							<span>全量任务通过率</span>
							<CenterChart
								:id="rate[0].id"
								:tips="rate[0].tips"
								:colorObj="rate[0].colorData"
							/>
						</div>
						<div class="item bg-color-black">
							<span>核心任务达标率</span>
							<CenterChart
								:id="rate[1].id"
								:tips="rate[1].tips"
								:colorObj="rate[1].colorData"
							/>
						</div>
						<div class="water">
							<dv-water-level-pond
								class="dv-wa-le-po"
								:config="water"
							/>
						</div>
					</div>
				</div>
			</div>
		</dv-border-box-12>
		<dv-border-box-12 class="box2 box5" style="height: 47%">
			<div class="box1-title">
				<div class="d-flex">
					<span class="px-4">任务分类</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<centerLeft1 />
			</div>
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="
				left: 23%;
				right: auto;
				height: 220px;
				width: 27%;
				top: auto;
				bottom: 2%;
			"
		>
			<div class="box1-title" style="background-size: 100% 100%">
				<div class="d-flex">
					<span class="px-4">核心指标</span>
				</div>
			</div>
			<div class="p-3" style="height: 100%">
				<center />
			</div>
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="right: auto; height: 220px; width: 27%; left: 23%; top: 620px"
		>
			<div class="box1-title" style="background-size: 100% 100%">
				<div class="d-flex">
					<span class="px-4">种植种类</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 40px); display: flex">
				<div style="width: 50%">
					<QtEchart
						:options="pieOptions"
						ref="echartId"
						height="100%"
						width="100%"
						@mapMouseover="mapMouseover"
					></QtEchart>
				</div>
				<div style="width: 50%">
					<Top></Top>
				</div>
			</div>
		</dv-border-box-12>
		<dv-border-box-12
			class="box1 box3"
			style="right: 23%; height: 220px; width: 27%; left: auto; top: 620px"
		>
			<div class="box1-title" style="background-size: 100% 100%">
				<div class="d-flex">
					<span class="px-4">种植分布</span>
				</div>
			</div>
			<div class="p-3" style="height: calc(100% - 40px); display: flex">
				<div style="width: 50%">
					<QtEchart
						:options="radarOptions"
						ref="echartId"
						height="100%"
						width="100%"
					></QtEchart>
				</div>
				<div style="width: 50%">
					<distribution></distribution>
				</div>
			</div>
		</dv-border-box-12>

		<dv-border-box-12
			class="box1 box3"
			style="right: 23%; height: 220px; width: 27%; left: auto; top: auto; bottom: 2%;"
		>
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
	</div>
</template>

<script>
import centerLeft1 from './centerLeft1';
import centerRight2 from '@/components/centerRightChart';
import center from './center';
import CenterChart from '@/components/centerChartRate';
import Top from '@/components/top';
import distribution from '@/components/distribution';
import { getPieOptions, getRadarOptions } from './echarts-data';
export default {
	components: {
		centerLeft1,
		centerRight2,
		center,
		CenterChart,
		Top,
		distribution,
	},
	props: {},
	data() {
		return {
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
			],
			pieOptions: getPieOptions(),
			radarOptions: getRadarOptions(),
			water: {
				data: [24, 45],
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
			imgs: [
				require('./../../assets/image/pic1.jpg'),
				require('./../../assets/image/pic2.jpg'),
				require('./../../assets/image/pic3.jpg'),
				require('./../../assets/image/pic4.jpg'),
				require('./../../assets/image/pic5.jpg'),
				// require('./../../assets/image/pic6.jpg'),
				// require('./../../assets/image/pic7.jpg'),
				// require('./../../assets/image/pic8.jpg'),
				// require('./../../assets/image/pic9.jpg'),
				// require('./../../assets/image/pic10.jpg'),
				// require('./../../assets/image/pic11.jpg'),
				// require('./../../assets/image/pic12.jpg'),
				// require('./../../assets/image/pic13.jpg'),
				// require('./../../assets/image/pic14.jpg'),
				// require('./../../assets/image/pic15.jpg'),

			],
		};
	},
	methods: {
		mapMouseover(params) {
			let op = getPieOptions();
			let _label = {
				normal: {
					show: true,
					position: 'center',
					formatter: [
						`{a|${params.name}}`,
						`{b|${params.percent + '%'}}`,
					].join('\n'),
					rich: {
						a: {
							color: '#fff',
							fontSize: 18,
							lineHeight: 30,
						},
						b: {
							color: '#fff',
							fontSize: 20,
							foneWeight: 'bold',
						},
					},
				},
			};
			if (params.seriesIndex === 1) {
				_label.normal.formatter = [].join('\n');
			}
			console.log(_label);
			op.series[0].label = _label;
			this.pieOptions = op;
			// myChart.setOption(op, true);
		},
	},
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
	left: 1.76%;
	height: 38vh;
	top: 80vh;
	background: rgba(4, 0, 0, 0.5);
	padding: 0.1rem 0.15rem;
	border-radius: 0.05rem;
	box-sizing: border-box;
}

.box3 {
	left: auto;
	right: 0;
	top: 120px;
	font-size: 12px;
	bottom: 10%;
	height: 20%;
	overflow: hidden;
	pointer-events: all;
}

.box4 {
	left: auto;
	right: 0;
	top: 120px;
	/* bottom: 2%; */
	font-size: 12px;
	/* bottom: 10%; */
	height: 30vh;
	overflow: hidden;
	pointer-events: all;
}

.box5 {
	left: auto;
	right: 0;
	top: 550px;
	font-size: 12px;
	height: 30vh;
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

.box1-content {
	background-size: 100% 100%;
	height: 5px;
	margin-top: 0px;
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
</style>
