import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { getProduct, loadProductsFetch } from "./products.js";
import { calculateDeliveryDate, getDeliveryOption } from "./deliveryOptions.js";
import { priceCalculator } from "../scripts/utils/money.js";
import { addToCartNoMessage, CalculateCartQuantity } from './cart.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('orders',JSON.stringify(orders));
}

export function getOrder(orderId){
    let matchingOrder;
    orders.forEach(order=>{
        if(order.id === orderId){
            matchingOrder = order;
        }
    })
    return matchingOrder;
}

async function loadPage(){
    await loadProductsFetch();
    let ordersHTML = '';
    orders.forEach(order=>{
        const day = dayjs(order.orderTime);
        const orderDateString = day.format('dddd, MMMM D');    
        ordersHTML+=`
        <div class="order-container">

            <div class="order-header">
                <div class="order-header-left-section">
                    <div class="order-date">
                        <div class="order-header-label">Order Placed:</div>
                        <div>${orderDateString}</div>
                    </div>
                    <div class="order-total">
                        <div class="order-header-label">Total:</div>
                        <div>$${priceCalculator(order.totalCostCents)}</div>
                    </div>
                </div>
                <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                </div>
            </div>

            <div class="order-details-grid">
            ${productListHTML(order)}
            </div>
        </div>
        `;
    });
    function productListHTML(order){
        let productListHTML = '';
        order.products.forEach((Item)=>{
            const matchingItem = getProduct(Item.productId);
            productListHTML +=`
            <div class="product-image-container">
            <img src="${matchingItem.image}">
            </div>
            
            <div class="product-details">
            <div class="product-name">
            ${matchingItem.name}
            </div>
            <div class="product-delivery-date">
            Arriving on: ${dayjs(Item.estimatedDeliveryTime).format('dddd, MMMM D')}
            </div>
            <div class="product-quantity">
            Quantity: ${Item.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again-button"
            data-product-id="${matchingItem.id}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
            </button>
            </div>
            
            <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}">
            <button class="track-package-button button-secondary">
            Track package
            </button>
            </a>
            </div>
            `;
        });
        return productListHTML;
    }
    document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
    document.querySelectorAll(`.js-buy-again-button`).forEach((button)=>{
        button.addEventListener('click',()=>{
            addToCartNoMessage(button.dataset.productId);
            button.innerHTML = '&check;&nbsp;Added';
            setTimeout(()=>{
                button.innerHTML = `
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
                `;
            },1000);
            document.querySelector('.js-cart-quantity').innerHTML = CalculateCartQuantity();
        });
    });
    document.querySelector('.js-cart-quantity').innerHTML = CalculateCartQuantity();
}
loadPage();