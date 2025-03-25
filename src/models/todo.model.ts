import { Document } from "mongoose";

// Enumerate the priorities
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Define the Todo interface
export interface ITodo {
    id?: string
    title: string
    description?: string
    completed: boolean
    dueDate?: Date
    priority: Priority
    createdAt: Date
    updatedAt: Date
}

// Export the TodoDocument
export interface TodoDocument extends Omit<ITodo, 'id'>, Document {}

