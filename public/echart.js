import * as echarts from 'echarts';


let drinksAdded = document.querySelectorAll('.drink').length;
let newDrinks = drinksAdded * 10 ;
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

var trackData = [priceAdded, newCals, newDrinks]
option = {
     title: {
       text: `${drinksAdded}`,
       left: 'center',
       top: 'center',
     },
    color:['#FDBE01', '#FE724D', '#752EFE'],
    angleAxis: {
        show: false,
         max: 500 //the maxium value for one circle
    },
    radiusAxis: {
        show: false,
        type: 'category',
        data: ['Price','Calories', 'Drinks']
    },
    polar: {},
    series: [{
        type: 'bar',
        top: '80%',
        left: '80%',
        right: '80%',
        bottom: '80%',
        barWidth: 50,
        data: trackData,
        colorBy: 'data',
        showBackground: true,
        backgroundStyle: {
            color: '#f3f3f3'
        },
        roundCap: true,
        label: {
            show: true,
            position: 'insideStart',
            formatter: '{b}'
        },
        coordinateSystem: 'polar'

    }]
};
myChart.setOption(option);
// myChart.reset();
// location.reload();
