// ======================================================
// CLASSES, ACCESS MODIFIERS & INHERITANCE (TypeScript)
// ======================================================
//
// This file demonstrates:
// 1) How classes work in TypeScript
// 2) The difference between public, private and protected
// 3) How inheritance works using `extends` and `super`
//
// NOTE:
// - Access modifiers (private/protected/public) are
//   enforced at compile time by TypeScript
// - They do NOT exist at runtime in JavaScript
// ======================================================


// ------------------------------------------------------
// BASIC CLASS WITH PRIVATE AND PUBLIC MEMBERS
// ------------------------------------------------------

class Person {
    // `private` means:
    // - Only accessible inside THIS class
    // - NOT accessible from subclasses
    // - NOT accessible from instances
    private name: string;

    // No modifier = `public` by default
    // Accessible everywhere
    age: number;

    constructor(name: string, age: number) {
        // Initializing class properties
        this.name = name;
        this.age = age;
    }

    // Public method (default)
    // Can access private members because it's inside the class
    greet(): void {
        console.log(
            `Hello, my name is ${this.name} and I am ${this.age} years old.`
        );
    }

    // Getter method
    // This is a common pattern to expose read-only access
    // to private attributes
    getName(): string {
        return this.name;
    }
}

// Creating an instance of Person
const p1 = new Person("Alice", 30);

// ❌ Not allowed (name is private)
// console.log(p1.name);

// ✅ Allowed (public method)
p1.greet();


// ------------------------------------------------------
// INHERITANCE EXAMPLE
// ------------------------------------------------------
//
// `Employee` IS A `Person`
// This means Employee inherits:
// - public members
// - protected members
// It does NOT inherit access to private members
// ------------------------------------------------------

class Employee extends Person {
    // Private attribute exclusive to Employee
    private employeeId: number;

    constructor(name: string, age: number, employeeId: number) {
        // `super()` calls the constructor of the parent class
        // Must be called before using `this`
        super(name, age);

        this.employeeId = employeeId;
    }

    // ❌ This would be an error:
    // cannot access `name` because it is private in Person
    //
    // showName() {
    //     console.log(this.name);
    // }
}


// ------------------------------------------------------
// PRIVATE vs PROTECTED ATTRIBUTES
// ------------------------------------------------------
//
// - `private`: accessible ONLY in the declaring class
// - `protected`: accessible in the class AND its subclasses
// ------------------------------------------------------

class Animal {
    // `protected`:
    // - Accessible in Animal
    // - Accessible in subclasses (Dog, Cat, etc.)
    // - NOT accessible from instances
    protected species: string;

    // `private`:
    // - Accessible ONLY inside Animal
    // - NOT accessible in subclasses
    private age: number;

    constructor(species: string, age: number) {
        this.species = species;
        this.age = age;
    }
}

class Dog extends Animal {
    constructor(age: number) {
        // Calling parent constructor
        super("Dog", age);
    }

    getSpecies(): string {
        // ✅ Allowed because `species` is protected
        return this.species;
    }

    // ❌ This would be an error:
    // `age` is private to Animal
    //
    // getAge(): number {
    //     return this.age;
    // }
}

// Instance of Dog
const dog = new Dog(5);

// ❌ Not allowed (protected)
// console.log(dog.species);

// ✅ Allowed via method
console.log(dog.getSpecies());
