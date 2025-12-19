# Advanced Function Types — Theory Review (TypeScript)

This document reviews **advanced function-related concepts in TypeScript**, focusing on how the language models function behavior **at compile time**, while preserving JavaScript runtime semantics.

Topics covered:

* Function typing fundamentals
* Rest parameters (variadic functions)
* Optional parameters
* Function type signatures
* Callback functions
* Higher-order functions
* Function overloading
* Runtime type narrowing
* TypeScript vs JavaScript vs Python mental models

---

## 1. Functions in TypeScript: Core Philosophy

TypeScript is:

> **JavaScript with a static type system layered on top**

This means:

* Functions behave exactly like JavaScript at runtime
* Types exist only at compile time
* TypeScript never changes how functions execute

So every TypeScript function must be:

* Valid JavaScript syntax
* Type-correct according to the compiler

---

## 2. Function Typing Fundamentals

### Basic function typing

```ts
function add(x: number, y: number): number {
    return x + y;
}
```

Key points:

* Parameters have explicit types
* Return type is explicit
* TypeScript checks:

  * Argument types
  * Return value correctness

TypeScript can *infer* return types, but explicit typing is recommended in study code.

---

## 3. Optional Parameters (`?`)

Optional parameters allow functions to be called with fewer arguments.

```ts
function makeName(first: string, last: string, middle?: string): string {
    if (middle) {
        return `${first} ${middle} ${last}`;
    }
    return `${first} ${last}`;
}
```

### Theory

* `middle?: string` is equivalent to:

  ```ts
  middle: string | undefined
  ```
* Optional parameters must:

  * Come **after required ones**
  * Be checked before use

### Mental model (Python)

Python:

```py
def make_name(first, last, middle=None):
```

TypeScript:

```ts
middle?: string
```

---

## 4. Function Type Signatures

Functions are **first-class values** in JavaScript and TypeScript.

You can describe a function’s *shape* using a type signature:

```ts
(a: number, b: number) => number
```

Meaning:

* Accepts two numbers
* Returns a number

This is essential for:

* Callbacks
* Higher-order functions
* APIs and libraries

---

## 5. Callback Functions

A **callback function** is a function passed as an argument to another function.

```ts
function callFunc(
    func: (a: string, b: string) => string,
    p1: string,
    p2: string
) {
    func(p1, p2);
}
```

### Why callbacks exist

Callbacks allow:

* Inversion of control
* Custom behavior injection
* Reusability

### Real-world examples

* Event handlers
* Array methods (`map`, `filter`)
* Async APIs
* React props

---

## 6. Higher-Order Functions

A **higher-order function** is a function that:

* Receives functions
* Returns functions
* Or both

```ts
function applyFunc(
    funcs: ((a: number, b: number) => number)[],
    values: [number, number][]
): number[] { ... }
```

### Why this matters

Higher-order functions enable:

* Functional programming
* Composition
* Declarative logic

This concept is foundational for:

* React
* Redux
* Functional utilities
* Async flows

---

## 7. Rest Parameters (`...`)

Rest parameters allow functions to accept **variable numbers of arguments**.

```ts
function sum(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b, 0);
}
```

### Theory

* `...numbers` collects arguments into an array
* Always typed as `Type[]`
* Must be the **last parameter**

### Runtime behavior

At runtime:

```ts
sum(1, 2, 3) → numbers = [1, 2, 3]
```

---

## 8. Function Overloading (TypeScript-Specific)

### What overloading is

Function overloading allows:

* Multiple call signatures
* A single runtime implementation

```ts
function getLength(value: string): number;
function getLength(value: string[]): number;
function getLength(value: unknown): number {
    return typeof value === "string"
        ? value.length
        : Array.isArray(value)
        ? value.length
        : 0;
}
```

### Critical rule

> **Overloads exist only at compile time**

At runtime:

* There is only ONE function
* TypeScript removes overloads during compilation

---

## 9. Why Overloads Exist (and When to Use Them)

Use overloads when:

* Input types differ
* Behavior differs per type
* Return type depends on input
* You want precise IntelliSense

Avoid overloads when:

* Union types are sufficient
* Behavior is identical

---

## 10. Runtime Type Narrowing

Because TypeScript types disappear at runtime, you must **narrow types manually**.

Common techniques:

### `typeof`

```ts
typeof value === "string"
```

### `Array.isArray`

```ts
Array.isArray(value)
```

### `instanceof`

```ts
value instanceof Date
```

This bridges:

* Static typing
* Dynamic runtime checks

---

## 11. Overloads vs Union Types

### Union-based approach

```ts
function f(value: string | number): number {
    return value.toString().length;
}
```

### Overload-based approach

```ts
function f(value: string): number;
function f(value: number): number;
function f(value: string | number): number {
    return value.toString().length;
}
```

### Key difference

* Overloads improve **API clarity**
* Unions improve **implementation simplicity**

---

## 12. Comparison with Python

| Concept         | Python        | TypeScript                 |
| --------------- | ------------- | -------------------------- |
| Optional params | `param=None`  | `param?: Type`             |
| Function typing | Runtime hints | Compile-time enforced      |
| Variadic args   | `*args`       | `...args: Type[]`          |
| Overloading     | Manual checks | Native overload signatures |
| Type safety     | Runtime       | Compile-time               |

---

## 13. Why This Matters for Frontend Development

These concepts are foundational for:

* React props typing
* Event handlers
* Hooks (`useCallback`, `useMemo`)
* State management
* Component APIs
* Library design

---

## Final Mental Model

> TypeScript functions are **JavaScript functions with compile-time contracts**.

* Contracts help you
* They disappear at runtime
* The developer is still responsible for runtime safety

---
