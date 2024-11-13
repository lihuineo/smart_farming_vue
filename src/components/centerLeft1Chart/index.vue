<template>
	<Chart :cdata="cdata" />
</template>

<script>
import Chart from './chart.vue';
export default {
	data() {
		return {
			cdata: {
				xData: ['空气温度', '空气湿度', '光照强度', '土壤湿度', '土壤PH', 'CO2浓度'],
				seriesData: [
					{ value: 10, name: '空气温度' },
					{ value: 5, name: '空气湿度' },
					{ value: 15, name: '光照强度' },
					{ value: 25, name: '土壤湿度' },
					{ value: 20, name: '土壤PH' },
					{ value: 35, name: 'CO2浓度' },
				],
			},
		};
	},
	components: {
		Chart,
	},
	mounted() {},
	methods: {},
};
</script>

<style lang="less" scoped></style>
