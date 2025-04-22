// 📁 src/models/schemas/user.schema.ts
import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt-ts'

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: false },
    departement: { type: String, required: false },
    role: {
      type: String,
      enum: ['user', 'admin', 'viewer'],
      default: 'user',
    },
    lastLogin: { type: Date, default: null },
    isActive: { type: Boolean, default: true },
    totpSecret: { type: String, required: false },
    twoFactorEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Hash du mot de passe avant enregistrement
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

export const UserModel = model('User', userSchema)