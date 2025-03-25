// This file is a schema for the todo resource. It imports the mongoose module and the TodoDocument type from the todo model

import mongoose, {Schema} from 'mongoose';
import {Priority, TodoDocument} from '../todo.model';

// Schema
const TodoSchema: Schema<TodoDocument> = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, required: true, default: false },
    dueDate: { type: Date },
    priority: { type: String, enum: Object.values(Priority), required: true, default: Priority.LOW },
},
{
    timestamps: true
});

export const TodoModel = mongoose.model<TodoDocument>('Todo', TodoSchema)