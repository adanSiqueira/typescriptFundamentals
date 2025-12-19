// =======================
// INTERFACES IN TYPESCRIPT
// =======================
//
// An interface in TypeScript defines the SHAPE (structure) of an object.
// It is used ONLY at compile time for type checking.
// Interfaces do NOT exist at runtime and do NOT generate JavaScript code.
//
// Think of an interface as a "contract":
// → Any object that claims to be of this interface type
//   MUST implement all required properties and methods.
//
// This is different from a class:
// - Interfaces describe WHAT an object looks like
// - Classes describe HOW an object is implemented
//

// (This import is not used and can be removed)
// import { worker } from "node:cluster";


// =======================
// BASIC INTERFACE
// =======================

interface Person {
    // Required properties
    name: string;
    age: number;

    // Optional property:
    // The '?' means this property MAY or MAY NOT exist
    height?: number;

    // Method signature:
    // Defines that any Person must have a hello() method
    // returning void (no return value)
    hello(): void;
}


// Object literal that IMPLEMENTS the Person interface
// TypeScript checks that this object satisfies the contract
const personAlice: Person = {
    name: "Alice",
    age: 30,
    // height is optional, so it's fine to omit it

    // The method implementation must match the interface signature
    hello: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};

// Key takeaway:
// - Interfaces do NOT create objects
// - They only validate object structure
// - personAlice is a normal JavaScript object


// =======================
// INTERFACE INHERITANCE
// =======================
//
// Interfaces can EXTEND other interfaces.
// This allows composition and reuse of object shapes.

interface Employee extends Person {
    // New required property
    employeeId: number;

    // New optional property
    department?: string;
}


// This object must now satisfy BOTH:
// - Person interface
// - Employee interface
const workerBob: Employee = {
    name: "Bob",          // From Person
    age: 25,              // From Person
    employeeId: 12345,    // From Employee

    // department is optional, so it can be omitted

    // Method from Person interface
    hello: function () {
        console.log(
            `Hello, my name is ${this.name} and I work in ${
                this.department || "unknown department"
            }`
        );
    }
};


// =======================
// MULTI-LEVEL INTERFACE INHERITANCE
// =======================
//
// Interfaces can extend interfaces that already extend others.
// This creates a hierarchical type system.

interface Manager extends Employee {
    // A manager manages people
    // This property is an array of Person objects
    employeesUnder: Person[];
}


// This object must satisfy:
// - Person
// - Employee
// - Manager
const manager: Manager = {
    name: "Charlie",          // From Person
    age: 40,                  // From Person
    employeeId: 67890,        // From Employee

    // Manager-specific property
    employeesUnder: [workerBob],

    // Required method from Person
    hello: function () {
        console.log(`Hello, my name is ${this.name}`);
    }
};


// =======================
// KEY CONCEPTS SUMMARY
// =======================
//
// 1. Interfaces define STRUCTURE, not behavior
// 2. They exist only at compile time
// 3. Objects must fully satisfy the interface contract
// 4. Interfaces support inheritance via 'extends'
// 5. Interfaces are ideal for:
//    - Data models
//    - API contracts
//    - DTOs
//    - Function parameters
//    - Object shapes
//
// In backend/frontend code, interfaces are preferred over classes
// when no behavior or instantiation logic is required.
