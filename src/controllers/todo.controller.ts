import {Request, Response} from 'express';
import { TodoService } from '../services/todo.service';
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.types';
import { asyncHandler } from '../utils/async-handler.utils';

const todoService = new TodoService();

export class TodoController {
    getAllTodos = asyncHandler(async (req: Request, res: Response) => {
        const {completed, priority} = req.query;
        const todos = await todoService.findAll({
            completed:completed === 'true' ? true : completed === 'false' ? false : undefined,
            priority: priority as any,
        })
        res.status(200).json(todos);
    });

    getTodoById = asyncHandler(async (req: Request, res: Response) => {
        const todo = await todoService.findById(req.params.id);
        res.status(200).json(todo);
    });

    getOneTodo = asyncHandler(async (req: Request, res: Response) => {
        const todo = await todoService.findOne(req.params.id);
        res.status(200).json(todo);
    });

    createTodo = asyncHandler(async (req: Request, res: Response) => {
        const data: CreateTodoDto = req.body;
        const newTodo = await todoService.create(data);
        res.status(201).json(newTodo);
    });

    updateTodo = asyncHandler(async (req: Request, res: Response) => {
        const data: UpdateTodoDto = req.body;
        const updatedTodo = await todoService.update(req.params.id, data);
        res.status(200).json(updatedTodo);
    });

    toggleTodoCompleted = asyncHandler(async (req: Request, res: Response) => {
        const toggledTodo = await todoService.toggleCompleted(req.params.id);
        res.status(200).json(toggledTodo);
    });

    deleteTodo = asyncHandler(async (req: Request, res: Response) => {
        await todoService.delete(req.params.id);
        res.status(204).end();
    });
}