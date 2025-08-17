"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface WalletBalance {
  bonk: number
  eth: number
  sol: number
}

interface Wallet {
  address: string
  balance: WalletBalance
  isConnected: boolean
}

interface WalletContextType {
  wallet: Wallet | null
  connect: (walletType: string) => Promise<void>
  disconnect: () => void
  connecting: boolean
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<Wallet | null>(null)
  const [connecting, setConnecting] = useState(false)

  const connect = async (walletType: string) => {
    setConnecting(true)
    
    // Simulate wallet connection
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setWallet({
      address: "0x1234...5678",
      balance: {
        bonk: Math.floor(Math.random() * 10000),
        eth: Math.random() * 5,
        sol: Math.random() * 100
      },
      isConnected: true
    })
    
    setConnecting(false)
  }

  const disconnect = () => {
    setWallet(null)
  }

  return (
    <WalletContext.Provider value={{ wallet, connect, disconnect, connecting }}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
