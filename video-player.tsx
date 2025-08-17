"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Pause,
  Search,
  Upload,
  Heart,
  MessageCircle,
  Share,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
} from "lucide-react"

interface VideoPlayerProps {
  isOpen: boolean
  onClose: () => void
  videoType: "feed" | "live"
}

export function VideoPlayer({ isOpen, onClose, videoType }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const videos = [
    {
      id: 1,
      title: "Haaland Tor vs Bayern",
      creator: "BVBHighlights",
      location: "Dortmund",
      duration: "0:45",
      likes: 1250,
      comments: 89,
      isLive: videoType === "live",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 2,
      title: "Südtribüne Choreo",
      creator: "YellowWall",
      location: "Signal Iduna Park",
      duration: "1:20",
      likes: 890,
      comments: 156,
      isLive: videoType === "live",
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
    {
      id: 3,
      title: "Reus Freistoß Training",
      creator: "BVBTraining",
      location: "Trainingsgelände",
      duration: "0:30",
      likes: 567,
      comments: 43,
      isLive: false,
      thumbnail: "/placeholder.svg?height=400&width=300",
    },
  ]

  const currentVideo = videos[currentVideoIndex]

  const handleNextVideo = () => {
    if (videoType === "live") {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length)
    }
  }

  const handlePrevVideo = () => {
    if (videoType === "live") {
      setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Badge variant="secondary" className="bg-orange-500 text-white">
            {videoType === "live" ? "LIVE" : "FEED"}
          </Badge>
          <Button variant="ghost" size="sm" className="text-white">
            <Upload className="w-5 h-5" />
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Videos suchen..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
        </div>
      </div>

      {/* Video Content */}
      <div className="relative h-full flex items-center justify-center">
        {videoType === "live" && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevVideo}
              className="absolute left-4 z-10 text-white hover:bg-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNextVideo}
              className="absolute right-4 z-10 text-white hover:bg-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </>
        )}

        <div className="relative w-full max-w-md mx-auto">
          <img
            src={currentVideo.thumbnail || "/placeholder.svg"}
            alt={currentVideo.title}
            className="w-full h-[600px] object-cover rounded-lg"
          />

          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8" />}
          </Button>

          {/* Video Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{currentVideo.creator[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{currentVideo.creator}</p>
                <div className="flex items-center gap-2 text-xs text-white/80">
                  <MapPin className="w-3 h-3" />
                  <span>{currentVideo.location}</span>
                  <Clock className="w-3 h-3 ml-2" />
                  <span>{currentVideo.duration}</span>
                </div>
              </div>
            </div>

            <h3 className="font-bold mb-3">{currentVideo.title}</h3>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Heart className="w-5 h-5 mr-1" />
                  {currentVideo.likes}
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <MessageCircle className="w-5 h-5 mr-1" />
                  {currentVideo.comments}
                </Button>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              {currentVideo.isLive && (
                <Badge variant="destructive" className="bg-red-500">
                  🔴 LIVE
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Auto-delete notice */}
      <div className="absolute bottom-4 left-4 right-4">
        <Card className="bg-black/50 border-white/20">
          <CardContent className="p-3">
            <p className="text-xs text-white/80 text-center">📅 Videos werden nach 48 Stunden automatisch gelöscht</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
