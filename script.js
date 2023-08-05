const pageContainers = document.querySelectorAll(".page-container");
const nextBtnEls = document.querySelectorAll(".next-btn");
const prevBtnEls = document.querySelectorAll(".back-btn");
const formEl = document.querySelector(".page-container-personal-info form");

const stepEls = document.querySelectorAll(".step");
const stepContainerUl = document.querySelector(".step-container ul");
const inputFieldEls = document.querySelectorAll(".page-container-personal-info input");
const inputFieldErrorEls = document.querySelectorAll(".input-field-error-message");

const planTypeContainer = document.querySelector(".plan-type-container");
const paymentPlanContainer = document.querySelector(".payment-plan-container");
const sliderInputEl = document.querySelector('input[type="checkbox"]');
const toggleSwitchSliderEl = document.querySelector(".slider");
const sliderToggleEl = document.querySelector(".toggle");

const addonsContainer = document.querySelector(".addons-container");
const addonPaymentPlanEls = document.querySelectorAll(".addon-payment-plan");

const summaryTotalCostEls = document.querySelectorAll(".page-container-summary span:not(.plan, .payment-plan-cost-number, .total-cost-number)");
const summarySelectedPlanTypeEl = document.querySelector(".selected-plan-type");
const summaryAddonTypeEls = document.querySelectorAll(".page-container-summary .addon-type");
const summaryAddonCostEls = document.querySelectorAll(".summary-addon-cost");
const summaryPlanTypeEl = document.querySelector(".page-container-summary .plan");
const summaryPaymentPlanCostNumEl = document.querySelector(".payment-plan-cost-number");

const summaryTotalCostEl = document.querySelector(".total-cost-number");
const changePlanTypeEl = document.querySelector(".change-plan");
const confirmBtnEl = document.querySelector(".confirm-btn");

const addonInputsEls = document.querySelectorAll(".page-container-addons input");
const addonInputsElsArr = Array.from(addonInputsEls);
const selectedAddonInputEls = [];

addonInputsEls[0].monthlyCost = "+$1/mo";
addonInputsEls[0].yearlyCost = "+$10/yr";

addonInputsEls[1].monthlyCost = "+$2/mo";
addonInputsEls[1].yearlyCost = "+$20/yr";

addonInputsEls[2].monthlyCost = "+$2/mo";
addonInputsEls[2].yearlyCost = "+$20/yr";

addonInputsEls[0].monthlyCostNum = 1;
addonInputsEls[0].yearlyCostNum = 10;

addonInputsEls[1].monthlyCostNum = 2;
addonInputsEls[1].yearlyCostNum = 20;

addonInputsEls[2].monthlyCostNum = 2;
addonInputsEls[2].yearlyCostNum = 20;

const selectedAddons = [];
let curPageIndex = 0;
let paymentPlanCost;
let totalAddonCost;
let addonCosts = [];
let total;

function setProperty(element, propertyName, propertyValue) {
  element.style[propertyName] = propertyValue;
}

const nextBtnElsExceptFirst = Array.from(nextBtnEls).slice(1);

window.addEventListener("load", function () {
  inputFieldEls.forEach((input) => {
    input.value = "";
  });
});

