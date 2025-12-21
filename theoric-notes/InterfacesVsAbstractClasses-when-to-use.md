# Interfaces vs Abstract Classes in TypeScript

## Full Theoretical Review + Practical Guide

---

## 1️⃣ The Core Problem This Topic Solves

When designing software, you often need to answer questions like:

* What **shape** must an object have?
* What **behavior** must be implemented?
* Should logic be **shared**, or only **enforced**?
* Should multiple unrelated classes share a contract?

TypeScript gives you **two tools** for this:

* `interface`
* `abstract class`

They solve **different problems**, even though they may look similar at first.

---

## 2️⃣ Interfaces — The Contract Model

### 📌 Definition

An **interface** defines a **contract** (a shape + required methods) that a class or object must follow.

It answers:

> “What must this thing be able to do?”

---

### ✅ Characteristics of Interfaces

| Feature                       | Interface |
| ----------------------------- | --------- |
| Contains method signatures    | ✅         |
| Contains property definitions | ✅         |
| Contains implementations      | ❌         |
| Exists at runtime             | ❌         |
| Supports multiple inheritance | ✅         |
| Can be implemented by classes | ✅         |
| Can describe plain objects    | ✅         |

Interfaces are **compile-time only**.
They do **not exist in JavaScript output**.

---

### 🧠 Mental Model

> **Interface = capability / contract / shape**

---

### 🧪 Example — Interface as Capability

```ts
interface Animal {
    speak(): void;
}

class Dog implements Animal {
    speak() {
        console.log("Bark!");
    }
}

class Cat implements Animal {
    speak() {
        console.log("Meow!");
    }
}
```

Here:

* `Animal` does **not care** how speaking is implemented
* `Dog` and `Cat` are free to behave differently
* You can treat them uniformly

```ts
function makeAnimalSpeak(a: Animal) {
    a.speak();
}
```

---

### 📦 Interface with Objects (No Classes)

```ts
interface User {
    id: number;
    email: string;
}

const user: User = {
    id: 1,
    email: "alice@email.com"
};
```

✔ No class needed
✔ Lightweight
✔ Perfect for DTOs and API data

---

### 🧠 Where Interfaces Shine

| Scenario                    | Why                  |
| --------------------------- | -------------------- |
| API request/response typing | Shape-only           |
| Frontend props/state        | Structural typing    |
| Backend DTOs                | No runtime cost      |
| Multiple behaviors          | Multiple inheritance |
| Plugin systems              | Loose coupling       |

---

## 3️⃣ Abstract Classes — The Template Model

### 📌 Definition

An **abstract class** is a **base class** that:

* Cannot be instantiated
* Can contain **implementation**
* Can contain **abstract methods**
* Can hold **state**

It answers:

> “What is this thing, and what logic does it share?”

---

### ✅ Characteristics of Abstract Classes

| Feature                         | Abstract Class  |
| ------------------------------- | --------------- |
| Contains method implementations | ✅               |
| Contains abstract methods       | ✅               |
| Contains fields (state)         | ✅               |
| Exists at runtime               | ✅               |
| Supports inheritance            | ❌ (single only) |
| Has constructors                | ✅               |

---

### 🧠 Mental Model

> **Abstract class = shared logic + enforced behavior**

---

### 🧪 Example — Abstract Class with Shared Logic

```ts
abstract class Animal {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    move() {
        console.log(`${this.name} is moving`);
    }

    abstract speak(): void;
}
```

Subclass:

```ts
class Dog extends Animal {
    speak() {
        console.log("Bark!");
    }
}
```

✔ `move()` is shared
✔ `speak()` is mandatory
✔ `name` is protected state

---

### 📦 Template Method Pattern

```ts
abstract class ReportGenerator {
    generate(): void {
        this.fetchData();
        this.format();
        this.export();
    }

    protected abstract fetchData(): void;
    protected abstract format(): void;
    protected abstract export(): void;
}
```

Subclasses customize behavior **without changing the algorithm**.

---

## 4️⃣ `implements` vs `extends`

### `implements` → interface

```ts
class Dog implements Animal {
    speak() {}
}
```

* Class agrees to a **contract**
* No inherited code
* Multiple interfaces allowed

---

### `extends` → class or abstract class

```ts
class Dog extends Animal {}
```

* Inherits behavior
* Inherits state
* Only one base class allowed

---

### ❌ Invalid combinations

```ts
class A extends InterfaceX {} // ❌
class B implements AbstractClass {} // ❌
```

---

## 5️⃣ Interface vs Abstract Class — Direct Comparison

| Feature              | Interface          | Abstract Class        |
| -------------------- | ------------------ | --------------------- |
| Purpose              | Contract           | Template              |
| Shared logic         | ❌                  | ✅                     |
| Runtime presence     | ❌                  | ✅                     |
| Multiple inheritance | ✅                  | ❌                     |
| Fields / state       | ❌                  | ✅                     |
| Constructors         | ❌                  | ✅                     |
| Best for             | Shape / capability | Behavior / base logic |

---

## 6️⃣ Decision Guide (Real Projects)

### ✅ Use **interface** when:

* You are defining **API shapes**
* You only care about **what exists**
* You want **maximum flexibility**
* You expect **multiple implementations**
* You are working heavily in **frontend / React**

**Examples**:

* `UserDTO`
* `Props`
* `FormData`
* `Animal` capabilities

---

### ✅ Use **abstract class** when:

* You need **shared logic**
* You want **default behavior**
* You need **protected state**
* You want a **base template**

**Examples**:

* Base service class
* Repository pattern
* Domain entities
* Framework abstractions

---

## 7️⃣ Hybrid Pattern (Very Common)

You can combine both:

```ts
interface Flyable {
    fly(): void;
}

abstract class Animal {
    abstract speak(): void;
}

class Bird extends Animal implements Flyable {
    speak() {
        console.log("Chirp");
    }

    fly() {
        console.log("Flying");
    }
}
```

✔ Interface for capability
✔ Abstract class for base identity

---

## 8️⃣ Python Analogy (For You as a Python Dev)

| TypeScript     | Python              |
| -------------- | ------------------- |
| interface      | `Protocol` (typing) |
| abstract class | `abc.ABC`           |
| implements     | Inherits protocol   |
| extends        | Inherits ABC        |

TypeScript interfaces are closer to **duck typing** than Python classes.

---

## 9️⃣ Cheat Sheet

### Quick Rules

```txt
Need shared logic? → Abstract class
Need multiple inheritance? → Interface
Need runtime behavior? → Abstract class
Need just typing? → Interface
Frontend props? → Interface
Backend base service? → Abstract class
```

---

## 10️⃣ Final Takeaway

> **Interfaces define what a thing can do.**
> **Abstract classes define what a thing is and how it behaves.**

Choosing correctly leads to:

* Cleaner architecture
* Less coupling
* More reusable code
* Easier refactoring

You are thinking about this **exactly like a senior engineer would**.
