"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Heart, Reply, MoreHorizontal, X, Coins, Smile, Gift } from "lucide-react"
import { InternalWalletService } from "@/lib/internal-wallet"
import { MembershipService } from "@/lib/membership"

interface VideoCommentsProps {
  isOpen: boolean
  onClose: () => void
  videoId: string
  videoTitle: string
}

interface Comment {
  id: string
  user: string
  avatar: string
  message: string
  timestamp: Date
  likes: number
  isLiked: boolean
  replies: Comment[]
  membership?: string
  bonkTip?: number
}

export function VideoComments({ isOpen, onClose, videoId, videoTitle }: VideoCommentsProps) {
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      user: "BVBFan2024",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Was für ein unglaubliches Tor! Haaland ist einfach der Beste! 🔥⚽",
      timestamp: new Date(Date.now() - 300000),
      likes: 23,
      isLiked: false,
      replies: [
        {
          id: "1-1",
          user: "YellowWall",
          avatar: "/placeholder.svg?height=32&width=32",
          message: "Absolut! Der Junge ist ein Phänomen!",
          timestamp: new Date(Date.now() - 240000),
          likes: 8,
          isLiked: true,
          replies: [],
          membership: "gold",
        },
      ],
      membership: "silver",
      bonkTip: 5,
    },
    {
      id: "2",
      user: "FootballKing",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Die Atmosphäre im Stadion war elektrisierend! 💛🖤",
      timestamp: new Date(Date.now() - 180000),
      likes: 15,
      isLiked: true,
      replies: [],
      membership: "diamond",
      bonkTip: 10,
    },
    {
      id: "3",
      user: "Supporter99",
      avatar: "/placeholder.svg?height=32&width=32",
      message: "Kann jemand das nochmal in Zeitlupe zeigen? 😍",
      timestamp: new Date(Date.now() - 120000),
      likes: 7,
      isLiked: false,
      replies: [],
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wallet = InternalWalletService.getWallet()
  const membership = MembershipService.getUserMembership()

  const commentCost = membership?.tier === "diamond" ? 0 : membership?.tier === "gold" ? 1 : 2

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [comments])

  const handleAddComment = () => {
    if (!newComment.trim() || !wallet || wallet.bonkBalance < commentCost) return

    const comment: Comment = {
      id: Date.now().toString(),
      user: "Du",
      avatar: "/placeholder.svg?height=32&width=32",
      message: newComment.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      membership: membership?.tier,
    }

    setComments((prev) => [...prev, comment])
    InternalWalletService.updateBalance(-commentCost)
    setNewComment("")

    // Simulate other users reacting
    setTimeout(() => {
      setComments((prev) =>
        prev.map((c) => (c.id === comment.id ? { ...c, likes: Math.floor(Math.random() * 5) + 1 } : c)),
      )
    }, 2000)
  }

  const handleAddReply = (parentId: string) => {
    if (!replyText.trim() || !wallet || wallet.bonkBalance < commentCost) return

    const reply: Comment = {
      id: `${parentId}-${Date.now()}`,
      user: "Du",
      avatar: "/placeholder.svg?height=32&width=32",
      message: replyText.trim(),
      timestamp: new Date(),
      likes: 0,
      isLiked: false,
      replies: [],
      membership: membership?.tier,
    }

    setComments((prev) =>
      prev.map((comment) => (comment.id === parentId ? { ...comment, replies: [...comment.replies, reply] } : comment)),
    )

    InternalWalletService.updateBalance(-commentCost)
    setReplyText("")
    setReplyingTo(null)
  }

  const handleLikeComment = (commentId: string, isReply = false, parentId?: string) => {
    if (isReply && parentId) {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId
                    ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
                    : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments((prev) =>
        prev.map((comment) =>
          comment.id === commentId
            ? { ...comment, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1, isLiked: !comment.isLiked }
            : comment,
        ),
      )
    }

    // Small BONK reward for liking
    if (wallet) {
      InternalWalletService.updateBalance(1)
    }
  }

  const getMembershipBadge = (membershipTier?: string) => {
    if (!membershipTier) return null

    const badges = {
      bronze: { icon: "🥉", color: "bg-amber-100 text-amber-800" },
      silver: { icon: "🥈", color: "bg-gray-100 text-gray-800" },
      gold: { icon: "🥇", color: "bg-yellow-100 text-yellow-800" },
      diamond: { icon: "💎", color: "bg-blue-100 text-blue-800" },
    }

    const badge = badges[membershipTier as keyof typeof badges]
    if (!badge) return null

    return <Badge className={`${badge.color} text-xs ml-2`}>{badge.icon}</Badge>
  }

  const renderComment = (comment: Comment, isReply = false, parentId?: string) => (
    <div key={comment.id} className={`${isReply ? "ml-8 border-l-2 border-gray-200 pl-4" : ""}`}>
      <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
        <Avatar className="w-8 h-8">
          <AvatarImage src={comment.avatar || "/placeholder.svg"} />
          <AvatarFallback>{comment.user[0]}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-gray-800">{comment.user}</span>
            {getMembershipBadge(comment.membership)}
            <span className="text-xs text-gray-500">
              {comment.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            {comment.bonkTip && (
              <Badge className="bg-orange-100 text-orange-800 text-xs">
                <Coins className="w-2 h-2 mr-1" />+{comment.bonkTip}
              </Badge>
            )}
          </div>

          <p className="text-sm text-gray-700 mb-2 break-words">{comment.message}</p>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs hover:bg-red-50"
              onClick={() => handleLikeComment(comment.id, isReply, parentId)}
            >
              <Heart className={`w-3 h-3 mr-1 ${comment.isLiked ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
              {comment.likes}
            </Button>

            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 px-2 text-xs hover:bg-blue-50"
                onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              >
                <Reply className="w-3 h-3 mr-1" />
                Antworten
              </Button>
            )}

            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-gray-100">
              <MoreHorizontal className="w-3 h-3" />
            </Button>
          </div>

          {replyingTo === comment.id && (
            <div className="mt-3 flex gap-2">
              <Input
                placeholder="Antwort schreiben..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddReply(comment.id)}
                className="text-sm"
              />
              <Button
                size="sm"
                onClick={() => handleAddReply(comment.id)}
                disabled={!replyText.trim() || !wallet || wallet.bonkBalance < commentCost}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {comment.replies.length > 0 && (
        <div className="mt-2">{comment.replies.map((reply) => renderComment(reply, true, comment.id))}</div>
      )}
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Kommentare</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-white/90 truncate">{videoTitle}</p>
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white">
              {comments.length + comments.reduce((sum, c) => sum + c.replies.length, 0)} Kommentare
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Coins className="w-3 h-3 mr-1" />
              {commentCost} BONK/Kommentar
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-2">
              {comments.map((comment) => renderComment(comment))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2 mb-2">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Smile className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Gift className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Kommentar schreiben..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddComment()}
                className="flex-1"
                disabled={!wallet || wallet.bonkBalance < commentCost}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || !wallet || wallet.bonkBalance < commentCost}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {!wallet && <p className="text-xs text-red-500 mt-1">Wallet erforderlich für Kommentare</p>}
            {wallet && wallet.bonkBalance < commentCost && (
              <p className="text-xs text-red-500 mt-1">Nicht genug BONK für Kommentare</p>
            )}
            {wallet && wallet.bonkBalance >= commentCost && (
              <p className="text-xs text-gray-500 mt-1">
                Verfügbar: {wallet.bonkBalance} BONK • Kosten: {commentCost} BONK
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
