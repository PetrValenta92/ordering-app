import { menuArray } from './data.js';



function getFeedHtml() {
     let feedHtml = '';

     menuArray.forEach(function(meal){
        feedHtml += `
        <div class="container meal">
            <p class="meal-img">${meal.emoji}</p>
                <div class="meal-details">
                    <h3 class="meal-title">${meal.name}</h3>
                    <p class="meal-ingrediences">${meal.ingredients}</p>
                    <p class="meal-price">${meal.price}$</p>
                </div>
                <div class="meal-buttons">
                    <button id="add-btn" class="meal-btn">+</button>
                    <button id="deduct-btn" class="meal-btn" disabled>-</button>
                </div>
        </div>`
     })

     return feedHtml;
}

function render(){
    document.getElementById('feed').innerHTML = getFeedHtml();
}

render(); 

