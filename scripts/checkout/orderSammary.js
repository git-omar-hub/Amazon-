import {
  cart
} from "../../scripts/cart.js";
import { products,getProduct } from "../../scripts/products.js";
import { formatCurrency } from "../../scripts/utils/money.js";

import { deliveryOptions,getDeliveryOptionId,calculateDeliveryDate } from "../../data/deliveryoptions.js";

import { renderPaymentSummary } from "./paymentSummary.js";



 export function updateItemsNum(...selectors) {
    //update check out num in head
    let cartQuanttity = 0;
    cart.cartItems.forEach((cartItem) => {
      cartQuanttity += cartItem.quantity;
    });
    
  selectors.forEach((selector)=>{
 document.querySelector(`${selector}`
      
    ).textContent = `${cartQuanttity}`;
  })
   
    

  }




export function renderOrderSummary() {
  let cartSummaryHTML = "";
   
 
    updateItemsNum(".return-to-home-link",'.js-order-items');
    


 

  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct=getProduct(productId);

    // products.forEach((product) => {
    //   if (product.id === productId) {
    //     matchingProduct = product;
    //   }
    // });

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOptionId(deliveryOptionId);

    // deliveryOptions.forEach((option) => {
    //   if (option.id === deliveryOptionId) {
    //     deliveryOption = option;
    //   }
    // });




    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = calculateDeliveryDate(deliveryOption);
    //deliveryDate.format("dddd, MMMM D");



    cartSummaryHTML += `<div class=" cart-item-container
                js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date:
            <span class="js-delivery-date">
              ${dateString}
            </span>
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>

              <div class="product-price">
                $${matchingProduct.getPrice()}
              </div>
              <div class="js-quantity-container product-quantity" data-testid="quantity-container">
                Quantity: <span class="js-quantity-label-${
                  matchingProduct.id
                }  quantity-label" >
                  ${cartItem.quantity}
                </span>


                <input class="js-new-quantity-input-${
                  matchingProduct.id
                }    new-quantity-input" type="number" value="1" data-product-id="${
      matchingProduct.id
    }">



                <span class="js-update-quantity-link-${
                  matchingProduct.id
                } update-quantity-link link-primary" data-product-id="${
      matchingProduct.id
    }">
                  Update
                </span>

                <span class="js-save-quantity-link-${
                  matchingProduct.id
                } save-quantity-link link-primary" data-product-id="${
      matchingProduct.id
    }">
                  Save
                </span>

                <span class="js-delete-quantity-link delete-quantity-link link-primary"  data-product-id="${
                  matchingProduct.id
                }">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              ${deliveryOptionsHTML(matchingProduct, cartItem)}

            </div>
          </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOption) => {
















      // const today = dayjs();
      // const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString =calculateDeliveryDate(deliveryOption);
      
      //deliveryDate.format("dddd, MMMM D");




      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE Shipping"
          : `$${formatCurrency(deliveryOption.priceCents)}- Shipping`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += ` <div class="js-delivery-option delivery-option" data-product-id="${
        matchingProduct.id
      }" data-delivery-option-id ="${deliveryOption.id}">

          <input class="js-delivery-option-input delivery-option-input" name="${
            matchingProduct.id
          }-delivery-option" type="radio" ${isChecked ? "checked" : ""} >

          <div>
            <div class="delivery-option-date">
             ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString}
            </div>
          </div>
        </div>`;
    });
    return html;
  }


  cartSummaryHTML === ''?document.querySelector('.js-cart-summary').innerHTML=`
 
      <div data-testid="empty-cart-message">
        Your cart is empty.
      </div>
      <a class="button-primary view-products-link" href="index.html" data-testid="view-products-link">
        View products
      </a>
  `:
  document.querySelector(".js-cart-summary").innerHTML = cartSummaryHTML;


  

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;

      cart.updateDeleliveryOptions(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
      updateItemsNum();
      
    });
  });

  document.querySelectorAll(".js-delete-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      cart.removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );

      container.remove();
      updateItemsNum();
      renderPaymentSummary();
      

    });
  });

  document.querySelectorAll(".update-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      document.querySelector(
        `.js-new-quantity-input-${productId}`
      ).style.display = "inline";
      document.querySelector(
        `.js-save-quantity-link-${productId}`
      ).style.display = "inline";
      document.querySelector(
        `.js-update-quantity-link-${productId}`
      ).style.display = "none";
    });
   
  });

  document.querySelectorAll(".save-quantity-link").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const newQuantity = Number(
        document.querySelector(` .js-new-quantity-input-${productId}`).value
      );
      if (newQuantity > 0) {
        cart.cartItems.forEach((cartItem) => {
          if (cartItem.productId === productId && newQuantity > 0) {
            cartItem.quantity = newQuantity;
            cart.saveToStorage();
            document.querySelector(
              `.js-quantity-label-${productId}`
            ).textContent = newQuantity;
          }
        });
      } else {
        alert("Not valid quantity");
      }

      document.querySelector(
        `.js-new-quantity-input-${productId}`
      ).style.display = "none";
      document.querySelector(
        `.js-save-quantity-link-${productId}`
      ).style.display = "none";
      document.querySelector(
        `.js-update-quantity-link-${productId}`
      ).style.display = "inline";
      console.log(cart);
      updateItemsNum();
      renderPaymentSummary();
    });
  });
}
// renderOrderSummary();     //put it in checkout
// console.log(dayjs());
// console.log(dayjs().format('dddd,MMMM D'));
