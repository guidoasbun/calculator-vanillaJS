const calculatorDisplay = document.querySelector('h1');
const inputButtons = document.querySelectorAll('button');
const clearButton = document.getElementById('clear-btn');

function sendNumberValue(number) {
   // If the current display is 0, replace it, if not add number
   const displayValue = calculatorDisplay.textContent;
   calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
}

function addDecimal() {
   // If no decimal, add one
   if (!calculatorDisplay.textContent.includes('.')) {
      calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
   }
}

// Add event listeners for numbers, operators, decimal buttons
inputButtons.forEach((inputButton) => {
   if (inputButton.classList.length === 0) {
      inputButton.addEventListener('click', () => sendNumberValue(inputButton.value));
   } else if (inputButton.classList.contains('operator')) {
      inputButton.addEventListener('click', () => sendNumberValue(inputButton.value))
   }else if (inputButton.classList.contains('decimal')) {
      inputButton.addEventListener('click', () => addDecimal())
   }
});

// Reset display
function resetAll() {
   calculatorDisplay.textContent = '0';
}

// Event listener
clearButton.addEventListener('click', resetAll);