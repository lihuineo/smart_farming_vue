import * as echarts from 'echarts'
// 装机能力
// export const getSoilOption = (data) => {
//   const option = {
//     title: {
//       show: false,
//       text: '机架利用率',
//       left: '0',
//       top: 0,
//       textStyle: {
//         fontSize: 14,
//         color: '#fff'
//       }
//     },
//     grid: {
//       left: '50%',
//       right: 0,
//       top: 0,
//       bottom: 0,
//       containLabel: true
//     },
//     xAxis: {
//       show: false,
//       min: 0,
//       max: 100,
//       axisLabel: {
//         show: false
//       }
//     },
//     yAxis: {
//       show: false,
//       min: 0,
//       max: 100,
//       axisLabel: {
//         show: false
//       }
//     },
//     series: [
//       {
//         name: '背景',
//         type: 'scatter',
//         symbol: 'circle',
//         silent: true,
//         animation: false,
//         z: 0,
//         data: [
//           {
//             value: [30, 50],
//             symbolSize: [160, 160],
//             symbol: 'image://' + import.meta.glob('@/assets/Gauge-BG.png')
//           }
//         ]
//       },
//       {
//         name: '刻度',
//         type: 'gauge',
//         startAngle: 270,
//         endAngle: -90,
//         radius: '96%',
//         min: 0,
//         max: 100,
//         center: ['50%', '50%'],
//         axisTick: {
//           distance: 0,
//           length: 3,
//           lineStyle: {
//             color: 'rgba(18,142,255,0.40)',
//             width: 2
//           }
//         },
//         axisLabel: {
//           distance: 6,
//           color: '#fff',
//           fontFamily: 'TANTRA'
//         },
//         splitLine: {
//           distance: 3,
//           length: 4,
//           lineStyle: {
//             color: 'rgba(18,142,255,0.40)',
//             width: 2
//           }
//         },
//         detail: {
//           show: false
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 1,
//             color: [[1, '#128EFF']]
//           }
//         },
//         pointer: {
//           show: true,
//           length: '100%',
//           width: 6,
//           icon: 'rect',
//           itemStyle: {
//             color: {
//               type: 'linear',
//               x: 0,
//               y: 0,
//               x2: 0,
//               y2: 1,
//               colorStops: [
//                 {
//                   offset: 0,
//                   color: 'rgba(255,255,255,1)' // 0% 处的颜色
//                 },
//                 {
//                   offset: 0.4,
//                   color: 'rgba(255,255,255,1)' // 0% 处的颜色
//                 },
//                 {
//                   offset: 0.41,
//                   color: 'rgba(0,0,0,0)' // 0% 处的颜色
//                 },
//                 {
//                   offset: 1,
//                   color: 'rgba(0,0,0,0)' // 100% 处的颜色
//                 }
//               ],
//               global: false // 缺省为 false
//             }
//           }
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       },
//       {
//         name: '宽的刻度线带单位',
//         type: 'gauge',
//         startAngle: 270,
//         endAngle: -90,
//         radius: '96%',
//         min: 0,
//         center: ['50%', '50%'],
//         max: data.max,
//         axisTick: {
//           distance: -35,
//           length: 35,
//           lineStyle: {
//             color: 'rgba(18,142,255,0.10)',
//             width: 1
//           }
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         detail: {
//           show: true,
//           fontFamily: 'Futura',
//           offsetCenter: [0, '16%'],
//           // offsetCenter: [0, '-15%'],
//           formatter: ['{sub|' + data.subtitle + '}', '{title|' + data.title + '}'].join('\n'),
//           rich: {
//             sub: {
//               fontSize: 14,
//               color: '#FFF',
//               lineHeight: 20
//             },
//             title: {
//               fontSize: 14,
//               color: '#FFF',
//               lineHeight: 20
//             }
//           }
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 35,
//             color: [
//               [
//                 1,
//                 {
//                   type: 'radial',
//                   x: 0.5,
//                   y: 0.6,
//                   r: 0.6,
//                   colorStops: [
//                     {
//                       offset: 0,
//                       color: 'rgba(18, 142, 255, 1)' // 0% 处的颜色
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgba(18, 142, 255, 0)' // 100% 处的颜色
//                     }
//                   ],
//                   global: false // 缺省为 false
//                 }
//               ]
//             ]
//           }
//         },
//         pointer: {
//           show: false
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       },
//       {
//         name: '内侧窄刻度',
//         type: 'gauge',
//         radius: '96%',
//         startAngle: 270,
//         endAngle: -90,
//         min: 0,
//         center: ['50%', '50%'],
//         max: data.max,
//         axisTick: {
//           show: false
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         detail: {
//           show: false
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 1,
//             color: [[1, 'rgba(18, 142, 255,.4)']]
//           }
//         },
//         pointer: {
//           show: false
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       },
//       {
//         name: '内侧窄刻度2',
//         type: 'gauge',
//         radius: '62%',
//         startAngle: 270,
//         endAngle: -90,
//         center: ['50%', '50%'],
//         min: 0,
//         max: data.max,
//         axisTick: {
//           show: false
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         detail: {
//           show: true,
//           color: '#29FFDB',
//           fontSize: 20,
//           fontStyle: 'normal',
//           // fontFamily: 'DIN DIN',
//           offsetCenter: [0, '-10%'],
//           padding: [4, 0, 0, 0],
//           formatter: function (value) {
//             return value.toFixed(1) + data.unit
//           }
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 5,
//             color: [
//               [
//                 data.value / data.max,
//                 data.value > data.max / 2
//                   ? {
//                       type: 'linear',
//                       x: 0,
//                       y: 0,
//                       x2: 1,
//                       y2: 1,
//                       colorStops: [
//                         {
//                           offset: 0,
//                           color: 'rgba(255,255,255,.0)' // 0% 处的颜色
//                         },
//                         {
//                           offset: 1,
//                           color: '#fff' // 100% 处的颜色
//                         }
//                       ],
//                       global: false // 缺省为 false
//                     }
//                   : {
//                       type: 'linear',
//                       x: 1,
//                       y: 1,
//                       x2: 0,
//                       y2: 0,
//                       colorStops: [
//                         {
//                           offset: 0,
//                           color: 'rgba(255,255,255,.0)' // 0% 处的颜色
//                         },
//                         {
//                           offset: 1,
//                           color: '#fff' // 100% 处的颜色
//                         }
//                       ],
//                       global: false // 缺省为 false
//                     }
//               ],
//               [1, 'rgba(18, 142, 255,0)']
//             ]
//           }
//         },
//         pointer: {
//           show: false
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       },
//       {
//         name: '数据1',
//         type: 'gauge',
//         startAngle: 270,
//         endAngle: -90,
//         radius: '96%',
//         min: 0,
//         center: ['50%', '50%'],
//         max: data.max,
//         axisTick: {
//           show: false
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         detail: {
//           show: false
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 35,
//             color: [
//               [
//                 data.value / data.max,
//                 data.value < data.max / 2
//                   ? {
//                       type: 'linear',
//                       x: 0,
//                       y: 0,
//                       x2: 0,
//                       y2: 1,
//                       colorStops: [
//                         {
//                           offset: 0,
//                           color: 'rgba(52, 255, 221, .4)' // 0% 处的颜色
//                         },
//                         {
//                           offset: 1,
//                           color: 'rgba(52, 255, 221, 0)' // 100% 处的颜色
//                         }
//                       ],
//                       global: false // 缺省为 false
//                     }
//                   : {
//                       type: 'linear',
//                       x: 1,
//                       y: 0,
//                       x2: 0,
//                       y2: 1,
//                       colorStops: [
//                         {
//                           offset: 0,
//                           color: 'rgba(52, 255, 221, .6)' // 0% 处的颜色
//                         },
//                         {
//                           offset: 1,
//                           color: 'rgba(52, 255, 221, 0)' // 100% 处的颜色
//                         }
//                       ],
//                       global: false // 缺省为 false
//                     }
//               ],
//               [1, 'rgba(255,255,255,0)']
//             ],
//             shadowBlur: 10,
//             shadowColor: '#34FFDD',
//             shadowOffsetY: 5,
//             shadowOffsetX: 4
//           }
//         },
//         pointer: {
//           show: false
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       },
//       {
//         name: '数据2',
//         type: 'gauge',
//         startAngle: 270,
//         endAngle: -90,
//         radius: '96%',
//         center: ['50%', '50%'],
//         min: 0,
//         max: data.max,
//         axisTick: {
//           show: false
//         },
//         axisLabel: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         },
//         detail: {
//           show: false
//         },
//         axisLine: {
//           show: true,
//           lineStyle: {
//             width: 35,
//             color: [
//               [
//                 data.value / data.max,
//                 {
//                   type: 'radial',
//                   x: data.value > data.max / 2 ? 1 : 2,
//                   y: data.value > data.max / 2 ? 0.5 : 2,
//                   r: data.value > data.max / 2 ? 0.5 : 0,
//                   colorStops: [
//                     {
//                       offset: 0.3,
//                       color: 'rgba(52, 255, 221, 1)' // 0% 处的颜色
//                     },
//                     {
//                       offset: 1,
//                       color: 'rgba(52, 255, 221, 0)' // 100% 处的颜色
//                     }
//                   ],
//                   global: false // 缺省为 false
//                 }
//               ],
//               [1, 'rgba(255,255,255,0)']
//             ],
//             shadowBlur: 20,
//             shadowColor: '#34FFDD'
//           }
//         },
//         pointer: {
//           show: false
//         },
//         data: [
//           {
//             value: data.value
//           }
//         ]
//       }
//     ]
//   }
//   return option
// }
// //装机能力排行
// export const getUsageOptionTop = (
//   xData = ['广东', '山东', '江苏', '北京', '贵州'],
//   currentLevel
// ) => {
//   var yData1 = [104, 56, 136, 86, 98, 86],
//     yData2 = [100, 206, 236, 106, 80, 160],
//     yData3 = [90, 106, 236, 96, 180, 100],
//     yData4 = [90, 56, 36, -6, -50, -70],
//     yData5 = [10, 20, 30, 40, 50, 70],
//     borderData = [],
//     legend = [
//       '可装机架数',
//       '已装机架数（IDC）',
//       '已装机架数（自用）',
//       '机架利用率',
//       '23年机架利用率'
//     ],
//     colorArr = [
//       {
//         start: 'rgba(41,184,255,',
//         end: 'rgba(41,184,255,0.5)'
//       },
//       {
//         start: 'rgba(41,221,255,',
//         end: 'rgba(41,221,255,0.5)'
//       },
//       {
//         start: 'rgba(41,255,219,',
//         end: 'rgba(41,255,219,0.5)'
//       },
//       {
//         start: 'rgba(255, 219, 41,',
//         end: 'rgba(255, 219, 41,0.5)'
//       },
//       {
//         start: 'rgba(153, 192, 255,',
//         end: 'rgba(153, 192, 255,0.5)'
//       }
//     ]
//   var normalColor = 'rgba(255,255,255,0.5)'
//   //   var fontSize = 20;
//   let seriesData = []
//   var borderHeight = 5
//   xData.forEach((element) => {
//     borderData.push(borderHeight)
//   })
//   ;[yData1, yData2, yData3, yData4, yData5].forEach((item, index) => {
//     var obj1 = {}
//     var obj2 = {}
//     if (index < 3) {
//       obj1 = {
//         name: legend[index],
//         type: 'bar',
//         stack: legend[index],
//         data: item,
//         barWidth: '15%',
//         itemStyle: {
//           normal: {
//             color: {
//               type: 'linear',
//               x: 0,
//               y: 0,
//               x2: 0,
//               y2: 1,
//               colorStops: [
//                 {
//                   offset: 0,
//                   color: colorArr[index].start + '0.2)'
//                 },
//                 {
//                   offset: 0.5,
//                   color: colorArr[index].start + '0.4)'
//                 },
//                 {
//                   offset: 1,
//                   color: colorArr[index].end
//                 }
//               ],
//               globalCoord: false
//             }
//           }
//         }
//       }
//       obj2 = {
//         name: '',
//         type: 'bar',
//         stack: legend[index],
//         itemStyle: {
//           normal: {
//             color: colorArr[index].start + '1)'
//           }
//         },
//         data: borderData
//       }
//       seriesData.push(obj1)
//       seriesData.push(obj2)
//     } else {
//       var obj3 = {
//         name: legend[index],
//         type: 'line',
//         yAxisIndex: 1,
//         smooth: false,
//         symbol: 'circle',
//         symbolSize: 1,
//         lineStyle: {
//           normal: {
//             width: 3
//           }
//         },
//         itemStyle: {
//           normal: {
//             color: {
//               type: 'linear',
//               x: 0,
//               y: 0,
//               x2: 0,
//               y2: 1,
//               colorStops: [
//                 {
//                   offset: 0,
//                   color: colorArr[index].start + '1)'
//                 },
//                 {
//                   offset: 0.5,
//                   color: colorArr[index].start + '0.7)'
//                 },
//                 {
//                   offset: 1,
//                   color: colorArr[index].end
//                 }
//               ],
//               globalCoord: false
//             },
//             borderColor: '#fff',
//             borderWidth: 1
//           }
//         },
//         data: item,
//         label: {
//           normal: {
//             show: false
//           }
//         }
//       }
//       seriesData.push(obj3)
//     }
//   })
//   console.log(seriesData)
//   let option = {
//     // backgroundColor: '#000',
//     grid: {
//       left: '0%',
//       top: '18%',
//       right: '2%',
//       bottom: '5%',
//       containLabel: true
//     },
//     legend: {
//       show: false,
//       icon: 'rect',
//       itemWidth: 20,
//       itemHeight: 3,
//       right: '15%',
//       top: '0%',
//       textStyle: {
//         color: '#fff'
//       },
//       data: legend
//     },

