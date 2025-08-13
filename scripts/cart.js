
export class Cart{

cartItems;

#localStorageKey ;


constructor(localStorageKey){
  this.#localStorageKey=localStorageKey
  this.loadFromStorage();
  

}
loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }



   saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
  let matchingItem;
  this.cartItems.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity =Number(document.querySelector( `.select-quantity-container-${productId}`).value) ;
  } else {
    this.cartItems.push({
      productId: productId,
      quantity: Number(document.querySelector( `.select-quantity-container-${productId}`).value),
      deliveryOptionId: "1",
    });
  }
 
  this.saveToStorage();
  cart.updateCartQuantity();
  console.log(this.cartItems);
}



updateCartQuantity() {
  let cartQuanttity = 0;
  this.cartItems.forEach((cartItem) => {
    cartQuanttity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").textContent = cartQuanttity;
}





removeFromCart(productId) {
  let newCart = [];
  this.cartItems.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  this.cartItems = newCart;

 this.saveToStorage();
}





 updateDeleliveryOptions(productId, deliveryOptionId) {
  let matchingItem;
  this.cartItems.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  this.saveToStorage();
}









}

export const cart=new Cart('cart');

// cart.localStorageKey='cart'
// cart.loadFromStorage();
// console.log(cart);