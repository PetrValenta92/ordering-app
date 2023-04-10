import { menuArray } from './data.js';

const checkoutOrder = document.getElementById('checkout-order');
let orderMealHtml = '';
let checkoutHtml = ''; 
let totalPrice = 0;

document.getElementById('menu').addEventListener('click', function(e){

    menuArray.forEach(function(meal){

        if (e.target.id === `add-btn-${meal.id}`) {
            showCheckout(); 

            if (checkoutOrder.contains(document.getElementById(`meal-${meal.id}`))) {
                addOneToMealQuantity(meal);
                renderNewQuantity(meal);
            } else {
                addOneToMealQuantity(meal);
                renderOrderMeal(meal);
            }

            console.log(orderMealHtml);
    
            totalPrice += meal.price;

            renderSummary();
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
                    <button id=add-btn-${meal.id} class="meal-btn">+</button>
                    <button id=remove-btn-${meal.id} class="meal-btn" disabled>-</button>
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

function getOrderMealHtml(meal) { 

    orderMealHtml += `
        <div id="meal-${meal.id}" class="checkout-meal">
            <p class="meal-title">${meal.name}</p>
            <button id="remove-meal-btn" class="remove-meal-btn">remove</button>
            <div>
                <p class="meal-count">${meal.quantity}x</p>
                <p class="meal-price">$${meal.price*meal.quantity}</p>
            </div>
        </div>`;

        return orderMealHtml;
};

function renderOrderMeal(meal) {
    document.getElementById('checkout-order').innerHTML = getOrderMealHtml(meal);
}

function getNewQuantityHtml(meal) {
    let newQuantityHtml = `
        <p class="meal-title">${meal.name}</p>
        <button id="remove-meal-btn" class="remove-meal-btn">remove</button>
        <div>
            <p class="meal-count">${meal.quantity}x</p>
            <p class="meal-price">$${meal.price*meal.quantity}</p>
        </div>
    `

    return newQuantityHtml;
}

function renderNewQuantity(meal) {
    document.getElementById(`meal-${meal.id}`).innerHTML = getNewQuantityHtml(meal);
}

function getSummaryHtml() {
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