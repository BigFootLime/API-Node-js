// 📁 src/controllers/auditLog.controller.ts
import { Request, Response } from 'express'
import { AuditLogService } from '../services/auditLog.service'

const service = new AuditLogService()

export class AuditLogController {
  async getAll(req: Request, res: Response) {
    const logs = await service.findAll()
    res.status(200).json(logs)
  }

  async getByUser(req: Request, res: Response) {
    const { userId } = req.params
    const logs = await service.findByUser(userId)
    res.status(200).json(logs)
  }

  async create(req: Request, res: Response) {
    const log = await service.create(req.body)
    res.status(201).json(log)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params
    await service.delete(id)
    res.status(204).send()
  }
}
