export interface InternalWallet {
  id: string
  address: string
  bonkBalance: number
  solBalance: number
  createdAt: Date
  lastActivity: Date
}

export class InternalWalletService {
  private static readonly STORAGE_KEY = "bonk_internal_wallet"

  static createWallet(): InternalWallet {
    const wallet: InternalWallet = {
      id: Math.random().toString(36).substring(2, 15),
      address: this.generateAddress(),
      bonkBalance: 1000, // Starting bonus
      solBalance: 0.1,
      createdAt: new Date(),
      lastActivity: new Date(),
    }

    this.saveWallet(wallet)
    return wallet
  }

  static getWallet(): InternalWallet | null {
    if (typeof window === "undefined") return null

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) return null

    const wallet = JSON.parse(stored)
    return {
      ...wallet,
      createdAt: new Date(wallet.createdAt),
      lastActivity: new Date(wallet.lastActivity),
    }
  }

  static saveWallet(wallet: InternalWallet): void {
    if (typeof window === "undefined") return

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(wallet))
  }

  static updateBalance(bonkAmount: number, solAmount = 0): InternalWallet | null {
    const wallet = this.getWallet()
    if (!wallet) return null

    wallet.bonkBalance += bonkAmount
    wallet.solBalance += solAmount
    wallet.lastActivity = new Date()

    this.saveWallet(wallet)
    return wallet
  }

  static addBonkReward(amount: number): InternalWallet | null {
    return this.updateBalance(amount, 0)
  }

  private static generateAddress(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789"
    let result = ""
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
}
