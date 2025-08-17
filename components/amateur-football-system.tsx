"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Users, MapPin, Calendar, Clock, Target, Star, Plus, Search, Heart, Share2, Eye, Coins, Gift, Award, Zap, Crown, Flame, Sparkles } from 'lucide-react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"

// Generate 350+ NFTs for the amateur football system
const generateNFTs = () => {
  const nftTypes = [
    "Goal Celebration", "Team Photo", "Victory Dance", "Training Session", "Match Highlight",
    "Stadium Atmosphere", "Fan Moment", "Trophy Lift", "Penalty Save", "Free Kick",
    "Corner Kick", "Team Huddle", "Coach Speech", "Substitution", "Red Card Drama",
    "Yellow Card", "Offside Call", "VAR Decision", "Injury Time", "Final Whistle",
    "Warm Up", "Pre-Match", "Post-Match", "Locker Room", "Team Bus",
    "Stadium Entry", "Pitch Inspection", "Referee Meeting", "Captain's Armband", "Kit Reveal",
    "Boot Collection", "Ball Skills", "Juggling", "Crossbar Challenge", "Shooting Practice",
    "Passing Drill", "Defensive Wall", "Goalkeeper Training", "Sprint Training", "Fitness Test",
    "Medical Check", "Tactical Board", "Formation Setup", "Player Interview", "Press Conference",
    "Fan Chant", "Scarf Display", "Banner Unfurl", "Flare Show", "Crowd Surf",
    "Mascot Dance", "Half Time Show", "Stadium Tour", "VIP Experience", "Player Tunnel"
  ]

  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"]
  const teams = [
    "BONK United FC", "Westfalen Warriors", "Ruhr Valley FC", "SV Bochum United", 
    "FC Dortmund Amateurs", "Signal Iduna Stars", "Yellow Wall FC", "BVB Legends",
    "Dortmund Dragons", "Phoenix FC", "Thunder United", "Lightning Bolts",
    "Storm Chasers", "Fire Eagles", "Ice Wolves", "Golden Lions",
    "Silver Hawks", "Bronze Bears", "Diamond Dogs", "Platinum Panthers"
  ]

  const creators = [
    "FootballFan2024", "GoalGetter", "StadiumShooter", "MatchMoments", "PitchPerfect",
    "SoccerSnaps", "GameDayGuru", "KickoffKing", "FieldFocus", "NetNinja",
    "BallBouncer", "CleatChaser", "TurfTalent", "GrassGrinder", "BootBaller"
  ]

  const nfts = []
  
  for (let i = 1; i <= 350; i++) {
    const type = nftTypes[Math.floor(Math.random() * nftTypes.length)]
    const rarity = rarities[Math.floor(Math.random() * rarities.length)]
    const team = teams[Math.floor(Math.random() * teams.length)]
    const creator = creators[Math.floor(Math.random() * creators.length)]
    
    nfts.push({
      id: `nft-${i}`,
      title: `${type} #${i}`,
      description: `Epic ${type.toLowerCase()} moment from ${team}`,
      image: `/placeholder.svg?height=200&width=200&text=${encodeURIComponent(type + ' ' + i)}`,
      creator: creator,
      team: team,
      rarity: rarity,
      price: Math.floor(Math.random() * 5000) + 100,
      likes: Math.floor(Math.random() * 1000),
      views: Math.floor(Math.random() * 10000),
      bonkReward: Math.floor(Math.random() * 100) + 10,
      isLiked: Math.random() > 0.7,
      category: type,
      timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
    })
  }
  
  return nfts
}

