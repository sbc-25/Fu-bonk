"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, Heart, Share2, Zap, TrendingUp, Clock, X, ShoppingCart } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NFTMarketplaceProps {
  isOpen: boolean
  onClose: () => void
}

interface NFT {
  id: string
  name: string
  image: string
  price: number
  currency: "SOL" | "BONK"
  creator: string
  creatorAvatar: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  likes: number
  isLiked: boolean
  category: "Stadium" | "Player" | "Moment" | "Badge"
  description: string
}

const mockNFTs: NFT[] = [
  {
    id: "1",
    name: "Signal Iduna Park Sunset",
    image: "/placeholder.svg?height=300&width=300",
    price: 2.5,
    currency: "SOL",
    creator: "StadiumArt",
    creatorAvatar: "/placeholder.svg?height=32&width=32",
    rarity: "Epic",
    likes: 234,
    isLiked: false,
    category: "Stadium",
    description: "Exclusive NFT capturing the golden hour at Dortmund's iconic stadium",
  },
  {
    id: "2",
    name: "Haaland Goal Moment",
    image: "/placeholder.svg?height=300&width=300",
    price: 150000,
    currency: "BONK",
    creator: "MomentCapture",
    creatorAvatar: "/placeholder.svg?height=32&width=32",
    rarity: "Legendary",
    likes: 892,
    isLiked: true,
    category: "Moment",
    description: "Historic goal celebration from the Champions League final",
  },
  {
    id: "3",
    name: "Bayern Munich Crest",
    image: "/placeholder.svg?height=300&width=300",
    price: 1.2,
    currency: "SOL",
    creator: "TeamBadges",
    creatorAvatar: "/placeholder.svg?height=32&width=32",
    rarity: "Rare",
    likes: 156,
    isLiked: false,
    category: "Badge",
    description: "Official team crest NFT with animated effects",
  },
  {
    id: "4",
    name: "Müller Portrait",
    image: "/placeholder.svg?height=300&width=300",
    price: 75000,
    currency: "BONK",
    creator: "PlayerArt",
    creatorAvatar: "/placeholder.svg?height=32&width=32",
    rarity: "Epic",
    likes: 445,
    isLiked: false,
    category: "Player",
    description: "Artistic portrait of the legendary midfielder",
  },
]

export function NFTMarketplace({ isOpen, onClose }: NFTMarketplaceProps) {
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("trending")
  const { toast } = useToast()

  const categories = ["All", "Stadium", "Player", "Moment", "Badge"]
  const rarityColors = {
    Common: "bg-gray-100 text-gray-800",
    Rare: "bg-blue-100 text-blue-800",
    Epic: "bg-purple-100 text-purple-800",
    Legendary: "bg-orange-100 text-orange-800",
  }

  const filteredNFTs = nfts.filter((nft) => {
    const matchesSearch =
      nft.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nft.creator.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || nft.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (nftId: string) => {
    setNfts((prev) =>
      prev.map((nft) =>
        nft.id === nftId
          ? {
              ...nft,
              isLiked: !nft.isLiked,
              likes: nft.isLiked ? nft.likes - 1 : nft.likes + 1,
            }
          : nft,
      ),
    )
  }

  const handlePurchase = (nft: NFT) => {
    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${nft.name} for ${nft.price} ${nft.currency}`,
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              NFT Marketplace
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-6 overflow-hidden flex flex-col">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search NFTs, creators..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <TrendingUp className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-6">
            <TabsList className="grid w-full grid-cols-5">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* NFT Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredNFTs.map((nft) => (
                <Card key={nft.id} className="group hover:shadow-lg transition-all">
                  <div className="relative">
                    <img
                      src={nft.image || "/placeholder.svg"}
                      alt={nft.name}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Badge className={rarityColors[nft.rarity]}>{nft.rarity}</Badge>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLike(nft.id)}
                        className={`bg-white/80 hover:bg-white ${nft.isLiked ? "text-red-500" : "text-gray-600"}`}
                      >
                        <Heart className={`w-4 h-4 ${nft.isLiked ? "fill-current" : ""}`} />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-sm truncate">{nft.name}</h3>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>

                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{nft.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={nft.creatorAvatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">{nft.creator[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-gray-600">{nft.creator}</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        <Heart className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-600">{nft.likes}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {nft.category}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="font-semibold text-sm">
                          {nft.currency === "BONK" ? `${nft.price.toLocaleString()} BONK` : `${nft.price} SOL`}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handlePurchase(nft)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                      >
                        <Zap className="w-3 h-3 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats Footer */}
          <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm text-gray-600">
            <span>{filteredNFTs.length} NFTs found</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Last updated: 2 min ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
