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

    let tokens = exp.match(/-?\d+(\.\d+)?|[+\-*/^]/g);

    if (!tokens) return "";

    tokens = tokens.map(token =>
        isNaN(token) ? token : parseFloat(token)
    );

    // Orders (^)

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] === "^") {

            let result = Math.pow(tokens[i - 1], tokens[i + 1]);

            tokens.splice(i - 1, 3, result);

            i--;
        }
    }

    // Multiplication & Division

    for (let i = 0; i < tokens.length; i++) {

        if (tokens[i] === "*") {

            let result = tokens[i - 1] * tokens[i + 1];

            tokens.splice(i - 1, 3, result);

            i--;

        } else if (tokens[i] === "/") {

            if (tokens[i + 1] === 0) {

                throw new Error("Cannot divide by zero");

            }

            let result = tokens[i - 1] / tokens[i + 1];

            tokens.splice(i - 1, 3, result);

            i--;
        }
    }

    // Addition & Subtraction

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
