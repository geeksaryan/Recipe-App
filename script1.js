const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".serachBtn");
const recipeContainer = document.querySelector(".recipe-container");

const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

const fetchRecipes = async function (query) {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        
        recipeContainer.innerHTML = "";
        for (let i = 0; i < response.meals.length; i++) {
            const recipeDiv = document.createElement("div");
            recipeDiv.classList.add("recipe");
            recipeDiv.innerHTML = `
                <img src="${response.meals[i].strMealThumb}">
                <h3>${response.meals[i].strMeal}</h3>
                <p><span>${response.meals[i].strArea}</span> Dish</p>
                <p>Belongs to <span>${response.meals[i].strCategory}</span> Category</p>
            `;
            
            recipeContainer.appendChild(recipeDiv);

            const button = document.createElement("button");
            button.innerText = "View Recipe";
            recipeDiv.appendChild(button);

            // Adding eventListener to recipeButton
            button.addEventListener("click", () => {
                openRecipePopup(response.meals[i]);
            });
        }
    } catch (error) {
        recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
    }
};

const openRecipePopup=(meal)=>{    //response.meal[i] is stored in the meal
    recipeDetailsContent.innerHTML=`
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="ingredientList">Ingredients:</h3>
        <ul>${fetchIngredients(meal)}</ul>
        <div class="recipeInstruction">
            <h3>Instruction:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display="block"
    
}


//function to fetchIngredents and measurements
const fetchIngredients=(meal)=>{
    let ingredients_list=""
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`]
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredients_list+=`<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredients_list;
}


recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none"

})

searchBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML=`<h2>Type the meal in the search box.</h2>`
        return;
    }
    fetchRecipes(searchInput)
    // console.log("helo");
})