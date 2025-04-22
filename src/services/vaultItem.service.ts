// 📁 src/services/vaultItem.service.ts
import { VaultItemModel, IVaultItem } from '../models/vaultItem.model'
import { CreateVaultItemInput, UpdateVaultItemInput } from '../types/validators/vaultItem.schema'
import { NotFoundError } from '../utils/error.utils'
import { LoggerService } from './logger.service'
import { Types } from 'mongoose'

export class VaultItemService {
  private readonly logger = new LoggerService()

  async findAll(): Promise<IVaultItem[]> {
    return VaultItemModel.find({ isDeleted: false }).populate('vault createdBy')
  }

  async findById(id: string): Promise<IVaultItem> {
    const item = await VaultItemModel.findById(id).populate('vault createdBy')
    if (!item || item.isDeleted) {
      throw new NotFoundError(`Vault item with id ${id} not found`)
    }
    return item
  }

  async findByVault(vaultId: string): Promise<IVaultItem[]> {
    return VaultItemModel.find({ vault: vaultId, isDeleted: false }).populate('createdBy')
  }

  async create(data: CreateVaultItemInput): Promise<IVaultItem> {
    const item = new VaultItemModel(data)
    const result = await item.save()

    await this.logger.audit({
      user: data.createdBy,
      action: 'vault_item_created',
      resourceType: 'VaultItem',
      resourceId: (result._id as Types.ObjectId).toString(),
    })

    return result
  }

  async update(id: string, data: UpdateVaultItemInput): Promise<IVaultItem> {
    const updated = await VaultItemModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true }
    ).populate('vault createdBy')

    if (!updated) {
      throw new NotFoundError(`Vault item with id ${id} not found`)
    }
    return updated
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await VaultItemModel.findByIdAndUpdate(id, {
      isDeleted: true,
      updatedAt: new Date(),
    })
    if (!result) {
      throw new NotFoundError(`Vault item with id ${id} not found`)
    }

    await this.logger.audit({
      user: userId,
      action: 'vault_item_deleted',
      resourceType: 'VaultItem',
      resourceId: id,
    })

    return true
  }
}