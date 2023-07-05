const calculator = {
  displayNumber: "0",
  operator: null,
  firstNumber: null,
  waitingForSecondNumber: false,
};

function updateDisplay() {
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
      updateDisplay();
      return;
    }

    if (target.classList.contains("negative")) {
      inversNumber();
      updateDisplay();
      return;
    }

    if (target.classList.contains("equals")) {
      performCalculation();
      updateDisplay();
      return;
    }

    if (target.classList.contains("operator")) {
      handleOperator(target.textContent);
      return;
    }

    inputDigit(target.textContent);
    updateDisplay();
  });
}

window.addEventListener("keydown", (e) => {
  if (e.key == "1") {
    inputDigit(1);
    updateDisplay();
  } else if (e.key == "2") {
    inputDigit(2);
    updateDisplay();
  } else if (e.key == "3") {
    inputDigit(3);
    updateDisplay();
  } else if (e.key == "4") {
    inputDigit(4);
    updateDisplay();
  } else if (e.key == "5") {
    inputDigit(5);
    updateDisplay();
  } else if (e.key == "6") {
    inputDigit(6);
    updateDisplay();
  } else if (e.key == "7") {
    inputDigit(7);
    updateDisplay();
  } else if (e.key == "8") {
    inputDigit(8);
    updateDisplay();
  } else if (e.key == "9") {
    inputDigit(9);
    updateDisplay();
  } else if (e.key == "0") {
    inputDigit(0);
    updateDisplay();
  } else if (e.key == "Enter") {
    performCalculation();
    updateDisplay();
    return;
  } else if (e.key == "-") {
    handleOperator(e.key);
    return;
  } else if (e.key == "+") {
    handleOperator(e.key);
    return;
  } else if (e.key == "*") {
    handleOperator(e.key);
    return;
  } else if (e.key == "/") {
    handleOperator(e.key);
    return;
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
