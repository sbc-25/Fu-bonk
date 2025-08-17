"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Zap, Coins, TrendingUp, Clock, Gift } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface StakingRewardsProps {
  isOpen: boolean
  onClose: () => void
}

export function StakingRewards({ isOpen, onClose }: StakingRewardsProps) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [stakedAmount] = useState(5000)
  const [pendingRewards] = useState(125)

  const stakingPools = [
    {
      id: "1",
      name: "BONK Staking Pool",
      apy: 12.5,
      minStake: 100,
      lockPeriod: "7 days",
      totalStaked: 1250000,
      participants: 3420,
    },
    {
      id: "2", 
      name: "Football Fan Pool",
      apy: 18.2,
      minStake: 500,
      lockPeriod: "30 days",
      totalStaked: 850000,
      participants: 1890,
    },
    {
      id: "3",
      name: "Champions League Pool",
      apy: 25.0,
      minStake: 1000,
      lockPeriod: "90 days",
      totalStaked: 420000,
      participants: 567,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Staking Rewards
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh]">
          <div className="pr-4">
            <Tabs defaultValue="stake" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stake">Stake</TabsTrigger>
                <TabsTrigger value="rewards">Rewards</TabsTrigger>
                <TabsTrigger value="pools">Pools</TabsTrigger>
              </TabsList>

              <TabsContent value="stake" className="space-y-4">
                <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-1">Currently Staked</div>
                      <div className="text-2xl font-bold mb-2">{stakedAmount.toLocaleString()} BONK</div>
                      <Badge className="bg-white/20 text-white">≈ ${(stakedAmount * 0.000012).toFixed(2)} USD</Badge>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Stake Amount</label>
                    <Input
                      type="number"
                      placeholder="Enter BONK amount"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => setStakeAmount("100")}>
                      100
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStakeAmount("500")}>
                      500
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setStakeAmount("1000")}>
                      1000
                    </Button>
                  </div>

                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    <Zap className="w-4 h-4 mr-2" />
                    Stake BONK
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="rewards" className="space-y-4">
                <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                  <CardContent className="p-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90 mb-1">Pending Rewards</div>
                      <div className="text-2xl font-bold mb-2">{pendingRewards} BONK</div>
                      <Button className="bg-white/20 hover:bg-white/30 text-white">
                        <Gift className="w-4 h-4 mr-2" />
                        Claim Rewards
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Daily Rewards</div>
                          <div className="text-xs text-gray-600">Auto-compound</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600">+15 BONK</div>
                          <div className="text-xs text-gray-500">per day</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm">Weekly Bonus</div>
                          <div className="text-xs text-gray-600">Extra rewards</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">+50 BONK</div>
                          <div className="text-xs text-gray-500">weekly</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="pools" className="space-y-3">
                <ScrollArea className="h-64">
                  <div className="space-y-3 pr-4">
                    {stakingPools.map((pool) => (
                      <Card key={pool.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold text-sm">{pool.name}</h3>
                              <Badge className="bg-green-100 text-green-800">
                                {pool.apy}% APY
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                              <div>Min Stake: {pool.minStake} BONK</div>
                              <div>Lock: {pool.lockPeriod}</div>
                              <div>Total: {pool.totalStaked.toLocaleString()}</div>
                              <div>Users: {pool.participants}</div>
                            </div>

                            <Button size="sm" className="w-full">
                              Join Pool
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
