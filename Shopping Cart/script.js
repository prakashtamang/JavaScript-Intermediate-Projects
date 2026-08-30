const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
const totalPriceElement = document.querySelector(".total-price");
const cartItemCountBadge = document.querySelector(".cart-item-count");
const buyNowButton = document.querySelector(".btn-buy");

const STORAGE_KEY = "shoppingCart";
let cartItems = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

// Cart Open/Close
cartIcon.addEventListener("click", () => {
  cart.classList.add("active");
});

cartClose.addEventListener("click", () => {
  cart.classList.remove("active");
});

// Add Product Buttons
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    const productBox = event.target.closest(".product-box");

    addToCart(productBox);
  });
});
// Add to Cart
const addToCart = (productBox) => {
  const product = {
    id: productBox.dataset.id,
    image: productBox.querySelector("img").src,
    title: productBox.querySelector(".product-title").textContent.trim(),
    price: parseFloat(
      productBox.querySelector(".price").textContent.replace("$", ""),
    ),
    quantity: 1,
  };

  // check if product already esists
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cartItems.push(product);
  }

  saveCart();
  renderCart();
  updateCartCount();
  updateTotalPrice();
};

// Render Cart
function renderCart() {
  cartContent.innerHTML = "";
  cartItems.forEach((product) => {
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.dataset.id = product.id;

    cartBox.innerHTML = `
      <img src="${product.image}" class="cart-img" alt="${product.title}" />
      <div class="cart-detail">
        <h2 class="cart-product-title">${product.title}</h2>
        <span class="cart-price">$${product.price.toFixed(2)}</span>
        <div class="cart-quantity">
          <button type="button" class="quantity-btn decrease" data-action="decrement" ${product.quantity === 1 ? "disabled" : ""}>-</button>
          <span class="number">${product.quantity}</span>
          <button type="button" class="quantity-btn increment" data-action="increment">+</button>
        </div>
      </div>
      <i class="ri-delete-bin-line cart-remove" data-action="remove" role="button" tabIndex="0" aria-label="Remove ${product.title}"></i>
    `;
    cartContent.appendChild(cartBox);
  });
}

// Cart Event Delegation
cartContent.addEventListener("click", (event) => {
  const actionElement = event.target.closest("[data-action]");

  if (!actionElement) return;

  const cartBox = actionElement.closest(".cart-box");

  if (!cartBox) return;
  const productId = cartBox.dataset.id;
  const action = actionElement.dataset.action;

  const product = cartItems.find((item) => item.id === productId);

  if (!product) return;

  // Increase quantity
  if (action === "increment") {
    product.quantity++;
  }

  // Decrease quantity
  if (action === "decrement") {
    if (product.quantity > 1) {
      product.quantity--;
    }
  }

  // Remove product
  if (action === "remove") {
    cartItems = cartItems.filter((item) => item.id !== productId);
  }

  saveCart();
  renderCart();
  updateCartCount();
  updateTotalPrice();
});

// Update Cart Count
function updateCartCount() {
  const count = cartItems.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  if (count > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = count;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
}

// Update Total Price
function updateTotalPrice() {
  const total = cartItems.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Save Cart to Local Storage
function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
}

// Buy Now
buyNowButton.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to your cart before buying.");
    return;
  }

  alert("Thank you for your purchase!");

  cartItems = [];
  localStorage.removeItem(STORAGE_KEY);

  renderCart();
  updateCartCount();
  updateTotalPrice();
});

// load cart when page starts
renderCart();
updateCartCount();
updateTotalPrice();
