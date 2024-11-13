<template>
	<div id="center">
		<div class="up">
			<div class="bg-color-black item-title" v-for="item in titleItem" :key="item.title">
				<p class="item-title-color item-title-bold item-title-size">{{ item.title }}</p>
				<div>
					<dv-digital-flop class="item-number" :config="item.number" />
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
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
				{
					title: '空气湿度（RH）',
					number: {
						number: [81.1],
						toFixed: 1,
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
				{
					title: '光照强度（Lux）',
					number: {
						number: [2365.4],
						toFixed: 1,
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
				{
					title: '土壤湿度（%）',
					number: {
						number: [83.6],
						toFixed: 1,
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
				{
					title: '土壤pH（0-14）',
					number: {
						number: [7.3],
						toFixed: 1,
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
				{
					title: 'CO2浓度（PPM）',
					number: {
						number: [532.3],
						toFixed: 1,
						textAlign: 'center',
						content: '{nt}',
						style: {
							fontSize: 18,
						},
					},
				},
			],
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
		}

		.item-title {
			border-radius: 6px;
			padding-top: 8px;
			padding-bottom: 8px;
			margin-top: 8px;
			width: 32%;
			height: 70px;
			text-align: center;
		}

		.item-number {
			height: 30px;
		}

		.item-title-size {
			font-size: 16px;
		}

		.item-title-bold {
			font-weight: bold;
		}

		.item-title-color {
			color: #257dff !important;
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