nextBtnElsExceptFirst.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();

    setProperty(pageContainers[curPageIndex], "display", "none");

    stepEls[curPageIndex].classList.remove("active");
    curPageIndex++;
    stepEls[curPageIndex].classList.add("active");

    if (curPageIndex < pageContainers.length) {
      setProperty(pageContainers[curPageIndex], "display", "flex");
    }

    if (i === 0) {
      const activePaymentPlan = document.querySelector(".active-payment-plan");
      const activePlanTypeContainer = document.querySelector(".active-plan .plan-type");

      if (activePaymentPlan === "Monthly") {
        addonCosts.splice(0, addonCosts.length);
      } else {
        addonCosts.splice(0, addonCosts.length);
      }

      const addonCostLastDigit = document.querySelectorAll(".addon-cost-last-digit");
      const paymentPlanCostEl = document.querySelector(".active-plan .plan-cost");

      paymentPlanCost = +paymentPlanCostEl.innerText.match(/\d+/)[0];

      addonPaymentPlanEls.forEach((el) => {
        if (activePaymentPlan.textContent === "Monthly") {
          summarySelectedPlanTypeEl.innerHTML = activePlanTypeContainer.textContent + " (Monthly)";
          el.innerHTML = "mo";
        } else {
          el.innerHTML = "yr";
          summarySelectedPlanTypeEl.innerHTML = activePlanTypeContainer.textContent + " (Yearly)";
        }
      });

      addonCostLastDigit.forEach((el) => {
        if (activePaymentPlan.textContent === "Monthly") {
          el.innerText = "";
        } else {
          el.innerText = "0";
        }
      });

      summaryTotalCostEls.forEach((el) => {
        el.innerHTML = activePaymentPlan.textContent;

        if (activePaymentPlan.textContent === "Monthly") {
          el.innerHTML = "mo";
          summaryPlanTypeEl.innerHTML = "month";
        } else {
          el.innerHTML = "yr";
          summaryPlanTypeEl.innerHTML = "year";
        }
      });
    } else {
      addonCosts.length = 0;

      selectedAddonInputEls.forEach((_, i) => {
        if (summaryPlanTypeEl.textContent === "month") {
          summaryAddonCostEls[i].innerHTML = selectedAddonInputEls[i].monthlyCost;
          addonCosts.push(selectedAddonInputEls[i].monthlyCostNum);
        } else {
          summaryAddonCostEls[i].innerHTML = selectedAddonInputEls[i].yearlyCost;
          addonCosts.push(selectedAddonInputEls[i].yearlyCostNum);
        }
      });

      summaryAddonTypeEls.forEach((_, i) => {
        if (!summaryAddonTypeEls[i].textContent) {
          summaryAddonCostEls[i].innerHTML = "";
        }
      });

      totalAddonCost = addonCosts.reduce((acc, curVal) => acc + curVal, 0);

      if (!totalAddonCost) {
        total = paymentPlanCost;
      } else {
        total = paymentPlanCost + totalAddonCost;
      }

      summaryPaymentPlanCostNumEl.innerHTML = paymentPlanCost;
      summaryTotalCostEl.innerHTML = total;
    }
  });
});

inputFieldEls.forEach((input) => {
  if (input.value.trim() === "") {
    setProperty(stepContainerUl, "pointer-events", "none");
  }
});

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  let shouldContinue = true;

  inputFieldEls.forEach((input, index) => {
    if (input.value.trim() === "") {
      inputFieldErrorEls[index].innerHTML = "This field is required";
      shouldContinue = false;
      setProperty(stepContainerUl, "pointer-events", "none");
    } else {
      inputFieldErrorEls[index].innerHTML = "";
      setProperty(stepContainerUl, "pointer-events", "auto");
    }
  });

  if (!shouldContinue) {
    return;
  }

  setProperty(pageContainers[curPageIndex], "display", "none");

  stepEls[curPageIndex].classList.remove("active");
  curPageIndex++;
  stepEls[curPageIndex].classList.add("active");

  if (curPageIndex < pageContainers.length) {
    setProperty(pageContainers[curPageIndex], "display", "flex");
  }
});

prevBtnEls.forEach((btn) => {
  btn.addEventListener("click", function () {
    setProperty(pageContainers[curPageIndex], "display", "none");

    stepEls[curPageIndex].classList.remove("active");
    curPageIndex--;
    stepEls[curPageIndex].classList.add("active");

    if (curPageIndex < pageContainers.length) {
      setProperty(pageContainers[curPageIndex], "display", "flex");
    }
  });
});

changePlanTypeEl.addEventListener("click", function () {
  setProperty(pageContainers[curPageIndex], "display", "none");

  stepEls[curPageIndex].classList.remove("active");
  curPageIndex = 1;
  stepEls[curPageIndex].classList.add("active");

  setProperty(pageContainers[curPageIndex], "display", "flex");
});

