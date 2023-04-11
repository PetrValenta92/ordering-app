import { menuArray } from './data.js';

let orderMealArray = [];
let totalPrice = 0;

document.getElementById('menu').addEventListener('click', function(e){

    menuArray.forEach(function(meal){

        if (e.target.id === `increment-btn-${meal.id}`) {
            showCheckout(); 
            document.getElementById(`decrement-btn-${meal.id}`).disabled = false;

            if (!orderMealArray.includes(meal)){
                orderMealArray.push(meal);
                addOneToMealQuantity(meal);
            } else {
                addOneToMealQuantity(meal);
            }

            renderOrderMeal();
            totalPrice += meal.price;
            renderSummary();
        }
        
        if (e.target.id === `decrement-btn-${meal.id}`) {

        }
    });      
});

function getMenuHtml() {
     let menuHtml = '';

     menuArray.forEach(function(meal){

        menuHtml += `
        <div class="container meal">
            <p class="meal-img">${meal.emoji}</p>
                <div class="meal-details">
                    <h3 class="meal-title">${meal.name}</h3>
                    <p class="meal-ingrediences">${meal.ingredients}</p>
                    <p class="meal-price">${meal.price}$</p>
                </div>
                <div class="meal-buttons">
                    <button id=increment-btn-${meal.id} class="meal-btn">+</button>
                    <button id=decrement-btn-${meal.id} class="meal-btn" disabled>-</button>
                </div>
        </div>`;
     })

     return menuHtml;
};

function renderMenu(){
    document.getElementById('menu').innerHTML = getMenuHtml();
};

function showCheckout(){
    document.getElementById('checkout').style.display = 'flex';
    
};

function hideCheckout(){
    document.getElementById('checkout').style.display = 'none';
};


function getOrderMealHtml() { 
    let orderMealHtml = '';
    orderMealArray.forEach(function(meal){

            orderMealHtml += `
                <div id="meal-${meal.id}" class="checkout-meal">
                    <p class="meal-title">${meal.name}</p>
                    <button id="remove-meal-btn" class="remove-meal-btn">remove</button>
                    <div>
                        <p class="meal-count">${meal.quantity}x</p>
                        <p class="meal-price">$${meal.price*meal.quantity}</p>
                    </div>
                </div>`;
    })

    return orderMealHtml;
};

function renderOrderMeal() {
    document.getElementById('checkout-order').innerHTML = getOrderMealHtml();
}

function getSummaryHtml() {
    let checkoutHtml = '';

    checkoutHtml = `
        <p class="checkout-price-text">Total price:</p>
        <p class="checkout-price">${totalPrice}$</p>
    `;

    return checkoutHtml;
}

function renderSummary() {
    document.getElementById('checkout-summary').innerHTML = getSummaryHtml();
};

function addOneToMealQuantity(meal) {
    meal.quantity++;
} 

renderMenu();