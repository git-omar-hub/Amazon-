// const products = [
//   {
//     image: "images/products/athletic-cotton-socks-6-pairs.jpg",
//     name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
//     rating: {
//       stars: 4.5,
//       count: 87,
//     },
//     priceCents: "1090",
//   },

//   {
//     image: "images/products/intermediate-composite-basketball.jpg",
//     name: "Intermediate Size Basketball",
//     rating: {
//       stars: 4,
//       count: 127,
//     },
//     priceCents: "2095",
//   },

//   {
//     image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//     name: "Adults Plain Cotton T-Shirt - 2 Pack",
//     rating: {
//       stars: 4.5,
//       count: 56,
//     },
//     priceCents: "799",
//   },
// ];



// import {Cart} from './cart.js';
import { products } from './products.js';
import {formatCurrency} from '../scripts/utils/money.js';
import { cart } from './cart.js';



cart.updateCartQuantity();






let productsHTML='';


products.forEach((product)=>{
            productsHTML+=`<div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          $${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select  class="select-quantity-container-${product.id}" data-product-id="${product.id}" >
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer">
        </div>

        <div class="added-to-cart  js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>`;

});








document.querySelector('.js-products-grid').innerHTML=productsHTML;







document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
    button.addEventListener('click',()=>{
       const productId= button.dataset.productId;
        cart.addToCart(productId);
        cart.updateCartQuantity();
        document.querySelector(`.js-added-to-cart-${productId}` ).style.opacity = "1";

        setTimeout(() => {
    document.querySelector(`.js-added-to-cart-${productId}`).style.opacity = "0";
  }, 2000);


        console.log(cart);
      });
       
});



// const d=new Date();
// console.log(d);
// console.log(document.querySelector('.e43638ce-6aa0-4b85-b27f-e1d07eb678c6').value);




// document.querySelectorAll(`.select-quantity-container`).forEach((button) => {
//     button.addEventListener("click", () => {
//       const productId = button.dataset.productId;
//       const newQuantity = document.querySelector('.select-quantity-container').value;
//       if (newQuantity > 0) {
//         cart.cartItems.forEach((cartItem) => {
//           if (cartItem.productId === productId) {
//             cartItem.quantity = newQuantity;
//             cart.saveToStorage();
//             document.querySelector(
//               `.js-quantity-label-${productId}`
//             ).textContent = newQuantity;
//           }
//         });
//       }
    
//       updateCheckoutItems();
//     });
//   });






