const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
   //Replace current display value if first value is entered
   if (awaitingNextValue) {
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
   } else {
      // If the current display is 0, replace it, if not add number
      const displayValue = calculatorDisplay.textContent;
      calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
   }
}

function addDecimal() {
   // If operator pressed, do not add decimal
   if (awaitingNextValue) return;
   // If no decimal, add one
   if (!calculatorDisplay.textContent.includes('.')) {
      calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
   }
}

// Calculate first and second values depending on operator
const calculate = {
   '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
   '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
   '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
   '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
   '=': (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
   const currentValue = Number(calculatorDisplay.textContent);
   // Prevent multiple operators
   if (operatorValue && awaitingNextValue) {
      operatorValue = operator;
      return;
   }
   // Assign firstValue if no value
   if (!firstValue) {
      firstValue = currentValue;
   } else {
      const calculation = calculate[operatorValue](firstValue, currentValue);
      calculatorDisplay.textContent = calculation;
      firstValue = calculation;
   }
   //Ready for next value, store operator
   awaitingNextValue = true;
   operatorValue = operator;
}

// Add event listeners for numbers, operators, decimal buttons
inputButtons.forEach((inputButton) => {
   if (inputButton.classList.length === 0) {
      inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
   } else if (inputButton.classList.contains('operator')) {
      inputButton.addEventListener('click', () => useOperator(inputButton.value));
   }else if (inputButton.classList.contains('decimal')) {
      inputButton.addEventListener('click', () => addDecimal());
   }
});

// Reset all values, display
function resetAll() {
   firstValue = 0;
   operatorValue = '';
   awaitingNextValue = false;
   calculatorDisplay.textContent = '0';
}

// Event listener
clearButton.addEventListener('click', resetAll);