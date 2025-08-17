"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface WalletBalance {
  bonk: number
  sol: number
  usdc: number
}

interface Wallet {
  address: string
  balance: WalletBalance
  isConnected: boolean
}

interface WalletContextType {
  wallet: Wallet | null
  connect: () => Promise<void>
  disconnect: () => void
  connecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [connecting, setConnecting] = useState(false)

  useEffect(() => {
    // Check for existing wallet connection
    const savedWallet = localStorage.getItem("bonk-wallet")
    if (savedWallet) {
      setWallet(JSON.parse(savedWallet))
    }
  }, [])

  const connect = async () => {
    setConnecting(true)
    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const newWallet: Wallet = {
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: {
          bonk: 15420,
          sol: 2.5,
          usdc: 150.75,
        },
        isConnected: true,
      }

      setWallet(newWallet)
      localStorage.setItem("bonk-wallet", JSON.stringify(newWallet))
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    } finally {
      setConnecting(false)
    }
  }

  const disconnect = () => {
    setWallet(null)
    localStorage.removeItem("bonk-wallet")
  }

  return <WalletContext.Provider value={{ wallet, connect, disconnect, connecting }}>{children}</WalletContext.Provider>
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
