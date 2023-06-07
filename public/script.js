import images from './images/*.png'
import A11yDialog from 'a11y-dialog'

// overlay code 

var dialogEl = document.getElementById('my-dialog')
var dialog = new A11yDialog(dialogEl)

dialog.on('show', function (dialogEl, event) {
  // console.log(dialogEl)
  // console.log(event)
})

// this part of the js code handles adding drink and
// storing to local storage
// it finds the name,price,date,icon,alcohol type,time,
// calories and location


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
  // for the instance of this project i cannot find precise calories
  // for every drink (that would be impossible for me)
  // so i found the average cals for every category and hardcoded them
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

  // used this over getMonth as i wanted 'Jun' not '6'
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

  // whenver a drink is added it updates the drink, and also updates the BAC lvl,
  // and all the graphs amongst the design; which include the 3 circle icons
  // and the donut and bar graph at the top and bottom of the design 
  displayDrinks();
  bacCalc();
  drinkCalc();
  calCalc();
  priceCalc();

  // this reloads the page on input, unfortuntaely it doesnt look very smooth however it does
  // what it needs to do. echarts doesnt automatically update on input it requires 
  // this window reload function
  window.location.reload();

}

function displayDrinks() {
  drinkContainer.innerHTML = ''; // clear the drink container

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

  const drinkNumHtml = document.getElementById("drinkNum");
  drinkNumHtml.innerHTML = `${drinkNum}`;
}

function calCalc() {
  const calValues = Array.from(document.querySelectorAll('.calcss > span'));
  let addedCals = calValues.reduce((accumulator, drink) => {
    return +accumulator + +drink.textContent;
  }, 0)

  const calNumHtml = document.getElementById("calNum");
  calNumHtml.innerHTML = `${addedCals} calories`;
}

function priceCalc() {
  const drinkPrices = Array.from(document.querySelectorAll('.pricecss > span'));

  let priceAdded = drinkPrices.reduce((accumulator, drink) => {
    return +accumulator + +drink.textContent;
  }, 0)

  const priceNumHtml = document.getElementById("priceNum");
  priceNumHtml.innerHTML = `$${priceAdded}`;
}


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
// myChart.reset(); <- this doesnt refresh the chart automatically so have to window refresh


// this section is for my mood tracker
// i track 2 things (emotion and user input)
// stored to local storage and has a delete button to 
// handle mistakes/deleting entries

var submitButton = document.getElementById("submit2");

// event listener to the submit button
submitButton.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission

  // getting the selected emotion icon
  var selectedEmotion = document.querySelector("input[name='rating']:checked").value;

  // getting the user input from the textarea
  var userInput = document.getElementById("userInput").value;
  let emotionImagePath = "";

  // add image path like i did with alcohol icons before
  // used same structure 
  if (selectedEmotion == "super-happy") {
    emotion = images.reallyhappy
  }

  else if (selectedEmotion == "happy") {
    emotion = images.happy
  }

  else if (selectedEmotion == "neutral") {
    emotion = images.neutral
  }

  else if (selectedEmotion == "sad") {
    emotion = images.sad
  }

  else if (selectedEmotion == "super-sad") {
    emotion = images.reallysad
  }

  var moodEntry = {
    emotion,
    input: userInput
  };

  // get the existing diary entries from local storage
  var diaryEntries = localStorage.getItem("diaryEntries");

  // parse the existing diary entries as JSON or initialize an empty array if it's null/empty
  diaryEntries = diaryEntries ? JSON.parse(diaryEntries) : [];
  diaryEntries.push(moodEntry);
  localStorage.setItem("diaryEntries", JSON.stringify(diaryEntries));

  document.getElementById("userInput").value = "";

  //display 
  displayDiaryEntries(diaryEntries);
});

// function to display the diary entries in the diaryentries div
function displayDiaryEntries(entries) {
  var diaryEntriesDiv = document.querySelector(".diaryentries");

  // Clear the existing entries
  diaryEntriesDiv.innerHTML = "";

  // show diary date submitted
  let objectDate = new Date();
  let day = objectDate.getDate();
  let month = objectDate.toLocaleString('default', { month: 'short' });
  let year = objectDate.getFullYear();
  let dateFormat = day + ", " + month + ", " + year;

  // Loop through the entries and create HTML elements to display them
  entries.forEach(function (entry, index) {
    var entryDiv = document.createElement("div");
    entryDiv.classList.add("diary-entry");

    entryDiv.innerHTML = `
    <div class="diary">
      <p class="diaryheader"> <strong>Diary Entry (${dateFormat}):</strong> </p>
      <div class ="diarycontents">
      <img src='${entry.emotion}' width=50 height=40 />
      <p> ${entry.input}</p>
      </div>
      </div>
      <button class="delete-button">x</button>
    `;

    var deleteButton = entryDiv.querySelector(".delete-button");

    // event listener to the delete button
    deleteButton.addEventListener("click", function () {
      entries.splice(index, 1);

      // save the updated diary entries back to local storage
      localStorage.setItem("diaryEntries", JSON.stringify(entries));
      displayDiaryEntries(entries);
    });

    // append the entry div to the diary entries div
    diaryEntriesDiv.appendChild(entryDiv);
  });
}

// check if there are existing diary entries in local storage on page load
window.addEventListener("load", function () {
  if (typeof (Storage) !== "undefined") {
    var diaryEntries = localStorage.getItem("diaryEntries");

    if (diaryEntries) {
      // parse the existing diary entries and display them
      diaryEntries = JSON.parse(diaryEntries);
      displayDiaryEntries(diaryEntries);
    }
  }
});
