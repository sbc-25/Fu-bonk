"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Wallet, Copy, Shield, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface WalletConnectProps {
  isOpen: boolean
  onClose: () => void
  onWalletConnect: (wallet: any) => void
}

const walletProviders = [
  {
    name: "Phantom",
    icon: "/placeholder.svg?height=40&width=40",
    description: "The most popular Solana wallet",
    installed: true,
    recommended: true,
  },
  {
    name: "Solflare",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Secure and user-friendly",
    installed: false,
    recommended: false,
  },
  {
    name: "Backpack",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Next-gen crypto wallet",
    installed: false,
    recommended: false,
  },
  {
    name: "Glow",
    icon: "/placeholder.svg?height=40&width=40",
    description: "Stake and earn rewards",
    installed: false,
    recommended: false,
  },
]

export function WalletConnect({ isOpen, onClose, onWalletConnect }: WalletConnectProps) {
  const [connecting, setConnecting] = useState<string | null>(null)
  const [connectedWallet, setConnectedWallet] = useState<any>(null)
  const { toast } = useToast()

  const handleWalletConnect = async (walletName: string) => {
    setConnecting(walletName)

    try {
      // Simulate wallet connection
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const mockWallet = {
        name: walletName,
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
        balance: 1250.75,
        bonkBalance: 50000,
      }

      setConnectedWallet(mockWallet)
      onWalletConnect(mockWallet)

      toast({
        title: "Wallet Connected!",
        description: `Successfully connected to ${walletName}`,
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setConnecting(null)
    }
  }

  const copyAddress = () => {
    if (connectedWallet) {
      navigator.clipboard.writeText(connectedWallet.address)
      toast({
        title: "Address Copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Connect Wallet
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {connectedWallet ? (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg">Wallet Connected!</h3>
                <p className="text-gray-600">{connectedWallet.name}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Address:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-mono">
                      {connectedWallet.address.slice(0, 4)}...{connectedWallet.address.slice(-4)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">SOL Balance:</span>
                  <span className="text-sm font-semibold">{connectedWallet.balance} SOL</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">BONK Balance:</span>
                  <span className="text-sm font-semibold text-orange-600">
                    {connectedWallet.bonkBalance.toLocaleString()} BONK
                  </span>
                </div>
              </div>

              <Button onClick={onClose} className="w-full">
                Continue to Platform
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="font-semibold text-lg mb-2">Choose Your Wallet</h3>
                <p className="text-gray-600 text-sm">Connect your Solana wallet to access BONK VS Platform</p>
              </div>

              <div className="space-y-3">
                {walletProviders.map((wallet) => (
                  <Card
                    key={wallet.name}
                    className={`cursor-pointer transition-all hover:shadow-md ${!wallet.installed ? "opacity-60" : ""}`}
                    onClick={() => wallet.installed && handleWalletConnect(wallet.name)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={wallet.icon || "/placeholder.svg"} />
                          <AvatarFallback>{wallet.name[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{wallet.name}</span>
                            {wallet.recommended && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Recommended</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{wallet.description}</p>
                        </div>

                        <div className="flex flex-col items-end gap-1">
                          {wallet.installed ? (
                            <Badge variant="secondary" className="text-xs">
                              {connecting === wallet.name ? "Connecting..." : "Installed"}
                            </Badge>
                          ) : (
                            <Button variant="outline" size="sm" className="text-xs bg-transparent">
                              Install
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Secure Connection</h4>
                    <p className="text-sm text-blue-700">
                      Your wallet connection is encrypted and secure. We never store your private keys.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
