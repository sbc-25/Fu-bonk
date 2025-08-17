"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Coins, Zap, Send, ShoppingCart, TrendingUp, Gift, Star, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

interface BonkIntegrationFeaturesProps {
  isOpen: boolean
  onClose: () => void
}

export function BonkIntegrationFeatures({ isOpen, onClose }: BonkIntegrationFeaturesProps) {
  const [paymentAmount, setPaymentAmount] = useState("")
  const [stakeAmount, setStakeAmount] = useState("")

  const bonkStats = {
    balance: 15420,
    staked: 5000,
    earned: 2340,
    spent: 1200,
    apy: 12.5,
    dailyRewards: 15,
  }

  const paymentOptions = [
    {
      id: "merchandise",
      name: "Stadium Merchandise",
      description: "Official BVB gear and accessories",
      discount: 10,
      icon: <ShoppingCart className="w-5 h-5" />,
      color: "bg-blue-500",
    },
    {
      id: "tickets",
      name: "Match Tickets",
      description: "Priority booking with BONK",
      discount: 5,
      icon: <Star className="w-5 h-5" />,
      color: "bg-green-500",
    },
    {
      id: "food",
      name: "Stadium Food & Drinks",
      description: "Skip the lines, pay with BONK",
      discount: 15,
      icon: <Gift className="w-5 h-5" />,
      color: "bg-orange-500",
    },
  ]

  const recentTransactions = [
    {
      id: "1",
      type: "payment",
      description: "Stadium Bratwurst",
      amount: 25,
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "reward",
      description: "Daily Staking Reward",
      amount: 15,
      timestamp: "1 day ago",
      status: "completed",
    },
    {
      id: "3",
      type: "payment",
      description: "BVB Jersey Purchase",
      amount: 150,
      timestamp: "3 days ago",
      status: "completed",
    },
    {
      id: "4",
      type: "reward",
      description: "Video Like Bonus",
      amount: 5,
      timestamp: "5 days ago",
      status: "completed",
    },
  ]

  const stakingPools = [
    {
      id: "flexible",
      name: "Flexible Staking",
      apy: 8.5,
      minStake: 100,
      lockPeriod: "None",
      description: "Withdraw anytime",
    },
    {
      id: "30day",
      name: "30-Day Lock",
      apy: 12.5,
      minStake: 500,
      lockPeriod: "30 days",
      description: "Higher rewards for commitment",
    },
    {
      id: "90day",
      name: "90-Day Lock",
      apy: 18.0,
      minStake: 1000,
      lockPeriod: "90 days",
      description: "Maximum rewards",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            BONK Integration Features
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="payments" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="payments">Pay</TabsTrigger>
            <TabsTrigger value="staking">Stake</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <ScrollArea className="max-h-[70vh]">
            <div className="pr-4">
              <TabsContent value="payments" className="space-y-4">
                <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-1">Available Balance</div>
                      <div className="text-3xl font-bold mb-2">{bonkStats.balance.toLocaleString()} BONK</div>
                      <div className="text-sm opacity-75">≈ ${(bonkStats.balance * 0.000012).toFixed(2)} USD</div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Pay with BONK</h3>
                  {paymentOptions.map((option) => (
                    <Card key={option.id} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${option.color} rounded-full flex items-center justify-center text-white`}>
                            {option.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold text-sm">{option.name}</div>
                            <div className="text-xs text-gray-600">{option.description}</div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-green-100 text-green-800 text-xs">
                              {option.discount}% OFF
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Quick Payment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Enter BONK amount"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setPaymentAmount("50")}>
                        50
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setPaymentAmount("100")}>
                        100
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setPaymentAmount("250")}>
                        250
                      </Button>
                    </div>
                    <Button className="w-full bg-orange-500 hover:bg-orange-600">
                      <Send className="w-4 h-4 mr-2" />
                      Send Payment
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="staking" className="space-y-4">
                <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-sm opacity-90">Currently Staked</div>
                        <div className="text-2xl font-bold">{bonkStats.staked.toLocaleString()}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm opacity-90">Daily Rewards</div>
                        <div className="text-2xl font-bold">{bonkStats.dailyRewards}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Staking Pools</h3>
                  {stakingPools.map((pool) => (
                    <Card key={pool.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold text-sm">{pool.name}</div>
                          <Badge className="bg-green-100 text-green-800">
                            {pool.apy}% APY
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600 mb-3">{pool.description}</div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                          <div>Min: {pool.minStake} BONK</div>
                          <div>Lock: {pool.lockPeriod}</div>
                        </div>
                        <Button size="sm" className="w-full">
                          Stake Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Stake BONK</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Enter amount to stake"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" onClick={() => setStakeAmount("500")}>
                        500
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setStakeAmount("1000")}>
                        1K
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setStakeAmount("2500")}>
                        2.5K
                      </Button>
                    </div>
                    <Button className="w-full bg-green-500 hover:bg-green-600">
                      <Zap className="w-4 h-4 mr-2" />
                      Start Staking
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-1">Total Earned</div>
                      <div className="text-3xl font-bold mb-2">{bonkStats.earned.toLocaleString()} BONK</div>
                      <div className="text-sm opacity-75">This month</div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-600">{bonkStats.dailyRewards}</div>
                      <div className="text-xs text-gray-600">Daily Rewards</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-yellow-600">{bonkStats.apy}%</div>
                      <div className="text-xs text-gray-600">Current APY</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Earning Opportunities</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Watch Videos</div>
                        <div className="text-xs text-gray-600">Earn 2-5 BONK per video</div>
                      </div>
                      <Badge className="bg-blue-500 text-white">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Daily Check-in</div>
                        <div className="text-xs text-gray-600">Get 10 BONK daily</div>
                      </div>
                      <Badge className="bg-green-500 text-white">Available</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">Refer Friends</div>
                        <div className="text-xs text-gray-600">Earn 200 BONK per referral</div>
                      </div>
                      <Badge className="bg-purple-500 text-white">Bonus</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Recent Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-64">
                      <div className="space-y-3 pr-4">
                        {recentTransactions.map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                tx.type === "reward" ? "bg-green-100" : "bg-red-100"
                              }`}>
                                {tx.type === "reward" ? (
                                  <ArrowDownLeft className="w-4 h-4 text-green-600" />
                                ) : (
                                  <ArrowUpRight className="w-4 h-4 text-red-600" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{tx.description}</div>
                                <div className="text-xs text-gray-500">{tx.timestamp}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`font-bold text-sm ${
                                tx.type === "reward" ? "text-green-600" : "text-red-600"
                              }`}>
                                {tx.type === "reward" ? "+" : "-"}{tx.amount} BONK
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {tx.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Monthly Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Earned</span>
                        <span className="font-bold text-green-600">+{bonkStats.earned} BONK</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Total Spent</span>
                        <span className="font-bold text-red-600">-{bonkStats.spent} BONK</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Net Change</span>
                          <span className="font-bold text-blue-600">
                            +{bonkStats.earned - bonkStats.spent} BONK
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
