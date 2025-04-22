// 📁 src/services/session.service.ts
import { SessionModel, ISession } from '../models/session.model'
import { CreateSessionInput } from '../types/validators/session.schema'
import { NotFoundError } from '../utils/error.utils'

export class SessionService {
  async findAll(): Promise<ISession[]> {
    return SessionModel.find().populate('user')
  }

  async findByToken(token: string): Promise<ISession> {
    const session = await SessionModel.findOne({ token })
    if (!session) {
      throw new NotFoundError(`Session with token ${token} not found`)
    }
    return session
  }

  async create(data: CreateSessionInput): Promise<ISession> {
    const session = new SessionModel(data)
    return session.save()
  }

  async deleteByToken(token: string): Promise<boolean> {
    const result = await SessionModel.findOneAndDelete({ token })
    if (!result) {
      throw new NotFoundError(`Session with token ${token} not found`)
    }
    return true
  }

  async deleteByUser(userId: string): Promise<number> {
    const result = await SessionModel.deleteMany({ user: userId })
    return result.deletedCount || 0
  }
}
