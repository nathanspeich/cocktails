//Variables
const btn = document.querySelector(".btn");

//Event Listener
btn.addEventListener("click", searchCocktailDB);

//Functions

//Search Cocktail DB
function searchCocktailDB(event) {
  //User search input
  const searchInput = document.querySelector("input").value;
  //Prevent empty searches
  if (searchInput === "") {
    return;
  }
  //Prevent form from submitting
  event.preventDefault();
  //Fetch API URL
  fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      searchInput
    )}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      //Reset DOM
      resetDOM();
      //Loop through drinks arr and return a new copy
      data.drinks.map((drink) => {
        //Display each returned arr obj to the DOM
        addCocktailToDOM(drink);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//Reset DOM
function resetDOM() {
  const searchResults = document.querySelector(".searchResults");

  while (searchResults.firstChild)
    searchResults.removeChild(searchResults.firstChild);
}

//Display arr objects on DOM
function addCocktailToDOM(drink) {
  //Create article el
  const cocktail = document.createElement("article");
  cocktail.classList.add("cocktail");
  //Create img el
  const cocktailImg = document.createElement("img");
  cocktailImg.classList.add("cocktailImg");
  cocktailImg.src = drink.strDrinkThumb;
  cocktail.appendChild(cocktailImg);
  //Create article text box
  const cocktailTextBox = document.createElement("div");
  cocktailTextBox.classList.add("cocktailTextBox");
  cocktail.appendChild(cocktailTextBox);
  //Create h2 el
  const cocktailName = document.createElement("h2");
  cocktailName.classList.add("cocktailName");
  cocktailName.innerText = drink.strDrink;
  cocktailTextBox.appendChild(cocktailName);
  //Create div container
  const cocktailIngredientsContainer = document.createElement("div");
  cocktailIngredientsContainer.classList.add("cocktailIngredientsContainer");
  cocktailTextBox.appendChild(cocktailIngredientsContainer);
  //Create h3 el
  const cocktailIngredientsHeading = document.createElement("h3");
  cocktailIngredientsHeading.classList.add("cocktailIngredientsHeading");
  cocktailIngredientsHeading.innerText = "Ingredients:";
  cocktailIngredientsContainer.appendChild(cocktailIngredientsHeading);
  //Create ul el
  const cocktailIngredients = document.createElement("ul");
  cocktailIngredients.classList.add("cocktailIngredients");
  cocktailIngredients.innerHTML = `${addIngredientsToDOM(drink)}`;
  cocktailIngredientsContainer.appendChild(cocktailIngredients);
  //Create div container
  const cocktailInstructionsContainer = document.createElement("div");
  cocktailInstructionsContainer.classList.add("cocktailInstructionsContainer");
  cocktailTextBox.appendChild(cocktailInstructionsContainer);
  //Create h3 el
  const cocktailInstructionsHeading = document.createElement("h3");
  cocktailInstructionsHeading.classList.add("cocktailInstructionsHeading");
  cocktailInstructionsHeading.innerText = "Instructions:";
  cocktailInstructionsContainer.appendChild(cocktailInstructionsHeading);
  //Create p el
  const cocktailInstructions = document.createElement("p");
  cocktailInstructions.classList.add("cocktailInstructions");
  cocktailInstructions.innerText = `${truncate(drink.strInstructions, 200)}`;
  cocktailInstructionsContainer.appendChild(cocktailInstructions);

  //Append new cocktail el to searchResults section el
  document.querySelector(".searchResults").appendChild(cocktail);
}

//Ingredients function
function addIngredientsToDOM(drink) {
  let li = "";
  for (const [key, value] of Object.entries(drink)) {
    if (key.includes("strIngredient") && value && key.includes) {
      li += `<li>${value}</li>`;
    }
  }
  return li;
}

//Meta description character limit ellipsis
function truncate(p, n) {
  return p.length > n ? p.substr(0, n - 1) + "..." : p;
}
