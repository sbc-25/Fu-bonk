"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Trophy, MessageCircle, QrCode, Play, Camera, MapPin, Coins, Heart, Bell, Gamepad2, Video, Home, Star, TrendingUp, Zap, Users, Award, Clock, Share2, Sparkles, Globe, ShoppingBag, Wallet, Target, Gift, Crown, CreditCard, Eye, Lock, Flame } from 'lucide-react'

import { Navigation } from "@/components/navigation"
import { WalletConnect } from "@/components/wallet-connect"
import { NFTMarketplace } from "@/components/nft-marketplace"
import { InternalWalletModal } from "@/components/internal-wallet-modal"
import { CitySelector } from "@/components/city-selector"
import { LiveChat } from "@/components/live-chat"
import { NFTMinting } from "@/components/nft-minting"
import { StakingRewards } from "@/components/staking-rewards"
import { TikTokVideoPlayer } from "@/components/tiktok-video-player"
import { UserProfile } from "@/components/user-profile"
import { SocialFeed } from "@/components/social-feed"
import { FriendsList } from "@/components/friends-list"
import { AmateurFootballSystem } from "@/components/amateur-football-system"
import { SignalIdunaCardNFT } from "@/components/signal-iduna-card-nft"
import { BonkIntegrationFeatures } from "@/components/bonk-integration-features"
import { SecretExclusiveNFT } from "@/components/secret-exclusive-nft"
import { WalletProvider, useWallet } from "@/components/wallet-provider"
import { useToast } from "@/hooks/use-toast"

// Mock service imports - these would be implemented with actual services
const MembershipService = {
  getUserMembership: () => ({ name: "Gold Legend", icon: "👑", color: "bg-yellow-500" }),
}

const PointsSystem = {
  getUserPoints: () => 2450,
}

interface VideoData {
  id: string
  title: string
  description: string
  creator: string
  creatorAvatar: string
  thumbnail: string
  likes: number
  comments: number
  shares: number
  isLive: boolean
  stadium?: string
  location: string
  duration: string
  bonkReward: number
  isLiked: boolean
  isBookmarked: boolean
  hashtags: string[]
  hasARFilter?: boolean
  arFilterName?: string
}

interface NewsItem {
  id: string
  title: string
  summary: string
  image: string
  timestamp: Date
  category: "transfer" | "match" | "bonk" | "nft"
  readTime: number
}

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  reward: number
  unlocked: boolean
}

