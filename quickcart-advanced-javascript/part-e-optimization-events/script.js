// Part E: Performance Optimization and DOM Events

// Task 1: Debouncing
function debounce(callback, delay) {
    let timerId;

    return function (...args) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");

function searchProducts(event) {
    const searchText = event.target.value.trim();

    if (searchText === "") {
        searchMessage.textContent = "Please enter a product name.";
    } else {
        searchMessage.textContent = `Searching for: ${searchText}`;
    }
}

searchInput.addEventListener("input", debounce(searchProducts, 500));

// Task 2: Throttling
function throttle(callback, delay) {
    let canRun = true;

    return function (...args) {
        if (!canRun) {
            return;
        }

        callback.apply(this, args);
        canRun = false;

        setTimeout(() => {
            canRun = true;
        }, delay);
    };
}

const scrollMessage = document.getElementById("scrollMessage");
let scrollCount = 0;

window.addEventListener("scroll", throttle(() => {
    scrollCount++;
    scrollMessage.textContent = `Scroll handler executions: ${scrollCount}`;
}, 1000));

// Task 3: Memoization using a closure
function calculateDiscount(price, percentage) {
    return price - (price * percentage / 100);
}

function memoizeDiscount(callback) {
    const cache = new Map();

    return function (price, percentage) {
        const key = `${price}-${percentage}`;

        if (cache.has(key)) {
            console.log("Result from cache:", key);
            return cache.get(key);
        }

        console.log("Fresh calculation:", key);
        const result = callback(price, percentage);
        cache.set(key, result);
        return result;
    };
}

const memoizedDiscount = memoizeDiscount(calculateDiscount);

console.log("Discount 1:", memoizedDiscount(1000, 10));
console.log("Discount 2:", memoizedDiscount(1000, 10));
console.log("Discount 3:", memoizedDiscount(2000, 20));

// Task 4: Event bubbling and stopPropagation()
const bubbleParent = document.getElementById("bubbleParent");
const bubbleButton = document.getElementById("bubbleButton");
const stopButton = document.getElementById("stopButton");
const bubbleMessage = document.getElementById("bubbleMessage");

bubbleParent.addEventListener("click", () => {
    bubbleMessage.textContent += " Parent handler executed.";
});

bubbleButton.addEventListener("click", () => {
    bubbleMessage.textContent = "Child button clicked.";
});

stopButton.addEventListener("click", event => {
    event.stopPropagation();
    bubbleMessage.textContent = "Propagation stopped at the child button.";
});

// Task 4 continued: Event delegation
const productList = document.getElementById("productList");
const removeMessage = document.getElementById("removeMessage");

productList.addEventListener("click", event => {
    // Check whether the clicked element is a Remove button.
    if (event.target.classList.contains("remove-button")) {
        const selectedProduct = event.target.closest(".product-item");
        const productName = selectedProduct.querySelector("span").textContent;

        selectedProduct.remove();
        removeMessage.textContent = `${productName} removed from the list.`;
    }
});
