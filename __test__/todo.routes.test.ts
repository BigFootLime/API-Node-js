// This file is used to test the todo routes
// It tests the POST /api/todos and GET /api/todos endpoints

import request from 'supertest'
import { app } from '../src/config/app'
import { Priority } from '../src/models/todo.model'

describe('Todo API', () => {
   // Test pour l'endpoint POST /api/todos (création d'un todo)
  it('POST /api/todos should create a todo', async () => {
    const res = await request(app).post('/api/todos').send({
      title: 'From test',
      priority: Priority.LOW,
    })

    expect(res.statusCode).toBe(201)
      // On vérifie que le corps de la réponse contient bien le titre attendu
    expect(res.body.title).toBe('From test')
  })

   // Test pour l'endpoint GET /api/todos (récupération des todos)
  it('GET /api/todos should return todos', async () => {
    // Envoie d'une requête GET pour récupérer les todos
    const res = await request(app).get('/api/todos')
    expect(res.statusCode).toBe(200)
    // On vérifie que la réponse est bien un tableau
    expect(Array.isArray(res.body)).toBe(true)
  })
})
