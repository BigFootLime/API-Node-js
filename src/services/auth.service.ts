// src/services/auth.service.ts
import { RegisterUserDto, LoginUserDto, User } from '../types/user.types';
import { UserModel } from '../models/user.model';
import { mapToUser } from '../models/user.model';
import bcrypt from 'bcrypt-ts';
import jwt from 'jsonwebtoken';

export class AuthService {
  async register(data: RegisterUserDto): Promise<User> {
    // Vérifie si l’email existe déjà
    const existing = await UserModel.findOne({ email: data.email });
    if (existing) {
      throw new Error('Email already in use');
    }

    const newUser = new UserModel(data);
    const saved = await newUser.save();
    return mapToUser(saved);
  }

  async login(data: LoginUserDto): Promise<string> {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error('Invalid credentials');

    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    const payload = {
      sub: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return token;
  }
}