planTypeContainer.addEventListener("click", function (e) {
  const initialActivePlanContainer = planTypeContainer.querySelector(".active-plan");
  const nextActivePlanContainer = e.target.closest(".plan");

  if (!nextActivePlanContainer) return;

  initialActivePlanContainer.classList.remove("active-plan");
  nextActivePlanContainer.classList.add("active-plan");
});

sliderInputEl.addEventListener("click", function () {
  const activePlanType = paymentPlanContainer.querySelector(".active-payment-plan");
  const nonActivePlanType = paymentPlanContainer.querySelector("p:not(.active-payment-plan)");

  const benefitMessageEl = planTypeContainer.querySelectorAll(".text-content p:last-child");

  const planTypePaymentPlan = planTypeContainer.querySelectorAll(".plan-type-payment-plan");
  const planCostLastDigit = planTypeContainer.querySelectorAll(".plan-cost-last-digit");

  if (sliderInputEl.checked) {
    setProperty(sliderToggleEl, "transform", "translateX(15px)");
    benefitMessageEl.forEach((message) => setProperty(message, "display", "block"));
    planTypePaymentPlan.forEach((el) => (el.innerHTML = "yr"));
    planCostLastDigit.forEach((el) => (el.innerText = "0"));
  } else {
    setProperty(sliderToggleEl, "transform", "translateX(0)");
    benefitMessageEl.forEach((message) => setProperty(message, "display", "none"));
    planTypePaymentPlan.forEach((el) => (el.innerHTML = "mo"));
    planCostLastDigit.forEach((el) => (el.innerText = ""));
  }

  activePlanType.classList.remove("active-payment-plan");
  nonActivePlanType.classList.add("active-payment-plan");
});

addonsContainer.addEventListener("click", function (e) {
  const clickedCheckbox = e.target.closest("input[type='checkbox']");

  if (!clickedCheckbox) return;

  clickedCheckbox.checked = !clickedCheckbox.checked;
});

addonsContainer.addEventListener("click", function (e) {
  const clickedAddonContainer = e.target.closest(".addon");

  if (!clickedAddonContainer) return;

  const selectedAddonEl = clickedAddonContainer.querySelector(".addon-type");
  const selectedAddonString = selectedAddonEl.textContent;
  const selectedAddonStringIndex = selectedAddons.indexOf(selectedAddonString);
  const clickedAddonContainerInputEl = clickedAddonContainer.querySelector("input");
  const selectedAddonInputIndex = selectedAddonInputEls.indexOf(clickedAddonContainerInputEl);

  if (!clickedAddonContainerInputEl) return;

  if (clickedAddonContainerInputEl.checked === true) {
    clickedAddonContainerInputEl.checked = false;
    if (selectedAddonStringIndex > -1) {
      selectedAddons.splice(selectedAddonStringIndex, 1);

      if (selectedAddonInputIndex > -1) {
        selectedAddonInputEls.splice(selectedAddonInputIndex, 1);
      }
    }
  } else {
    clickedAddonContainerInputEl.checked = true;
    selectedAddonInputEls.push(clickedAddonContainerInputEl);
    selectedAddons.push(selectedAddonString);
  }

  summaryAddonTypeEls.forEach((el, i) => {
    if (selectedAddons[i]) {
      el.innerHTML = selectedAddons[i];
    } else {
      el.innerHTML = "";
    }
  });
});

stepContainerUl.addEventListener("click", function (e) {
  const clickedStep = e.target.closest(".step");

  if (!clickedStep || !clickedStep.textContent) return;

  const clickedStepIndex = parseInt(clickedStep.textContent) - 1;
  const activeStep = stepContainerUl.querySelector(".active");

  if (clickedStepIndex !== curPageIndex) {
    activeStep.classList.remove("active");
    clickedStep.classList.add("active");

    setProperty(pageContainers[curPageIndex], "display", "none");

    curPageIndex = clickedStepIndex;
    setProperty(pageContainers[curPageIndex], "display", "flex");
  }
});

confirmBtnEl.addEventListener("click", function () {
  setProperty(pageContainers[curPageIndex], "display", "none");
  setProperty(pageContainers[curPageIndex + 1], "display", "flex");

  setProperty(stepContainerUl, "pointer-events", "none");
});
