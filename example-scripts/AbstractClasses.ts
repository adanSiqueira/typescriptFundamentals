// =====================================================
// ABSTRACT CLASSES IN TYPESCRIPT
// =====================================================
//
// An abstract class represents a "conceptual" class.
// It defines a common structure and behavior for subclasses,
// but it CANNOT be instantiated directly.
//
// Abstract classes are useful when:
// - You want to share logic between related classes
// - You want to enforce that subclasses implement certain methods
// - You want a base class with both implemented and unimplemented behavior
//
// This is very similar to Python's ABC (Abstract Base Classes).
//

// -----------------------------------------------------
// Abstract class definition
// -----------------------------------------------------
abstract class Animal {

    // -----------------------------------------------
    // ABSTRACT METHOD
    // -----------------------------------------------
    // - Has NO implementation here
    // - Acts as a "contract" that all subclasses must follow
    // - Subclasses MUST implement this method
    //
    // If a subclass does not implement makeSound(),
    // TypeScript will raise a compile-time error.
    //
    // Abstract methods define WHAT must be done,
    // but not HOW it is done.
    //
    abstract makeSound(duration: number): void;

    // -----------------------------------------------
    // CONCRETE (NON-ABSTRACT) METHOD
    // -----------------------------------------------
    // - Has a full implementation
    // - Can be inherited and reused by all subclasses
    // - Can call abstract methods internally
    //
    // This allows the base class to define a workflow,
    // while delegating part of the behavior to subclasses.
    //
    move(duration: number): void {
        console.log(`Moving along...`);

        // Calls the subclass implementation of makeSound()
        // This is an example of POLYMORPHISM
        this.makeSound(duration);
    }
}

// -----------------------------------------------------
// Concrete subclass
// -----------------------------------------------------
//
// Dog EXTENDS Animal and MUST implement all abstract methods
// defined in Animal.
//
class Dog extends Animal {

    // Required implementation of the abstract method
    makeSound(duration: number): void {
        console.log(`Barking for ${duration} seconds!`);
    }
}

// -----------------------------------------------------
// Usage
// -----------------------------------------------------

// ❌ This would be illegal:
// const animal = new Animal(); // Cannot instantiate abstract class

// ✅ Correct: instantiate a concrete subclass
const dog = new Dog();

// Calls the inherited method from Animal
// which internally calls Dog.makeSound()
dog.move(5);

// Output:
// Moving along...
// Barking for 5 seconds!
