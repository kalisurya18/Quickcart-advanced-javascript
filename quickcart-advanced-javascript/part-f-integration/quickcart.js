// Part F: Final Integration Challenge

class Product {
    constructor(id, name, price, qty) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = qty;
    }

    getTotal() {
        return this.price * this.qty;
    }
}

// Product data from the assignment PDF.
const products = [
    new Product(1, "Laptop", 50000, 1),
    new Product(2, "Mouse", 1000, 2),
    new Product(3, "Monitor", 15000, 1),
    new Product(4, "Keyboard", 2000, 1)
];

const customer = {
    name: "Rahul",
    email: "rahul@gmail.com"
};

// Destructuring
const { name: customerName } = customer;

// map(): calculate each product's total.
const productTotals = products.map(product => ({
    id: product.id,
    name: product.name,
    total: product.getTotal()
}));

// filter(): find products with a total above ₹5,000.
const highValueProducts = productTotals.filter(product => product.total > 5000);

// reduce(): calculate the full order total.
const orderTotal = productTotals.reduce((total, product) => {
    return total + product.total;
}, 0);

// Set: store unique product IDs.
const uniqueProductIds = new Set(products.map(product => product.id));

// Map: store inventory using product ID as the key.
const inventory = new Map();
products.forEach(product => inventory.set(product.id, product));

// Object.freeze(): protect order configuration from changes.
const orderConfig = Object.freeze({
    currency: "INR",
    deliveryType: "Standard",
    customer: customerName
});

// JSON.stringify(): convert order details into JSON.
const order = {
    customer: customerName,
    products: productTotals,
    total: orderTotal,
    status: "Processing"
};
const orderJSON = JSON.stringify(order);

// Async/await order confirmation with try/catch.
function confirmOrder() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve("Confirmed Successfully!");
        }, 1000);
    });
}

async function showOrderSummary() {
    console.log("====== QUICKCART ORDER SUMMARY ======");
    console.log(`Customer: ${customerName}`);
    console.log("Products:");

    productTotals.forEach(product => {
        console.log(`${product.name} - ₹${product.total}`);
    });

    console.log(`Total Order Amount: ₹${orderTotal}`);
    console.log(`Unique Products: ${uniqueProductIds.size}`);
    console.log("Products above ₹5,000:", highValueProducts.map(product => product.name));
    console.log("Inventory entries:", inventory.size);
    console.log("Order configuration:", orderConfig);
    console.log("Order JSON:", orderJSON);
    console.log("Order Status: Processing...");

    try {
        const confirmation = await confirmOrder();
        console.log(`Order Status: ${confirmation}`);
    } catch (error) {
        console.log("Order failed:", error);
    }

    console.log("=====================================");
}

showOrderSummary();
