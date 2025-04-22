// 📁 src/services/vault.service.ts
import { VaultModel, IVault } from '../models/vault.model'
import { CreateVaultInput, UpdateVaultInput } from '../types/validators/vault.schema'
import { NotFoundError } from '../utils/error.utils'
import { LoggerService } from './logger.service'
import { Types } from 'mongoose'

export class VaultService {
  private readonly logger = new LoggerService()

  async findAll(): Promise<IVault[]> {
    return VaultModel.find({ isDeleted: false }).populate('owner')
  }

  async findById(id: string): Promise<IVault> {
    const vault = await VaultModel.findById(id).populate('owner members')
    if (!vault || vault.isDeleted) {
      throw new NotFoundError(`Vault with id ${id} not found`)
    }
    return vault
  }

  async create(data: CreateVaultInput): Promise<IVault> {
    const vault = new VaultModel(data)
    const result = await vault.save()

    await this.logger.audit({
      user: data.owner,
      action: 'vault_created',
      resourceType: 'Vault',
      resourceId: (result._id as Types.ObjectId).toString(),
    })

    return result
  }

  async update(id: string, data: UpdateVaultInput): Promise<IVault> {
    const updated = await VaultModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).populate('owner')

    if (!updated) {
      throw new NotFoundError(`Vault with id ${id} not found`)
    }
    return updated
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await VaultModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedAt: new Date(),
    })

    if (!result) {
      throw new NotFoundError(`Vault with id ${id} not found`)
    }

    await this.logger.audit({
      user: userId,
      action: 'vault_deleted',
      resourceType: 'Vault',
      resourceId: id,
    })

    return true
  }
}