import images from './images/*.png'

// code from line 3 to 13 is an API  named a11y-dialog. referenced in README

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

  if (alcoholType == 'beer') {
    imagePath = images.beericon
  }
  else if (alcoholType == 'spirits') {
    imagePath = images.spiriticon
  }
  else if (alcoholType == 'wine') {
    imagePath = images.wineicon
  }
  else if (alcoholType == 'cocktails') {
    imagePath = images.cocktailicon
  }
  else if (alcoholType == 'champagne') {
    imagePath = images.champicon
  }
  else if (alcoholType == 'other') {
    imagePath = images.othericon
  }


  let objectDate = new Date();

  let day = objectDate.getDate();
  console.log(day); // 23
  
  let month = objectDate.getMonth();
  console.log(month + 1); // 8
  
  let year = objectDate.getFullYear();
  console.log(year); // 2022

  let dateFormat = day + "/" + month + "/" + year;


  const drink = {
    name,
    price,
    location,
    alcoholType,
    imagePath,
    dateFormat
  };

  let drinks = JSON.parse(localStorage.getItem('drinks')) || [];
  drinks.push(drink);

  localStorage.setItem('drinks', JSON.stringify(drinks));
  // console.log(JSON.stringify(drinks));

  form.reset();

  displayDrinks();
  bacCalc();
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
        <div class="layout">

        <div class="lineone">
        <p class="drinkcss"><strong><span>${drink.name}</span></strong></p>
        <p class="pricecss">$<span>${drink.price}</span></p>
        </div>
        
        <div class="linetwo">
        <p class="calcss">210 calories<p>
        <p class="datecss"><span>${drink.dateFormat}</span></p>
        </div>

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
bacCalc()




// // Setting up variables for our HTML elements using DOM selection
// const form = document.getElementById("taskform");
// const tasklist = document.getElementById("tasklist");

// form.addEventListener("submit", function (event) {
//     event.preventDefault();

//     console.log(form.elements.taskType.value)

//     addTask(
//         form.elements.taskName.value,
//         form.elements.taskType.value,
//         form.elements.taskRate.value,
//         form.elements.taskTime.value,
//         form.elements.taskClient.value,
//     )
//     console.log(taskList)
// })

// function displayTask(task) {
//     let item = document.createElement("li");
//     item.setAttribute("data-id", task.id);
//     item.innerHTML = `<p><strong>${task.name}</strong><br>${task.type}</p>`;

//     tasklist.appendChild(item);

//     // Clear the value of the input once the task has been added to the page
//     form.reset();

//     // Setup delete button DOM elements
//     let delButton = document.createElement("button");
//     let delButtonText = document.createTextNode("Delete");
//     delButton.appendChild(delButtonText);
//     item.appendChild(delButton); // Adds a delete button to every task

//     // Listen for when the delete button is clicked
//     delButton.addEventListener("click", function (event) {

//         taskList.forEach(function (taskArrayElement, taskArrayIndex) {
//             if (taskArrayElement.id == item.getAttribute('data-id')) {
//                 taskList.splice(taskArrayIndex, 1)
//             }
//         })

//         // Make sure the deletion worked by logging out the whole array
//         console.log(taskList)

//         item.remove(); // Remove the task item from the page when button clicked
//         // Because we used 'let' to define the item, this will always delete the right element

//     })


// }




// // Create an object called 'task'
// // Populate the properties based on the provided data model

// // Commented out now the object creation is included in the function

// // var task = {
// //   name: "Initial Sketches",
// //   type: "Concept Ideation",
// //   id: Date.now(),
// //   date: new Date().toISOString(),
// //   rate: 50,
// //   time: 5,
// //   client: "Google"
// // }

// // console.log(task);


// // Create an array called 'taskList' var taskList = [];

// // Create a function called 'addTask'
// // Give the function input parameters for: name, type, rate, time, client
// // Paste your object definition from above in the function
// // Replace the property values with the input paramaters
// // Add the object to the taskList array

// function addTask(name, type, rate, time, client) {

//     // Creating the object with the usual property:value syntax
//     // Create task object 
//     // let task = {
//     //   name: name,
//     //   type: type,
//     //   id: Date.now(),
//     //   date: new Date().toISOString(),
//     //   rate: rate,
//     //   time: time,
//     //   client: client
//     // }

//     // Creating the object, directly passing in the input parameters
//     let task = {
//         name,
//         type,
//         id: Date.now(),
//         date: new Date().toISOString(),
//         rate,
//         time,
//         client
//     }

//     taskList.push(task);
//     displayTask(task);

// }

// // Call the function with test values for the input paramaters
// addTask("Initial Sketches", "Concept Ideation", 50, 5, "Google");

// // Log the array to the console.
// console.log(taskList);


