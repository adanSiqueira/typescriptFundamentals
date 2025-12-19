/**
 * ============================
 * ADVANCED FUNCTION TYPES
 * ============================
 *
 * This file covers:
 * - Rest parameters
 * - Variadic functions
 * - Function overloading in TypeScript
 * - Runtime type narrowing
 *
 * Important:
 * TypeScript overloads exist ONLY at compile time.
 * At runtime, there is always a SINGLE implementation.
 */


/**
 * ----------------------------
 * 1) Rest Parameters (...)
 * ----------------------------
 *
 * Rest parameters allow a function to receive:
 * - Any number of arguments
 * - Collected into an array
 *
 * Syntax:
 *   (...paramName: Type[])
 *
 * Rules:
 * - The rest parameter must be the LAST parameter
 * - It is always typed as an array
 *
 * In this example:
 * - `numbers` is of type number[]
 * - The function can be called with 0, 1, or many numbers
 */
function sum(...numbers: number[]): number {

    let total = 0;

    // Iterate over all received numbers
    for (let i = 0; i < numbers.length; i++) {

        /**
         * numbers[i] is always a number here,
         * so the non-null assertion (!) is unnecessary.
         *
         * It is safe because:
         * - i < numbers.length
         */
        total += numbers[i]!;
    }

    return total;
}

// Example usages
sum(1, 2, 3);
sum(10, 20, 30, 40);
sum(); // returns 0


/**
 * ----------------------------
 * 2) Function Overloading
 * ----------------------------
 *
 * Function overloading allows a function to:
 * - Have multiple "public" type signatures
 * - Share a single runtime implementation
 *
 * Overloads are useful when:
 * - Input types differ
 * - Output type depends on input
 * - The function behaves differently per input type
 *
 * IMPORTANT RULES:
 * - Overload signatures come FIRST
 * - The implementation comes LAST
 * - The implementation must handle ALL overload cases
 */


/**
 * Overload signatures (what the outside world sees)
 */
function getItemLength(name: string): number;
function getItemLength(names: string[]): number;

/**
 * Implementation signature (runtime reality)
 *
 * - Must be compatible with all overloads
 * - Usually uses a broader type (unknown or union)
 */
function getItemLength(nameOrNames: unknown): number {

    // Type narrowing using typeof
    if (typeof nameOrNames === 'string') {
        return nameOrNames.length;
    }

    // Type narrowing using Array.isArray
    if (Array.isArray(nameOrNames)) {
        return nameOrNames.length;
    }

    // Fallback (should not happen if overloads are respected)
    return 0;
}

// Valid calls (checked at compile time)
getItemLength("TypeScript");
getItemLength(["Alice", "Bob", "Charlie"]);

// Invalid call ❌ (compile-time error)
// getItemLength(123);


/**
 * ----------------------------
 * 3) Overloaded function (more elucidative example)
 * ----------------------------
 *
 * Example: formatInput
 *
 * - If input is a number → return formatted currency
 * - If input is a string → return trimmed uppercase text
 */


/**
 * Overload signatures
 */
function formatInput(value: number): string;
function formatInput(value: string): string;

/**
 * Single implementation
 */
function formatInput(value: number | string): string {

    if (typeof value === "number") {
        // Format number as currency
        return `$${value.toFixed(2)}`;
    }

    // value is string here
    return value.trim().toUpperCase();
}

// Valid usage
formatInput(10);          // "$10.00"
formatInput(3.5);         // "$3.50"
formatInput("  hello ");  // "HELLO"

// Invalid usage ❌
// formatInput(true);