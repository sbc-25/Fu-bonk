"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { CreditCard, Crown, Star, Trophy, Zap, Gift, TrendingUp, Users, Calendar, Coins } from 'lucide-react'

interface SignalIdunaCardNFTProps {
  isOpen: boolean
  onClose: () => void
}

export function SignalIdunaCardNFT({ isOpen, onClose }: SignalIdunaCardNFTProps) {
  const [currentTier, setCurrentTier] = useState("gold")
  
  const cardData = {
    id: "SIC_001_2024",
    name: "Signal Iduna Card NFT",
    tier: "Gold",
    level: 3,
    points: 1250,
    nextTierPoints: 2000,
    memberSince: "January 2024",
    benefits: [
      "10% discount on merchandise",
      "Priority match ticket access",
      "Exclusive NFT drops",
      "VIP chat access",
      "Double BONK rewards",
    ],
    stats: {
      matchesAttended: 8,
      nftsCollected: 23,
      bonkEarned: 15420,
      friendsReferred: 5,
    },
  }

  const tiers = [
    {
      id: "bronze",
      name: "Bronze",
      color: "from-orange-400 to-orange-600",
      pointsRequired: 0,
      benefits: ["Basic rewards", "Community access"],
      icon: "🥉",
    },
    {
      id: "silver", 
      name: "Silver",
      color: "from-gray-400 to-gray-600",
      pointsRequired: 500,
      benefits: ["5% merchandise discount", "Early NFT access"],
      icon: "🥈",
    },
    {
      id: "gold",
      name: "Gold",
      color: "from-yellow-400 to-yellow-600",
      pointsRequired: 1000,
      benefits: ["10% merchandise discount", "Priority tickets", "VIP chat"],
      icon: "🥇",
    },
    {
      id: "platinum",
      name: "Platinum",
      color: "from-purple-400 to-purple-600",
      pointsRequired: 2000,
      benefits: ["15% discount", "Exclusive events", "Triple rewards"],
      icon: "💎",
    },
    {
      id: "diamond",
      name: "Diamond",
      color: "from-blue-400 to-blue-600",
      pointsRequired: 5000,
      benefits: ["20% discount", "VIP experiences", "Custom NFTs"],
      icon: "💠",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      action: "Attended BVB vs Bayern match",
      points: 100,
      date: "2 days ago",
      icon: <Trophy className="w-4 h-4 text-yellow-500" />,
    },
    {
      id: "2",
      action: "Purchased exclusive NFT",
      points: 50,
      date: "1 week ago", 
      icon: <Star className="w-4 h-4 text-purple-500" />,
    },
    {
      id: "3",
      action: "Referred a friend",
      points: 200,
      date: "2 weeks ago",
      icon: <Users className="w-4 h-4 text-blue-500" />,
    },
  ]

  const currentTierData = tiers.find(tier => tier.id === currentTier) || tiers[2]
  const nextTier = tiers[tiers.findIndex(tier => tier.id === currentTier) + 1]
  const progressToNext = nextTier ? ((cardData.points - currentTierData.pointsRequired) / (nextTier.pointsRequired - currentTierData.pointsRequired)) * 100 : 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Signal Iduna Card NFT
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="card" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="card">Card</TabsTrigger>
            <TabsTrigger value="benefits">Benefits</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>

          <ScrollArea className="max-h-[70vh]">
            <div className="pr-4">
              <TabsContent value="card" className="space-y-4">
                {/* Digital Card */}
                <Card className={`bg-gradient-to-br ${currentTierData.color} text-white overflow-hidden relative`}>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <div className="text-8xl">{currentTierData.icon}</div>
                  </div>
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm opacity-90">Signal Iduna Park</div>
                        <div className="text-2xl font-bold">Member Card</div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl">{currentTierData.icon}</div>
                        <div className="text-sm opacity-90">{currentTierData.name}</div>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="text-sm opacity-90">Card ID</div>
                      <div className="font-mono text-lg">{cardData.id}</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm opacity-90">Level</div>
                        <div className="text-xl font-bold">{cardData.level}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm opacity-90">Points</div>
                        <div className="text-xl font-bold">{cardData.points.toLocaleString()}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Progress to Next Tier */}
                {nextTier && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Progress to {nextTier.name}</span>
                        <span className="text-sm text-gray-600">
                          {cardData.points}/{nextTier.pointsRequired}
                        </span>
                      </div>
                      <Progress value={progressToNext} className="h-2 mb-2" />
                      <div className="text-xs text-gray-500 text-center">
                        {nextTier.pointsRequired - cardData.points} points to upgrade
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Recent Activity */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            {activity.icon}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">{activity.action}</div>
                            <div className="text-xs text-gray-500">{activity.date}</div>
                          </div>
                          <Badge className="bg-green-100 text-green-800">
                            +{activity.points}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="benefits" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Crown className="w-4 h-4 text-yellow-500" />
                      {currentTierData.name} Tier Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {cardData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Exclusive Perks</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Monthly NFT Drop</span>
                      </div>
                      <Badge className="bg-orange-500 text-white">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Double BONK Rewards</span>
                      </div>
                      <Badge className="bg-blue-500 text-white">Active</Badge>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">VIP Match Access</span>
                      </div>
                      <Badge className="bg-purple-500 text-white">Premium</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{cardData.stats.matchesAttended}</div>
                      <div className="text-xs text-gray-600">Matches Attended</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{cardData.stats.nftsCollected}</div>
                      <div className="text-xs text-gray-600">NFTs Collected</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{cardData.stats.bonkEarned.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">BONK Earned</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold">{cardData.stats.friendsReferred}</div>
                      <div className="text-xs text-gray-600">Friends Referred</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Membership Timeline</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium">Joined BONK VS Platform</div>
                          <div className="text-xs text-gray-500">{cardData.memberSince}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium">Reached Gold Tier</div>
                          <div className="text-xs text-gray-500">March 2024</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">Next milestone: Platinum</div>
                          <div className="text-xs text-gray-400">750 points to go</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upgrade" className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Tier Progression</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {tiers.map((tier, index) => {
                        const isCurrentTier = tier.id === currentTier
                        const isUnlocked = cardData.points >= tier.pointsRequired
                        const isNext = tiers.findIndex(t => t.id === currentTier) + 1 === index

                        return (
                          <div
                            key={tier.id}
                            className={`p-3 rounded-lg border-2 ${
                              isCurrentTier
                                ? "border-orange-500 bg-orange-50"
                                : isUnlocked
                                  ? "border-green-200 bg-green-50"
                                  : "border-gray-200 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-2xl">{tier.icon}</div>
                                <div>
                                  <div className="font-semibold text-sm flex items-center gap-2">
                                    {tier.name}
                                    {isCurrentTier && (
                                      <Badge className="bg-orange-500 text-white text-xs">Current</Badge>
                                    )}
                                    {isNext && (
                                      <Badge className="bg-blue-500 text-white text-xs">Next</Badge>
                                    )}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {tier.pointsRequired.toLocaleString()} points required
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                {isUnlocked ? (
                                  <Badge className="bg-green-500 text-white">Unlocked</Badge>
                                ) : (
                                  <Badge variant="outline">
                                    {(tier.pointsRequired - cardData.points).toLocaleString()} to go
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-gray-600">Benefits:</div>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {tier.benefits.map((benefit, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {benefit}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {nextTier && (
                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                      <h3 className="font-bold text-blue-800 mb-2">Upgrade to {nextTier.name}!</h3>
                      <p className="text-sm text-blue-600 mb-4">
                        You're {nextTier.pointsRequired - cardData.points} points away from unlocking exclusive {nextTier.name} benefits!
                      </p>
                      <Button className="bg-blue-500 hover:bg-blue-600">
                        <Zap className="w-4 h-4 mr-2" />
                        Boost Progress
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </div>
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
