"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Target, Trophy, Coins, Calendar, Star } from "lucide-react"
import { InternalWalletService } from "@/lib/internal-wallet"

interface Quest {
  id: string
  title: string
  description: string
  type: "daily" | "weekly" | "special"
  icon: string
  progress: number
  target: number
  reward: number
  timeLeft: string
}

interface QuestSystemProps {
  isOpen: boolean
  onClose: () => void
}

export function QuestSystem({ isOpen, onClose }: QuestSystemProps) {
  const [activeTab, setActiveTab] = useState("daily")
  const [completedQuests, setCompletedQuests] = useState<string[]>([])
  const [userLevel, setUserLevel] = useState(5)
  const [userXP, setUserXP] = useState(1250)
  const [nextLevelXP] = useState(1500)

  const wallet = InternalWalletService.getWallet()

  // Mock quests data
  const quests: Quest[] = [
    // Daily Quests
    {
      id: "daily1",
      type: "daily",
      title: "Like 5 videos",
      description: "Show love to the community by liking videos",
      progress: 3,
      target: 5,
      reward: 10,
      icon: "❤️",
      timeLeft: "18h",
    },
    {
      id: "daily2",
      type: "daily",
      title: "Upload 1 video",
      description: "Share your football moments",
      progress: 0,
      target: 1,
      reward: 50,
      icon: "📹",
      timeLeft: "18h",
    },
    // Weekly Quests
    {
      id: "weekly1",
      type: "weekly",
      title: "Win 3 mini-games",
      description: "Test your skills in our mini-games",
      progress: 1,
      target: 3,
      reward: 100,
      icon: "🎮",
      timeLeft: "4d",
    },
    // Special Quests
    {
      id: "special1",
      type: "special",
      title: "Attend live match",
      description: "Verify your presence at a stadium",
      progress: 0,
      target: 1,
      reward: 500,
      icon: "🏟️",
      timeLeft: "No limit",
    },
  ]

  const handleClaimReward = (quest: Quest) => {
    if (quest.progress >= quest.target && !completedQuests.includes(quest.id)) {
      // Add BONK to wallet
      if (wallet) {
        InternalWalletService.updateBalance(quest.reward)
      }

      // Add XP
      setUserXP((prev) => prev + quest.reward)

      // Mark as completed
      setCompletedQuests((prev) => [...prev, quest.id])

      // Check for level up
      if (userXP + quest.reward >= nextLevelXP) {
        setUserLevel((prev) => prev + 1)
        setUserXP(0)
      }
    }
  }

  const filteredQuests = quests.filter((quest) => {
    if (activeTab === "daily") return quest.type === "daily"
    if (activeTab === "weekly") return quest.type === "weekly"
    if (activeTab === "special") return quest.type === "special"
    return true
  })

  const completedCount = filteredQuests.filter((q) => q.progress >= q.target || completedQuests.includes(q.id)).length
  const totalRewards = filteredQuests.reduce((sum, q) => sum + q.reward, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quest System 🎯
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* User Progress */}
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold">{userLevel}</span>
                </div>
                <div>
                  <p className="font-semibold">Level {userLevel} Player</p>
                  <p className="text-sm text-white/80">
                    {userXP}/{nextLevelXP} XP
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/80">Total BONK Earned</p>
                <p className="font-bold text-lg">{wallet?.bonkBalance || 0} 🪙</p>
              </div>
            </div>
            <Progress value={(userXP / nextLevelXP) * 100} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-160px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="daily" className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Daily
              </TabsTrigger>
              <TabsTrigger value="weekly" className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                Weekly
              </TabsTrigger>
              <TabsTrigger value="special" className="flex items-center gap-1">
                <Trophy className="w-4 h-4" />
                Special
              </TabsTrigger>
            </TabsList>

            <div className="p-4">
              {/* Tab Summary */}
              <Card className="mb-4 bg-gradient-to-br from-gray-50 to-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Quests
                      </h3>
                      <p className="text-sm text-gray-600">
                        {completedCount}/{filteredQuests.length} completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Rewards</p>
                      <p className="font-bold text-orange-600">{totalRewards} BONK 🪙</p>
                    </div>
                  </div>
                  <Progress value={(completedCount / filteredQuests.length) * 100} className="mt-2 h-2" />
                </CardContent>
              </Card>

              {/* Quest List */}
              <div className="space-y-3">
                {filteredQuests.map((quest) => {
                  const isCompleted = quest.progress >= quest.target || completedQuests.includes(quest.id)
                  const isClaimed = completedQuests.includes(quest.id)
                  const progressPercentage = (quest.progress / quest.target) * 100

                  return (
                    <Card
                      key={quest.id}
                      className={`transition-all duration-300 hover:shadow-lg ${
                        quest.progress < quest.target
                          ? "bg-blue-100"
                          : isCompleted
                            ? "bg-green-50 border-green-200"
                            : "hover:scale-105"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3 flex-1">
                            {/* Quest Icon */}
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                quest.progress < quest.target
                                  ? "bg-blue-100"
                                  : isCompleted
                                    ? "bg-green-100"
                                    : "bg-blue-100"
                              }`}
                            >
                              <span className="text-2xl">{quest.icon}</span>
                            </div>

                            {/* Quest Info */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-800">{quest.title}</h3>
                                <Badge
                                  className={
                                    quest.type === "daily"
                                      ? "bg-blue-100 text-blue-800"
                                      : quest.type === "weekly"
                                        ? "bg-purple-100 text-purple-800"
                                        : "bg-yellow-100 text-yellow-800"
                                  }
                                >
                                  {quest.type === "daily" && <Calendar className="w-3 h-3 mr-1" />}
                                  {quest.type === "weekly" && <Star className="w-3 h-3 mr-1" />}
                                  {quest.type === "special" && <Trophy className="w-3 h-3 mr-1" />}
                                  {quest.type}
                                </Badge>
                              </div>

                              <p className="text-sm text-gray-600 mb-3">{quest.description}</p>

                              {/* Progress Bar */}
                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>
                                    {quest.progress}/{quest.target}
                                  </span>
                                </div>
                                <Progress value={progressPercentage} className="h-2" />
                              </div>

                              {/* Expiry Timer */}
                              {quest.timeLeft !== "No limit" && !isCompleted && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                                  <span className="text-gray-500">Expires in {quest.timeLeft}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Rewards and Action */}
                          <div className="text-right space-y-2">
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 justify-end">
                                <Coins className="w-4 h-4 text-yellow-500" />
                                <span className="font-bold text-yellow-600">{quest.reward}</span>
                              </div>
                            </div>

                            {isCompleted && !isClaimed ? (
                              <Button
                                size="sm"
                                onClick={() => handleClaimReward(quest)}
                                className="w-20 bg-green-500 hover:bg-green-600 animate-pulse"
                              >
                                Claim Reward
                              </Button>
                            ) : isClaimed ? (
                              <Button size="sm" disabled className="w-20 bg-gray-400">
                                Done
                              </Button>
                            ) : (
                              <Button size="sm" disabled className="w-20 bg-transparent" variant="outline">
                                {Math.round(progressPercentage)}%
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
