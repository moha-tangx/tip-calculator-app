"use strict";
// @ts-check

const bill = document.querySelector("input.bill-input");
const people = document.querySelector(".people-input");
const custom_tip = document.querySelector(".custom-tip-input");
const input = document.querySelectorAll(".input")[1];
const tip_option = document.querySelectorAll(
  ".tip-percent input[type = button]"
);
let tip;

// clearing all the optional tip percentage selection
function clearSelection() {
  for (let i = 0; i < tip_option.length; i++) {
    const option = tip_option[i];
    option.classList.remove("selected");
  }
}

// if the optional tip is selected or changed
// the tip is calculated if bill and number of people are specified

tip_option.forEach((option) => {
  const tip_value = option.value;
  option.addEventListener("click", () => {
    //   clearing other selections before selecting new tip percentage
    clearSelection();
    tip = tip_value.replace("%", "");
    option.classList.add("selected");
    custom_tip.value && (custom_tip.value = "");
    if (bill.value !== "" && people.value !== "") {
      validate();
    }
  });
});

// if the custom tip is selected or changed
// the tip is calculated if bill and number of people are specified
custom_tip.addEventListener("input", (e) => {
  clearSelection();
  tip = e.target.value;
  if (bill.value !== "" && people.value !== "") {
    validate();
  }
});

// calculating the tip
function calculateTip() {
  const tip_out = document.querySelector(".tip-amount .value");
  const total_out = document.querySelector(".total-per-person .value");
  const tip_per_person = (+bill.value / +people.value / 100) * +tip || 0;
  const total_per_person = +bill.value / +people.value + tip_per_person;
  tip_out.textContent = `$ ${tip_per_person.toFixed(2)}`;
  total_out.textContent = `$ ${total_per_person.toFixed(2)}`;
}

// setting error message
function setErr(message, input) {
  const field = input.parentElement;
  field.classList.add("err");
  const err = input.parentElement.parentElement.querySelector(".err-msg");
  err.textContent = message;
  setTimeout(() => {
    field.classList.remove("err");
    err.textContent = "";
  }, 3000);
}

// input validation
function validate() {
  const word = /[a-zA-Z]/;
  if (bill.value == "") {
    setErr("input bill", bill);
  } else if (word.test(bill.value)) {
    setErr("numbers only", bill);
  } else if (word.test(people.value)) {
    setErr("numbers only", people);
  } else if (+people.value < 1) {
    setErr("can't be zero", people);
  } else {
    calculateTip();
  }
}

// calculate the tip when number of people is added.
// there is no calculate button so this serves as one
people.addEventListener("input", () => {
  validate();
});

// reset button
function reset() {
  clearSelection();
  const inputs = document.querySelectorAll("input[type=text]");
  inputs.forEach((input) => (input.value = ""));
  document.querySelector(".tip-amount .value").textContent = "$ 0.00";
  document.querySelector(".total-per-person .value").textContent = "$ 0.00";
}
document.getElementById("reset").addEventListener("click", () => {
  reset();
});

// registering serviceWorker if browser supports it
if ("serviceWorker" in navigator) {
  try {
    navigator.serviceWorker.register("./serviceWorker.js");
  } catch (error) {
    console.log(
      `something  went wrong service serviceWorker not registered ${error}`
    );
  }
}