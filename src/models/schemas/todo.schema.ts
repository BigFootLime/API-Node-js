import mongoose, {Schema} from 'mongoose';
import {Priority, TodoDocument} from '../todo.model';

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