# `[]` vs `<>` in TypeScript

## High-level difference

| Notation | Meaning                 | Type system concept |
| -------- | ----------------------- | ------------------- |
| `[]`     | Array / tuple structure | **Container shape** |
| `<>`     | Generic type parameter  | **Type variable**   |

They solve **completely different problems**.

---

## 1️⃣ `[]` — Array / Tuple notation

### What `[]` means (theory)

`[]` describes:

* A **collection**
* Indexed by number
* With a known element type (array) or fixed positions (tuple)

It answers:

> “What is inside this collection?”

---

### Examples — Arrays

```ts
let numbers: number[] = [1, 2, 3];
let users: User[] = [];
```

Meaning:

> “An array whose elements are numbers / users”

---

### Examples — Tuples

```ts
let user: [number, string] = [1, "Adan"];
```

Meaning:

> “An array with exactly two positions, with different meanings”

---

### Key idea

* `[]` describes **structure**
* It is **not generic by itself**
* It’s concrete

---

## 2️⃣ `<>` — Generic type parameter notation

### What `<>` means (theory)

`<>` introduces a **type variable** — a placeholder for a type.

It answers:

> “What type will be supplied later?”

---

### Example — Generic type

```ts
Array<number>
Promise<string>
```

Here:

* `Array<T>`
* `Promise<T>`

`T` is a **generic parameter**, supplied using `<>`.

---

### Example — Generic function

```ts
function identity<T>(value: T): T {
  return value;
}
```

Usage:

```ts
identity<number>(10);
identity("hello"); // inferred
```

---

### Example — Generic interface

```ts
interface ApiResponse<T> {
  data: T;
  status: number;
}
```

Usage:

```ts
ApiResponse<User>
ApiResponse<User[]>
```

---

### Key idea

* `<>` introduces **abstraction**
* The type is not known until usage
* This is compile-time only

---

## 3️⃣ How they work together (important)

You will often see **both** used together:

```ts
Array<User>
User[]
Promise<User[]>
```

Example:

```ts
Promise<Array<User>>
```

Meaning:

> “A promise that resolves to an array of users”

---

## 4️⃣ Why `number[]` vs `Array<number>` exists

They are equivalent:

```ts
number[] === Array<number>
```

Difference:

* `[]` → concise syntax
* `<>` → generic syntax

Choose based on **clarity**.

---

## 5️⃣ `<>` is NOT JSX here (React note)

In `.ts` files:

```ts
function identity<T>(x: T): T {}
```

In `.tsx` files:

```tsx
const identity = <T,>(x: T): T => x;
```

Because:

* `<T>` could be mistaken for JSX

This is a **React-specific parsing issue**, not a type-system difference.

---

## 6️⃣ Mental model (this is the key)

### Ask yourself:

#### If the question is:

> “What does this collection contain?”

👉 Use `[]`

#### If the question is:

> “What type will be provided later?”

👉 Use `<>`

---

## 7️⃣ Side-by-side examples

```ts
// Array (structure)
let ids: number[];

// Generic (abstraction)
function wrap<T>(value: T): T[] {
  return [value];
}
```

```ts
// Combined
Promise<User[]>
```

---

## 8️⃣ Python analogy (for you)

### Python list

```py
list[int]
```

Equivalent to:

```ts
number[]
```

### Python generics

```py
def identity[T](x: T) -> T:
```

Equivalent to:

```ts
function identity<T>(x: T): T
```

---

## Final rule (memorize this)

> **`[]` describes a container’s contents**
> **`<>` describes a type parameter**

They are complementary, not competing.

---
