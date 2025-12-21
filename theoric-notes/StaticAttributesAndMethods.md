# Static Attributes & Methods in TypeScript

## Full Theoretical Review + Practical Guide

---

## 1️⃣ What Does `static` Mean?

### 📌 Definition

The `static` keyword makes a **property or method belong to the class itself**, **not** to individual instances.

> **Static members live on the class, not on objects created from it.**

---

### 🧠 Mental Model

| Concept         | Think of it as                   |
| --------------- | -------------------------------- |
| Instance member | Belongs to each object           |
| Static member   | Belongs to the blueprint (class) |

---

## 2️⃣ Instance vs Static — Core Difference

### ❌ Instance property (default behavior)

```ts
class User {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const u1 = new User("Alice");
const u2 = new User("Bob");
```

* `u1.name` → `"Alice"`
* `u2.name` → `"Bob"`
* Each instance has its **own copy**

---

### ✅ Static property

```ts
class User {
    static role = "user";
}
```

Accessed like this:

```ts
console.log(User.role); // "user"
```

❌ This does NOT work:

```ts
const u = new User();
u.role; // ERROR
```

---

## 3️⃣ Static Properties (Attributes)

### 📌 Definition

A **static property** stores data that is:

* Shared
* Global to the class
* Not tied to a specific instance

---

### 🧪 Example — Global Counter

```ts
class User {
    static totalUsers = 0;

    constructor() {
        User.totalUsers++;
    }
}

new User();
new User();

console.log(User.totalUsers); // 2
```

✔ Shared state
✔ No duplication
✔ Useful for statistics

---

### 🧠 Typical Use Cases

* Counters
* Configuration values
* Constants
* Cache
* Global flags

---

## 4️⃣ Static Methods

### 📌 Definition

A **static method**:

* Belongs to the class
* Cannot access instance members (`this.name`)
* Is called directly on the class

---

### 🧪 Example — Utility Method

```ts
class MathUtils {
    static square(x: number): number {
        return x * x;
    }
}

MathUtils.square(5); // 25
```

✔ No instance needed
✔ Stateless logic
✔ Clear intent

---

### ❌ What Static Methods Cannot Do

```ts
class User {
    name = "Alice";

    static sayName() {
        console.log(this.name); // ❌ ERROR
    }
}
```

Why?

* `this` refers to the **class**, not an instance
* `name` exists only on instances

---

## 5️⃣ Static vs Instance — Side-by-Side

```ts
class Example {
    static staticValue = 10;
    instanceValue = 20;

    static staticMethod() {
        return Example.staticValue;
    }

    instanceMethod() {
        return this.instanceValue;
    }
}
```

Usage:

```ts
Example.staticMethod(); // ✅
new Example().instanceMethod(); // ✅
```

❌ Invalid:

```ts
new Example().staticMethod(); // ❌
Example.instanceMethod();     // ❌
```

---

## 6️⃣ Static + Access Modifiers

Static members can be:

* `public` (default)
* `private`
* `protected`

---

### 🧪 Example — Private Static Helper

```ts
class Auth {
    private static secretKey = "abc123";

    static validate(token: string): boolean {
        return token === Auth.secretKey;
    }
}
```

✔ Encapsulated
✔ Secure
✔ Not instantiable

---

## 7️⃣ Static in Constructors

Static properties are often updated in constructors:

```ts
class Connection {
    static activeConnections = 0;

    constructor() {
        Connection.activeConnections++;
    }
}
```

✔ Tracks global state
✔ Useful in services

---

## 8️⃣ Static Methods as Factory Functions

### 🧪 Example — Factory Pattern

```ts
class User {
    private constructor(
        public name: string,
        public role: string
    ) {}

    static createAdmin(name: string): User {
        return new User(name, "admin");
    }

    static createUser(name: string): User {
        return new User(name, "user");
    }
}
```

Usage:

```ts
const admin = User.createAdmin("Alice");
```

✔ Controlled creation
✔ Clear intent
✔ Safer APIs

---

## 9️⃣ Static in Abstract Classes

Static members are **not inherited polymorphically**, but they can exist:

```ts
abstract class Logger {
    static logInfo(msg: string) {
        console.log("INFO:", msg);
    }
}

Logger.logInfo("App started");
```

⚠ Static methods are **not overridable** like instance methods.

---

## 🔟 Static vs Singleton (Important Distinction)

| Static              | Singleton            |
| ------------------- | -------------------- |
| No instance         | One instance         |
| No lifecycle        | Controlled lifecycle |
| Simple              | More flexible        |
| Stateless or global | Stateful             |

Static ≠ Singleton.

---

## 1️⃣1️⃣ Python Comparison (Your Background)

| TypeScript      | Python          |
| --------------- | --------------- |
| static property | class attribute |
| static method   | `@staticmethod` |
| class method    | `@classmethod`  |

Python example:

```py
class User:
    total_users = 0

    def __init__(self):
        User.total_users += 1
```

---

## 1️⃣2️⃣ When Should You Use `static`?

### ✅ Use static when:

* The logic does **not depend on object state**
* The data is **shared**
* You want **utility functions**
* You want **global counters/config**
* You don’t want instantiation

---

### ❌ Avoid static when:

* Behavior depends on instance data
* You want polymorphism
* You want dependency injection
* You want testable, mockable logic

---

## 1️⃣3️⃣ Cheat Sheet

### Syntax

```ts
class Example {
    static value = 10;
    static method() {}
}
```

### Access

```ts
Example.value;
Example.method();
```

### Rules

```txt
Static belongs to class, not instance
Cannot access instance members
Good for utilities and global state
Not polymorphic
```

---

## 1️⃣4️⃣ Final Takeaway

> **Static members describe class-level behavior.
> Instance members describe object-level behavior.**

Use `static` to:

* Clarify intent
* Avoid unnecessary instantiation
* Centralize logic

Overuse leads to:

* Tight coupling
* Hard-to-test code

Used wisely, it makes your code **cleaner, clearer, and more expressive**.

---