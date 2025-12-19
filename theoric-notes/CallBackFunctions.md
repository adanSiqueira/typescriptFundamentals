What a callback *is* (theory)

A **callback** is:

> A function passed as a value to another function, to be **invoked later**, **conditionally**, or **by another system**.

Callbacks are useful when:

* The **caller does not control when** the function runs
* The **callee should be generic**
* The **behavior varies**
* The execution is **async**
* You want **inversion of control**

## When callbacks ACTUALLY make sense

Now let’s look at **real scenarios**.

---

### ✅ 1. Callbacks for behavior injection (Strategy pattern)

```ts
function formatUser(
    formatter: (name: string) => string,
    name: string
) {
    return formatter(name);
}

const upper = (n: string) => n.toUpperCase();
const lower = (n: string) => n.toLowerCase();

formatUser(upper, "Alice"); // "ALICE"
formatUser(lower, "Alice"); // "alice"
```

✔ Same function
✔ Different behaviors
✔ Callback adds real value

---

### ✅ 2. Callbacks for conditional execution

```ts
function validateAndRun(
    value: string,
    onValid: () => void,
    onInvalid: () => void
) {
    if (value.length > 0) {
        onValid();
    } else {
        onInvalid();
    }
}
```

✔ Logic is separated
✔ Caller decides behavior
✔ Decoupled design

---

### ✅ 3. Callbacks for async operations (classic JS use case)

```ts
function fetchData(callback: (data: string) => void) {
    setTimeout(() => {
        callback("API response");
    }, 1000);
}

fetchData(data => console.log(data));
```

✔ Caller doesn’t control execution time
✔ Callback is essential

---

### ✅ 4. Framework-driven callbacks (Express, React, etc.)

```ts
app.get("/users", (req, res) => {
    res.json(users);
});
```

You don’t call this function.
Express does.

✔ Inversion of control
✔ Framework owns execution

---

### ✅ 5. Callbacks for reusable pipelines

```ts
function processArray(
    arr: number[],
    transformer: (n: number) => number
) {
    return arr.map(transformer);
}

processArray([1, 2, 3], n => n * 2);
processArray([1, 2, 3], Math.sqrt);
```

✔ Generic logic
✔ Custom behavior

---

##  Example

Here’s a **example** that actually adds value:

```ts
function callFunc(
    func: (f: string, l: string, m?: string) => string,
    param1: string,
    param2: string
) {
    console.log("Calling function...");
    const result = func(param1, param2);
    console.log("Result:", result);
    return result;
}
```

It demonstrates:
✔ Logging
✔ Centralized behavior
✔ Reusable wrapper

---

##  Architectural rule of thumb

| Use callbacks when           | Avoid callbacks when       |
| ---------------------------- | -------------------------- |
| Execution timing is external | You just forward arguments |
| Behavior must vary           | One fixed behavior         |
| Async or events              | Simple synchronous call    |
| Framework-controlled         | No abstraction gained      |
| Inversion of control         | No decoupling              |

---
