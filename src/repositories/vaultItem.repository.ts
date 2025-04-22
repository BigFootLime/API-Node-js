// 📁 src/repositories/vaultItem.repository.ts
import { MongooseRepository } from './mongoose.repository'
import { VaultItemModel, IVaultItem } from '../models/vaultItem.model'

export class VaultItemRepository extends MongooseRepository<IVaultItem, IVaultItem> {
  constructor() {
    super(VaultItemModel)
  }

  protected mapToEntity(doc: any): IVaultItem {
    const { _id, ...rest } = doc.toObject()
    return {
      _id,
      ...rest,
    }
  }

  async findByVault(vaultId: string): Promise<IVaultItem[]> {
    const docs = await this.model.find({ vault: vaultId, isDeleted: false }).exec()
    return docs.map((doc) => this.mapToEntity(doc))
  }
}
