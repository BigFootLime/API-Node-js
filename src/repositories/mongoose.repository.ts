// Code pour le repository générique pour Mongoose
// Ce code est générique et peut être utilisé pour n'importe quel modèle Mongoose
// Il suffit de créer un nouveau fichier pour chaque modèle et d'importer ce code

import { Model, Document, UpdateQuery } from 'mongoose'
import { IRepository } from './base.repository'

// T est le type de l'entité, U est le type du document Mongoose
export abstract class MongooseRepository<T, U extends Document> implements IRepository<T> {
  protected model: Model<U>

  // Le constructeur prend un modèle Mongoose en paramètre
  constructor(model: Model<U>) {
    this.model = model
  }
  // Implémentation des méthodes de l'interface IRepository
  async findOne(filter: any): Promise<T | null> {
    // On utilise exec() pour exécuter la requête
    // On mappe le document Mongoose en entité
    // On retourne null si aucun document n'est trouvé
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

  // On utilise le type Partial pour permettre la mise à jour partielle
  async update(id: string, data: Partial<T>): Promise<T | null> {
    // On cast le type Partial en UpdateQuery pour éviter les erreurs de types
    const updateQuery: UpdateQuery<U> = data as UpdateQuery<U>
    // On utilise l'option { new: true } pour retourner le document mis à jour
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
