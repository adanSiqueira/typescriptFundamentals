## 1️⃣ Why `super` is required

Assume this abstract class (as in the previous example):

```ts
abstract class Employee {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract calculateSalary(): number;
}
```

Now your subclass:

```ts
class FullTimeEmployee extends Employee {
    private monthlySalary: number;

    constructor(name: string, salary: number) {
        super(name);
        this.monthlySalary = salary;
    }

    calculateSalary(): number {
        return this.monthlySalary;
    }
}
```

### 🔑 Rule in TypeScript / JavaScript

> In a derived class (`extends`), **you MUST call `super()` before accessing `this`**

This is a **JavaScript runtime rule**, not just TypeScript.

❌ This is illegal:

```ts
constructor(name: string, salary: number) {
    this.name = name; // ❌ ERROR: 'this' is not allowed before super()
    super(name);
}
```

Why?

* `this` does not exist until the parent constructor runs
* `super()` initializes the base class part of the object

---

## 2️⃣ Could you do `this.name = name` *after* `super()`?

### ✔️ Yes — **if `name` is `protected` or `public`**

```ts
constructor(name: string, salary: number) {
    super(name);
    this.name = name; // ✅ allowed if 'name' is protected or public
    this.monthlySalary = salary;
}
```

But…

### ❌ No — **if `name` is `private` in `Employee`**

```ts
abstract class Employee {
    private name: string; // 👈 private

    constructor(name: string) {
        this.name = name;
    }
}
```

```ts
class FullTimeEmployee extends Employee {
    constructor(name: string, salary: number) {
        super(name);
        this.name = name; // ❌ ERROR: Property 'name' is private
    }
}
```

🔑 **Private members are only accessible inside the class where they are declared**

---

## 3️⃣ So why is `super(name)` the correct design?

### ✔️ Encapsulation

The **base class owns its state**.

```ts
abstract class Employee {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

* The parent class decides:

  * How `name` is stored
  * Whether it’s validated
  * Whether it’s transformed (e.g. trimming, formatting)

If subclasses set `name` directly, you lose control.

---

## 4️⃣ Real-world reason: validation & invariants

Imagine this instead:

```ts
abstract class Employee {
    protected name: string;

    constructor(name: string) {
        if (name.trim().length === 0) {
            throw new Error("Name cannot be empty");
        }
        this.name = name;
    }
}
```

Now this is **guaranteed**:

* Every `Employee` has a valid name
* Subclasses cannot bypass this logic

If subclasses were allowed to do:

```ts
this.name = name;
```

They could violate invariants.

---

## 5️⃣ Comparison with Python (since you’re a Python dev)

### Python equivalent

```python
class Employee:
    def __init__(self, name):
        self._name = name

class FullTimeEmployee(Employee):
    def __init__(self, name, salary):
        super().__init__(name)
        self.salary = salary
```

Same principles:

* `super().__init__()` initializes base state
* You **don’t reassign** `_name` again
* The base class owns its data

---

## 6️⃣ When would you ever set `this.name` in the subclass?

Only if:

* The parent **does not initialize it**
* OR the property is meant to be mutable and overridden

Example:

```ts
abstract class Employee {
    protected name!: string; // declared but not initialized
}
```

Then the subclass *must* assign it:

```ts
class Intern extends Employee {
    constructor(name: string) {
        super();
        this.name = name;
    }
}
```

⚠️ This is less common and usually worse design.

---

## 7️⃣ Final verdict (best practice)

### ✅ Best practice

* Let the **parent constructor initialize its own fields**
* Pass required values via `super(...)`
* Keep fields `protected` or `private` as needed

### ❌ Avoid

* Reassigning parent fields in subclasses
* Accessing `this` before `super()`

---

## One-sentence interview answer

> You must call `super()` before using `this` in a subclass, and setting parent properties directly is either illegal (if private) or poor design, because the base class should control its own initialization.

---

If you want next, we can:

* Refactor your `Employee` hierarchy to be **100% idiomatic**
* Compare **protected vs private in inheritance-heavy designs**
* Show how frameworks (Angular / NestJS) rely on this pattern

Just say the word 👌
