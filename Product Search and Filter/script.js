const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "electronics",
    price: 89,
    rating: 4.5,
    image: "./images/product1.jpg",
  },

  {
    id: 2,
    name: "Smart Watch",
    category: "electronics",
    price: 149,
    rating: 4.2,
    image: "./images/product2.jpg",
  },

  {
    id: 3,
    name: "Running Shoes",
    category: "shoes",
    price: 75,
    rating: 4.6,
    image: "./images/product3.jpg",
  },

  {
    id: 4,
    name: "Casual T-Shirt",
    category: "clothing",
    price: 25,
    rating: 4.1,
    image: "./images/product4.jpg",
  },

  {
    id: 5,
    name: "Leather Jacket",
    category: "clothing",
    price: 180,
    rating: 4.8,
    image: "./images/product5.jpg",
  },

  {
    id: 6,
    name: "Backpack",
    category: "accessories",
    price: 45,
    rating: 4.3,
    image: "./images/product6.jpg",
  },

  {
    id: 7,
    name: "Sunglasses",
    category: "accessories",
    price: 35,
    rating: 3.9,
    image: "./images/product7.jpg",
  },

  {
    id: 8,
    name: "Gaming Mouse",
    category: "electronics",
    price: 55,
    rating: 4.4,
    image: "./images/product8.jpg",
  },

  {
    id: 9,
    name: "Denim Jeans",
    category: "clothing",
    price: 60,
    rating: 4.0,
    image: "./images/product9.jpg",
  },

  {
    id: 10,
    name: "Sports Shoes",
    category: "shoes",
    price: 95,
    rating: 4.7,
    image: "./images/product10.jpg",
  },

  {
    id: 11,
    name: "Bluetooth Speaker",
    category: "electronics",
    price: 65,
    rating: 4.3,
    image: "./images/product11.jpg",
  },

  {
    id: 12,
    name: "Wallet",
    category: "accessories",
    price: 30,
    rating: 3.8,
    image: "./images/product12.jpg",
  },
];

const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const priceSelect = document.querySelector("#price");
const ratingSelect = document.querySelector("#rating");
const sortSelect = document.querySelector("#sort");

const productContainer = document.querySelector("#product-container");
const productCount = document.querySelector("#product-count");
const noResult = document.querySelector("#no-result");
const clearButton = document.querySelector("#clear-btn");

// Display products
function displayProducts(productsToDisplay) {
  productContainer.innerHTML = "";
  productCount.textContent = productsToDisplay.length;

  if (productsToDisplay.length === 0) {
    noResult.classList.add("show");
    return;
  }

  noResult.classList.remove("show");
  productsToDisplay.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
        <img src = "${product.image}" alt="${product.name}" />
        <div class="product-info">
            <span class="product-category">${product.category}</span>
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">${product.price}</p>
            <p class="product-rating">⭐${product.rating}</p>
        </div>
    `;
    productContainer.appendChild(productCard);
  });
}

// Filter Product
function filterProducts() {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categorySelect.value;
  const priceValue = priceSelect.value;
  const ratingValue = Number(ratingSelect.value);

  let filteredProducts = products.filter((product) => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchValue);

    // Category filter
    const matchesCategory =
      categoryValue === "all" || product.category === categoryValue;

    // Price filter
    const matchesPrice =
      priceValue === "all" || product.price <= Number(priceValue);

    // Rating filter
    const matchesRating = product.rating >= ratingValue;

    return matchesSearch && matchesCategory && matchesPrice && matchesRating;
  });

  // sort products
  filteredProducts = sortProducts(filteredProducts);

  // Display results
  displayProducts(filteredProducts);
}

// Sort products
function sortProducts(productsToSort) {
  const sortValue = sortSelect.value;
  const sortedProducts = [...productsToSort];

  if (sortValue === "name-asc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortValue === "name-desc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-high") {
    sortedProducts.sort((a, b) => b.rating - a.rating);
  }
  return sortedProducts;
}

// Event Listeners
searchInput.addEventListener("input", filterProducts);
categorySelect.addEventListener("change", filterProducts);
priceSelect.addEventListener("change", filterProducts);
ratingSelect.addEventListener("change", filterProducts);
sortSelect.addEventListener("change", filterProducts);

// Clear filters
clearButton.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  priceSelect.value = "all";
  ratingSelect.value = "0";
  sortSelect.value = "default";
  filterProducts();
});

displayProducts(products);
