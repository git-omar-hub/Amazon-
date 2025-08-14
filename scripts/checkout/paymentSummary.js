import { cart } from "../cart.js";
import { getProduct } from "../products.js";
import { getDeliveryOptionId } from "../../data/deliveryoptions.js";
import { formatCurrency } from "../utils/money.js";
import { placeOrder } from "../orders.js";
import { renderOrderSummary } from "./orderSammary.js";

export function orderTotalPrice() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.cartItems.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOptionId(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;
  return {
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents,
  };
}

export function renderPaymentSummary() {
  const {
    productPriceCents,
    shippingPriceCents,
    totalBeforeTaxCents,
    taxCents,
    totalCents,
  } = orderTotalPrice();

  const paymentSummaryHTML = `

      <div class="js-payment-info">
      <div class="payment-summary-title">
        Order Summary
      </div>

      <div class="payment-summary-row">
        <div >Items (<span class="js-order-items"></span>):</div>
        <div class="payment-summary-money" data-testid="product-cost">
          $${formatCurrency(productPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money" data-testid="shipping-cost">
          $${formatCurrency(shippingPriceCents)}
        </div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money" data-testid="sub-total">
          $${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>

      <div class="payment-summary-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money" data-testid="tax-cost">
          $${formatCurrency(taxCents)}
        </div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money" data-testid="total-cost">
          $${formatCurrency(totalCents)}
        </div>
      </div>
    </div>

      <div class="js-payment-buttons-container" data-testid="payment-buttons-container">

        <div class="js-paypal-button-container paypal-button-container" data-testid="paypal-button-container"></div>

        <button class="js-place-order-button place-order-button button-primary" data-testid="place-order-button">
          Place your order
        </button>
      </div>
`;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", () => {
      if (totalCents !== 0) {
        placeOrder();
        console.log("clic");
        renderOrderSummary();
        renderPaymentSummary();
        console.log(JSON.parse(localStorage.getItem("ordersCart")));
        window.location.href = "orders.html";
      } else {
        alert("select your order");
      }
    });
}
