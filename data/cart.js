export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
cart = [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
} 
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}
const addedMessageTimeouts = {};
export function addToCartNoMessage(productId){
  let quantity = 1;
  let matchingItem;
  cart.forEach(cartItem=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity +=1;
  }
  else{
    cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
    });
  }
  saveToStorage();
}
export function addToCart(productId){ 
  let quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
  let quantity = quantityElement? Number(quantityElement.value) : 1;
  let matchingItem;
  cart.forEach(cartItem=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  if(matchingItem){
    matchingItem.quantity +=1;
  }
  else{
    cart.push({
        productId,
        quantity,
        deliveryOptionId: '1'
    });
  }
  saveToStorage();
  const previousTimeoutId = addedMessageTimeouts[productId];
  if(previousTimeoutId){
    clearTimeout(previousTimeoutId);
  }
  let Id=setTimeout(()=>{
  document.querySelector(`.js-added-${productId}`).classList.remove('added-to-cart-message');
    },2000);
  addedMessageTimeouts[productId]= Id;
  document.querySelector(`.js-added-${productId}`).classList.add('added-to-cart-message');
}
export function removeFromCart(productId){
  const newCart = [];
  cart.forEach(cartItem=>{
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage();
}
export function CalculateCartQuantity(){
  let cartQuantity=0;
  cart.forEach(cartItem=>{
    cartQuantity+=cartItem.quantity;
  });
  return cartQuantity;
}
export function updateQuantity(productId,newQuantity){
  const matchingItem = cart.find(cartItem=> cartItem.productId === productId);
  matchingItem.quantity = newQuantity;
  saveToStorage();
}
export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach(cartItem=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
export function loadCart(fun){
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load',()=>{
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET','https://supersimplebackend.dev/cart');
  xhr.send();
}
export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text =  response.text();
  console.log(text);
  return text;
}
