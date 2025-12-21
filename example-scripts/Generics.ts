// ===============================
// GENERICS IN TYPESCRIPT
// ===============================
//
// Generics allow us to write reusable, type-safe code that works with
// multiple data types *without losing information about the type*.
//
// Instead of hardcoding a type (number, string, User, etc.),
// we use a placeholder type (commonly called T).
//
// This lets the *caller* decide which type will be used,
// while TypeScript enforces consistency at compile time.
//
// Notation:
//   <T>  → generic type parameter
//
// Think of T as:
//   "I don't know the type yet, but once you tell me, I will remember it everywhere."
//

// =======================================
// GENERIC CLASS EXAMPLE
// =======================================
//
// This DataStore class can store ANY type of item,
// but it guarantees that:
// - All stored items are of the SAME type
// - Methods return the correct type
//
// Without generics, we would need multiple versions:
//   DataStoreNumber, DataStoreString, DataStoreUser...
//

class DataStore<T> {
    // Internal storage uses the generic type T
    // Once T is defined, this becomes a strongly typed array
    private items: T[] = [];

    constructor() {
        // Initialization is optional here, but explicit for clarity
        this.items = [];
    }

    // Adds an item of type T
    // If T is User, only User objects are allowed
    addItem(item: T): void {
        this.items.push(item);
    }

    // Returns an item of type T or undefined if index is invalid
    // The return type adapts automatically to the chosen generic type
    getItem(index: number): T | undefined {
        return this.items[index];
    }

    // Removes exactly ONE element at the given index
    // splice(index, 1):
    //   index → where to start
    //   1     → how many elements to remove
    removeItem(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    // Returns all stored items with full type safety
    getAllItems(): T[] {
        return this.items;
    }
}

// =======================================
// USING A GENERIC CLASS WITH AN INTERFACE
// =======================================
//
// Interfaces pair extremely well with generics.
// Here, T becomes User for this DataStore instance.
//

interface User {
    id: number;
    name: string;
}

// DataStore<User> means:
// - T = User
// - items is User[]
// - addItem expects User
// - getItem returns User | undefined
//
const data = new DataStore<User>();

data.addItem({ id: 1, name: "Alice" });
data.addItem({ id: 2, name: "Bob" });

// data.addItem({ id: 3 }); // ❌ Compile-time error (missing name)

// =======================================
// GENERIC FUNCTIONS
// =======================================
//
// Generics are NOT limited to classes.
// Functions can also be generic.
//
// This allows parameters and return values
// to be related by type.
//

function getValue<K, V>(key: K, value1: V, value2: V): V {
    // The condition itself is runtime logic,
    // but the TYPES are enforced at compile time.
    //
    // Whatever type V is, the return value MUST be V.
    if (key) {
        return value1;
    }
    return value2;
}

// Type inference automatically determines K and V
getValue("Hello", 1, 2);            // K = string, V = number → returns number
getValue(10, "Hello", "World");     // K = number, V = string → returns string

// getValue(true, "a", 10); // ❌ Error: value1 and value2 must be same type
