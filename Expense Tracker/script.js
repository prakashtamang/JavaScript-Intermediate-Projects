// DOM Elements
const transactionForm = document.getElementById("transactionForm");

const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const dateInput = document.getElementById("date");

const incomeBtn = document.getElementById("incomeBtn");
const expenseBtn = document.getElementById("expenseBtn");

const balanceElement = document.getElementById("balance");
const incomeElement = document.getElementById("income");
const expenseElement = document.getElementById("expense");

const transactionList = document.getElementById("transactionList");
const transactionCount = document.getElementById("transactionCount");

// Application State
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let transactionType = "income";

// Set Today's Date
dateInput.value = new Date().toISOString().split("T")[0];

// Transaction Type
incomeBtn.addEventListener("click", () => {
  transactionType = "income";
  incomeBtn.classList.add("active");
  expenseBtn.classList.remove("active");
});

expenseBtn.addEventListener("click", () => {
  transactionType = "expense";
  expenseBtn.classList.add("active");
  incomeBtn.classList.remove("active");
});

// Add Transaction
transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const amount = Number(amountInput.value);
  const date = dateInput.value;

  if (!name || !amount || !date) {
    return;
  }

  const transaction = {
    id: Date.now(),
    name: name,
    amount: amount,
    date: date,
    type: transactionType,
  };

  transactions.push(transaction);

  saveTransactions();

  renderTransactions();

  updateSummary();

  transactionForm.reset();

  dateInput.value = new Date().toISOString().split("T")[0];
});

// Save to Local Storage
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Display Transactions
function renderTransactions() {
  transactionList.innerHTML = "";
  if (transactions.length === 0) {
    transactionList.innerHTML = `<p class="empty-message">No transactions yet</p>`;
    transactionCount.textContent = "0 Transactions";
    return;
  }

  //   Display newest transaction first
  const sortedTransactions = [...transactions].reverse();
  sortedTransactions.forEach((transaction) => {
    const transactionElement = document.createElement("div");
    transactionElement.classList.add("transaction", transaction.type);

    const sign = transaction.type === "income" ? "+" : "-";

    transactionElement.innerHTML = `
        <div class="transaction-info">
            <span class="transaction-name">${transaction.name}</span>
            <span class="transaction-date">${formatDate(transaction.date)}</span>
        </div>
        <div class="transaction-right">
            <span class="transaction-amount">${sign} Rs. ${transaction.amount.toFixed(2)}</span>
            <button class="delete-btn" onClick="deleteTransaction(${transaction.id})">Delete</button>
        </div>
    `;
    transactionList.appendChild(transactionElement);
  });

  transactionCount.textContent = `${transactions.length} Transaction${transactions.length !== 1 ? "s" : ""}`;
}

// Delete Transaction
function deleteTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  saveTransactions();

  renderTransactions();

  updateSummary();
}

// Update Summary
function updateSummary() {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  balanceElement.textContent = `Rs. ${balance.toFixed(2)}`;

  incomeElement.textContent = `Rs. ${income.toFixed(2)}`;

  expenseElement.textContent = `Rs. ${expenses.toFixed(2)}`;
}

// Format Date
function formatDate(date) {
  const dateObject = new Date(date + "T00:00:00");

  return dateObject.toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Initial Render
renderTransactions();

updateSummary();
