function Cart(localStorageKey){
    const cart = {
        cartItems : undefined,
        loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(localStorageKey))
        if(!this.cartItems){
        this.cartItems = [
            {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
            },
            {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: 2
            }
            ];
        }  
        },
        saveToStorage(){
        localStorage.setItem(localStorageKey,JSON.stringify(cart.cartItems));
        },
        addedMessageTimeouts : {},
        addToCart(productId){ 
        let quantityElement = document.querySelector(`.js-quantity-selector-${productId}`);
        let quantity = Number(quantityElement.value);
        let matchingItem;
        cart.cartItems.forEach(cartItem=>{
            if(productId === cartItem.productId){
            matchingItem = cartItem;
            }
        });
        if(matchingItem){
            matchingItem.quantity +=1;
        }
        else{
            cart.cartItems.push({
                productId,
                quantity,
                deliveryOptionId: 1
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
        },
        removeFromCart(productId){
        const newCart = [];
        cart.cartItems.forEach(cartItem=>{
            if(cartItem.productId !== productId){
            newCart.push(cartItem);
            }
        });
        cart.cartItems = newCart;
        this.saveToStorage();
        },
        CalculateCartQuantity(){
        let cartQuantity = 0;
        cart.cartItems.forEach(cartItem=>{
            cartQuantity+=cartItem.quantity;
        });
        return cartQuantity;
        },
        updateQuantity(productId,newQuantity){
        const matchingItem = cart.cartItems.find(cartItem=> cartItem.productId === productId);
        matchingItem.quantity = newQuantity;
        this.saveToStorage();
        },
        updateDeliveryOption(productId,deliveryOptionId){
        let matchingItem;
        cart.cartItems.forEach(cartItem=>{
            if(productId === cartItem.productId){
            matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
        }
    }
    return cart;
}
const cart = Cart('cart-oop');
const businessCart = Cart('cart-business');
cart.loadFromStorage();
businessCart.loadFromStorage();
console.log(cart);
console.log(businessCart);










