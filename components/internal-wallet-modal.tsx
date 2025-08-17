"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Copy, ExternalLink, X, Coins, TrendingUp, Clock } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface InternalWalletModalProps {
  isOpen: boolean
  onClose: () => void
  bonkBalance: number
  onBalanceUpdate: (newBalance: number) => void
}

interface Transaction {
  id: string
  type: "send" | "receive" | "stake" | "unstake" | "nft_purchase" | "reward"
  amount: number
  token: string
  description: string
  timestamp: Date
  status: "completed" | "pending" | "failed"
  txHash?: string
}

export function InternalWalletModal({ isOpen, onClose, bonkBalance, onBalanceUpdate }: InternalWalletModalProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [sendAmount, setSendAmount] = useState("")
  const [sendAddress, setSendAddress] = useState("")
  const { toast } = useToast()

  const walletAddress = "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"

  const transactions: Transaction[] = [
    {
      id: "1",
      type: "reward",
      amount: 250,
      token: "BONK",
      description: "Weekly Drop Reward",
      timestamp: new Date(Date.now() - 3600000),
      status: "completed",
      txHash: "5KJp9X2vN8..."
    },
    {
      id: "2", 
      type: "nft_purchase",
      amount: -1500,
      token: "BONK",
      description: "Purchased: Haaland Golden Moment",
      timestamp: new Date(Date.now() - 7200000),
      status: "completed",
      txHash: "8Nm4Q7wR3..."
    },
    {
      id: "3",
      type: "stake",
      amount: -5000,
      token: "BONK", 
      description: "Staked in Pool #1",
      timestamp: new Date(Date.now() - 86400000),
      status: "completed",
      txHash: "2Lp8K9mT5..."
    },
    {
      id: "4",
      type: "receive",
      amount: 1000,
      token: "BONK",
      description: "Match Voting Reward",
      timestamp: new Date(Date.now() - 172800000),
      status: "completed",
      txHash: "9Qr3M6nB8..."
    }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "send": return <ArrowUpRight className="w-4 h-4 text-red-500" />
      case "receive": return <ArrowDownLeft className="w-4 h-4 text-green-500" />
      case "stake": return <TrendingUp className="w-4 h-4 text-blue-500" />
      case "unstake": return <TrendingUp className="w-4 h-4 text-orange-500" />
      case "nft_purchase": return <Coins className="w-4 h-4 text-purple-500" />
      case "reward": return <Coins className="w-4 h-4 text-green-500" />
      default: return <Coins className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800"
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "failed": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(walletAddress)
    toast({
      title: "Address Copied! 📋",
      description: "Wallet address copied to clipboard",
    })
  }

  const handleSend = () => {
    if (!sendAmount || !sendAddress) {
      toast({
        title: "Error ❌",
        description: "Please fill in all fields",
      })
      return
    }

    const amount = parseFloat(sendAmount)
    if (amount > bonkBalance) {
      toast({
        title: "Insufficient Balance ❌",
        description: "You don't have enough BONK tokens",
      })
      return
    }

    onBalanceUpdate(bonkBalance - amount)
    setSendAmount("")
    setSendAddress("")
    
    toast({
      title: "Transaction Sent! 🚀",
      description: `Sent ${amount} BONK successfully`,
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6 text-orange-600" />
              Internal Wallet
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="send">Send</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6">
                  {/* Balance Card */}
                  <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                          {bonkBalance.toLocaleString()} BONK
                        </div>
                        <div className="text-orange-100">≈ $42.50 USD</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Wallet Address */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Wallet Address</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <code className="flex-1 text-sm font-mono text-gray-700">
                          {walletAddress}
                        </code>
                        <Button variant="ghost" size="sm" onClick={handleCopyAddress}>
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <Send className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">Send BONK</h3>
                        <p className="text-sm text-gray-600 mt-1">Transfer to another wallet</p>
                      </CardContent>
                    </Card>

                    <Card className="cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
                      <CardContent className="p-6 text-center">
                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                        <h3 className="font-semibold text-gray-800">Stake BONK</h3>
                        <p className="text-sm text-gray-600 mt-1">Earn passive rewards</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Transactions */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {transactions.slice(0, 3).map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              {getTransactionIcon(tx.type)}
                              <div>
                                <div className="font-medium text-gray-800">{tx.description}</div>
                                <div className="text-sm text-gray-600 flex items-center gap-2">
                                  <Clock className="w-3 h-3" />
                                  {tx.timestamp.toLocaleTimeString()}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.token}
                              </div>
                              <Badge className={`text-xs ${getStatusColor(tx.status)}`}>
                                {tx.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="send" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Send BONK Tokens</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recipient Address
                        </label>
                        <Input
                          placeholder="Enter wallet address..."
                          value={sendAddress}
                          onChange={(e) => setSendAddress(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Amount (BONK)
                        </label>
                        <Input
                          type="number"
                          placeholder="0"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(e.target.value)}
                        />
                        <div className="text-sm text-gray-600 mt-1">
                          Available: {bonkBalance.toLocaleString()} BONK
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="text-sm text-yellow-800">
                          <strong>Transaction Fee:</strong> ~0.00025 SOL
                        </div>
                      </div>

                      <Button 
                        onClick={handleSend}
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        disabled={!sendAmount || !sendAddress}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Send BONK
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="history" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <Card key={tx.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getTransactionIcon(tx.type)}
                            <div>
                              <div className="font-medium text-gray-800">{tx.description}</div>
                              <div className="text-sm text-gray-600 flex items-center gap-2">
                                <Clock className="w-3 h-3" />
                                {tx.timestamp.toLocaleDateString()} {tx.timestamp.toLocaleTimeString()}
                              </div>
                              {tx.txHash && (
                                <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                                  <code>{tx.txHash}</code>
                                  <Button variant="ghost" size="sm" className="h-4 w-4 p-0">
                                    <ExternalLink className="w-3 h-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} {tx.token}
                            </div>
                            <Badge className={`text-xs ${getStatusColor(tx.status)}`}>
                              {tx.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
