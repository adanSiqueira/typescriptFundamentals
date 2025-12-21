// ================================
// INTERFACES vs CLASSES (STUDY FILE)
// ================================

// An INTERFACE defines a CONTRACT (a shape / capability).
// It specifies WHAT must be implemented, but not HOW.
//
// Interfaces:
// - Exist only at compile time
// - Do NOT generate JavaScript
// - Cannot contain implementation
// - Can be implemented by multiple classes
// - Are ideal for defining capabilities and APIs

interface Animal {
    // Any class that "implements Animal" MUST define this method
    speak(): void;
}

// --------------------------------
// CLASS IMPLEMENTING AN INTERFACE
// --------------------------------

// A CLASS provides IMPLEMENTATION and can contain:
// - State (properties)
// - Logic (methods)
// - Access modifiers (private, protected, public)
//
// When a class "implements" an interface:
// - It agrees to follow the contract
// - TypeScript enforces correctness at compile time

class Dog implements Animal {

    // PRIVATE properties
    // These are accessible ONLY inside the class itself
    // They enforce encapsulation
    private name: string;
    private color: string;

    // Constructor initializes the internal state
    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }

    // This method is REQUIRED because of the Animal interface
    // The interface does not care HOW speak works,
    // only that it exists with this signature
    speak(): void {
        console.log("au au au");
    }
}

// Creating an instance of Dog
const myDog = new Dog("Rex", "brown");

// Even though Dog has extra properties (name, color),
// we can treat it as an Animal because it satisfies the interface
myDog.speak(); // Output: au au au

// --------------------------------
// ANOTHER CLASS IMPLEMENTING THE SAME INTERFACE
// --------------------------------

// Multiple classes can implement the SAME interface
// This is one of the biggest strengths of interfaces

class Cat implements Animal {

    // Shorthand constructor syntax:
    // Declares and initializes properties automatically
    constructor(
        private name: string,
        private color: string
    ) {}

    // Cat provides its own implementation of speak
    // Different behavior, same contract
    speak(): void {
        console.log("miau miau miau");
    }
}

// --------------------------------
// THEORETICAL SUMMARY (IMPORTANT)
// --------------------------------

/*
INTERFACE (Animal)
------------------
- Describes a CAPABILITY
- Defines WHAT must exist
- Has no state
- Has no implementation
- Supports multiple inheritance (implements multiple interfaces)

CLASS (Dog, Cat)
----------------
- Defines HOW something works
- Holds state (name, color)
- Contains executable logic
- Exists at runtime
- Can only extend ONE class

KEY DESIGN IDEA
---------------
"Animal" does NOT represent a concrete thing.
It represents a ROLE or BEHAVIOR.

Dog and Cat:
- Are concrete entities
- Have state
- Behave differently
- Share a common interface

This pattern enables:
- Polymorphism
- Loose coupling
- Testability
- Cleaner architecture

REAL-WORLD USE CASES
-------------------
Interfaces:
- API request/response shapes
- React props
- Service contracts
- Domain capabilities

Classes:
- Business logic
- Entities
- Services
- Controllers

MENTAL MODEL
------------
Interface  → "What can you do?"
Class      → "Who are you and how do you do it?"
*/
