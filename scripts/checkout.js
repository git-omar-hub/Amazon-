import { renderOrderSummary } from "./checkout/orderSammary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
// import{ordersCart,saveOrderToStorage} from "./orders.js";


// import { placeOrder } from "./orders.js";

// document.querySelector('.js-place-order-button').addEventListener('click',()=>{
//     placeOrder();
//      console.log('clic');
     
//      console.log(JSON.parse(localStorage.getItem('ordersCart')));
     

    
//     // window.location.href='orders.html';
     
    
    
    
// });



import './cart.js';
renderPaymentSummary();
renderOrderSummary();


