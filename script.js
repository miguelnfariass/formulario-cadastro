let currrentStep = 0;
const formSteps = document.querySelectorAll(".form-step");
const form = document.querySelector("form");

/* steps */
form.addEventListener("click", (e) => {
  if (!e.target.matches("[data-action]")) {
    return;
  }

  const actions = {
    next() {
      if (!isValidInputs()) {
        return;
      }
      currrentStep++;
    },
    prev() {
      currrentStep--;
    },
  };

  const action = e.target.dataset.action;
  actions[action]();
  updateActiveStep();
  updateProgressStep();
});

/* envio do formulário */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(form);

  alert(`Obrigado, ${data.get("name")}!`);
});

/* update steps */
function updateActiveStep() {
  formSteps.forEach((step) => step.classList.remove("active"));
  formSteps[currrentStep].classList.add("active");
}

const progressStep = document.querySelectorAll(".step-progress [data-step]");
function updateProgressStep() {
  progressStep.forEach((step, idx) => {
    step.classList.remove("active");
    step.classList.remove("done");

    if (idx < currrentStep + 1) {
      step.classList.add("active");
    }

    if (idx < currrentStep) {
      step.classList.add("done");
    }
  });
}

/* validation */
function isValidInputs() {
  const currrentFormStep = formSteps[currrentStep];
  const formFields = [
    ...currrentFormStep.querySelectorAll("input"),
    ...currrentFormStep.querySelectorAll("textarea"),
  ];

  return formFields.every((input) => input.reportValidity());
}

/* animation */
formSteps.forEach((formStep) => {
  function addHide() {
    formStep.classList.add("hide");
  }

  formStep.addEventListener("animationend", (e) => {
    addHide();
    formSteps[currrentStep].classList.remove("hide");
  });
});
