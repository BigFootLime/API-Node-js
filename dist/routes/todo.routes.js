"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controller_1 = require("../controllers/todo.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const todo_schema_1 = require("../types/validators/todo.schema");
const router = (0, express_1.Router)();
const todoController = new todo_controller_1.TodoController();
/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API for managing todo tasks
 */
/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', todoController.getAllTodos);
/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A todo object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.get('/:id', todoController.getTodoById);
/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTodo'
 *     responses:
 *       201:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
router.post('/', (0, validation_middleware_1.validate)(todo_schema_1.CreateTodoSchema), todoController.createTodo);
/**
 * @swagger
 * /todos/{id}:
 *   patch:
 *     summary: Update an existing todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the todo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTodo'
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.patch('/:id', (0, validation_middleware_1.validate)(todo_schema_1.UpdateTodoSchema), todoController.updateTodo);
/**
 * @swagger
 * /todos/{id}/toggle:
 *   patch:
 *     summary: Toggle the completed status of a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The updated todo with toggled status
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.patch('/:id/toggle', todoController.toggleTodoCompleted);
/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the todo
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Todo deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', todoController.deleteTodo);
exports.default = router;
