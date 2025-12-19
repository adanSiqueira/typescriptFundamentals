/**
 * ============================
 * BASIC FUNCTION TYPES
 * ============================
 *
 * This file demonstrates:
 * - Basic function typing in TypeScript
 * - Optional parameters
 * - Function type signatures
 * - Callback functions
 * - Higher-order functions (functions that receive other functions)
 */


/**
 * ----------------------------
 * 1) Basic function typing
 * ----------------------------
 *
 * - Parameters have explicit types (number)
 * - The return type is explicitly declared (: number)
 *
 * TypeScript will enforce:
 * - Correct argument types at call time
 * - Correct return type inside the function body
 */
function add(x: number, y: number): number {
    return x + y;
}


/**
 * ----------------------------
 * 2) Optional parameters
 * ----------------------------
 *
 * - The `?` after `middleName` marks it as OPTIONAL
 * - Optional parameters:
 *   • Can be omitted when calling the function
 *   • Are typed as `string | undefined`
 *
 * Rule:
 * - Optional parameters must come AFTER required ones
 */
function makeName(
    firstName: string,
    lastName: string,
    middleName?: string
): string {

    // Because middleName may be undefined,
    // we must check before using it
    if (middleName) {
        return `${firstName} ${middleName} ${lastName}`;
    }

    return `${firstName} ${lastName}`;
}


/**
 * ----------------------------
 * 3) Callback functions
 * ----------------------------
 *
 * A callback is:
 * - A function passed as an argument to another function
 * - Executed ("called back") inside that function
 *
 * Here, `func` is a function parameter with a specific signature:
 *   (f: string, l: string, m?: string) => string
 *
 * This means:
 * - It must receive:
 *   • firstName (string)
 *   • lastName (string)
 *   • optional middleName (string)
 * - It must return a string
 */
function callFunc(
    func: (f: string, l: string, m?: string) => string,
    param1: string,
    param2: string
) {
    // Execute the callback using the provided parameters
    func(param1, param2);
}

// Passing `makeName` as a callback
callFunc(makeName, "John", "Doe");


/**
 * ----------------------------
 * 4) Callback functions with math operations
 * ----------------------------
 *
 * These are simple functions that match
 * the same function signature:
 *   (number, number) => number
 */
function mul(x: number, y: number): number {
    return x * y;
}

function div(x: number, y: number): number {
    return x / y;
}


/**
 * ----------------------------
 * 5) Higher-order function
 * ----------------------------
 *
 * applyFunc:
 * - Receives an ARRAY of functions
 * - Receives an ARRAY of argument tuples
 * - Applies each function to its corresponding arguments
 * - Returns an array of results
 *
 * Types explained:
 *
 * funcs: ((a: number, b: number) => number)[]
 * - An array of functions
 * - Each function must accept two numbers and return a number
 *
 * values: [number, number][]
 * - An array of tuples
 * - Each tuple contains exactly two numbers
 *
 * return type:
 * - number[] → an array of numbers
 */
function applyFunc(
    funcs: ((a: number, b: number) => number)[],
    values: [number, number][]
): number[] {

    const results: number[] = [];

    for (let i = 0; i < funcs.length; i++) {
        const args = values[i];

        /**
         * The `!` (non-null assertion operator) tells TypeScript:
         * "I guarantee this value exists at runtime."
         *
         * In this case:
         * - funcs[i] exists because we loop within funcs.length
         * - args exists because values matches funcs in length
         *
         * Note:
         * - Overusing `!` can be dangerous
         * - It bypasses TypeScript's safety checks
         */
        const result = funcs[i]!(args![0], args![1]);
        results.push(result);
    }

    return results;
}

// Example usage
applyFunc([mul, div], [[10, 2], [20, 4]]);