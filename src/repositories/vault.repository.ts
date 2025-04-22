import { MongooseRepository } from './mongoose.repository'
import { VaultModel, IVault } from '../models/vault.model'

export class VaultRepository extends MongooseRepository<IVault, IVault> {
  constructor() {
    super(VaultModel)
  }

  protected mapToEntity(doc: any): IVault {
    const { _id, ...rest } = doc.toObject()
    return {
      _id,
      ...rest,
    }
  }

  async findByOwner(userId: string): Promise<IVault[]> {
    const docs = await this.model.find({ owner: userId, isDeleted: false })
    return docs.map((doc) => this.mapToEntity(doc))
  }
}
