"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Coins, Send, CheckCircle, AlertCircle, X, Loader2 } from "lucide-react"
import { walletService } from "@/lib/wallet"
import { PublicKey } from "@solana/web3.js"

interface BonkPaymentProps {
  isOpen: boolean
  onClose: () => void
  recipient?: string
  amount?: number
  purpose?: string
  onSuccess?: (signature: string) => void
}

export function BonkPayment({
  isOpen,
  onClose,
  recipient,
  amount: defaultAmount,
  purpose,
  onSuccess,
}: BonkPaymentProps) {
  const [amount, setAmount] = useState(defaultAmount?.toString() || "")
  const [recipientAddress, setRecipientAddress] = useState(recipient || "")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const wallet = walletService.getWallet()
  const isReadOnly = defaultAmount !== undefined

  const handlePayment = async () => {
    if (!wallet?.publicKey) {
      setError("Wallet not connected")
      return
    }

    if (!recipientAddress || !amount) {
      setError("Please fill in all fields")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const recipientPubkey = new PublicKey(recipientAddress)
      const signature = await walletService.transferBonk(wallet.publicKey, recipientPubkey, Number.parseFloat(amount))

      if (signature) {
        setSuccess(signature)
        onSuccess?.(signature)

        // Auto close after 3 seconds
        setTimeout(() => {
          onClose()
          setSuccess(null)
        }, 3000)
      } else {
        setError("Transaction failed")
      }
    } catch (err: any) {
      setError(err.message || "Transaction failed")
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setAmount(defaultAmount?.toString() || "")
    setRecipientAddress(recipient || "")
    setError(null)
    setSuccess(null)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Send BONK
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          {purpose && <p className="text-sm text-white/90">{purpose}</p>}
        </CardHeader>

        <CardContent className="p-6">
          {success ? (
            <div className="text-center space-y-4">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <div>
                <h3 className="font-bold text-green-800 mb-2">Payment Successful!</h3>
                <p className="text-sm text-gray-600 mb-4">{amount} BONK sent successfully</p>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 mb-1">Transaction ID:</p>
                  <p className="text-xs font-mono break-all">{success}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => window.open(`https://solscan.io/tx/${success}`, "_blank")}
                className="w-full"
              >
                View on Solscan
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Wallet Status */}
              {wallet?.publicKey ? (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-700">Wallet Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">Please connect your wallet first</span>
                </div>
              )}

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (BONK)</label>
                <div className="relative">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    disabled={isReadOnly || loading}
                    className="pr-16"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      BONK
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Recipient Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Address</label>
                <Input
                  placeholder="Solana wallet address..."
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  disabled={!!recipient || loading}
                  className="font-mono text-sm"
                />
              </div>

              <Separator />

              {/* Transaction Summary */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium">{amount || "0"} BONK</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Network Fee:</span>
                  <span className="font-medium">~0.000005 SOL</span>
                </div>
              </div>

              {/* Error Display */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" onClick={reset} disabled={loading} className="flex-1 bg-transparent">
                  Reset
                </Button>
                <Button
                  onClick={handlePayment}
                  disabled={!wallet?.publicKey || !amount || !recipientAddress || loading}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send BONK
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
