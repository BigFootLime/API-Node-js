// 📁 src/middlewares/verifyMasterPassword.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { VaultService } from '../services/vault.service'

const vaultService = new VaultService()

export const verifyMasterPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { vaultId, password } = req.body || req.query

    if (!vaultId || !password) {
      res.status(400).json({ message: 'Vault ID and master password are required.' })
      return
    }

    const result = await vaultService.verifyVaultPassword(vaultId as string, password as string)

    if (!result.success) {
      res.status(401).json({ message: 'Invalid master password.' })
      return
    }

    // ✅ valid, continue
    next()
  } catch (error) {
    console.error('🔒 verifyMasterPassword middleware error:', error)
    res.status(500).json({ message: 'Erreur serveur.' })
    return
  }
}
