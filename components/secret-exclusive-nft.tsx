"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { X, Heart, Share2, Eye, Coins, Crown, Flame, Sparkles, Upload, Users, Shield, Flag, Star, Zap, Gift, Award, Search, Filter, Plus, Camera, Palette, Music, Video, Globe, Lock, CheckCircle, AlertTriangle, Info } from 'lucide-react'

interface SecretExclusiveNFTProps {
  isOpen: boolean
  onClose: () => void
}

export function SecretExclusiveNFT({ isOpen, onClose }: SecretExclusiveNFTProps) {
  const [activeTab, setActiveTab] = useState("explore")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRarity, setSelectedRarity] = useState("all")
  const [uploadTitle, setUploadTitle] = useState("")
  const [uploadDescription, setUploadDescription] = useState("")
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false)

  // Generate exclusive underground NFTs
  const exclusiveNFTs = [
    {
      id: "underground-1",
      title: "Pride Victory Dance 🏳️‍🌈",
      description: "Celebrating diversity and inclusion in football - a powerful moment of unity",
      image: "/placeholder.svg?height=300&width=300&text=Pride+Victory+Dance",
      creator: "RainbowWarrior",
      pronouns: "they/them",
      price: 2500,
      likes: 847,
      views: 3421,
      rarity: "Legendary",
      category: "Pride",
      contentRating: "Safe",
      isSafeSpaceSupporter: true,
      isVerified: true,
      tags: ["LGBTQ+", "Victory", "Celebration", "Unity", "Pride"]
    },
    {
      id: "underground-2", 
      title: "Queer Fan Chant Moment 🎵",
      description: "Authentic fan culture - expressing identity through football passion",
      image: "/placeholder.svg?height=300&width=300&text=Queer+Fan+Chant",
      creator: "StadiumSinger",
      pronouns: "she/her",
      price: 1800,
      likes: 623,
      views: 2156,
      rarity: "Epic",
      category: "Fan Culture",
      contentRating: "Stylish",
      isSafeSpaceSupporter: true,
      isVerified: true,
      tags: ["Chant", "Fan", "Identity", "Music", "Community"]
    },
    {
      id: "underground-3",
      title: "Streetwear Kit Design ✨",
      description: "Fashion meets football - artistic expression through kit design",
      image: "/placeholder.svg?height=300&width=300&text=Streetwear+Kit",
      creator: "DesignMaven",
      pronouns: "he/him",
      price: 3200,
      likes: 1205,
      views: 4789,
      rarity: "Mythic",
      category: "Streetwear",
      contentRating: "Artistic",
      isSafeSpaceSupporter: false,
      isVerified: true,
      tags: ["Fashion", "Design", "Streetwear", "Art", "Style"]
    },
    {
      id: "underground-4",
      title: "Meme Goal Celebration 😂",
      description: "When football meets internet culture - pure comedic gold",
      image: "/placeholder.svg?height=300&width=300&text=Meme+Goal",
      creator: "MemeKing2024",
      pronouns: "he/him",
      price: 1200,
      likes: 2341,
      views: 8765,
      rarity: "Rare",
      category: "Meme",
      contentRating: "Safe",
      isSafeSpaceSupporter: true,
      isVerified: false,
      tags: ["Meme", "Funny", "Goal", "Internet", "Culture"]
    },
    {
      id: "underground-5",
      title: "Non-Binary Captain Armband 💜",
      description: "Breaking barriers - leadership knows no gender boundaries",
      image: "/placeholder.svg?height=300&width=300&text=NB+Captain",
      creator: "CaptainCourage",
      pronouns: "they/them",
      price: 4500,
      likes: 567,
      views: 1890,
      rarity: "Legendary",
      category: "Pride",
      contentRating: "Stylish",
      isSafeSpaceSupporter: true,
      isVerified: true,
      tags: ["Non-Binary", "Leadership", "Captain", "Representation", "Courage"]
    }
  ]

  const creators = [
    {
      id: "creator-1",
      name: "RainbowWarrior",
      pronouns: "they/them",
      avatar: "/placeholder.svg?height=60&width=60&text=RW",
      followers: 12500,
      nftsCreated: 47,
      totalEarnings: 125000,
      isSafeSpaceSupporter: true,
      isVerified: true,
      bio: "Creating inclusive football art that celebrates diversity 🏳️‍🌈⚽",
      specialties: ["Pride Art", "Inclusive Design", "Community Building"]
    },
    {
      id: "creator-2",
      name: "StadiumSinger",
      pronouns: "she/her", 
      avatar: "/placeholder.svg?height=60&width=60&text=SS",
      followers: 8900,
      nftsCreated: 32,
      totalEarnings: 89000,
      isSafeSpaceSupporter: true,
      isVerified: true,
      bio: "Capturing the soul of football through music and chants 🎵",
      specialties: ["Fan Culture", "Music", "Stadium Atmosphere"]
    },
    {
      id: "creator-3",
      name: "DesignMaven",
      pronouns: "he/him",
      avatar: "/placeholder.svg?height=60&width=60&text=DM", 
      followers: 15600,
      nftsCreated: 28,
      totalEarnings: 156000,
      isSafeSpaceSupporter: false,
      isVerified: true,
      bio: "Where streetwear meets football - pushing creative boundaries ✨",
      specialties: ["Fashion Design", "Streetwear", "Visual Art"]
    }
  ]

  const categories = ["all", "Pride", "Streetwear", "Fan Culture", "Meme", "Artistic"]
  const rarities = ["all", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"]
  const contentRatings = ["Safe", "Stylish", "Edgy"]

  const filteredNFTs = exclusiveNFTs.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         nft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || nft.category === selectedCategory
    const matchesRarity = selectedRarity === "all" || nft.rarity === selectedRarity
    return matchesSearch && matchesCategory && matchesRarity
  })

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800 border-gray-300"
      case "Uncommon": return "bg-green-100 text-green-800 border-green-300"
      case "Rare": return "bg-blue-100 text-blue-800 border-blue-300"
      case "Epic": return "bg-purple-100 text-purple-800 border-purple-300"
      case "Legendary": return "bg-orange-100 text-orange-800 border-orange-300"
      case "Mythic": return "bg-red-100 text-red-800 border-red-300"
      default: return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getContentRatingColor = (rating: string) => {
    switch (rating) {
      case "Safe": return "bg-green-100 text-green-800"
      case "Stylish": return "bg-blue-100 text-blue-800"  
      case "Edgy": return "bg-orange-100 text-orange-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full h-[90vh] p-0 bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 relative">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-400 animate-pulse" />
                Underground Collection
              </DialogTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-rainbow bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white text-xs animate-pulse">
                  🏳️‍🌈 Safe Space
                </Badge>
                <Badge className="bg-black/30 text-white text-xs">
                  <Lock className="w-3 h-3 mr-1" />
                  Exclusive Access
                </Badge>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800/50 mx-4 mt-4">
              <TabsTrigger value="explore" className="text-xs data-[state=active]:bg-purple-600">
                <Search className="w-3 h-3 mb-1" />
                Explore
              </TabsTrigger>
              <TabsTrigger value="creators" className="text-xs data-[state=active]:bg-purple-600">
                <Users className="w-3 h-3 mb-1" />
                Creators
              </TabsTrigger>
              <TabsTrigger value="upload" className="text-xs data-[state=active]:bg-purple-600">
                <Upload className="w-3 h-3 mb-1" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="guidelines" className="text-xs data-[state=active]:bg-purple-600">
                <Shield className="w-3 h-3 mb-1" />
                Rules
              </TabsTrigger>
              <TabsTrigger value="community" className="text-xs data-[state=active]:bg-purple-600">
                <Heart className="w-3 h-3 mb-1" />
                Community
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden mt-4">
              <TabsContent value="explore" className="h-full m-0">
                <div className="flex flex-col h-full">
                  {/* Search and Filters */}
                  <div className="px-4 pb-3 space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search exclusive NFTs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400"
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="flex-1 text-xs bg-gray-800/50 border border-gray-600 rounded px-2 py-1 text-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat} className="bg-gray-800">
                            {cat === "all" ? "All Categories" : cat}
                          </option>
                        ))}
                      </select>
                      
                      <select
                        value={selectedRarity}
                        onChange={(e) => setSelectedRarity(e.target.value)}
                        className="flex-1 text-xs bg-gray-800/50 border border-gray-600 rounded px-2 py-1 text-white"
                      >
                        {rarities.map(rarity => (
                          <option key={rarity} value={rarity} className="bg-gray-800">
                            {rarity === "all" ? "All Rarities" : rarity}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* NFT Grid */}
                  <ScrollArea className="flex-1 px-4">
                    <div className="grid grid-cols-1 gap-4 pb-4">
                      {filteredNFTs.map((nft) => (
                        <Card key={nft.id} className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 transition-all duration-200 cursor-pointer group">
                          <div className="relative">
                            <img
                              src={nft.image || "/placeholder.svg"}
                              alt={nft.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-3 left-3 flex flex-col gap-1">
                              <Badge className={`text-xs ${getRarityColor(nft.rarity)}`}>
                                {nft.rarity}
                              </Badge>
                              <Badge className={`text-xs ${getContentRatingColor(nft.contentRating)}`}>
                                {nft.contentRating}
                              </Badge>
                            </div>
                            <Badge className="absolute top-3 right-3 bg-purple-600 text-white text-xs">
                              {nft.price} BONK
                            </Badge>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <CardContent className="p-4">
                            <h4 className="font-bold text-lg mb-2 text-white">{nft.title}</h4>
                            <p className="text-sm text-gray-300 mb-3 line-clamp-2">{nft.description}</p>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-6 h-6">
                                  <AvatarImage src={`/placeholder-icon.png?height=24&width=24&text=${nft.creator[0]}`} />
                                  <AvatarFallback className="text-xs">{nft.creator[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm text-white flex items-center gap-1">
                                    {nft.creator}
                                    {nft.isVerified && <CheckCircle className="w-3 h-3 text-blue-400" />}
                                    {nft.isSafeSpaceSupporter && <Shield className="w-3 h-3 text-rainbow" />}
                                  </div>
                                  <div className="text-xs text-gray-400">{nft.pronouns}</div>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {nft.tags.slice(0, 3).map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-300">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 text-gray-300">
                                  <Heart className="w-4 h-4" />
                                  {nft.likes}
                                </span>
                                <span className="flex items-center gap-1 text-gray-300">
                                  <Eye className="w-4 h-4" />
                                  {nft.views}
                                </span>
                                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white p-1">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="ghost" className="text-gray-300 hover:text-white p-1">
                                  <Flag className="w-4 h-4" />
                                </Button>
                              </div>
                              <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                                <Coins className="w-4 h-4 mr-1" />
                                Buy
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    {filteredNFTs.length === 0 && (
                      <div className="text-center py-8">
                        <Crown className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">No exclusive NFTs found matching your criteria</p>
                      </div>
                    )}
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="creators" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    {creators.map((creator) => (
                      <Card key={creator.id} className="bg-gray-800/50 border-gray-600 hover:bg-gray-700/50 transition-all duration-200">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3 mb-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage src={creator.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{creator.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-bold text-white">{creator.name}</h4>
                                {creator.isVerified && <CheckCircle className="w-4 h-4 text-blue-400" />}
                                {creator.isSafeSpaceSupporter && (
                                  <Badge className="bg-rainbow bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 text-white text-xs">
                                    🏳️‍🌈 Safe Space Supporter
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mb-1">{creator.pronouns}</p>
                              <p className="text-sm text-gray-300 mb-2">{creator.bio}</p>
                              
                              <div className="flex flex-wrap gap-1 mb-3">
                                {creator.specialties.map((specialty, index) => (
                                  <Badge key={index} variant="outline" className="text-xs border-purple-500 text-purple-300">
                                    {specialty}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 mb-3">
                            <div className="text-center">
                              <div className="font-bold text-lg text-white">{creator.followers.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">Followers</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg text-white">{creator.nftsCreated}</div>
                              <div className="text-xs text-gray-400">NFTs Created</div>
                            </div>
                            <div className="text-center">
                              <div className="font-bold text-lg text-purple-400">{creator.totalEarnings.toLocaleString()}</div>
                              <div className="text-xs text-gray-400">BONK Earned</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                              <Plus className="w-4 h-4 mr-1" />
                              Follow
                            </Button>
                            <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                              <Eye className="w-4 h-4 mr-1" />
                              View NFTs
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="upload" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Upload className="w-5 h-5 text-purple-400" />
                          Create Exclusive NFT
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                          <Input
                            value={uploadTitle}
                            onChange={(e) => setUploadTitle(e.target.value)}
                            placeholder="Give your NFT a catchy title..."
                            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                          <Textarea
                            value={uploadDescription}
                            onChange={(e) => setUploadDescription(e.target.value)}
                            placeholder="Describe your creation and what makes it special..."
                            className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400 min-h-[100px]"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Content Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                              <Camera className="w-4 h-4 mr-2" />
                              Photo
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                              <Video className="w-4 h-4 mr-2" />
                              Video
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                              <Palette className="w-4 h-4 mr-2" />
                              Art
                            </Button>
                            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                              <Music className="w-4 h-4 mr-2" />
                              Audio
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">Content Rating</label>
                          <div className="flex gap-2">
                            {contentRatings.map((rating) => (
                              <Badge key={rating} className={`cursor-pointer ${getContentRatingColor(rating)}`}>
                                {rating}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id="guidelines"
                              checked={agreedToGuidelines}
                              onChange={(e) => setAgreedToGuidelines(e.target.checked)}
                              className="mt-1"
                            />
                            <label htmlFor="guidelines" className="text-sm text-gray-300">
                              I agree to the <span className="text-purple-400 underline cursor-pointer">Community Guidelines</span> and confirm this content promotes cultural self-expression, respects all identities, and maintains our safe space values.
                            </label>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50" 
                          disabled={!agreedToGuidelines || !uploadTitle || !uploadDescription}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Submit for Review
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="guidelines" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-400" />
                          Community Guidelines
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                          <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            What We Celebrate
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Cultural self-expression and artistic creativity</li>
                            <li>• LGBTQ+ pride and representation in football</li>
                            <li>• Diverse identities and authentic storytelling</li>
                            <li>• Fashion, style, and creative football content</li>
                            <li>• Respectful fan culture and community building</li>
                          </ul>
                        </div>
                        
                        <div className="bg-red-900/20 border border-red-600 rounded-lg p-4">
                          <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Not Allowed
                          </h4>
                          <ul className="text-sm text-gray-300 space-y-1">
                            <li>• Full nudity or explicit sexual content</li>
                            <li>• Hate speech or discrimination of any kind</li>
                            <li>• Harassment or bullying behavior</li>
                            <li>• Content that objectifies or demeans others</li>
                            <li>• Spam, fake accounts, or misleading information</li>
                          </ul>
                        </div>
                        
                        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
                          <h4 className="font-bold text-blue-400 mb-2 flex items-center gap-2">
                            <Info className="w-4 h-4" />
                            Content Ratings
                          </h4>
                          <div className="space-y-2 text-sm text-gray-300">
                            <div><Badge className="bg-green-100 text-green-800 mr-2">Safe</Badge>Family-friendly, suitable for all audiences</div>
                            <div><Badge className="bg-blue-100 text-blue-800 mr-2">Stylish</Badge>Fashion, art, creative expression</div>
                            <div><Badge className="bg-orange-100 text-orange-800 mr-2">Edgy</Badge>Bold content, artistic nudity (non-explicit)</div>
                          </div>
                        </div>
                        
                        <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
                          <h4 className="font-bold text-purple-400 mb-2 flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            Safe Space Commitment
                          </h4>
                          <p className="text-sm text-gray-300">
                            This is a safe space for all football fans, regardless of gender identity, sexual orientation, 
                            race, religion, or background. We're committed to fostering an inclusive community where 
                            everyone can express their passion for football authentically and safely.
                          </p>
                        </div>
                        
                        <div className="bg-gray-700/30 rounded-lg p-4">
                          <h4 className="font-bold text-white mb-2">Reporting & Moderation</h4>
                          <p className="text-sm text-gray-300 mb-2">
                            Our community actively moderates content. Use the report button if you see anything 
                            that violates our guidelines. All reports are reviewed by our moderation team within 24 hours.
                          </p>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <Flag className="w-4 h-4 mr-2" />
                            Report Content
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="community" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="space-y-4 pb-4">
                    <Card className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Heart className="w-5 h-5 text-pink-400" />
                          Our Community
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">
                          Welcome to the Underground Collection - a space where football meets authentic self-expression. 
                          We're building a community that celebrates diversity, creativity, and the beautiful game.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center">
                            <div className="font-bold text-2xl text-purple-400">2.5K+</div>
                            <div className="text-xs text-gray-400">Active Members</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-2xl text-pink-400">850+</div>
                            <div className="text-xs text-gray-400">Exclusive NFTs</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-2xl text-green-400">95%</div>
                            <div className="text-xs text-gray-400">Safe Space Rating</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-2xl text-yellow-400">24/7</div>
                            <div className="text-xs text-gray-400">Community Support</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Users className="w-5 h-5 text-blue-400" />
                          Who We Are
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-rainbow bg-gradient-to-r from-red-500/20 via-yellow-500/20 via-green-500/20 via-blue-500/20 to-purple-500/20 rounded-lg p-4 border border-purple-500/30">
                          <h4 className="font-bold text-white mb-2">🏳️‍🌈 LGBTQ+ Friendly</h4>
                          <p className="text-sm text-gray-300">
                            A safe space for queer football fans. Not "for men only" - we welcome all genders, 
                            orientations, and identities. Love is love, football is for everyone.
                          </p>
                        </div>
                        
                        <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
                          <h4 className="font-bold text-purple-400 mb-2">🎨 Cultural Expression</h4>
                          <p className="text-sm text-gray-300">
                            We celebrate self-expression through art, fashion, and creativity. This isn't about 
                            explicit content - it's about authentic representation and cultural storytelling.
                          </p>
                        </div>
                        
                        <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
                          <h4 className="font-bold text-blue-400 mb-2">⚽ Football First</h4>
                          <p className="text-sm text-gray-300">
                            At our core, we're football fans. Whether you support BVB, Bayern, or any team - 
                            we unite through our shared passion for the beautiful game.
                          </p>
                        </div>
                        
                        <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
                          <h4 className="font-bold text-green-400 mb-2">🛡️ Community Moderated</h4>
                          <p className="text-sm text-gray-300">
                            Our community self-moderates with clear guidelines. We believe in empowering our 
                            members to create a positive, inclusive environment for everyone.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gray-800/50 border-gray-600">
                      <CardHeader>
                        <CardTitle className="text-lg text-white flex items-center gap-2">
                          <Star className="w-5 h-5 text-yellow-400" />
                          Join Our Movement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-4">
                          Ready to be part of something special? Join creators, collectors, and fans who are 
                          redefining what football culture can be.
                        </p>
                        
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                            <Plus className="w-4 h-4 mr-2" />
                            Join Community
                          </Button>
                          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
