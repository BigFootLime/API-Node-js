import { MongooseRepository } from './mongoose.repository'
import { TodoModel } from '../models/schemas/todo.schema'
import { ITodo, TodoDocument } from '../models/todo.model'
import { Priority } from '../models/todo.model'

export class TodoRepository extends MongooseRepository<ITodo, TodoDocument> {
  constructor() {
    super(TodoModel)
  }

  // Conversion Document Mongoose vers ITodo
  protected mapToEntity(doc: TodoDocument): ITodo {
    const { _id, ...rest } = doc.toObject()
    return {
      id: _id.toString(),
      ...rest,
    }
  }

  // Trouver par statut
  async findByStatus(completed: boolean): Promise<ITodo[]> {
    const docs = await this.model.find({ completed }).exec()
    return docs.map((doc) => this.mapToEntity(doc))
  }

  // Trouver par priorité
  async findByPriority(priority: Priority): Promise<ITodo[]> {
    const docs = await this.model.find({ priority }).exec()
    return docs.map((doc) => this.mapToEntity(doc))
  }
}
