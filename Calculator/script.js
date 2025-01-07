const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
let currentInput = '';
let operator = '';
let previousValue = '';

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === undefined) {
      handleSpecialButton(button.id);
    } else {
      handleInput(value);
    }
  });
});

function handleInput(value) {
  if (['+', '-', '*', '/'].includes(value)) {
    operator = value;
    previousValue = currentInput;
    currentInput = '';
  } else {
    currentInput += value;
  }
  updateDisplay(currentInput || previousValue);
}

function handleSpecialButton(id) {
  if (id === 'clear') {
    currentInput = '';
    previousValue = '';
    operator = '';
    updateDisplay('0');
  } else if (id === 'equals') {
    if (previousValue && currentInput && operator) {
      currentInput = calculate(previousValue, currentInput, operator);
      previousValue = '';
      operator = '';
      updateDisplay(currentInput);
    }
  }
}

function calculate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  if (op === '+') return a + b;
  if (op === '-') return a - b;
  if (op === '*') return a * b;
  if (op === '/') return a / b;
}

function updateDisplay(value) {
  display.textContent = value;
}
