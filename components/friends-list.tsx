"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, MessageCircle, Users } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

export function FriendsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [friends] = useState([
    {
      id: "1",
      name: "Max Mueller",
      username: "@max_bvb",
      avatar: "/placeholder.svg?height=40&width=40",
      city: "Dortmund",
      isOnline: true,
      mutualFriends: 12,
      favoriteTeam: "BVB",
    },
    {
      id: "2",
      name: "Anna Schmidt",
      username: "@anna_football",
      avatar: "/placeholder.svg?height=40&width=40",
      city: "München",
      isOnline: false,
      mutualFriends: 8,
      favoriteTeam: "Bayern",
    },
    {
      id: "3",
      name: "Tom Wilson",
      username: "@tom_fan",
      avatar: "/placeholder.svg?height=40&width=40",
      city: "London",
      isOnline: true,
      mutualFriends: 5,
      favoriteTeam: "Arsenal",
    },
  ])

  const [suggestions] = useState([
    {
      id: "4",
      name: "Lisa Weber",
      username: "@lisa_yellowwall",
      avatar: "/placeholder.svg?height=40&width=40",
      city: "Dortmund",
      mutualFriends: 15,
      favoriteTeam: "BVB",
    },
    {
      id: "5",
      name: "Marco Rossi",
      username: "@marco_calcio",
      avatar: "/placeholder.svg?height=40&width=40",
      city: "Milano",
      mutualFriends: 3,
      favoriteTeam: "Inter",
    },
  ])

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            Your Friends ({friends.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScrollArea className="h-48">
            <div className="space-y-3 pr-4">
              {friends.map((friend) => (
                <div key={friend.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      {friend.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{friend.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{friend.username}</span>
                        <span>•</span>
                        <span>{friend.city}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {friend.mutualFriends} mutual friends
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            Suggested Friends
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <ScrollArea className="h-32">
            <div className="space-y-3 pr-4">
              {suggestions.map((suggestion) => (
                <div key={suggestion.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={suggestion.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold text-sm">{suggestion.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{suggestion.username}</span>
                        <span>•</span>
                        <span>{suggestion.city}</span>
                      </div>
                      <div className="text-xs text-gray-400">
                        {suggestion.mutualFriends} mutual friends
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <UserPlus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
