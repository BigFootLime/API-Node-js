// This file contains the DTO definitions for the Todo entity

import {Priority} from '../models/todo.model';

// DTO definition for the creation of a new Todo
export interface CreateTodoDto {
    title: string
    description?: string
    dueDate?: Date
    priority: Priority
}

// DTO definition for the update of an existing Todo
export interface UpdateTodoDto {
    title?: string
    description?: string
    dueDate?: Date
    priority?: Priority
    completed?: boolean
}