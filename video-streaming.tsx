"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  X,
  Video,
  Camera,
  Eye,
  Heart,
  MessageCircle,
  Sparkles,
  Crown,
  Flame,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
} from "lucide-react"
import { LiveChat } from "./live-chat"
import { ARFilters } from "./ar-filters"

interface VideoStreamingProps {
  isOpen: boolean
  onClose: () => void
  city: string
}

export function VideoStreaming({ isOpen, onClose, city }: VideoStreamingProps) {
  const [activeTab, setActiveTab] = useState("camera")
  const [isStreaming, setIsStreaming] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [viewers, setViewers] = useState(0)
  const [likes, setLikes] = useState(0)
  const [comments, setComments] = useState(0)
  const [streamTitle, setStreamTitle] = useState("")
  const [streamDescription, setStreamDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("football")
  const [showARFilters, setShowARFilters] = useState(false)
  const [currentARFilter, setCurrentARFilter] = useState<any>(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [micEnabled, setMicEnabled] = useState(true)
  const [cameraQuality, setCameraQuality] = useState("HD")

  useEffect(() => {
    if (isStreaming) {
      const interval = setInterval(() => {
        setViewers((prev) => prev + Math.floor(Math.random() * 5))
        setLikes((prev) => prev + Math.floor(Math.random() * 3))
        setComments((prev) => prev + Math.floor(Math.random() * 2))
      }, 3000)
      return () => clearInterval(interval)
    }
  }, [isStreaming])

  const startStream = () => {
    setIsStreaming(true)
    setViewers(Math.floor(Math.random() * 50) + 10)
  }

  const stopStream = () => {
    setIsStreaming(false)
    setViewers(0)
    setLikes(0)
    setComments(0)
  }

  const handleARFilterSelect = (filter: any) => {
    setCurrentARFilter(filter)
    setShowARFilters(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-red-600 via-pink-600 to-purple-600 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Video className="w-6 h-6" />
              Live Streaming Studio
              {isStreaming && <Badge className="bg-red-500 text-white animate-pulse ml-2">LIVE</Badge>}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          {isStreaming && (
            <div className="flex items-center gap-6 text-sm animate-fade-in">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{viewers} Zuschauer</span>
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                <span>{likes} Likes</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{comments} Kommentare</span>
              </div>
            </div>
          )}
        </CardHeader>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
                <TabsTrigger value="camera">Kamera</TabsTrigger>
                <TabsTrigger value="effects">Effekte</TabsTrigger>
                <TabsTrigger value="settings">Einstellungen</TabsTrigger>
              </TabsList>

              <TabsContent value="camera" className="flex-1 p-4">
                <div className="h-full bg-black rounded-lg relative overflow-hidden">
                  {/* Camera Preview */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Camera className="w-20 h-20 mx-auto mb-4 animate-pulse" />
                        <p className="text-xl font-medium">Live Kamera Feed</p>
                        <p className="text-sm opacity-75">
                          {city} - {selectedCategory}
                        </p>
                        {currentARFilter && (
                          <div className="flex items-center justify-center gap-2 mt-2">
                            {currentARFilter.icon}
                            <span className="text-sm">{currentARFilter.name}</span>
                            <Badge className="bg-purple-500 animate-bounce">AR</Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AR Filter Overlay */}
                    {currentARFilter && (
                      <div className="absolute inset-0 pointer-events-none">
                        {currentARFilter.id === "bonk-crown" && (
                          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
                            <Crown className="w-24 h-24 text-yellow-400 animate-pulse drop-shadow-2xl" />
                            <div className="absolute inset-0 animate-ping">
                              <Crown className="w-24 h-24 text-yellow-300 opacity-30" />
                            </div>
                          </div>
                        )}
                        {currentARFilter.id === "fire-eyes" && (
                          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 flex gap-12">
                            <Flame className="w-12 h-12 text-red-500 animate-bounce" />
                            <Flame className="w-12 h-12 text-orange-500 animate-bounce delay-100" />
                          </div>
                        )}
                        {currentARFilter.id === "sparkle-overlay" && (
                          <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => (
                              <Sparkles
                                key={i}
                                className={`absolute w-6 h-6 text-pink-400 animate-ping`}
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                  animationDelay: `${Math.random() * 2}s`,
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stream Controls */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className="bg-black/50 border-white/20 text-white hover:bg-white/20"
                      >
                        {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setMicEnabled(!micEnabled)}
                        className="bg-black/50 border-white/20 text-white hover:bg-white/20"
                      >
                        {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      </Button>

                      <Button
                        onClick={() => setShowARFilters(true)}
                        className="bg-purple-600 hover:bg-purple-700 animate-pulse"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        AR Filter
                      </Button>

                      <Button
                        onClick={isStreaming ? stopStream : startStream}
                        className={`px-8 ${
                          isStreaming ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {isStreaming ? "Stream beenden" : "Stream starten"}
                      </Button>
                    </div>

                    {/* Quality Indicator */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white">
                        {cameraQuality} • {isStreaming ? "LIVE" : "BEREIT"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="effects" className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-4 h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">AR Filter</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {currentARFilter ? (
                        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg animate-fade-in">
                          {currentARFilter.icon}
                          <div>
                            <p className="font-medium">{currentARFilter.name}</p>
                            <p className="text-sm text-gray-500">Aktiver Filter</p>
                          </div>
                          <Button size="sm" variant="outline" onClick={() => setCurrentARFilter(null)}>
                            Entfernen
                          </Button>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Sparkles className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                          <p className="text-gray-500">Kein Filter aktiv</p>
                        </div>
                      )}

                      <Button
                        onClick={() => setShowARFilters(true)}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Filter auswählen
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Stream Effekte</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Hintergrund</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Kein Hintergrund</option>
                          <option>Stadion</option>
                          <option>Fußballplatz</option>
                          <option>BONK Logo</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Overlay</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Kein Overlay</option>
                          <option>Team Banner</option>
                          <option>Score Display</option>
                          <option>Chat Overlay</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Musik</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Keine Musik</option>
                          <option>Stadion Atmosphäre</option>
                          <option>Upbeat</option>
                          <option>Chill</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="flex-1 p-4">
                <div className="grid grid-cols-2 gap-6 h-full">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Stream Informationen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Stream Titel</label>
                        <Input
                          placeholder="z.B. Live aus dem Stadion"
                          value={streamTitle}
                          onChange={(e) => setStreamTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Beschreibung</label>
                        <Textarea
                          placeholder="Beschreibe deinen Stream..."
                          value={streamDescription}
                          onChange={(e) => setStreamDescription(e.target.value)}
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Kategorie</label>
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                          <option value="football">Fußball</option>
                          <option value="gaming">Gaming</option>
                          <option value="music">Musik</option>
                          <option value="talk">Talk</option>
                          <option value="sports">Sport</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Tags</label>
                        <Input placeholder="#bonk #football #live" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Technische Einstellungen</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Video Qualität</label>
                        <select
                          className="w-full p-2 border rounded-lg"
                          value={cameraQuality}
                          onChange={(e) => setCameraQuality(e.target.value)}
                        >
                          <option value="4K">4K (Ultra HD)</option>
                          <option value="HD">HD (1080p)</option>
                          <option value="SD">SD (720p)</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Bitrate</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>Auto</option>
                          <option>6000 kbps</option>
                          <option>4500 kbps</option>
                          <option>3000 kbps</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Audio Qualität</label>
                        <select className="w-full p-2 border rounded-lg">
                          <option>320 kbps</option>
                          <option>256 kbps</option>
                          <option>128 kbps</option>
                        </select>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Chat aktivieren</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Aufzeichnung</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Live Chat Sidebar */}
          {isStreaming && (
            <div className="w-80 border-l bg-gray-50">
              <LiveChat isOpen={true} onClose={() => {}} matchId="live-stream" embedded={true} />
            </div>
          )}
        </div>
      </Card>

      {/* AR Filters Modal */}
      {showARFilters && (
        <ARFilters
          isOpen={showARFilters}
          onClose={() => setShowARFilters(false)}
          onFilterSelect={handleARFilterSelect}
        />
      )}
    </div>
  )
}
