export interface UserPoints {
  total: number
  daily: number
  weekly: number
  monthly: number
  lastUpdated: Date
}

export interface PointsTransaction {
  id: string
  amount: number
  reason: string
  timestamp: Date
  type: "earned" | "spent"
}

export class PointsSystem {
  private static readonly STORAGE_KEY = "bonk_points"
  private static readonly TRANSACTIONS_KEY = "bonk_points_transactions"

  static getUserPoints(): number {
    if (typeof window === "undefined") return 0

    const stored = localStorage.getItem(this.STORAGE_KEY)
    if (!stored) return 0

    const points = JSON.parse(stored)
    return points.total || 0
  }

  static addPoints(amount: number, reason: string): number {
    if (typeof window === "undefined") return 0

    const currentPoints = this.getUserPoints()
    const newTotal = currentPoints + amount

    const pointsData = {
      total: newTotal,
      daily: 0, // Reset daily tracking logic would go here
      weekly: 0,
      monthly: 0,
      lastUpdated: new Date(),
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pointsData))

    // Record transaction
    this.recordTransaction(amount, reason, "earned")

    return newTotal
  }

  static spendPoints(amount: number, reason: string): boolean {
    if (typeof window === "undefined") return false

    const currentPoints = this.getUserPoints()
    if (currentPoints < amount) return false

    const newTotal = currentPoints - amount

    const pointsData = {
      total: newTotal,
      daily: 0,
      weekly: 0,
      monthly: 0,
      lastUpdated: new Date(),
    }

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(pointsData))

    // Record transaction
    this.recordTransaction(amount, reason, "spent")

    return true
  }

  static getTransactions(): PointsTransaction[] {
    if (typeof window === "undefined") return []

    const stored = localStorage.getItem(this.TRANSACTIONS_KEY)
    if (!stored) return []

    const transactions = JSON.parse(stored)
    return transactions.map((tx: any) => ({
      ...tx,
      timestamp: new Date(tx.timestamp),
    }))
  }

  private static recordTransaction(amount: number, reason: string, type: "earned" | "spent"): void {
    if (typeof window === "undefined") return

    const transactions = this.getTransactions()
    const newTransaction: PointsTransaction = {
      id: Math.random().toString(36).substring(2, 15),
      amount,
      reason,
      timestamp: new Date(),
      type,
    }

    transactions.unshift(newTransaction)

    // Keep only last 100 transactions
    const limitedTransactions = transactions.slice(0, 100)

    localStorage.setItem(this.TRANSACTIONS_KEY, JSON.stringify(limitedTransactions))
  }

  static getPointsForAction(action: string): number {
    const pointsMap: Record<string, number> = {
      video_like: 5,
      video_share: 10,
      video_comment: 8,
      video_upload: 50,
      daily_login: 20,
      quest_complete: 100,
      game_win: 25,
      nft_purchase: 15,
      stadium_checkin: 75,
    }

    return pointsMap[action] || 0
  }
}
