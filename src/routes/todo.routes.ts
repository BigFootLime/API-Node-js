import {Router} from 'express';
import { TodoController } from '../controllers/todo.controller';
import { validate } from '../middlewares/validation.middleware';
import { CreateTodoSchema, UpdateTodoSchema } from '../types/validators/todo.schema';

const router = Router();
const todoController = new TodoController();

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', validate(CreateTodoSchema), todoController.createTodo);
router.patch('/:id', validate(UpdateTodoSchema), todoController.updateTodo);
router.patch('/:id/toggle', todoController.toggleTodoCompleted);
router.delete('/:id', todoController.deleteTodo);
router.get('/:id/one', todoController.getOneTodo);

export default router;