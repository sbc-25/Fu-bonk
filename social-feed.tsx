"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageCircle, Share2, Send, MoreHorizontal, Trophy, MapPin, Clock, Zap } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { formatRelativeTime } from "@/lib/utils"

interface SocialPost {
  id: string
  user: {
    name: string
    username: string
    avatar: string
    verified: boolean
    level: number
  }
  content: string
  image?: string
  timestamp: Date
  likes: number
  comments: number
  shares: number
  isLiked: boolean
  location?: string
  type: "text" | "image" | "nft" | "achievement" | "live"
  nftData?: {
    name: string
    price: number
    rarity: string
  }
  achievementData?: {
    name: string
    icon: string
    reward: number
  }
}

interface Comment {
  id: string
  user: {
    name: string
    username: string
    avatar: string
  }
  content: string
  timestamp: Date
  likes: number
}

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>([])
  const [newPost, setNewPost] = useState("")
  const [selectedPost, setSelectedPost] = useState<string | null>(null)
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [newComment, setNewComment] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Mock social posts data
    const mockPosts: SocialPost[] = [
      {
        id: "1",
        user: {
          name: "Football King",
          username: "@footballking",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
          level: 15,
        },
        content:
          "Just minted this incredible Haaland goal NFT! 🔥⚽ The moment he scored that bicycle kick will be remembered forever! #BVB #NFT #BONK",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: new Date(Date.now() - 1800000),
        likes: 234,
        comments: 45,
        shares: 12,
        isLiked: false,
        location: "Signal Iduna Park",
        type: "nft",
        nftData: {
          name: "Haaland Bicycle Kick",
          price: 150,
          rarity: "Epic",
        },
      },
      {
        id: "2",
        user: {
          name: "BONK Collector",
          username: "@bonkcollector",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
          level: 8,
        },
        content:
          "Achievement unlocked! 🏆 Just reached 10,000 BONK tokens! The grind was worth it. Time to stake and earn passive rewards! 💰",
        timestamp: new Date(Date.now() - 3600000),
        likes: 89,
        comments: 23,
        shares: 5,
        isLiked: true,
        type: "achievement",
        achievementData: {
          name: "BONK Millionaire",
          icon: "💰",
          reward: 500,
        },
      },
      {
        id: "3",
        user: {
          name: "Yellow Wall Fan",
          username: "@yellowwall",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: true,
          level: 22,
        },
        content:
          "LIVE from the Südtribüne! The atmosphere is absolutely electric! 💛🖤 You can feel the energy through the screen! #YellowWall #BVB",
        image: "/placeholder.svg?height=300&width=400",
        timestamp: new Date(Date.now() - 900000),
        likes: 456,
        comments: 78,
        shares: 34,
        isLiked: false,
        location: "Dortmund, Germany",
        type: "live",
      },
      {
        id: "4",
        user: {
          name: "NFT Hunter",
          username: "@nfthunter",
          avatar: "/placeholder.svg?height=40&width=40",
          verified: false,
          level: 12,
        },
        content:
          "Found a rare Messi card in the marketplace! 🐐 Only 100 of these exist. Should I buy it or wait for the price to drop? What do you think? 🤔",
        timestamp: new Date(Date.now() - 7200000),
        likes: 67,
        comments: 34,
        shares: 8,
        isLiked: false,
        type: "text",
      },
    ]

    setPosts(mockPosts)

    // Mock comments
    const mockComments: Record<string, Comment[]> = {
      "1": [
        {
          id: "c1",
          user: {
            name: "Fan123",
            username: "@fan123",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "Incredible NFT! That goal was pure magic ⚡",
          timestamp: new Date(Date.now() - 1200000),
          likes: 12,
        },
        {
          id: "c2",
          user: {
            name: "BVB4Life",
            username: "@bvb4life",
            avatar: "/placeholder.svg?height=32&width=32",
          },
          content: "I was there! The stadium went absolutely crazy! 🔥",
          timestamp: new Date(Date.now() - 900000),
          likes: 8,
        },
      ],
    }

    setComments(mockComments)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          }
        }
        return post
      }),
    )

    toast({
      title: "Post liked! ❤️",
      description: "You earned 2 BONK tokens for engaging!",
    })
  }

  const handleShare = (postId: string) => {
    toast({
      title: "Post shared! 🚀",
      description: "You earned 5 BONK tokens for sharing!",
    })
  }

  const handleComment = (postId: string) => {
    if (!newComment.trim()) return

    const comment: Comment = {
      id: `c${Date.now()}`,
      user: {
        name: "You",
        username: "@you",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      content: newComment,
      timestamp: new Date(),
      likes: 0,
    }

    setComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), comment],
    }))

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: post.comments + 1 }
        }
        return post
      }),
    )

    setNewComment("")
    toast({
      title: "Comment posted! 💬",
      description: "You earned 3 BONK tokens for commenting!",
    })
  }

  const handleCreatePost = () => {
    if (!newPost.trim()) return

    const post: SocialPost = {
      id: `p${Date.now()}`,
      user: {
        name: "You",
        username: "@you",
        avatar: "/placeholder.svg?height=40&width=40",
        verified: false,
        level: 5,
      },
      content: newPost,
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      type: "text",
    }

    setPosts([post, ...posts])
    setNewPost("")
    toast({
      title: "Post created! 🎉",
      description: "You earned 10 BONK tokens for posting!",
    })
  }

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case "nft":
        return <Trophy className="w-4 h-4 text-purple-500" />
      case "achievement":
        return <Zap className="w-4 h-4 text-yellow-500" />
      case "live":
        return <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-4">
      {/* Create Post */}
      <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Input
                placeholder="Share your football moment... ⚽"
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="border-orange-200 focus:border-orange-400"
              />
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    📸 Photo
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    🎬 Video
                  </Button>
                  <Button variant="outline" size="sm" className="text-xs bg-transparent">
                    🏆 NFT
                  </Button>
                </div>
                <Button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <ScrollArea className="h-[600px]">
        <div className="space-y-4">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="hover:shadow-lg transition-all duration-300 animate-in slide-in-from-bottom-4"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={post.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.user.name}</span>
                        {post.user.verified && <Badge className="bg-blue-500 text-white text-xs">✓</Badge>}
                        <Badge variant="outline" className="text-xs">
                          Lv.{post.user.level}
                        </Badge>
                        {getPostTypeIcon(post.type)}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{post.user.username}</span>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatRelativeTime(post.timestamp)}</span>
                        </div>
                        {post.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{post.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-gray-800">{post.content}</p>

                {post.image && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt="Post content"
                      className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                {post.nftData && (
                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-purple-800">{post.nftData.name}</h4>
                          <p className="text-sm text-purple-600">{post.nftData.price} BONK</p>
                        </div>
                        <Badge className="bg-purple-500 text-white">{post.nftData.rarity}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {post.achievementData && (
                  <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{post.achievementData.icon}</span>
                        <div>
                          <h4 className="font-semibold text-yellow-800">{post.achievementData.name}</h4>
                          <p className="text-sm text-yellow-600">+{post.achievementData.reward} BONK reward</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(post.id)}
                      className={`hover:scale-110 transition-transform ${
                        post.isLiked ? "text-red-500" : "text-gray-600"
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPost(selectedPost === post.id ? null : post.id)}
                      className="text-gray-600 hover:scale-110 transition-transform"
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(post.id)}
                      className="text-gray-600 hover:scale-110 transition-transform"
                    >
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                </div>

                {/* Comments Section */}
                {selectedPost === post.id && (
                  <div className="space-y-3 pt-3 border-t animate-in slide-in-from-top-2">
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 flex gap-2">
                        <Input
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="text-sm"
                          onKeyPress={(e) => e.key === "Enter" && handleComment(post.id)}
                        />
                        <Button size="sm" onClick={() => handleComment(post.id)} disabled={!newComment.trim()}>
                          <Send className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {comments[post.id]?.map((comment) => (
                      <div key={comment.id} className="flex gap-3 animate-in slide-in-from-left-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={comment.user.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm">{comment.user.name}</span>
                              <span className="text-xs text-gray-500">{formatRelativeTime(comment.timestamp)}</span>
                            </div>
                            <p className="text-sm">{comment.content}</p>
                          </div>
                          <div className="flex items-center gap-4 mt-1 ml-3">
                            <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-auto p-0">
                              <Heart className="w-3 h-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs text-gray-500 h-auto p-0">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
