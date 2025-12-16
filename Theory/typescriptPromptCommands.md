Below is a **complete, structured TypeScript CLI & tooling cheat sheet**, written to explain **what each command actually does**, **why it exists**, and **when you should use it** — plus the **missing commands** that matter for real-world API development.

This is not just a list; it’s a **mental map of the TypeScript toolchain**.

---

# TypeScript Tooling & Commands — Complete Cheat Sheet

---

## 1️⃣ Project Initialization (Foundation)

### Initialize `package.json`

```bash
npm init -y
```

**What it does**

* Creates `package.json`
* Defines project metadata
* Enables dependency management and scripts

**Why it matters**
TypeScript projects are **Node projects first**.
No `package.json` → no ecosystem.

---

## 2️⃣ Install TypeScript (Compiler)

### Install TypeScript locally (recommended)

```bash
npm install -D typescript
```

**What it does**

* Adds the TypeScript compiler (`tsc`) as a dev dependency

**Why local install matters**

* Ensures consistent TS version across team
* Avoids global version mismatches

> `tsc` = TypeScript Compiler

---

## 3️⃣ Create `tsconfig.json`

### Initialize TypeScript config

```bash
npx tsc --init
```

**What it does**

* Generates `tsconfig.json`
* Defines how TS compiles your code

**Key responsibilities of `tsconfig.json`**

* Target JS version
* Module system
* Strictness
* Input/output directories

**Think of it as:**

> The compiler’s brain 🧠

---

## 4️⃣ Type Definitions (`@types/*`)

### Install Node.js types

```bash
npm install -D @types/node
```

**Why this exists**
Node is written in JS → no types by default.

This provides:

* `process`
* `fs`
* `path`
* `http`

---

### Install Express types

```bash
npm install -D @types/express
```

**What it enables**

* Typed `Request` / `Response`
* Route typing
* Middleware typing

**Rule**

> If a library is JS-only, you probably need `@types/*`.

---

## 5️⃣ Running TypeScript Code (DEV)

### Install `ts-node`

```bash
npm install -D ts-node
```

**What it does**

* Executes `.ts` files directly
* Skips manual compilation

**Why use it**

* Faster development
* No `dist/` step during learning

⚠️ Not recommended for production.

---

### Run a TS file

```bash
npx ts-node src/server.ts
```

---

## 6️⃣ Development Runners (Modern)

### Install `tsx` (recommended over ts-node)

```bash
npm install -D tsx
```

**Why `tsx` is better**

* Faster
* Better ESM support
* Simpler config

### Run TS server

```bash
npx tsx src/server.ts
```

---

## 7️⃣ Build (Production Flow)

### Compile TypeScript

```bash
npx tsc
```

**What it does**

* Reads `tsconfig.json`
* Converts `.ts` → `.js`
* Outputs to `dist/` (or configured dir)

---

### Typical folder structure

```txt
src/
  server.ts
dist/
  server.js
```

---

### Run compiled JS

```bash
node dist/server.js
```

---

## 8️⃣ npm Scripts (Automation)

### Example `package.json`

```json
{
  "scripts": {
    "dev": "tsx src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

### Run scripts

```bash
npm run dev
npm run build
npm run start
```

---

## 9️⃣ Express API Setup Commands

### Install Express

```bash
npm install express
```

### Install CORS middleware

```bash
npm install cors
npm install -D @types/cors
```

---

## 🔟 Type Safety Enhancers

### Enable strict mode (IMPORTANT)

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

**Why**

* Forces explicit handling of nulls
* Prevents unsafe assumptions

---

## 1️⃣1️⃣ Linting & Formatting (Professional Setup)

### ESLint (TypeScript)

```bash
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Prettier

```bash
npm install -D prettier
```

These:

* Enforce code style
* Catch logic smells
* Improve consistency

---

## 1️⃣2️⃣ Watching Files (Auto-reload)

### TypeScript watch mode

```bash
npx tsc --watch
```

### Node watcher (with tsx)

```bash
npx tsx watch src/server.ts
```

---

## 1️⃣3️⃣ Cleaning Build Output

### Add to `.gitignore`

```gitignore
node_modules/
dist/
.env
```

**Never commit**

* `node_modules`
* Compiled output (usually)

---

## 1️⃣4️⃣ Useful Debugging Commands

### Check TS version

```bash
npx tsc --version
```

### Show resolved config

```bash
npx tsc --showConfig
```

### Explain errors

```bash
npx tsc --pretty
```

---

## 1️⃣5️⃣ Common Beginner Pitfalls

❌ Installing TS globally only
❌ Forgetting `@types/*`
❌ Running `.ts` with `node`
❌ Importing `.ts` files in prod
❌ Mixing ESM and CommonJS blindly

---

## 1️⃣6️⃣ Mental Model (IMPORTANT)

```txt
npm → dependency manager
tsc → compiler
@types → type definitions
ts-node / tsx → dev runners
node → runtime
```

---

## 1️⃣7️⃣ Minimal Learning Stack (Recommended)

```bash
npm init -y
npm install express cors
npm install -D typescript tsx @types/node @types/express @types/cors
npx tsc --init
```

---

## 1️⃣8️⃣ One-line Summary

> **TypeScript is a build-time safety layer on top of JavaScript —
> these tools are the plumbing that makes it usable.**

---
