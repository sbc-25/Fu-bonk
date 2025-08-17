"use client"

import { Separator } from "@/components/ui/separator"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, X, Trophy, Coins, Volume2, VolumeX, Star, Timer } from "lucide-react"

interface LiveMintingCountdownProps {
  isOpen: boolean
  onClose: () => void
}

interface MintingEvent {
  id: string
  title: string
  description: string
  image: string
  endTime: Date
  totalSupply: number
  minted: number
  price: number
  creator: string
  rarity: "common" | "rare" | "epic" | "legendary"
  mintingSpeed: number // mints per minute
}

export function LiveMintingCountdown({ isOpen, onClose }: LiveMintingCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 2,
    minutes: 34,
    seconds: 15,
  })
  const [activeEvent, setActiveEvent] = useState<MintingEvent | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [recentMints, setRecentMints] = useState<number>(0)
  const [urgencyLevel, setUrgencyLevel] = useState<"low" | "medium" | "high">("low")
  const [participants, setParticipants] = useState(1247)

  // Mock data for the current minting event
  useEffect(() => {
    const event: MintingEvent = {
      id: "bundesliga-final-2024",
      title: "Bundesliga Final 2024 ⚽",
      description:
        "Exklusive NFT-Kollektion zum Bundesliga-Finale 2024. Limitierte Auflage mit besonderen Utility-Features!",
      image: "/placeholder.svg?height=300&width=400",
      endTime: new Date(Date.now() + 3600000 * 2.5), // 2.5 hours from now
      totalSupply: 1000,
      minted: 847,
      price: 500,
      creator: "Bundesliga Official ✓",
      rarity: "legendary",
      mintingSpeed: 12,
    }
    setActiveEvent(event)
  }, [])

  // Simulate live minting activity
  useEffect(() => {
    if (!activeEvent) return

    const mintingInterval = setInterval(() => {
      setActiveEvent((prev) => {
        if (!prev || prev.minted >= prev.totalSupply) return prev

        const newMinted = Math.min(prev.minted + Math.floor(Math.random() * 3) + 1, prev.totalSupply)
        const remaining = prev.totalSupply - newMinted

        // Update urgency level based on remaining supply
        if (remaining < 50) {
          setUrgencyLevel("high")
        } else if (remaining < 200) {
          setUrgencyLevel("medium")
        } else {
          setUrgencyLevel("low")
        }

        return { ...prev, minted: newMinted }
      })

      setRecentMints((prev) => prev + Math.floor(Math.random() * 2) + 1)
    }, 3000)

    return () => clearInterval(mintingInterval)
  }, [activeEvent])

  // Countdown timer
  useEffect(() => {
    if (!isOpen || !activeEvent) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })

      setParticipants((prev) => prev + Math.floor(Math.random() * 3))
    }, 1000)

    return () => clearInterval(timer)
  }, [isOpen, activeEvent])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white shadow-lg"
      case "epic":
        return "bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 text-white shadow-lg"
      case "rare":
        return "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-white shadow-lg"
      default:
        return "bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white shadow-lg"
    }
  }

  const getUrgencyStyle = () => {
    switch (urgencyLevel) {
      case "high":
        return "animate-pulse border-red-500 shadow-red-200"
      case "medium":
        return "border-orange-500 shadow-orange-200"
      default:
        return "border-gray-200"
    }
  }

  const formatTimeUnit = (unit: number) => {
    return unit.toString().padStart(2, "0")
  }

  if (!isOpen || !activeEvent) return null

  const mintingPercentage = (activeEvent.minted / activeEvent.totalSupply) * 100
  const remaining = activeEvent.totalSupply - activeEvent.minted
  const isAlmostSoldOut = remaining < 100

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className={`w-full max-w-md overflow-hidden border-2 ${getUrgencyStyle()} shadow-2xl`}>
        <CardHeader className={`${getRarityColor(activeEvent.rarity)} p-4 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="flex items-center justify-between relative z-10">
            <CardTitle className="flex items-center gap-2 text-white">
              <Timer className="w-5 h-5 animate-bounce" />
              Live Minting 🔥
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-white hover:bg-white/20"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
          {isAlmostSoldOut && (
            <div className="text-center mt-2">
              <Badge className="bg-red-500 text-white animate-pulse">🔥 FAST AUSVERKAUFT! 🔥</Badge>
            </div>
          )}
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* NFT Preview with Enhanced Visual */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <img
                src={activeEvent.image || "/placeholder.svg"}
                alt={activeEvent.title}
                className="w-full h-48 object-cover rounded-lg border-2 border-white shadow-lg"
              />
              <Badge
                className={`absolute top-3 right-3 ${
                  activeEvent.rarity === "legendary"
                    ? "bg-yellow-500 animate-pulse"
                    : activeEvent.rarity === "epic"
                      ? "bg-purple-500"
                      : activeEvent.rarity === "rare"
                        ? "bg-blue-500"
                        : "bg-gray-500"
                } text-white shadow-lg`}
              >
                <Star className="w-3 h-3 mr-1" />
                {activeEvent.rarity.toUpperCase()}
              </Badge>
              {urgencyLevel === "high" && (
                <div className="absolute top-3 left-3">
                  <Badge className="bg-red-500 text-white animate-bounce">🔥 HOT</Badge>
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Title and Description */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              {activeEvent.title}
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">{activeEvent.description}</p>
            <div className="flex items-center justify-center gap-2 mt-2 text-xs text-gray-500">
              <span>By</span>
              <span className="font-medium text-gray-700 flex items-center gap-1">{activeEvent.creator}</span>
            </div>
          </div>

          {/* Enhanced Countdown Timer */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border">
            <div className="flex items-center gap-2 mb-3 justify-center">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="font-medium text-gray-800">Minting endet in:</span>
            </div>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-orange-100">
                <div className={`text-3xl font-bold text-orange-600 ${timeLeft.hours < 1 ? "animate-pulse" : ""}`}>
                  {formatTimeUnit(timeLeft.hours)}
                </div>
                <div className="text-xs text-gray-500 font-medium">Stunden</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-orange-100">
                <div className={`text-3xl font-bold text-orange-600 ${timeLeft.minutes < 10 ? "animate-pulse" : ""}`}>
                  {formatTimeUnit(timeLeft.minutes)}
                </div>
                <div className="text-xs text-gray-500 font-medium">Minuten</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border-2 border-orange-100">
                <div className="text-3xl font-bold text-orange-600 animate-pulse">
                  {formatTimeUnit(timeLeft.seconds)}
                </div>
                <div className="text-xs text-gray-500 font-medium">Sekunden</div>
              </div>
            </div>
          </div>

          {/* Enhanced Minting Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">Minting Progress</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold">
                  {activeEvent.minted.toLocaleString()} / {activeEvent.totalSupply.toLocaleString()}
                </span>
                {recentMints > 0 && (
                  <Badge className="bg-green-100 text-green-800 text-xs animate-pulse">+{recentMints} neu</Badge>
                )}
              </div>
            </div>
            <div className="relative">{/* Placeholder for Progress component */}</div>
            <div className="flex justify-between text-xs">
              <span className={`${urgencyLevel === "high" ? "text-red-600 font-bold" : "text-gray-500"}`}>
                {mintingPercentage.toFixed(1)}% gemintet
              </span>
              <span className={`${urgencyLevel === "high" ? "text-red-600 font-bold animate-pulse" : "text-gray-500"}`}>
                {remaining.toLocaleString()} verbleibend
              </span>
            </div>
          </div>

          <Separator />

          {/* Enhanced Price and Action */}
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-xl border">
              <div>
                <div className="text-sm text-gray-600 mb-1">Mint Preis</div>
                <div className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-2xl text-orange-600">{activeEvent.price}</span>
                  <span className="text-orange-600 font-medium">BONK</span>
                </div>
                <div className="text-xs text-gray-500 mt-1">≈ ${(activeEvent.price * 0.001).toFixed(2)} USD</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600 mb-1">Mint Speed</div>
                <div className="text-lg font-bold text-green-600">{activeEvent.mintingSpeed}/min</div>
                <div className="text-xs text-gray-500">Live Rate</div>
              </div>
            </div>

            <Button
              className={`w-full h-12 text-lg font-bold ${
                urgencyLevel === "high"
                  ? "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 animate-pulse"
                  : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              } shadow-lg transform hover:scale-105 transition-all duration-200`}
            >
              <Trophy className="w-5 h-5 mr-2" />
              {urgencyLevel === "high" ? "JETZT MINTEN!" : "Mint Now"}
            </Button>
          </div>

          {/* Enhanced Live Activity */}
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-xl border border-orange-200">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Live Minting Activity</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="flex -space-x-2 overflow-hidden mb-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-300 to-yellow-300 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm"
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full bg-orange-100 border-2 border-white flex items-center justify-center text-xs font-medium text-orange-800">
                +{Math.floor(Math.random() * 50) + 20}
              </div>
            </div>
            <div className="text-xs text-orange-700 space-y-1">
              <div className="flex justify-between">
                <span>🔥 Letzte 5 Min:</span>
                <span className="font-bold">{Math.floor(Math.random() * 20) + 15} Mints</span>
              </div>
              <div className="flex justify-between">
                <span>⚡ Durchschnitt:</span>
                <span className="font-bold">{activeEvent.mintingSpeed} Mints/Min</span>
              </div>
            </div>
          </div>

          {/* Participants Badge */}
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-green-100 text-green-800">
              <Users className="w-3 h-3 mr-1" />
              {participants.toLocaleString()} waiting
            </Badge>
            <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
