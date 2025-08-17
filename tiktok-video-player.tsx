"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  ChevronDown,
  Coins,
  Sparkles,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface VideoData {
  id: string
  title: string
  description: string
  creator: string
  creatorAvatar: string
  thumbnail: string
  likes: number
  comments: number
  shares: number
  isLive: boolean
  stadium?: string
  location: string
  duration: string
  bonkReward: number
  isLiked: boolean
  isBookmarked: boolean
  hashtags: string[]
  hasARFilter?: boolean
  arFilterName?: string
}

interface TikTokVideoPlayerProps {
  videos: VideoData[]
  currentIndex: number
  onVideoChange: (index: number) => void
  onClose: () => void
}

export function TikTokVideoPlayer({ videos, currentIndex, onVideoChange, onClose }: TikTokVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const { toast } = useToast()

  const currentVideo = videos[currentIndex]

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100
      setProgress(progress)
    }

    video.addEventListener("timeupdate", updateProgress)
    return () => video.removeEventListener("timeupdate", updateProgress)
  }, [currentIndex])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowControls(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [showControls])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return

    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleLike = () => {
    const updatedVideos = [...videos]
    updatedVideos[currentIndex] = {
      ...currentVideo,
      isLiked: !currentVideo.isLiked,
      likes: currentVideo.isLiked ? currentVideo.likes - 1 : currentVideo.likes + 1,
    }

    if (!currentVideo.isLiked) {
      toast({
        title: "Liked! 💖",
        description: `+${currentVideo.bonkReward} BONK earned!`,
      })
    }
  }

  const handleBookmark = () => {
    const updatedVideos = [...videos]
    updatedVideos[currentIndex] = {
      ...currentVideo,
      isBookmarked: !currentVideo.isBookmarked,
    }

    toast({
      title: currentVideo.isBookmarked ? "Removed from bookmarks" : "Bookmarked! 📚",
      description: currentVideo.isBookmarked ? "" : "Video saved to your collection",
    })
  }

  const handleShare = () => {
    toast({
      title: "Shared! 🚀",
      description: `+${Math.floor(currentVideo.bonkReward / 2)} BONK earned for sharing!`,
    })
  }

  const nextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length
    onVideoChange(nextIndex)
  }

  const prevVideo = () => {
    const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
    onVideoChange(prevIndex)
  }

  const handleVideoClick = () => {
    setShowControls(true)
    togglePlay()
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Video Container */}
      <div className="relative w-full max-w-md h-full bg-black overflow-hidden">
        {/* Close Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 left-4 z-20 text-white hover:bg-white/20"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Video */}
        <div className="relative w-full h-full" onClick={handleVideoClick}>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={currentVideo.thumbnail}
            autoPlay
            loop
            muted={isMuted}
            playsInline
          >
            <source src="/placeholder-video.mp4" type="video/mp4" />
          </video>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
            <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
          </div>

          {/* Play/Pause Overlay */}
          {showControls && (
            <div className="absolute inset-0 flex items-center justify-center">
              {!isPlaying && (
                <div className="w-20 h-20 bg-black/50 rounded-full flex items-center justify-center">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
              )}
            </div>
          )}

          {/* Live Badge */}
          {currentVideo.isLive && (
            <Badge className="absolute top-4 right-4 bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
          )}

          {/* AR Filter Badge */}
          {currentVideo.hasARFilter && (
            <Badge className="absolute top-16 right-4 bg-purple-500 text-white">
              <Sparkles className="w-3 h-3 mr-1" />
              {currentVideo.arFilterName}
            </Badge>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-4">
          {/* Creator Avatar */}
          <div className="relative">
            <Avatar className="w-12 h-12 border-2 border-white">
              <AvatarImage src={currentVideo.creatorAvatar || "/placeholder.svg"} />
              <AvatarFallback>{currentVideo.creator[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">+</span>
            </div>
          </div>

          {/* Like Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`w-12 h-12 rounded-full ${
                currentVideo.isLiked ? "text-red-500" : "text-white"
              } hover:bg-white/20`}
            >
              <Heart className={`w-6 h-6 ${currentVideo.isLiked ? "fill-current" : ""}`} />
            </Button>
            <span className="text-white text-xs font-semibold">{currentVideo.likes.toLocaleString()}</span>
          </div>

          {/* Comment Button */}
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="sm" className="w-12 h-12 rounded-full text-white hover:bg-white/20">
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-semibold">{currentVideo.comments.toLocaleString()}</span>
          </div>

          {/* Bookmark Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`w-12 h-12 rounded-full ${
                currentVideo.isBookmarked ? "text-yellow-500" : "text-white"
              } hover:bg-white/20`}
            >
              <Bookmark className={`w-6 h-6 ${currentVideo.isBookmarked ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Share Button */}
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="w-12 h-12 rounded-full text-white hover:bg-white/20"
            >
              <Share2 className="w-6 h-6" />
            </Button>
            <span className="text-white text-xs font-semibold">{currentVideo.shares.toLocaleString()}</span>
          </div>

          {/* More Options */}
          <Button variant="ghost" size="sm" className="w-12 h-12 rounded-full text-white hover:bg-white/20">
            <MoreHorizontal className="w-6 h-6" />
          </Button>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-0 left-0 right-16 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">@{currentVideo.creator}</span>
              {currentVideo.stadium && (
                <Badge variant="secondary" className="text-xs">
                  📍 {currentVideo.stadium}
                </Badge>
              )}
            </div>

            <p className="text-white text-sm line-clamp-2">{currentVideo.description}</p>

            <div className="flex flex-wrap gap-1">
              {currentVideo.hashtags.map((tag, index) => (
                <span key={index} className="text-blue-300 text-sm">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 text-white text-sm">
              <span>📍 {currentVideo.location}</span>
              <span>⏱️ {currentVideo.duration}</span>
              <div className="flex items-center gap-1">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">+{currentVideo.bonkReward} BONK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevVideo}
            className="w-8 h-8 rounded-full text-white hover:bg-white/20"
          >
            <ChevronUp className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextVideo}
            className="w-8 h-8 rounded-full text-white hover:bg-white/20"
          >
            <ChevronDown className="w-5 h-5" />
          </Button>
        </div>

        {/* Volume Control */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="absolute top-4 right-16 text-white hover:bg-white/20"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>

        {/* Video Counter */}
        <div className="absolute top-4 right-4 text-white text-sm bg-black/50 px-2 py-1 rounded">
          {currentIndex + 1} / {videos.length}
        </div>
      </div>
    </div>
  )
}
