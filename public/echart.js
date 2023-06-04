import * as echarts from 'echarts';


let drinksAdded = document.querySelectorAll('.drink').length;
// console.log(drinksAdded);

// pricecss > span gets all elements and get the span child
// .reduce (iterates through)
// +variable adds a number to a string // allows me to add strings together
const drinkPrices =  Array.from(document.querySelectorAll('.pricecss > span'));

let priceAdded = drinkPrices.reduce((accumulator, drink) => {
    return +accumulator + +drink.textContent;
  }, 0)


  const calValues =  Array.from(document.querySelectorAll('.calcss > span'));

  let addedCals = calValues.reduce((accumulator, drink) => {
      return +accumulator + +drink.textContent;
    }, 0)

    let newCals = addedCals / 4;

// Create the echarts instance
var myChart = echarts.init(document.getElementById('pieChart'));

var trackData = [drinksAdded, newCals, priceAdded]
option = {
    color:['#752EFE', '#FE724D', '#FDBE01'],
    angleAxis: {
        show: false,
         max: 500 //the maxium value for one circle
    },
    radiusAxis: {
        show: false,
        type: 'category',
        data: ['Drinks','Calories', 'Money']
    },
    polar: {},
    series: [{
        type: 'bar',
        data: trackData,
        colorBy: 'data',
        roundCap: true,
        label: {
            show: true,
            // Try changing it to 'insideStart'
            position: 'start',
            formatter: '{b}'
        },
        coordinateSystem: 'polar'

    }]
};
myChart.setOption(option);