"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  Coins,
  Shield,
  Heart,
  Zap,
  TrendingUp,
  Gift,
  ShoppingBag,
  Trophy,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  Calculator,
  Target,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BonkIntegrationFeaturesProps {
  isOpen: boolean
  onClose: () => void
}

export function BonkIntegrationFeatures({ isOpen, onClose }: BonkIntegrationFeaturesProps) {
  const [activeTab, setActiveTab] = useState("payments")
  const [stakeAmount, setStakeAmount] = useState("")
  const [stakingPeriod, setStakingPeriod] = useState("30")
  const [bonkBalance] = useState(15420)
  const [stakedAmount] = useState(5000)
  const { toast } = useToast()

  const calculateStakingRewards = () => {
    const amount = Number.parseFloat(stakeAmount) || 0
    const days = Number.parseInt(stakingPeriod) || 30
    const apy = 0.12 // 12% APY
    const dailyRate = apy / 365
    const rewards = amount * dailyRate * days
    return Math.round(rewards)
  }

  const recentTransactions = [
    {
      id: "1",
      type: "reward",
      amount: 250,
      description: "Weekly Drop Reward",
      timestamp: "2 hours ago",
      icon: <Gift className="w-4 h-4 text-purple-500" />,
    },
    {
      id: "2",
      type: "payment",
      amount: -150,
      description: "NFT Purchase",
      timestamp: "1 day ago",
      icon: <ShoppingBag className="w-4 h-4 text-blue-500" />,
    },
    {
      id: "3",
      type: "staking",
      amount: 45,
      description: "Staking Rewards",
      timestamp: "2 days ago",
      icon: <Zap className="w-4 h-4 text-green-500" />,
    },
    {
      id: "4",
      type: "reward",
      amount: 100,
      description: "Achievement Unlock",
      timestamp: "3 days ago",
      icon: <Trophy className="w-4 h-4 text-yellow-500" />,
    },
  ]

  const handleStake = () => {
    const amount = Number.parseFloat(stakeAmount)
    if (amount > 0 && amount <= bonkBalance) {
      toast({
        title: "BONK Staking erfolgreich! 🚀",
        description: `${amount} BONK für ${stakingPeriod} Tage gestaked`,
      })
      setStakeAmount("")
    } else {
      toast({
        title: "Fehler beim Staking ❌",
        description: "Ungültiger Betrag oder nicht genügend BONK",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5 text-orange-500" />
            BONK Integration
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[600px] mt-4">
            <TabsContent value="payments" className="space-y-4">
              {/* Balance Overview */}
              <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90">BONK Balance</p>
                      <p className="text-3xl font-bold">{bonkBalance.toLocaleString()}</p>
                    </div>
                    <div className="text-4xl">🐕</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm">+12.5% diese Woche</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Features */}
              <div className="space-y-3">
                <Card className="border-orange-200 bg-orange-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                        <Coins className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-orange-800">BONK Zahlungen</h3>
                        <p className="text-sm text-orange-600">Bezahle für NFTs, Tickets und Upgrades mit BONK Token</p>
                      </div>
                    </div>
                    <div className="bg-orange-100 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-orange-500 text-white">10% Rabatt</Badge>
                        <span className="text-sm text-orange-700">auf alle Käufe mit BONK!</span>
                      </div>
                      <p className="text-xs text-orange-600">
                        Schnell, einfach und mit niedrigen Gebühren. Nutze BONK für alle Transaktionen auf der
                        Plattform.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3">Akzeptierte Zahlungen</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">NFT Käufe</span>
                        <Badge className="bg-green-100 text-green-800">✓ BONK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Ticket Upgrades</span>
                        <Badge className="bg-green-100 text-green-800">✓ BONK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Merchandise</span>
                        <Badge className="bg-green-100 text-green-800">✓ BONK</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">Premium Features</span>
                        <Badge className="bg-green-100 text-green-800">✓ BONK</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                      {tx.icon}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{tx.description}</p>
                        <p className="text-xs text-gray-500">{tx.timestamp}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-bold ${tx.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                          {tx.amount > 0 ? "+" : ""}
                          {tx.amount} BONK
                        </p>
                        {tx.amount > 0 ? (
                          <ArrowUpRight className="w-3 h-3 text-green-500 ml-auto" />
                        ) : (
                          <ArrowDownLeft className="w-3 h-3 text-red-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="staking" className="space-y-4">
              {/* Staking Overview */}
              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90">Currently Staked</p>
                      <p className="text-3xl font-bold">{stakedAmount.toLocaleString()}</p>
                    </div>
                    <div className="text-4xl">⚡</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">12% APY + NFT Bonus Rewards</span>
                  </div>
                </CardContent>
              </Card>

              {/* Staking Interface */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    BONK Staking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Stake Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter BONK amount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      className="mb-2"
                    />
                    <p className="text-xs text-gray-500">Available: {bonkBalance.toLocaleString()} BONK</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2 block">Staking Period</label>
                    <select
                      value={stakingPeriod}
                      onChange={(e) => setStakingPeriod(e.target.value)}
                      className="w-full p-2 border rounded-md"
                    >
                      <option value="30">30 Tage (12% APY)</option>
                      <option value="90">90 Tage (14% APY)</option>
                      <option value="180">180 Tage (16% APY)</option>
                      <option value="365">365 Tage (20% APY)</option>
                    </select>
                  </div>

                  {stakeAmount && (
                    <Card className="bg-blue-50 border-blue-200">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calculator className="w-4 h-4 text-blue-600" />
                          <span className="font-semibold text-blue-800">Estimated Rewards</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Stake Amount:</span>
                            <span className="font-bold">{Number.parseFloat(stakeAmount).toLocaleString()} BONK</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Period:</span>
                            <span className="font-bold">{stakingPeriod} days</span>
                          </div>
                          <div className="flex justify-between text-green-600">
                            <span>Estimated Rewards:</span>
                            <span className="font-bold">+{calculateStakingRewards()} BONK</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <Button onClick={handleStake} className="w-full bg-green-500 hover:bg-green-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Stake BONK
                  </Button>
                </CardContent>
              </Card>

              {/* Staking Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Staking Benefits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-green-50 rounded">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">High APY Returns</p>
                      <p className="text-xs text-gray-600">Earn up to 20% APY on staked BONK</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-purple-50 rounded">
                    <Trophy className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">NFT Bonus Rewards</p>
                      <p className="text-xs text-gray-600">Get exclusive NFT drops for stakers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-50 rounded">
                    <Shield className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Early Access</p>
                      <p className="text-xs text-gray-600">Priority access to new features</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-4">
              {/* Rewards Overview */}
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90">Weekly Earnings</p>
                      <p className="text-3xl font-bold">847 BONK</p>
                    </div>
                    <div className="text-4xl">💎</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">Bis zu 1000 BONK pro Woche verdienen!</span>
                  </div>
                </CardContent>
              </Card>

              {/* Reward Categories */}
              <div className="space-y-3">
                <Card className="border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-purple-800">BONK Rewards</h3>
                        <p className="text-sm text-purple-600">Verdiene BONK Token für deine Aktivitäten</p>
                      </div>
                    </div>
                    <div className="bg-purple-100 rounded-lg p-3">
                      <p className="text-sm text-purple-700 mb-2">
                        Verdiene BONK Token für deine Aktivitäten in der Community. Nutze sie für Rabatte, exklusive
                        NFTs und mehr.
                      </p>
                      <Badge className="bg-purple-500 text-white">Bis zu 1000 BONK pro Woche verdienen!</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Earning Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Earning Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Heart className="w-4 h-4 text-red-500" />
                      <div>
                        <p className="text-sm font-medium">Video Likes</p>
                        <p className="text-xs text-gray-600">Like videos and posts</p>
                      </div>
                    </div>
                    <Badge>+2 BONK</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Trophy className="w-4 h-4 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">Mini-Game Wins</p>
                        <p className="text-xs text-gray-600">Win penalty shootouts</p>
                      </div>
                    </div>
                    <Badge>+25 BONK</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Daily Login</p>
                        <p className="text-xs text-gray-600">Login every day</p>
                      </div>
                    </div>
                    <Badge>+10 BONK</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <Gift className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="text-sm font-medium">Weekly Drops</p>
                        <p className="text-xs text-gray-600">Claim weekly rewards</p>
                      </div>
                    </div>
                    <Badge>+250 BONK</Badge>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div className="flex items-center gap-3">
                      <ShoppingBag className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">NFT Trading</p>
                        <p className="text-xs text-gray-600">Buy and sell NFTs</p>
                      </div>
                    </div>
                    <Badge>+50 BONK</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>This Week's Earnings</span>
                      <span className="font-bold">847 / 1000 BONK</span>
                    </div>
                    <Progress value={84.7} className="h-3" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-3 bg-green-50 rounded">
                      <p className="text-2xl font-bold text-green-600">153</p>
                      <p className="text-xs text-green-700">BONK left to max</p>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <p className="text-2xl font-bold text-blue-600">5</p>
                      <p className="text-xs text-blue-700">Days remaining</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
