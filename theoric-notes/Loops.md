# Loops in TypeScript

### Theory, Mental Models & Practical Examples

---

## 1. What Are Loops?

Loops allow you to **repeat a block of code** while a condition is true or while iterating over data.

In TypeScript, loops:

1. Behave **exactly like JavaScript at runtime**
2. Benefit from **TypeScript’s type inference and narrowing**
3. Can be replaced by **functional methods** (`map`, `filter`, `reduce`) in many cases

> Loops control **repetition**, not types —
> but TypeScript makes loops **safer and clearer**.

---

## 2. `for` Loop (Classic)

### Syntax

```ts
for (initialization; condition; increment) {
    // repeated code
}
```

---

### Example

```ts
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

---

### Key Points

* `let` is preferred over `var`
* Index-based
* Full control over iteration

---

### Python Comparison

```py
for i in range(5):
    print(i)
```

TypeScript’s `for` is more verbose but more explicit.

---

## 3. Looping Over Arrays with `for`

```ts
const numbers: number[] = [10, 20, 30];

for (let i = 0; i < numbers.length; i++) {
    console.log(numbers[i]);
}
```

➡ Classic, but often replaced by `for...of`.

---

## 4. `for...of` Loop (Recommended for Arrays)

### Mental Model

> “Give me each **value**, not the index.”

---

### Example

```ts
const numbers: number[] = [10, 20, 30];

for (const n of numbers) {
    console.log(n);
}
```

### Benefits

* Cleaner
* Type-safe
* No index bugs

---

### Python Equivalent

```py
for n in numbers:
    print(n)
```

Very similar conceptually.

---

## 5. `for...in` Loop (Keys, Not Values ⚠️)

### Mental Model

> “Give me the **keys** (indexes or property names).”

---

### Example with Objects

```ts
const user = {
    name: "Alice",
    age: 30
};

for (const key in user) {
    console.log(key, user[key as keyof typeof user]);
}
```

⚠️ TypeScript needs casting because keys are strings.

---

### With Arrays (Usually Not Recommended)

```ts
for (const index in numbers) {
    console.log(index); // string index
}
```

Use `for...of` instead.

---

## 6. `while` Loop

### Syntax

```ts
while (condition) {
    // repeat while condition is true
}
```

---

### Example

```ts
let count = 0;

while (count < 3) {
    console.log(count);
    count++;
}
```

---

### When to Use

* Number of iterations unknown
* Condition-based loops

---

### Python Equivalent

```py
while count < 3:
    print(count)
    count += 1
```

---

## 7. `do...while` Loop

### Mental Model

> “Run at least once.”

---

### Syntax

```ts
do {
    // code
} while (condition);
```

---

### Example

```ts
let attempts = 0;

do {
    attempts++;
} while (attempts < 1);
```

Even if condition is false initially, the loop runs once.

---

## 8. `break` and `continue`

### `break` — Exit the loop

```ts
for (let i = 0; i < 10; i++) {
    if (i === 5) break;
    console.log(i);
}
```

---

### `continue` — Skip current iteration

```ts
for (let i = 0; i < 5; i++) {
    if (i === 2) continue;
    console.log(i);
}
```

---

## 9. Loop + Type Narrowing

Loops often work with **union types**.

```ts
const values: (number | string)[] = [1, "a", 2, "b"];

for (const v of values) {
    if (typeof v === "string") {
        console.log(v.toUpperCase());
    } else {
        console.log(v.toFixed(2));
    }
}
```

TypeScript narrows `v` inside the loop body.

---

## 10. Looping Over Maps and Sets

### `Map`

```ts
const map = new Map<string, number>();
map.set("a", 1);
map.set("b", 2);

for (const [key, value] of map) {
    console.log(key, value);
}
```

---

### `Set`

```ts
const set = new Set<number>([1, 2, 3]);

for (const value of set) {
    console.log(value);
}
```

---

## 11. Functional Alternatives to Loops (Very Common)

TypeScript heavily uses **array methods**.

---

### `map`

```ts
const doubled = [1, 2, 3].map(n => n * 2);
```

---

### `filter`

```ts
const evens = [1, 2, 3, 4].filter(n => n % 2 === 0);
```

---

### `reduce`

```ts
const sum = [1, 2, 3].reduce((acc, n) => acc + n, 0);
```

---

### When to Prefer These

* Data transformation
* Immutability
* Cleaner intent

---

## 12. Loops vs Functional Methods

| Use Case            | Prefer     |
| ------------------- | ---------- |
| Simple iteration    | `for...of` |
| Index-based control | `for`      |
| Unknown repetitions | `while`    |
| Transform arrays    | `map`      |
| Filter data         | `filter`   |
| Aggregate values    | `reduce`   |

---

## 13. Common Mistakes

### ❌ Using `for...in` for arrays

```ts
for (const i in arr) {
    console.log(arr[i]); // works, but not ideal
}
```

### ❌ Forgetting `let` or `const`

```ts
for (i = 0; i < 5; i++) {} // error in strict mode
```

---

## 14. Cheat Sheet

```ts
// Classic loop
for (let i = 0; i < n; i++) {}

// Values
for (const v of array) {}

// Keys
for (const k in object) {}

// Condition-based
while (condition) {}

// At least once
do {} while (condition);

// Exit / skip
break;
continue;
```

---

## Final Mental Model

> **Loops are about repetition.**
> **TypeScript adds safety, not complexity.**

Use:

* `for...of` for readability
* Functional methods for transformations
* `while` when logic, not data, controls repetition

---
