//   import { getProduct } from "./products.js";
//   export let ordersCart = [];





// function loadOrdersFromStorage() {
//   ordersCart = JSON.parse(localStorage.getItem("ordersCart")) || [];
  
//   console.log("load from storge");
//   console.log(ordersCart);

// }


// export function saveOrderToStorage() {
//   // loadOrdersFromStorage();
//   localStorage.setItem("ordersCart", JSON.stringify(ordersCart));
//   console.log("sved");
// }


// loadOrdersFromStorage();




// export function renderOrderList() {
  
//   let html = ``;

//   ordersCart.forEach((order) => {
//     let orderItems = order.orderItems;
//     let orderHtml = ``;
//     // console.log(orderItems);
//     orderItems.forEach((orderItem) => {
//       const product = getProduct(orderItem.productid);
//       // console.log(orderItem.arrivingDate);
//       orderHtml += `
//             <div class="product-image-container">
//               <img src="${product.image}">
//             </div>

//             <div class="product-details">
//               <div class="product-name">
//                 ${product.name}
//               </div>
//               <div class="product-delivery-date">
//                 Arriving on: ${orderItem.arrivingDate}
//               </div>
//               <div class="product-quantity">
//                 Quantity: ${orderItem.quantity}
//               </div>
//               <button class="buy-again-button button-primary">
//                 <img class="buy-again-icon" src="images/icons/buy-again.png">
//                 <span class="buy-again-message">Buy it again</span>
//               </button>
//             </div>

//             <div class="product-actions">
//               <a href="tracking.html">
//                 <button class="track-package-button button-secondary">
//                   Track package
//                 </button>
//               </a>
//             </div>
//             `;
//     });



//     html = `
    
//     <div class="order-container">

//           <div class="order-header">
//             <div class="order-header-left-section">
//               <div class="order-date">
//                 <div class="order-header-label">Order Placed:</div>
//                 <div>${order.datePlaced}</div>
//               </div>
//               <div class="order-total">
//                 <div class="order-header-label">Total:</div>
//                 <div>$${order.totalPrice}</div>
//               </div>
//             </div>

//             <div class="order-header-right-section">
//               <div class="order-header-label">Order ID:</div>
//               <div>${order.orderId}</div>
//             </div>
//           </div>



//           <div class="order-details-grid">
// ${orderHtml}
//             </div>
//         </div>
    
//     `;
//      document.querySelector(".orders-grid").innerHTML += html;
//   });

 
// }