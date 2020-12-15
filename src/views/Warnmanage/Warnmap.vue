<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div>
    <!-- <div id="myChart"></div> -->
    <div align="left" id="myChart"></div>
    <div align="right" id="main" style="width: 50%; height: 400px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import '../../../node_modules/echarts/map/js/china.js';
import optionMap from '../../../public/map'
export default {
  name: 'LineChart',
  // name: '',
  data () {
    return {
      echartsOption: {
        // echarts选项，所有绘图数据和样式都在这里设置
        xAxis: {

          type: 'category',
          data: ['高风险', '中风险', '低风险'],   // x轴数据
          name: '级别',   // x轴名称
          nameTextStyle: {
            // x轴名称样式
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {

          type: 'value',
          name: '设备数量',   // y轴名称
          nameTextStyle: {
            // y轴名称样式
            fontWeight: 600,
            fontSize: 18
          }
        },
        tooltip: {
          //鼠标放到图上的数据展示样式
          trigger: 'axis'
        },
        series: [{
          //series中加入每个bar的数据
          name: '公司盈利率',
          type: 'bar',
          barWidth: '40%',
          data: [0.35, 0.2, 0.25],
        }],
      }
    }
  },
  methods: {
    initEchart () {
      var mapchart = echarts.init(document.getElementById('main'));
      mapchart.setOption(optionMap);
      window.onresize = function () {
        // resizeMyChartContainer();
        mapchart.resize();
      }
    }
  },
  mounted () {
    this.initEchart()
    let myChart = echarts.init(document.getElementById('myChart'), 'light')	// 初始化echarts, theme为light
    myChart.setOption(this.echartsOption)	// echarts设置选项
  },
}
</script>
<style scoped>
#main {
  /* width: 40%; */
  margin-top: 70px;
  margin-left: 550px;
  padding: 0;
  list-style: none;
  background-color: coral;
  /* align: center; */
}
#myChart {
  width: 45%;
  height: 300px;
  margin-left: 20px;
  margin-top: 50px;
  float: left;
}
</style>