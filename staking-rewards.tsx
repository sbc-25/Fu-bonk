"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Coins, TrendingUp, Clock, Zap, Gift, Target } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface StakingRewardsProps {
  isOpen: boolean
  onClose: () => void
}

interface StakingPool {
  id: string
  name: string
  apy: number
  minStake: number
  lockPeriod: number
  totalStaked: number
  userStaked: number
  rewards: number
  icon: string
  description: string
  isActive: boolean
}

interface StakingHistory {
  id: string
  action: "stake" | "unstake" | "claim"
  amount: number
  timestamp: Date
  pool: string
}

export function StakingRewards({ isOpen, onClose }: StakingRewardsProps) {
  const [activeTab, setActiveTab] = useState("pools")
  const [stakeAmount, setStakeAmount] = useState("")
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState(86400) // 24 hours in seconds
  const { toast } = useToast()

  const stakingPools: StakingPool[] = [
    {
      id: "bonk-basic",
      name: "BONK Basic Pool",
      apy: 12.5,
      minStake: 1000,
      lockPeriod: 7,
      totalStaked: 2500000,
      userStaked: 5000,
      rewards: 125.5,
      icon: "🐕",
      description: "Low risk, steady rewards for BONK holders",
      isActive: true,
    },
    {
      id: "bonk-premium",
      name: "BONK Premium Pool",
      apy: 25.0,
      minStake: 10000,
      lockPeriod: 30,
      totalStaked: 1200000,
      userStaked: 15000,
      rewards: 892.3,
      icon: "💎",
      description: "Higher rewards for committed stakers",
      isActive: true,
    },
    {
      id: "nft-boost",
      name: "NFT Boost Pool",
      apy: 35.0,
      minStake: 5000,
      lockPeriod: 14,
      totalStaked: 800000,
      userStaked: 0,
      rewards: 0,
      icon: "🏆",
      description: "Exclusive pool for NFT holders with bonus rewards",
      isActive: true,
    },
    {
      id: "football-fan",
      name: "Football Fan Pool",
      apy: 18.0,
      minStake: 2500,
      lockPeriod: 21,
      totalStaked: 1800000,
      userStaked: 7500,
      rewards: 245.8,
      icon: "⚽",
      description: "Special pool for football enthusiasts",
      isActive: true,
    },
  ]

  const stakingHistory: StakingHistory[] = [
    {
      id: "1",
      action: "stake",
      amount: 5000,
      timestamp: new Date(Date.now() - 86400000),
      pool: "BONK Basic Pool",
    },
    {
      id: "2",
      action: "claim",
      amount: 125.5,
      timestamp: new Date(Date.now() - 3600000),
      pool: "BONK Premium Pool",
    },
    {
      id: "3",
      action: "stake",
      amount: 10000,
      timestamp: new Date(Date.now() - 172800000),
      pool: "Football Fan Pool",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 86400))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStake = (poolId: string) => {
    const pool = stakingPools.find((p) => p.id === poolId)
    const amount = Number.parseFloat(stakeAmount)

    if (!pool || !amount) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid amount",
        variant: "destructive",
      })
      return
    }

    if (amount < pool.minStake) {
      toast({
        title: "Minimum Stake Required",
        description: `Minimum stake for this pool is ${pool.minStake} BONK`,
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Staking Successful",
      description: `Staked ${amount} BONK in ${pool.name}`,
    })

    setStakeAmount("")
    setSelectedPool(null)
  }

  const handleClaim = (poolId: string) => {
    const pool = stakingPools.find((p) => p.id === poolId)
    if (pool && pool.rewards > 0) {
      toast({
        title: "Rewards Claimed",
        description: `Claimed ${pool.rewards} BONK rewards`,
      })
    }
  }

  const totalStaked = stakingPools.reduce((sum, pool) => sum + pool.userStaked, 0)
  const totalRewards = stakingPools.reduce((sum, pool) => sum + pool.rewards, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Staking & Rewards
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Coins className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-800">{totalStaked.toLocaleString()}</div>
                  <div className="text-sm text-green-600">Total Staked BONK</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <Gift className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-800">{totalRewards.toFixed(1)}</div>
                  <div className="text-sm text-blue-600">Pending Rewards</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-800">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-purple-600">Next Reward Cycle</div>
                </CardContent>
              </Card>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="pools">Staking Pools</TabsTrigger>
                <TabsTrigger value="rewards">My Rewards</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="pools" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {stakingPools.map((pool) => (
                    <Card key={pool.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{pool.icon}</span>
                            <div>
                              <CardTitle className="text-lg">{pool.name}</CardTitle>
                              <p className="text-sm text-gray-600">{pool.description}</p>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">{pool.apy}% APY</Badge>
                        </div>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Min Stake:</span>
                            <div className="font-semibold">{pool.minStake.toLocaleString()} BONK</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Lock Period:</span>
                            <div className="font-semibold">{pool.lockPeriod} days</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Your Stake:</span>
                            <div className="font-semibold">{pool.userStaked.toLocaleString()} BONK</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Rewards:</span>
                            <div className="font-semibold text-green-600">{pool.rewards.toFixed(1)} BONK</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Pool Utilization</span>
                            <span>{((pool.totalStaked / 5000000) * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={(pool.totalStaked / 5000000) * 100} className="h-2" />
                        </div>

                        <div className="flex gap-2">
                          {selectedPool === pool.id ? (
                            <div className="flex-1 flex gap-2">
                              <Input
                                placeholder="Amount to stake"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                                type="number"
                              />
                              <Button onClick={() => handleStake(pool.id)} className="bg-green-500 hover:bg-green-600">
                                Stake
                              </Button>
                              <Button variant="outline" onClick={() => setSelectedPool(null)}>
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Button
                                onClick={() => setSelectedPool(pool.id)}
                                className="flex-1 bg-blue-500 hover:bg-blue-600"
                              >
                                <Zap className="w-4 h-4 mr-2" />
                                Stake
                              </Button>
                              {pool.rewards > 0 && (
                                <Button
                                  onClick={() => handleClaim(pool.id)}
                                  variant="outline"
                                  className="border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  <Gift className="w-4 h-4 mr-2" />
                                  Claim
                                </Button>
                              )}
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {stakingPools
                    .filter((pool) => pool.userStaked > 0)
                    .map((pool) => (
                      <Card key={pool.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">{pool.icon}</span>
                              <div>
                                <h4 className="font-semibold">{pool.name}</h4>
                                <p className="text-sm text-gray-600">{pool.apy}% APY</p>
                              </div>
                            </div>
                            <Badge className="bg-green-100 text-green-800">Active</Badge>
                          </div>

                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between text-sm">
                              <span>Staked Amount:</span>
                              <span className="font-semibold">{pool.userStaked.toLocaleString()} BONK</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Pending Rewards:</span>
                              <span className="font-semibold text-green-600">{pool.rewards.toFixed(2)} BONK</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Daily Rewards:</span>
                              <span className="font-semibold">
                                {((pool.userStaked * pool.apy) / 365 / 100).toFixed(2)} BONK
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleClaim(pool.id)}
                              disabled={pool.rewards === 0}
                              className="flex-1 bg-green-500 hover:bg-green-600"
                            >
                              <Gift className="w-4 h-4 mr-2" />
                              Claim Rewards
                            </Button>
                            <Button variant="outline" className="flex-1 bg-transparent">
                              Unstake
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>

                {stakingPools.filter((pool) => pool.userStaked > 0).length === 0 && (
                  <div className="text-center py-12">
                    <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Active Stakes</h3>
                    <p className="text-gray-600 mb-4">Start staking to earn rewards!</p>
                    <Button onClick={() => setActiveTab("pools")} className="bg-blue-500 hover:bg-blue-600">
                      Browse Staking Pools
                    </Button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-6">
                <div className="space-y-3">
                  {stakingHistory.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                item.action === "stake"
                                  ? "bg-blue-100"
                                  : item.action === "unstake"
                                    ? "bg-red-100"
                                    : "bg-green-100"
                              }`}
                            >
                              {item.action === "stake" && <TrendingUp className="w-5 h-5 text-blue-600" />}
                              {item.action === "unstake" && <TrendingUp className="w-5 h-5 text-red-600 rotate-180" />}
                              {item.action === "claim" && <Gift className="w-5 h-5 text-green-600" />}
                            </div>
                            <div>
                              <div className="font-semibold capitalize">{item.action}</div>
                              <div className="text-sm text-gray-600">{item.pool}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`font-semibold ${
                                item.action === "claim"
                                  ? "text-green-600"
                                  : item.action === "unstake"
                                    ? "text-red-600"
                                    : "text-blue-600"
                              }`}
                            >
                              {item.action === "unstake" ? "-" : "+"}
                              {item.amount.toLocaleString()} BONK
                            </div>
                            <div className="text-sm text-gray-500">{item.timestamp.toLocaleDateString()}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
