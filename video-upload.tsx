"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Upload, Video, Coins } from "lucide-react"

interface VideoUploadProps {
  isOpen: boolean
  onClose: () => void
  onReturnHome?: () => void
}

interface UploadedVideo {
  id: string
  title: string
  description: string
  thumbnail: string
  duration: string
  size: string
  status: "uploading" | "processing" | "ready" | "failed"
  progress: number
  hashtags: string[]
  location?: string
  privacy: "public" | "private" | "friends"
  bonkReward: number
}

export function VideoUpload({ isOpen, onClose, onReturnHome }: VideoUploadProps) {
  const [activeTab, setActiveTab] = useState("upload")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [hashtags, setHashtags] = useState("")
  const [location, setLocation] = useState("")
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">("public")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Mock uploaded videos data
  const [uploadedVideos, setUploadedVideos] = useState<UploadedVideo[]>([
    {
      id: "1",
      title: "Mein erstes BONK Video! 🔥",
      description: "Check out my first video on the BONK platform! So excited to be here! 🎉",
      thumbnail: "/placeholder.svg?height=200&width=150",
      duration: "0:45",
      size: "12.5 MB",
      status: "ready",
      progress: 100,
      hashtags: ["FirstVideo", "BONK", "Excited", "NewUser"],
      location: "Dortmund, Germany",
      privacy: "public",
      bonkReward: 25,
    },
    {
      id: "2",
      title: "Stadium Atmosphere 🏟️",
      description: "The energy at Signal Iduna Park is incredible! Yellow Wall in action! 💛🖤",
      thumbnail: "/placeholder.svg?height=200&width=150",
      duration: "1:20",
      size: "28.3 MB",
      status: "processing",
      progress: 75,
      hashtags: ["Stadium", "YellowWall", "BVB", "Atmosphere"],
      location: "Signal Iduna Park, Dortmund",
      privacy: "public",
      bonkReward: 50,
    },
    {
      id: "3",
      title: "Training Session Highlights 💪",
      description: "Some clips from today's training session. Working hard for the next match!",
      thumbnail: "/placeholder.svg?height=200&width=150",
      duration: "2:15",
      size: "45.7 MB",
      status: "uploading",
      progress: 35,
      hashtags: ["Training", "Football", "Workout", "Dedication"],
      location: "BVB Training Ground",
      privacy: "friends",
      bonkReward: 40,
    },
  ])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) return

    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Add new video to uploaded videos
          const newVideo: UploadedVideo = {
            id: Date.now().toString(),
            title: title.trim(),
            description: description.trim(),
            thumbnail: "/placeholder.svg?height=200&width=150",
            duration: "1:30", // Mock duration
            size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
            status: "processing",
            progress: 0,
            hashtags: hashtags
              .split(" ")
              .filter((tag) => tag.startsWith("#"))
              .map((tag) => tag.slice(1)),
            location: location.trim(),
            privacy,
            bonkReward: Math.floor(Math.random() * 50) + 10,
          }

          setUploadedVideos((prev) => [newVideo, ...prev])

          // Reset form
          setSelectedFile(null)
          setTitle("")
          setDescription("")
          setHashtags("")
          setLocation("")
          setActiveTab("my-videos")

          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  const getStatusColor = (status: UploadedVideo["status"]) => {
    switch (status) {
      case "uploading":
        return "bg-blue-500"
      case "processing":
        return "bg-yellow-500"
      case "ready":
        return "bg-green-500"
      case "failed":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: UploadedVideo["status"]) => {
    switch (status) {
      case "uploading":
        return <Video className="w-3 h-3 animate-spin" />
      case "processing":
        return <Video className="w-3 h-3 animate-spin" />
      case "ready":
        return <Video className="w-3 h-3" />
      case "failed":
        return <Video className="w-3 h-3" />
      default:
        return null
    }
  }

  const suggestedHashtags = [
    "#BVB",
    "#Football",
    "#Stadium",
    "#Goal",
    "#Epic",
    "#Fans",
    "#YellowWall",
    "#Training",
    "#Match",
    "#Celebration",
    "#Skills",
    "#Atmosphere",
    "#BONK",
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Video 📹
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {isUploading ? (
            <div className="text-center space-y-4">
              <Video className="w-16 h-16 text-purple-500 mx-auto animate-pulse" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Uploading Video...</h3>
                <Progress value={uploadProgress} className="w-full" />
                <p className="text-sm text-gray-500 mt-2">{uploadProgress}% complete</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-400">
                <div className="text-center">
                  <Video className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to select video</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <Input placeholder="Enter video title..." value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <Textarea
                    placeholder="Describe your video..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hashtags</label>
                  <Input
                    placeholder="#BVB #Football #Epic"
                    value={hashtags}
                    onChange={(e) => setHashtags(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-1 mt-2">
                    {suggestedHashtags.slice(0, 6).map((tag) => (
                      <Button
                        key={tag}
                        variant="outline"
                        size="sm"
                        className="text-xs h-6 px-2 bg-transparent"
                        onClick={() => {
                          if (!hashtags.includes(tag)) {
                            setHashtags((prev) => (prev ? `${prev} ${tag}` : tag))
                          }
                        }}
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Where was this filmed? 📍"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Privacy Settings</label>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={privacy === "public" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPrivacy("public")}
                      className="flex flex-col gap-1 h-12"
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-xs">Public</span>
                    </Button>
                    <Button
                      variant={privacy === "friends" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPrivacy("friends")}
                      className="flex flex-col gap-1 h-12"
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-xs">Friends</span>
                    </Button>
                    <Button
                      variant={privacy === "private" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPrivacy("private")}
                      className="flex flex-col gap-1 h-12"
                    >
                      <Video className="w-4 h-4" />
                      <span className="text-xs">Private</span>
                    </Button>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-orange-800">
                    <Coins className="w-4 h-4" />
                    <span className="text-sm font-medium">Earn 50 BONK for uploading!</span>
                  </div>
                </div>

                <Button
                  onClick={handleUpload}
                  disabled={!selectedFile || !title.trim() || isUploading}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Video
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
