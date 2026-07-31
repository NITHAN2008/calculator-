// Get the display
const display = document.getElementById("display");

// Add numbers and operators
function press(value) {
    display.value += value;
}

// Calculate without using eval()
function calculate() {

    let expression = display.value;
    let operator;
    let numbers;
    let answer;

    // Check which operator is used
    if (expression.includes("+")) {
        operator = "+";
    } else if (expression.includes("-")) {
        operator = "-";


    } else if (expression.includes("%")) { //modulo function
        operator = "%";
    } else if (expression.includes("^")) { //exponent functoon
        operator = "^";        
    } else if (expression.includes("*")) {
        operator = "*";
    } else if (expression.includes("/")) {
        operator = "/";
    } else {
        return;
    }

    // Split the expression
    numbers = expression.split(operator);

    // Convert text to numbers
    let num1 = parseFloat(numbers[0]);
    let num2 = parseFloat(numbers[1]);

    // Perform the calculation
    if (operator === "+") {
        answer = num1 + num2;
    } else if (operator === "-") {
        answer = num1 - num2;
    } else if (operator === "%") { //modulo function
       // answer = num1 % num2;
    } else if (operator === "^") {   //exponent function 
        //answer =Math.pow(num1, num2);
    } else if (operator === "*") {
        answer = num1 * num2;
    } else if (operator === "/") {

        if (num2 === 0) {
            display.value = "Error";
            return;
        }

        answer = num1 / num2;
    }

    display.value = answer;
}

// Clear all
function clearDisplay() {
    display.value = "";
}

// Delete the last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

//square root and decimal
   document.getElementById("display").value += value;{
}

function calculate() {
    let expression = document.getElementById("display").value;

    // Handle square root
    expression = expression.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    try {
        document.getElementById("display").value = eval(expression);
    } catch (error) {
        document.getElementById("display").value = "Error";
    }
//function decimalToFraction(decimal) {
    if (decimal % 1 === 0) {
        return decimal + "/1";
    }

    let denominator = 1;

    while (decimal % 1 !== 0) {
        decimal *= 10;
        denominator *= 10;
    }

    let numerator = decimal;

    // Find the Greatest Common Divisor (GCD)
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    let divisor = gcd(numerator, denominator);

    numerator /= divisor;
    denominator /= divisor;

    return numerator + "/" + denominator;
}

