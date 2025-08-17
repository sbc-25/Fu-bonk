"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Send, Gift, Users, MessageCircle, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LiveChatProps {
  isOpen: boolean
  onClose: () => void
  chatType: "match" | "general" | "stadium"
  title: string
  city: string
}

interface ChatMessage {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  type: "message" | "system" | "reward" | "reaction"
  bonkAmount?: number
  isVip?: boolean
  reactions?: string[]
}

const emojis = ["⚽", "🔥", "💛", "🖤", "🎉", "😍", "💪", "👏", "🚀", "⭐"]

export function LiveChat({ isOpen, onClose, chatType, title, city }: LiveChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [onlineUsers, setOnlineUsers] = useState(1247)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Mock initial messages
  const initialMessages: ChatMessage[] = [
    {
      id: "1",
      user: "BVB_Fan_2023",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "HAALAND IS ON FIRE! 🔥⚽",
      timestamp: new Date(Date.now() - 300000),
      type: "message",
      isVip: true,
    },
    {
      id: "2",
      user: "YellowWall_Official",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "The atmosphere is incredible tonight! 💛🖤",
      timestamp: new Date(Date.now() - 240000),
      type: "message",
      reactions: ["⚽", "🔥", "💛"],
    },
    {
      id: "3",
      user: "System",
      avatar: "",
      message: "GoalMaster_99 earned 50 BONK for predicting the goal!",
      timestamp: new Date(Date.now() - 180000),
      type: "reward",
      bonkAmount: 50,
    },
    {
      id: "4",
      user: "FootballKing",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "This is why I love football! Pure magic! ✨",
      timestamp: new Date(Date.now() - 120000),
      type: "message",
    },
    {
      id: "5",
      user: "Stadium_Scout",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Signal Iduna Park is rocking tonight! 🏟️",
      timestamp: new Date(Date.now() - 60000),
      type: "message",
      isVip: true,
    },
  ]

  useEffect(() => {
    setMessages(initialMessages)
  }, [])

  useEffect(() => {
    // Simulate live messages
    const interval = setInterval(() => {
      const randomMessages = [
        "GOAL! GOAL! GOAL! 🥅⚽",
        "What a save by the keeper! 🧤",
        "The crowd is going wild! 🎉",
        "This match is incredible! 🔥",
        "BONK to the moon! 🚀",
        "Yellow Wall never stops singing! 💛",
        "Best atmosphere in football! ⚽",
        "Earning BONK while watching! 💰",
      ]

      const randomUsers = [
        "FootballFan_123",
        "BVB_Supporter",
        "GoalHunter",
        "StadiumLover",
        "BONKCollector",
        "YellowArmy",
        "MatchWatcher",
        "CryptoFootball",
      ]

      if (Math.random() > 0.3) {
        const newMsg: ChatMessage = {
          id: Date.now().toString(),
          user: randomUsers[Math.floor(Math.random() * randomUsers.length)],
          avatar: "/placeholder.svg?height=32&width=32",
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          type: "message",
          isVip: Math.random() > 0.8,
        }

        setMessages((prev) => [...prev.slice(-50), newMsg])
        setOnlineUsers((prev) => prev + Math.floor(Math.random() * 3) - 1)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim()) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      message: newMessage,
      timestamp: new Date(),
      type: "message",
      isVip: false,
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate earning BONK for chatting
    toast({
      title: "Message sent! 💬",
      description: "+2 BONK earned for participating!",
    })
  }

  const addEmoji = (emoji: string) => {
    setNewMessage((prev) => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[80vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{onlineUsers.toLocaleString()} online</span>
            </div>
            <Badge className="bg-white/20 text-white">📍 {city}</Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  {msg.type !== "system" && msg.type !== "reward" && (
                    <Avatar className="w-8 h-8 flex-shrink-0">
                      <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">{msg.user[0]}</AvatarFallback>
                    </Avatar>
                  )}

                  <div className="flex-1 min-w-0">
                    {msg.type === "system" || msg.type === "reward" ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2">
                        <div className="flex items-center gap-2">
                          {msg.type === "reward" && <Gift className="w-4 h-4 text-green-600" />}
                          <span className="text-sm text-green-800">{msg.message}</span>
                          {msg.bonkAmount && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs">+{msg.bonkAmount} BONK</Badge>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-sm font-semibold ${
                              msg.user === "You" ? "text-blue-600" : "text-gray-800"
                            }`}
                          >
                            {msg.user}
                          </span>
                          {msg.isVip && <Badge className="bg-purple-100 text-purple-800 text-xs">VIP</Badge>}
                          <span className="text-xs text-gray-500">{formatTime(msg.timestamp)}</span>
                        </div>
                        <p className="text-sm text-gray-700 break-words">{msg.message}</p>
                        {msg.reactions && msg.reactions.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {msg.reactions.map((reaction, index) => (
                              <span key={index} className="text-sm">
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="border-t bg-gray-50 p-3">
              <div className="grid grid-cols-5 gap-2">
                {emojis.map((emoji, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    onClick={() => addEmoji(emoji)}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Message Input */}
          <div className="border-t p-4 flex-shrink-0">
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="flex-shrink-0"
              >
                <Smile className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={!newMessage.trim()}
                className="flex-shrink-0 bg-blue-500 hover:bg-blue-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span>Earn BONK for chatting! 💰</span>
              <span>Press Enter to send</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
