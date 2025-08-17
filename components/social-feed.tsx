"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, Share2, MoreHorizontal, Play } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"

export function SocialFeed() {
  const [posts] = useState([
    {
      id: "1",
      user: {
        name: "BVB_Fan_2024",
        username: "@bvb_legend",
        avatar: "/placeholder.svg?height=40&width=40",
        city: "Dortmund",
      },
      content: "What an incredible match! Haaland's goal was absolutely insane! 🔥⚽ #BVB #Haaland #ChampionsLeague",
      image: "/placeholder.svg?height=200&width=300",
      likes: 234,
      comments: 45,
      shares: 12,
      timestamp: "2 hours ago",
      isLiked: false,
      hasVideo: true,
    },
    {
      id: "2",
      user: {
        name: "YellowWall_Official",
        username: "@yellowwall",
        avatar: "/placeholder.svg?height=40&width=40",
        city: "Dortmund",
      },
      content: "The atmosphere tonight was electric! You could feel the energy from every corner of the stadium! 💛🖤 #YellowWall #BVB",
      likes: 156,
      comments: 28,
      shares: 8,
      timestamp: "4 hours ago",
      isLiked: true,
      hasVideo: false,
    },
    {
      id: "3",
      user: {
        name: "Football_Fanatic",
        username: "@football_fan",
        avatar: "/placeholder.svg?height=40&width=40",
        city: "München",
      },
      content: "Just minted my first football NFT! This platform is amazing for connecting with other fans! 🎨⚽ #NFT #BONK",
      image: "/placeholder.svg?height=200&width=300",
      likes: 89,
      comments: 15,
      shares: 6,
      timestamp: "6 hours ago",
      isLiked: false,
      hasVideo: false,
    },
  ])

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 pr-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.user.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {post.user.city}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">{post.user.username} • {post.timestamp}</div>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm mb-3">{post.content}</p>

              {post.image && (
                <div className="relative mb-3">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post content"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  {post.hasVideo && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 rounded-full p-3">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
                    <span className="text-xs">{post.likes}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>

                  <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-600">
                    <Share2 className="w-4 h-4" />
                    <span className="text-xs">{post.shares}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}
