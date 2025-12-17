# Enum vs Literal Types — TypeScript Cheat Sheet
---

## 1️⃣ What problem do both solve?

Both **Enums** and **Literal Types** are used to model:

* A **closed set of allowed values**
* Values that should **not be arbitrary**
* Domain-specific constants

Example domain:

* User roles
* Order status
* HTTP methods
* App modes

---

## 2️⃣ Enum — definition (theory)

An **enum** is a TypeScript feature that:

* Defines a named set of related constants
* Exists **at runtime**
* Can be imported and referenced as an object

> Enums are both **types** and **values**

---

### Example — Numeric enum

```ts
enum UserRole {
  Admin,
  Editor,
  Viewer
}
```

Runtime shape:

```js
{
  0: "Admin",
  1: "Editor",
  2: "Viewer",
  Admin: 0,
  Editor: 1,
  Viewer: 2
}
```

---

### Example — String enum (recommended)

```ts
enum Status {
  Pending = "PENDING",
  Success = "SUCCESS",
  Error = "ERROR"
}
```

Usage:

```ts
function setStatus(status: Status) {
  console.log(status);
}

setStatus(Status.Success);
```

---

### Why enums exist

* Centralized constants
* Self-documenting code
* IDE autocomplete
* Runtime availability

---

## 3️⃣ Literal Types — definition (theory)

**Literal types** restrict a value to **exact literal values**:

* String literals
* Number literals
* Boolean literals

> Literal types exist **only at compile time**

---

### Example — Union of string literals

```ts
type Status = "PENDING" | "SUCCESS" | "ERROR";
```

Usage:

```ts
function setStatus(status: Status) {
  console.log(status);
}

setStatus("SUCCESS"); // ✅
setStatus("DONE");    // ❌
```

---

### Why literal types exist

* Zero runtime cost
* Simpler mental model
* Better for APIs & JSON
* More flexible composition

---

## 4️⃣ Key differences

| Aspect            | Enum         | Literal Types |
| ----------------- | ------------ | ------------- |
| Runtime presence  | ✅ Yes        | ❌ No          |
| JavaScript output | Yes          | None          |
| Tree-shaking      | ❌ Poor       | ✅ Excellent   |
| Bundle size       | Larger       | Smaller       |
| Composability     | Limited      | Excellent     |
| Interop with JSON | Worse        | Excellent     |
| Recommended today | ⚠️ Sometimes | ✅ Usually     |

---

## 5️⃣ Practical comparison

### Domain: User role

#### Enum version

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER"
}

function authorize(role: Role) {}
```

Usage:

```ts
authorize(Role.Admin);
```

---

#### Literal version

```ts
type Role = "ADMIN" | "USER";

function authorize(role: Role) {}
```

Usage:

```ts
authorize("ADMIN");
```

---

### Why literals are often better for APIs

JSON payload:

```json
{
  "role": "ADMIN"
}
```

Literal types match this **naturally**.

Enums require mapping or importing.

---

## 6️⃣ When enums make sense

Enums are justified when you need:

✔ Runtime representation
✔ Iteration over values
✔ Namespace-like grouping
✔ Compatibility with legacy code

### Example — Iterating enum values

```ts
for (const key in Status) {
  console.log(key);
}
```

---

## 7️⃣ When literal types are better (most cases)

Use literal types when:

✔ Values come from APIs
✔ You want zero JS output
✔ You care about bundle size
✔ You want easier composition

---

## 8️⃣ Advanced pattern — `as const` (important)

You can combine literals + constants:

```ts
const STATUSES = ["PENDING", "SUCCESS", "ERROR"] as const;

type Status = typeof STATUSES[number];
```

Benefits:

* Single source of truth
* Runtime + compile-time safety
* No enum overhead

---

## 9️⃣ Exhaustiveness checking (very important)

Works **better** with literal types:

```ts
function handleStatus(status: Status) {
  switch (status) {
    case "PENDING":
      return;
    case "SUCCESS":
      return;
    case "ERROR":
      return;
    default:
      const _exhaustive: never = status;
  }
}
```

---

## 10️⃣ Python analogy (for you)

### Enum-like

```py
from enum import Enum

class Status(Enum):
    PENDING = "PENDING"
    SUCCESS = "SUCCESS"
```

### Literal-like

```py
from typing import Literal

Status = Literal["PENDING", "SUCCESS"]
```

Modern TS prefers the **Literal approach**, similar to Python’s `Literal`.

---

## 11️⃣ Recommendation (industry-aligned)

> **Prefer literal types + `as const`**
> Use enums only when you need runtime behavior

---

## 12️⃣ Summary

* Enums = runtime objects + overhead
* Literals = compile-time safety + zero cost
* Literals scale better in frontend apps
* APIs + React strongly favor literals

---
