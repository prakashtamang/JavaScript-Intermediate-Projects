let icons = {
  success: "task_alt",
  error: "error",
  info: "info",
  warning: "warning",
};

const showToast = (
  message = "Default Notification",
  toastType = "info",
  duration = 5000,
) => {
  let box = document.createElement("div");
  box.classList.add("toast", `toast-${toastType}`);
  box.innerHTML = `<div class="toast-content-wrapper">
        <div class="toast-icon">
          <span class="material-symbols-outlined">${icons[toastType]}</span>
        </div>
        <div class="toast-message">${message}</div>
        <div class="toast-progress"></div>
      </div>`;
  duration = duration || 5000;
  box.querySelector(".toast-progress").style.animationDuration =
    `${duration / 1000}s`;

  let isToast = document.body.querySelector(".toast");
  if (isToast) {
    isToast.remove();
  }
  document.body.appendChild(box);
};

let btnSuccess = document.querySelector(".success-btn");
let btnError = document.querySelector(".error-btn");
let btnInfo = document.querySelector(".info-btn");
let btnWarning = document.querySelector(".warning-btn");

btnSuccess.addEventListener("click", (e) => {
  e.preventDefault();
  showToast("This is success notification", "success", 5000);
});

btnError.addEventListener("click", (e) => {
  e.preventDefault();
  showToast("This is error notification", "error", 5000);
});

btnInfo.addEventListener("click", (e) => {
  e.preventDefault();
  showToast("This is info notification", "info", 5000);
});

btnWarning.addEventListener("click", (e) => {
  e.preventDefault();
  showToast("This is warning notification", "warning", 5000);
});
