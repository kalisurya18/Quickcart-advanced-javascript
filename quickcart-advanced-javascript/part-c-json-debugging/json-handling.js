// Part C: JSON Handling and Output-Based Debugging

// Task 1: JSON.stringify() and JSON.parse()
console.log("TASK 1: JSON STRINGIFY AND PARSE");

const order = {
    orderId: 501,
    customer: "Rahul",
    amount: 5000,
    deliveryDate: undefined,
    discount: null,
    calculateTax: function () {
        return 500;
    }
};

const orderJSON = JSON.stringify(order);
console.log("JSON string:", orderJSON);

const parsedOrder = JSON.parse(orderJSON);
console.log("Parsed order:", parsedOrder);

// deliveryDate is omitted because it is undefined in an object.
// calculateTax is omitted because JSON does not store functions.
// discount remains because null is a valid JSON value.

// Task 2: Predict the output / error
console.log("\nTASK 2: OUTPUT PREDICTION");

// Q1: undefined in an object is omitted.
console.log("Q1:", JSON.stringify({ name: "Rahul", age: undefined }));
// Output: {"name":"Rahul"}

// Q2: undefined in an array becomes null.
console.log("Q2:", JSON.stringify([10, undefined, 30]));
// Output: [10,null,30]

// Q3: NaN and Infinity become null in JSON.
console.log("Q3:", JSON.stringify({ price: NaN, discount: Infinity }));
// Output: {"price":null,"discount":null}

// Q4: Invalid JSON throws a SyntaxError.
// try/catch is used so the remaining examples can also run.
try {
    console.log("Q4:", JSON.parse("{name: 'Rahul', age: 25}"));
} catch (error) {
    console.log("Q4 Error:", error.name + ": invalid JSON format");
}

// Q5: Circular references cannot be converted with JSON.stringify().
const user = { name: "Rahul" };
user.self = user;

try {
    console.log("Q5:", JSON.stringify(user));
} catch (error) {
    console.log("Q5 Error:", error.name + ": circular structure");
}

// Q6: Date objects are converted to ISO date strings.
console.log("Q6:", JSON.stringify({ createdAt: new Date("2026-01-01") }));
// Output: {"createdAt":"2026-01-01T00:00:00.000Z"}
