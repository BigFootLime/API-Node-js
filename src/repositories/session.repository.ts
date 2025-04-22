import { MongooseRepository } from './mongoose.repository'
import { SessionModel, ISession } from '../models/session.model'

export class SessionRepository extends MongooseRepository<ISession, ISession> {
  constructor() {
    super(SessionModel)
  }

  protected mapToEntity(doc: any): ISession {
    const { _id, ...rest } = doc.toObject()
    return {
      _id,
      ...rest,
    }
  }

  async findByUser(userId: string): Promise<ISession[]> {
    const docs = await this.model.find({ user: userId })
    return docs.map((doc) => this.mapToEntity(doc))
  }
}
