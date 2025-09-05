const products = [
  {
    id: "A1001",
    name: "Minecraft - Xbox One",
    price: 29.99,
    image:
      "https://target.scene7.com/is/image/Target/GUEST_780d12cc-79ae-474b-a4a3-0de8477746f5",
  },
  {
    id: "A1002",
    name: "Star Wars - Xbox One",
    price: 29.99,
    image:
      "https://target.scene7.com/is/image/Target/GUEST_ae8ed07e-fca7-47fb-9210-c4dbd739f6ec",
  },
  {
    id: "A1003",
    name: "Sour Patch Kids",
    price: 1.29,
    image:
      "https://target.scene7.com/is/image/Target/GUEST_421807fd-cbe0-4b54-8e86-ccaed1dfca4d",
  },
];

const cart = [];

function createProductHTML(product) {
  return `
    <img src="${product.image}" alt="${product.name}" class="product-image">
    <p>${product.name}</p>
    <p>$${product.price.toFixed(2)}</p>
    <button class="add-to-cart-button button" data-id="${product.id}">Add to Cart</button>
  `;
}

function createCartItemHTML(cartItem) {
  return `
    <img src="${cartItem.image}" alt="${cartItem.name}" class="cart-item-image">
    <span>${cartItem.name}</span>
    <span>Qty: ${cartItem.quantity}</span>
    <span class="cart-price">$${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
  `;
}

function displayProducts() {
  const productListContainer = document.getElementById("product-list");

  productListContainer.innerHTML = "";

  products.forEach((product) => {
    const productCard = document.createElement("div");

    productCard.classList.add("product-card");
    productCard.innerHTML = createProductHTML(product);
    productListContainer.appendChild(productCard);
  });

  document.querySelectorAll(".add-to-cart-button").forEach((button) => {
    button.addEventListener("click", () => {
      addToCart(button.dataset.id);
    });
  });
}

function addToCart(productId) {
  const existingCartItem = cart.find((item) => {
    return item.id === productId;
  });

  if (existingCartItem) {
    existingCartItem.quantity++;
  } else {
    const product = products.find((item) => {
      return item.id === productId;
    });

    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  }

  updateCart();
}

function removeFromCart(productId) {
  const cartItemIndex = cart.findIndex((item) => {
    return item.id === productId;
  });

  if (cartItemIndex > -1) {
    if (cart[cartItemIndex].quantity > 1) {
      cart[cartItemIndex].quantity--;
    } else {
      cart.splice(cartItemIndex, 1);
    }
  }

  updateCart();
}

function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart-message");
  const cartTotalContainer = document.getElementById("cart-total");

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    emptyCartMessage.style.display = "block";
    cartTotalContainer.innerHTML = "";

    return;
  }

  emptyCartMessage.style.display = "none";

  let totalPrice = 0;

  cart.forEach((cartItem) => {
    const cartItemElement = document.createElement("li");
    cartItemElement.classList.add("cart-item");

    const cartItemDetails = document.createElement("div");
    cartItemDetails.classList.add("cart-item-info");
    cartItemDetails.innerHTML = createCartItemHTML(cartItem);

    const removeButton = document.createElement("button");
    removeButton.classList.add("cart-remove", "button");
    removeButton.textContent = "Remove";
    removeButton.dataset.id = cartItem.id;
    removeButton.addEventListener("click", () => {
      return removeFromCart(cartItem.id);
    });

    cartItemElement.appendChild(cartItemDetails);
    cartItemElement.appendChild(removeButton);
    cartItemsContainer.appendChild(cartItemElement);

    totalPrice += cartItem.price * cartItem.quantity;
  });

  cartTotalContainer.innerHTML = `<h2 class="cart-total">Total: $${totalPrice.toFixed(2)}</h2>`;
}

displayProducts();
