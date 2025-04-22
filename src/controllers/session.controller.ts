// 📁 src/controllers/session.controller.ts
import { Request, Response } from 'express'
import { SessionService } from '../services/session.service'

const sessionService = new SessionService()

export class SessionController {
  async getAll(req: Request, res: Response) {
    const sessions = await sessionService.findAll()
    res.status(200).json(sessions)
  }

  async create(req: Request, res: Response) {
    const session = await sessionService.create(req.body)
    res.status(201).json(session)
  }

  async revoke(req: Request, res: Response) {
    const { token } = req.body
    await sessionService.deleteByToken(token)
    res.status(204).send()
  }

  async deleteUserSessions(req: Request, res: Response) {
    const { userId } = req.params
    const count = await sessionService.deleteByUser(userId)
    res.status(200).json({ deleted: count })
  }
}
