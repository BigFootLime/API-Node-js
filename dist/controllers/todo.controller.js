"use strict";
// This file is the controller for the todo resource
// It imports the TodoService and the types for the todo resource
// It exports a class with methods to handle requests for the todo resource
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoController = void 0;
const todo_service_1 = require("../services/todo.service");
const async_handler_utils_1 = require("../utils/async-handler.utils");
const todoService = new todo_service_1.TodoService();
class TodoController {
    constructor() {
        this.getAllTodos = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const { completed, priority } = req.query;
            const todos = yield todoService.findAll({
                completed: completed === 'true' ? true : completed === 'false' ? false : undefined,
                priority: priority,
            });
            res.status(200).json(todos);
        }));
        this.getTodoById = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const todo = yield todoService.findById(req.params.id);
            res.status(200).json(todo);
        }));
        this.getOneTodo = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const todo = yield todoService.findOne(req.params.id);
            res.status(200).json(todo);
        }));
        this.createTodo = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const newTodo = yield todoService.create(data);
            res.status(201).json(newTodo);
        }));
        this.updateTodo = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const updatedTodo = yield todoService.update(req.params.id, data);
            res.status(200).json(updatedTodo);
        }));
        this.toggleTodoCompleted = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const toggledTodo = yield todoService.toggleCompleted(req.params.id);
            res.status(200).json(toggledTodo);
        }));
        this.deleteTodo = (0, async_handler_utils_1.asyncHandler)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield todoService.delete(req.params.id);
            res.status(204).end();
        }));
    }
}
exports.TodoController = TodoController;
