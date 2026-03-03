class Cart{
    cartItems;
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.#loadFromStorage();
    }

    #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey))
    if(!this.cartItems){
    this.cartItems = [
        {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
        },
        {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
        }
        ];
        }  
    }
    saveToStorage(){
    localStorage.setItem(this.#localStorageKey,JSON.stringify(this.cartItems));
    }
    addedMessageTimeouts = {};
    addToCart(productId){ 
    let quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantityElement.value);
    let matchingItem;
    this.cartItems.forEach(cartItem=>{
        if(productId === cartItem.productId){
        matchingItem = cartItem;
        }
    });
    if(matchingItem){
        matchingItem.quantity +=1;
    }
    else{
        this.cartItems.push({
            productId,
            quantity,
            deliveryOptionId: '1'
        });
    }
    this.saveToStorage();
    const previousTimeoutId = this.addedMessageTimeouts[productId];
    if(previousTimeoutId){
        clearTimeout(previousTimeoutId);
    }
    let Id=setTimeout(()=>{
    document.querySelector(`.js-added-${productId}`).classList.remove('added-to-cart-message');
        },2000);
    this.addedMessageTimeouts[productId]= Id;
    document.querySelector(`.js-added-${productId}`).classList.add('added-to-cart-message');
    }
    removeFromCart(productId){
    const newCart = [];
    this.cartItems.forEach(cartItem=>{
        if(cartItem.productId !== productId){
        newCart.push(cartItem);
        }
    });
    this.cartItems = newCart;
    this.saveToStorage();
    }
    CalculateCartQuantity(){
    let cartQuantity = 0;
    this.cartItems.forEach(cartItem=>{
        cartQuantity+=cartItem.quantity;
    });
    return cartQuantity;
    }
    updateQuantity(productId,newQuantity){
    const matchingItem = this.cartItems.find(cartItem=> cartItem.productId === productId);
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
    }
    updateDeliveryOption(productId,deliveryOptionId){
    let matchingItem;
    this.cartItems.forEach(cartItem=>{
        if(productId === cartItem.productId){
        matchingItem = cartItem;
        }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
    }
}
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');
console.log(cart);
console.log(businessCart);










