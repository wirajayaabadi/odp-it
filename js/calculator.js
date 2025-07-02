const calculator = document.querySelector('.calculator');
const calculatorScreen = document.querySelector('.calculator-screen');
const buttons = document.querySelector('.calculator-buttons');

let currentInput = '0';
let previousInput = '';
let operator = null;
let waitingForSecondOperand = false;

function updateScreen() {
    calculatorScreen.value = currentInput;
}

function inputDigit(digit) {
    if (waitingForSecondOperand) {
        currentInput = digit;
        waitingForSecondOperand = false;
    } else {
        currentInput = currentInput === '0' ? digit : currentInput + digit;
    }
    updateScreen();
}

function inputDecimal(dot) {
    if (waitingForSecondOperand) {
        currentInput = '0.';
        waitingForSecondOperand = false;
        return;
    }

    if (!currentInput.includes(dot)) {
        currentInput += dot;
    }
    updateScreen();
}

function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (operator && waitingForSecondOperand) {
        operator = nextOperator;
        return;
    }

    if (previousInput === '') {
        previousInput = inputValue;
    } else if (operator) {
        const result = calculate(previousInput, inputValue, operator);
        currentInput = String(result);
        previousInput = result;
    }

    waitingForSecondOperand = true;
    operator = nextOperator;
    updateScreen();
}

function calculate(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '*':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}

function resetCalculator() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    waitingForSecondOperand = false;
    updateScreen();
}

// Event Listener untuk tombol
buttons.addEventListener('click', (event) => {
    const { target } = event;
    if (!target.matches('button')) {
        return;
    }

    if (target.classList.contains('operator')) {
        handleOperator(target.value);
        return;
    }

    if (target.classList.contains('decimal')) {
        inputDecimal(target.value);
        return;
    }

    if (target.classList.contains('clear')) {
        resetCalculator();
        return;
    }

    inputDigit(target.value);
});

// Inisialisasi tampilan awal
updateScreen();