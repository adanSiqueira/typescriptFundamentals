// =======================
// ENUMS
// =======================

/*
Enum is a TypeScript feature that allows you to define
a fixed set of named constants.

By default:
- Enum values are numeric
- The first value starts at 0
- Each next value increments by 1
*/

enum Size {
    Small,   // 0
    Medium,  // 1
    Large    // 2
}

/*
Enums can also have explicitly assigned numeric values.
This is useful when:
- Values must match database records
- Values must match external APIs
- You want to control serialization
*/

enum SizeNumbered {
    Small = 1,
    Medium = 5,
    Large = 10
}

/*
`mySize` can only hold values that belong to the `Size` enum.
This prevents invalid assignments at compile time.
*/

var mySize: Size = Size.Medium;

// =======================
// UNKNOWN TYPE
// =======================

/*
`unknown` represents a value whose type is not known yet.

Key rules:
- You CANNOT use the value directly
- You MUST narrow the type before performing operations
- It is safer than `any`
*/

let x: unknown = 0;

/*
Type narrowing using `typeof`:
If TypeScript can prove the type inside a block,
operations become allowed.
*/

if (typeof x === "number") {
    // Safe: x is guaranteed to be a number here
    const result = x + 1;
}

if (typeof x === "string") {
    // Safe: x is guaranteed to be a string here
    const result = x.toUpperCase();
}

/*
Without type checks, the following would be illegal:
x + 1
x.toUpperCase()
*/

// =======================
// TYPE CASTING (TYPE ASSERTION)
// =======================

/*
Type casting tells TypeScript:
"Trust me, I know what this value really is."

This does NOT change the runtime value.
It only affects the compiler's understanding.
*/

let y: unknown = 1;

/*
Here we assert that `y` is a number.
TypeScript allows numeric operations after the assertion.
*/

const result = (y as number) + 2;

/*
⚠️ Warning:
Type assertions are unsafe if you lie to the compiler.
This can cause runtime errors.
*/

// =======================
// ANY TYPE (UNSAFE)
// =======================

/*
`any` disables type checking completely.

Rules:
- Any operation is allowed
- No compiler errors
- Maximum flexibility, minimum safety
*/

function processFeedback(input: any): void {
    // TypeScript allows this without any checks
    console.log(`Processing feedback: ${input}`);

    // This is dangerous in real applications
    // because invalid operations may crash at runtime
}

/*
All calls below compile and run,
even if the input type is unexpected.
*/

processFeedback("This is a great product!");    // Works
processFeedback(42);                            // Works
processFeedback({ rating: 5, comment: "Excellent!" }); // Works

// =======================
// UNKNOWN TYPE IN FUNCTION PARAMETERS (SAFE)
// =======================

/*
Using `unknown` forces explicit type checks.
This makes the function safer and self-documented.
*/

function processFeedback2(input: unknown): void {
    if (typeof input === "string") {
        // Safe string handling
        console.log(`Processing text: ${input}`);
    } else if (typeof input === "number") {
        // Safe number handling
        console.log(`Processing rating: ${input}`);
    }
    // All other types are ignored (no operation performed)
}

/*
This ensures type-safe behavior:
- Correct types are handled
- Unsupported types do not crash the application
*/

processFeedback2("This is a great product!");     // Correctly identified as string
processFeedback2(42);                             // Correctly identified as number
processFeedback2({ rating: 5, comment: "Excellent!" }); // Object → ignored
processFeedback2(new Blob());                     // Unsupported → ignored
