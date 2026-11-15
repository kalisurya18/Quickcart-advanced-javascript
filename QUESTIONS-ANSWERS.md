# QuickCart -- Assignment Questions and Answers

## Part A -- Objects, Prototypes and ES6 Classes

### Task 1 -- Prototype-based products

**1. Why add `displayProduct()` to the prototype instead of the
constructor?**

If I define the method inside the constructor, every product object gets
its own copy of that function. If I add it to `Product.prototype`, all
product objects can share the same method. This saves memory.

**2. What is the difference between `__proto__` and `prototype`?**

`prototype` is a property of a constructor function. It is the object
that instances can inherit methods and properties from.

`__proto__` refers to the prototype of a particular object. It helps
JavaScript look up inherited properties. In normal code,
`Object.getPrototypeOf()` is preferred for checking an object's
prototype.

**3. What happens when JavaScript cannot find a property on an object?**

JavaScript checks the object's prototype, then continues up the
prototype chain. If the property is not found anywhere in the chain, the
result is `undefined`.

### Task 2 -- ES6 classes

**1. What is the purpose of `extends`?**

`extends` is used to create a child class from a parent class. The child
class can use the parent's methods and can also have its own methods.

**2. Why must `super()` be called before using `this`?**

In a derived class constructor, `super()` calls the parent class
constructor and initializes the inherited part of the object. We must
call it before using `this`.

**3. Are ES6 classes completely different from prototype-based
inheritance?**

No. ES6 classes are a cleaner syntax for JavaScript's existing
prototype-based inheritance. They still use prototypes internally.

### Task 3 -- ES6 syntax in checkout

 It is clearl explained in the part-a object and classes main code.
------------------------------------------------------------------------

## Part B -- Higher-Order Functions, Map, Set and Object Methods

### Task 1 -- Array methods

**1. What is the difference between `map()` and `forEach()`?**

`map()` creates and returns a new array after applying a function to
each item. `forEach()` runs a function for each item but does not return
a new transformed array.

**2. Does `filter()` change the original array?**

No. `filter()` creates and returns a new array containing the items that
pass the condition. It does not directly change the original array.

**3. Why is `reduce()` useful for totals?**

`reduce()` processes all array items and combines them into one result.
For example, it can add each product's price multiplied by its quantity
to calculate the cart total.

**4. Which method returns a new transformed array?**

`map()` returns a new transformed array. `filter()` also returns a new
array, but it keeps only the items that match a condition.

### Task 2 -- Map and Set

**1. How is `Map` different from a plain object?**

A `Map` stores key-value pairs and allows keys of any data type,
including objects. A plain object normally uses string or symbol
property keys. A `Map` also has methods such as `set()`, `get()`,
`has()` and `delete()`, and it can be looped through directly.

**2. Why is `Set` good for removing duplicates?**

A `Set` stores only unique values. If the same email is added more than
once, it is stored only once.

**3. Can a `Map` use an object as a key?**

Yes. A `Map` can use an object as a key. The object is matched by
reference, not by comparing its contents.

**4. Does `Set` keep insertion order?**

Yes. A `Set` keeps values in the order in which they were first added.

### Task 3 -- `Object.freeze()` vs `Object.seal()`

**1. What is the difference between `freeze()` and `seal()`?**

`Object.freeze()` prevents adding, deleting or changing an object's own
properties.

`Object.seal()` prevents adding or deleting properties, but existing
writable properties can still be changed.

**2. Can a property be changed after `seal()`?**

Yes. An existing property can be changed if it is writable. New
properties cannot be added and existing properties cannot be deleted.

**3. Are nested objects frozen automatically?**

No. `Object.freeze()` is shallow. Nested objects are not automatically
frozen.

**4. What is shallow freezing?**

Shallow freezing means only the top-level object's own properties are
frozen. If one of those properties contains another object, that inner
object can still be changed unless it is frozen separately.

------------------------------------------------------------------------

## Part C -- JSON Handling and Output-Based Debugging

### Task 1 -- `JSON.stringify()` and `JSON.parse()`

**What happens to `deliveryDate` and `calculateTax` when the order
object is converted to JSON?**

When `JSON.stringify()` is used on an object: - A property with the
value `undefined` is omitted. - A function-valued property is also
omitted. - A property with the value `null` remains in the JSON string.

So `deliveryDate` and `calculateTax` are not included in the JSON
string. `discount: null` is included. After `JSON.parse()`, the omitted
properties are not present in the parsed object.

### Task 2 -- Predict the output

**Q1. `undefined` in an object**

``` javascript
JSON.stringify({ name: "Rahul", age: undefined });
```

Output:

``` text
{"name":"Rahul"}
```

The `age` property is omitted because its value is `undefined`.

**Q2. `undefined` in an array**

``` javascript
JSON.stringify([10, undefined, 30]);
```

Output:

``` text
[10,null,30]
```

In an array, an `undefined` element is converted to `null`.

**Q3. `NaN` and `Infinity`**

``` javascript
JSON.stringify({ price: NaN, discount: Infinity });
```

Output:

``` text
{"price":null,"discount":null}
```

`NaN` and `Infinity` are converted to `null` in JSON.

**Q4. Invalid JSON**

``` javascript
JSON.parse("{name: 'Rahul', age: 25}");
```

Result: `SyntaxError`.

JSON requires property names and string values to use double quotes. The
given string is not valid JSON.

**Q5. Circular reference**

``` javascript
const user = { name: "Rahul" };
user.self = user;
JSON.stringify(user);
```

Result: `TypeError`.

The object refers to itself, so JSON serialization cannot complete
because of the circular reference.

**Q6. Date object**

``` javascript
JSON.stringify({ createdAt: new Date("2026-01-01") });
```

Output:

