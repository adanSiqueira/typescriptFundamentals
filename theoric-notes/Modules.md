# Modules in TypeScript (`import` / `export`)

## 1. What is a Module?

A **module** is a file that has its **own scope** and explicitly controls what it **exports** and what it **imports**.

In TypeScript (and modern JavaScript):

* **Every file is a module** if it uses `export` or `import`
* Variables, functions, classes, and types **are not global by default**
* You must explicitly share code between files

### Why modules exist

Modules solve several problems:

* Avoid **global namespace pollution**
* Improve **code organization**
* Enable **reuse**
* Make dependencies explicit
* Allow **tree-shaking** and better bundling

---

## 2. Exporting from a Module

### 2.1 Named Exports

Named exports allow exporting **multiple values per file**.

```ts
// math.ts
export function add(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export const PI = 3.14;
```

✅ Use when:

* A file exposes **multiple utilities**
* You want explicit imports

---

### 2.2 Importing Named Exports

```ts
// app.ts
import { add, subtract, PI } from "./math";

add(2, 3);
subtract(5, 2);
console.log(PI);
```

* Import names **must match exactly**
* Order does not matter

---

### 2.3 Aliasing Imports

Used to avoid name conflicts or improve readability.

```ts
import { add as sum } from "./math";

sum(1, 2);
```

---

## 3. Default Exports

A module can have **one default export**.

```ts
// logger.ts
export default function log(message: string) {
    console.log(message);
}
```

### Importing a Default Export

```ts
import log from "./logger";

log("Hello world");
```

Key differences:

* You choose the import name
* Only one default export per file

---

### When to use Default vs Named Exports

| Situation                        | Recommendation   |
| -------------------------------- | ---------------- |
| One main responsibility per file | `default export` |
| Multiple utilities/constants     | `named exports`  |
| Large shared libraries           | `named exports`  |

---

## 4. Exporting Types and Interfaces

TypeScript allows exporting **types** without affecting runtime code.

```ts
// models.ts
export interface User {
    id: number;
    name: string;
}

export type Role = "admin" | "user";
```

```ts
// service.ts
import { User, Role } from "./models";

const user: User = {
    id: 1,
    name: "Alice"
};
```

### Important

* Types and interfaces are **erased at runtime**
* Imports are only for **type checking**

---

## 5. Type-only Imports (`import type`)

Used to make intent explicit and optimize builds.

```ts
import type { User } from "./models";
```

Benefits:

* Avoids accidental runtime imports
* Helps bundlers and tooling
* Makes architecture clearer

---

## 6. Exporting Classes

```ts
// animal.ts
export class Animal {
    constructor(public name: string) {}

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}
```

```ts
// main.ts
import { Animal } from "./animal";

const dog = new Animal("Dog");
dog.speak();
```

---

## 7. Re-exporting (Barrel Files)

Used to create **clean public APIs**.

```ts
// user.ts
export interface User {
    id: number;
}
```

```ts
// auth.ts
export function login() {}
```

```ts
// index.ts
export * from "./user";
export * from "./auth";
```

Now consumers can do:

```ts
import { User, login } from "./index";
```

✅ Very common in:

* Libraries
* Domain-driven design
* Large applications

---

## 8. Exporting Everything vs Explicit Exports

```ts
export * from "./math";
```

Pros:

* Cleaner imports
* Less boilerplate

Cons:

* Less explicit
* Harder to track dependencies in large systems

---

## 9. Modules vs Namespaces (Important Distinction)

| Feature             | Modules | Namespaces |
| ------------------- | ------- | ---------- |
| File-based          | ✅       | ❌          |
| Runtime support     | ✅       | ❌          |
| Recommended today   | ✅       | ❌          |
| Used in modern apps | ✅       | Rare       |

Namespaces are mostly **legacy**.
Modern TypeScript **always prefers modules**.

---

## 10. Relative vs Absolute Imports

### Relative imports

```ts
import { add } from "../utils/math";
```

### Absolute imports (via `tsconfig.json`)

```json
{
  "compilerOptions": {
    "baseUrl": "src"
  }
}
```

```ts
import { add } from "utils/math";
```

✅ Improves readability in large projects

---

## 11. Common Real-world Module Structure

```text
src/
 ├── models/
 │    └── user.ts
 ├── services/
 │    └── auth.service.ts
 ├── utils/
 │    └── logger.ts
 └── index.ts
```

Each file:

* Has **one responsibility**
* Exports only what is needed
* Imports explicitly

---

## 12. Modules and Tree Shaking

Tree shaking removes unused code **only if**:

* You use ES Modules (`import/export`)
* You use named exports properly

```ts
import { add } from "./math";
// subtract is never bundled if unused
```

---

## 13. Common Mistakes

❌ Importing everything blindly:

```ts
import * as utils from "./utils";
```

❌ Mixing default and named imports incorrectly:

```ts
import { log } from "./logger"; // wrong if it's default
```

❌ Circular dependencies:

```ts
A imports B
B imports A
```

---

## 14. Mental Model (Very Important)

Think of each module as:

> A **black box** that explicitly declares:
>
> * What it exposes (`export`)
> * What it depends on (`import`)

This mindset scales from:

* Small scripts
* APIs
* Frontend apps
* Monorepos

---
