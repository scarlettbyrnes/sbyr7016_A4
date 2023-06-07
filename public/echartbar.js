import * as echarts from 'echarts';

var chartDom = document.getElementById('barChart');
var myChart = echarts.init(chartDom);
var option;

let drinksAdded = document.querySelectorAll('.drink').length;


option = {
  grid: {
    top: 20,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Today', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [4, 5, 9, 4, `${drinksAdded}`, 0, 0],
      type: 'bar',
      showBackground: true,
      color: '#4D3678',
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
    }
  ]
};
option && myChart.setOption(option);

// option && myChart.setOption(option);
