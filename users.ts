import type { Request, Response } from 'express';

interface CreateUserInput {
    name: string;
    email: string;
    age: number;
}

interface UserData{
    id: number;
    name: string;
    email: string;
    age: number;
}

/* MOCK DATA (FAKE DATABASE) */
const users = [
    { id: 1, name: "Alice", email: "alice@example.com", age: 28 },
    { id: 2, name: "Bob", email: "bob@example.com", age: 34 },
    { id: 3, name: "Charlie", email: "charlie@example.com", age: 25 }
]

export function getAllUsers(req: Request, res: Response): void {
    res.status(200).json(users);
};

export function createUser(req: Request<{}, {},CreateUserInput>, res: Response): void {
    const newUser: UserData = {
        id: users.length + 1,
        ...req.body};
    // users.push(newUser);
    res.status(201).json({ message: "User created successfully", user: newUser });
}

export function getUserById(req: Request <{id: string}>, res: Response): void {
    const userId: number = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === userId);
    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
};