document.getElementById("searchBtn").addEventListener("click", function () {
    let mealInput = document.getElementById("mealInput").value;

    document.getElementById("mealDetail").innerText = "";    
    document.getElementById("mealContainer").innerText = "";  
    if (mealInput == "") {
        nothingFound(mealInput);
    }
    else {
        loadData(mealInput);
    }
});
const loadData = mealInput => {  
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealInput}`)
        .then(res => res.json())
        .then(data => {displayData(data, mealInput);
        })
}
const displayData = (data, mealInput) => {
        const allMeals = data.meals;     
 
        const mealContainer = document.getElementById("mealContainer");
        allMeals.forEach(meal => {    
            const mealDiv = document.createElement("div");
            mealDiv.className = "mealDiv";
            mealDiv.innerHTML = `
            <div onclick="mealClicked('${meal.strMeal}')"> 
            <img  class = "mealImage" src = "${meal.strMealThumb}"  >
            <h3 class = "meal-h3">${meal.strMeal}</h3>
            </div>
            `;
            mealContainer.appendChild(mealDiv);
        })
    
}

const mealClicked = (mealName) => {
    const mealDetail = document.getElementById("mealDetail");
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showDetail(data);
        })
}
const showDetail = data => {  
    const meal = data.meals[0];   
    let mealDetail = document.getElementById("mealDetail");
    mealDetail.innerHTML = `
    <div>
    <img  src = "${meal.strMealThumb}"  >
    <h3 class = "detailText">${meal.strMeal}</h3>
    <div id = "ingredientsDiv">
    <p class = "detailText">Ingredients</p>
    <p>${meal.strMeasure1} ${meal.strIngredient1}</p>
    <p>${meal.strMeasure2} ${meal.strIngredient2}</p>
    <p>${meal.strMeasure3} ${meal.strIngredient3}</p>
    <p>${meal.strMeasure4} ${meal.strIngredient4}</p>
    <p>${meal.strMeasure5} ${meal.strIngredient5}</p>
    <p>${meal.strMeasure6} ${meal.strIngredient6}</p>
    <p>${meal.strMeasure7} ${meal.strIngredient7}</p>
    <p>${meal.strMeasure8} ${meal.strIngredient8}</p>
    </div>
    </div>
    `;
}


const nothingFound = (mealInput) => {
       const mealContainer = document.getElementById("mealContainer");
  
        const h1 = document.createElement("h1");
        h1.innerText = "Opps! Sorry dear, No meals found";
        mealContainer.appendChild(h1);
    
}

