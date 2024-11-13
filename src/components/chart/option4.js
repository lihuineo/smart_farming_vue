import echarts from 'echarts';

export default {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(0, 255, 233,0)'
            },
            {
              offset: 0.5,
              color: 'rgba(255, 255, 255,1)'
            },
            {
              offset: 1,
              color: 'rgba(0, 255, 233,0)'
            }
          ],
          global: false
        }
      }
    }
  },
  grid: {
    top: 20,
    bottom: 20,
    right: 50,
    left: 75
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: true
      },
      splitArea: {
        // show: true,
        color: '#f00',
        lineStyle: {
          color: '#f00'
        }
      },
      axisLabel: {
        color: '#fff'
      },
      splitLine: {
        show: false
      },
      boundaryGap: false,
      data: ['电力', '水利', '污染', '教育', '幸福度', '交通']
    }
  ],
  yAxis: [
    {
      type: 'value',
      min: 0,
      // max: 140,
      splitNumber: 4,
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLine: {
        show: true
      },
      axisLabel: {
        show: true,
        margin: 20,
        textStyle: {
          color: '#d1e6eb'
        }
      },
      axisTick: {
        show: true
      }
    }
  ],
  series: [
    {
      name: '注册总量',
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: '#00b3f4',
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5
        }
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#00b3f4'
        }
      },
      itemStyle: {
        color: '#00b3f4',
        borderColor: '#fff',
        borderWidth: 3,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2
      },
      tooltip: {
        show: false
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0,179,244,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(0,179,244,0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0,179,244, 0.9)',
          shadowBlur: 20
        }
      },
      data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02]
    },
    {
      name: '注册总量',
      type: 'line',
      smooth: true, //是否平滑
      showAllSymbol: true,
      // symbol: 'image://./static/images/guang-circle.png',
      symbol: 'circle',
      symbolSize: 15,
      lineStyle: {
        normal: {
          color: '#00ca95',
          shadowColor: 'rgba(0, 0, 0, .3)',
          shadowBlur: 0,
          shadowOffsetY: 5,
          shadowOffsetX: 5
        }
      },
      label: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#00ca95'
        }
      },

      itemStyle: {
        color: '#00ca95',
        borderColor: '#fff',
        borderWidth: 3,
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowBlur: 0,
        shadowOffsetY: 2,
        shadowOffsetX: 2
      },
      tooltip: {
        show: false
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0,202,149,0.3)'
              },
              {
                offset: 1,
                color: 'rgba(0,202,149,0)'
              }
            ],
            false
          ),
          shadowColor: 'rgba(0,202,149, 0.9)',
          shadowBlur: 20
        }
      },
      data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14]
    }
  ]
};
