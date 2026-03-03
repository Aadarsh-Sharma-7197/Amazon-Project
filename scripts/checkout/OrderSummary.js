import { CalculateCartQuantity, cart,  removeFromCart, updateDeliveryOption, updateQuantity } from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { priceCalculator } from '../utils/money.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './PaymentSummary.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export function renderOrderSummary(){
    let cartItemHTML = '';
    cart.forEach(cartItem=>{
      const productId = cartItem.productId;
      let matchingProduct = getProduct(productId);
      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption = getDeliveryOption(deliveryOptionId);
      const Day = dayjs();
      const deliveryDay = Day.add(deliveryOption.deliveryDays, 'days');
      const DateString = deliveryDay.format('dddd, MMMM D');
      cartItemHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${DateString}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                ${matchingProduct.getPrice()}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}"
                  data-product-id="${matchingProduct.id}">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link"
                data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input type="number" class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link"
                data-product-id="${matchingProduct.id}">
                  Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${DeliveryOptionHTML(matchingProduct,cartItem)}
            </div>
          </div>
        </div>
      `;
    });
    document.querySelector('.js-order-summary').innerHTML = cartItemHTML;
    document.querySelectorAll('.js-delete-link').forEach(
      link=>{
        link.addEventListener('click',()=>{
          const deleteItemId = link.dataset.productId;
          removeFromCart(deleteItemId);
          const container = document.querySelector(`.js-cart-item-container-${deleteItemId}`);
          container.remove();
          UpdateCartQuantity();
          renderPaymentSummary();
        });
      }
    );
    function UpdateCartQuantity(){
      const element = document.querySelector('.return-to-home-link');
      element.innerHTML = CalculateCartQuantity() + ' items';
    }
    UpdateCartQuantity();
    document.querySelectorAll(`.js-update-link`).forEach(link=>{
      link.addEventListener('click',()=>{
        const productId = link.dataset.productId;
        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    });

    document.querySelectorAll(`.js-save-link`).forEach(link=>{
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
      link.addEventListener('click',()=>{
        handleUpdateQuantity(productId,quantityInput);
      });
      quantityInput.addEventListener('keydown',event=>{
        if(event.key === 'Enter'){
          handleUpdateQuantity(productId,quantityInput);
        }
      });
    });
    function handleUpdateQuantity(productId,quantityInput){
      const newQuantity = Number(quantityInput.value);
      if(newQuantity<=0 || newQuantity>=1000){
        alert("Quantity must be atleast 1 and less than 1000");
        return;
      }
      updateQuantity(productId,newQuantity);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
      UpdateCartQuantity();
      renderPaymentSummary();
    }

    function DeliveryOptionHTML(matchingProduct,cartItem){
      let html = '';
      deliveryOptions.forEach((deliveryOption)=>{
        const Day = dayjs();
        const deliveryDay = Day.add(
          deliveryOption.deliveryDays,
          'days'
        );
        const DateString = deliveryDay.format('dddd, MMMM D');
        const priceString = deliveryOption.priceCents === 0?
        'FREE'
        :
        `$${priceCalculator(deliveryOption.priceCents)} - `;
        const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
        html += 
        `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" 
            ${isChecked ? 'checked': ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              ${DateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
        `;
      });
      return html;
    }

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId,deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      });
    });
}