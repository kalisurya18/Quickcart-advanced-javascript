// Part A: Objects, Prototypes and ES6 Classes

// Task 1: Constructor function and prototype method
function Product(productName, price, category) {
    this.productName = productName;
    this.price = price;
    this.category = category;
}

// Shared method:
Product.prototype.displayProduct = function () {
    return `${this.productName} - ₹${this.price} (${this.category})`;
};

const product1 = new Product("Laptop", 50000, "Electronics");
const product2 = new Product("Mouse", 800, "Accessories");
const product3 = new Product("Keyboard", 1500, "Accessories");

console.log("TASK 1: PROTOTYPE PRODUCTS");
console.log(product1.displayProduct());
console.log(product2.displayProduct());
console.log(product3.displayProduct());

// Task 2: ES6 classes and inheritance
class ProductDetails {
    constructor(productName, price, category) {
        this.productName = productName;
        this.price = price;
        this.category = category;
    }

    getProductDetails() {
        return `${this.productName} costs ₹${this.price}. Category: ${this.category}`;
    }
}

class ElectronicProduct extends ProductDetails {
    constructor(productName, price, category, warranty) {
        super(productName, price, category);
        this.warranty = warranty;
    }

    showWarranty() {
        return `Warranty: ${this.warranty}`;
    }
}

class ClothingProduct extends ProductDetails {
    constructor(productName, price, category, size) {
        super(productName, price, category);
        this.size = size;
    }

    showSize() {
        return `Size: ${this.size}`;
    }
}

const laptop = new ElectronicProduct("Laptop", 50000, "Electronics", "2 years");
const shirt = new ClothingProduct("T-Shirt", 799, "Clothing", "M");

console.log("\nTASK 2: ES6 CLASSES");
console.log(laptop.getProductDetails());
console.log(laptop.showWarranty());
console.log(shirt.getProductDetails());
console.log(shirt.showSize());

// Task 3A: Arrow function for discounted price
const calculateFinalPrice = (price, discount) => price - (price * discount / 100);
console.log("\nTASK 3: ES6 SYNTAX");
console.log("Final price:", calculateFinalPrice(50000, 10));

// Task 3B: Template literal
const customerName = "Rahul";
const orderProduct = "Laptop";
const orderTotal = 50000;
console.log(`Hello ${customerName}, your order of ${orderProduct} is confirmed. Total: ₹${orderTotal}.`);

// Task 3C: Destructuring
const customer = {
    name: "Rahul",
    email: "rahul@gmail.com",
    city: "Mumbai"
};
const { name, email } = customer;
console.log("Customer name:", name);
console.log("Customer email:", email);

// Task 3D: Rest operator
function calculateTotal(...prices) {
    return prices.reduce((total, price) => total + price, 0);
}
console.log("Total using rest:", calculateTotal(500, 800, 1200));

// Task 3E: Spread operator (original object is not changed)
const originalProduct = { name: "Laptop", price: 50000, category: "Electronics" };
const updatedProduct = { ...originalProduct, price: 45000 };
console.log("Original product:", originalProduct);
console.log("Copied product with new price:", updatedProduct);
