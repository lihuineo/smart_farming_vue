<template>
	<div id="center">
		<div class="up">
			<div
				class="bg-color-black item"
				v-for="item in titleItem"
				:key="item.title"
			>
				<p class="ml-3 colorBlue fw-b fs-xl">{{ item.title }}</p>
				<div>
					<dv-digital-flop
						class="dv-dig-flop ml-1 mt-2 pl-3"
						:config="item.number"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CenterChart from '@/components/centerChartRate';

export default {
	data() {
		return {
			titleItem: [
				{
					title: '空气温度（°C）',
					number: {
						number: [26.3],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 26,
						},
					},
				},
				{
					title: '空气湿度（RH）',
					number: {
						number: [81.1],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 26,
						},
					},
				},
				{
					title: '光照强度（Lux）',
					number: {
						number: [2365],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 26,
						},
					},
				},
				{
					title: '土壤湿度（%）',
					number: {
						number: [83.6],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 26,
						},
					},
				},
				{
					title: '土壤PH（0-14）',
					number: {
						number: [7.3],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 28,
						},
					},
				},
				{
					title: 'CO2浓度（PPM）',
					number: {
						number: [532],
						toFixed: 1,
						textAlign: 'right',
						content: '{nt}',
						style: {
							fontSize: 26,
						},
					},
				},
			],
			ranking: {
				data: [
					{
						name: '陵水',
						value: 55,
					},
					{
						name: '临高',
						value: 120,
					},
					{
						name: '三亚',
						value: 78,
					},
					{
						name: '万宁',
						value: 66,
					},
					{
						name: '文昌',
						value: 80,
					},
					{
						name: '琼海',
						value: 80,
					},
					{
						name: '东方',
						value: 80,
					},
					{
						name: '定安',
						value: 80,
					},
					{
						name: '屯昌',
						value: 80,
					},
					{
						name: '儋州',
						value: 80,
					},
				],
				carousel: 'single',
				unit: '人',
			},
			water: {
				data: [24, 82],
				shape: 'roundRect',
				formatter: '{value}%',
				waveNum: 3,
			},
			// 通过率和达标率的组件复用数据
			rate: [
				{
					id: 'centerRate1',
					tips: 60,
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
	components: {
		CenterChart,
	},
};
</script>

<style lang="less" scoped>
#center {
	display: flex;
	flex-direction: column;
	.up {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		.item {
			border-radius: 6px;
			padding-top: 8px;
			margin-top: 8px;
			width: 32%;
			height: 70px;
			.dv-dig-flop {
				width: 180px;
				height: 30px;
			}
		}
	}
	.down {
		padding: 6px 4px;
		padding-bottom: 0;
		width: 100%;
		display: flex;
		height: 255px;
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
			width: 40%;
			display: flex;
			flex-wrap: wrap;
			.item {
				width: 50%;
				height: 120px;
				span {
					margin-top: 8px;
					font-size: 14px;
					display: flex;
					justify-content: center;
				}
			}
			.water {
				width: 100%;
				.dv-wa-le-po {
					height: 120px;
				}
			}
		}
	}
}
</style>
