import { Model, Document, UpdateQuery } from 'mongoose'
import { IRepository } from './base.repository'

export abstract class MongooseRepository<T, U extends Document> implements IRepository<T> {
  protected model: Model<U>

  constructor(model: Model<U>) {
    this.model = model
  }
  async findOne(filter: any): Promise<T | null> {
    const doc = await this.model.findOne(filter).exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async findAll(filter = {}): Promise<T[]> {
    const docs = await this.model.find(filter).exec()
    return docs.map((doc) => this.mapToEntity(doc))
  }

  async findById(id: string): Promise<T | null> {
    const doc = await this.model.findById(id).exec()
    return doc ? this.mapToEntity(doc) : null
  }

  async create(data: Partial<T>): Promise<T> {
    const doc = await this.model.create(data)
    return this.mapToEntity(doc)
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    const updateQuery: UpdateQuery<U> = data as UpdateQuery<U>
    const doc = await this.model.findByIdAndUpdate(id, updateQuery, {
      new: true,
    }).exec()
  
    return doc instanceof this.model ? this.mapToEntity(doc) : null
  }
  

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec()
    return !!result
  }

  // Chaque repo doit définir sa propre logique de mapping
  protected abstract mapToEntity(doc: U): T
}
