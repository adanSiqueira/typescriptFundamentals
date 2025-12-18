# Interface vs Class in TypeScript

**Conceptual, Practical, and Architectural Guide**

---

## 1️⃣ Core Idea (one-line summary)

> **Interfaces describe the shape of data at compile time.
> Classes define objects with behavior at runtime.**

This distinction explains **when**, **why**, and **how** each should be used.

---

## 2️⃣ What is an `interface`?

### Definition

An `interface` is a **TypeScript-only construct** used to define a **contract** (shape) that an object must follow.

* Exists **only at compile time**
* Completely removed from the generated JavaScript
* Has **zero runtime cost**
* Cannot contain implementation logic

---

### Example — Interface for API data

```ts
interface UserData {
    id: number;
    name: string;
    email: string;
}
```

Usage:

```ts
const user: UserData = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};
```

At runtime, this becomes:

```js
{ id: 1, name: "Alice", email: "alice@example.com" }
```

➡️ No interface exists in JavaScript.

---

### Why interfaces are ideal for APIs

Interfaces are perfect for:

* Request bodies (DTOs)
* Response payloads
* Database records
* Configuration objects

Example from your project:

```ts
export function createUser(
  req: Request<{}, {}, CreateUserInput>,
  res: Response
)
```

`CreateUserInput` exists only to **protect your code during development**.

---

## 3️⃣ What is a `class`?

### Definition

A `class` is a **runtime construct** that:

* Exists in JavaScript output
* Can be instantiated with `new`
* Can store state
* Can implement behavior

---

### Example — Class with behavior

```ts
class User {
    constructor(
        public id: number,
        public email: string
    ) {}

    changeEmail(newEmail: string) {
        this.email = newEmail;
    }
}
```

Usage:

```ts
const user = new User(1, "a@email.com");
user.changeEmail("b@email.com");
```

This produces real JavaScript code and objects.

---

## 4️⃣ Runtime vs Compile-Time (critical distinction)

| Feature              | `interface` | `class` |
| -------------------- | ----------- | ------- |
| Exists at runtime    | ❌ No        | ✅ Yes   |
| Emitted in JS output | ❌ No        | ✅ Yes   |
| Can be instantiated  | ❌ No        | ✅ Yes   |
| Can have methods     | ❌ No        | ✅ Yes   |
| Used for typing      | ✅ Yes       | ✅ Yes   |
| Used for behavior    | ❌ No        | ✅ Yes   |

---

## 5️⃣ Why your `users.ts` correctly uses interfaces

From your code:

```ts
interface CreateUserInput {
    name: string;
    email: string;
    age: number;
}
```

This represents:

* External input
* JSON payload
* No behavior
* No lifecycle

Using a class here would:

* Add unnecessary runtime objects
* Imply behavior that does not exist
* Go against JS/TS backend conventions

Your use of interfaces is **idiomatic and correct**.

---

## 6️⃣ Classes for services, interfaces for data (best practice)

### Interface (data contract)

```ts
interface UserData {
    id: number;
    name: string;
}
```

### Class (business logic)

```ts
class UserService {
    create(user: UserData) {
        // business rules
    }
}
```

This separation:

* Improves clarity
* Reduces coupling
* Scales well

---

## 7️⃣ Structural typing: why interfaces are powerful

TypeScript uses **structural typing**:

```ts
interface User {
    name: string;
}

const obj = { name: "Alice", age: 30 };

const user: User = obj; // ✅ allowed
```

No inheritance required — **shape is what matters**.

Classes require nominal identity.

---

## 8️⃣ When to prefer `interface`

✔ Describing data shapes
✔ API request / response models
✔ Configuration objects
✔ Plain JSON
✔ DTOs
✔ Zero runtime overhead

### Example

```ts
interface Config {
    port: number;
    debug: boolean;
}
```

---

## 9️⃣ When to prefer `class`

✔ You need methods
✔ You manage internal state
✔ You use OOP patterns
✔ You need lifecycle hooks
✔ You create service objects

### Example

```ts
class DatabaseConnection {
    connect() {}
    close() {}
}
```

---

## 🔟 Can a class implement an interface? Yes

```ts
interface Serializable {
    serialize(): string;
}

class User implements Serializable {
    serialize() {
        return JSON.stringify(this);
    }
}
```

This combines:

* Interface → contract
* Class → behavior

---

## 1️⃣1️⃣ Interface vs Type (important note)

While not the focus here:

* `interface` is extendable and mergeable
* `type` is more expressive but less extendable

For **object shapes**, interfaces are often preferred in large codebases.

---

## 1️⃣2️⃣ Python comparison (to lock the concept)

| Python                 | TypeScript                |
| ---------------------- | ------------------------- |
| Classes represent data | Interfaces represent data |
| Types exist at runtime | Types erased at runtime   |
| Validation via classes | Validation via libraries  |

This is why:

* FastAPI uses classes
* Express + TS uses interfaces

---

## Final takeaway (memorize this)

> **Interfaces define what data looks like.
> Classes define what objects do.**

If you keep this mental model, you’ll never be confused again.