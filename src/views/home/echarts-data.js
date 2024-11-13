import * as echarts from 'echarts';
// //建筑信息
export const getPieOptions = (val) => {
	var data = [
		{
			value: 3661,
			name: '白菜',
		},
		{
			value: 5713,
			name: '玉米',
		},
		{
			value: 9938,
			name: '油菜',
		},
		{
			value: 17623,
			name: '西红柿',
		},
		{
			value: 3299,
			name: '花菜',
		},
	];
	let option = {
		tooltip: {
			show: true,
			trigger: 'item',
			formatter: '{b}: {c} ({d}%)',
		},
		series: [
			{
				type: 'pie',
				selectedMode: 'single',
				radius: ['60%', '90%'],
				color: ['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],

				label: {
					normal: {
						show: true,
						position: 'center',

						formatter: [].join('\n'),
						rich: {
							a: {
								color: '#fff',
								fontSize: 18,
								lineHeight: 30,
							},
							b: {
								color: 'yellow',
								fontSize: 20,
								foneWeight: 'bold',
								textShadowBlur: 20,
								textShadowColor: 'yellow',
							},
						},
					},
				},
				labelLine: {
					normal: {
						show: false,
					},
				},
				data: data,
			},
		],
	};
	return option;
};

export const getRadarOptions = (val) => {
	let option = {
		backgroundColor: '#000',
		tooltip: {
			trigger: 'axis',
			show: false,
		},
		radar: {
			indicator: [
				{
					name: '白菜',
					max: 100,
					num: 100,
				},
				{
					name: '玉米',
					max: 100,
					num: 90,
				},
				{
					name: '油菜',
					max: 100,
					num: 100,
				},
				{
					name: '西红柿',
					max: 100,
					num: 100,
				},
				{
					name: '花菜',
					max: 100,
					num: 100,
				},
			],
			radius: '70%',
			center: ['50%', '60%'],
			shape: 'circle',
			splitNumber: 4,
			name: {
				textStyle: {
					color: '#F6F46D',
					fontSize: 14,
				},
				formatter: function (value, indicator) {
					return '{a|' + value + '}';
				},
				lineHeight: 20,
				rich: {
					a: {
						fontSize: 12,
						align: 'center',
					},
					b: {
						fontSize: 12,
						align: 'left',
					},
				},
			},
			splitArea: {
				areaStyle: {
					color: [
						'rgba(255,255,255,0.1)',
						'rgba(255,255,255,0.03)',
						'rgba(255,255,255,0.1)',
						'rgba(255,255,255,0.03)',
					],
				},
			},
			splitLine: {
				lineStyle: {
					type: 'dashed',
					// color: [   //此处可以修改圆环的颜色
					//     '#FFC221', '#6B6EB1',
					//     '#6B6EB1', '#6B6EB1',
					//     '#6B6EB1', '#6B6EB1'
					// ].reverse(),
					width: 1,
				},
			},
			axisLine: {
				lineStyle: {
					color: 'rgba(238,238,238, 0.2)',
				},
			},
		},
		series: {
			name: '信息',
			type: 'radar',
			tooltip: {
				trigger: 'item',
			},
			data: [
				{
					value: [100, 100, 100, 100, 99, 90],
				},
			],
			symbol: 'circle',
			symbolSize: 5,
			itemStyle: {
				normal: {
					color: 'rgba(246,241,111,0.8)',
					borderColor: 'rgba(246,241,111,0.2)',
					borderWidth: 5,
				},
			},
			areaStyle: {
				normal: {
					color: 'rgba(246,241,111, 0.5)',
				},
			},
			lineStyle: {
				normal: {
					type: 'dashed',
					color: 'rgba(246,241,111, 1)',
					width: 2,
				},
			},
		},
	};
	return option;
};
