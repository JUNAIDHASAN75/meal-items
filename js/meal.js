const mealsData =(searchText)=>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url) 
    .then(res=>res.json())
    .then(data=>displayMealData(data.meals))
}

const displayMealData=meals=>{
    // console.log(meals)
    const mealContainer = document.getElementById('meals-add');
    mealContainer.innerHTML = '';
    meals.forEach(meal =>{
        // console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML =`
        <div class="card h-100">
            <img class="img-fluid" src="${meal.strMealThumb}
            " class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">This is a short card.</p>
                <button onclick="loadMealDetail2(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealdetails">
                    Details
                    </button>
            </div>
            </div>
        
        `
        mealContainer.appendChild(mealDiv)
            
    })
}

const searchMeal =()=>{
    // console.log('btn-clicked');
    const searchText = document.getElementById('input-field').value;
    console.log(searchText);
    mealsData(searchText)
    
}
const loadMealDetail =mealId =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>displayMealsDetails(data.meals[0]))
    .catch(error =>{
        console.log(error)
    })
}

// async await
const loadMealDetail2 = async(mealId) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    try{
        const res = await fetch(url);
    const data = await res.json();
    displayMealsDetails(data.meals[0]);
    }
    catch(error){
        console.log(error)
    }


}



const displayMealsDetails = meal =>{
    // console.log(meal)
    document.getElementById('mealdetailsLabel').innerText = meal.strMeal;
    const mealDeatils =  document.getElementById('discription');
    mealDeatils.innerHTML = `
    <img class="img-fluid" src="${meal.strMealThumb}">
    <a class="text-decoration-none" target='_blank' href="${meal.strYoutube}" >${meal.strYoutube}</a>
    <p>${meal.strInstructions}</p>
    
    `
}
mealsData('fish');
