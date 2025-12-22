// =======================================================
// Union (|) and Intersection (&) Types in TypeScript
// =======================================================
//
// This file demonstrates:
// - WHY union and intersection types exist
// - HOW they work
// - WHEN to use each
// - COMMON patterns and pitfalls
//
// Mental shortcut:
//   Union (|)        → OR  → variability
//   Intersection (&) → AND → composition
//
// =======================================================



// =======================================================
// 1. UNION TYPES (|)
// =======================================================
//
// A union type means:
// "This value can be ONE of multiple possible types"
//
// Union types are extremely common in:
// - Function parameters
// - API responses
// - UI state modeling
// - User input handling
//

// A value that can be either a number OR a string
type ID = number | string;

let userId: ID;

userId = 10;      // ✅ allowed
userId = "10";    // ✅ allowed
// userId = true; // ❌ not allowed



// =======================================================
// 2. WHY TYPE NARROWING IS REQUIRED
// =======================================================
//
// When using a union, TypeScript only allows operations
// that are valid for ALL possible types in the union.
//

function printId(id: number | string): void {
    // console.log(id.toUpperCase()); // ❌ ERROR
    // Reason: number does not have toUpperCase()

    // We must NARROW the type first
    if (typeof id === "string") {
        console.log(id.toUpperCase()); // ✅ string
    } else {
        console.log(id.toFixed(2));    // ✅ number
    }
}



// =======================================================
// 3. UNION TYPES WITH OBJECTS
// =======================================================
//
// Very common pattern for APIs and business logic.
// Each variant has a different "shape".
//

type SuccessResponse = {
    status: "success";   // literal type used as a discriminator
    data: string;
};

type ErrorResponse = {
    status: "error";     // discriminator
    error: string;
};

// Union of two possible response shapes
type ApiResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: ApiResponse): void {
    // Discriminated union:
    // TypeScript narrows based on the "status" field
    if (response.status === "success") {
        console.log(response.data);
    } else {
        console.log(response.error);
    }
}



// =======================================================
// 4. UNION vs OPTIONAL (?)
// =======================================================
//
// Optional properties are unions under the hood.
//

type UserWithOptionalAge = {
    name: string;
    age?: number;
};

// Equivalent to:
type UserWithUnionAge = {
    name: string;
    age: number | undefined;
};

// Difference:
// - `?` makes the property optional (can be missing)
// - `number | undefined` requires the property to exist



// =======================================================
// 5. INTERSECTION TYPES (&)
// =======================================================
//
// An intersection type means:
// "This value must satisfy ALL types at once"
//
// Intersection types are about COMPOSITION, not inheritance.
//

type Person = {
    name: string;
};

type Employee = {
    employeeId: number;
};

// Worker must have ALL properties from Person AND Employee
type Worker = Person & Employee;

const worker: Worker = {
    name: "Alice",
    employeeId: 123
};

// Missing any property would cause a TypeScript error



// =======================================================
// 6. INTERSECTION vs INHERITANCE
// =======================================================
//
// Intersection (&):
// - Combines independent concerns
// - No hierarchy
// - Very flexible
//

type Admin = {
    isAdmin: true;
};

type AdminUser = Person & Admin;

// Inheritance (interfaces / classes):
// - Represents "is-a" relationshi
