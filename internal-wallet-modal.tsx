"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Copy, QrCode, History, Zap, X, Minus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface InternalWalletModalProps {
  isOpen: boolean
  onClose: () => void
  bonkBalance: number
  onBalanceUpdate: (newBalance: number) => void
}

interface Transaction {
  id: string
  type: "send" | "receive" | "stake" | "unstake"
  amount: number
  currency: "BONK"
  timestamp: Date
  status: "completed" | "pending" | "failed"
  description: string
  txHash?: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    type: "receive",
    amount: 5000,
    currency: "BONK",
    timestamp: new Date(Date.now() - 3600000),
    status: "completed",
    description: "Reward for watching match",
    txHash: "abc123...",
  },
  {
    id: "2",
    type: "send",
    amount: 2500,
    currency: "BONK",
    timestamp: new Date(Date.now() - 7200000),
    status: "completed",
    description: "NFT purchase",
    txHash: "def456...",
  },
  {
    id: "3",
    type: "stake",
    amount: 10000,
    currency: "BONK",
    timestamp: new Date(Date.now() - 86400000),
    status: "completed",
    description: "Staked for rewards",
    txHash: "ghi789...",
  },
]

export function InternalWalletModal({ isOpen, onClose, bonkBalance, onBalanceUpdate }: InternalWalletModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const walletAddress = "BVS7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJos"

  const handleSend = async () => {
    if (!sendAmount || !sendAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter both amount and recipient address",
        variant: "destructive",
      })
      return
    }

    const amount = Number.parseFloat(sendAmount)
    if (amount > bonkBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough BONK tokens",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Simulate transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        type: "send",
        amount: amount,
        currency: "BONK",
        timestamp: new Date(),
        status: "completed",
        description: `Sent to ${sendAddress.slice(0, 8)}...`,
        txHash: `tx${Date.now()}`,
      }

      setTransactions((prev) => [newTransaction, ...prev])
      onBalanceUpdate(bonkBalance - amount)
      setSendAmount("")
      setSendAddress("")

      toast({
        title: "Transaction Successful",
        description: `Sent ${amount} BONK tokens`,
      })
    } catch (error) {
      toast({
        title: "Transaction Failed",
        description: "Failed to send tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send":
        return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "receive":
        return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "stake":
        return <Zap className="w-4 h-4 text-blue-500" />
      case "unstake":
        return <Minus className="w-4 h-4 text-orange-500" />
      default:
        return <History className="w-4 h-4" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[80vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              BONK Wallet
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 overflow-hidden flex flex-col">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-6">
                {/* Balance Card */}
                <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Wallet className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-orange-900 mb-2">{bonkBalance.toLocaleString()} BONK</h3>
                    <p className="text-orange-700 text-sm">≈ ${(bonkBalance * 0.000001).toFixed(2)} USD</p>
                  </CardContent>
                </Card>

                {/* Wallet Address */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Wallet Address</label>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 text-sm font-mono text-gray-700">
                      {walletAddress.slice(0, 8)}...{walletAddress.slice(-8)}
                    </span>
                    <Button variant="ghost" size="sm" onClick={copyAddress}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <QrCode className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={() => setActiveTab("send")} className="bg-orange-500 hover:bg-orange-600">
                    <Send className="w-4 h-4 mr-2" />
                    Send
                  </Button>
                  <Button variant="outline">
                    <ArrowDownLeft className="w-4 h-4 mr-2" />
                    Receive
                  </Button>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="font-medium mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    {transactions.slice(0, 3).map((tx) => (
                      <div key={tx.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getTransactionIcon(tx.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{tx.description}</p>
                          <p className="text-xs text-gray-500">{tx.timestamp.toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-medium ${
                              tx.type === "receive" ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {tx.type === "receive" ? "+" : "-"}
                            {tx.amount.toLocaleString()}
                          </p>
                          <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                            {tx.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="send" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Recipient Address</label>
                  <Input
                    placeholder="Enter BONK wallet address..."
                    value={sendAddress}
                    onChange={(e) => setSendAddress(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Amount (BONK)</label>
                  <div className="relative">
                    <Input
                      type="number"
                      placeholder="0"
                      value={sendAmount}
                      onChange={(e) => setSendAmount(e.target.value)}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs"
                      onClick={() => setSendAmount(bonkBalance.toString())}
                    >
                      MAX
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Available: {bonkBalance.toLocaleString()} BONK</p>
                </div>

                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Amount:</span>
                    <span>{sendAmount || "0"} BONK</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Network Fee:</span>
                    <span>~0.001 SOL</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium pt-1 border-t">
                    <span>Total:</span>
                    <span>{sendAmount || "0"} BONK + fee</span>
                  </div>
                </div>

                <Button
                  onClick={handleSend}
                  disabled={!sendAmount || !sendAddress || isLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  {isLoading ? "Sending..." : "Send BONK"}
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="history" className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-3">
                {transactions.map((tx) => (
                  <Card key={tx.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        {getTransactionIcon(tx.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-sm">{tx.description}</p>
                            <p
                              className={`font-medium text-sm ${
                                tx.type === "receive" ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {tx.type === "receive" ? "+" : "-"}
                              {tx.amount.toLocaleString()} BONK
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">{tx.timestamp.toLocaleString()}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant={tx.status === "completed" ? "default" : "secondary"} className="text-xs">
                                {tx.status}
                              </Badge>
                              {tx.txHash && (
                                <Button variant="ghost" size="sm" className="p-1">
                                  <Copy className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