export function AmateurFootballSystem() {
  const [activeLeague, setActiveLeague] = useState("local")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedRarity, setSelectedRarity] = useState("all")

  const nfts = generateNFTs()

  const leagues = [
    {
      id: "local",
      name: "Dortmund Local League",
      level: "Amateur",
      teams: 12,
      matches: 24,
      season: "2024 Spring",
      prize: "5,000 BONK",
    },
    {
      id: "regional",
      name: "NRW Regional Cup",
      level: "Semi-Pro",
      teams: 32,
      matches: 64,
      season: "2024 Summer",
      prize: "15,000 BONK",
    },
  ]

  const upcomingMatches = [
    {
      id: "1",
      homeTeam: "FC Dortmund Amateurs",
      awayTeam: "SV Bochum United",
      date: "2024-02-15",
      time: "15:00",
      venue: "Local Sports Center",
      league: "Dortmund Local League",
    },
    {
      id: "2",
      homeTeam: "Ruhr Valley FC",
      awayTeam: "Westfalen Warriors",
      date: "2024-02-16",
      time: "17:30",
      venue: "Community Stadium",
      league: "Dortmund Local League",
    },
  ]

  const myTeam = {
    name: "BONK United FC",
    logo: "/placeholder.svg?height=60&width=60",
    position: 3,
    points: 18,
    played: 8,
    won: 6,
    drawn: 0,
    lost: 2,
    goalsFor: 24,
    goalsAgainst: 12,
    nextMatch: "vs FC Dortmund Amateurs",
    nextMatchDate: "Feb 15, 15:00",
  }

  const leaderboard = [
    { position: 1, team: "Westfalen Warriors", points: 24, played: 8, gd: "+15" },
    { position: 2, team: "Ruhr Valley FC", points: 21, played: 8, gd: "+12" },
    { position: 3, team: "BONK United FC", points: 18, played: 8, gd: "+12" },
    { position: 4, team: "SV Bochum United", points: 15, played: 8, gd: "+3" },
    { position: 5, team: "FC Dortmund Amateurs", points: 12, played: 8, gd: "-2" },
  ]

  const categories = ["all", "Goal Celebration", "Team Photo", "Victory Dance", "Training Session", "Match Highlight", "Stadium Atmosphere", "Fan Moment"]
  const rarities = ["all", "Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythic"]

  const filteredNFTs = nfts.filter(nft => {
    const matchesSearch = nft.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         nft.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || nft.category === selectedCategory
    const matchesRarity = selectedRarity === "all" || nft.rarity === selectedRarity
    return matchesSearch && matchesCategory && matchesRarity
  })

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
    <div className="h-full flex flex-col">
      <div className="text-center mb-4 px-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
          <Target className="w-5 h-5 text-green-600" />
          Amateur Football System
        </h2>
        <p className="text-sm text-gray-600">Join local leagues, compete with friends, and earn BONK rewards!</p>
      </div>

      <Tabs defaultValue="my-team" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-5 mx-4 mb-4">
          <TabsTrigger value="my-team" className="text-xs">My Team</TabsTrigger>
          <TabsTrigger value="leagues" className="text-xs">Leagues</TabsTrigger>
          <TabsTrigger value="matches" className="text-xs">Matches</TabsTrigger>
          <TabsTrigger value="rankings" className="text-xs">Rankings</TabsTrigger>
          <TabsTrigger value="nfts" className="text-xs">NFTs</TabsTrigger>
        </TabsList>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="my-team" className="h-full m-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-3 pb-4">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={myTeam.logo || "/placeholder.svg"}
                        alt={myTeam.name}
                        className="w-12 h-12 rounded-full border-2 border-green-500"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-green-800">{myTeam.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-500 text-white text-xs">
                            #{myTeam.position} in League
                          </Badge>
                          <Badge variant="outline" className="text-xs">{myTeam.points} points</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="text-center">
                        <div className="font-bold text-lg text-green-600">{myTeam.won}</div>
                        <div className="text-xs text-gray-600">Wins</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-yellow-600">{myTeam.drawn}</div>
                        <div className="text-xs text-gray-600">Draws</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-lg text-red-600">{myTeam.lost}</div>
                        <div className="text-xs text-gray-600">Losses</div>
                      </div>
                    </div>

                    <div className="bg-white/50 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-semibold text-sm">Next Match</div>
                          <div className="text-xs text-gray-600">{myTeam.nextMatch}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-sm">{myTeam.nextMatchDate}</div>
                          <Badge className="bg-orange-500 text-white text-xs">+100 BONK</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-2 gap-2">
                  <Card>
                    <CardContent className="p-3 text-center">
                      <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                      <div className="font-bold text-lg">{myTeam.goalsFor}</div>
                      <div className="text-xs text-gray-600">Goals Scored</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-3 text-center">
                      <Trophy className="w-6 h-6 text-purple-500 mx-auto mb-1" />
                      <div className="font-bold text-lg">{myTeam.goalsAgainst}</div>
                      <div className="text-xs text-gray-600">Goals Conceded</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Team NFT Collection Preview */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      Team NFT Collection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-2">
                      {filteredNFTs.slice(0, 6).map((nft) => (
                        <div key={nft.id} className="relative group cursor-pointer">
                          <img
                            src={nft.image || "/placeholder.svg"}
                            alt={nft.title}
                            className="w-full h-20 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Badge className={`text-xs ${getRarityColor(nft.rarity)}`}>
                              {nft.rarity}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3 text-xs">
                      View All Team NFTs ({filteredNFTs.length})
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="leagues" className="h-full m-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-3 pb-4">
                {leagues.map((league) => (
                  <Card key={league.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-lg">{league.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Badge variant="outline" className="text-xs">{league.level}</Badge>
                            <span>•</span>
                            <span>{league.season}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600">{league.prize}</div>
                          <div className="text-xs text-gray-500">Prize Pool</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{league.teams} teams</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{league.matches} matches</span>
                        </div>
                      </div>

                      <Button className="w-full" size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Join League
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="matches" className="h-full m-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-4 pb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Upcoming Matches
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {upcomingMatches.map((match) => (
                      <div key={match.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-semibold">
                            {match.homeTeam} vs {match.awayTeam}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {match.league}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-4 text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{match.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{match.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{match.venue}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="rankings" className="h-full m-0">
            <ScrollArea className="h-full px-4">
              <div className="space-y-4 pb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      League Table
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {leaderboard.map((team) => (
                        <div
                          key={team.position}
                          className={`flex items-center justify-between p-3 rounded-lg ${
                            team.team === myTeam.name ? "bg-green-50 border border-green-200" : "bg-gray-50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              team.position === 1 ? "bg-yellow-500 text-white" :
                              team.position === 2 ? "bg-gray-400 text-white" :
                              team.position === 3 ? "bg-orange-500 text-white" :
                              "bg-gray-200 text-gray-700"
                            }`}>
                              {team.position}
                            </div>
                            <div>
                              <div className="font-semibold text-sm">{team.team}</div>
                              <div className="text-xs text-gray-500">
                                {team.played} played • GD: {team.gd}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{team.points}</div>
                            <div className="text-xs text-gray-500">pts</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="nfts" className="h-full m-0">
            <div className="flex flex-col h-full">
              {/* Search and Filters */}
              <div className="px-4 pb-3 space-y-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                  <Input
                    placeholder="Search NFTs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 text-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 text-xs border rounded px-2 py-1"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedRarity}
                    onChange={(e) => setSelectedRarity(e.target.value)}
                    className="flex-1 text-xs border rounded px-2 py-1"
                  >
                    {rarities.map(rarity => (
                      <option key={rarity} value={rarity}>{rarity === "all" ? "All Rarities" : rarity}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* NFT Grid */}
              <ScrollArea className="flex-1 px-4">
                <div className="grid grid-cols-2 gap-3 pb-4">
                  {filteredNFTs.map((nft) => (
                    <Card key={nft.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                      <div className="relative">
                        <img
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.title}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <Badge className={`absolute top-2 left-2 text-xs ${getRarityColor(nft.rarity)}`}>
                          {nft.rarity}
                        </Badge>
                        <Badge className="absolute top-2 right-2 bg-orange-500 text-white text-xs">
                          +{nft.bonkReward} BONK
                        </Badge>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                          <Button size="sm" className="text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                      
                      <CardContent className="p-3">
                        <h4 className="font-semibold text-xs line-clamp-1 mb-1">{nft.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2 mb-2">{nft.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {nft.creator}
                          </span>
                          <span className="font-bold text-orange-600">{nft.price} BONK</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`flex items-center gap-1 cursor-pointer hover:scale-110 transition-transform ${nft.isLiked ? 'text-red-500' : 'text-gray-500'}`}>
                              <Heart className={`w-3 h-3 ${nft.isLiked ? 'fill-current' : ''}`} />
                              {nft.likes}
                            </span>
                            <span className="flex items-center gap-1 text-gray-500">
                              <Eye className="w-3 h-3" />
                              {nft.views}
                            </span>
                          </div>
                          <Button size="sm" className="text-xs h-6">
                            <Coins className="w-3 h-3 mr-1" />
                            Buy
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {filteredNFTs.length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No NFTs found matching your criteria</p>
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
