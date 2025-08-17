export interface WalletConnection {
  address: string
  publicKey: string
  connected: boolean
  provider: string
}

export interface WalletBalance {
  sol: number
  bonk: number
  lastUpdated: Date
}

export class WalletService {
  private static connection: WalletConnection | null = null

  static async connectWallet(provider: string): Promise<WalletConnection | null> {
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockConnection: WalletConnection = {
        address: this.generateMockAddress(),
        publicKey: this.generateMockPublicKey(),
        connected: true,
        provider,
      }

      this.connection = mockConnection
      this.saveConnection(mockConnection)

      return mockConnection
    } catch (error) {
      console.error("Failed to connect wallet:", error)
      return null
    }
  }

  static disconnectWallet(): void {
    this.connection = null
    if (typeof window !== "undefined") {
      localStorage.removeItem("wallet_connection")
    }
  }

  static getConnection(): WalletConnection | null {
    if (this.connection) return this.connection

    if (typeof window === "undefined") return null

    const stored = localStorage.getItem("wallet_connection")
    if (!stored) return null

    try {
      this.connection = JSON.parse(stored)
      return this.connection
    } catch {
      return null
    }
  }

  static async getBalance(address: string): Promise<WalletBalance | null> {
    try {
      // Simulate balance fetch
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        sol: Math.random() * 10,
        bonk: Math.floor(Math.random() * 100000),
        lastUpdated: new Date(),
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error)
      return null
    }
  }

  static async sendTransaction(to: string, amount: number, token: "SOL" | "BONK"): Promise<string | null> {
    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Return mock transaction signature
      return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    } catch (error) {
      console.error("Transaction failed:", error)
      return null
    }
  }

  private static saveConnection(connection: WalletConnection): void {
    if (typeof window === "undefined") return
    localStorage.setItem("wallet_connection", JSON.stringify(connection))
  }

  private static generateMockAddress(): string {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz123456789"
    let result = ""
    for (let i = 0; i < 44; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  private static generateMockPublicKey(): string {
    return this.generateMockAddress()
  }
}
