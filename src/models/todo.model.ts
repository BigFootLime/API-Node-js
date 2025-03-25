// Purpose: Define the Todo interface and the TodoDocument interface.
// The Todo interface defines the structure of a todo object.

import { Document } from "mongoose";

// Defines the Priority enum
// This enum defines the priority levels for a todo
export enum Priority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high'
}

// Defines the Todo interface
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

