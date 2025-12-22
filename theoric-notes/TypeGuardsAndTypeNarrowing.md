# Type Guards & Type Narrowing in TypeScript

## 1. The Core Problem Type Guards Solve

TypeScript allows **union types**:

```ts
type ID = string | number;
```

But when you use a union, TypeScript becomes **conservative**:

```ts
function printId(id: string | number) {
    id.toUpperCase(); // ❌ Error
}
```

Why?

Because **TypeScript does not know which type you have at runtime**.

➡ This is where **type narrowing** and **type guards** come in.

---

## 2. What Is Type Narrowing?

**Type narrowing** is the process of:

> Reducing a broad type into a more specific one inside a code block

Example:

```ts
let value: string | number;

if (typeof value === "string") {
    // value is now string
} else {
    // value is now number
}
```

TypeScript **tracks control flow** and updates the type.

---

## 3. What Is a Type Guard?

A **type guard** is **any expression that tells TypeScript**:

> “Inside this block, the value is of a specific type”

Type guards are the **mechanism**
Type narrowing is the **result**

---

## 4. Built-in Type Guards

### 4.1 `typeof` — Primitive Types

Works for:

* `string`
* `number`
* `boolean`
* `bigint`
* `symbol`
* `undefined`
* `function`

```ts
function format(value: string | number) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    return value.toFixed(2);
}
```

---

### 4.2 `instanceof` — Classes

Used with **class-based types**.

```ts
class Dog {
    bark() {}
}

class Cat {
    meow() {}
}

function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

➡ `instanceof` works at **runtime**, not just types.

---

### 4.3 `in` Operator — Object Shapes

Checks if a **property exists**.

```ts
type Admin = {
    permissions: string[];
};

type User = {
    name: string;
};

function printUser(user: Admin | User) {
    if ("permissions" in user) {
        console.log(user.permissions);
    } else {
        console.log(user.name);
    }
}
```

---

## 5. Discriminated (Tagged) Unions — The Most Powerful Pattern

### 5.1 The Idea

Use a **shared literal property** to discriminate types.

```ts
type Success = {
    status: "success";
    data: string;
};

type ErrorResponse = {
    status: "error";
    error: string;
};

type Result = Success | ErrorResponse;
```

---

### 5.2 Narrowing by Discriminator

```ts
function handleResult(result: Result) {
    if (result.status === "success") {
        console.log(result.data);
    } else {
        console.log(result.error);
    }
}
```

✔ No casts
✔ No runtime hacks
✔ Fully type-safe

This is **the gold standard** for API responses and UI state.

---

## 6. Custom Type Guards (User-Defined)

Sometimes built-in checks aren’t enough.

### 6.1 Type Predicate Syntax

```ts
function isString(value: unknown): value is string {
    return typeof value === "string";
}
```

### 6.2 Usage

```ts
function process(value: unknown) {
    if (isString(value)) {
        value.toUpperCase(); // value is string
    }
}
```

➡ The return type `value is string` is the **key**

---

## 7. Type Guards with Interfaces

```ts
interface Bird {
    fly(): void;
}

interface Fish {
    swim(): void;
}

function isFish(animal: Bird | Fish): animal is Fish {
    return "swim" in animal;
}

function move(animal: Bird | Fish) {
    if (isFish(animal)) {
        animal.swim();
    } else {
        animal.fly();
    }
}
```

---

## 8. Narrowing with Truthiness

TypeScript also narrows based on truthy/falsy checks:

```ts
function printLength(value?: string) {
    if (value) {
        console.log(value.length);
    }
}
```

But ⚠️ be careful:

```ts
if (value) {
    // excludes "", 0, false
}
```

Use explicit checks if needed.

---

## 9. Exhaustiveness Checking (`never`)

This ensures **all cases are handled**.

```ts
type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; size: number };

function area(shape: Shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "square":
            return shape.size ** 2;
        default:
            const _exhaustive: never = shape;
            return _exhaustive;
    }
}
```

➡ If a new type is added, TypeScript will error.

---

## 10. What Type Guards Are NOT

❌ They do not change runtime values
❌ They do not replace validation libraries
❌ They do not add performance overhead

They only help **TypeScript reason about your code**

---

## 11. Real-World Use Cases

### Backend

* API responses
* Validation layers
* Error handling

### Frontend

* UI state machines
* Feature flags
* Conditional rendering

### Libraries

* Safe public APIs
* Plugin systems

---

## 12. Python Comparison

Python:

```py
from typing import Union

def print_id(id: Union[int, str]):
    if isinstance(id, str):
        print(id.upper())
```

Differences:

| Python                   | TypeScript             |
| ------------------------ | ---------------------- |
| Runtime checks           | Compile-time + runtime |
| Optional typing          | Strict by default      |
| No narrowing enforcement | Narrowing required     |

---

## 13. Cheat Sheet

```ts
// typeof
if (typeof x === "string") {}

// instanceof
if (obj instanceof MyClass) {}

// in
if ("prop" in obj) {}

// Discriminated union
if (res.status === "success") {}

// Custom guard
function isUser(x: any): x is User {}

// Exhaustive check
const _: never = value;
```

---
