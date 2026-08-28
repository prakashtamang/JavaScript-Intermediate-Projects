// Variables
let currentOperand = "";
let previousOperand = "";
let operation;

// DOM Elements
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]",
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]",
);

// Clear Calculator
function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = undefined;
}

// Delete Last Number
function deleteNumber() {
  currentOperand = currentOperand.toString().slice(0, -1);
}

// Append Number
function appendNumber(number) {
  // Prevent multiple decimal points
  if (number === "." && currentOperand.includes(".")) {
    return;
  }

  currentOperand = currentOperand.toString() + number.toString();
}

// Choose Operation
function chooseOperation(selectedOperation) {
  // Don't allow operation
  // if there is no current number
  if (currentOperand === "") {
    return;
  }

  // If an operation already exists,
  // calculate it first
  if (previousOperand !== "") {
    compute();
  }

  operation = selectedOperation;

  previousOperand = currentOperand;

  currentOperand = "";
}

// Compute
function compute() {
  let computation;

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  // Make sure both values are numbers
  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "x":
      computation = prev * current;
      break;

    case "÷":
      // Prevent division by zero
      if (current === 0) {
        currentOperand = "Error";
        previousOperand = "";
        operation = undefined;
        return;
      }

      computation = prev / current;
      break;

    default:
      return;
  }

  currentOperand = computation;

  operation = undefined;

  previousOperand = "";
}

// Format Display Number
function getDisplayNumber(number) {
  const stringNumber = number.toString();

  const integerDigits = parseFloat(stringNumber.split(".")[0]);

  const decimalDigits = stringNumber.split(".")[1];

  let integerDisplay;

  // Handle empty/invalid number
  if (isNaN(integerDigits)) {
    integerDisplay = "";
  } else {
    integerDisplay = integerDigits.toLocaleString("en", {
      maximumFractionDigits: 0,
    });
  }

  // If decimal exists
  if (decimalDigits != null) {
    return `${integerDisplay}.${decimalDigits}`;
  } else {
    return integerDisplay;
  }
}

// Update Display
function updateDisplay() {
  currentOperandTextElement.innerText = getDisplayNumber(currentOperand);

  if (operation != null) {
    previousOperandTextElement.innerText = `${getDisplayNumber(previousOperand)} ${operation}`;
  } else {
    previousOperandTextElement.innerText = "";
  }
}

// Number Buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.innerText);

    updateDisplay();
  });
});

// Operation Buttons
operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    chooseOperation(button.innerText);

    updateDisplay();
  });
});

// Equals Button
equalsButton.addEventListener("click", () => {
  compute();

  updateDisplay();
});

// Reset Button
allClearButton.addEventListener("click", () => {
  clear();

  updateDisplay();
});

// Delete Button
deleteButton.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});

// Initial Display
updateDisplay();
