import { menuArray } from './data.js';

// Variables

const checkout = document.getElementById('checkout');
let orderArray = [];
let totalPrice = 0;

// Events

document.getElementById('menu').addEventListener('click', function(e){

    menuArray.forEach(function(meal){

        if (e.target.id === `increment-btn-${meal.id}`) {
            showCheckout(); 
            document.getElementById(`decrement-btn-${meal.id}`).disabled = false;

            if (orderArray.includes(meal)){
                meal.quantity++;
            } else {
                orderArray.push(meal);
                meal.quantity++;
            };

            renderOrder();
            totalPrice += meal.price;
            renderSummary();
        };
        
        if (e.target.id === `decrement-btn-${meal.id}`) {

            meal.quantity--;
            
            if (meal.quantity === 0) {
                removeMealFromArray(meal);
                totalPrice -= meal.price;
                document.getElementById(`decrement-btn-${meal.id}`).disabled = true;

                if (orderArray.length === 0) {
                    hideCheckout();
                } else {
                    renderOrder();
                };

            } else {
                renderOrder();
                totalPrice -= meal.price;
            };
            
            renderSummary();
        };
    });      
});

document.getElementById('checkout-order').addEventListener('click', function(e) {

    menuArray.forEach(function(meal) {
        if (e.target.id === `remove-btn-${meal.id}`) {

            removeMealFromArray(meal);
            totalPrice -= meal.price*meal.quantity;
            meal.quantity = 0;
            document.getElementById(`decrement-btn-${meal.id}`).disabled = true;

            if (orderArray.length === 0) {
                hideCheckout();
            } else {
                renderOrder();
                renderSummary();
            };            
        };
    });
});

document.getElementById('complete-btn').addEventListener('click', function() {
    document.getElementById('modal').style.display = 'inline';

    menuArray.forEach(function(meal) {
        document.getElementById(`increment-btn-${meal.id}`).disabled = true;
        document.getElementById(`decrement-btn-${meal.id}`).disabled = true;
    });
});

document.getElementById('payment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('modal').style.display = 'none';

    orderArray = [];
    totalPrice = 0;

    const paymentFormData = new FormData(document.getElementById('payment-form'))
    
    renderThankYou(paymentFormData.get('cardName'));
});

// Functions

function showCheckout(){
    checkout.style.display = 'flex';
};

function hideCheckout(){
    checkout.style.display = 'none';
};

function getOrderHtml() { 
    let orderHtml = '';
    orderArray.forEach(function(meal){

            orderHtml += `
                <div id="meal-${meal.id}" class="checkout-meal">
                    <p class="meal-title">${meal.name}</p>
                    <button id="remove-btn-${meal.id}" class="remove-meal-btn">remove</button>
                    <div>
                        <p class="meal-count">${meal.quantity}x</p>
                        <p class="meal-price">${meal.price*meal.quantity}$</p>
                    </div>
                </div>`;
    })

    return orderHtml;
};

function renderOrder() {
    document.getElementById('checkout-order').innerHTML = getOrderHtml();
};

function removeMealFromArray(removedMeal) {
    const i = orderArray.indexOf(removedMeal);
    orderArray.splice(i, 1);
};

function getSummaryHtml() {
    let checkoutHtml = '';
    checkoutHtml = `
        <p class="checkout-price-text">Total price:</p>
        <p class="checkout-price">${totalPrice}$</p>
    `;

    return checkoutHtml;
};

function renderSummary() {
    document.getElementById('checkout-summary').innerHTML = getSummaryHtml();
};

function getThankYouHtml(name) {
    let thankYouHtml = '';
    thankYouHtml = `
    <div class="container message">
        <p class="message-text">Thanks, ${name}! Your order is on its way!</p>
    </div>`;

    return thankYouHtml;
}

function renderThankYou(name) {
    checkout.innerHTML = getThankYouHtml(name);
};

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

renderMenu();