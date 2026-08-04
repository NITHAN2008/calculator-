// Get the display
const display = document.getElementById("display");
//adds the button value to the display
function press(value) {
    //Replace the initial 0 with the first number
    if(display.value === "0"){
        display.value = value;
    } else{
        display.value += value;
    }
    // show the answer while typing
    preview();
}
// Display the result without replacing the expression
function preview() {
    try {
        result.value = calculateExpression(display.value);
    } catch {
        // Clear the preview if the expression is incomplete or invalid
        result.value = "";
    }
}


// Calculate 
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
//BODMAS
function solve(expression) {
    expression = expression.replace(/\s+/g, "");

    // Solve brackets first
    while (expression.includes("(")) {
        expression = expression.replace(/\(([^()]+)\)/g, (_, inner) => {
            return calculateSimple(inner);
        });
    }

    return calculateSimple(expression);
}
function calculateSimple(exp) {

    // Split numbers and operators
    let tokens = exp.match(/(\d+(\.\d+)?)|[+\-*/]/g);

    if (!tokens) return "";

    // Convert numbers
    for (let i = 0; i < tokens.length; i++) {
        if (!isNaN(tokens[i])) {
            tokens[i] = parseFloat(tokens[i]);
        }
    }

    // Division and Multiplication first
    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] === "*") {
            let result = tokens[i - 1] * tokens[i + 1];

            tokens.splice(i - 1, 3, result);

            i--;
        }

        else if (tokens[i] === "/") {
            let result = tokens[i - 1] / tokens[i + 1];

            tokens.splice(i - 1, 3, result);

            i--;
        }
    }

    // Addition and Subtraction
    let answer = tokens[0];

    for (let i = 1; i < tokens.length; i += 2) {

        if (tokens[i] === "+") {
            answer += tokens[i + 1];
        }

        else if (tokens[i] === "-") {
            answer -= tokens[i + 1];
        }
    }

    return answer;
}

