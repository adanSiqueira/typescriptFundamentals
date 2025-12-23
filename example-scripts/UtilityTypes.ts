// ==============================
// Utility Types in TypeScript
// ==============================
//
// Utility Types are **built-in generic types** provided by TypeScript
// that allow you to **transform, derive, or constrain existing types**
// without rewriting them.
//
// They are extremely common in:
// - API design
// - Frontend state management
// - DTOs (Data Transfer Objects)
// - Partial updates (PATCH requests)
// - Read-only data models
//
// Common Utility Types:
// Partial<T>
// Required<T>
// Readonly<T>
// Record<K, T>
// Pick<T, K>
// Omit<T, K>

//--------------------------------------------------//
// Interfaces used as base models for the examples
//--------------------------------------------------//

// Example 1: A typical domain model (e.g., backend entity or frontend state)
interface ToDo{
    id: number;
    title: string;
    description: string;
    completed: boolean
}

// Example 2: A smaller interface used for mapping values
interface PageInfo {
    title: string;
}

//--------------------------------------------------//
//-------------------- Examples --------------------//
//--------------------------------------------------//

// -----------------------------
// Partial<T>
// -----------------------------
// Partial<T> makes **all properties of T optional**
//
// It is commonly used when:
// - Updating objects partially (PATCH requests)
// - Accepting incomplete data
// - Forms where not all fields are required at once
//
// Equivalent to:
// {
//   id?: number;
//   title?: string;
//   description?: string;
//   completed?: boolean;
// }

const updateTodo = (todo: Partial<ToDo>) => {
    // Any subset of ToDo properties is allowed here
}


// -----------------------------
// Readonly<T>
// -----------------------------
// Readonly<T> makes **all properties immutable**
//
// This prevents reassignment and protects data from being modified
// after creation.
//
// Very useful for:
// - Configuration objects
// - Application state
// - Props in frontend components

const myTodo = (todo: Readonly<ToDo>) => {

    title: "Learn TypeScript";
    // todo.title = "New Title"; 
    // ❌ Error: Cannot assign to 'title' because it is a read-only property
}


// -----------------------------
// Pick<T, K>
// -----------------------------
// Pick<T, K> creates a **new type by selecting specific properties**
// from an existing type.
//
// Use cases:
// - Preview objects
// - API responses with limited fields
// - Performance optimization
// - Security (avoid exposing sensitive fields)

type TodoPreview = Pick<ToDo, "title" | "completed">

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false
};


// -----------------------------
// Omit<T, K>
// -----------------------------
// Omit<T, K> creates a **new type by excluding specific properties**
// from an existing type.
//
// Use cases:
// - Removing IDs before creation
// - Hiding internal fields
// - Creating public-safe objects

type TodoPreview2 = Omit<ToDo, "id" | "title">

const todo2: TodoPreview2 = {
    description: "Wash the dishes",
    completed: false
}


// -----------------------------
// Record<K, T>
// -----------------------------
// Record<K, T> creates an object type where:
// - K is the type of the keys
// - T is the type of the values
//
// This is commonly used for:
// - Dictionaries / maps
// - Lookup tables
// - Configuration maps
//
// Equivalent to:
// {
//   [key: string]: PageInfo
// }

const Pages: Record<string, PageInfo> = {
    home: { title: "Home" },
    about: { title: "About" },
    contact: { title: "Contact" },
}
