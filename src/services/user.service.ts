import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { RegisterDTO, LoginDTO, AuthResponse } from '../types/user.types';
import { AppError } from '../utils/error.utils';

const register = async ({ username,email, password }: RegisterDTO): Promise<AuthResponse> => {
  const existing = await User.findOne({ email });
  if (existing) throw new AppError('Email déjà utilisé', 400);

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await new User({ username, email, password: hashedPassword }).save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { userId: user._id.toString(), token };
};

const login = async ({ email, password }: LoginDTO): Promise<AuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError('Identifiants invalides', 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new AppError('Mot de passe incorrect', 401);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  return { userId: user._id.toString(), token };
};

export default { register, login };