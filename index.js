import { menuArray } from './data.js';

// VARIABLES

const checkout = document.getElementById('checkout');
let orderArray = [];
let totalPrice = 0;

// EVENTS

// Meal buttons

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

            renderMenu();
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
            renderMenu();
        };
    });      
});

// Remove buttons

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
            
            renderMenu();
        };
    });
});

// Complete order button

document.getElementById('complete-btn').addEventListener('click', function(e) {
    document.getElementById('modal').style.display = 'inline';

    menuArray.forEach(function(meal) {
        document.getElementById(`increment-btn-${meal.id}`).disabled = true;
        document.getElementById(`decrement-btn-${meal.id}`).disabled = true;
    });

    orderArray.forEach(function(meal) {
        document.getElementById(`remove-btn-${meal.id}`).disabled = true;
    });

    document.getElementById('complete-btn').disabled = true;
})

// Close modal

document.addEventListener('click', function(e) {

    if (e.target === document.getElementById('modal')) {
        closeModal();
        
        document.getElementById('modal').style.display = 'none';

        menuArray.forEach(function(meal) {
            document.getElementById(`increment-btn-${meal.id}`).disabled = false;
            document.getElementById(`decrement-btn-${meal.id}`).disabled = false;
        });

        orderArray.forEach(function(meal) {
            document.getElementById(`remove-btn-${meal.id}`).disabled = false;
        });

        document.getElementById('complete-btn').disabled = false;
    }

});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();

        document.getElementById('modal').style.display = 'none';

        menuArray.forEach(function(meal) {
            document.getElementById(`increment-btn-${meal.id}`).disabled = false;
            document.getElementById(`decrement-btn-${meal.id}`).disabled = false;
        });

        orderArray.forEach(function(meal) {
            document.getElementById(`remove-btn-${meal.id}`).disabled = false;
        });

        document.getElementById('complete-btn').disabled = false;
    }
})

// Submit form 

document.getElementById('payment-form').addEventListener('submit', function(e) {

    e.preventDefault();
    document.getElementById('modal').style.display = 'none';

    orderArray = [];
    totalPrice = 0;

    const paymentFormData = new FormData(document.getElementById('payment-form'))
    
    renderThankYou(paymentFormData.get('cardName'));
});

// FUNCTIONS

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

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function getThankYouHtml(name) {
    let thankYouHtml = '';
    thankYouHtml = `
    <div class="container message">
        <p class="message-text">Thanks, ${name}! Your order is on its way!</p>
    </div>`;

    return thankYouHtml;
};

function renderThankYou(name) {
    checkout.innerHTML = getThankYouHtml(name);
};

function disableMealBtn() {
    menuArray.forEach(function(meal){
        if(meal.quantity === 0) {
            document.getElementById(`decrement-btn-${meal.id}`).disabled = true;
        }        
    });
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
                    <button id=decrement-btn-${meal.id} class="meal-btn">-</button>
                    <p class="meal-quantity">${meal.quantity}</p>
                    <button id=increment-btn-${meal.id} class="meal-btn">+</button>                  
               </div>
       </div>`;
    })

    return menuHtml;
};

function renderMenu(){
   document.getElementById('menu').innerHTML = getMenuHtml();
   disableMealBtn();
};

renderMenu();