// Part B: Higher-Order Functions, Map, Set and Object Methods

const cart = [
    { id: 101, name: "Laptop", price: 50000, qty: 1, category: "Electronics" },
    { id: 102, name: "Mouse", price: 800, qty: 2, category: "Accessories" },
    { id: 103, name: "Keyboard", price: 1500, qty: 1, category: "Accessories" },
    { id: 104, name: "Monitor", price: 12000, qty: 1, category: "Electronics" },
    { id: 105, name: "Headphones", price: 2500, qty: 2, category: "Accessories" }
];

// Task 1: Array methods
console.log("TASK 1: ARRAY METHODS");

// map(): creates a new array with each product name and its line total.
const productTotals = cart.map(product => ({
    name: product.name,
    totalPrice: product.price * product.qty
}));
console.log("Product names with total item price:", productTotals);

// filter(): returns products whose individual price is above ₹2,000.
const expensiveProducts = cart.filter(product => product.price > 2000);
console.log("Products above ₹2,000:", expensiveProducts);

// reduce(): calculates the complete cart value using price multiplied by quantity.
const totalCartValue = cart.reduce((total, product) => {
    return total + (product.price * product.qty);
}, 0);
console.log("Total cart value: ₹" + totalCartValue);

// forEach(): displays selected details; it does not create a new array.
console.log("Product details:");
cart.forEach(product => {
    console.log(`${product.name} | ${product.category} | Quantity: ${product.qty}`);
});

// Combined methods: filter and reduce to calculate total value of Electronics category.
const electronicsTotal = cart
    .filter(product => product.category === "Electronics")
    .reduce((total, product) => total + (product.price * product.qty), 0);
console.log("Electronics total: ₹" + electronicsTotal);

// Task 2A: Map inventory
console.log("\nTASK 2A: MAP INVENTORY");

const inventory = new Map();
cart.forEach(product => inventory.set(product.id, { ...product }));

// Get a product by its ID.
console.log("Product with ID 101:", inventory.get(101));

// Update quantity for product ID 102.
const mouse = inventory.get(102);
mouse.qty = 5;
inventory.set(102, mouse);
console.log("Updated mouse:", inventory.get(102));

// Delete product ID 103.
inventory.delete(103);
console.log("After deleting ID 103:");

inventory.forEach((details, id) => {
    console.log(id, details);
});

// Task 2B: Set removes duplicate email values.
console.log("\nTASK 2B: SET DUPLICATES");

const emailList = [
    "rahul@gmail.com",
    "priya@gmail.com",
    "rahul@gmail.com",
    "arjun@gmail.com",
    "priya@gmail.com"
];

const uniqueEmails = [...new Set(emailList)];
console.log("Unique emails:", uniqueEmails);

// Task 3: Object.freeze() and Object.seal()
console.log("\nTASK 3: FREEZE AND SEAL");

const productConfig = { name: "Laptop", price: 50000, stock: 20 };

// Separate copies so that the two demonstrations do not affect each other.
const frozenProduct = Object.freeze({ ...productConfig });
const sealedProduct = Object.seal({ ...productConfig });

// Freeze: changing, adding and deleting properties are blocked.
frozenProduct.price = 55000;
frozenProduct.color = "Silver";
delete frozenProduct.stock;
console.log("Frozen product after attempted changes:", frozenProduct);

// Seal: existing values can change, but adding/deleting properties is blocked.
sealedProduct.price = 55000;
sealedProduct.color = "Silver";
delete sealedProduct.stock;
console.log("Sealed product after attempted changes:", sealedProduct);

console.log("Is frozen:", Object.isFrozen(frozenProduct));
console.log("Is sealed:", Object.isSealed(sealedProduct));
