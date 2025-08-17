"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Coins, Users, Globe, MapPin, X } from "lucide-react"
import { BonkPayment } from "./bonk-payment"
import { walletService } from "@/lib/wallet"

interface ChatModalProps {
  isOpen: boolean
  onClose: () => void
  chatType: "global" | "local" | "match"
  title: string
}

export function ChatModal({ isOpen, onClose, chatType, title }: ChatModalProps) {
  const [message, setMessage] = useState("")
  const [bonkBalance, setBonkBalance] = useState(1250)
  const [showPayment, setShowPayment] = useState(false)
  const wallet = walletService.getWallet()

  const messages = [
    { id: 1, user: "BVBFan2024", message: "Haaland wird heute treffen! 🔥", timestamp: "14:32", cost: 1 },
    { id: 2, user: "DortmundLegend", message: "Die Atmosphäre ist unglaublich!", timestamp: "14:35", cost: 1 },
    { id: 3, user: "YellowWall", message: "BONK to the moon! 🚀", timestamp: "14:38", cost: 1 },
    { id: 4, user: "NFTCollector", message: "Wer hat das neue Reus NFT?", timestamp: "14:40", cost: 1 },
  ]

  const handleSendMessage = () => {
    if (message.trim()) {
      if (!wallet?.publicKey) {
        // Show wallet connection required
        return
      }

      if (bonkBalance >= 1) {
        // In a real app, this would trigger a BONK payment
        setShowPayment(true)
      }
    }
  }

  const handlePaymentSuccess = (signature: string) => {
    setBonkBalance((prev) => prev - 1)
    setMessage("")
    setShowPayment(false)
    // Add message to chat
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              {chatType === "global" && <Globe className="w-5 h-5" />}
              {chatType === "local" && <MapPin className="w-5 h-5" />}
              {chatType === "match" && <Users className="w-5 h-5" />}
              {title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Coins className="w-3 h-3 mr-1" />
              {bonkBalance} BONK
            </Badge>
            <span className="text-white/80">1 BONK per message</span>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                    <AvatarFallback>{msg.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-800">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                      <Badge variant="outline" className="text-xs">
                        <Coins className="w-2 h-2 mr-1" />
                        {msg.cost}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Nachricht schreiben..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
                disabled={bonkBalance < 1}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || bonkBalance < 1 || !wallet?.publicKey}
                className="bg-orange-500 hover:bg-orange-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            {bonkBalance < 1 && <p className="text-xs text-red-500 mt-1">Nicht genug BONK für Nachrichten</p>}
          </div>
        </CardContent>
      </Card>
      <BonkPayment
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        recipient="CHAT_TREASURY_ADDRESS" // Replace with actual treasury address
        amount={1}
        purpose="Chat message fee"
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
