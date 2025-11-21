let num1;
let num2;
let storedOperator;
let currentNumber = "";
const OPERATORS = ['+', '-', '/', '*', '='];


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
    return num1 / num2;
}

function operate(num1, operator, num2) {
    let result;
    switch (operator) {
        case ('+'):
            result = add(num1, num2);
            break;
        case ('-'):
            result = subtract(num1, num2);
            break;
        case ('*'):
            result = multiply(num1, num2);
            break;
        case ('/'):
            result = divide(num1, num2);
            break;
    }
    return result;
}

function updateNumber(digit) {
    currentNumber += digit;
}


function updateDisplay(content) {
    display.textContent = content;
}

function updateResult(number) {
    if (!num1) {
        num1 = parseInt(number);
    } else {
        num2 = parseInt(number);
    }
    currentNumber = "";
}

function storeResult(number) {
    num1 = number;
}

function calculateResult() {
    const result = operate(num1, storedOperator, num2)
    console.log(`result ${num1} ${storedOperator} ${num2} = ${result}`)
    storeResult(result);
    updateDisplay(result);
}

function clearAll() {
    currentNumber = "";
    num1 = undefined;
    num2 = undefined;
    operator = "";
    updateDisplay(currentNumber);
}

function processInput(e) {
    if (e.type === "keydown") {
        processKey(e.key);
    } else {
        processButton(this.value);
    }
}
//
function processButton(value) {
    console.log(`entering value ${value}`)
    if (!isNaN(value)) {
        processDigit(value);
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
            processButton(e.key);
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

const buttons = document.querySelectorAll("button");
buttons.forEach(button => button.addEventListener("click", processButton));

const display = document.querySelector(".display");
updateDisplay(currentNumber);

window.addEventListener("keydown", processKey);
