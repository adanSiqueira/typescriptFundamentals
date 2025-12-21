# Type Aliases in TypeScript — Complete Theory & Practice Guide

## 1. What Is a Type Alias?

A **type alias** lets you create a **custom name for any TypeScript type**.

It does **not** create:

* a class
* a runtime object
* executable JavaScript

It exists **only at compile time**, helping the TypeScript compiler understand and validate your code.

```ts
type UserId = number;
```

Here:

* `UserId` is just another name for `number`
* At runtime, this disappears

---

## 2. Why Type Aliases Exist

Type aliases solve **three major problems**:

### 1️⃣ Readability

```ts
function move(point: [number, number]) {}
```

vs

```ts
type Point = [number, number];
function move(point: Point) {}
```

➡ The second version **communicates intent**.

---

### 2️⃣ Reusability

Avoid repeating complex types:

```ts
type ApiResponse = {
    data: unknown;
    status: number;
    error?: string;
};
```

Now reused everywhere:

```ts
function fetchData(): ApiResponse {}
function saveData(): ApiResponse {}
```

---

### 3️⃣ Safety & Centralization

If a type changes, you update it **once**.

---

## 3. What Can a Type Alias Represent?

### ✅ Primitive Types

```ts
type UserId = number;
type Username = string;
```

This adds **semantic meaning**:

```ts
function deleteUser(id: UserId) {}
```

---

### ✅ Object Shapes

```ts
type User = {
    id: number;
    name: string;
    email: string;
};
```

Equivalent to an interface (with differences later).

---

### ✅ Tuples (Very Important)

```ts
type Coordinates = [number, number];
```

Strict structure:

* Exactly 2 values
* Fixed order
* Fixed types

```ts
const point: Coordinates = [10, 20]; // ✅
```

---

### ✅ Union Types

One of the **biggest reasons** to use type aliases.

```ts
type Status = "loading" | "success" | "error";
```

Used like:

```ts
function render(status: Status) {
    if (status === "loading") {}
}
```

❌ Interfaces **cannot** do this.

---

### ✅ Intersection Types

Combine multiple types:

```ts
type Person = { name: string };
type Employee = { employeeId: number };

type Worker = Person & Employee;
```

Now:

```ts
const w: Worker = {
    name: "Alice",
    employeeId: 123
};
```

---

### ✅ Function Types

```ts
type MathOperation = (a: number, b: number) => number;
```

Usage:

```ts
const add: MathOperation = (x, y) => x + y;
```

---

### ✅ Generic Type Aliases

```ts
type ApiResponse<T> = {
    data: T;
    status: number;
};
```

Used as:

```ts
const response: ApiResponse<User> = {
    data: { id: 1, name: "Alice", email: "a@mail.com" },
    status: 200
};
```

---

## 4. Type Alias vs Interface (Core Comparison)

| Feature             | type       | interface |
| ------------------- | ---------- | --------- |
| Objects             | ✅          | ✅         |
| Primitives          | ✅          | ❌         |
| Unions              | ✅          | ❌         |
| Tuples              | ✅          | ❌         |
| Intersections       | ✅          | ❌         |
| Declaration merging | ❌          | ✅         |
| Extends             | ⚠️ Limited | ✅         |

### Key Rule of Thumb

* **Use `interface` for object contracts**
* **Use `type` for everything else**

---

## 5. When Type Aliases Are Better Than Interfaces

### 🔹 1. Union Types

```ts
type Input = string | number;
```

Impossible with interfaces.

---

### 🔹 2. Tuples

```ts
type RGB = [number, number, number];
```

---

### 🔹 3. Function Composition

```ts
type Callback = (value: string) => void;
```

---

### 🔹 4. Conditional / Advanced Types

```ts
type IsString<T> = T extends string ? true : false;
```

---

## 6. Real-World Use Cases

### 🧠 Backend (APIs)

```ts
type CreateUserInput = {
    name: string;
    email: string;
};
```

Used in:

```ts
function createUser(data: CreateUserInput) {}
```

---

### 🎨 Frontend (React / UI State)

```ts
type Theme = "light" | "dark";
type ButtonVariant = "primary" | "secondary";
```

---

### 🌐 HTTP Responses

```ts
type HttpResponse<T> =
    | { status: 200; data: T }
    | { status: 404; error: string };
```

This gives **extreme type safety**.

---

## 7. Python Mental Model

Type aliases in Python:

```py
UserId = int
Coordinates = tuple[int, int]
```

But Python:

* Does NOT enforce at runtime
* Does NOT enforce tuple length strictly

TypeScript:

* Enforces at compile time
* Prevents whole classes of bugs

---

## 8. Common Mistakes

### ❌ Using type aliases where interfaces are better

```ts
type User = { name: string };
```

Works — but **interfaces are preferred** when:

* You expect extension
* You want object-oriented modeling

---

### ❌ Expecting type aliases to exist at runtime

```ts
console.log(User); // ❌ Error
```

They are **compile-time only**.

---

## 9. Cheat Sheet

```ts
// Primitive
type ID = number;

// Object
type User = { id: number; name: string };

// Tuple
type Point = [number, number];

// Union
type Status = "success" | "error";

// Function
type Fn = (x: number) => number;

// Generic
type Box<T> = { value: T };

// Intersection
type A = { a: string };
type B = { b: number };
type AB = A & B;
```

---

## Final Mental Model

> **Interfaces define shapes of objects**
> **Type aliases define types — any type**

They are not competitors — they are **complementary tools**.
