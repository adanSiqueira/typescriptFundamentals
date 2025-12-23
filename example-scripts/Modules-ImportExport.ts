// ======================= MODULES IN TYPESCRIPT =======================
//
// A module in TypeScript is a file that uses `export` or `import`.
// Each module has its own scope, meaning variables, functions and
// classes are NOT global unless explicitly exported.
//
// Modules help with:
// - Code organization
// - Encapsulation
// - Reusability
// - Avoiding global namespace pollution
// - Making dependencies explicit
//
// Any file that contains at least one `export` or `import` is treated
// as a module by TypeScript.
//
// =====================================================================



// ====================== TO EXPORT ======================
//
// There are two main ways to export values from a module:
// 1. Named exports
// 2. Default exports
//
// A single file can have:
// - Multiple named exports
// - At most ONE default export
//
// =======================================================


// ------------------ 1. NAMED EXPORT --------------------
//
// Named exports allow you to export multiple values from the same file.
// When importing them, the consumer MUST use the same names (unless aliased).
//
// -------------------------------------------------------


// Example 1: Exporting directly at declaration
export function add(a: number, b: number): number {
    return a + b;
}

// Exporting constants is very common for configuration values,
// enums-like data, or shared flags
export const ADAN = 1;


// Example 2: Exporting after declaration
//
// This pattern is useful when:
// - You want to group exports at the bottom
// - You want to conditionally export things
// - You prefer separating logic from exports
function subtract(a: number, b: number): number {
    return a - b;
}

// Explicit named export
export { subtract };


// ------------------ 2. DEFAULT EXPORT ------------------
//
// A default export represents the "main" value of the module.
// Each module can have ONLY ONE default export.
//
// The importing file can choose ANY name when importing it,
// because default exports do not require name matching.
//
// -------------------------------------------------------


function test(): string {
    return "test";
}

// Default export of the function `test`
export default test;


// ------------------ IMPORTING DEFAULT ------------------
//
// Example of how to import the default export:
//
// import Anything from "./Module-ImportExport"
//
// - `Anything` is just an alias chosen by the importer
// - It refers to the default export (`test`)
// - The name does NOT need to match the original function name
//
// This is why default exports are flexible, but sometimes less explicit
// in large codebases.


// ====================== TO IMPORT ======================
//
// Importing allows a module to consume functionality exposed
// by another module.
//
// Imports make dependencies explicit and allow TypeScript
// to perform static analysis and type checking.
//
// =======================================================


// ------------------ 1. RELATIVE IMPORT -----------------
//
// Relative imports are based on file paths.
// They use:
// - "./"  → same folder
// - "../" → parent folder
//
// Example of importing named exports:
//
// import { add, subtract } from "./Module-ImportExport"
//
// Rules:
// - Names MUST match the exported names
// - Order does not matter
// - You can alias imports if needed:
//
// import { add as sum } from "./Module-ImportExport"
//
// -------------------------------------------------------
