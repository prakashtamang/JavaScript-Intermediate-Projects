const form = document.querySelector(".payment-form");
const tableBody = document.querySelector(".table-container tbody");
let errorMessage = document.querySelector(".error-message");

let cards = JSON.parse(localStorage.getItem("cards")) || [];

displayCards();

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const cardNumber = document.getElementById("card-number").value;
  const cardHolder = document.getElementById("card-holder").value;
  const expiryMonth = document.getElementById("expiry-month").value;
  const expiryYear = document.getElementById("expiry-year").value;
  const cvv = document.getElementById("card-cvv").value;

  const expirationDate = `${expiryMonth}, ${expiryYear}`;

  let errors = [];

  if (cardNumber.trim() === "") {
    errors.push("Please Enter Card Number");
  }

  if (cardHolder.trim() === "") {
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
      <td><a href="#" onClick="handleDelete(${card.id})">Delete</a></td>
    `;
    tableBody.append(row);
  });
}

function handleDelete(id) {
  let confirm = window.confirm("Are you sure you want to delete this data?");
  if (!confirm) return;

  cards = cards.filter((card) => card.id !== id);

  localStorage.setItem("cards", JSON.stringify(cards));

  displayCards();
}
