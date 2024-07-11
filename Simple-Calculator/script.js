"use strict";

const calculator = document.querySelector(".calc-body");
const keys = calculator.querySelector(".calc-keys");
const display = document.querySelector(".calc-screen");

const calculate = function (n1, op, n2) {
  let result = "";

  if (op === "add") {
    result = parseFloat(n1) + parseFloat(n2);
  } else if (op === "sub") {
    result = parseFloat(n1) - parseFloat(n2);
  } else if (op === "multi") {
    result = parseFloat(n1) * parseFloat(n2);
  } else if (op === "divi") {
    if (n2 === "0") return "NOPE!";
    result = parseFloat(n1) / parseFloat(n2);
  }

  return result;
};

keys.addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    //resetting the operator
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-depressed")
    );

    //Checking if the user's input is not an operator.
    if (!action) {
      if (
        displayedNum === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKey = "number";
    }

    //If the user hit the dicimal btn
    if (action === "decimal") {
      //Check if it already has a decimal point in it.
      if (!displayedNum.includes(".")) {
        display.textContent = displayedNum + ".";
      } else if (
        previousKeyType === "operator" ||
        previousKeyType === "calculate"
      ) {
        display.textContent = "0.";
      }
      calculate.dataset.previousKey = "decimal";
    }

    //If the user hit an operator btn
    if (
      action === "add" ||
      action === "sub" ||
      action === "multi" ||
      action === "divi"
    ) {
      const firstVal = calculator.dataset.firstVal;
      const operator = calculator.dataset.operator;
      const lastVal = displayedNum;

      if (
        firstVal &&
        lastVal &&
        previousKeyType !== "operator" &&
        previousKeyType === "calculate"
      ) {
        const calcVal = calculate(firstVal, operator, lastVal);
        display.textContent = calcVal;
        calculator.dataset.firstVal = calcVal;
      } else {
        calculator.dataset.firstVal = displayedNum;
      }

      key.classList.add("is-depressed");
      calculator.dataset.previousKeyType = "operator";
      calculator.dataset.firstVal = displayedNum;
      calculator.dataset.operator = action;
    }

    //If the user hit clear key
    if (action === "clear") {
      if (key.textContent === "AC") {
        calculator.dataset.firstVal = "";
        calculator.dataset.lastVal = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }
      display.textContent = 0;
      calculator.dataset.previousKey = "clear";
    }
    // If not the clear btn
    if (action !== "clear") {
      const clearBtn = calculator.querySelector("[data-action=clear]");
      clearBtn.textContent = "CE";
    }

    //If the user hit the equal btn
    if (action === "calculate") {
      const firstVal = calculator.dataset.firstVal;
      const operator = calculator.dataset.operator;
      const lastVal = displayedNum;

      if (firstVal) {
        if (previousKeyType === "calculate") {
          firstVal = displayedNum;
          lastVal = calculate.dataset.newVal;
        }
        display.textContent = calculate(firstVal, operator, lastVal);
      }
      calculator.dataset.newVal = lastVal;
      calculator.dataset.previousKey = "calculate";
    }
  }
});
