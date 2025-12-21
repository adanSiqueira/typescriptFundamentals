# 1️⃣ What is an Abstract Class? (Theory)

An **abstract class** is a **base class that cannot be instantiated** directly.

Its purpose is to:

* Define **common behavior** (shared code)
* Define **mandatory behavior** (rules that subclasses must implement)

Think of it as a **blueprint**, not a finished object.

> ❌ You **cannot** create objects from an abstract class
> ✅ You **must** extend it with a concrete class

---

## Mental model

* **Interface** → *“What methods must exist”*
* **Abstract class** → *“What must exist + some code already implemented”*
* **Concrete class** → *“Real, usable implementation”*

---

# 2️⃣ Abstract Classes in TypeScript

In TypeScript, you declare an abstract class using the `abstract` keyword.

```ts
abstract class Animal {
    abstract makeSound(): void;
}
```

Key rules:

* An abstract class:

  * Can have **abstract methods**
  * Can have **concrete methods**
  * Can have **properties**
* Abstract methods:

  * Have **no implementation**
  * MUST be implemented by subclasses
* You **cannot instantiate** an abstract class

---

# 3️⃣ Simple Practical Example

## ❌ This is NOT allowed

```ts
abstract class Animal {
    abstract makeSound(): void;
}

const a = new Animal(); // ❌ Error
```

Why?

* `Animal` is incomplete
* TypeScript prevents instantiation at compile time

---

## ✅ Correct usage

```ts
abstract class Animal {
    abstract makeSound(): void;
}

class Dog extends Animal {
    makeSound(): void {
        console.log("Bark");
    }
}

const dog = new Dog(); // ✅ OK
dog.makeSound();      // Bark
```

Here:

* `Animal` defines a rule
* `Dog` fulfills the rule

---

# 4️⃣ Abstract Class with Shared Implementation

One of the **big advantages** of abstract classes over interfaces is that they can **contain logic**.

```ts
abstract class Employee {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    // Concrete method (already implemented)
    greet(): void {
        console.log(`Hello, my name is ${this.name}`);
    }

    // Abstract method (must be implemented)
    abstract calculateSalary(): number;
}
```

---

## Subclasses must implement the abstract method

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

class Contractor extends Employee {
    private hourlyRate: number;
    private hoursWorked: number;

    constructor(name: string, rate: number, hours: number) {
        super(name);
        this.hourlyRate = rate;
        this.hoursWorked = hours;
    }

    calculateSalary(): number {
        return this.hourlyRate * this.hoursWorked;
    }
}
```

---

## Usage

```ts
const emp1: Employee = new FullTimeEmployee("Alice", 5000);
const emp2: Employee = new Contractor("Bob", 50, 160);

emp1.greet(); // Hello, my name is Alice
emp2.greet(); // Hello, my name is Bob

console.log(emp1.calculateSalary()); // 5000
console.log(emp2.calculateSalary()); // 8000
```

📌 Notice:

* We type variables as `Employee`
* We work **polymorphically**
* The caller does NOT care about concrete implementations

---

# 5️⃣ Abstract Class vs Interface (Important!)

| Feature                 | Abstract Class | Interface |
| ----------------------- | -------------- | --------- |
| Can have implementation | ✅ Yes          | ❌ No      |
| Can have constructors   | ✅ Yes          | ❌ No      |
| Can define fields       | ✅ Yes          | ❌ No      |
| Multiple inheritance    | ❌ No           | ✅ Yes     |
| Used for shared logic   | ✅ Yes          | ❌ No      |
| Used as a contract      | ✅ Yes          | ✅ Yes     |

---

## When to use each?

### Use **abstract class** when:

* You want to **share logic**
* You want to enforce **base behavior**
* You control the inheritance hierarchy

### Use **interface** when:

* You only want a **contract**
* You need **multiple inheritance**
* You are defining a public API

---

# 6️⃣ Real-World Example (Backend / Frontend)

### HTTP Service example

```ts
abstract class ApiService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected buildUrl(endpoint: string): string {
        return `${this.baseUrl}/${endpoint}`;
    }

    abstract fetchData(endpoint: string): Promise<any>;
}
```

```ts
class UserService extends ApiService {
    async fetchData(endpoint: string): Promise<any> {
        const response = await fetch(this.buildUrl(endpoint));
        return response.json();
    }
}
```

This pattern is **extremely common** in:

* Angular services
* Backend service layers
* SDKs and libraries

---

# 7️⃣ Key Interview Takeaways

If asked **“What is an abstract class?”**, answer like this:

> An abstract class is a base class that cannot be instantiated and is used to define common behavior and enforce method implementation in subclasses. It can contain both implemented methods and abstract methods, unlike interfaces.

---

# 8️⃣ Summary Cheat Sheet

* Abstract classes:

  * ❌ Cannot be instantiated
  * ✅ Can contain logic
  * ✅ Can enforce implementation
* Subclasses:

  * MUST implement abstract methods
* Used for:

  * Code reuse
  * Polymorphism
  * Enforcing architecture rules

---
