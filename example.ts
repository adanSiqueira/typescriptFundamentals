//INTRODUCTION : Primitive types in TypeScript

// 1. numbewr

let priceProduct: number = 199.99;
let inventoryCount: number = 1500;

console.log("Price of the product:", priceProduct);
console.log("Inventory count:", inventoryCount);

// 2. string
let userName: string = "Alice";
let userEmail: string = "alice@example.com";

//template literals
let welcomeMessage: string = `Welcome, ${userName}! Your registered email is ${userEmail}.`;

console.log(welcomeMessage);

// 3. boolean
let isLoggedIn: boolean = true;
let hasPremiumAccess: boolean = false;

console.log("Is user logged in?", isLoggedIn);
console.log("Does user have premium access?", hasPremiumAccess);

// 4. null and undefined (used for absence of value)
let userAddress: string | null = null;
let userPhoneNumber: string | undefined = undefined;

console.log("User address:", userAddress);
console.log("User phone number:", userPhoneNumber);

// 5. void (used for functions that do not return a value)
function logMessage(message: string): void {
    console.log("Log:", message);
}


// 6. Union Types (combining multiple types)
let userId: number | string;
userId = 12345;
console.log("User ID as number:", userId);
userId = "user_12345";
console.log("User ID as string:", userId);

interface Person {
    name: string;
}

let person: string | Person;
person = "Bob";
console.log("Person as string:", person);
person = { name: "Charlie" };
console.log("Person as object:", person);


let employeeRole : 'Manager' | 'Developer' | 'Designer';
employeeRole = 'Developer';
console.log("Employee role:", employeeRole);

// employeeRole = 'CTO'; => This will cause a TypeScript error

