const productsContainer = document.querySelector("#products-container");
const searchInput = document.querySelector("#search-input");
const categoryFilter = document.querySelector("#category-filter");
const priceSort = document.querySelector("#price-sort");
const resetBtn = document.querySelector("#reset-btn");
const pagination = document.querySelector("#pagination");
const loading = document.querySelector("#loading");

let products = [];
let currentPage = 1;
const productsPerPage = 8;

const fetchProducts = async () => {
  try {
    loading.textContent = "Loading products...";

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    products = await response.json();

    loading.style.display = "none";

    createCategories();

    displayProducts();
  } catch (error) {
    loading.textContent = `Error: ${error.message}`;
  }
};

const createCategories = () => {
  const categories = [...new Set(products.map((product) => product.category))];

  categories.forEach((category) => {
    const option = document.createElement("option");

    option.value = category;

    option.textContent = category;

    categoryFilter.appendChild(option);
  });
};

const getFilteredProducts = () => {
  let filteredProducts = [...products];

  // Search
  const searchTerm = searchInput.value.toLowerCase().trim();

  if (searchTerm) {
    filteredProducts = filteredProducts.filter((product) =>
      product.title.toLowerCase().includes(searchTerm),
    );
  }

  // Category
  const selectedCategory = categoryFilter.value;

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory,
    );
  }

  // Price sorting
  const sortValue = priceSort.value;

  if (sortValue === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortValue === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return filteredProducts;
};

const displayProducts = () => {
  const filteredProducts = getFilteredProducts();

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // If current page becomes invalid
  if (currentPage > totalPages && totalPages > 0) {
    currentPage = totalPages;
  }

  // Get products for current page
  const startIndex = (currentPage - 1) * productsPerPage;

  const endIndex = startIndex + productsPerPage;

  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Clear container
  productsContainer.innerHTML = "";

  // No products
  if (currentProducts.length === 0) {
    productsContainer.innerHTML = `
      <p>No products found.</p>
    `;

    pagination.innerHTML = "";

    return;
  }

  // Create product cards
  currentProducts.forEach((product) => {
    const productCard = document.createElement("div");

    productCard.classList.add("product-card");

    productCard.innerHTML = `
      <img
        src="${product.image}"
        alt="${product.title}"
      />

      <span class="category">
        ${product.category}
      </span>

      <h2>
        ${product.title}
      </h2>

      <p>
        ${product.description.substring(0, 100)}...
      </p>

      <span class="price">
        $${product.price.toFixed(2)}
      </span>
    `;

    productsContainer.appendChild(productCard);
  });

  createPagination(totalPages);
};

const createPagination = (totalPages) => {
  pagination.innerHTML = "";

  // Previous button
  const previousBtn = document.createElement("button");

  previousBtn.textContent = "←";

  previousBtn.classList.add("page-btn");

  previousBtn.disabled = currentPage === 1;

  previousBtn.addEventListener("click", () => {
    currentPage--;

    displayProducts();
  });

  pagination.appendChild(previousBtn);

  // Page buttons
  for (let page = 1; page <= totalPages; page++) {
    const pageBtn = document.createElement("button");

    pageBtn.textContent = page;

    pageBtn.classList.add("page-btn");

    if (page === currentPage) {
      pageBtn.classList.add("active");
    }

    pageBtn.addEventListener("click", () => {
      currentPage = page;

      displayProducts();
    });

    pagination.appendChild(pageBtn);
  }

  // Next button
  const nextBtn = document.createElement("button");

  nextBtn.textContent = "→";

  nextBtn.classList.add("page-btn");

  nextBtn.disabled = currentPage === totalPages;

  nextBtn.addEventListener("click", () => {
    currentPage++;

    displayProducts();
  });

  pagination.appendChild(nextBtn);
};

searchInput.addEventListener("input", () => {
  currentPage = 1;

  displayProducts();
});

categoryFilter.addEventListener("change", () => {
  currentPage = 1;

  displayProducts();
});

priceSort.addEventListener("change", () => {
  currentPage = 1;

  displayProducts();
});

resetBtn.addEventListener("click", () => {
  searchInput.value = "";

  categoryFilter.value = "all";

  priceSort.value = "default";

  currentPage = 1;

  displayProducts();
});

fetchProducts();
