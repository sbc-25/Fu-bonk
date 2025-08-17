"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Search, Heart, Eye, Coins, Trophy, Star, Filter, TrendingUp, Flame, Crown, Zap } from 'lucide-react'

interface NFTMarketplaceProps {
  isOpen: boolean
  onClose: () => void
}

export function NFTMarketplace({ isOpen, onClose }: NFTMarketplaceProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Generate marketplace NFTs
  const marketplaceNFTs = [
    {
      id: "market-1",
      title: "Haaland Golden Boot Moment",
      image: "/placeholder.svg?height=200&width=200&text=Haaland+Golden+Boot",
      creator: "BVBLegend",
      price: 2500,
      likes: 1247,
      views: 5632,
      rarity: "Legendary",
      category: "Goals"
    },
    {
      id: "market-2", 
      title: "Yellow Wall Tifo Display",
      image: "/placeholder.svg?height=200&width=200&text=Yellow+Wall+Tifo",
      creator: "StadiumArt",
      price: 1800,
      likes: 892,
      views: 3421,
      rarity: "Epic",
      category: "Fan Art"
    },
    {
      id: "market-3",
      title: "Champions League Trophy Lift",
      image: "/placeholder.svg?height=200&width=200&text=CL+Trophy",
      creator: "TrophyHunter",
      price: 5000,
      likes: 2156,
      views: 8934,
      rarity: "Mythic",
      category: "Trophies"
    }
  ]

  const categories = ["all", "Goals", "Fan Art", "Trophies", "Players", "Stadiums"]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "Common": return "bg-gray-100 text-gray-800"
      case "Uncommon": return "bg-green-100 text-green-800"
      case "Rare": return "bg-blue-100 text-blue-800"
      case "Epic": return "bg-purple-100 text-purple-800"
      case "Legendary": return "bg-orange-100 text-orange-800"
      case "Mythic": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-full h-[90vh] p-0">
        <DialogHeader className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              NFT Marketplace
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="browse" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4">
              <TabsTrigger value="browse">Browse</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
              <TabsTrigger value="my-nfts">My NFTs</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden mt-4">
              <TabsContent value="browse" className="h-full m-0">
                <div className="flex flex-col h-full">
                  <div className="px-4 pb-3 space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search NFTs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full text-sm border rounded px-3 py-2"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>
                          {cat === "all" ? "All Categories" : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <ScrollArea className="flex-1 px-4">
                    <div className="grid grid-cols-1 gap-4 pb-4">
                      {marketplaceNFTs.map((nft) => (
                        <Card key={nft.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                          <div className="relative">
                            <img
                              src={nft.image || "/placeholder.svg"}
                              alt={nft.title}
                              className="w-full h-48 object-cover rounded-t-lg"
                            />
                            <Badge className={`absolute top-3 left-3 ${getRarityColor(nft.rarity)}`}>
                              {nft.rarity}
                            </Badge>
                            <Badge className="absolute top-3 right-3 bg-purple-600 text-white">
                              {nft.price} BONK
                            </Badge>
                          </div>
                          
                          <CardContent className="p-4">
                            <h4 className="font-bold text-lg mb-2">{nft.title}</h4>
                            <p className="text-sm text-gray-600 mb-3">by {nft.creator}</p>
                            
                            <div className="flex items-center justify-between text-sm mb-3">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  {nft.likes}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-4 h-4 text-gray-500" />
                                  {nft.views}
                                </span>
                              </div>
                            </div>
                            
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">
                              <Coins className="w-4 h-4 mr-2" />
                              Buy Now
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="trending" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="text-center py-8">
                    <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Trending NFTs</h3>
                    <p className="text-gray-600">Discover the hottest NFTs in the football community!</p>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="my-nfts" className="h-full m-0">
                <ScrollArea className="h-full px-4">
                  <div className="text-center py-8">
                    <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Your Collection</h3>
                    <p className="text-gray-600">Your NFTs will appear here once you start collecting!</p>
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
