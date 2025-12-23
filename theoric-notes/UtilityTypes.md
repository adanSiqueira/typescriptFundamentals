# Utility Types in TypeScript

### Complete Theory, Mental Models & Practical Examples

---

## 1. What Are Utility Types?

**Utility types** are **built-in generic types** provided by TypeScript that allow you to:

* Transform existing types
* Avoid repetition
* Create safer, more expressive models
* Adapt types to different contexts (API, UI, DB, DTOs)

They **do not exist at runtime**.
They are **compile-time type transformations**.

> Utility types are **type-level functions**.

---

## 2. Why Utility Types Exist

Without utility types, you would duplicate types constantly.

Example problem:

```ts
interface User {
    id: number;
    name: string;
    email: string;
}
```

Now you need:

* Create user (no `id`)
* Update user (all optional)
* Read-only user
* Partial projections

Without utility types → **type explosion**
With utility types → **single source of truth**

---

## 3. Mental Model

Think of utility types as:

```text
Type in → Transformation → New Type out
```

Example:

```ts
Partial<User>
Readonly<User>
Pick<User, "id" | "name">
```

---

## 4. `Partial<T>`

### Definition

Makes **all properties optional**.

```ts
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```

---

### Example

```ts
interface User {
    id: number;
    name: string;
    email: string;
}

const updateUser = (data: Partial<User>) => {
    // Can update only what exists
};

updateUser({ email: "new@email.com" }); // ✅
```

### Use Cases

* PATCH requests
* Update forms
* Config overrides

---

## 5. `Required<T>`

### Definition

Makes **all properties mandatory**.

---

### Example

```ts
interface Config {
    host?: string;
    port?: number;
}

const fullConfig: Required<Config> = {
    host: "localhost",
    port: 5432
};
```

---

### Use Case

* After validation
* Normalized data
* Internal logic guarantees completeness

---

## 6. `Readonly<T>`

### Definition

Prevents reassignment of properties.

---

### Example

```ts
const user: Readonly<User> = {
    id: 1,
    name: "Alice",
    email: "a@email.com"
};

// user.name = "Bob"; ❌
```

---

### Use Cases

* Immutable state
* Redux / React state
* Domain safety

---

## 7. `Pick<T, K>`

### Definition

Creates a type with **only selected properties**.

---

### Example

```ts
type UserPreview = Pick<User, "id" | "name">;

const preview: UserPreview = {
    id: 1,
    name: "Alice"
};
```

---

### Use Cases

* API responses
* Public views
* Lightweight projections

---

## 8. `Omit<T, K>`

### Definition

Creates a type **excluding specific properties**.

---

### Example

```ts
type CreateUser = Omit<User, "id">;

const newUser: CreateUser = {
    name: "Bob",
    email: "b@email.com"
};
```

---

### Use Cases

* Create DTOs
* Remove sensitive fields
* Form models

---

## 9. `Record<K, T>`

### Definition

Creates an object type with **fixed keys and value type**.

---

### Example

```ts
type Roles = "admin" | "user";

const permissions: Record<Roles, boolean> = {
    admin: true,
    user: false
};
```

---

### Use Cases

* Dictionaries
* Maps
* Lookup tables

---

## 10. `Exclude<T, U>`

### Definition

Removes types from a union.

---

### Example

```ts
type Status = "loading" | "success" | "error";

type NonErrorStatus = Exclude<Status, "error">;
```

---

### Use Case

* State machines
* Business rules
* Validation layers

---

## 11. `Extract<T, U>`

### Definition

Keeps only matching types.

---

### Example

```ts
type Status = "loading" | "success" | "error";

type ErrorOnly = Extract<Status, "error" | "fatal">;
// "error"
```

---

## 12. `NonNullable<T>`

### Definition

Removes `null` and `undefined`.

---

### Example

```ts
type Value = string | null | undefined;

type SafeValue = NonNullable<Value>;
```

---

### Use Case

* After validation
* DB results
* API guarantees

---

## 13. `ReturnType<T>`

### Definition

Infers the return type of a function.

---

### Example

```ts
function getUser() {
    return { id: 1, name: "Alice" };
}

type UserResult = ReturnType<typeof getUser>;
```

---

### Use Case

* Avoid duplicating return types
* Keep refactors safe

---

## 14. `Parameters<T>`

### Definition

Extracts function parameter types as a tuple.

---

### Example

```ts
function login(email: string, password: string) {}

type LoginArgs = Parameters<typeof login>;
// [string, string]
```

---

## 15. Utility Types in Real APIs

### Example: REST API Modeling

```ts
interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

type PublicUser = Omit<User, "password">;
type CreateUser = Omit<User, "id">;
type UpdateUser = Partial<CreateUser>;
```

This is **idiomatic TypeScript backend code**.

---

## 16. Python Comparison

Python:

```py
from typing import TypedDict, Optional
```

Limitations:

* Mostly documentation
* No compile-time enforcement
* No transformations

TypeScript:

* Structural
* Composable
* Enforced by compiler

---

## 17. Cheat Sheet

```ts
Partial<T>        // all optional
Required<T>       // all required
Readonly<T>       // immutable
Pick<T, K>        // select fields
Omit<T, K>        // remove fields
Record<K, T>      // key-value map
Exclude<T, U>     // remove union members
Extract<T, U>     // keep union members
NonNullable<T>    // remove null/undefined
ReturnType<T>     // function return
Parameters<T>     // function args
```

---

## Final Mental Model

> **Utility types let you reshape reality without rewriting it.**

They are:

* Safer than inheritance
* Cleaner than duplication
* Fundamental to professional TypeScript

---
