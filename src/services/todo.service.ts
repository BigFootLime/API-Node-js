

import { ITodo, Priority } from '../models/todo.model'
import { CreateTodoDto, UpdateTodoDto } from '../types/todo.types'
import { TodoRepository } from '../repositories/todo.repository'
import { NotFoundError } from '../utils/error.utils'

export class TodoService {
    private readonly todoRepository: TodoRepository

    constructor() {
        this.todoRepository = new TodoRepository()
    }

      // Récupère toutes les tâches, avec filtres possibles (completed, priority)
    async findAll(filter?: Partial<{ completed: boolean; priority: Priority }>): Promise<ITodo[]> {
        if (filter?.completed !== undefined) {
            return this.todoRepository.findByStatus(filter.completed)
          }
          if (filter?.priority) {
            return this.todoRepository.findByPriority(filter.priority)
          }
          return this.todoRepository.findAll()
    }
// Récupère une tâche par ID
    async findOne(id: string): Promise<ITodo> {
        const todo = await this.todoRepository.findById(id)
        if (!todo) {
            throw new NotFoundError(`Todo with id ${id} not found`)
        }
        return todo
    }

    async findById(id: string): Promise<ITodo> {
        const todo = await this.todoRepository.findById(id)
        if (!todo) {
            throw new NotFoundError(`Todo with id ${id} not found`)
        }
        return todo
    }

     // Crée une nouvelle tâche
    async create(data: CreateTodoDto): Promise<ITodo> {
        return this.todoRepository.create({
            ...data,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }

     // Met à jour une tâche existante
    async update(id: string, data: UpdateTodoDto): Promise<ITodo> {
        const updated = await this.todoRepository.update(id, {
            ...data,
            updatedAt: new Date(),
        })
        if (!updated) {
            throw new NotFoundError(`Todo with id ${id} not found`)
        }
        return updated
    }

    // Supprime une tâche
    async delete(id: string): Promise<boolean> {
        const deleted = await this.todoRepository.delete(id)
        if (!deleted) {
            throw new NotFoundError(`Todo with id ${id} not found`)
        }
        return deleted
    }

     // Inverse le statut "completed" d'une tâche
    async toggleCompleted(id: string): Promise<ITodo> {
        const todo = await this.findById(id)
        return this.update(id, { completed: !todo.completed })
    }
}