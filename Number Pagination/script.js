const items = [
  "Item 1",
  "Item 2",
  "Item 3",
  "Item 4",
  "Item 5",
  "Item 6",
  "Item 7",
  "Item 8",
  "Item 9",
  "Item 10",
  "Item 11",
  "Item 12",
  "Item 13",
  "Item 14",
  "Item 15",
  "Item 16",
  "Item 17",
  "Item 18",
  "Item 19",
  "Item 20",
  "Item 21",
  "Item 22",
  "Item 23",
  "Item 24",
  "Item 25",
  "Item 26",
  "Item 27",
  "Item 28",
  "Item 29",
  "Item 30",
];

const itemContainer = document.querySelector("#item-container");
const pageNumbers = document.querySelector("#page-numbers");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");

// Number of items displayed on each page
const itemsPerPage = 5;

let currentPage = 1;

// Calculate total number of pages
const totalPages = Math.ceil(items.length / itemsPerPage);

// Display items
function displayItems() {
  // Clear previous items
  itemContainer.innerHTML = "";

  // Calculate starting and ending index
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get items for current page
  const currentItems = items.slice(startIndex, endIndex);

  // Display items
  currentItems.forEach((item) => {
    const div = document.createElement("div");

    div.classList.add("item");

    div.textContent = item;

    itemContainer.appendChild(div);
  });
}

// Create pagination buttons
function createPagination() {
  pageNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");

    button.textContent = i;

    button.classList.add("page-btn");

    // Highlight current page
    if (i === currentPage) {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {
      currentPage = i;

      displayItems();
      createPagination();
      updateButtons();
    });

    pageNumbers.appendChild(button);
  }
}

// Update Previous / Next buttons
function updateButtons() {
  prevBtn.disabled = currentPage === 1;

  nextBtn.disabled = currentPage === totalPages;
}

// Previous button
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;

    displayItems();
    createPagination();
    updateButtons();
  }
});

// Next button
nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;

    displayItems();
    createPagination();
    updateButtons();
  }
});

// Initial display
displayItems();
createPagination();
updateButtons();