//     // tooltip: {
//     //   backgroundColor: 'rgba(6,33,36,0.6)',
//     //   textStyle: {
//     //     fontSize,
//     //     color: 'rgba(216, 216, 216, 1)'
//     //   },
//     //   axisPointer: {
//     //     type: 'cross',
//     //     crossStyle: {
//     //       color: '#fff'
//     //     }
//     //   },
//     //   trigger: 'axis'
//     // },

//     tooltip: {
//       trigger: 'axis',
//       backgroundColor: 'rgba(6,33,36,0.6)',

//       textStyle: {
//         color: 'rgba(216, 216, 216, 1)'
//       },
//       formatter: function (params) {
//         var str = `<div style="  background: linear-gradient(rgba(0, 0, 0, 0.08) 0%, rgba(224, 224, 224, 0.16) 100%);
//         border-radius: 4px;
//         border-image: linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.08)) 1 1;
//         backdrop-filter: blur(2px);">
//           <span>
//             ${params[0].name}
//           </span>
//           <div >
//             <span >
//               可装机架数：
//             </span>
//             <span style="color: rgba(41, 184, 255, 1);">
//             ${params[0].value}
//             </span>
//           </div>
//           <div >
//             <span>
//               已装机架数(IDC)：
//             </span>
//             <span style="color: rgba(41, 221, 255, 1);">
//             ${params[1].value}
//             </span>
//           </div>
//           <div >
//             <span >
//               已装机架数(自用)：
//             </span>
//             <span style="color: rgba(41, 255, 219, 1);" >
//             ${params[2].value}
//             </span>
//           </div>
//           <div >
//             <span>
//               机架利用率：
//             </span>
//             <span style="color: rgba(255, 219, 41, 1);">
//             ${params[3].value}%
//             </span>
//           </div>
//           <div >
//             <span >
//               23年机架利用率：
//             </span>
//             <span style="color: rgba(173, 205, 255, 1);">
//             ${params[4].value}%
//             </span>
//           </div>
//         </div>`

