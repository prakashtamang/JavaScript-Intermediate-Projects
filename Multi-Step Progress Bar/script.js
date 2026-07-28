const circles = document.querySelectorAll(".circle");
const progress = document.getElementById("progress");
const content = document.getElementById("content");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentStep = 1;
prev.disabled = currentStep === 1;

const messages = ["Step 1", "Step 2", "Step 3", "Finished"];

const updateUI = () => {
  circles.forEach((circle, index) => {
    if (index < currentStep) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  const progressWidth = ((currentStep - 1) / (circles.length - 1)) * 100;
  progress.style.width = `${progressWidth}%`;

  content.innerHTML = `<h2>${messages[currentStep - 1]}</h2>`;
  prev.disabled = currentStep === 1;

  if (currentStep === circles.length) {
    next.disabled = true;
    next.textContent = "Finish";
  } else {
    next.disabled = false;
    next.textContent = "Next";
  }
};

next.addEventListener("click", () => {
  if (currentStep < 4) {
    currentStep++;
    updateUI();
  }
});

prev.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--;
    updateUI();
  }
});
