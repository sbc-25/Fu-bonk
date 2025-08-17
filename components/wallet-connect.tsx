"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Wallet, Smartphone, Globe, Zap, Shield, Star } from 'lucide-react'
import { useWallet } from "@/components/wallet-provider"

interface WalletConnectProps {
  isOpen: boolean
  onClose: () => void
  onWalletConnect: () => void
}

export function WalletConnect({ isOpen, onClose, onWalletConnect }: WalletConnectProps) {
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null)
  const { connect, connecting } = useWallet()

  const wallets = [
    {
      id: "metamask",
      name: "MetaMask",
      icon: "🦊",
      description: "Connect using MetaMask wallet",
      popular: true,
      features: ["Browser Extension", "Mobile App", "Hardware Wallet Support"]
    },
    {
      id: "phantom",
      name: "Phantom",
      icon: "👻",
      description: "Solana wallet for BONK tokens",
      popular: true,
      features: ["Solana Native", "NFT Support", "DeFi Integration"]
    },
    {
      id: "walletconnect",
      name: "WalletConnect",
      icon: "🔗",
      description: "Connect with 300+ wallets",
      popular: false,
      features: ["Universal", "QR Code", "Mobile Friendly"]
    },
    {
      id: "coinbase",
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Self-custody wallet by Coinbase",
      popular: false,
      features: ["Easy Setup", "DApp Browser", "Cloud Backup"]
    }
  ]

  const handleConnect = async (walletId: string) => {
    setSelectedWallet(walletId)
    try {
      await connect(walletId)
      onWalletConnect()
      onClose()
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
    setSelectedWallet(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6 text-orange-600" />
              Connect Wallet
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center mb-6">
            <p className="text-gray-600 text-sm">
              Connect your wallet to start earning BONK tokens, collecting NFTs, and accessing exclusive features!
            </p>
          </div>

          <div className="space-y-3">
            {wallets.map((wallet) => (
              <Card
                key={wallet.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
                  selectedWallet === wallet.id ? "ring-2 ring-orange-500" : ""
                }`}
                onClick={() => handleConnect(wallet.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{wallet.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{wallet.name}</h3>
                        {wallet.popular && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{wallet.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {wallet.features.map((feature, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {connecting && selectedWallet === wallet.id ? (
                      <div className="w-6 h-6 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-gray-400" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-800 text-sm mb-1">Secure Connection</h4>
                <p className="text-blue-700 text-xs">
                  We never store your private keys. Your wallet remains fully under your control at all times.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              New to crypto wallets?{" "}
              <a href="#" className="text-orange-600 hover:underline">
                Learn how to get started
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
