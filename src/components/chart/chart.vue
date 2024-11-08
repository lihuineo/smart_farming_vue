<template>
	<div class="chart">
		<div ref="chart" class="chart" />
	</div>
</template>

<script>
import chart from './chart';

export default {
	name: 'baseChart',
	mixins: [chart],
	props: {
		options: {
			type: Object,
		},
	},
	data() {
		return {
			chart: null,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.initChart();
		});
	},
	beforeDestroy() {
		this.disposeChart();
	},
	watch: {
		options: {
			handler() {
				if (this.chart) {
					console.log(11);
					this.chart.setOption(this.options, true);
				}
			},
			deep: true,
		},
	},
	methods: {
		initChart() {
			this.chart = this.$echarts.init(this.$refs['chart']);

			this.chart.setOption(this.options);
			this.chart.on('mouseover', (params) => {
				this.$emit('mapMouseover', params);
			});
		},
		disposeChart() {
			if (!this.chart) {
				return;
			}
			this.chart.dispose();
			this.chart = null;
		},
	},
};
</script>

<style lang="less" scoped>
.chart {
	width: 100%;
	height: 100%;
	overflow: hidden;
}
</style>
