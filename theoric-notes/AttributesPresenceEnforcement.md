## 1. Default Rule (Your intuition is mostly right)

When you define a **class** or an **interface**, **all declared properties are required** **by default**.

### Interface example

```ts
interface User {
    name: string;
    age: number;
}
```

❌ Invalid:

```ts
const u: User = { name: "Alice" };
// Error: Property 'age' is missing
```

✅ Valid:

```ts
const u: User = { name: "Alice", age: 30 };
```

This is **structural typing**:

> “If you say something is a `User`, it must look exactly like a `User`.”

---

## 2. How to Make Properties NOT Mandatory (Important Exceptions)

### 🔹 1. Optional properties (`?`) — **most common**

```ts
interface User {
    name: string;
    age?: number;
}
```

Now:

```ts
const u1: User = { name: "Alice" };        // ✅
const u2: User = { name: "Bob", age: 30 }; // ✅
```

👉 `?` means:

```ts
age: number | undefined
```

---

### 🔹 2. Union with `undefined` or `null`

```ts
interface User {
    name: string;
    age: number | undefined;
}
```

⚠️ Subtle but important:

```ts
const u: User = { name: "Alice" };
// ❌ ERROR — property is missing
```

You **must provide the property**, even if it’s `undefined`:

```ts
const u: User = { name: "Alice", age: undefined }; // ✅
```

📌 **Optional (`?`) ≠ union with undefined**

---

### 🔹 3. Using `any` or `unknown`

```ts
interface User {
    name: string;
    meta: any;
}
```

You still must provide `meta`:

```ts
const u: User = { name: "Alice", meta: {} }; // ✅
```

But its **shape is not enforced**.

➡ `any` and `unknown` **do not remove mandatory presence**, only **type safety**.

---

### 🔹 4. Index signatures (dynamic properties)

```ts
interface User {
    name: string;
    [key: string]: any;
}
```

Allows extra properties:

```ts
const u: User = {
    name: "Alice",
    age: 30,
    role: "admin"
};
```

But `name` is **still mandatory**.

---

## 3. Classes: Similar, but with constructor rules

### Class example

```ts
class User {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

Instantiation:

```ts
new User("Alice", 30); // ✅
new User("Alice");    // ❌
```

### Optional class properties

```ts
class User {
    name: string;
    age?: number;
}
```

Now:

```ts
const u = new User();
u.name = "Alice"; // still required logically, but not enforced at construction
```

⚠️ Classes enforce **constructor rules**, not object literal rules.

---

## 4. Interfaces vs Classes (Key Difference Here)

| Feature                          | Interface | Class |
| -------------------------------- | --------- | ----- |
| Enforces shape at assignment     | ✅         | ❌     |
| Requires properties immediately  | ✅         | ❌     |
| Can exist without implementation | ✅         | ❌     |
| Constructor logic                | ❌         | ✅     |

### Interface = **contract**

```ts
const u: User = { name: "Alice" }; // checked immediately
```

### Class = **behavior + state**

```ts
const u = new User(); // properties can be assigned later
```

---

## 5. Why `any` and `unknown` Don’t Make Properties Optional

This is a **very common misconception**:

❌ Wrong assumption:

> “If I use `any`, I don’t need to pass the property”

✅ Reality:

```ts
interface Test {
    x: any;
}

const t: Test = {}; // ❌ ERROR — x is missing
```

`any` only disables **type checking**, not **presence checking**.

---

## 6. Summary (Very Important)

### ✔️ Mandatory by default

* Interface properties
* Class properties (logically, via constructor)

### ❌ Not mandatory only if:

* Marked with `?`
* Provided via constructor logic later
* Added dynamically (rare / unsafe)

### ⚠️ `any` / `unknown`

* **Do NOT make properties optional**
* Only remove type safety

---

## 7. One-Line Rule to Remember

> **TypeScript enforces presence unless you explicitly say “this might not exist” (`?`).**

---
