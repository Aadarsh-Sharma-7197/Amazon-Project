import { CalculateCartQuantity, cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { getProduct } from "../../data/products.js";
import { priceCalculator } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";
export let Total;
export function renderPaymentSummary(){
    let itemsCost = 0;
    let shippingCost = 0;
    cart.forEach(cartItem=>{
        const matchingProduct = getProduct(cartItem.productId);
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        itemsCost += matchingProduct.priceCents*cartItem.quantity;
        shippingCost += deliveryOption.priceCents;
    });
    const TotalbeforeTax = itemsCost + shippingCost;
    const Tax = TotalbeforeTax*0.1;
    const TotalafterTax = TotalbeforeTax + Tax;
    Total = TotalafterTax;
    let PaymentSummaryHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${CalculateCartQuantity()}):</div>
            <div class="payment-summary-money">$${priceCalculator(itemsCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceCalculator(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceCalculator(TotalbeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceCalculator(Tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceCalculator(TotalafterTax)}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = PaymentSummaryHTML;
  document.querySelector('.js-place-order').addEventListener('click',async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders',{
      method: 'POST',
      headers: {
      'Content-Type' : 'application/json'},
      body: JSON.stringify({
        cart : cart
        })
      })
    const order = await response.json();
    console.log(order);
    addOrder(order);
    } catch (error){
      console.log('Unexpected error. Try again later.');
    }
    window.location.href = "orders.html";
  });
}