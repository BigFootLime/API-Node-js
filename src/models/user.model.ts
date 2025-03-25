// src/models/user.model.ts
import { UserModel as UserMongooseModel } from './schemas/user.schema';
import { User } from '../types/user.types';

/**
 * Fonction utilitaire pour convertir un document Mongoose en objet User
 */
export const mapToUser = (doc: any): User => ({
  id: doc._id.toString(),
  username: doc.username,
  name: doc.name,
  surname: doc.surname,
  age: doc.age,
  email: doc.email,
  createdAt: doc.createdAt,
  updatedAt: doc.updatedAt,
});

// Export direct du modèle Mongoose
export const UserModel = UserMongooseModel;