``` text
{"createdAt":"2026-01-01T00:00:00.000Z"}
```

A Date object is converted to an ISO date-time string by its `toJSON()`
method.

------------------------------------------------------------------------

## Part D -- Asynchronous JavaScript


**1. Why does the Promise callback run before `setTimeout()`?**

The Promise `.then()` callback is placed in the microtask queue. The
`setTimeout()` callback is placed in the task queue (often called the
macrotask queue). JavaScript runs pending microtasks before moving to
the next timer task.

**2. What are the microtask and macrotask queues?**

The microtask queue contains tasks such as Promise callbacks. The
macrotask or task queue contains tasks such as timer callbacks from
`setTimeout()` and events. Microtasks are processed before the next
task.

**3. What role does the call stack play?**

The call stack keeps track of the functions currently running.
JavaScript executes synchronous code on this stack. Once the stack is
empty, the event loop can arrange for queued callbacks to run.

**4. What does the event loop do?**

The event loop checks whether the call stack is empty and coordinates
when queued asynchronous callbacks can run.

### Task 2 -- Callbacks

**Why are deeply nested callbacks (callback hell) hard to maintain?**

They create many levels of nesting. This makes the code difficult to
read, debug and maintain. Handling errors and changing the order of
steps can also become harder.

### Task 3 -- Promises

The assignment asks to rewrite the order steps as Promises and connect
them using `.then()`.

**How does `.catch()` help?**

`.catch()` handles a rejection in the Promise chain. It gives one place
to handle errors from the earlier Promise steps.

### Task 4 -- Async/await

**Why use `try...catch` with async/await?**

`try...catch` lets us handle errors from awaited asynchronous
operations. If an awaited Promise rejects, control moves to the `catch`
block, where we can show a failure message or handle the error.

### Task 5 -- Promise combinators

**1. What is the difference between `Promise.all()` and
`Promise.allSettled()`?**

`Promise.all()` fulfils when all Promises fulfil. If any one rejects, it
rejects immediately with that reason.

`Promise.allSettled()` waits until every Promise has settled, whether
fulfilled or rejected, and returns the status and result or reason for
each one.

**2. Does `Promise.race()` wait for success or just the first settled
result?**

It settles based on the first Promise that settles. That first result
can be either fulfilled or rejected.

**3. How is `Promise.any()` different from `Promise.race()`?**

`Promise.any()` waits for the first fulfilled Promise and ignores
rejections while other Promises are still pending. `Promise.race()` uses
the first Promise to settle, whether it fulfils or rejects.

**4. What happens when every Promise in `Promise.any()` rejects?**

`Promise.any()` rejects with an `AggregateError` containing the
rejection reasons from all the Promises.

------------------------------------------------------------------------

## Part E -- Performance Optimization and DOM Events

### Task 2 -- Throttling

**1. What is the difference between debouncing and throttling?**

Debouncing waits until the user stops triggering an event for a
specified time before running the function.

Throttling limits how often a function can run during a period of
repeated events.

**2. Which suits search suggestions?**

Debouncing suits search suggestions because it waits until the user
stops typing, avoiding a search on every keystroke.

**3. Which suits scroll and resize events?**

Throttling suits scroll and resize events because it limits how often
the handler runs while the event keeps happening.

### Task 3 -- Memoization

**1. What is memoization?**

Memoization is a technique that stores the result of a function so that
when the same inputs are used again, the stored result can be returned.

**2. How does it improve performance?**

It avoids repeating the same calculation for the same inputs. The
function can return the cached result instead of calculating it again.

**3. What role do closures play?**

A closure allows the inner function to access variables from its outer
function even after the outer function has finished. In memoization,
this can be used to keep the cache available between function calls.

### Task 4 -- Event bubbling and delegation

**1. What is event bubbling?**

Event bubbling is when an event starts at the element where it happened
and then moves up through its parent elements.

**2. What is event delegation?**

Event delegation means adding one event listener to a parent element to
handle events from its child elements.

**3. Why is delegation useful for dynamically created elements?**

The parent listener can also handle events from child elements added
later. We do not need to attach a separate listener to every new child.

**4. What does `event.stopPropagation()` do?**

It stops the event from moving further through the event propagation
path. For example, it can stop a child button's click event from
reaching its parent handler.

**5. What is the difference between `event.target` and
`event.currentTarget`?**

`event.target` is the element where the event originally happened.

`event.currentTarget` is the element whose event listener is currently
running.

------------------------------------------------------------------------

## Part F -- Final Integration Challenge

It is explained clearly with code in part f coding part
------------------------------------------------------------------------

## Quick revision

  -----------------------------------------------------------------------
  Concept                             Main point
  ----------------------------------- -----------------------------------
  Prototype                           Shared methods can be placed on a
                                      constructor's prototype

  `extends`                           Creates a child class

  `super()`                           Calls the parent constructor

  `map()`                             Returns a transformed array

  `filter()`                          Returns items that pass a condition

  `reduce()`                          Combines array values into one
                                      result

  `Map`                               Stores key-value pairs with keys of
                                      any type

  `Set`                               Stores unique values in insertion
                                      order

  `Object.freeze()`                   Prevents adding, deleting and
                                      changing top-level properties

  `Object.seal()`                     Prevents adding and deleting
                                      properties

  `JSON.stringify()`                  Converts a JavaScript value to a
                                      JSON string

  Promise                             Represents a future asynchronous
                                      result

  `async/await`                       Makes Promise-based code easier to
                                      read

  Debouncing                          Runs after repeated events stop for
                                      a delay

  Throttling                          Limits how often a function runs

  Memoization                         Reuses stored calculation results

  Event bubbling                      Event travels from child toward
                                      parent

  Event delegation                    Parent listener handles child
                                      events
  -----------------------------------------------------------------------
