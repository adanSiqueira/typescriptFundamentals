Below is a **didactic, interview-ready cheat sheet** on **Optional Chaining (`?.`)** and the **Non-Null Assertion / Bang Operator (`!`)**, with **clear mental models, rules, and practical examples**.
This is written exactly in the style of study material you’ve been building.

---

# Optional Chaining (`?.`) and Non-Null Assertion (`!`) — Cheat Sheet

## 1️⃣ Optional Chaining (`?.`)

### 📌 Definition

Optional chaining allows you to **safely access properties, methods, or array elements** of a value that **might be `null` or `undefined`**, without throwing a runtime error.

If the value on the left is `null` or `undefined`, the expression **short-circuits** and returns `undefined`.

---

### ❌ Without optional chaining (unsafe)

```ts
const user = undefined;

// Runtime error ❌
console.log(user.name);
```

---

### ✅ With optional chaining (safe)

```ts
const user = undefined;

console.log(user?.name); // undefined
```

No crash. No exception.

---

## 2️⃣ How Optional Chaining Works (Mental Model)

```ts
a?.b
```

Means:

> “If `a` exists, access `b`. Otherwise, return `undefined`.”

Equivalent to:

```ts
a === null || a === undefined ? undefined : a.b
```

---

## 3️⃣ Common Use Cases

### 🔹 Object properties

```ts
interface User {
    name: string;
    address?: {
        city: string;
    };
}

const user: User = { name: "Alice" };

console.log(user.address?.city); // undefined
```

---

### 🔹 Method calls

```ts
const logger = {
    log: (msg: string) => console.log(msg)
};

logger.log?.("Hello"); // Works

const emptyLogger = {};

emptyLogger.log?.("Hello"); // No error, nothing happens
```

---

### 🔹 Arrays

```ts
const users: string[] | undefined = undefined;

console.log(users?.[0]); // undefined
```

---

### 🔹 Chained access (very common in APIs)

```ts
const response = {
    data: {
        user: {
            profile: {
                email: "test@email.com"
            }
        }
    }
};

console.log(response?.data?.user?.profile?.email);
```

---

## 4️⃣ Optional Chaining vs Logical AND (`&&`)

### Before (old pattern)

```ts
const email = user && user.profile && user.profile.email;
```

### After (clean & readable)

```ts
const email = user?.profile?.email;
```

---

## 5️⃣ Limitations of Optional Chaining

🚫 You **cannot assign** using optional chaining:

```ts
user?.name = "Bob"; // ❌ Error
```

🚫 Only works for:

* Property access
* Method calls
* Array access

---

---

## 6️⃣ Non-Null Assertion Operator (`!`)

### 📌 Definition

The bang operator tells TypeScript:

> “I am sure this value is NOT `null` or `undefined`.”

It **silences compiler warnings**, but **does not add runtime safety**.

---

### Example

```ts
let username: string | null = "Alice";

// TypeScript error ❌
// console.log(username.toUpperCase());

console.log(username!.toUpperCase()); // ✅ OK
```

---

## 7️⃣ Mental Model for `!`

```ts
value!
```

Means:

> “Trust me — this value exists.”

⚠️ If you’re wrong → runtime crash.

---

## 8️⃣ Common Real-World Usage

### 🔹 DOM access (very common)

```ts
const button = document.getElementById("submit-btn")!;

button.addEventListener("click", () => {
    console.log("Clicked");
});
```

Why this is used:

* The element **exists in HTML**
* TypeScript cannot prove it

---

### 🔹 After validation

```ts
function processUser(user?: { name: string }) {
    if (!user) return;

    console.log(user!.name); // Safe after guard
}
```

---

## 9️⃣ `!` vs Optional Chaining

| Feature                    | `?.`  | `!`               |
| -------------------------- | ----- | ----------------- |
| Prevents runtime errors    | ✅ Yes | ❌ No              |
| Returns `undefined` safely | ✅ Yes | ❌ No              |
| Silences TypeScript        | ❌     | ✅                 |
| Recommended by default     | ✅     | ❌ (use carefully) |

---

## 🔟 Combining Both (Advanced)

```ts
interface User {
    profile?: {
        email?: string;
    };
}

const user: User = {};

const email = user.profile?.email ?? "No email available";
```

✔ Safe
✔ Expressive
✔ Production-ready

---

## ⚠️ When NOT to use `!`

❌ When handling:

* API responses
* User input
* External data
* Optional properties

In these cases, **prefer optional chaining or type guards**.

---

## ✅ Best Practices Summary

✔ Prefer `?.` over `!`
✔ Use `!` only when you are 100% sure
✔ Optional chaining improves readability
✔ `!` improves developer experience but reduces safety

---