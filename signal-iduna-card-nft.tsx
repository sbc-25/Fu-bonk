"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  CreditCard,
  Star,
  Gift,
  Trophy,
  Users,
  Calendar,
  QrCode,
  Coins,
  ArrowUp,
  CheckCircle,
  Lock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SignalIdunaCardNFTProps {
  isOpen: boolean
  onClose: () => void
}

interface MembershipTier {
  id: string
  name: string
  color: string
  bgColor: string
  textColor: string
  minPoints: number
  maxPoints: number
  benefits: string[]
  icon: string
  unlocked: boolean
}

export function SignalIdunaCardNFT({ isOpen, onClose }: SignalIdunaCardNFTProps) {
  const [currentPoints, setCurrentPoints] = useState(1250)
  const [currentTier, setCurrentTier] = useState("gold")
  const [activeTab, setActiveTab] = useState("card")
  const { toast } = useToast()

  const membershipTiers: MembershipTier[] = [
    {
      id: "bronze",
      name: "Bronze Tier",
      color: "bg-amber-600",
      bgColor: "from-amber-400 to-amber-600",
      textColor: "text-amber-800",
      minPoints: 0,
      maxPoints: 500,
      benefits: [
        "Stadium entry on match days",
        "5% discount on merchandise",
        "Access to basic mini-games",
        "Voting rights on basic polls",
      ],
      icon: "🥉",
      unlocked: true,
    },
    {
      id: "silver",
      name: "Silber Tier",
      color: "bg-gray-400",
      bgColor: "from-gray-300 to-gray-500",
      textColor: "text-gray-800",
      minPoints: 500,
      maxPoints: 1000,
      benefits: [
        "Premium stadium entry",
        "10% discount on merchandise",
        "Access to exclusive mini-games",
        "Priority voting rights",
        "Monthly BONK bonus",
      ],
      icon: "🥈",
      unlocked: true,
    },
    {
      id: "gold",
      name: "Gold Tier",
      color: "bg-yellow-500",
      bgColor: "from-yellow-400 to-yellow-600",
      textColor: "text-yellow-800",
      minPoints: 1000,
      maxPoints: 2000,
      benefits: [
        "Premium stadium entry on match days",
        "15% discount on merchandise",
        "Access to exclusive mini-games",
        "Priority voting rights on all polls",
        "Meet & greet opportunities with players",
        "VIP lounge access",
      ],
      icon: "🥇",
      unlocked: true,
    },
    {
      id: "platinum",
      name: "Platin Tier",
      color: "bg-purple-500",
      bgColor: "from-purple-400 to-purple-600",
      textColor: "text-purple-800",
      minPoints: 2000,
      maxPoints: 5000,
      benefits: [
        "All Gold benefits",
        "Exclusive stadium tours",
        "Priority match tickets",
        "Direct player interactions",
        "Exclusive NFT drops",
        "VIP event invitations",
      ],
      icon: "💎",
      unlocked: false,
    },
  ]

  const getCurrentTierData = () => {
    return membershipTiers.find((tier) => tier.id === currentTier) || membershipTiers[2]
  }

  const getNextTierData = () => {
    const currentIndex = membershipTiers.findIndex((tier) => tier.id === currentTier)
    return currentIndex < membershipTiers.length - 1 ? membershipTiers[currentIndex + 1] : null
  }

  const handleUpgrade = () => {
    const nextTier = getNextTierData()
    if (nextTier) {
      const bonkCost = (nextTier.minPoints - currentPoints) * 2 // 2 BONK per point
      toast({
        title: "Upgrade mit BONK! 🚀",
        description: `Kosten: ${bonkCost} BONK für ${nextTier.name}`,
      })
    }
  }

  const currentTierData = getCurrentTierData()
  const nextTierData = getNextTierData()
  const progressPercentage = nextTierData
    ? ((currentPoints - currentTierData.minPoints) / (nextTierData.minPoints - currentTierData.minPoints)) * 100
    : 100

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Signal Iduna Card NFT
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="card">Meine Karte</TabsTrigger>
            <TabsTrigger value="upgrade">Upgrade</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[600px] mt-4">
            <TabsContent value="card" className="space-y-4">
              {/* Current Membership Card */}
              <Card className={`bg-gradient-to-br ${currentTierData.bgColor} text-white overflow-hidden relative`}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                  <div className="text-6xl transform rotate-12 mt-4 mr-4">⚽</div>
                </div>

                <CardContent className="p-6 relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold">SIGNAL IDUNA CARD</h3>
                      <p className="text-sm opacity-90">Fan Membership NFT</p>
                    </div>
                    <Badge className="bg-white/20 text-white">{currentTierData.name}</Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs opacity-75">MEMBER</p>
                      <p className="font-bold">Shiba Inu #1234</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">MEMBER SINCE</p>
                      <p className="font-bold">2023</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">POINTS</p>
                      <p className="font-bold">{currentPoints}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs opacity-75 mb-1">NFT ID</p>
                    <p className="font-mono text-sm">BT7H...9fQ2</p>
                  </div>

                  <div className="bg-white/10 rounded-lg p-3 mb-4">
                    <h4 className="font-semibold mb-2 text-sm">CARD BENEFITS:</h4>
                    <ul className="text-xs space-y-1">
                      {currentTierData.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-3 h-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {nextTierData && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>
                          {nextTierData.minPoints - currentPoints} more points to reach {nextTierData.name}
                        </span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                  )}

                  {/* QR Code Area */}
                  <div className="absolute bottom-4 right-4 bg-white p-2 rounded">
                    <QrCode className="w-8 h-8 text-black" />
                  </div>
                </CardContent>
              </Card>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">{currentPoints}</div>
                    <div className="text-sm text-gray-600">Total Points</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">365</div>
                    <div className="text-sm text-gray-600">Days Active</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Earned 50 points</p>
                      <p className="text-xs text-gray-500">Match attendance bonus</p>
                    </div>
                    <span className="text-xs text-gray-500">2h ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <Gift className="w-4 h-4 text-purple-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Claimed weekly reward</p>
                      <p className="text-xs text-gray-500">250 BONK tokens</p>
                    </div>
                    <span className="text-xs text-gray-500">1d ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-gray-50 rounded">
                    <Users className="w-4 h-4 text-blue-500" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Voted in community poll</p>
                      <p className="text-xs text-gray-500">Best goal of the month</p>
                    </div>
                    <span className="text-xs text-gray-500">3d ago</span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="upgrade" className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Karte upgraden</h3>
                <p className="text-gray-600">
                  Sammle Punkte und steige in höhere Tiers auf, um mehr exklusive Vorteile freizuschalten.
                </p>
              </div>

              {/* Tier Overview */}
              <div className="space-y-3">
                {membershipTiers.map((tier, index) => (
                  <Card
                    key={tier.id}
                    className={`${
                      tier.id === currentTier
                        ? "border-2 border-orange-400 bg-orange-50"
                        : tier.unlocked
                          ? "border-green-200 bg-green-50"
                          : "border-gray-200 bg-gray-50 opacity-75"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{tier.icon}</div>
                          <div>
                            <h4 className="font-bold">{tier.name}</h4>
                            <p className="text-sm text-gray-600">
                              {tier.minPoints} - {tier.maxPoints === 5000 ? "∞" : tier.maxPoints} Punkte
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          {tier.id === currentTier && <Badge className="bg-orange-500 text-white">Aktuell</Badge>}
                          {tier.unlocked && tier.id !== currentTier && (
                            <Badge className="bg-green-500 text-white">Freigeschaltet</Badge>
                          )}
                          {!tier.unlocked && (
                            <Badge className="bg-gray-400 text-white">
                              <Lock className="w-3 h-3 mr-1" />
                              Gesperrt
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1 mb-3">
                        {tier.benefits.slice(0, 3).map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center gap-2 text-sm">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            {benefit}
                          </div>
                        ))}
                        {tier.benefits.length > 3 && (
                          <p className="text-xs text-gray-500">+{tier.benefits.length - 3} weitere Vorteile</p>
                        )}
                      </div>

                      {tier.id === currentTier && nextTierData && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span>Fortschritt zu {nextTierData.name}</span>
                            <span>
                              {currentPoints}/{nextTierData.minPoints}
                            </span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Upgrade Button */}
              {nextTierData && (
                <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <CardContent className="p-4 text-center">
                    <ArrowUp className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                    <h4 className="font-bold mb-2">Upgrade zu {nextTierData.name}</h4>
                    <p className="text-sm opacity-90 mb-4">Benötigt: {nextTierData.minPoints - currentPoints} Punkte</p>
                    <Button
                      className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                      onClick={handleUpgrade}
                    >
                      <Coins className="w-4 h-4 mr-2" />
                      Mit BONK upgraden
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* How to Earn Points */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Punkte verdienen
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Stadion besuchen</span>
                    <Badge>+50 Punkte</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Videos liken</span>
                    <Badge>+2 Punkte</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">NFT kaufen</span>
                    <Badge>+25 Punkte</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Community Voting</span>
                    <Badge>+10 Punkte</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Daily Login</span>
                    <Badge>+5 Punkte</Badge>
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
