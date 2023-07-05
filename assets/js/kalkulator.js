const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

function updateDispay() {
  document.querySelector("#displayNumber").textContent =
    calculator.displayNumber;
}

function clearCalculator() {
  calculator.displayNumber = "0";
  calculator.operator = null;
  calculator.firstNumber = null;
  calculator.waitingForSecondNumber = false;
}

function inputDigit(digit) {
  if (calculator.displayNumber === "0") {
    calculator.displayNumber = digit;
  } else {
    calculator.displayNumber += digit;
  }
}

const buttons = document.querySelectorAll(".button");

for (const button of buttons) {
  button.addEventListener("click", (e) => {
    const target = e.target;

    if (target.classList.contains("clear")) {
      clearCalculator();
      updateDispay();
      return;
    }

    if (target.classList.contains("negative")) {
      inversNumber();
      updateDispay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDispay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.textContent);
      return;
    }

    inputDigit(target.textContent);
    updateDispay();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key == "1") {
    inputDigit(1);
    updateDispay();
  }
});

function inversNumber() {
  if (calculator.displayNumber === "0") {
    return;
  }
  calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator(operator) {
  if (!calculator.waitingForSecondNumber) {
    calculator.operator = operator;
    calculator.waitingForSecondNumber = true;
    calculator.firstNumber = calculator.displayNumber;

    calculator.displayNumber = "0";
  } else {
    Swal.fire({
      title: "error",
      text: `Anda sudah menetapkan operator "${operator}"`,
      icon: "error",
      confirmButtonText: "Oke",
    });
  }
}

function performCalculation() {
  if (calculator.firstNumber == null || calculator.operator == null) {
    Swal.fire({
      title: "error",
      text: "Anda belum menetapkan operator",
      icon: "error",
      confirmButtonText: "Oke",
    });
    return;
  }

  let result = 0;
  if (calculator.operator === "+") {
    result =
      parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
  } else if (calculator.operator === "-") {
    result =
      parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
  } else if (calculator.operator === "*") {
    result =
      parseInt(calculator.firstNumber) * parseInt(calculator.displayNumber);
  } else if (calculator.operator === "/") {
    result =
      parseInt(calculator.firstNumber) / parseInt(calculator.displayNumber);
  } else if (calculator.operator === "%") {
    result =
      parseInt(calculator.firstNumber) % parseInt(calculator.displayNumber);
  }

  const {firstNumber, displayNumber: secondNumber, operator} = calculator;

  const history = {
    firstNumber,
    secondNumber,
    operator,
    result,
  };

  putHistory(history);
  calculator.displayNumber = result;
  renderHistory();
}
