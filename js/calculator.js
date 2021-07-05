const backSpaceButton = document.querySelector('#backspace-btn');

const outputText = document.querySelector('#output-text');

const clearButton = document.querySelector('#clear-btn');

const percentButton = document.querySelector('#percent-btn');

const divideButton = document.querySelector('#divide-btn');
const multiplyButton = document.querySelector('#multiply-btn');
const substractButton = document.querySelector('#substract-btn');
const addButton = document.querySelector('#add-btn');

const plusminusButton = document.querySelector('#plusminus-btn');

const dotButton = document.querySelector('#dot-btn');

const resultButton = document.querySelector('#result-btn');

const numberButtons = document.querySelectorAll('.number-btn');

const FIRST_NUMBER_INDEX = 0;
const MATH_OPERATOR_INDEX = 1;
const SECOND_NUMBER_INDEX = 2;

let inputArray = ['', '', ''];
let result = 0;

let currentIndex = FIRST_NUMBER_INDEX;

const clearOutput = () => outputText.innerHTML = '';

const clearData = () => {
    inputArray = ['', '', ''];
    currentIndex = FIRST_NUMBER_INDEX;
    result = 0;
}

const displayInput = (input) => {
    clearOutput();
    input.forEach(item => {
        outputText.innerHTML += item;
    });
}

const displayResult = (resultNumber) => outputText.innerHTML = resultNumber;

const hasNumbers = (str) => {
    const regex = /\d/g;
    return regex.test(str);
}

const reinputResult = (firstNum) => {
    inputArray[FIRST_NUMBER_INDEX] = firstNum;
}

const callMathOperator = (operator) => {
    if (!hasNumbers(inputArray[currentIndex]))
        return false;

    if (inputArray[FIRST_NUMBER_INDEX] != '' && inputArray[SECOND_NUMBER_INDEX] != '' && inputArray[MATH_OPERATOR_INDEX] != '')
        countResult(inputArray);

    if (result !== 0) {
        reinputResult(result.toString());
        inputArray[SECOND_NUMBER_INDEX] = '';
    }

    currentIndex = MATH_OPERATOR_INDEX;
    inputArray[currentIndex] = operator;
    currentIndex = SECOND_NUMBER_INDEX;
    displayInput(inputArray);
};

const countResult = (input) => {
    let firstNum = parseFloat(input[FIRST_NUMBER_INDEX]);
    let secondNum = parseFloat(input[SECOND_NUMBER_INDEX]);

    switch (input[MATH_OPERATOR_INDEX]) {
        case '*':
            result = firstNum * secondNum;
            break;
        case '/':
            result = firstNum / secondNum;
            break;
        case '+':
            result = firstNum + secondNum;
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case '%':
            result = firstNum % secondNum;
            break;
    }
    inputArray = ['', '', ''];
    currentIndex = FIRST_NUMBER_INDEX;
    displayResult(result);
    return result;
}

window.addEventListener('DOMContentLoaded', () => {
    displayResult(result);
});

const numberButtonArray = [...numberButtons];

numberButtonArray.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        if (result != 0)
            result = 0;

        const number = numberBtn.dataset.number;
        if (number == '0' && inputArray[currentIndex].length === 0)
            return false;
        inputArray[currentIndex] += number;
        displayInput(inputArray);
    });
});

backSpaceButton.addEventListener('click', () => {
    if (inputArray[currentIndex].length > 0) {
        inputArray[currentIndex] = inputArray[currentIndex].slice(0, -1);
        displayInput(inputArray);
    }
});

clearButton.addEventListener('click', () => {
    clearData();
    clearOutput();
    displayResult(result);
});

dotButton.addEventListener('click', () => {
    if (inputArray[currentIndex].includes('.'))
        return false;

    if (inputArray[currentIndex] == '')
        inputArray[currentIndex] += '0';

    inputArray[currentIndex] += '.';
    displayInput(inputArray);
});

plusminusButton.addEventListener('click', () => {
    if (inputArray[currentIndex][0] === '-')
        inputArray[currentIndex] = inputArray[currentIndex].substring(1);
    else
        inputArray[currentIndex] = '-' + inputArray[currentIndex];
    displayInput(inputArray);
});

// const percentButton 

// const divideButton 
// const multiplyButton 
// const substractButton
// const addButton

// const resultButton

percentButton.addEventListener('click', () => callMathOperator('%'));

divideButton.addEventListener('click', () => callMathOperator('/'));
multiplyButton.addEventListener('click', () => callMathOperator('*'));
substractButton.addEventListener('click', () => callMathOperator('-'));
addButton.addEventListener('click', () => callMathOperator('+'));

resultButton.addEventListener('click', () => countResult(inputArray));