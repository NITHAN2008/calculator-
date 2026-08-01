//get the display and preview input elements
const display = document.getElementById("display");
let isOn =true;
//Turn ON
function turnOn(){
    isOn = true;
    display.value = "0";
}
//Turn OFF
function turnOff(){
    isOn = false;
    display.value = "";
}
//adds the button value to the display
function press(value) {
    //Replace the initial 0 with the first number
   if (!isOn) return;
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
// Calculates the final answer when the "=" buttion is oressed
function calculate() {
    try {
        display.value = solve(display.value);
    } catch {
        display.value = "Error";
    }
}
// Performs the arithmetic operation
function calculateExpression(expression) {
// store the operator enterd by the user
    let operator = "";
// Check which operator is in the expression 
    if (expression.includes("+")) operator = "+";
    else if (expression.includes("-")) operator = "-";
    else if (expression.includes("*")) operator = "*";
    else if (expression.includes("÷")) operator = "÷";
    else return expression; //reture the number if no operator exists
//Split the expression into two numbers
    let parts = expression.split(operator);
// Convert the expression values into numbers
    let num1 = parseFloat(parts[0]);
    let num2 = parseFloat(parts[1]);
// Perform the correct arithmatic operation
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "÷":
            // Prevent division by zero
            return num2 !== 0 ? num1 / num2 : "";
        
    }
}
function cleardisplay(){
    display.value ="0";
    if (result) result.value="";
}
function deleteLast(){
    if (display.value.length > 0) {
        display.value = display.value.slice(0, -1);
        preview(); //Update the preview
    }                                                          
}
if(typeofpreview === "function"){
    preview();
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
