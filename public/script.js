import images from './images/*.png'
import A11yDialog from 'a11y-dialog'

// overlay code 

var dialogEl = document.getElementById('my-dialog')
var dialog = new A11yDialog(dialogEl)

dialog.on('show', function (dialogEl, event) {
  // console.log(dialogEl)
  // console.log(event)
})

// initalise values and store to local storage

const form = document.querySelector('form');
const drinkContainer = document.getElementById('drinkContainer');

function handleSubmit(event) {
  event.preventDefault();
  dialog.hide();

  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const location = document.getElementById('location').value;
  let alcoholType = form.elements.alcoholType.value

  let imagePath = "";
  let calories = "";

  if (alcoholType == 'beer') {
    imagePath = images.beericon
    calories = "150"
  }
  else if (alcoholType == 'spirits') {
    imagePath = images.spiriticon
    calories = "97"
  }
  else if (alcoholType == 'wine') {
    imagePath = images.wineicon
    calories = "90"
  }
  else if (alcoholType == 'cocktails') {
    imagePath = images.cocktailicon
    calories = "170"
  }
  else if (alcoholType == 'champagne') {
    imagePath = images.champicon
    calories = "80"
  }
  else if (alcoholType == 'other') {
    imagePath = images.othericon
    calories = "120"
  }

  // finding date section using new Date
  let objectDate = new Date();

  let day = objectDate.getDate();
  let month = objectDate.toLocaleString('default', { month: 'short' });
  // let month = objectDate.getMonth();
  let year = objectDate.getFullYear();

  let dateFormat = day + ", " + month + ", " + year;

  const currentDate = new Date();

  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  

  let timeFormat = currentHour + ":" + currentMinute;

  const drink = {
    name,
    price,
    location,
    alcoholType,
    imagePath,
    dateFormat,
    calories,
    timeFormat
  };

  let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
  drinks.push(drink);

  localStorage.setItem('drinks', JSON.stringify(drinks));
  // console.log(JSON.stringify(drinks));

  form.reset();

  displayDrinks();
  bacCalc();
  drinkCalc();
  calCalc();
  priceCalc();
}

function displayDrinks() {
  drinkContainer.innerHTML = ''; // Clear the drink container

  const drinks = JSON.parse(localStorage.getItem('drinks')) || [];

  // reverse array (my original drinks section wasnt scrolling & was in the 
  // incorrect order, the toReversed function was advice from Rob)
  let reverseDrinks = drinks.toReversed()

  // innherhtml 
  reverseDrinks.forEach((drink, index) => {
    // console.log(drink.imagePath)
    const drinkHTML = `
      <div class="drink">
      <img src='${drink.imagePath}' width=40 height=40 />

      <div id="faq">
        <ul>
          <li>
            <input type="checkbox" checked>
            <div class="layout">
              <div class="lineone">
                <p class="drinkcss"><strong><span>${drink.name}</span></strong></p>
                <p class="pricecss">$<span>${drink.price}</span></p>
              </div>
              <div class="linetwo">
                <p class="calcss"><span>${drink.calories}</span> calories<p>
                <p class="datecss"><span>${drink.dateFormat}</span></p>
              </div>
            </div>
            <p class="loccss">Location: <span>${drink.location}</span></p>
            <p class="loccss">Location: <span>${drink.timeFormat}</span></p>
          </li>
        </ul>
      </div>
      <button class="delete-btn" data-index="${index}">&times;</button>
     </div>
    `;

    drinkContainer.innerHTML += drinkHTML;
  });
  
  
  const deleteButtons = drinkContainer.getElementsByClassName('delete-btn');
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener('click', handleDelete);
  });
}

// this function gets the drinks and finds the len of array. I used
// an average of 0.02 for every drink (even if this isnt completely accurate)
// as it minimises me finding the BAC for every single drink. 
function bacCalc() {
  let getDrinks = JSON.parse(localStorage.getItem('drinks')) || [];

  let bacDrinksLevel = 0.02 * getDrinks.length;

  // uses the id from html (baclevel) and updates it when a drink is added
  const bacPercHtml = document.getElementById("baclevel");
  bacPercHtml.innerHTML = `${bacDrinksLevel}%`;
}

function drinkCalc() {
  let getDrinks = JSON.parse(localStorage.getItem('drinks')) || [];

  let drinkNum = 0 + getDrinks.length;

  // uses the id from html (baclevel) and updates it when a drink is added
  const drinkNumHtml = document.getElementById("drinkNum");
  drinkNumHtml.innerHTML = `${drinkNum}`;
}

function calCalc() {
  const calValues =  Array.from(document.querySelectorAll('.calcss > span'));
  let addedCals = calValues.reduce((accumulator, drink) => {
    return +accumulator + +drink.textContent;
  }, 0)

  const calNumHtml = document.getElementById("calNum");
  calNumHtml.innerHTML = `${addedCals} calories`; 
}

function priceCalc() {
  const drinkPrices =  Array.from(document.querySelectorAll('.pricecss > span'));

  let priceAdded = drinkPrices.reduce((accumulator, drink) => {
      return +accumulator + +drink.textContent;
    }, 0)

    const priceNumHtml = document.getElementById("priceNum");
    priceNumHtml.innerHTML = `$${priceAdded}`; 
}

// const calValues =  Array.from(document.querySelectorAll('.calcss > span'));

// let addedCals = calValues.reduce((accumulator, drink) => {
//     return +accumulator + +drink.textContent;
//   }, 0)



// handles local storage and 'splices' / deletes it from local storage 
// recalls displayDrinks function to update the delete 
function handleDelete(event) {
  const index = event.target.getAttribute('data-index');
  let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
  drinks.splice(index, 1);
  localStorage.setItem('drinks', JSON.stringify(drinks));
  displayDrinks();
  
}

form.addEventListener('submit', handleSubmit);
displayDrinks();
bacCalc();
drinkCalc();
calCalc();
priceCalc();

