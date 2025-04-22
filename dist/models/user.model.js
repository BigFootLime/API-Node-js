"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.mapToUser = void 0;
// src/models/user.model.ts
const user_schema_1 = require("./schemas/user.schema");
/**
 * Fonction utilitaire pour convertir un document Mongoose en objet User
 */
const mapToUser = (doc) => ({
    id: doc._id.toString(),
    username: doc.username,
    name: doc.name,
    surname: doc.surname,
    age: doc.age,
    email: doc.email,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    lastLogin: doc.lastLogin,
    isActive: doc.isActive,
    phone_number: doc.phone_number,
    departement: doc.departement,
    role: doc.role,
});
exports.mapToUser = mapToUser;
// Export direct du modèle Mongoose
exports.UserModel = user_schema_1.UserModel;
