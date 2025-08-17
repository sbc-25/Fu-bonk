"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, Send, Smile, Gift, X, Heart, Flame, Crown } from 'lucide-react'
import { useState, useEffect, useRef } from "react"

interface LiveChatProps {
  isOpen: boolean
  onClose: () => void
  chatType: "match" | "general" | "nft"
  title: string
  city: string
}

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  type: "message" | "system" | "gift" | "reaction"
  badges?: string[]
  reactions?: { emoji: string; count: number }[]
}

export function LiveChat({ isOpen, onClose, chatType, title, city }: LiveChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [onlineUsers, setOnlineUsers] = useState(1247)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const initialMessages: ChatMessage[] = [
    {
      id: "1",
      user: "BVBFan2024",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "HAALAND!!! What a goal! 🔥⚽",
      timestamp: new Date(Date.now() - 300000),
      type: "message",
      badges: ["VIP", "Streak 7"],
      reactions: [{ emoji: "🔥", count: 12 }, { emoji: "⚽", count: 8 }]
    },
    {
      id: "2",
      user: "YellowWallLegend",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "The atmosphere is INSANE! You can feel it through the screen! 💛🖤",
      timestamp: new Date(Date.now() - 240000),
      type: "message",
      badges: ["Verified", "OG Fan"],
      reactions: [{ emoji: "💛", count: 15 }, { emoji: "🖤", count: 10 }]
    },
    {
      id: "3",
      user: "System",
      avatar: "",
      message: "🎁 BVBFan2024 sent a BONK gift to the chat!",
      timestamp: new Date(Date.now() - 180000),
      type: "gift"
    },
    {
      id: "4",
      user: "FootballQueen",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "This is why I love football! Pure passion! ❤️",
      timestamp: new Date(Date.now() - 120000),
      type: "message",
      badges: ["Creator"],
      reactions: [{ emoji: "❤️", count: 20 }]
    },
    {
      id: "5",
      user: "BonkCollector",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Just minted an NFT of this moment! 🎨✨",
      timestamp: new Date(Date.now() - 60000),
      type: "message",
      badges: ["NFT Artist"],
      reactions: [{ emoji: "🎨", count: 7 }, { emoji: "✨", count: 5 }]
    }
  ]

  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    // Simulate new messages
    const interval = setInterval(() => {
      const randomMessages = [
        "Incredible match! 🏆",
        "BONK to the moon! 🚀",
        "Best fans in the world! 💛",
        "What a save by the keeper! 🥅",
        "This NFT collection is fire! 🔥",
        "Love this community! ❤️"
      ]
      
      const randomUsers = ["FootballFan123", "BonkLover", "NFTCollector", "StadiumVibes", "SoccerKing"]
      
      if (Math.random() > 0.7) {
        const newMessage: ChatMessage = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          avatar: "/placeholder.svg?height=32&width=32",
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          type: "message",
          badges: Math.random() > 0.5 ? ["Fan"] : undefined
        }
        
        setMessages(prev => [...prev, newMessage])
        setOnlineUsers(prev => prev + Math.floor(Math.random() * 3 - 1))
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const sendMessage = () => {
    if (!message.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      message: message.trim(),
      timestamp: new Date(),
      type: "message",
      badges: ["VIP"]
    }

    setMessages(prev => [...prev, newMessage])
    setMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "VIP": return "bg-purple-500 text-white"
      case "Verified": return "bg-blue-500 text-white"
      case "OG Fan": return "bg-yellow-500 text-black"
      case "Creator": return "bg-pink-500 text-white"
      case "NFT Artist": return "bg-green-500 text-white"
      default: return "bg-gray-500 text-white"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] p-0">
        <DialogHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-red-500" />
                {title}
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
                <span className="text-sm text-gray-600">{onlineUsers.toLocaleString()} watching</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col h-[60vh]">
          {/* Chat Messages */}
          <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
            <div className="space-y-3 pb-4">
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-1">
                  {msg.type === "system" || msg.type === "gift" ? (
                    <div className="text-center">
                      <Badge className="bg-orange-100 text-orange-800 text-xs">
                        {msg.message}
                      </Badge>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{msg.user[0]}</AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-sm">{msg.user}</span>
                          {msg.badges?.map((badge, index) => (
                            <Badge key={index} className={`text-xs ${getBadgeColor(badge)}`}>
                              {badge}
                            </Badge>
                          ))}
                          <span className="text-xs text-gray-500">
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-800 break-words">{msg.message}</p>
                        
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {msg.reactions.map((reaction, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                className="h-6 px-2 text-xs hover:bg-gray-100"
                              >
                                {reaction.emoji} {reaction.count}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Quick Reactions */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex gap-2 justify-center">
              {["🔥", "⚽", "💛", "🖤", "❤️", "🚀", "🏆", "🎉"].map((emoji) => (
                <Button
                  key={emoji}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => {
                    const reactionMessage: ChatMessage = {
                      id: Date.now().toString(),
                      user: "You",
                      avatar: "/placeholder.svg?height=32&width=32",
                      message: emoji,
                      timestamp: new Date(),
                      type: "reaction"
                    }
                    setMessages(prev => [...prev, reactionMessage])
                  }}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
                maxLength={200}
              />
              <Button onClick={sendMessage} disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>{message.length}/200</span>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Smile className="w-3 h-3 mr-1" />
                  Emoji
                </Button>
                <Button variant="ghost" size="sm" className="h-6 px-2">
                  <Gift className="w-3 h-3 mr-1" />
                  Gift
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
