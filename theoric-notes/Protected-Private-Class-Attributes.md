# `private` vs `protected` in TypeScript (Theory + Practice)

## 1️⃣ The Big Picture

In TypeScript, **access modifiers** control **where a class member can be accessed from**.

The main ones are:

| Modifier    | Accessible from                  |
| ----------- | -------------------------------- |
| `public`    | Anywhere                         |
| `private`   | Only inside the same class       |
| `protected` | The class **and its subclasses** |

> These rules are enforced **at compile time only**.

---

## 2️⃣ `private`: Class-only access

### Theory

A `private` member:

* Can only be accessed **inside the class that declares it**
* Is **NOT accessible** from:

  * Subclasses
  * Instances
  * External code

This enforces **strong encapsulation**.

### Practical example

```ts
class Person {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): void {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Employee extends Person {
    showName() {
        // ❌ Error: Property 'name' is private
        // console.log(this.name);
    }
}

const p = new Person("Alice");
// ❌ Error
// console.log(p.name);
```

### Use case for `private`

* Internal state
* Sensitive data
* Implementation details
* Fields that should NEVER be touched or overridden

---

## 3️⃣ `protected`: Class + subclass access

### Theory

A `protected` member:

* Is accessible inside:

  * The declaring class
  * Any subclass
* Is NOT accessible from:

  * Instances
  * External code

This allows **controlled inheritance**.

### Practical example

```ts
class Person {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}

class Employee extends Person {
    greet(): void {
        // ✅ Allowed
        console.log(`Hello, my name is ${this.name}`);
    }
}

const e = new Employee("Bob");
// ❌ Error
// console.log(e.name);
```

### Use case for `protected`

* Base classes
* Framework-level classes
* Template methods
* Fields meant to be customized or extended

---

## 4️⃣ Side-by-side comparison

```ts
class Example {
    private secret = "hidden";
    protected semiSecret = "inheritable";
    public open = "anyone can access";
}
```

| Access location | `private` | `protected` | `public` |
| --------------- | --------- | ----------- | -------- |
| Same class      | ✅         | ✅           | ✅        |
| Subclass        | ❌         | ✅           | ✅        |
| Instance        | ❌         | ❌           | ✅        |
| External code   | ❌         | ❌           | ✅        |

---

## 5️⃣ Why `protected` exists (conceptual)

`protected` exists because:

> Subclasses are part of the **internal design**, not the public API.

It allows:

* Safe reuse of logic
* Customization without breaking encapsulation
* Framework-style extension

### Example: Template pattern

```ts
abstract class Logger {
    protected format(message: string): string {
        return `[LOG]: ${message}`;
    }

    log(message: string): void {
        console.log(this.format(message));
    }
}

class FileLogger extends Logger {
    protected format(message: string): string {
        return `[FILE]: ${message}`;
    }
}
```

Here:

* `format` should not be public
* But must be overridable → `protected`

---

## 6️⃣ Compile-time vs Runtime (VERY IMPORTANT)

TypeScript access modifiers:

* Exist **only during compilation**
* Are erased in JavaScript output

This means:

```ts
private name: string;
```

Becomes:

```js
this.name = name;
```

So privacy is **developer-enforced**, not security-enforced.

---

## 7️⃣ Mapping to Python (your mental model)

| Concept   | TypeScript    | Python                |
| --------- | ------------- | --------------------- |
| Public    | `public x`    | `x`                   |
| Protected | `protected x` | `_x` (convention)     |
| Private   | `private x`   | `__x` (name mangling) |

### Key difference

* TypeScript → enforced by compiler
* Python → enforced by convention / name mangling

---

## 8️⃣ When to use each (decision guide)

### Use `private` when:

* Field is internal only
* No subclass should depend on it
* You want freedom to refactor

### Use `protected` when:

* Designing base classes
* Expecting inheritance
* Supporting framework extension

### Avoid overusing either:

* Especially in frontend models
* Prefer composition over inheritance

---

## 9️⃣ Final mental model

> `private` = “Only me”
> `protected` = “Me and my children”
> `public` = “Everyone”

---
