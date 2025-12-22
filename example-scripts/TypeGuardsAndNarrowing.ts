// =======================================================
// Type Guards and Type Narrowing in TypeScript
// =======================================================
//
// Type Guards are expressions that allow TypeScript to
// determine the specific type of a value at runtime.
//
// Type Narrowing is the result of using a type guard:
// the compiler "narrows" a union type into a more specific one.
//
// The most common built-in type guards are:
// 1) typeof     → for primitive types
// 2) instanceof → for class-based objects
// 3) in         → for checking property existence
//
// -------------------------------------------------------



// =======================================================
// Example 1 — typeof (Primitive Type Narrowing)
// =======================================================

// Union type: value can be string OR number
type StringOrNumber = string | number;

function add1(value: StringOrNumber) {

    // Using `typeof` as a type guard
    //
    // At this point, `value` is still:
    // string | number
    //
    // typeof works only with primitive types:
    // string, number, boolean, symbol, bigint, undefined

    if (typeof value === "string") {
        // Inside this block, TypeScript KNOWS:
        // value: string

        // String concatenation
        return value + "10";
    } else {
        // If it's not a string, TypeScript narrows it to:
        // value: number

        // Numeric addition
        return value + 10;
    }
}



// =======================================================
// Example 2 — instanceof (Class-Based Narrowing)
// =======================================================

// Classes create real runtime values,
// so `instanceof` works by checking the prototype chain.

class Dog {
    fisrtName: string;
    lastName: string;

    constructor(firstName: string, lastName: string) {
        this.fisrtName = firstName;
        this.lastName = lastName;
    }
}

class Cat {
    fisrtName: string;

    constructor(firstName: string, lastName: string) {
        this.fisrtName = firstName;
    }
}

// =======================================================
// Custom Type Guard Function
// =======================================================
//
// This is a USER-DEFINED type guard.
// The return type `animal is Dog` tells TypeScript:
//
//  "If this function returns true,
//    then `animal` should be treated as a Dog."

function isDog(animal: Dog | Cat): animal is Dog {

    // We are performing a runtime check by asserting
    // that `animal` might be a Dog and testing for a
    // property that ONLY Dog has (`lastName`).
    //
    // If `lastName` exists, we assume the object is a Dog.
    //
    // NOTE:
    // - This is safe only if `lastName` is unique to Dog
    // - The check runs at runtime
    // - The return type informs the TypeScript compiler

    return (animal as Dog).lastName !== undefined;
}



// Function receives a UNION of class types
function getName(animal: Dog | Cat) {

    // At this point:
    // animal: Dog | Cat
    //
    // We cannot safely access `lastName`,
    // because Cat does not have it.

    // Using `instanceof` as a type guard
    if (animal instanceof Dog) {

        // Inside this block:
        // animal is narrowed to Dog

        return `${animal.fisrtName} ${animal.lastName}`;

    } else {

        // Here:
        // animal is narrowed to Cat

        return animal.fisrtName;
    }
}
