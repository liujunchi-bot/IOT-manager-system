var data = [
  { name: "北京", value: "93.59" },
  { name: "天津", value: "98.42" },
  { name: "河北", value: "97.56" },
  { name: "山西", value: "97.47" },
  { name: "内蒙古", value: "83.08" },
  { name: "辽宁", value: "98.63" },
  { name: "吉林", value: "91.96" },
  { name: "黑龙江", value: "80.30" },
  { name: "上海", value: "94.51" },
  { name: "江苏", value: "99.54" },
  { name: "浙江", value: "99.92" },
  { name: "安徽", value: "99.39" },
  { name: "福建", value: "99.16" },
  { name: "江西", value: "99.89" },
  { name: "山东", value: "98.22" },
  { name: "河南", value: "98.28" },
  { name: "湖北", value: "93.38" },
  { name: "湖南", value: "99.61" },
  { name: "广东", value: "99.18" },
  { name: "广西", value: "99.21" },
  { name: "海南", value: "96.43" },
  { name: "重庆", value: "98.96" },
  { name: "四川", value: "99.47" },
  { name: "贵州", value: "98.64" },
  { name: "云南", value: "97.84" },
  { name: "西藏", value: "100.00" },
  { name: "陕西", value: "85.95" },
  { name: "甘肃", value: "98.56" },
  { name: "青海", value: "100.00" },
  { name: "宁夏", value: "100.00" },
  { name: "新疆", value: "96.05" },
];

function randomData () {
  return Math.round(Math.random() * 500);
}
var geoCoordMap = {
  '北京': [116.46, 39.92],
  '天津': [117.2, 39.13],
  '河北': [114.48, 38.03],
  '山西': [112.53, 37.87],
  '内蒙古': [111.65, 40.82],
  '辽宁': [123.38, 41.8],
  '吉林': [126.57, 43.87],
  '黑龙江': [126.63, 45.75],
  '上海': [121.48, 31.22],
  '江苏': [120.62, 31.32],
  '浙江': [120.19, 30.26],
  '安徽': [117.27, 31.86],
  '福建': [119.3, 26.08],
  '江西': [115.89, 28.68],
  '山东': [117, 36.65],
  '河南': [113.65, 34.76],
  '湖北': [114.31, 30.52],
  '湖南': [113, 28.21],
  '广东': [113.23, 23.16],
  '广西': [108.33, 22.84],
  '海南': [110.35, 20.02],
  '重庆': [106.54, 29.59],
  '四川': [104.06, 30.67],
  '贵州': [106.71, 26.57],
  '云南': [102.73, 25.04],
  '西藏': [91.11, 29.97],
  '陕西': [108.95, 34.27],
  '甘肃': [103.73, 36.03],
  '青海': [101.74, 36.56],
  '宁夏': [106.27, 38.47],
  '新疆': [87.68, 43.77],
}
var convertData = function (data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var geoCoord = geoCoordMap[data[i].name];
    if (geoCoord) {
      res.push({
        name: data[i].name,
        value: geoCoord.concat(Number(data[i].value))
      });
    }
  }
  return res;
}
export default {
  title: {
    padding: 20,
    text: 'IOT设备报警分布图',
    subtext: '截止至2020年2月5日中午',
    x: 'left',
    textStyle: {
      color: '#fff'
    },
    subtextStyle: {
      fontStyle: 'italic'
    }
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function (params) {
      var value = (params.value[2] + '').split('.');
      return '风险度' + '<br/>' + params.name + ':' + value + '%';
    }
  },
  legend: {
    show: false,
    orient: 'vertical',
    left: 'left',
    data: ['']
  },
  visualMap: {
    min: 0,
    max: 100,
    pieces: [{
      min: 99,
      max: 100
    },
    {
      min: 80,
      max: 99
    },
    {
      min: 60,
      max: 80
    },
    {
      min: 40,
      max: 60
    },
    {
      min: 20,
      max: 40
    },
    {
      min: 0,
      max: 20
    },
    ],
    inRange: {
      color: ['#780000', '#fb0300', '#e59306', '#d7e573', '#8abda7', '#2396cf']
    },
    textStyle: {
      color: '#fff'
    }
  },
  //定义了一个坐标系
  geo: {
    map: 'china',
    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    },
    itemStyle: {
      //未激活样式
      normal: {
        areaColor: 'white',
        borderColor: 'black'
      },
      //激活样式
      emphasis: {
        areaColor: 'white'
      }
    }
  },
  selectedMode: 'single',
  series: [{
    name: '治愈率',
    type: 'scatter',
    symbolSize: 10,//控制点的大小
    coordinateSystem: 'geo',
    data: convertData(data),//加载数据

    label: {
      normal: {
        show: false
      },
      emphasis: {
        show: false
      }
    }
  }]

}
