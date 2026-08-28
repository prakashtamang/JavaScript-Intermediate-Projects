const form = document.querySelector(".payment-form");
const tableBody = document.querySelector(".table-container tbody");
const errorMessage = document.querySelector(".error-message");
const submitButton = document.querySelector("#submit");

let cards = JSON.parse(localStorage.getItem("cards")) || [];

let editId = null;

displayCards();

// Form Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardNumber = document.getElementById("card-number").value.trim();
  const cardHolder = document.getElementById("card-holder").value.trim();
  const expiryMonth = document.getElementById("expiry-month").value;
  const expiryYear = document.getElementById("expiry-year").value;
  const cvv = document.getElementById("card-cvv").value.trim();

  let errors = [];

  if (cardNumber === "") {
    errors.push("Please Enter Card Number");
  }

  if (cardHolder === "") {
    errors.push("Please Enter Card Holder Name");
  }

  if (expiryMonth === "") {
    errors.push("Please Select Expiration Month");
  }

  if (expiryYear === "") {
    errors.push("Please Select Expiration Year");
  }

  if (cvv === "") {
    errors.push("Please Enter CVV");
  }

  if (errors.length > 0) {
    errorMessage.innerHTML = `
    <ul>
        ${errors.map((error) => `<li>${error}</li>`).join("")}
    </ul>
    `;
    return;
  }

  errorMessage.innerHTML = "";

  const expirationDate = `${expiryMonth}, ${expiryYear}`;

  // Update Existing Form
  if (editId !== null) {
    const card = cards.find((card) => card.id === editId);

    card.cardNumber = cardNumber;
    card.cardHolder = cardHolder;
    card.expirationDate = expirationDate;
    card.cvv = cvv;

    localStorage.setItem("cards", JSON.stringify(cards));

    editId = null;

    submitButton.textContent = "Submit";

    displayCards();

    form.reset();

    return;
  }

  // Create New Card
  const card = {
    id: Date.now(),
    cardNumber: cardNumber,
    cardHolder: cardHolder,
    expirationDate: expirationDate,
    cvv: cvv,
  };

  cards.push(card);

  localStorage.setItem("cards", JSON.stringify(cards));

  displayCards();

  form.reset();
});

// Display Card
function displayCards() {
  tableBody.innerHTML = "";

  cards.forEach((card, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${card.cardNumber}</td>
      <td>${card.cardHolder}</td>
      <td>${card.expirationDate}</td>
      <td>${card.cvv}</td>
      <td> 
        <div class="action">
          <a href="#" class="edit-btn" onClick="handleEdit(${card.id})">Edit</a>
          <a href="#" class="delete-btn" onClick="handleDelete(${card.id})">Delete</a>
        </div>
      </td>
    `;
    tableBody.append(row);
  });
}

// Edit Card
function handleEdit(id) {
  const card = cards.find((card) => card.id === id);

  if (!card) {
    return;
  }

  editId = id;

  document.getElementById("card-number").value = card.cardNumber;
  document.getElementById("card-holder").value = card.cardHolder;
  document.getElementById("card-cvv").value = card.cvv;

  const [month, year] = card.expirationDate.split(", ");

  document.getElementById("expiry-month").value = month;
  document.getElementById("expiry-year").value = year;

  submitButton.textContent = "Update";

  errorMessage.innerHTML = "";

  form.scrollIntoView({
    behavior: "smooth",
  });
}

// Delete Card
function handleDelete(id) {
  let confirmDelete = window.confirm(
    "Are you sure you want to delete this data?",
  );
  if (!confirmDelete) return;

  cards = cards.filter((card) => card.id !== id);

  localStorage.setItem("cards", JSON.stringify(cards));

  displayCards();
}
