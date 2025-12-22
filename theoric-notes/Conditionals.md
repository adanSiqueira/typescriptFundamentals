# Conditionals in TypeScript

### Theory, Mental Models & Practical Examples

---

## 1. What Are Conditionals?

Conditionals control **which code path executes** based on a condition.

In TypeScript, conditionals serve **two purposes**:

1. **Runtime control flow** (same as JavaScript)
2. **Compile-time type narrowing** (TypeScript-specific)

> TypeScript conditionals don’t just control behavior —
> they **shape the types** inside each branch.

---

## 2. `if / else` — The Foundation

### Syntax

```ts
if (condition) {
    // runs if condition is true
} else {
    // runs otherwise
}
```

---

### Example

```ts
function checkAge(age: number) {
    if (age >= 18) {
        return "Adult";
    } else {
        return "Minor";
    }
}
```

---

### Type Narrowing with `if`

```ts
function printValue(value: string | number) {
    if (typeof value === "string") {
        // value is string here
        console.log(value.toUpperCase());
    } else {
        // value is number here
        console.log(value.toFixed(2));
    }
}
```

➡ **TypeScript understands control flow and narrows types automatically.**

---

## 3. `else if` — Multiple Conditions

```ts
function grade(score: number) {
    if (score >= 90) {
        return "A";
    } else if (score >= 80) {
        return "B";
    } else if (score >= 70) {
        return "C";
    } else {
        return "F";
    }
}
```

---

## 4. Truthy & Falsy Values

JavaScript (and TypeScript) treat some values as **false** in conditionals:

### Falsy Values

* `false`
* `0`
* `""`
* `null`
* `undefined`
* `NaN`

### Example

```ts
function greet(name?: string) {
    if (name) {
        console.log(`Hello, ${name}`);
    } else {
        console.log("Hello, stranger");
    }
}
```

⚠️ Be careful:

```ts
if (count) {
    // count = 0 will NOT enter here
}
```

---

## 5. Ternary Operator (`? :`)

### Syntax

```ts
condition ? valueIfTrue : valueIfFalse
```

---

### Example

```ts
const status = age >= 18 ? "Adult" : "Minor";
```

---

### With TypeScript Types

```ts
function getLabel(value: string | null) {
    return value ? value.toUpperCase() : "DEFAULT";
}
```

Use ternaries when:

* Logic is **simple**
* Improves readability

Avoid nesting ternaries excessively.

---

## 6. `switch` Statement

### When to Use `switch`

Use `switch` when:

* Comparing **one value**
* Against **many fixed options**
* Especially **strings or enums**

---

### Basic Syntax

```ts
switch (value) {
    case option1:
        break;
    case option2:
        break;
    default:
        break;
}
```

---

### Example

```ts
function getDayName(day: number) {
    switch (day) {
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        default:
            return "Unknown";
    }
}
```

---

### ⚠️ Important: `break`

Without `break`, execution **falls through**:

```ts
switch (x) {
    case 1:
        console.log("One");
    case 2:
        console.log("Two");
}
```

If `x === 1`, output is:

```
One
Two
```

---

## 7. `switch` with Enums (Very Common)

```ts
enum Role {
    Admin,
    User,
    Guest
}

function getPermissions(role: Role) {
    switch (role) {
        case Role.Admin:
            return "Full access";
        case Role.User:
            return "Limited access";
        case Role.Guest:
            return "Read-only";
        default:
            return "Unknown";
    }
}
```

Enums + switch = **clear, readable logic**

---

## 8. `switch` with Discriminated Unions (Advanced & Powerful)

This is where TypeScript shines.

### Example

```ts
type Success = { status: "success"; data: string };
type ErrorResponse = { status: "error"; message: string };

type Result = Success | ErrorResponse;
```

```ts
function handleResult(result: Result) {
    switch (result.status) {
        case "success":
            console.log(result.data);
            break;
        case "error":
            console.log(result.message);
            break;
    }
}
```

➡ TypeScript **narrows the type automatically** in each case.

---

## 9. Exhaustiveness Checking (`never`)

Ensures **all cases are handled**.

```ts
function assertNever(x: never): never {
    throw new Error("Unexpected value");
}
```

```ts
function handleResult(result: Result) {
    switch (result.status) {
        case "success":
            return result.data;
        case "error":
            return result.message;
        default:
            return assertNever(result);
    }
}
```

➡ If a new union member is added, TypeScript will **error at compile time**.

---

## 10. Conditionals with `in` Operator

Used to check for property existence.

```ts
type Dog = { bark(): void };
type Cat = { meow(): void };

function speak(animal: Dog | Cat) {
    if ("bark" in animal) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

---

## 11. Conditionals with `instanceof`

Used with **classes**, not interfaces.

```ts
class Dog {
    bark() {}
}

class Cat {
    meow() {}
}

function speak(animal: Dog | Cat) {
    if (animal instanceof Dog) {
        animal.bark();
    } else {
        animal.meow();
    }
}
```

---

## 12. Conditional (Ternary) + Type Inference

```ts
const result = isLoggedIn ? "Welcome" : null;
// inferred as: string | null
```

TypeScript **infers unions automatically**.

---

## 13. Comparison with Python

### Python

```py
if isinstance(x, str):
    ...
elif isinstance(x, int):
    ...
```

### TypeScript

```ts
if (typeof x === "string") {
    ...
} else {
    ...
}
```

Difference:

* Python: runtime only
* TypeScript: **runtime + compile-time type safety**

---

## 14. Cheat Sheet

```ts
// if / else
if (x > 10) {}

// ternary
const msg = ok ? "Yes" : "No";

// switch
switch (value) {
    case "a": break;
    default: break;
}

// typeof
if (typeof x === "string") {}

// instanceof
if (obj instanceof Class) {}

// in
if ("prop" in obj) {}
```

---

## Final Mental Model

> **Conditionals in TypeScript don’t just control execution —
> they control types.**

Well-written conditionals:

* Improve safety
* Eliminate runtime errors
* Replace fragile casting
* Make code self-documenting

---

