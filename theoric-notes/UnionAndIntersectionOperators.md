
# Union (`|`) and Intersection (`&`) Types in TypeScript

### Complete Theory, Mental Models & Practical Examples

---

## 1. Why Union and Intersection Types Exist

TypeScript’s type system is **structural and expressive**.
Union and intersection types allow you to **describe reality more precisely** than classical OOP inheritance.

They help you model:

* Variability (`string OR number`)
* Composition (`User AND Admin`)
* API responses
* UI states
* Business rules

---

## 2. Union Types (`|`)

### 🔹 Definition

A **union type** means:

> A value can be **one of several possible types**

```ts
type ID = number | string;
```

➡ `ID` can be **either** a `number` **or** a `string`.

---

### 🔹 Mental Model

Union = **OR**

```text
string OR number
```

The value is **one**, but its type is **one of many options**.

---

## 3. Basic Union Examples

### Example 1: Simple Union

```ts
let userId: number | string;

userId = 10;     // ✅
userId = "10";   // ✅
```

---

### Example 2: Function Parameter

```ts
function printId(id: number | string) {
    console.log(id);
}
```

But ❌:

```ts
id.toUpperCase(); // ERROR
```

Why?
➡ Because **TypeScript doesn’t know which type it is yet**.

---

## 4. Type Narrowing (Critical Concept)

To work with union types, you must **narrow** them.

### 🔹 Using `typeof`

```ts
function printId(id: number | string) {
    if (typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id.toFixed(2));
    }
}
```

Now TypeScript knows exactly what `id` is.

---

## 5. Union Types with Objects

```ts
type Success = {
    status: "success";
    data: string;
};

type ErrorResponse = {
    status: "error";
    error: string;
};

type ApiResponse = Success | ErrorResponse;
```

Usage:

```ts
function handleResponse(res: ApiResponse) {
    if (res.status === "success") {
        console.log(res.data);
    } else {
        console.log(res.error);
    }
}
```

➡ This is called a **discriminated union**
➡ Extremely common in APIs and frontend state management

---

## 6. Union vs Optional (`?`)

```ts
type User = {
    name: string;
    age?: number;
};
```

Is equivalent to:

```ts
type User = {
    name: string;
    age: number | undefined;
};
```

Optional properties are **unions under the hood**.

---

## 7. Intersection Types (`&`)

### 🔹 Definition

An **intersection type** means:

> A value must satisfy **all types at once**

```ts
type Person = { name: string };
type Employee = { employeeId: number };

type Worker = Person & Employee;
```

---

### 🔹 Mental Model

Intersection = **AND**

```text
Person AND Employee
```

---

## 8. Basic Intersection Example

```ts
const worker: Worker = {
    name: "Alice",
    employeeId: 123
};
```

❌ Missing any property causes an error.

---

## 9. Intersection vs Inheritance

### Intersection

```ts
type Admin = { isAdmin: true };
type User = { name: string };

type AdminUser = User & Admin;
```

### Inheritance (class/interface)

```ts
interface User {
    name: string;
}

interface AdminUser extends User {
    isAdmin: true;
}
```

### Key Difference

* `&` is **type composition**
* `extends` is **structural hierarchy**

Use intersection when:

* Combining **independent concerns**
* Avoiding rigid inheritance trees

---

## 10. Intersection with Function Types

```ts
type Logger = {
    log(message: string): void;
};

type Saver = {
    save(): void;
};

type LoggerSaver = Logger & Saver;
```

Object must implement **both behaviors**.

---

## 11. Intersection Pitfall: Conflicting Types

```ts
type A = { value: string };
type B = { value: number };

type C = A & B;
```

Now:

```ts
value: string & number // ❌ impossible
```

Result: `never`

➡ Intersection **does not merge values**, it merges **requirements**.

---

## 12. Union vs Intersection — Side by Side

| Concept | Union (`|`) | Intersection (`&`) |
|------|------|------|
| Meaning | OR | AND |
| Value shape | One of many | All combined |
| Common use | Inputs, states, responses | Composition, mixins |
| Narrowing needed | Yes | No |
| Risk | Unsafe access | Conflicting types |

---

## 13. Real-World Use Cases

### 🔹 Backend (API responses)

```ts
type ApiResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: string };
```

---

### 🔹 Frontend (UI states)

```ts
type Loading = { loading: true };
type Loaded = { loading: false; data: string };

type State = Loading | Loaded;
```

---

### 🔹 Permissions & Roles

```ts
type User = { id: number };
type Admin = { permissions: string[] };

type AdminUser = User & Admin;
```

---

## 14. Python Comparison

Python typing:

```py
from typing import Union

def print_id(id: Union[int, str]):
    print(id)
```

Differences:

* Python: runtime flexible
* TypeScript: **compile-time enforced + narrowing**
* TS unions affect **how code is written**

---

## 15. Cheat Sheet

```ts
// Union
type ID = string | number;

// Intersection
type FullUser = User & Admin;

// Narrowing
if (typeof x === "string") {}

// Discriminated Union
type Result =
    | { ok: true; data: string }
    | { ok: false; error: string };
```

---

## Final Mental Model

> **Union types describe variability**
> **Intersection types describe composition**

They replace:

* Excessive inheritance
* Runtime checks
* Fragile code paths

---
