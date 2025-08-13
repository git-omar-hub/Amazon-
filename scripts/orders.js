
import { getProduct, products } from "./products.js";
import { orderTotalPrice } from "./checkout/paymentSummary.js";
import { cart } from "./cart.js";
import { formatCurrency } from "./utils/money.js";
import { calculateDeliveryDate,getDeliveryOptionId } from "../data/deliveryoptions.js";
import {updateItemsNum} from "./checkout/orderSammary.js";
//import { track_item,track_items } from "./tracking.js";
 let ordersCart = [];


// if (window.location.pathname.endsWith("orders.html")) {
//   loadOrdersFromStorage();
//   renderOrderList();
// }

function loadOrdersFromStorage() {
  ordersCart = JSON.parse(localStorage.getItem("ordersCart")) || [];
  
  // console.log("load from storge");
  // console.log(ordersCart);

}

 loadOrdersFromStorage();
export function saveOrderToStorage() {
  // loadOrdersFromStorage();
  localStorage.setItem("ordersCart", JSON.stringify(ordersCart));
  console.log("sved");
}


// loadOrdersFromStorage();


window.onload = function () {
  
  renderOrderList();
  if(!document.querySelector('.cart-quantity')){
    return;
  }
  updateItemsNum('.cart-quantity');
  let orderGride=document.querySelector(".orders-grid");
 
  if (!orderGride)
  {
    
  }
  else if (orderGride.innerHTML.trim() === ''){
    orderGride.innerHTML=`
    <div>
      <div data-testid="empty-cart-message">
        Your have no order yet.
      </div>
      <a class="button-primary view-products-link" href="index.html" data-testid="view-products-link">
        View products
      </a>
      </div>
  `
  }
  
};



export function placeOrder() {
   console.log(ordersCart);
  let orderItems = [];
 
  cart.cartItems.forEach((item) => {
    const product = getProduct(item.productId);
    orderItems.push({
      productid: product.id,
      arrivingDate: calculateDeliveryDate(
        getDeliveryOptionId(item.deliveryOptionId)
      ),
      quantity: item.quantity,
    });
  });

  ordersCart.push({
    datePlaced: new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    }),
    totalPrice: formatCurrency(orderTotalPrice().totalCents),
    orderId: crypto.randomUUID(),
    orderItems,
  });
   console.log(ordersCart);

   console.log('order placed');
   saveOrderToStorage();
    cart.cartItems=[];
    cart.saveToStorage();

    console.log(JSON.parse(localStorage.getItem('ordersCart')));
    
   
}




 function renderOrderList() {
  
  let html = ``;

  ordersCart.forEach((order) => {
    let orderItems = order.orderItems;
    let orderHtml = ``;
    // console.log(orderItems);
    orderItems.forEach((orderItem) => {
      const product = getProduct(orderItem.productid);
      // console.log(orderItem.arrivingDate);
      orderHtml += `
            <div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${orderItem.arrivingDate}
              </div>
              <div class="product-quantity">
                Quantity: ${orderItem.quantity}
              </div>
              <button class="buy-again-button button-primary">
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a  href="tracking.html">
                <button class="track-package-button button-secondary" data-order-id="${order.orderId}" data-item-id="${orderItem.productid}">
                  Track package
                </button>
              </a>
            </div>
            `;
    });



    html = `
    
    <div class="order-container">

          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${order.datePlaced}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${order.totalPrice}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.orderId}</div>
            </div>
          </div>



          <div class="order-details-grid">
${orderHtml}
            </div>
        </div>
    
    `;
    if(! document.querySelector(".orders-grid")){
      return;
    }
     document.querySelector(".orders-grid").innerHTML += html;
  });

 
document.querySelectorAll('.track-package-button').forEach((button)=>{
  button.addEventListener('click',()=>{

  let item ={orderId:button.dataset.orderId,itemId:button.dataset.itemId};
   console.log(button.dataset.orderId,button.dataset.itemId);
   console.log(item);
   
   localStorage.setItem('track_item',JSON.stringify(item));
    
  });
});

}




// renderOrderList();

// console.log(document.querySelectorAll('.track-package-button'));



// ordersCart.push({
//         "datePlaced": "August 11",
//         "totalPrice": "52.42",
//         "orderId": "4cffbf74-e44c-49be-97bf-0240f4a39d86",
//         "orderItems": [
//             {
//                 "productid": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             },
//             {
//                 "productid": "54e0eccd-8f36-462b-b68a-8182611d9add",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             },
//             {
//                 "productid": "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             }
//         ]
//     });

// ordersCart.push({
//         "datePlaced": "August 11",
//         "totalPrice": "52.42",
//         "orderId": "4cffbf74-e44c-49be-97bf-0240f4a39d86",
//         "orderItems": [
//             {
//                 "productid": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             },
//             {
//                 "productid": "54e0eccd-8f36-462b-b68a-8182611d9add",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             },
//             {
//                 "productid": "3ebe75dc-64d2-4137-8860-1f5a963e534b",
//                 "arrivingDate": "Monday, August 18",
//                 "quantity": 1
//             }
//         ]
//     });

// saveOrderToStorage();

// renderOrderList();
