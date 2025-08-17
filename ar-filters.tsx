"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { X, Sparkles, Crown, Zap, Star, Coins, Heart, Flame, Shield, Trophy, Camera, Download } from "lucide-react"

interface ARFilter {
  id: string
  name: string
  category: "face" | "background" | "overlay" | "color"
  icon: React.ReactNode
  emoji: string
  isPremium: boolean
  bonkCost?: number
  description: string
  previewImage: string
}

interface ARFiltersProps {
  isOpen: boolean
  onClose: () => void
  onFilterSelect: (filter: ARFilter) => void
  activeFilter: string | null
}

export function ARFilters({ isOpen, onClose, onFilterSelect, activeFilter }: ARFiltersProps) {
  const [activeTab, setActiveTab] = useState("face")
  const [intensity, setIntensity] = useState([75])
  const [showPreview, setShowPreview] = useState(false)

  const arFilters: ARFilter[] = [
    // Face Filters
    {
      id: "bonk-crown",
      name: "BONK Crown",
      category: "face",
      icon: <Crown className="w-4 h-4" />,
      emoji: "👑",
      isPremium: true,
      bonkCost: 50,
      description: "Königliche BONK Krone für echte Champions",
      previewImage: "/placeholder.svg?height=100&width=100&text=Crown",
    },
    {
      id: "feuer-augen",
      name: "Feuer Augen",
      category: "face",
      icon: <Flame className="w-4 h-4" />,
      emoji: "🔥",
      isPremium: false,
      description: "Brennende Augen für intensive Momente",
      previewImage: "/placeholder.svg?height=100&width=100&text=Fire",
    },
    {
      id: "stern-glitzer",
      name: "Stern Glitzer",
      category: "face",
      icon: <Star className="w-4 h-4" />,
      emoji: "✨",
      isPremium: false,
      description: "Funkelnde Sterne um dein Gesicht",
      previewImage: "/placeholder.svg?height=100&width=100&text=Stars",
    },
    {
      id: "trophy-face",
      name: "Trophy Face",
      category: "face",
      icon: <Trophy className="w-4 h-4" />,
      emoji: "🏆",
      isPremium: true,
      bonkCost: 75,
      description: "Verwandle dich in eine lebende Trophäe",
      previewImage: "/placeholder.svg?height=100&width=100&text=Trophy",
    },
    {
      id: "lightning-eyes",
      name: "Lightning Eyes",
      category: "face",
      icon: <Zap className="w-4 h-4" />,
      emoji: "⚡",
      isPremium: false,
      description: "Elektrisierende Blitze aus den Augen",
      previewImage: "/placeholder.svg?height=100&width=100&text=Lightning",
    },

    // Background Filters
    {
      id: "stadium-bg",
      name: "Stadium Background",
      category: "background",
      icon: <Shield className="w-4 h-4" />,
      emoji: "🏟️",
      isPremium: true,
      bonkCost: 100,
      description: "Signal Iduna Park Hintergrund",
      previewImage: "/placeholder.svg?height=100&width=100&text=Stadium",
    },
    {
      id: "yellow-wall",
      name: "Yellow Wall",
      category: "background",
      icon: <Heart className="w-4 h-4" />,
      emoji: "💛",
      isPremium: false,
      description: "Südtribüne Atmosphäre",
      previewImage: "/placeholder.svg?height=100&width=100&text=YellowWall",
    },
    {
      id: "champions-league",
      name: "Champions League",
      category: "background",
      icon: <Star className="w-4 h-4" />,
      emoji: "🌟",
      isPremium: true,
      bonkCost: 150,
      description: "Champions League Sterne Hintergrund",
      previewImage: "/placeholder.svg?height=100&width=100&text=UCL",
    },

    // Overlay Filters
    {
      id: "bonk-regen",
      name: "BONK Regen",
      category: "overlay",
      icon: <Coins className="w-4 h-4" />,
      emoji: "🪙",
      isPremium: true,
      bonkCost: 25,
      description: "Fallende BONK Münzen",
      previewImage: "/placeholder.svg?height=100&width=100&text=Coins",
    },
    {
      id: "confetti",
      name: "Confetti Celebration",
      category: "overlay",
      icon: <Sparkles className="w-4 h-4" />,
      emoji: "🎉",
      isPremium: false,
      description: "Konfetti für Siegesfeiern",
      previewImage: "/placeholder.svg?height=100&width=100&text=Confetti",
    },
    {
      id: "goal-explosion",
      name: "Goal Explosion",
      category: "overlay",
      icon: <Flame className="w-4 h-4" />,
      emoji: "💥",
      isPremium: true,
      bonkCost: 80,
      description: "Explosive Tor-Effekte",
      previewImage: "/placeholder.svg?height=100&width=100&text=Explosion",
    },

    // Color Filters
    {
      id: "bvb-colors",
      name: "BVB Colors",
      category: "color",
      icon: <Heart className="w-4 h-4" />,
      emoji: "💛🖤",
      isPremium: false,
      description: "Schwarz-gelbe Farbfilter",
      previewImage: "/placeholder.svg?height=100&width=100&text=BVB",
    },
    {
      id: "vintage-sepia",
      name: "Vintage Sepia",
      category: "color",
      icon: <Camera className="w-4 h-4" />,
      emoji: "📸",
      isPremium: false,
      description: "Nostalgischer Sepia-Look",
      previewImage: "/placeholder.svg?height=100&width=100&text=Vintage",
    },
    {
      id: "neon-glow",
      name: "Neon Glow",
      category: "color",
      icon: <Zap className="w-4 h-4" />,
      emoji: "🌈",
      isPremium: true,
      bonkCost: 60,
      description: "Leuchtende Neon-Effekte",
      previewImage: "/placeholder.svg?height=100&width=100&text=Neon",
    },
  ]

  const getFiltersByCategory = (category: string) => {
    return arFilters.filter((filter) => filter.category === category)
  }

  const handleFilterSelect = (filter: ARFilter) => {
    if (filter.isPremium && filter.bonkCost) {
      // Check if user has enough BONK tokens
      // For now, just proceed
    }
    onFilterSelect(filter)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-60 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 animate-spin" />
              AR Filter Studio
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="text-white hover:bg-white/20"
              >
                <Camera className="w-4 h-4 mr-2" />
                {showPreview ? "Hide" : "Preview"}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Intensity Slider */}
          <div className="mt-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Filter Intensity:</span>
              <div className="flex-1 max-w-xs">
                <Slider value={intensity} onValueChange={setIntensity} max={100} step={1} className="w-full" />
              </div>
              <span className="text-sm font-medium">{intensity[0]}%</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-140px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 m-4 mb-0">
              <TabsTrigger value="face" className="flex items-center gap-2">
                <span className="text-lg">😊</span>
                Face
              </TabsTrigger>
              <TabsTrigger value="background" className="flex items-center gap-2">
                <span className="text-lg">🏟️</span>
                Background
              </TabsTrigger>
              <TabsTrigger value="overlay" className="flex items-center gap-2">
                <span className="text-lg">✨</span>
                Overlay
              </TabsTrigger>
              <TabsTrigger value="color" className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                Color
              </TabsTrigger>
            </TabsList>

            {["face", "background", "overlay", "color"].map((category) => (
              <TabsContent key={category} value={category} className="p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {getFiltersByCategory(category).map((filter) => (
                    <Card
                      key={filter.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        activeFilter === filter.name ? "ring-2 ring-purple-500 bg-purple-50" : "hover:bg-gray-50"
                      } ${filter.isPremium ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-50" : ""}`}
                      onClick={() => handleFilterSelect(filter)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="relative mb-3">
                          <img
                            src={filter.previewImage || "/placeholder.svg"}
                            alt={filter.name}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <div className="absolute top-2 right-2 text-2xl animate-bounce">{filter.emoji}</div>
                          {filter.isPremium && (
                            <div className="absolute top-2 left-2">
                              <Badge className="bg-yellow-500 text-black text-xs">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            </div>
                          )}
                        </div>

                        <h3 className="font-semibold text-sm mb-1">{filter.name}</h3>
                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">{filter.description}</p>

                        {filter.isPremium && filter.bonkCost && (
                          <div className="flex items-center justify-center gap-1 text-orange-600 text-xs mb-2">
                            <Coins className="w-3 h-3" />
                            <span>{filter.bonkCost} BONK</span>
                          </div>
                        )}

                        <div className="flex items-center justify-center gap-2">
                          {filter.icon}
                          <span className="text-xs font-medium">
                            {activeFilter === filter.name ? "Active" : "Select"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Category Info */}
                <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    {category === "face" && "Face Filters - Transform your appearance"}
                    {category === "background" && "Background Filters - Change your environment"}
                    {category === "overlay" && "Overlay Effects - Add dynamic elements"}
                    {category === "color" && "Color Filters - Enhance your mood"}
                  </h4>
                  <p className="text-sm text-purple-700">
                    {category === "face" &&
                      "Add magical effects to your face and expressions. Perfect for celebrations and reactions!"}
                    {category === "background" &&
                      "Transport yourself to iconic football stadiums and locations around the world."}
                    {category === "overlay" &&
                      "Add animated elements that react to your movements and the game action."}
                    {category === "color" &&
                      "Apply cinematic color grading to match your team colors or create artistic effects."}
                  </p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>

        {/* Bottom Action Bar */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Save Filter
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                <Camera className="w-4 h-4" />
                Take Photo
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              {activeFilter ? `Active: ${activeFilter}` : "No filter selected"}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
