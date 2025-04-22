// 📁 src/services/auth.service.ts
import { UserModel } from '../models/user.model'
import bcrypt from 'bcrypt-ts'
import jwt from 'jsonwebtoken'
import { AppError } from '../utils/error.utils'
import { RegisterUserDto, LoginUserDto } from '../types/user.types'
import { SessionService } from './session.service'
import { LoggerService } from './logger.service'
import { config } from 'dotenv'

config()

export class AuthService {
  private readonly sessionService = new SessionService()
  private readonly logger = new LoggerService()

  async register(data: RegisterUserDto) {
    const existing = await UserModel.findOne({ email: data.email })
    if (existing) {
      throw new AppError('Email already in use', 400)
    }

    const user = new UserModel(data)
    await user.save()
    return user
  }

  async login(data: LoginUserDto) {
    const user = await UserModel.findOne({ email: data.email })
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    const isMatch = await bcrypt.compare(data.password, user.password)
    if (!isMatch) {
      throw new AppError('Invalid email or password', 401)
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    })

    const expiresAt = new Date(Date.now() + 1000 * 60 * 60)
    await this.sessionService.create({
      user: user._id.toString(),
      token,
      expiresAt,
    })

    await this.logger.audit({
      user: user._id.toString(),
      action: 'login_success',
      resourceType: 'User',
      resourceId: user._id.toString(),
    })

    return { token, user: { id: user._id, email: user.email, role: user.role } }
  }
}