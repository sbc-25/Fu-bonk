"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
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
  Bell,
  Shield,
  Palette,
  Edit,
  Share2,
  TrendingUp,
  Target,
  Gift,
  CreditCard,
  ArrowLeft,
  Wallet,
  Clock,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "BONK Fan 2024",
    username: "@bonkfan2024",
    bio: "Passionate football fan and NFT collector! 🏆⚽ BVB forever! 💛🖤",
    location: "Dortmund, Germany",
    favoriteTeam: "Borussia Dortmund",
    joinDate: "January 2024",
    website: "bonkfan.com",
    twitter: "@bonkfan2024",
  })

  const { toast } = useToast()
  const router = useRouter()

  const userStats = {
    level: 12,
    bonkBalance: 15420,
    stakedBonk: 5000,
    nftsOwned: 23,
    totalLikes: 2847,
    friendsCount: 89,
    achievements: 18,
    postsCount: 156,
    commentsCount: 892,
    weeklyEarnings: 847,
    currentStreak: 7,
    totalPoints: 1250,
    rank: 247,
  }

  const recentActivity = [
    {
      id: "1",
      type: "like",
      content: "Liked Haaland Goal Video",
      timestamp: "2 hours ago",
      reward: 2,
      icon: <Heart className="w-4 h-4 text-red-500" />,
    },
    {
      id: "2",
      type: "nft",
      content: "Purchased Epic Save NFT",
      timestamp: "1 day ago",
      reward: 0,
      icon: <Trophy className="w-4 h-4 text-purple-500" />,
    },
    {
      id: "3",
      type: "achievement",
      content: "Unlocked Daily Streaker",
      timestamp: "2 days ago",
      reward: 100,
      icon: <Award className="w-4 h-4 text-yellow-500" />,
    },
    {
      id: "4",
      type: "post",
      content: "Shared stadium experience",
      timestamp: "3 days ago",
      reward: 10,
      icon: <MessageCircle className="w-4 h-4 text-blue-500" />,
    },
    {
      id: "5",
      type: "staking",
      content: "Claimed staking rewards",
      timestamp: "5 days ago",
      reward: 45,
      icon: <Zap className="w-4 h-4 text-green-500" />,
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
      reward: 100,
    },
    {
      id: "2",
      name: "BONK Collector",
      description: "Earn 10,000 BONK tokens",
      icon: "💰",
      unlocked: true,
      progress: 15420,
      maxProgress: 10000,
      reward: 500,
    },
    {
      id: "3",
      name: "Social Butterfly",
      description: "Like 100 videos",
      icon: "❤️",
      unlocked: false,
      progress: 67,
      maxProgress: 100,
      reward: 250,
    },
    {
      id: "4",
      name: "NFT Master",
      description: "Own 50 NFTs",
      icon: "🏆",
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      reward: 300,
    },
    {
      id: "5",
      name: "Stadium Regular",
      description: "Attend 10 matches",
      icon: "🏟️",
      unlocked: false,
      progress: 6,
      maxProgress: 10,
      reward: 500,
    },
    {
      id: "6",
      name: "Community Leader",
      description: "Get 1000 likes on posts",
      icon: "👑",
      unlocked: false,
      progress: 2847,
      maxProgress: 1000,
      reward: 750,
    },
  ]

  const nftCollection = [
    {
      id: "1",
      name: "Haaland Goal Moment",
      image: "/placeholder.svg?height=150&width=150",
      rarity: "Epic",
      value: "250 BONK",
    },
    {
      id: "2",
      name: "Yellow Wall Atmosphere",
      image: "/placeholder.svg?height=150&width=150",
      rarity: "Rare",
      value: "150 BONK",
    },
    {
      id: "3",
      name: "Signal Iduna Card",
      image: "/placeholder.svg?height=150&width=150",
      rarity: "Legendary",
      value: "500 BONK",
    },
    {
      id: "4",
      name: "BVB Victory Celebration",
      image: "/placeholder.svg?height=150&width=150",
      rarity: "Common",
      value: "50 BONK",
    },
  ]

  const handleSave = () => {
    setIsEditing(false)
    toast({
      title: "Profile updated!",
      description: "Your profile has been saved successfully.",
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }))
  }

  const handleShare = () => {
    toast({
      title: "Profile shared!",
      description: "Profile link copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white relative">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={() => router.back()}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">My Profile</h1>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Profile Header */}
          <div className="text-center">
            <div className="relative inline-block mb-4">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl bg-orange-500 text-white">{profileData.name[0]}</AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-white text-orange-500 hover:bg-gray-100"
                onClick={() => toast({ title: "Photo upload coming soon! 📸" })}
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            <h2 className="text-2xl font-bold mb-1">{profileData.name}</h2>
            <p className="text-orange-100 mb-2">{profileData.username}</p>

            <div className="flex items-center justify-center gap-4 mb-4">
              <Badge className="bg-white/20 text-white">
                <Crown className="w-3 h-3 mr-1" />
                Level {userStats.level}
              </Badge>
              <Badge className="bg-white/20 text-white">
                <Trophy className="w-3 h-3 mr-1" />
                Rank #{userStats.rank}
              </Badge>
            </div>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="text-center">
                <div className="font-bold text-lg">{userStats.friendsCount}</div>
                <div className="text-orange-100">Friends</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userStats.postsCount}</div>
                <div className="text-orange-100">Posts</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg">{userStats.nftsOwned}</div>
                <div className="text-orange-100">NFTs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="wallet">Wallet</TabsTrigger>
              <TabsTrigger value="nfts">NFTs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-300px)]">
              <TabsContent value="overview" className="space-y-4">
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-orange-600">{userStats.bonkBalance.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">BONK Balance</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">{userStats.stakedBonk.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Staked BONK</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Gift className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">{userStats.weeklyEarnings}</div>
                      <div className="text-sm text-gray-600">Weekly Earnings</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Target className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak}</div>
                      <div className="text-sm text-gray-600">Day Streak</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Bio Section */}
                <Card>
                  <CardContent className="p-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={profileData.bio}
                            onChange={(e) => handleInputChange("bio", e.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
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
                        <Button variant="outline" onClick={() => setIsEditing(true)} size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                          {activity.icon}
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

                {/* Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Achievements ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {achievements.slice(0, 4).map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`p-3 rounded-lg border-2 ${
                            achievement.unlocked ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
                          }`}
                        >
                          <div className="text-center">
                            <div className="text-2xl mb-1">{achievement.icon}</div>
                            <h4 className="font-semibold text-sm">{achievement.name}</h4>
                            <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
                            {achievement.unlocked ? (
                              <Badge className="bg-green-500 text-white text-xs">Unlocked!</Badge>
                            ) : (
                              <div className="space-y-1">
                                <Progress
                                  value={(achievement.progress / achievement.maxProgress) * 100}
                                  className="h-1"
                                />
                                <p className="text-xs text-gray-500">
                                  {achievement.progress}/{achievement.maxProgress}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="wallet" className="space-y-4">
                {/* Wallet Overview */}
                <Card className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-sm opacity-90">Total BONK Value</p>
                        <p className="text-3xl font-bold">
                          {(userStats.bonkBalance + userStats.stakedBonk).toLocaleString()}
                        </p>
                      </div>
                      <Wallet className="w-12 h-12 opacity-75" />
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-sm">+12.5% this week</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Wallet Breakdown */}
                <div className="grid grid-cols-2 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Coins className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-orange-600">{userStats.bonkBalance.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Available BONK</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Zap className="w-8 h-8 text-green-500 mx-auto mb-2" />
                      <div className="text-xl font-bold text-green-600">{userStats.stakedBonk.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Staked BONK</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Signal Iduna Card */}
                <Card className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <CreditCard className="w-5 h-5" />
                          <span className="font-bold">Signal Iduna Card</span>
                        </div>
                        <p className="text-sm opacity-90">Gold Tier • {userStats.totalPoints} Points</p>
                      </div>
                      <div className="text-center">
                        <Crown className="w-8 h-8 mx-auto mb-1" />
                        <div className="text-xs opacity-75">Premium</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Weekly Earnings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-purple-600" />
                      Weekly Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">This Week</span>
                        <span className="font-bold text-purple-600">{userStats.weeklyEarnings} BONK</span>
                      </div>
                      <Progress value={(userStats.weeklyEarnings / 1000) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Goal: 1000 BONK</span>
                        <span>{1000 - userStats.weeklyEarnings} BONK remaining</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentActivity
                        .filter((a) => a.reward > 0)
                        .map((activity) => (
                          <div key={activity.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {activity.icon}
                              <div>
                                <p className="text-sm font-medium">{activity.content}</p>
                                <p className="text-xs text-gray-500">{activity.timestamp}</p>
                              </div>
                            </div>
                            <span className="text-sm font-bold text-green-600">+{activity.reward} BONK</span>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="nfts" className="space-y-4">
                {/* NFT Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <div className="text-lg font-bold">{userStats.nftsOwned}</div>
                      <div className="text-xs text-gray-600">Owned</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Star className="w-6 h-6 text-yellow-500 mx-auto mb-1" />
                      <div className="text-lg font-bold">3</div>
                      <div className="text-xs text-gray-600">Rare</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Coins className="w-6 h-6 text-orange-500 mx-auto mb-1" />
                      <div className="text-lg font-bold">950</div>
                      <div className="text-xs text-gray-600">Total Value</div>
                    </CardContent>
                  </Card>
                </div>

                {/* NFT Collection */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">My Collection</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {nftCollection.map((nft) => (
                        <div key={nft.id} className="bg-gray-50 rounded-lg p-3">
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.name}
                            className="w-full h-24 object-cover rounded mb-2"
                          />
                          <h4 className="font-semibold text-sm mb-1">{nft.name}</h4>
                          <div className="flex justify-between items-center">
                            <Badge
                              className={`text-xs ${
                                nft.rarity === "Legendary"
                                  ? "bg-purple-100 text-purple-800"
                                  : nft.rarity === "Epic"
                                    ? "bg-orange-100 text-orange-800"
                                    : nft.rarity === "Rare"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {nft.rarity}
                            </Badge>
                            <span className="text-xs font-bold text-green-600">{nft.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Featured NFT */}
                <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="p-4 text-center">
                    <Trophy className="w-12 h-12 text-purple-600 mx-auto mb-3" />
                    <h3 className="font-bold text-purple-800 mb-2">Featured NFT</h3>
                    <p className="text-sm text-purple-600 mb-3">
                      Your Signal Iduna Card NFT is your most valuable collectible!
                    </p>
                    <Badge className="bg-purple-500 text-white">Legendary • 500 BONK</Badge>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                {/* Account Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Account Settings</CardTitle>
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

                {/* Profile Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
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
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profileData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                        placeholder="https://your-website.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) => handleInputChange("twitter", e.target.value)}
                        placeholder="@username"
                      />
                    </div>
                    <Button onClick={handleSave} className="w-full">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">Danger Zone</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                    >
                      Export Data
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-100 bg-transparent"
                    >
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
