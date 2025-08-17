"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  User,
  Camera,
  Save,
  Trophy,
  Coins,
  Heart,
  MessageCircle,
  Calendar,
  MapPin,
  Crown,
  Star,
  Zap,
  Award,
  Settings,
  Bell,
  Shield,
  Palette,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface UserProfileProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfile({ isOpen, onClose }: UserProfileProps) {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "BONK Fan 2024",
    username: "@bonkfan2024",
    bio: "Passionate football fan and NFT collector! 🏆⚽ BVB forever! 💛🖤",
    location: "Dortmund, Germany",
    favoriteTeam: "Borussia Dortmund",
    joinDate: "January 2024",
  })
  const { toast } = useToast()

  const userStats = {
    level: 12,
    bonkBalance: 15420,
    nftsOwned: 23,
    totalLikes: 2847,
    friendsCount: 89,
    achievements: 18,
    postsCount: 156,
    commentsCount: 892,
  }

  const recentActivity = [
    {
      id: "1",
      type: "like",
      content: "Liked Haaland Goal Video",
      timestamp: "2 hours ago",
      reward: 2,
    },
    {
      id: "2",
      type: "nft",
      content: "Purchased Epic Save NFT",
      timestamp: "1 day ago",
      reward: 0,
    },
    {
      id: "3",
      type: "achievement",
      content: "Unlocked Daily Streaker",
      timestamp: "2 days ago",
      reward: 100,
    },
    {
      id: "4",
      type: "post",
      content: "Shared stadium experience",
      timestamp: "3 days ago",
      reward: 10,
    },
  ]

  const achievements = [
    {
      id: "1",
      name: "Daily Streaker",
      description: "Login 7 days in a row",
      icon: "🔥",
      unlocked: true,
      progress: 7,
      maxProgress: 7,
    },
    {
      id: "2",
      name: "BONK Collector",
      description: "Earn 10,000 BONK tokens",
      icon: "💰",
      unlocked: true,
      progress: 15420,
      maxProgress: 10000,
    },
    {
      id: "3",
      name: "Social Butterfly",
      description: "Like 100 videos",
      icon: "❤️",
      unlocked: false,
      progress: 67,
      maxProgress: 100,
    },
    {
      id: "4",
      name: "NFT Master",
      description: "Own 50 NFTs",
      icon: "🏆",
      unlocked: false,
      progress: 23,
      maxProgress: 50,
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated! ✅",
      description: "Your profile has been saved successfully.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500" />
      case "nft":
        return <Trophy className="w-4 h-4 text-purple-500" />
      case "achievement":
        return <Award className="w-4 h-4 text-yellow-500" />
      case "post":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      default:
        return <Star className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Your Profile
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[600px] mt-4">
            <TabsContent value="profile" className="space-y-6">
              {/* Profile Header */}
              <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback className="text-2xl bg-orange-500 text-white">
                          {profileData.name[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                        onClick={() => toast({ title: "Photo upload coming soon! 📸" })}
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex-1 space-y-4">
                      {isEditing ? (
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="name">Display Name</Label>
                            <Input
                              id="name"
                              value={profileData.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={profileData.username}
                              onChange={(e) => handleInputChange("username", e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={profileData.bio}
                              onChange={(e) => handleInputChange("bio", e.target.value)}
                              rows={3}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600">
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button variant="outline" onClick={() => setIsEditing(false)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold text-gray-800">{profileData.name}</h2>
                            <p className="text-gray-600">{profileData.username}</p>
                          </div>
                          <p className="text-gray-700">{profileData.bio}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {profileData.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Joined {profileData.joinDate}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-orange-500 text-white">
                              <Crown className="w-3 h-3 mr-1" />
                              Level {userStats.level}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800">{profileData.favoriteTeam}</Badge>
                          </div>
                          <Button variant="outline" onClick={() => setIsEditing(true)} className="mt-4">
                            Edit Profile
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.content}</p>
                          <p className="text-xs text-gray-500">{activity.timestamp}</p>
                        </div>
                        {activity.reward > 0 && (
                          <Badge className="bg-orange-100 text-orange-800 text-xs">+{activity.reward} BONK</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="stats" className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">{userStats.bonkBalance.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">BONK Balance</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">{userStats.nftsOwned}</div>
                    <div className="text-sm text-gray-600">NFTs Owned</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">{userStats.totalLikes.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Likes</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-yellow-600">{userStats.achievements}</div>
                    <div className="text-sm text-gray-600">Achievements</div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posts Created:</span>
                      <span className="font-semibold">{userStats.postsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Comments Made:</span>
                      <span className="font-semibold">{userStats.commentsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Friends:</span>
                      <span className="font-semibold">{userStats.friendsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Current Level:</span>
                      <span className="font-semibold">Level {userStats.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.unlocked ? "border-green-200 bg-green-50" : ""}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{achievement.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  achievement.unlocked ? "bg-green-500" : "bg-orange-500"
                                }`}
                                style={{
                                  width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%`,
                                }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                        </div>
                        {achievement.unlocked && <Badge className="bg-green-500 text-white">Unlocked!</Badge>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Account Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-gray-600">Get notified about new activities</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Privacy Settings</p>
                        <p className="text-sm text-gray-600">Control who can see your profile</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Palette className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium">Theme Preferences</p>
                        <p className="text-sm text-gray-600">Customize your app appearance</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Change
                    </Button>
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
