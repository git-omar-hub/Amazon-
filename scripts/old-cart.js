



//};









// let matchId;
//   cart.forEach((cartItem)=>{

//       if(cartItem.productId === productId)
//       {
//           matchId=cartItem.productId;
//       }

//   });

// cart.splice(cart.findIndex(i => i.productId === matchId ), 1);

// document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
//     button.addEventListener('click',()=>{
//         console.log('fff');

//     })});

// cart.forEach((order)=>{

//     products.forEach((item)=>{

//         if(item.id === order.productId)
//         {

//         }

//     });

// });

//         const d = new Date();
// d.setDate(d.getDate() + 2);

// console.log(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));

















export let cart = JSON.parse(localStorage.getItem("cart"));

if (!cart) {
  cart = [
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

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: "1",
    });
  }
  
  saveToStorage();
  console.log(cart);
}

export function updateCartQuantity() {
  let cartQuanttity = 0;
  cart.forEach((cartItem) => {
    cartQuanttity += cartItem.quantity;
  });
  document.querySelector(".js-cart-quantity").textContent = cartQuanttity;
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  cart = newCart;

  saveToStorage();
  
}

export function updateDeleliveryOptions(productId, deliveryOptionId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

// let matchId;
//   cart.forEach((cartItem)=>{

//       if(cartItem.productId === productId)
//       {
//           matchId=cartItem.productId;
//       }

//   });

// cart.splice(cart.findIndex(i => i.productId === matchId ), 1);

// document.querySelectorAll('.js-add-to-cart').forEach((button)=> {
//     button.addEventListener('click',()=>{
//         console.log('fff');

//     })});

// cart.forEach((order)=>{

//     products.forEach((item)=>{

//         if(item.id === order.productId)
//         {

//         }

//     });

// });

//         const d = new Date();
// d.setDate(d.getDate() + 2);

// console.log(d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));