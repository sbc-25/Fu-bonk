"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Upload, Camera, Wand2, Coins, X, Image, Video, Music, FileText } from 'lucide-react'
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface NFTMintingProps {
  isOpen: boolean
  onClose: () => void
}

export function NFTMinting({ isOpen, onClose }: NFTMintingProps) {
  const [nftTitle, setNftTitle] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [nftPrice, setNftPrice] = useState("")
  const [nftCategory, setNftCategory] = useState("")
  const [nftRarity, setNftRarity] = useState("")
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const categories = [
    { value: "moments", label: "Football Moments", icon: "⚽" },
    { value: "players", label: "Player Cards", icon: "👤" },
    { value: "stadiums", label: "Stadium Art", icon: "🏟️" },
    { value: "trophies", label: "Trophies", icon: "🏆" },
    { value: "fans", label: "Fan Art", icon: "🎨" },
    { value: "memes", label: "Football Memes", icon: "😂" }
  ]

  const rarities = [
    { value: "common", label: "Common", color: "bg-gray-500", price: "100-500" },
    { value: "rare", label: "Rare", color: "bg-blue-500", price: "500-1500" },
    { value: "epic", label: "Epic", color: "bg-purple-500", price: "1500-5000" },
    { value: "legendary", label: "Legendary", color: "bg-yellow-500", price: "5000+" }
  ]

  const templates = [
    {
      id: "1",
      name: "Goal Celebration",
      image: "/football-goal-celebration-template.png",
      category: "moments",
      description: "Perfect for capturing epic goal moments"
    },
    {
      id: "2",
      name: "Player Portrait",
      image: "/football-player-portrait-template.png",
      category: "players", 
      description: "Professional player card design"
    },
    {
      id: "3",
      name: "Stadium Atmosphere",
      image: "/placeholder.svg?height=200&width=200",
      category: "stadiums",
      description: "Capture the stadium energy"
    },
    {
      id: "4",
      name: "Trophy Showcase",
      image: "/placeholder.svg?height=200&width=200",
      category: "trophies",
      description: "Highlight championship moments"
    }
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      toast({
        title: "File uploaded! 📁",
        description: `${file.name} ready for minting`,
      })
    }
  }

  const handleMint = () => {
    if (!nftTitle || !nftDescription || !nftPrice || !nftCategory || !nftRarity) {
      toast({
        title: "Missing information ❌",
        description: "Please fill in all required fields",
      })
      return
    }

    const mintingCost = 50 // Base cost in BONK
    
    toast({
      title: "NFT Minted! 🎉",
      description: `"${nftTitle}" has been successfully minted for ${mintingCost} BONK!`,
    })

    // Reset form
    setNftTitle("")
    setNftDescription("")
    setNftPrice("")
    setNftCategory("")
    setNftRarity("")
    setUploadedFile(null)
  }

  const getFileTypeIcon = (file: File) => {
    if (file.type.startsWith('image/')) return <Image className="w-4 h-4" />
    if (file.type.startsWith('video/')) return <Video className="w-4 h-4" />
    if (file.type.startsWith('audio/')) return <Music className="w-4 h-4" />
    return <FileText className="w-4 h-4" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
              Create NFT
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="px-6">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="ai-generate">AI Generate</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6 pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Upload Section */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Upload Media</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors">
                          {uploadedFile ? (
                            <div className="space-y-3">
                              <div className="flex items-center justify-center gap-2 text-green-600">
                                {getFileTypeIcon(uploadedFile)}
                                <span className="font-medium">{uploadedFile.name}</span>
                              </div>
                              <p className="text-sm text-gray-500">
                                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setUploadedFile(null)}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <>
                              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-2">Drag & drop your file here</p>
                              <p className="text-sm text-gray-500 mb-4">
                                Supports: JPG, PNG, GIF, MP4, MP3 (Max 100MB)
                              </p>
                              <div className="flex gap-2 justify-center">
                                <Button variant="outline" asChild>
                                  <label className="cursor-pointer">
                                    <Upload className="w-4 h-4 mr-2" />
                                    Choose File
                                    <input
                                      type="file"
                                      className="hidden"
                                      accept="image/*,video/*,audio/*"
                                      onChange={handleFileUpload}
                                    />
                                  </label>
                                </Button>
                                <Button variant="outline">
                                  <Camera className="w-4 h-4 mr-2" />
                                  Take Photo
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* NFT Details */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">NFT Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Title *</label>
                          <Input
                            placeholder="Enter NFT title..."
                            value={nftTitle}
                            onChange={(e) => setNftTitle(e.target.value)}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Description *</label>
                          <Textarea
                            placeholder="Describe your NFT..."
                            value={nftDescription}
                            onChange={(e) => setNftDescription(e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Category *</label>
                          <Select value={nftCategory} onValueChange={setNftCategory}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  <span className="flex items-center gap-2">
                                    <span>{category.icon}</span>
                                    {category.label}
                                  </span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Rarity *</label>
                          <Select value={nftRarity} onValueChange={setNftRarity}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rarity" />
                            </SelectTrigger>
                            <SelectContent>
                              {rarities.map((rarity) => (
                                <SelectItem key={rarity.value} value={rarity.value}>
                                  <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${rarity.color}`} />
                                    <span>{rarity.label}</span>
                                    <span className="text-xs text-gray-500">({rarity.price} BONK)</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Price (BONK) *</label>
                          <Input
                            type="number"
                            placeholder="1000"
                            value={nftPrice}
                            onChange={(e) => setNftPrice(e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Minting Cost */}
                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-purple-800">Minting Cost</h3>
                          <p className="text-sm text-purple-600">One-time fee to create your NFT</p>
                        </div>
                        <div className="flex items-center gap-1 text-purple-800 font-bold text-lg">
                          <Coins className="w-5 h-5" />
                          50 BONK
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mint Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    onClick={handleMint}
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Mint NFT for 50 BONK
                  </Button>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="templates" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-4 pr-4">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold mb-2">Choose a Template</h3>
                    <p className="text-gray-600">Start with a professional design</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {templates.map((template) => (
                      <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="relative">
                          <img
                            src={template.image || "/placeholder.svg"}
                            alt={template.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                          <Badge className="absolute top-2 right-2 bg-purple-500 text-white">
                            Template
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-1">{template.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                          <Button className="w-full" variant="outline">
                            Use Template
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="ai-generate" className="mt-6">
              <ScrollArea className="h-[60vh]">
                <div className="space-y-6 pr-4">
                  <div className="text-center mb-6">
                    <Wand2 className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">AI NFT Generator</h3>
                    <p className="text-gray-600">Create unique football NFTs with AI</p>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Generate with AI</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Describe your NFT</label>
                        <Textarea
                          placeholder="e.g., 'A futuristic football player scoring a goal in a neon stadium with BONK logos'"
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Style</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="realistic">Realistic</SelectItem>
                              <SelectItem value="cartoon">Cartoon</SelectItem>
                              <SelectItem value="abstract">Abstract</SelectItem>
                              <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                              <SelectItem value="retro">Retro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Quality</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quality" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard (Free)</SelectItem>
                              <SelectItem value="hd">HD (+10 BONK)</SelectItem>
                              <SelectItem value="4k">4K (+25 BONK)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        <Wand2 className="w-4 h-4 mr-2" />
                        Generate AI NFT
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">AI Generation Tips</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Be specific about colors, style, and mood</li>
                        <li>• Include football-related keywords</li>
                        <li>• Mention BONK or meme elements for uniqueness</li>
                        <li>• Try different styles for varied results</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
