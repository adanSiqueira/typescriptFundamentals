Below is a **practical + theoretical cheat sheet** focused on **`any`**, **`unknown`**, and **type casting (type assertions)** in TypeScript.
This is written with a **strong mental-model focus**, exactly the kind of thing you want when transitioning from Python to **TypeScript for frontend work**.

---

# TypeScript Cheat Sheet

## `any`, `unknown` & Type Casting (Type Assertions)

---

## 1️⃣ `any`

### What it is (theory)

`any` **turns off the TypeScript type system** for that value.

* TypeScript stops checking:

  * Property access
  * Function calls
  * Assignments
* The value behaves like **plain JavaScript**

Think of `any` as:

> “I give up, trust me.”

---

### Example

```ts
let value: any;

value = 10;
value = "hello";
value = true;

value.toUpperCase(); // ✅ No error (but may crash at runtime)
value.foo.bar.baz(); // ✅ Allowed (very dangerous)
```

---

### Why `any` is dangerous

```ts
let user: any = { name: "Alice" };

console.log(user.age.toFixed()); // ❌ Runtime error (age is undefined)
```

TypeScript **cannot protect you**.

---

### When `any` is acceptable (rare cases)

* Migrating legacy JavaScript code
* Temporary typing during refactors
* Third-party libraries with no types (last resort)

---

### Rule of thumb

> **If you use `any`, you opt out of TypeScript’s benefits.**

---

## 2️⃣ `unknown`

### What it is (theory)

`unknown` is the **type-safe version of `any`**.

* You can assign **anything** to `unknown`
* You **cannot use it** until you **narrow the type**

Think of `unknown` as:

> “I don’t know what this is *yet*, but I’ll check before using it.”

---

### Example

```ts
let value: unknown;

value = 10;
value = "hello";
value = true;

// value.toUpperCase(); ❌ Error
```

TypeScript **forces validation**.

---

### Type narrowing with `unknown`

```ts
if (typeof value === "string") {
  console.log(value.toUpperCase()); // ✅ Safe
}
```

---

### Another example (API response)

```ts
function parseResponse(data: unknown) {
  if (typeof data === "object" && data !== null) {
    console.log("Valid object");
  }
}
```

---

### Why `unknown` is good

* Prevents unsafe assumptions
* Forces runtime checks
* Perfect for:

  * API responses
  * `try/catch` errors
  * External data

---

### Comparison: `any` vs `unknown`

| Feature            | `any` | `unknown` |
| ------------------ | ----- | --------- |
| Assign anything    | ✅     | ✅         |
| Use without checks | ✅     | ❌         |
| Type safety        | ❌     | ✅         |
| Recommended        | ❌     | ✅         |

---

## 3️⃣ Type Casting (Type Assertions)

### What it is (theory)

Type casting (called **type assertion** in TS) tells the compiler:

> “I know more about this value than you do.”

⚠️ **No runtime conversion happens**
This is **compile-time only**.

---

### Syntax 1: `as` (recommended)

```ts
const input = document.getElementById("username") as HTMLInputElement;

console.log(input.value);
```

---

### Syntax 2: angle brackets (avoid in JSX)

```ts
const input = <HTMLInputElement>document.getElementById("username");
```

❌ Not allowed in `.tsx` (conflicts with JSX)

---

## 4️⃣ Casting `unknown` (safe pattern)

```ts
let value: unknown = "hello";

const str = value as string; // ⚠️ No safety check
console.log(str.toUpperCase());
```

Better:

```ts
if (typeof value === "string") {
  console.log(value.toUpperCase());
}
```

---

## 5️⃣ Casting does NOT make things safe

```ts
const value: unknown = 10;

const str = value as string;
console.log(str.toUpperCase()); // ❌ Runtime error
```

TypeScript **trusts you blindly**.

---

## 6️⃣ Real-world example (Express request body)

```ts
app.post("/users", (req, res) => {
  const body = req.body as { name: string; age: number };

  res.json(body.name);
});
```

⚠️ This compiles, but:

* If the client sends invalid data → runtime error

---

### Safer alternative (validation)

```ts
function isUser(data: unknown): data is { name: string; age: number } {
  return (
    typeof data === "object" &&
    data !== null &&
    "name" in data &&
    "age" in data
  );
}
```

```ts
if (isUser(req.body)) {
  console.log(req.body.name);
}
```

---

## 7️⃣ `unknown` + `never` (advanced)

```ts
function fail(message: string): never {
  throw new Error(message);
}

function handle(value: unknown) {
  if (typeof value === "string") return;
  if (typeof value === "number") return;

  return fail("Unexpected type");
}
```

---

## 8️⃣ Summary Table

| Feature        | `any`  | `unknown`     | Type Cast       |
| -------------- | ------ | ------------- | --------------- |
| Type safety    | ❌      | ✅             | ❌               |
| Runtime checks | ❌      | Required      | ❌               |
| Compiler trust | Total  | None          | Total           |
| Use cases      | Legacy | External data | DOM / narrowing |

---

## Golden Rules (important)

1. **Prefer `unknown` over `any`**
2. **Validate before casting**
3. **Type assertions don’t fix bad data**
4. **`any` = turning TypeScript off**

---

## Mental model (final)

* `any` → *“Trust me blindly”*
* `unknown` → *“Prove it first”*
* Type cast → *“I promise this is correct”*


