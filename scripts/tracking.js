import { getProduct } from "./products.js";
import { updateItemsNum } from "./checkout/orderSammary.js";

updateItemsNum(".cart-quantity");
const ordersCart = JSON.parse(localStorage.getItem("ordersCart")) || [];

let orderItem = JSON.parse(localStorage.getItem("track_item"));
if (!orderItem) {
  document.querySelector(".main").innerHTML = `<div>
      <div data-testid="empty-cart-message">
        Your have no order yet.
      </div>
      <a class="button-primary view-products-link" href="index.html" data-testid="view-products-link">
        View products
      </a>
      </div>
  `;
}

const product = getProduct(orderItem.itemId);
let arrivingDate;
let quantity;
let datePlaced;

ordersCart.forEach((order) => {
  if (order.orderId === orderItem.orderId) {
    order.orderItems.forEach((item) => {
      if (item.productid === orderItem.itemId) {
        arrivingDate = item.arrivingDate;
        quantity = item.quantity;
        datePlaced = order.datePlaced;
      }
    });
  }
});

document.querySelector(".main").innerHTML += `
    <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${arrivingDate}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity: ${quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;

arrivingDate = new Date(`${arrivingDate},2025`);
datePlaced = new Date(`${datePlaced},2025`);
let progresavredge = (
  ((new Date() - datePlaced) /
    (1000 * 60 * 60 * 24) /
    ((arrivingDate - datePlaced) / (1000 * 60 * 60 * 24))) *
  100
).toFixed(2);
window.addEventListener("load", function () {
  const element = document.querySelector(".progress-bar");
  element.style.width = `${progresavredge}%`;
});
