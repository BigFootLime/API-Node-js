// src/models/schemas/user.schema.ts
import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt-ts';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash du mot de passe avant enregistrement
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const UserModel = model('User', userSchema);
