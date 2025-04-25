// 📁 src/controllers/vault.controller.ts
import { Request, Response } from 'express'
import { VaultService } from '../services/vault.service'

const vaultService = new VaultService()

export class VaultController {
  async getAll(req: Request, res: Response) {
    const vaults = await vaultService.findAll()
    res.status(200).json(vaults)
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params
    const vault = await vaultService.findById(id)
    res.status(200).json(vault)
  }

  async create(req: Request, res: Response) {
    const vault = await vaultService.create(req.body)
    res.status(201).json(vault)
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    const vault = await vaultService.update(id, req.body)
    res.status(200).json(vault)
  }
  

  // async delete(req: Request, res: Response) {
  //   const { id } = req.params
  //   await vaultService.delete(id)
  //   res.status(204).send()
  // }
}