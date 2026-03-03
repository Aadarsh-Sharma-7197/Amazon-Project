import { renderOrderSummary } from "./checkout/OrderSummary.js";
import { renderPaymentSummary } from "./checkout/PaymentSummary.js";
// import '../data/cart-class.js';
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart, loadCartFetch } from "../data/cart.js";

async function loadPage() {
    try{
    // await loadProductsFetch();
    // await loadCartFetch();
    await Promise.all([
    loadProductsFetch(),
    loadCartFetch()
    ]);
    // await new Promise((resolve)=>{
    //     loadCart(()=>{
    //         resolve();
    //     });
    // });
    } catch{
        console.log('Unexpected error. Please try again later.');
    }
    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();

/*  
Promise.all([
    loadProductsFetch(),
    new Promise((resolve)=>{
    loadCart(()=>{
        resolve();
    });
})
]).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})
*/
/*
new Promise((resolve)=>{
    loadProducts(()=>{
        resolve('value1');
    });
}).then((value)=>{
    console.log(value);
    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    });
}).then((value)=>{
    console.log(value);
    renderOrderSummary();
    renderPaymentSummary();
});
*/

/*
Callback

loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/