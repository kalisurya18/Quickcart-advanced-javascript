// Part D: Asynchronous JavaScript and Promises

// Task 1: Event loop
console.log("TASK 1: EVENT LOOP");
console.log("Order Started");
setTimeout(() => console.log("Payment Processing"), 0);
Promise.resolve().then(() => console.log("Payment Successful"));
console.log("Order Completed");
// Expected order: Order Started, Order Completed, Payment Successful, Payment Processing.

// Task 2: Callback functions
function validateOrder(callback) {
    setTimeout(() => {
        console.log("Order Validated");
        callback();
    }, 1000);
}

function processPayment(callback) {
    setTimeout(() => {
        console.log("Payment Completed");
        callback();
    }, 1000);
}

function sendConfirmation(callback) {
    setTimeout(() => {
        console.log("Confirmation Sent");
        callback();
    }, 1000);
}

// Task 3: Promise versions of the same steps
function validateOrderPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Order Validated (Promise)");
            resolve("Validation successful");
        }, 1000);
    });
}

function processPaymentPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Payment Completed (Promise)");
            resolve("Payment successful");
        }, 1000);
    });
}

function sendConfirmationPromise() {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("Confirmation Sent (Promise)");
            resolve("Confirmation successful");
        }, 1000);
    });
}

// Task 4: Async/await with try/catch
async function placeOrder() {
    try {
        await validateOrderPromise();
        await processPaymentPromise();
        await sendConfirmationPromise();
        console.log("Order placed successfully using async/await");
    } catch (error) {
        console.log("Order failed:", error);
    }
}

// Task 5: Mock API functions for Promise combinators
function productsAPI() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Products Loaded"), 1000);
    });
}

function paymentAPI() {
    return new Promise((resolve, reject) => {
        setTimeout(() => reject("Payment Service Failed"), 1500);
    });
}

function deliveryAPI() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Delivery Loaded"), 2000);
    });
}

async function runPromiseCombinators() {
    // Create fresh API promises for each combinator test.
    try {
        const allResults = await Promise.all([productsAPI(), paymentAPI(), deliveryAPI()]);
        console.log("Promise.all:", allResults);
    } catch (error) {
        console.log("Promise.all rejected:", error);
    }

    const settledResults = await Promise.allSettled([productsAPI(), paymentAPI(), deliveryAPI()]);
    console.log("Promise.allSettled:", settledResults);

    try {
        const raceResult = await Promise.race([productsAPI(), paymentAPI(), deliveryAPI()]);
        console.log("Promise.race:", raceResult);
    } catch (error) {
        console.log("Promise.race rejected:", error);
    }

    try {
        const anyResult = await Promise.any([productsAPI(), paymentAPI(), deliveryAPI()]);
        console.log("Promise.any:", anyResult);
    } catch (error) {
        console.log("Promise.any rejected:", error);
    }
}

// Run each demonstration in order so the console output is easier to follow.
async function runAllTasks() {
    console.log("\nTASK 2: CALLBACKS");
    await new Promise(resolve => {
        validateOrder(() => {
            processPayment(() => {
                sendConfirmation(() => {
                    console.log("Callback order flow completed");
                    resolve();
                });
            });
        });
    });

    console.log("\nTASK 3: PROMISE CHAIN");
    await validateOrderPromise()
        .then(() => processPaymentPromise())
        .then(() => sendConfirmationPromise())
        .then(() => console.log("Promise order flow completed"))
        .catch(error => console.log("Promise error:", error));

    console.log("\nTASK 4: ASYNC/AWAIT");
    await placeOrder();

    console.log("\nTASK 5: PROMISE COMBINATORS");
    await runPromiseCombinators();
}

runAllTasks();