function BonkVSPlatformContent() {
  const [activeTab, setActiveTab] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTeam, setSelectedTeam] = useState<"won" | "lost" | null>(null)
  const [currentCity, setCurrentCity] = useState("Dortmund")
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [notifications, setNotifications] = useState(3)
  const [weeklyDropTime, setWeeklyDropTime] = useState(172800) // 48 hours in seconds
  const [weeklyDropStreak, setWeeklyDropStreak] = useState(3)
  const [homeButtonClicks, setHomeButtonClicks] = useState(0)
  const [lastClickTime, setLastClickTime] = useState(0)

  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showMarketplace, setShowMarketplace] = useState(false)
  const [showCitySelector, setShowCitySelector] = useState(false)
  const [showInternalWallet, setShowInternalWallet] = useState(false)
  const [showLiveChat, setShowLiveChat] = useState(false)
  const [showNFTMinting, setShowNFTMinting] = useState(false)
  const [showStaking, setShowStaking] = useState(false)
  const [showVideoPlayer, setShowVideoPlayer] = useState(false)
  const [showUserProfile, setShowUserProfile] = useState(false)
  const [showSignalIdunaCard, setShowSignalIdunaCard] = useState(false)
  const [showBonkIntegration, setShowBonkIntegration] = useState(false)
  const [showSecretExclusiveNFT, setShowSecretExclusiveNFT] = useState(false)

  const [membership, setMembership] = useState(MembershipService.getUserMembership())
  const [userPoints, setUserPoints] = useState(PointsSystem.getUserPoints())

  const { wallet, connect, connecting } = useWallet()
  const { toast } = useToast()

  const returnToHome = () => {
    setShowWalletModal(false)
    setShowMarketplace(false)
    setShowCitySelector(false)
    setShowInternalWallet(false)
    setShowLiveChat(false)
    setShowNFTMinting(false)
    setShowStaking(false)
    setShowVideoPlayer(false)
    setShowUserProfile(false)
    setShowSignalIdunaCard(false)
    setShowBonkIntegration(false)
    setShowSecretExclusiveNFT(false)
    setActiveTab("home")
  }

  const handleHomeButtonClick = () => {
    const currentTime = Date.now()
    
    // Reset counter if more than 2 seconds have passed since last click
    if (currentTime - lastClickTime > 2000) {
      setHomeButtonClicks(1)
    } else {
      setHomeButtonClicks(prev => prev + 1)
    }
    
    setLastClickTime(currentTime)
    
    // Check if clicked 3 times within 2 seconds
    if (homeButtonClicks >= 2 && currentTime - lastClickTime <= 2000) {
      setShowSecretExclusiveNFT(true)
      setHomeButtonClicks(0)
      toast({
        title: "🔥 Secret Unlocked! 🔥",
        description: "Welcome to the exclusive underground collection! 🐶💋⚽",
      })
    } else {
      setActiveTab("home")
    }
  }

  const videos: VideoData[] = [
    {
      id: "1",
      title: "Haaland's incredible goal! 🔥⚽",
      description:
        "What a strike from Erling Haaland! The goalkeeper didn't even see it coming! 😱 #BVB #Haaland #Goal #Bundesliga #Epic",
      creator: "SignalIdunaPark",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=800&width=450",
      likes: 15420,
      comments: 892,
      shares: 234,
      isLive: true,
      stadium: "Signal Iduna Park",
      location: "Dortmund, Germany",
      duration: "0:45",
      bonkReward: 50,
      isLiked: false,
      isBookmarked: false,
      hashtags: ["BVB", "Haaland", "Goal", "Bundesliga", "Football", "Epic", "Wow"],
      hasARFilter: true,
      arFilterName: "BONK Crown",
    },
    {
      id: "2",
      title: "Südtribüne singing 'You'll Never Walk Alone' 🎵",
      description:
        "The Yellow Wall showing their support! Goosebumps guaranteed! 💛🖤 #YellowWall #BVB #Atmosphere #Chills",
      creator: "YellowWallOfficial",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=800&width=450",
      likes: 8934,
      comments: 567,
      shares: 123,
      isLive: false,
      stadium: "Signal Iduna Park",
      location: "Dortmund, Germany",
      duration: "1:20",
      bonkReward: 30,
      isLiked: true,
      isBookmarked: false,
      hashtags: ["YellowWall", "BVB", "Atmosphere", "Fans", "Singing", "Epic"],
      hasARFilter: true,
      arFilterName: "Feuer Augen",
    },
    {
      id: "3",
      title: "Bayern vs Dortmund - Der Klassiker highlights! ⚡",
      description: "The best moments from Der Klassiker! What a match! 🏆⚽ #DerKlassiker #Bayern #BVB #Football",
      creator: "FootballHighlights",
      creatorAvatar: "/placeholder.svg?height=40&width=40",
      thumbnail: "/placeholder.svg?height=800&width=450",
      likes: 23456,
      comments: 1234,
      shares: 456,
      isLive: false,
      stadium: "Allianz Arena",
      location: "München, Germany",
      duration: "2:15",
      bonkReward: 80,
      isLiked: false,
      isBookmarked: true,
      hashtags: ["DerKlassiker", "Bayern", "BVB", "Highlights", "Epic", "Football"],
      hasARFilter: true,
      arFilterName: "Stern Glitzer",
    },
  ]

  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "Haaland scores hat-trick in Champions League! ⚽🔥",
      summary: "Erling Haaland's incredible performance leads BVB to victory",
      image: "/placeholder.svg?height=100&width=150",
      timestamp: new Date(Date.now() - 1800000),
      category: "match",
      readTime: 3,
    },
    {
      id: "2",
      title: "BONK token reaches new all-time high! 🚀💰",
      summary: "Football fans drive BONK adoption to unprecedented levels",
      image: "/placeholder.svg?height=100&width=150",
      timestamp: new Date(Date.now() - 3600000),
      category: "bonk",
      readTime: 2,
    },
    {
      id: "3",
      title: "Rare Messi NFT sells for 50,000 BONK! 🎨⚽",
      summary: "Historic football moment immortalized as digital collectible",
      image: "/placeholder.svg?height=100&width=150",
      timestamp: new Date(Date.now() - 7200000),
      category: "nft",
      readTime: 4,
    },
  ]

  const achievements: Achievement[] = [
    {
      id: "1",
      name: "Weekly Collector",
      description: "Claim 4 weekly drops in a row",
      icon: "🎁",
      progress: weeklyDropStreak,
      maxProgress: 4,
      reward: 500,
      unlocked: weeklyDropStreak >= 4,
    },
    {
      id: "2",
      name: "BONK Collector",
      description: "Earn 10,000 BONK tokens",
      icon: "💰",
      progress: wallet?.balance?.bonk || 0,
      maxProgress: 10000,
      reward: 500,
      unlocked: (wallet?.balance?.bonk || 0) >= 10000,
    },
    {
      id: "3",
      name: "Social Butterfly",
      description: "Like 100 videos",
      icon: "❤️",
      progress: 67,
      maxProgress: 100,
      reward: 250,
      unlocked: false,
    },
  ]

  const funnyQuotes = [
    "⚽ 'Football is like life - it requires perseverance, self-denial, hard work, sacrifice, dedication and respect for authority.' - Vince Lombardi",
    "🤣 'Some people think football is a matter of life and death. I assure you, it's much more serious than that.' - Bill Shankly",
    "💪 'The ball is round, the game lasts ninety minutes, and everything else is just theory.' - Sepp Herberger",
    "🎯 'In football, the most difficult thing is to make the difficult look simple.' - Johan Cruyff",
    "🏆 'Football is the ballet of the masses.' - Dmitri Shostakovich",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % funnyQuotes.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setWeeklyDropTime((prev) => (prev > 0 ? prev - 1 : 604800)) // Reset to 7 days
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`
    }
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const quickStats = [
    {
      icon: <Gift className="w-3 h-3" />,
      label: "Drops",
      value: weeklyDropStreak,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: <Trophy className="w-3 h-3" />,
      label: "Rank",
      value: "#247",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: <Users className="w-3 h-3" />,
      label: "Friends",
      value: 89,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: <Star className="w-3 h-3" />,
      label: "Level",
      value: 12,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
  ]

  const trendingHashtags = ["#BVB", "#BONK", "#NFT", "#Haaland", "#ChampionsLeague", "#YellowWall"]

  const handleConnectWallet = async () => {
    if (!wallet) {
      setShowWalletModal(true)
    }
  }

  const handleClaimWeeklyDrop = () => {
    const dropAmount = 250 + weeklyDropStreak * 50 // Base 250 + streak bonus
    setWeeklyDropStreak((prev) => prev + 1)
    setWeeklyDropTime(604800) // Reset to 7 days
    toast({
      title: "Weekly Drop claimed! 🎁",
      description: `Du hast ${dropAmount} BONK erhalten! Streak: ${weeklyDropStreak + 1}`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl animate-bounce opacity-10"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              {
                ["⚽", "🏆", "🔥", "⭐", "💛", "🖤", "🎉", "🚀", "💪", "🎯", "🍕", "☕", "🎵", "📱", "🎮"][
                  Math.floor(Math.random() * 15)
                ]
              }
            </div>
          ))}
        </div>

        {/* Compact Header */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-3 text-white relative z-10">
          <div className="flex items-center justify-between mb-2">
            <div
              className="flex items-center gap-1 cursor-pointer hover:bg-white/20 rounded-lg p-1 -m-1 transition-all duration-200 hover:scale-105"
              onClick={() => setShowCitySelector(true)}
            >
              <MapPin className="w-4 h-4 animate-pulse" />
              <span className="font-bold text-sm">{currentCity}</span>
              <span className="text-xs">🏠</span>
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 p-1"
                onClick={returnToHome}
              >
                <Home className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 relative transition-all duration-200 hover:scale-110 p-1"
              >
                <Bell className="w-4 h-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center animate-pulse">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110 p-1"
                onClick={handleConnectWallet}
                disabled={connecting}
              >
                {connecting ? (
                  <div className="w-4 h-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : wallet ? (
                  <QrCode className="w-4 h-4" />
                ) : (
                  <Wallet className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <Input
              placeholder="Suche nach epischen Momenten... 🔍"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 bg-white/90 border-0 text-gray-800 placeholder:text-gray-500 h-8 text-sm"
            />
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full">
                <Coins className="w-3 h-3 text-yellow-300" />
                <span className="font-semibold text-sm">{wallet?.balance?.bonk?.toLocaleString() || 0}</span>
              </div>
              <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded-full">
                <Trophy className="w-3 h-3 text-blue-300" />
                <span className="font-semibold text-sm">{userPoints.toLocaleString()}</span>
              </div>
            </div>

            {membership && (
              <Badge className={`${membership.color} text-white animate-pulse text-xs`}>
                {membership.icon} {membership.name}
              </Badge>
            )}
          </div>

          <div className="bg-white/10 rounded-lg p-2 backdrop-blur-sm">
            <p className="text-xs text-center animate-pulse">{funnyQuotes[currentQuote]}</p>
          </div>
        </div>

        <main className="relative z-10">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-20">
              <TabsList className="grid w-full grid-cols-6 bg-transparent">
                <TabsTrigger value="home" className="flex flex-col gap-1 py-2">
                  <Home className="w-3 h-3" />
                  <span className="text-xs">Home</span>
                </TabsTrigger>
                <TabsTrigger value="games" className="flex flex-col gap-1 py-2">
                  <Gamepad2 className="w-3 h-3" />
                  <span className="text-xs">Games</span>
                </TabsTrigger>
                <TabsTrigger value="live" className="flex flex-col gap-1 py-2">
                  <div className="relative">
                    <Video className="w-3 h-3" />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                  </div>
                  <span className="text-xs">Live</span>
                </TabsTrigger>
                <TabsTrigger value="nft" className="flex flex-col gap-1 py-2">
                  <Trophy className="w-3 h-3" />
                  <span className="text-xs">NFTs</span>
                </TabsTrigger>
                <TabsTrigger value="amateur" className="flex flex-col gap-1 py-2">
                  <div className="relative">
                    <Target className="w-3 h-3" />
                    <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <span className="text-xs">Amateur</span>
                </TabsTrigger>
                <TabsTrigger value="social" className="flex flex-col gap-1 py-2">
                  <div className="relative">
                    <Users className="w-3 h-3" />
                    {notifications > 0 && (
                      <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <span className="text-xs">Social</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="home" className="pb-20">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="space-y-4 p-4">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-4 gap-2">
                    {quickStats.map((stat, index) => (
                      <Card
                        key={index}
                        className="hover:scale-105 transition-transform cursor-pointer border-0 shadow-md animate-in slide-in-from-bottom-2"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <CardContent className="p-2 text-center">
                          <div
                            className={`w-6 h-6 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-1`}
                          >
                            <div className={stat.color}>{stat.icon}</div>
                          </div>
                          <div className="text-xs font-semibold text-gray-700">{stat.label}</div>
                          <div className="text-sm font-bold text-gray-800">{stat.value}</div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Signal Iduna Card NFT Feature */}
                  <Card
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white cursor-pointer hover:scale-105 transition-transform animate-in slide-in-from-top-4"
                    onClick={() => setShowSignalIdunaCard(true)}
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard className="w-4 h-4 animate-pulse" />
                            <span className="font-bold text-sm">Signal Iduna Card NFT</span>
                          </div>
                          <p className="text-xs opacity-90">Deine digitale Mitgliedskarte mit exklusiven Vorteilen</p>
                        </div>
                        <div className="text-center">
                          <Crown className="w-6 h-6 animate-bounce mx-auto" />
                          <div className="text-xs opacity-75">Gold Tier</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Weekly Drop System */}
                  <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white animate-in slide-in-from-left-4">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Gift className="w-4 h-4 animate-pulse" />
                            <span className="font-bold text-sm">Weekly Drop: {weeklyDropStreak} Streak</span>
                          </div>
                          <p className="text-xs opacity-90">Nächster Drop verfügbar in:</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold animate-pulse">{formatTime(weeklyDropTime)}</div>
                          <div className="text-xs opacity-75">Zeit verbleibend</div>
                        </div>
                      </div>

                      {weeklyDropTime <= 0 && (
                        <div className="mt-2 pt-2 border-t border-white/20">
                          <Button
                            className="w-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm text-xs"
                            onClick={handleClaimWeeklyDrop}
                          >
                            <Gift className="w-3 h-3 mr-1" />
                            Weekly Drop abholen ({250 + weeklyDropStreak * 50} BONK)
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Match Voting */}
                  <Card className="border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50 hover:shadow-xl transition-all duration-300 animate-in slide-in-from-right-4">
                    <CardContent className="p-4">
                      <div className="text-center mb-3">
                        <div className="text-xs font-semibold text-gray-700 mb-1 flex items-center justify-center gap-2">
                          🏟️ LIVE MATCH
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></div>
                        </div>
                        <div className="text-sm font-bold text-gray-800">BVB vs Bayern München</div>
                        <div className="text-xs text-gray-600">90+3' - Champions League Final</div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <Button
                          variant={selectedTeam === "won" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTeam("won")}
                          className={`transition-all duration-300 hover:scale-110 text-xs ${
                            selectedTeam === "won"
                              ? "bg-green-500 hover:bg-green-600 animate-pulse"
                              : "border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
                          }`}
                        >
                          BVB Wins 🟡
                        </Button>
                        <div className="text-2xl font-bold text-gray-800 animate-pulse">2-1</div>
                        <Button
                          variant={selectedTeam === "lost" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTeam("lost")}
                          className={`transition-all duration-300 hover:scale-110 text-xs ${
                            selectedTeam === "lost"
                              ? "bg-red-500 hover:bg-red-600 animate-pulse"
                              : "border-red-300 text-red-700 hover:bg-red-50 bg-transparent"
                          }`}
                        >
                          Bayern Wins 🔴
                        </Button>
                      </div>

                      {selectedTeam && (
                        <div className="text-center mb-3 animate-in slide-in-from-top-2">
                          <Badge variant="secondary" className="bg-orange-100 text-orange-800 animate-bounce text-xs">
                            <Coins className="w-3 h-3 mr-1" />
                            +25 BONK Reward! 💰
                          </Badge>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-orange-300 hover:bg-orange-50 bg-transparent hover:scale-105 transition-transform text-xs"
                          onClick={() => setShowLiveChat(true)}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Live Chat
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-orange-300 hover:bg-orange-50 bg-transparent hover:scale-105 transition-transform text-xs"
                          onClick={() => setShowVideoPlayer(true)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Watch Live
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Trending Hashtags */}
                  <Card className="animate-in slide-in-from-bottom-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        Trending Now 🔥
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1">
                        {trendingHashtags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-all duration-200 hover:scale-105 animate-in slide-in-from-left-2 text-xs"
                            style={{ animationDelay: `${index * 100}ms` }}
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* News Feed */}
                  <Card className="animate-in slide-in-from-left-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Globe className="w-4 h-4 text-green-600" />
                        Latest News 📰
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {newsItems.map((news, index) => (
                        <div
                          key={news.id}
                          className="flex gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200 cursor-pointer hover:scale-[1.02] animate-in slide-in-from-right-2"
                          style={{ animationDelay: `${index * 150}ms` }}
                        >
                          <img
                            src={news.image || "/placeholder.svg"}
                            alt={news.title}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-xs line-clamp-2 mb-1">{news.title}</h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-1">{news.summary}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span>{Math.floor((Date.now() - news.timestamp.getTime()) / 60000)}m ago</span>
                              <span>•</span>
                              <span>{news.readTime} min read</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Achievements Progress */}
                  <Card className="animate-in slide-in-from-bottom-4">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Award className="w-4 h-4 text-purple-600" />
                        Your Progress 🎯
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <div
                          key={achievement.id}
                          className="space-y-1 animate-in slide-in-from-left-2"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{achievement.icon}</span>
                              <div>
                                <h4 className="font-semibold text-xs">{achievement.name}</h4>
                                <p className="text-xs text-gray-600">{achievement.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs font-bold">
                                {achievement.progress}/{achievement.maxProgress}
                              </div>
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                +{achievement.reward} BONK
                              </Badge>
                            </div>
                          </div>
                          <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-1" />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <Card
                      className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 cursor-pointer hover:scale-105 transition-transform animate-in slide-in-from-left-4"
                      onClick={() => setShowNFTMinting(true)}
                    >
                      <CardContent className="p-3 text-center">
                        <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-1 animate-pulse" />
                        <h3 className="font-bold text-purple-800 text-xs">Create NFT</h3>
                        <p className="text-xs text-purple-600 mt-1">Turn moments into art</p>
                      </CardContent>
                    </Card>

                    <Card
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 cursor-pointer hover:scale-105 transition-transform animate-in slide-in-from-right-4"
                      onClick={() => setShowStaking(true)}
                    >
                      <CardContent className="p-3 text-center">
                        <Zap className="w-6 h-6 text-green-600 mx-auto mb-1 animate-pulse" />
                        <h3 className="font-bold text-green-800 text-xs">Stake BONK</h3>
                        <p className="text-xs text-green-600 mt-1">Earn passive rewards</p>
                      </CardContent>
                    </Card>

                    <Card
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 cursor-pointer hover:scale-105 transition-transform animate-in slide-in-from-left-4"
                      onClick={() => setShowMarketplace(true)}
                    >
                      <CardContent className="p-3 text-center">
                        <ShoppingBag className="w-6 h-6 text-blue-600 mx-auto mb-1 animate-pulse" />
                        <h3 className="font-bold text-blue-800 text-xs">NFT Market</h3>
                        <p className="text-xs text-blue-600 mt-1">Buy & sell collectibles</p>
                      </CardContent>
                    </Card>

                    <Card
                      className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 cursor-pointer hover:scale-105 transition-transform animate-in slide-in-from-right-4"
                      onClick={() => setShowBonkIntegration(true)}
                    >
                      <CardContent className="p-3 text-center">
                        <Coins className="w-6 h-6 text-orange-600 mx-auto mb-1 animate-pulse" />
                        <h3 className="font-bold text-orange-800 text-xs">BONK Features</h3>
                        <p className="text-xs text-orange-600 mt-1">Payments, Staking & Rewards</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Featured Video */}
                  <Card className="overflow-hidden animate-in slide-in-from-bottom-4">
                    <div className="relative">
                      <img
                        src={videos[0].thumbnail || "/placeholder.svg"}
                        alt={videos[0].title}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Button
                          size="sm"
                          className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm hover:scale-110 transition-transform text-xs"
                          onClick={() => setShowVideoPlayer(true)}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Watch Now
                        </Button>
                      </div>
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white animate-pulse text-xs">🔴 LIVE</Badge>
                      <Badge className="absolute top-2 right-2 bg-orange-500 text-white animate-bounce text-xs">
                        +{videos[0].bonkReward} BONK
                      </Badge>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-bold text-sm mb-1">{videos[0].title}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-600">
                        <span className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
                          <Heart className="w-3 h-3" />
                          {videos[0].likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
                          <MessageCircle className="w-3 h-3" />
                          {videos[0].comments}
                        </span>
                        <span className="flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
                          <Share2 className="w-3 h-3" />
                          {videos[0].shares}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="games" className="p-4 space-y-4">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="text-center mb-6 animate-in slide-in-from-top-4">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">🎮 Game Center</h2>
                  <p className="text-gray-600">Games coming soon! Stay tuned for exciting football games!</p>
                </div>

                {/* Coming Soon Games */}
                <div className="grid grid-cols-2 gap-3">
                  <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 opacity-60">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🎯</div>
                      <h4 className="font-bold text-purple-800 text-sm">Penalty Shootout</h4>
                      <p className="text-xs text-purple-600 mt-1">Coming Soon</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 opacity-60">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🧠</div>
                      <h4 className="font-bold text-orange-800 text-sm">Football Quiz</h4>
                      <p className="text-xs text-orange-600 mt-1">Coming Soon</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200 opacity-60">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">⚡</div>
                      <h4 className="font-bold text-green-800 text-sm">Speed Challenge</h4>
                      <p className="text-xs text-green-600 mt-1">Coming Soon</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 opacity-60">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">🏆</div>
                      <h4 className="font-bold text-yellow-800 text-sm">Tournament Mode</h4>
                      <p className="text-xs text-yellow-600 mt-1">Coming Soon</p>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gradient-to-r from-blue-100 to-purple-100 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <Gamepad2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-pulse" />
                    <h3 className="text-xl font-bold text-blue-800 mb-2">Exciting Games Coming Soon!</h3>
                    <p className="text-gray-600 mb-4">
                      We're working hard to bring you the most exciting football games. Get ready for penalty shootouts,
                      quizzes, tournaments and much more!
                    </p>
                    <Badge className="bg-blue-500 text-white animate-bounce">🚀 Stay tuned for updates!</Badge>
                  </CardContent>
                </Card>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="live" className="p-4">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="text-center py-8 animate-in slide-in-from-bottom-4">
                  <Video className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Videos</h3>
                  <p className="text-gray-600 mb-4">Watch live football content from stadiums around the world!</p>
                  <Button
                    onClick={() => setShowVideoPlayer(true)}
                    className="bg-red-500 hover:bg-red-600 hover:scale-105 transition-transform"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Live
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="nft" className="p-4">
              <ScrollArea className="h-[calc(100vh-160px)]">
                <div className="text-center py-8 animate-in slide-in-from-bottom-4">
                  <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">NFT Marketplace</h3>
                  <p className="text-gray-600 mb-4">Discover and collect unique football NFTs!</p>
                  <Button
                    onClick={() => setShowMarketplace(true)}
                    className="bg-purple-500 hover:bg-purple-600 hover:scale-105 transition-transform"
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    Browse NFTs
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="amateur" className="pb-20">
              <div className="h-[calc(100vh-120px)]">
                <AmateurFootballSystem />
              </div>
            </TabsContent>

            <TabsContent value="social" className="p-4 pb-20">
              <ScrollArea className="h-[calc(100vh-200px)]">
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <Users className="w-6 h-6 text-orange-600" />
                      Social Hub
                    </h2>
                    <Badge className="bg-orange-100 text-orange-800 animate-pulse">{notifications} new</Badge>
                  </div>

                  <Tabs defaultValue="feed" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="feed">Feed</TabsTrigger>
                      <TabsTrigger value="friends">Friends</TabsTrigger>
                    </TabsList>

                    <TabsContent value="feed" className="mt-4">
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <SocialFeed />
                      </ScrollArea>
                    </TabsContent>

                    <TabsContent value="friends" className="mt-4">
                      <ScrollArea className="h-[calc(100vh-350px)]">
                        <FriendsList />
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white/95 backdrop-blur-sm border-t border-gray-200 px-4 py-2 z-30">
          <div className="flex justify-around items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleHomeButtonClick}
              className={`flex flex-col gap-1 transition-all duration-300 hover:scale-110 ${
                activeTab === "home" ? "text-orange-600" : "text-gray-600"
              }`}
            >
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">🐕</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNFTMinting(true)}
              className="flex flex-col gap-1 transition-all duration-300 hover:scale-110 text-gray-600"
            >
              <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:animate-spin">
                <Camera className="w-4 h-4 text-white" />
              </div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowVideoPlayer(true)}
              className="flex flex-col gap-1 transition-all duration-300 hover:scale-110 text-gray-600"
            >
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Play className="w-4 h-4 text-white" />
              </div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("amateur")}
              className={`flex flex-col gap-1 transition-all duration-300 hover:scale-110 ${
                activeTab === "amateur" ? "text-green-600" : "text-gray-600"
              }`}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center hover:animate-bounce relative">
                <Target className="w-4 h-4 text-white" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full animate-ping"></div>
              </div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab("social")}
              className={`flex flex-col gap-1 transition-all duration-300 hover:scale-110 ${
                activeTab === "social" ? "text-orange-600" : "text-gray-600"
              }`}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:animate-pulse relative">
                <Users className="w-4 h-4 text-white" />
                {notifications > 0 && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Modals */}
        <WalletConnect
          isOpen={showWalletModal}
          onClose={() => setShowWalletModal(false)}
          onWalletConnect={() => setShowWalletModal(false)}
        />

        <NFTMarketplace isOpen={showMarketplace} onClose={() => setShowMarketplace(false)} />

        <CitySelector
          isOpen={showCitySelector}
          onClose={() => setShowCitySelector(false)}
          currentCity={currentCity}
          onCitySelect={(city) => {
            setCurrentCity(city)
            setShowCitySelector(false)
          }}
        />

        <InternalWalletModal
          isOpen={showInternalWallet}
          onClose={() => setShowInternalWallet(false)}
          bonkBalance={wallet?.balance?.bonk || 0}
          onBalanceUpdate={(newBalance) => {
            if (wallet) {
              wallet.balance = { ...wallet.balance, bonk: newBalance }
            }
          }}
        />

        <LiveChat
          isOpen={showLiveChat}
          onClose={() => setShowLiveChat(false)}
          chatType="match"
          title="BVB vs Bayern - Live Chat 💬"
          city={currentCity}
        />

        <NFTMinting isOpen={showNFTMinting} onClose={() => setShowNFTMinting(false)} />

        <StakingRewards isOpen={showStaking} onClose={() => setShowStaking(false)} />

        <UserProfile isOpen={showUserProfile} onClose={() => setShowUserProfile(false)} />

        <SignalIdunaCardNFT isOpen={showSignalIdunaCard} onClose={() => setShowSignalIdunaCard(false)} />

        <BonkIntegrationFeatures isOpen={showBonkIntegration} onClose={() => setShowBonkIntegration(false)} />

        <SecretExclusiveNFT isOpen={showSecretExclusiveNFT} onClose={() => setShowSecretExclusiveNFT(false)} />

        {showVideoPlayer && (
          <TikTokVideoPlayer
            videos={videos}
            currentIndex={currentVideoIndex}
            onVideoChange={setCurrentVideoIndex}
            onClose={() => setShowVideoPlayer(false)}
          />
        )}
      </div>
    </div>
  )
}

export default function BonkVSPlatform() {
  return (
    <WalletProvider>
      <BonkVSPlatformContent />
    </WalletProvider>
  )
}
