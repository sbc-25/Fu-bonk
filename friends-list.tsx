"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, MessageCircle, Trophy, Users, Crown, Gift, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Friend {
  id: string
  name: string
  username: string
  avatar: string
  level: number
  bonkBalance: number
  isOnline: boolean
  lastSeen?: Date
  mutualFriends: number
  achievements: number
  status: "friend" | "pending" | "suggested"
  favoriteTeam?: string
}

interface FriendRequest {
  id: string
  user: Friend
  timestamp: Date
  message?: string
}

export function FriendsList() {
  const [friends, setFriends] = useState<Friend[]>([])
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([])
  const [suggestedFriends, setSuggestedFriends] = useState<Friend[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("friends")
  const { toast } = useToast()

  useEffect(() => {
    // Mock friends data
    const mockFriends: Friend[] = [
      {
        id: "1",
        name: "Football King",
        username: "@footballking",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 15,
        bonkBalance: 25000,
        isOnline: true,
        mutualFriends: 12,
        achievements: 23,
        status: "friend",
        favoriteTeam: "BVB",
      },
      {
        id: "2",
        name: "BONK Collector",
        username: "@bonkcollector",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 8,
        bonkBalance: 15000,
        isOnline: false,
        lastSeen: new Date(Date.now() - 3600000),
        mutualFriends: 8,
        achievements: 15,
        status: "friend",
        favoriteTeam: "Bayern",
      },
      {
        id: "3",
        name: "Yellow Wall Fan",
        username: "@yellowwall",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 22,
        bonkBalance: 45000,
        isOnline: true,
        mutualFriends: 18,
        achievements: 34,
        status: "friend",
        favoriteTeam: "BVB",
      },
    ]

    const mockRequests: FriendRequest[] = [
      {
        id: "1",
        user: {
          id: "4",
          name: "NFT Hunter",
          username: "@nfthunter",
          avatar: "/placeholder.svg?height=40&width=40",
          level: 12,
          bonkBalance: 8000,
          isOnline: true,
          mutualFriends: 5,
          achievements: 18,
          status: "pending",
          favoriteTeam: "Real Madrid",
        },
        timestamp: new Date(Date.now() - 1800000),
        message: "Hey! I saw your epic NFT collection. Let's be friends! ⚽",
      },
    ]

    const mockSuggested: Friend[] = [
      {
        id: "5",
        name: "Stadium Explorer",
        username: "@stadiumexplorer",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 10,
        bonkBalance: 12000,
        isOnline: false,
        lastSeen: new Date(Date.now() - 7200000),
        mutualFriends: 3,
        achievements: 12,
        status: "suggested",
        favoriteTeam: "BVB",
      },
      {
        id: "6",
        name: "Goal Machine",
        username: "@goalmachine",
        avatar: "/placeholder.svg?height=40&width=40",
        level: 18,
        bonkBalance: 32000,
        isOnline: true,
        mutualFriends: 7,
        achievements: 28,
        status: "suggested",
        favoriteTeam: "Barcelona",
      },
    ]

    setFriends(mockFriends)
    setFriendRequests(mockRequests)
    setSuggestedFriends(mockSuggested)
  }, [])

  const handleAcceptRequest = (requestId: string) => {
    const request = friendRequests.find((r) => r.id === requestId)
    if (request) {
      setFriends([...friends, { ...request.user, status: "friend" }])
      setFriendRequests(friendRequests.filter((r) => r.id !== requestId))
      toast({
        title: "Friend request accepted! 🎉",
        description: `You are now friends with ${request.user.name}`,
      })
    }
  }

  const handleDeclineRequest = (requestId: string) => {
    setFriendRequests(friendRequests.filter((r) => r.id !== requestId))
    toast({
      title: "Friend request declined",
      description: "The request has been removed.",
    })
  }

  const handleSendRequest = (userId: string) => {
    setSuggestedFriends(
      suggestedFriends.map((friend) => (friend.id === userId ? { ...friend, status: "pending" as const } : friend)),
    )
    toast({
      title: "Friend request sent! 📤",
      description: "Your request has been sent successfully.",
    })
  }

  const handleSendGift = (friendId: string) => {
    toast({
      title: "Gift sent! 🎁",
      description: "You sent 10 BONK tokens to your friend!",
    })
  }

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (isOnline: boolean) => {
    return isOnline ? "bg-green-500" : "bg-gray-400"
  }

  const formatLastSeen = (lastSeen?: Date) => {
    if (!lastSeen) return ""
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - lastSeen.getTime()) / 60000)

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`
    }
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-600" />
            Friends & Community
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="friends" className="text-xs">
                Friends ({friends.length})
              </TabsTrigger>
              <TabsTrigger value="requests" className="text-xs">
                Requests ({friendRequests.length})
              </TabsTrigger>
              <TabsTrigger value="suggested" className="text-xs">
                Suggested ({suggestedFriends.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="friends" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {filteredFriends.map((friend) => (
                    <Card key={friend.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="relative">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                                <AvatarFallback>{friend.name[0]}</AvatarFallback>
                              </Avatar>
                              <div
                                className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusColor(friend.isOnline)}`}
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{friend.name}</span>
                                {friend.level >= 20 && <Crown className="w-4 h-4 text-yellow-500" />}
                                <Badge variant="outline" className="text-xs">
                                  Lv.{friend.level}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">{friend.username}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                <span className="flex items-center gap-1">
                                  <Trophy className="w-3 h-3" />
                                  {friend.achievements}
                                </span>
                                <span>{friend.bonkBalance.toLocaleString()} BONK</span>
                                {!friend.isOnline && friend.lastSeen && (
                                  <span>Last seen {formatLastSeen(friend.lastSeen)}</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleSendGift(friend.id)}
                              className="hover:scale-105 transition-transform"
                            >
                              <Gift className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:scale-105 transition-transform bg-transparent"
                            >
                              <MessageCircle className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="requests" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {friendRequests.map((request) => (
                    <Card key={request.id} className="border-blue-200 bg-blue-50">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={request.user.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{request.user.name}</span>
                              <Badge variant="outline" className="text-xs">
                                Lv.{request.user.level}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{request.user.username}</p>
                            {request.message && (
                              <p className="text-sm bg-white p-2 rounded-lg mb-3">"{request.message}"</p>
                            )}
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                              <span>{request.user.mutualFriends} mutual friends</span>
                              <span>{request.user.bonkBalance.toLocaleString()} BONK</span>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleAcceptRequest(request.id)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                Accept
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeclineRequest(request.id)}>
                                Decline
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="suggested" className="mt-4">
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {suggestedFriends.map((friend) => (
                    <Card key={friend.id} className="hover:shadow-md transition-all duration-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{friend.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-semibold">{friend.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  Lv.{friend.level}
                                </Badge>
                                {friend.favoriteTeam && (
                                  <Badge className="bg-orange-100 text-orange-800 text-xs">{friend.favoriteTeam}</Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{friend.username}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                                <span>{friend.mutualFriends} mutual friends</span>
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3" />
                                  {friend.achievements}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleSendRequest(friend.id)}
                            disabled={friend.status === "pending"}
                            className="hover:scale-105 transition-transform"
                          >
                            <UserPlus className="w-4 h-4 mr-1" />
                            {friend.status === "pending" ? "Sent" : "Add"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
