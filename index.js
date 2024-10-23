const display = document.getElementById("display");
const errorMessage = document.getElementById("error-message"); // Get the error message element

function appendNumber(number) {
    clearError(); // Clear any previous error when typing a new number
    display.value += number;
}

function appendOperator(operator) {
    // Prevent operators from being the first character, except '-'
    if (display.value === "" && operator !== '-') {
        showError("⚠️ Invalid operation. Only '-' can be the first character.");
        return;
    }
    
    // Prevent multiple consecutive operators
    const lastChar = display.value.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        showError("Invalid operation. Two consecutive operators are not allowed.");
        return;
    }

    // Count the number of operators already present
    const operatorCount = (display.value.match(/[+\-*/]/g) || []).length;
    if (operatorCount >= 5) {
        showError("Only 5 operations allowed in one calculation.");
        return;
    }
    
    display.value += ` ${operator} `;
    clearError(); // Clear any previous error when operator is added
}

function appendDot() {
    // Get the last number from the display (after last space)
    const lastNumber = display.value.split(/[\s+/*-]+/).pop();

    // Allow dot only if the last number doesn't already have one
    if (!lastNumber.includes(".")) {
        display.value += ".";
    }
}

function clearDisplay() {
    display.value = "";
    clearError(); // Clear any error when resetting
}

function deleteLast() {
    display.value = display.value.trim().slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value.replace(/x/g, '*').replace(/÷/g, '/');
        let result = eval(expression);

        // Restrict to 3 decimal places if result is decimal
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(3));
        }

        display.value = result;
        clearError(); // Clear any error after successful calculation
    } catch (error) {
        showError("Invalid Expression");
    }
}

// // Addition function
// function add(a, b) {
//     return a + b;
// }

// // Subtraction function
// function subtract(a, b) {
//     return a - b;
// }

// // Multiplication function
// function multiply(a, b) {
//     return a * b;
// }

// // Division function
// function divide(a, b) {
//     if (b === 0) {
//         showError("⚠️ Cannot divide by zero");
//         return "Error";
//     }
//     return a / b;
// }

// Function to display error messages
function showError(message) {
    errorMessage.textContent = message;
}

// Function to clear the error message
function clearError() {
    errorMessage.textContent = "";
}


function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block"; // Make the error message visible
}

function clearError() {
    errorMessage.textContent = "";
    errorMessage.style.display = "none"; // Hide the error message
}
