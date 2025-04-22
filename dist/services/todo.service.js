"use strict";
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
exports.TodoService = void 0;
const todo_repository_1 = require("../repositories/todo.repository");
const error_utils_1 = require("../utils/error.utils");
class TodoService {
    constructor() {
        this.todoRepository = new todo_repository_1.TodoRepository();
    }
    // Récupère toutes les tâches, avec filtres possibles (completed, priority)
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((filter === null || filter === void 0 ? void 0 : filter.completed) !== undefined) {
                return this.todoRepository.findByStatus(filter.completed);
            }
            if (filter === null || filter === void 0 ? void 0 : filter.priority) {
                return this.todoRepository.findByPriority(filter.priority);
            }
            return this.todoRepository.findAll();
        });
    }
    // Récupère une tâche par ID
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepository.findById(id);
            if (!todo) {
                throw new error_utils_1.NotFoundError(`Todo with id ${id} not found`);
            }
            return todo;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.todoRepository.findById(id);
            if (!todo) {
                throw new error_utils_1.NotFoundError(`Todo with id ${id} not found`);
            }
            return todo;
        });
    }
    // Crée une nouvelle tâche
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.todoRepository.create(Object.assign(Object.assign({}, data), { completed: false, createdAt: new Date(), updatedAt: new Date() }));
        });
    }
    // Met à jour une tâche existante
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const updated = yield this.todoRepository.update(id, Object.assign(Object.assign({}, data), { updatedAt: new Date() }));
            if (!updated) {
                throw new error_utils_1.NotFoundError(`Todo with id ${id} not found`);
            }
            return updated;
        });
    }
    // Supprime une tâche
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleted = yield this.todoRepository.delete(id);
            if (!deleted) {
                throw new error_utils_1.NotFoundError(`Todo with id ${id} not found`);
            }
            return deleted;
        });
    }
    // Inverse le statut "completed" d'une tâche
    toggleCompleted(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const todo = yield this.findById(id);
            return this.update(id, { completed: !todo.completed });
        });
    }
}
exports.TodoService = TodoService;
