// 📁 src/controllers/vaultItem.controller.ts
import { Request, RequestHandler, Response } from 'express'
import { VaultItemService } from '../services/vaultItem.service'

const service = new VaultItemService()

export class VaultItemController {
  async getAll(req: Request, res: Response) {
    const items = await service.findAll()
    res.status(200).json(items)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const item = await service.findById(id)
    res.status(200).json(item)
  }

  async getByVault(req: Request, res: Response) {
    const { vaultId } = req.params
    const items = await service.findByVault(vaultId)
    res.status(200).json(items)
  }

  async create(req: Request, res: Response) {
    const item = await service.create(req.body)
    res.status(201).json(item)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const item = await service.update(id, req.body)
    res.status(200).json(item)
  }
  getAllItemsForVault: RequestHandler = async (req, res) => {
    const vaultId = req.query.vaultId as string
    const items = await service.getItemsByVault(vaultId)
    res.status(200).json(items)
  }
  // async delete(req: Request, res: Response) {
  //   const { id } = req.params
  //   await service.delete(id)
  //   res.status(204).send()
  // }
}