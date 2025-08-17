"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Trophy, Coins, Heart, Settings, Edit, Crown, Star } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const userStats = {
    name: "Football Fan 2024",
    username: "@bonk_legend",
    avatar: "/placeholder.svg?height=80&width=80",
    level: 12,
    bonkBalance: 15420,
    nftsOwned: 23,
    videosLiked: 156,
    followersCount: 89,
    followingCount: 134,
    memberSince: "January 2024",
    favoriteTeam: "Borussia Dortmund",
    city: "Dortmund",
  }

  const achievements = [
    { name: "First Goal", icon: "⚽", description: "Watched your first goal video" },
    { name: "BONK Collector", icon: "💰", description: "Earned 10,000+ BONK tokens" },
    { name: "Social Butterfly", icon: "🦋", description: "Liked 100+ videos" },
    { name: "NFT Enthusiast", icon: "🎨", description: "Own 20+ NFTs" },
  ]

  const recentActivity = [
    { action: "Liked", item: "Haaland's incredible goal", time: "2 hours ago" },
    { action: "Purchased", item: "Yellow Wall NFT", time: "1 day ago" },
    { action: "Earned", item: "250 BONK from weekly drop", time: "2 days ago" },
    { action: "Joined", item: "Champions League discussion", time: "3 days ago" },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="nfts">NFTs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={userStats.avatar || "/placeholder.svg"} />
                        <AvatarFallback>FB</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{userStats.name}</h3>
                        <p className="text-gray-600">{userStats.username}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className="bg-orange-100 text-orange-800">
                            <Crown className="w-3 h-3 mr-1" />
                            Level {userStats.level}
                          </Badge>
                          <Badge variant="outline">{userStats.city}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-bold text-lg">{userStats.followersCount}</div>
                        <div className="text-xs text-gray-600">Followers</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{userStats.followingCount}</div>
                        <div className="text-xs text-gray-600">Following</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg">{userStats.videosLiked}</div>
                        <div className="text-xs text-gray-600">Likes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 max-h-32 overflow-y-auto">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div>
                          <span className="font-medium">{activity.action}</span>
                          <span className="text-gray-600 ml-1">{activity.item}</span>
                        </div>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="stats" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="font-bold text-lg">{userStats.bonkBalance.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">BONK Balance</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="font-bold text-lg">{userStats.nftsOwned}</div>
                      <div className="text-xs text-gray-600">NFTs Owned</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                      <div className="font-bold text-lg">{userStats.videosLiked}</div>
                      <div className="text-xs text-gray-600">Videos Liked</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                      <div className="font-bold text-lg">{userStats.level}</div>
                      <div className="text-xs text-gray-600">Current Level</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className="font-medium text-sm">{achievement.name}</div>
                          <div className="text-xs text-gray-600">{achievement.description}</div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="nfts" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Your NFT collection will appear here</p>
                  <Button className="mt-4" onClick={onClose}>
                    Browse Marketplace
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <ScrollArea className="h-96">
              <div className="space-y-4 pr-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Trophy className="w-4 h-4 mr-2" />
                    Notification Settings
                  </Button>
                  <Button variant="destructive" className="w-full justify-start">
                    Sign Out
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
