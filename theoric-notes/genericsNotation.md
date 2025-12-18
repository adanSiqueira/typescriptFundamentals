# 1️⃣ What is the `< >` notation?

That notation is **generics**.

> **Generics let you parameterize types — like functions that receive types instead of values.**

### Simple example (language-agnostic idea)

```ts
function identity<T>(value: T): T {
  return value;
}
```

Here:

* `T` is a **type variable**
* The function works for *any type*, but keeps type safety

---

## In Express: `Request<...>`

Express defines `Request` as a **generic type**:

```ts
Request<Params, ResBody, ReqBody, ReqQuery>
```

Each `< >` slot tells TypeScript **what shape that part of the request has**.

---

# 2️⃣ What do the generic slots in `Request<>` mean?

The full signature is:

```ts
Request<
  Params = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = ParsedQs
>
```

So:

| Position     | Meaning                      |
| ------------ | ---------------------------- |
| `<Params>`   | URL params (`/users/:id`)    |
| `<ResBody>`  | Response body (rarely used)  |
| `<ReqBody>`  | Request body (`POST`, `PUT`) |
| `<ReqQuery>` | Query string (`?page=1`)     |

---

# 3️⃣ Why `Request<{}, {}, UserData>` in `createUser`?

Let’s look at your function:

```ts
export function createUser(
  req: Request<{}, {}, UserData>,
  res: Response
): void {
```

You are saying:

| Slot       | Value      | Meaning                    |
| ---------- | ---------- | -------------------------- |
| `Params`   | `{}`       | No route params            |
| `ResBody`  | `{}`       | Not typing response        |
| `ReqBody`  | `UserData` | Body must match `UserData` |
| `ReqQuery` | *default*  | Any query params           |

---

## Why not just `Request<UserData>`?

Because **the first generic slot is NOT the body**.

This is a very common beginner mistake.

```ts
Request<UserData> // ❌ means "UserData is URL params"
```

Which would be wrong.

---

## Why `{}` for the first two slots?

Because:

* `createUser` route probably looks like `/users`
* No `:id` in URL
* You don’t care about response typing here

So you explicitly say:

```ts
Params = {}
ResBody = {}
ReqBody = UserData
```

---

# 4️⃣ Why is this useful?

Because now this becomes a **compile-time contract**:

```ts
req.body.age = "30"; // ❌ Type error
req.body.email = 123; // ❌ Type error
```

Without generics:

```ts
req.body // any
```

Which defeats the purpose of TypeScript.

---

# 5️⃣ `getUserById` — why `Request<{ id: string }>`?

```ts
export function getUserById(
  req: Request<{ id: string }>,
  res: Response
): void {}
```

You are typing:

```ts
req.params.id // string
```

If you tried:

```ts
req.params.age
```

TypeScript would error.

---

# 6️⃣ Visual Mapping (Very Important)

### Route

```ts
GET /users/:id
```

### TypeScript

```ts
Request<{ id: string }>
```

### Runtime

```ts
req.params = { id: "123" }
```

---

# 7️⃣ Why Not Type `Response<>`?

You *can*, but most people don’t because:

* Express responses are usually flexible
* You often return different shapes (`200`, `404`, `400`)
* It adds complexity with little benefit

But it’s possible:

```ts
Response<UserData | ErrorResponse>
```

---

# 8️⃣ Professional Best Practice (What Seniors Do)

### Minimum useful typing

```ts
Request<{ id: string }, {}, UserData>
```

### Avoid

```ts
Request<any, any, any>
```

### Prefer explicit over magic

---

# 9️⃣ Key Mental Model (This Is the Click Moment)

> **`Request<>` generics describe the *shape of HTTP*, not your function.**

Each `< >` slot maps directly to a part of the HTTP request:

* URL
* Body
* Query

---

## TL;DR

### `< >` = Generics (types as parameters)

### `Request<{}, {}, UserData>` means:

```
No URL params
No typed response
Body = UserData
```

### You use `{}` because:

* Those positions exist
* You don’t need them
* You still want to reach the body slot

---