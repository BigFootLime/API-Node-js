// This file is used to test the TodoRepository class
// It tests the create() and findAll() methods of the TodoRepository class

import { TodoRepository } from '../src/repositories/todo.repository'
import { Priority } from '../src/models/todo.model'

// Tests pour le TodoRepository
describe('TodoRepository', () => {

  // Instanciation d'un nouveau repository
  const repo = new TodoRepository()

  // Test de la méthode create() du repository
  it('should create a new todo', async () => {

     // Création d’un nouveau todo via la méthode du repository
    const todo = await repo.create({
      title: 'Test todo',
      priority: Priority.MEDIUM,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    expect(todo).toHaveProperty('id')
    expect(todo.title).toBe('Test todo')
  })

   // Test de la méthode findAll() du repository
  it('should find all todos', async () => {
     // Création d’un second todo pour s'assurer qu'il y en a au moins un
    await repo.create({
      title: 'Another',
      priority: Priority.HIGH,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    const todos = await repo.findAll()
    expect(todos.length).toBeGreaterThan(0)
  })
})
