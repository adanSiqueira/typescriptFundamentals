<h1 align="center">TypeScript Fundamentals</h1>

<p align="center">
  <img src="https://img.shields.io/badge/TypeScript-Strict-blue?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-API-lightgrey?logo=express&logoColor=black" />
  <img src="https://img.shields.io/badge/REST-API-orange" />
  <img src="https://img.shields.io/badge/Learning-Notebook-purple" />
</p>

A **study-focused repository** dedicated to **TypeScript fundamentals**, with an emphasis on:

- Static typing concepts
- TypeScript tooling and compiler behavior
- Type-safe backend development with **Node.js + Express**
- Clear mental models for **JavaScript vs TypeScript**

This repository serves as a **personal learning notebook**, **conceptual reference**, and **sandbox** for experimenting with TypeScript in a backend/API context.

---

## 🗂️ Repository Structure

```text
typescriptFundamentals/
│
├── server.js
├── users.ts
├── example.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── .gitignore
├── Typescript-commands.txt
├── tree.txt
│
└── Theory/
    ├── genericsNotation.md
    ├── spreadOperator.md
    ├── typescript-vs-javascript.md
    ├── typescriptPromptCommands.md
    └── tree.txt
````

---

## File Overview

---

### 🔹 `server.js`

Main **Express server entry point**, responsible for:

* Application initialization
* Middleware configuration (`cors`, `express.json`)
* Route registration
* Server startup

Implemented endpoints:

| Method | Route            | Description        |
| ------ | ---------------- | ------------------ |
| GET    | `/`              | Root test endpoint |
| GET    | `/health`        | Health check       |
| GET    | `/api/users`     | Fetch all users    |
| GET    | `/api/users/:id` | Fetch user by ID   |
| POST   | `/api/users`     | Create a new user  |

This file demonstrates:

* ES module imports
* Express routing
* Separation of concerns between server and controllers

---

### 🔹 `users.ts`

Contains **route handler functions** and demonstrates **TypeScript typing in Express**.

Key concepts covered:

* `Request` and `Response` typing
* Generic typing of request parameters and body
* Interfaces as data contracts
* Mock data as a fake persistence layer
* Type-safe object creation using the spread operator

Important TypeScript patterns:

```ts
Request<Params, ResBody, ReqBody>
```

This file intentionally focuses on **type correctness**, not persistence.

---

### 🔹 `example.ts`

A **TypeScript playground file** used to demonstrate core language concepts.

Covered topics:

* Primitive types (`number`, `string`, `boolean`)
* `null` and `undefined`
* Union types
* Literal types
* Interfaces
* Function return types (`void`)
* Template literals

This file is designed to be:

* Linear
* Self-explanatory
* Beginner-friendly

---

### 🔹 `tsconfig.json`

TypeScript compiler configuration file.

Defines:

* Compilation target
* Module system
* Strictness rules
* Input/output behavior

This file represents the **compiler contract** between TypeScript and JavaScript.

---

### 🔹 `Typescript-commands.txt`

A curated list of **CLI commands used during the learning process**, including:

* Installing TypeScript
* Initializing `tsconfig`
* Running TS code
* Managing type definitions
* Running the project

Acts as a **quick reference** for tooling and workflow.

---

## Theory 

The `Theory/` directory contains **conceptual notes and cheat sheets**, written during the study process.

These files focus on **understanding**, not memorization.

---

### 📄 `typescript-vs-javascript.md`

* Conceptual comparison between JavaScript and TypeScript
* Static vs dynamic typing
* Compile-time vs runtime
* Mental models and trade-offs

---

### 📄 `genericsNotation.md`

Explains:

* The `<T>` generic syntax
* Why generics exist
* How frameworks like Express use them
* Common pitfalls for beginners

---

### 📄 `spreadOperator.md`

Covers:

* The `...` spread operator
* Object merging
* Immutability patterns
* Real usage in API payload handling

---

### 📄 `typescriptPromptCommands.md`

Documents useful **terminal commands** for:

* Inspecting project structure
* Running builds
* Navigating TypeScript projects efficiently

---

## How to Run

### Install dependencies

```bash
npm install
```

### Run the server (development)

```bash
npm run start
```

Then access:

```
http://localhost:3000
```

---

## Learning Goals of This Repository

* Understand **why TypeScript exists**
* Learn how TypeScript differs fundamentally from JavaScript
* Apply TypeScript in a **real backend scenario**
* Gain confidence with:

  * Generics
  * Interfaces
  * Compiler errors
  * Tooling and configuration
---
