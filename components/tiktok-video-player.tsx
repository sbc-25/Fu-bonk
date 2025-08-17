"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Heart, MessageCircle, Share2, Bookmark, X, Volume2, VolumeX, Coins, MapPin, Clock } from 'lucide-react'

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
  const [currentVideo, setCurrentVideo] = useState(videos[currentIndex])

  useEffect(() => {
    setCurrentVideo(videos[currentIndex])
  }, [currentIndex, videos])

  const handleLike = () => {
    setCurrentVideo(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  const handleBookmark = () => {
    setCurrentVideo(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked
    }))
  }

  const nextVideo = () => {
    const nextIndex = (currentIndex + 1) % videos.length
    onVideoChange(nextIndex)
  }

  const prevVideo = () => {
    const prevIndex = currentIndex === 0 ? videos.length - 1 : currentIndex - 1
    onVideoChange(prevIndex)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-sm h-[90vh] p-0 bg-black">
        <div className="relative h-full flex flex-col">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Video Container */}
          <div className="relative flex-1 bg-black">
            <img
              src={currentVideo.thumbnail || "/placeholder.svg"}
              alt={currentVideo.title}
              className="w-full h-full object-cover"
            />
            
            {/* Play/Pause Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <div className="bg-black/50 rounded-full p-4">
                  <Play className="w-8 h-8 text-white" />
                </div>
              )}
            </div>

            {/* Live Badge */}
            {currentVideo.isLive && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white animate-pulse">
                🔴 LIVE
              </Badge>
            )}

            {/* AR Filter Badge */}
            {currentVideo.hasARFilter && (
              <Badge className="absolute top-4 left-20 bg-purple-500 text-white">
                ✨ {currentVideo.arFilterName}
              </Badge>
            )}

            {/* BONK Reward */}
            <Badge className="absolute top-4 right-16 bg-orange-500 text-white animate-bounce">
              <Coins className="w-3 h-3 mr-1" />
              +{currentVideo.bonkReward}
            </Badge>

            {/* Video Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="text-white space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <img
                    src={currentVideo.creatorAvatar || "/placeholder.svg"}
                    alt={currentVideo.creator}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="font-semibold">{currentVideo.creator}</span>
                  {currentVideo.stadium && (
                    <>
                      <span>•</span>
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">{currentVideo.stadium}</span>
                    </>
                  )}
                </div>
                
                <h3 className="font-bold text-lg leading-tight">{currentVideo.title}</h3>
                
                <p className="text-sm opacity-90 line-clamp-2">{currentVideo.description}</p>
                
                <div className="flex flex-wrap gap-1">
                  {currentVideo.hashtags.map((tag, index) => (
                    <span key={index} className="text-xs text-blue-300">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{currentVideo.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{currentVideo.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex flex-col gap-1 text-white hover:bg-white/20 ${
                currentVideo.isLiked ? "text-red-500" : ""
              }`}
            >
              <Heart className={`w-6 h-6 ${currentVideo.isLiked ? "fill-current" : ""}`} />
              <span className="text-xs">{currentVideo.likes.toLocaleString()}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col gap-1 text-white hover:bg-white/20"
            >
              <MessageCircle className="w-6 h-6" />
              <span className="text-xs">{currentVideo.comments}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmark}
              className={`flex flex-col gap-1 text-white hover:bg-white/20 ${
                currentVideo.isBookmarked ? "text-yellow-500" : ""
              }`}
            >
              <Bookmark className={`w-6 h-6 ${currentVideo.isBookmarked ? "fill-current" : ""}`} />
              <span className="text-xs">Save</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col gap-1 text-white hover:bg-white/20"
            >
              <Share2 className="w-6 h-6" />
              <span className="text-xs">{currentVideo.shares}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="flex flex-col gap-1 text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
            </Button>
          </div>

          {/* Navigation */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevVideo}
              className="text-white hover:bg-white/20"
            >
              ↑
            </Button>
          </div>

          <div className="absolute left-4 bottom-1/2 transform translate-y-1/2">
            <Button
              variant="ghost"
              size="sm"
              onClick={nextVideo}
              className="text-white hover:bg-white/20"
            >
              ↓
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
