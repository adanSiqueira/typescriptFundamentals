// ===============================
// TYPE ALIASES IN TYPESCRIPT
// ===============================
//
// Type aliases allow you to create a *custom name* for a type.
//
// They are especially useful to:
// - Improve readability
// - Avoid repeating complex types
// - Give semantic meaning to data structures
//
// Unlike interfaces, type aliases can represent:
// - Primitive types
// - Union types (A | B)
// - Tuple types
// - Function signatures
// - Intersections (A & B)
//
// Think of a type alias as:
//   "This shape already exists, I just want to give it a meaningful name."
//

// =======================================
// TUPLE TYPE ALIAS
// =======================================
//
// This alias defines a tuple with exactly two numbers,
// where the position of each element matters.
//
// Coordinates is NOT just number[].
// It is strictly:
//   [x: number, y: number]
//
type Coordinates = [number, number];

// =======================================
// FUNCTION USING A TYPE ALIAS
// =======================================
//
// By using Coordinates instead of [number, number] directly:
// - The function signature becomes more readable
// - The intent of the data is clearer
// - Changes to the structure only need to be made in one place
//
function compareCoords(
    p1: Coordinates,
    p2: Coordinates
): Coordinates {

    // Accessing tuple elements by index:
    // p1[0] → x coordinate of p1
    // p2[1] → y coordinate of p2
    return [p1[0], p2[1]];
}

// =======================================
// USING THE TYPE ALIAS
// =======================================
//
// These variables must strictly follow the Coordinates shape.
// Any deviation (wrong length or wrong type) will cause a compile-time error.
//
const pointA: Coordinates = [10, 20];
const pointB: Coordinates = [30, 40];

// const invalidPoint: Coordinates = [10];        // ❌ Error: missing second value
// const invalidPoint2: Coordinates = [10, "y"]; // ❌ Error: string is not number
