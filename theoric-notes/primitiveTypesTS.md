Below is a **theoretical + practical explanation** of each **TypeScript primitive type**, with **clear mental models**, **runtime meaning**, and **examples**. I’ll also highlight *why* each exists and *when* you should use it.

---

# TypeScript Primitive Types — Theory + Examples

## 1️⃣ `number`

### What it represents (theory)

* Represents **numeric values** (integers, floats, decimals)
* TypeScript (like JavaScript) has **one numeric type** — no separate `int` / `float`
* Uses **IEEE 754 double-precision floating point**

### Why it exists

To model:

* Quantities
* Counters
* IDs
* Prices
* Measurements

### Example

```ts
let age: number = 27;
let price: number = 19.99;
let temperature: number = -5;
```

### Runtime behavior

```ts
typeof age === "number"
```

### Important notes

* `NaN` and `Infinity` are also `number`
* Use lowercase `number`, **not** `Number`

---

## 2️⃣ `string`

### What it represents (theory)

* Represents **textual data**
* Immutable sequences of UTF-16 characters

### Why it exists

To model:

* Names
* Messages
* Emails
* JSON fields
* UI text

### Example

```ts
let name: string = "Adan";
let email: string = "adan@email.com";
```

### Template literals

```ts
let message: string = `Hello ${name}, welcome!`;
```

### Runtime behavior

```ts
typeof name === "string"
```

### Important notes

* Strings are immutable
* Use backticks for interpolation

---

## 3️⃣ `boolean`

### What it represents (theory)

* Represents **logical truth values**
* Only two possible values: `true` or `false`

### Why it exists

To model:

* Conditions
* Flags
* Feature toggles
* Authentication state

### Example

```ts
let isLoggedIn: boolean = true;
let hasAccess: boolean = false;
```

### Runtime behavior

```ts
typeof isLoggedIn === "boolean"
```

### Common usage

```ts
if (isLoggedIn) {
  console.log("Welcome!");
}
```

---

## 4️⃣ `null`

### What it represents (theory)

* Represents an **explicit absence of a value**
* Intentionally set by the programmer

### Why it exists

To say:

> “This value is empty on purpose”

### Example

```ts
let userAddress: string | null = null;
```

### Key idea

* `null` means **known empty**
* Often used when data *will exist later*

### Strict mode rule

```ts
// ❌ Error
let name: string = null;

// ✅ Correct
let name: string | null = null;
```

---

## 5️⃣ `undefined`

### What it represents (theory)

* Represents a value that **has not been assigned**
* Usually indicates something is *missing*

### Why it exists

To model:

* Optional parameters
* Missing object properties
* Uninitialized variables

### Example

```ts
let phoneNumber: string | undefined;

function greet(name?: string) {
  console.log(name);
}
```

### Key idea

* `undefined` means **not provided**
* Often automatic, not intentional

---

## 6️⃣ `void`

### What it represents (theory)

* Represents the **absence of a return value**
* Used **only for function return types**

### Why it exists

To express:

> “This function does something, but returns nothing”

### Example

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

### What it actually returns

```ts
return undefined;
```

But you should **not rely on it**.

### Key rule

* `void` ≠ `null`
* `void` ≠ `undefined`
* It’s a **type-level concept**

---

## 7️⃣ `never`

### What it represents (theory)

* Represents **values that never occur**
* A function that **never finishes normally**

### Why it exists

To model:

* Infinite loops
* Functions that always throw
* Exhaustive checks

### Example 1 — Function that throws

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```

### Example 2 — Infinite loop

```ts
function infiniteLoop(): never {
  while (true) {}
}
```

### Example 3 — Exhaustive checking (advanced but powerful)

```ts
function process(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase();
  }
  if (typeof value === "number") {
    return value.toFixed(2);
  }

  // If we add a new type and forget to handle it, TS errors
  const _exhaustive: never = value;
}
```

### Mental model

> `never` = “This code path cannot exist”

---

## Summary Table

| Type        | Meaning              |
| ----------- | -------------------- |
| `number`    | Numeric values       |
| `string`    | Text                 |
| `boolean`   | True / false         |
| `null`      | Intentional absence  |
| `undefined` | Missing / unassigned |
| `void`      | No return value      |
| `never`     | Impossible value     |

---

## Key mental shift (important)

TypeScript types:

* Do **not** exist at runtime
* Describe **possible values**
* Protect you *before execution*

---
