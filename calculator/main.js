let num1;
let num2;
let storedOperator;
let currentNumber = "";
let currentNumberFloat = false;
const OPERATORS = ['+', '-', '/', '*', '='];
const DISPLAY_SIZE = 10;
const DECIMAL_SIGN = ".";


function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    if (num2 === 0) {
        throw new Error("You no can divide by 0!");
    }
    return num1 / num2;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case ('+'):
            return add(num1, num2);
        case ('-'):
            return subtract(num1, num2);
        case ('*'):
            return multiply(num1, num2);
        case ('/'):
            return divide(num1, num2);
    }
}

function updateNumber(digit) {
    if (currentNumberFloat) {
        if (!currentNumber.includes(DECIMAL_SIGN)) {
            currentNumber += DECIMAL_SIGN;
        }
    }
    currentNumber += digit;
}

function updateDisplay(content) {
    display.textContent = content;
}

function updateResult(number) {
    if (!num1) {
        num1 = parseFloat(number);
    } else {
        num2 = parseFloat(number);
    }
    clearCurrentNumber();
}

function storeResult(number) {
    num1 = number;
}

function isFloat(number) {
    return number % 1 !== 0;
}


function roundResult(number) {
    if (!isFloat(number)) return number;

    const [main, decimals] = String(number).split('.');
    if (!decimals) {
        return number;
    }
    const max_decimals = DISPLAY_SIZE - 1 - main.length;
    console.log(decimals, max_decimals)
    if (decimals.length > max_decimals) {
        return number.toFixed(max_decimals);
    }
    return number;

}

function calculateResult() {
    try {
        let result = operate(num1, storedOperator, num2)
        console.log(`result ${num1} ${storedOperator} ${num2} = ${result}`)
        result = roundResult(result);
        storeResult(result);
        updateDisplay(result);
    } catch (error) {
        alert(error);
    }
}

function clearAll() {
    clearCurrentNumber();
    num1 = undefined;
    num2 = undefined;
    operator = "";
    updateDisplay(currentNumber);
}

function clearCurrentNumber() {
    currentNumber = "";
    currentNumberFloat = false;
}

function processInput(e) {
    if (e.type === "keydown") {
        processKey(e.key);
    } else {
        processButton(this.dataset.input);
    }
}
//
function processButton(value) {
    console.log(`entering value ${value}`)
    if (!isNaN(value)) {
        processDigit(value);
    } else if (value === ".") {
        processFloat();
    } else if (value === "AC") {
        clearAll();
    } else if (OPERATORS.includes(value)) {
        processOperator(value);
    }
    console.log(`num1 ${num1} | num2 ${num2} | oper ${storedOperator} | currentNumber ${currentNumber}`);
}

function processOperator(operator) {
    // still a pending number to process as operand
    if (currentNumber) {
        updateResult(currentNumber);
        if (num2) {
            calculateResult();
        }
    } else if (operator === '=') {
        calculateResult();
    }

    // the operator has changed for the next operation. 
    if (operator !== '=') {
        storedOperator = operator;
    }
}

function processKey(e) {
    switch (e.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
        case "/":
        case "*":
        case "=":
        case ".":
            processButton(e.key);
            break;
        case "Enter":
            processButton("=");
            break;
        case "Delete":
            processButton("AC");
            break;
    }
}

function processDigit(digit) {
    updateNumber(digit);

    updateDisplay(currentNumber);
}

function processFloat() {
    currentNumberFloat = true;
}

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", processInput));

const display = document.querySelector(".display");
updateDisplay(currentNumber);

window.addEventListener("keydown", processKey);
