# Interfaces `extends`, Classes `implements` — and what about **types**?

## Short Answer (cheat version)

| Construct   | Can `extend`                   | Can `implement`    | Can be implemented by class |
| ----------- | ------------------------------ | ------------------ | --------------------------- |
| `interface` | ✅ yes                          | ❌ no               | ✅ yes                       |
| `class`     | ✅ yes (class / abstract class) | ✅ yes (interfaces) | —                           |
| `type`      | ✅ yes (via intersections)      | ❌ no               | ⚠️ indirectly               |

Now let’s explain **why** and **how**.

---

## 1. Why interfaces have `extends`

Interfaces describe **shapes**.

```ts
interface Person {
    name: string;
}

interface Employee extends Person {
    employeeId: number;
}
```

Here:

* `Employee` **inherits the structure** of `Person`
* This is **purely structural**
* No runtime code is created

> `extends` in interfaces = **shape composition**

---

## 2. Why classes have `implements`

Classes produce **runtime objects**.

```ts
interface Animal {
    speak(): void;
}

class Dog implements Animal {
    speak() {
        console.log("au au");
    }
}
```

Here:

* `implements` is a **compile-time contract**
* It forces the class to **match the interface**
* The interface **does not exist at runtime**

> `implements` = *“I promise to have this shape”*

---

## 3. Now the key question: **What about `type`?**

### 🔴 Types do **not** have `extends` or `implements` keywords

But…

### 🟢 Types can **compose** using **intersection (`&`)**

This is the **type equivalent of `extends`**.

---

## 4. Type “extension” via intersection (`&`)

```ts
type Person = {
    name: string;
};

type Employee = Person & {
    employeeId: number;
};
```

This is functionally equivalent to:

```ts
interface Employee extends Person {
    employeeId: number;
}
```

### Mental model

```
Person AND { employeeId }
```

So:

> **Types don’t extend — they combine**

---

## 5. Can a class implement a `type`?

### ✅ YES — if the type describes an object shape

```ts
type Animal = {
    speak(): void;
};

class Dog implements Animal {
    speak() {
        console.log("au au");
    }
}
```

### Important rule

A class can `implements`:

* ✅ interface
* ✅ object-shaped type
* ❌ union types
* ❌ primitives

---

## 6. What a class CANNOT implement

```ts
type Animal = Dog | Cat;

class Fox implements Animal {} // ❌ ERROR
```

Why?

Because:

* `Animal` is **one OR another**
* A class must satisfy **all requirements**
* Union ≠ contract

---

## 7. `extends` with types (generic constraint)

Types **do use `extends`**, but only in **generics**:

```ts
function logName<T extends { name: string }>(obj: T) {
    console.log(obj.name);
}
```

This means:

> `T` must have **at least** `{ name: string }`

⚠️ This is **not inheritance** — it’s a **constraint**

---

## 8. Interfaces vs Types — Extension Summary

| Feature                     | interface | type                 |
| --------------------------- | --------- | -------------------- |
| Extend another              | `extends` | `&` (intersection)   |
| Merge declarations          | ✅ yes     | ❌ no                 |
| Can represent unions        | ❌ no      | ✅ yes                |
| Can be implemented by class | ✅ yes     | ✅ (if object-shaped) |
| Preferred for contracts     | ✅ yes     | ⚠️ sometimes         |

---

## 9. When to choose each (practical rule)

### Use **interface** when:

* Designing class contracts
* Public APIs
* OOP-style hierarchies
* You expect extension

### Use **type** when:

* You need unions or intersections
* You need aliases for primitives or tuples
* Modeling complex data shapes
* Functional-style code

---

## 10. Final mental model (very important)

> **Interface = contract**
> **Type = expression**

* Interfaces are **open and extensible**
* Types are **closed and compositional**
* Classes implement **contracts**
* Types describe **values**

---

## TL;DR

```ts
// Interface
interface A { x: number }
interface B extends A { y: number }

// Type
type A = { x: number }
type B = A & { y: number }

// Class
class C implements B {
    x = 1;
    y = 2;
}
```

---