//         // var str = ''
//         // for (var i = 0; i < params.length; i++) {
//         //   if (params[i].seriesName !== '') {
//         //     str += params[i].seriesName + params[i].value + '<br/>'
//         //   }
//         // }
//         return str
//       }
//     },
//     xAxis: [
//       {
//         type: 'category',
//         data: xData,
//         axisPointer: {
//           type: 'shadow'
//         },
//         axisLabel: {
//           textStyle: {
//             color: normalColor,
//             fontSize: 12
//           }
//         },
//         axisLine: {
//           lineStyle: {
//             color: normalColor
//           }
//         },
//         axisTick: {
//           show: false
//         },
//         splitLine: {
//           show: false
//         }
//       }
//     ],
//     yAxis: [
//       {
//         type: 'value',
//         name: '单位：万架',
//         nameTextStyle: {
//           color: normalColor,
//           fontSize: 12,
//           padding: [0, 0, 0, 60]
//         },
//         // "min": 0,
//         // "max": 50,
//         axisLabel: {
//           show: false,
//           formatter: '{value}',
//           textStyle: {
//             color: normalColor,
//             fontSize: 12
//           }
//         },
//         axisLine: {
//           lineStyle: {
//             color: normalColor
//           }
//         },
//         axisTick: {
//           show: false
//         },
//         splitLine: {
//           show: false,
//           lineStyle: {
//             type: 'dashed',
//             color: normalColor
//           }
//         }
//       },
//       {
//         show: currentLevel == 1 ? false : true,
//         type: 'value',
//         name: '单位：%',
//         nameTextStyle: {
//           color: normalColor,
//           fontSize: 10,
//           padding: [0, 30, 0, 0]
//         },
//         min: -100,
//         max: 100,
//         axisLabel: {
//           show: false,
//           formatter: '{value}',
//           textStyle: {
//             color: normalColor,
//             fontSize: 12
//           }
//         },
//         axisLine: {
//           lineStyle: {
//             color: normalColor
//           }
//         },
//         axisTick: {
//           show: false
//         },
//         splitLine: {
//           show: true,
//           lineStyle: {
//             type: 'dashed',
//             color: 'rgba(255,255,255,0.2)'
//           }
//         }
//       }
//     ],
//     series: seriesData
//   }
//   return option
// }
// //建筑信息
export const getSoilOption = (val) => {
  // 定义颜色
  const colorList = {
    linearYtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: '#f5b44d'
        },
        {
          offset: 1,
          color: '#28f8de'
        }
      ]
    },
    linearGtoB: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#43dfa2'
        },
        {
          offset: 1,
          color: '#28f8de'
        }
      ]
    },
    linearBtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: '#1c98e8'
        },
        {
          offset: 1,
          color: '#28f8de'
        }
      ]
    },
    areaBtoG: {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [
        {
          offset: 0,
          color: 'rgba(35,184,210,.2)'
        },
        {
          offset: 1,
          color: 'rgba(35,184,210,0)'
        }
      ]
    }
  }
  let options = {
    grid: {
      bottom: '15%',
      top: '5%'
    },
    xAxis: {
      type: 'category',
      position: 'bottom',
      axisLine: true,
      axisLabel: {
        color: 'rgba(255,255,255,.8)',
        fontSize: 12
      },
      data: val.weekCategory
    },
    // 下方Y轴
    yAxis: {
      name: '工单',
      nameLocation: 'end',
      nameGap: 24,
      nameTextStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 14
      },
      max: val.maxData,
      splitNumber: 4,

      axisLine: {
        lineStyle: {
          opacity: 0
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#fff',
          opacity: 0.1
        }
      },
      axisLabel: {
        color: 'rgba(255,255,255,.8)',
        fontSize: 12
      }
    },
    series: [
      {
        name: '',
        type: 'radar',
        symbolSize: 0,
        data: [
          {
            value: val.radarDataAvg[6],
            name: '平均指标',
            itemStyle: {
              normal: {
                color: '#f8d351'
              }
            },
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: '#f8d351',
                shadowBlur: 25,
                shadowColor: 'rgba(248,211,81,.3)',
                shadowOffsetX: 0,
                shadowOffsetY: -10,
                opacity: 1
              }
            }
          },
          {
            value: val.radarData[6],
            name: '我的指标',
            itemStyle: {
              normal: {
                color: '#43dfa2'
              }
            },
            lineStyle: {
              normal: {
                opacity: 0
              }
            },
            areaStyle: {
              normal: {
                color: colorList.linearGtoB,
                shadowBlur: 15,
                shadowColor: 'rgba(0,0,0,.2)',
                shadowOffsetX: 0,
                shadowOffsetY: 5,
                opacity: 0.8
              }
            }
          }
        ]
      },
      {
        name: '',
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        itemStyle: {
          normal: {
            color: '#fff'
          }
        },
        lineStyle: {
          normal: {
            color: colorList.linearBtoG,
            width: 3
          }
        },
        areaStyle: {
          normal: {
            color: colorList.areaBtoG
          }
        },
        data: val.weekLineData,
        lineSmooth: true,
        markLine: {
          silent: true,
          data: [
            {
              type: 'average',
              name: '平均值'
            }
          ],
          precision: 0,
          label: {
            normal: {
              formatter: '平均值: \n {c}'
            }
          },
          lineStyle: {
            normal: {
              color: 'rgba(248,211,81,.7)'
            }
          }
        }
      },
      {
        name: '占位背景',
        type: 'bar',
        itemStyle: {
          normal: {
            show: true,
            color: '#000',
            opacity: 0
          }
        },
        silent: true,
        barWidth: '50%',
        data: val.weekMaxData,
        animation: false
      }
    ]
  }
  return options
}
export const getPhOption = (val) => {
  var xData = (function () {
    var data = []
    for (var i = 1; i < 10; i++) {
      data.push(i + '日')
    }
    return data
  })()

  var phData = [
    6.09, 9.17, 6.55, 6.10, 7.19, 7.33, 7.44, 7.85, 7.08, 8.09, 9.17, 8.00, 7.55, 7.21, 7.19
  ]

  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
        textStyle: {
          color: '#fff'
        }
      }
    },
    grid: {
      borderWidth: 0,
      top: '5%',
      bottom: '10%',
      textStyle: {
        color: '#fff'
      }
    },

    calculable: true,
    xAxis: [
      {
        type: 'category',
        axisLine: {
          lineStyle: {
            color: 'rgba(204,187,225,0.5)'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: true
        },
        data: xData
      }
    ],

    yAxis: [
      {
        max: 12,
        min: 4,
        splitNumber: 4,
        type: 'value',
        splitLine: {
          show: false
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(204,187,225,0.5)'
          }
        }
      }
    ],
    series: [
      {
        name: 'pH值',
        type: 'line',
        symbolSize: 12,
        symbol: 'circle',
        itemStyle: {
          color: '#6f7de3'
        },
        markPoint: {
          label: {
            normal: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          data: [
            {
              type: 'max',
              name: '最大值'
            },
            {
              type: 'min',
              name: '最小值'
            }
          ]
        },
        data: val == null ? val : phData
      }
    ]
  }
  return option
}
export function getLightData() {
  const data = [220, 182, 191, 234, 290, 330, 310]
  const sideData = data.map((item) => item + 4.5)

  let option = {
    tooltip: {
      trigger: 'axis',
      formatter: '{b} : {c}',
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    xAxis: {
      data: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      //坐标轴
      axisLine: {
        lineStyle: {
          color: '#3eb2e8'
        }
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      }
    },
    yAxis: {
      //坐标轴
      axisLine: {
        show: false
      },
      //坐标值标注
      axisLabel: {
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      //分格线
      splitLine: {
        lineStyle: {
          color: '#4784e8'
        }
      }
    },
    series: [
      {
        name: 'a',
        tooltip: {
          show: false
        },
        type: 'bar',
        barWidth: 24.5,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: '#0B4EC3' // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: '#138CEB' // 60% 处的颜色
                },
                {
                  offset: 1,
                  color: '#17AAFE' // 100% 处的颜色
                }
              ],
              false
            )
          }
        },
        data: data,
        barGap: 0
      },
      {
        type: 'bar',
        barWidth: 8,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(
              0,
              1,
              0,
              0,
              [
                {
                  offset: 0,
                  color: '#09337C' // 0% 处的颜色
                },
                {
                  offset: 0.6,
                  color: '#0761C0' // 60% 处的颜色
                },
                {
                  offset: 1,
                  color: '#0575DE' // 100% 处的颜色
                }
              ],
              false
            )
          }
        },
        barGap: 0,
        data: sideData
      },
      {
        name: 'b',
        tooltip: {
          show: false
        },
        type: 'pictorialBar',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#0571D5',
          color: '#1779E0'
        },
        symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
        symbolSize: ['30', '12'],
        symbolOffset: ['0', '-11'],
        //symbolRotate: -5,
        symbolPosition: 'end',
        data: data,
        z: 3
      }
    ]
  }
  return option
}
export function getairData() {
  // Generate data
  var category = ['00:00', '04:00', '08:00', '12:00', '14:00', '18:00', '22:00', '23:59']
  var dottedBase = []
  var lineData = [
    18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 56061, 62677, 59521,
    67560, 18092, 20728, 24045, 28348, 32808, 36097, 39867, 44715, 48444, 50415, 36097, 39867,
    44715, 48444, 50415, 50061, 32677, 49521, 32808
  ]
  var barData = [
    4600, 5000, 5500, 6500, 7500, 8500, 9900, 12500, 14000, 21500, 23200, 24450, 25250, 33300, 4600,
    5000, 5500, 6500, 7500, 8500, 9900, 22500, 14000, 21500, 8500, 9900, 12500, 14000, 21500, 23200,
    24450, 25250, 7500
  ]
  var rateData = []
  32808
  for (var i = 0; i < 33; i++) {
    // var date = i+2001;
    // category.push(date)
    var rate = barData[i] / lineData[i]
    rateData[i] = rate.toFixed(2)
  }

  // option
  let option = {
    title: {
      x: 'center',
      y: 0,
      textStyle: {
        color: '#B4B4B4',
        fontSize: 16,
        fontWeight: 'normal'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.1)',
      axisPointer: {
        type: 'shadow',
        label: {
          show: true,
          backgroundColor: '#7B7DDC'
        }
      }
    },
    legend: {
      data: ['温度', '湿度'],
      textStyle: {
        color: '#B4B4B4'
      },
      top: '7%'
    },
    grid: {
      x: '12%',
      width: '82%',
      y: '12%'
    },
    xAxis: {
      data: category,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    },
    yAxis: [
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },

        axisLabel: {
          formatter: '{value} '
        }
      },
      {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#B4B4B4'
          }
        },
        axisLabel: {
          formatter: '{value} '
        }
      }
    ],

    series: [
      {
        name: '温度',
        type: 'line',
        smooth: true,
        showAllSymbol: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          normal: {
            color: '#F02FC2'
          }
        },
        data: rateData
      },

      {
        name: '湿度',
        type: 'bar',
        barWidth: 10,
        itemStyle: {
          normal: {
            barBorderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#956FD4' },
              { offset: 1, color: '#3EACE5' }
            ])
          }
        },
        data: barData
      }
    ]
  }
  return option
}
