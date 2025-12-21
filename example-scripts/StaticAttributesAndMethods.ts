// ======================================
// STATIC ATTRIBUTES & STATIC METHODS
// ======================================
//
// The `static` keyword makes a property or method belong to the CLASS itself,
// not to individual instances created from that class.
//
// Key ideas:
// - Static members are shared across all instances
// - They are accessed using the class name, not `this`
// - They are useful for global counters, configuration, utilities, and constants
//
// Mental model:
//   Instance member → "belongs to each object"
//   Static member   → "belongs to the blueprint (class)"

// --------------------------------------
// CLASS WITH STATIC ATTRIBUTE & METHOD
// --------------------------------------

class Dog {

    // STATIC ATTRIBUTE
    // This variable exists ONLY ON THE CLASS (Dog),
    // not on individual dog objects.
    //
    // All instances of Dog share this same value.
    static instanceCount: number = 0;

    // INSTANCE ATTRIBUTE
    // Each Dog object has its own `name`
    name: string;

    // CONSTRUCTOR
    // Runs every time a new Dog instance is created
    constructor(name: string) {

        // Accessing static attributes MUST be done
        // through the class name, NOT through `this`
        Dog.instanceCount++;

        // Setting the instance-specific attribute
        this.name = name;
    }

    // STATIC METHOD
    // This method belongs to the class, not to instances.
    //
    // Static methods:
    // - Can only access static attributes/methods
    // - Cannot access instance attributes (like `this.name`)
    // - Are called using the class name
    static decreaseInstanceCount() {

        // Accessing the static attribute safely
        if (Dog.instanceCount > 0) {
            Dog.instanceCount--;
        }
    }
}

// --------------------------------------
// USING THE CLASS
// --------------------------------------

// Creating instances
// Each instantiation increments the static counter
const dog1 = new Dog("Buddy"); // instanceCount = 1
const dog2 = new Dog("Max");   // instanceCount = 2

// Static attributes are accessed via the CLASS
console.log(Dog.instanceCount); 
// Output: 2

// Calling a static method using the class name
Dog.decreaseInstanceCount();

// Verifying the updated static value
console.log(Dog.instanceCount); 
// Output: 1

// --------------------------------------
// IMPORTANT TAKEAWAYS
// --------------------------------------

/*
1️⃣ Static attributes:
- Are shared across all instances
- Represent global or class-level state
- Exist even if no instances are created

2️⃣ Static methods:
- Belong to the class itself
- Cannot access instance properties
- Are useful for utility logic or managing shared state

3️⃣ Instance attributes:
- Belong to individual objects
- Are accessed via `this`
- Represent object-specific data

4️⃣ Common use cases for static:
- Counters (number of instances)
- Configuration values
- Utility/helper functions
- Factory methods
- Caching or shared resources

RULE OF THUMB:
--------------
"If the data or behavior belongs to ALL objects collectively,
use static. If it belongs to ONE object, use instance members."
*/
