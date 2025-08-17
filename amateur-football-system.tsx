"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  MapPin,
  Trophy,
  Users,
  Calendar,
  Plus,
  Star,
  HomeIcon,
  Plane,
  Search,
  Coins,
  Crown,
  Shield,
  Play,
  Video,
  Eye,
  MessageCircle,
  Heart,
  Share2,
  Camera,
  Mic,
  Radio,
  TrendingUp,
  DollarSign,
  Target,
  Zap,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AmateurTeam {
  id: string
  name: string
  city: string
  district: string
  league: string
  division: number
  founded: number
  stadium: string
  capacity: number
  logo: string
  points: number
  played: number
  won: number
  drawn: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  form: string[] // Last 5 matches: W, D, L
  manager: string
  players: number
  averageAge: number
  marketValue: number
  bonkSponsorship: number
  isVerified: boolean
  socialMedia: {
    followers: number
    posts: number
  }
  canStream: boolean
  streamingEquipment: boolean
  totalEarnings: number // Total BONK earned from matches
  weeklyEarnings: number // BONK earned this week
}

interface Match {
  id: string
  homeTeam: string
  awayTeam: string
  homeScore?: number
  awayScore?: number
  date: Date
  stadium: string
  league: string
  division: number
  status: "scheduled" | "live" | "finished" | "postponed"
  attendance?: number
  referee?: string
  weather?: string
  bonkReward: number
  winnerReward: number // BONK reward for winning team
  drawReward: number // BONK reward for each team in case of draw
  isStreaming?: boolean
  streamUrl?: string
  viewers?: number
  streamQuality: "HD" | "4K" | "Mobile"
  hasCommentary: boolean
}

interface Stadium {
  id: string
  name: string
  city: string
  district: string
  capacity: number
  surface: "grass" | "artificial" | "mixed"
  facilities: string[]
  coordinates: { lat: number; lng: number }
  image: string
  homeTeams: string[]
  rating: number
  bonkSponsored: boolean
  streamingCapable: boolean
  cameras: number
}

interface LiveStream {
  id: string
  matchId: string
  title: string
  streamer: string
  viewers: number
  quality: "HD" | "4K" | "Mobile"
  hasCommentary: boolean
  language: string
  bonkReward: number
  chatEnabled: boolean
  donations: number
}

export function AmateurFootballSystem() {
  const [activeTab, setActiveTab] = useState("rankings")
  const [selectedLeague, setSelectedLeague] = useState("all")
  const [selectedCity, setSelectedCity] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [teams, setTeams] = useState<AmateurTeam[]>([])
  const [matches, setMatches] = useState<Match[]>([])
  const [stadiums, setStadiums] = useState<Stadium[]>([])
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [showStreamModal, setShowStreamModal] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Mock amateur teams data with earnings
    const mockTeams: AmateurTeam[] = [
      {
        id: "sv-dortmund-aplerbeck",
        name: "SV Dortmund-Aplerbeck",
        city: "Dortmund",
        district: "Aplerbeck",
        league: "Kreisliga A",
        division: 7,
        founded: 1925,
        stadium: "Sportplatz Aplerbeck",
        capacity: 500,
        logo: "/placeholder.svg?height=40&width=40",
        points: 42,
        played: 18,
        won: 13,
        drawn: 3,
        lost: 2,
        goalsFor: 45,
        goalsAgainst: 18,
        form: ["W", "W", "D", "W", "W"],
        manager: "Klaus Müller",
        players: 23,
        averageAge: 26.5,
        marketValue: 125000,
        bonkSponsorship: 5000,
        isVerified: true,
        socialMedia: {
          followers: 1250,
          posts: 89,
        },
        canStream: true,
        streamingEquipment: true,
        totalEarnings: 8750, // 13 wins × 500 BONK + 3 draws × 250 BONK
        weeklyEarnings: 1500,
      },
      {
        id: "tus-hombruch",
        name: "TuS Hombruch 1909",
        city: "Dortmund",
        district: "Hombruch",
        league: "Kreisliga A",
        division: 7,
        founded: 1909,
        stadium: "Hombrucher Sportplatz",
        capacity: 800,
        logo: "/placeholder.svg?height=40&width=40",
        points: 38,
        played: 18,
        won: 12,
        drawn: 2,
        lost: 4,
        goalsFor: 41,
        goalsAgainst: 22,
        form: ["L", "W", "W", "D", "W"],
        manager: "Stefan Weber",
        players: 26,
        averageAge: 24.8,
        marketValue: 98000,
        bonkSponsorship: 3500,
        isVerified: true,
        socialMedia: {
          followers: 890,
          posts: 67,
        },
        canStream: true,
        streamingEquipment: false,
        totalEarnings: 6500, // 12 wins × 500 BONK + 2 draws × 250 BONK
        weeklyEarnings: 1000,
      },
      {
        id: "fc-phoenix-dortmund",
        name: "FC Phoenix Dortmund",
        city: "Dortmund",
        district: "Hörde",
        league: "Kreisliga B",
        division: 8,
        founded: 2010,
        stadium: "Phoenix-Arena",
        capacity: 300,
        logo: "/placeholder.svg?height=40&width=40",
        points: 35,
        played: 16,
        won: 11,
        drawn: 2,
        lost: 3,
        goalsFor: 38,
        goalsAgainst: 19,
        form: ["W", "W", "W", "L", "W"],
        manager: "Marco Rossi",
        players: 20,
        averageAge: 22.3,
        marketValue: 65000,
        bonkSponsorship: 2000,
        isVerified: false,
        socialMedia: {
          followers: 456,
          posts: 34,
        },
        canStream: false,
        streamingEquipment: false,
        totalEarnings: 4000, // 11 wins × 300 BONK + 2 draws × 150 BONK (Kreisliga B lower rewards)
        weeklyEarnings: 600,
      },
      {
        id: "sv-westfalia-herne",
        name: "SV Westfalia Herne",
        city: "Herne",
        district: "Zentrum",
        league: "Bezirksliga",
        division: 6,
        founded: 1904,
        stadium: "Westfalia-Stadion",
        capacity: 1200,
        logo: "/placeholder.svg?height=40&width=40",
        points: 48,
        played: 20,
        won: 15,
        drawn: 3,
        lost: 2,
        goalsFor: 52,
        goalsAgainst: 16,
        form: ["W", "W", "W", "D", "W"],
        manager: "Jürgen Schmidt",
        players: 28,
        averageAge: 27.2,
        marketValue: 180000,
        bonkSponsorship: 8000,
        isVerified: true,
        socialMedia: {
          followers: 2100,
          posts: 156,
        },
        canStream: true,
        streamingEquipment: true,
        totalEarnings: 12750, // 15 wins × 750 BONK + 3 draws × 375 BONK (Bezirksliga higher rewards)
        weeklyEarnings: 2250,
      },
      {
        id: "fc-gelsenkirchen-united",
        name: "FC Gelsenkirchen United",
        city: "Gelsenkirchen",
        district: "Buer",
        league: "Kreisliga A",
        division: 7,
        founded: 1998,
        stadium: "Buer Sportpark",
        capacity: 600,
        logo: "/placeholder.svg?height=40&width=40",
        points: 31,
        played: 18,
        won: 9,
        drawn: 4,
        lost: 5,
        goalsFor: 32,
        goalsAgainst: 28,
        form: ["D", "L", "W", "W", "D"],
        manager: "Ahmed Hassan",
        players: 24,
        averageAge: 25.1,
        marketValue: 89000,
        bonkSponsorship: 4200,
        isVerified: false,
        socialMedia: {
          followers: 678,
          posts: 45,
        },
        canStream: true,
        streamingEquipment: false,
        totalEarnings: 5500, // 9 wins × 500 BONK + 4 draws × 250 BONK
        weeklyEarnings: 750,
      },
    ]

    const mockMatches: Match[] = [
      {
        id: "match-1",
        homeTeam: "SV Dortmund-Aplerbeck",
        awayTeam: "TuS Hombruch 1909",
        date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        stadium: "Sportplatz Aplerbeck",
        league: "Kreisliga A",
        division: 7,
        status: "scheduled",
        referee: "Hans Zimmermann",
        bonkReward: 100,
        winnerReward: 500,
        drawReward: 250,
        isStreaming: false,
        streamQuality: "HD",
        hasCommentary: true,
      },
      {
        id: "match-2",
        homeTeam: "FC Phoenix Dortmund",
        awayTeam: "FC Gelsenkirchen United",
        homeScore: 2,
        awayScore: 1,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        stadium: "Phoenix-Arena",
        league: "Kreisliga B",
        division: 8,
        status: "finished",
        attendance: 180,
        weather: "Sunny, 18°C",
        bonkReward: 75,
        winnerReward: 300,
        drawReward: 150,
        isStreaming: false,
        streamQuality: "Mobile",
        hasCommentary: false,
      },
      {
        id: "match-3",
        homeTeam: "SV Westfalia Herne",
        awayTeam: "SV Dortmund-Aplerbeck",
        homeScore: 1,
        awayScore: 1,
        date: new Date(),
        stadium: "Westfalia-Stadion",
        league: "Bezirksliga",
        division: 6,
        status: "live",
        attendance: 450,
        bonkReward: 150,
        winnerReward: 750,
        drawReward: 375,
        isStreaming: true,
        streamUrl: "https://stream.bonkvs.com/live/match-3",
        viewers: 1247,
        streamQuality: "4K",
        hasCommentary: true,
      },
    ]

    const mockStadiums: Stadium[] = [
      {
        id: "sportplatz-aplerbeck",
        name: "Sportplatz Aplerbeck",
        city: "Dortmund",
        district: "Aplerbeck",
        capacity: 500,
        surface: "grass",
        facilities: ["Floodlights", "Changing Rooms", "Canteen", "Parking"],
        coordinates: { lat: 51.4769, lng: 7.5531 },
        image: "/placeholder.svg?height=200&width=300",
        homeTeams: ["SV Dortmund-Aplerbeck"],
        rating: 4.2,
        bonkSponsored: true,
        streamingCapable: true,
        cameras: 4,
      },
      {
        id: "phoenix-arena",
        name: "Phoenix-Arena",
        city: "Dortmund",
        district: "Hörde",
        capacity: 300,
        surface: "artificial",
        facilities: ["Floodlights", "Changing Rooms", "Parking"],
        coordinates: { lat: 51.4922, lng: 7.5125 },
        image: "/placeholder.svg?height=200&width=300",
        homeTeams: ["FC Phoenix Dortmund"],
        rating: 3.8,
        bonkSponsored: false,
        streamingCapable: false,
        cameras: 0,
      },
      {
        id: "westfalia-stadion",
        name: "Westfalia-Stadion",
        city: "Herne",
        district: "Zentrum",
        capacity: 1200,
        surface: "grass",
        facilities: ["Floodlights", "Changing Rooms", "Canteen", "VIP Area", "Parking", "Shop"],
        coordinates: { lat: 51.5386, lng: 7.2256 },
        image: "/placeholder.svg?height=200&width=300",
        homeTeams: ["SV Westfalia Herne"],
        rating: 4.6,
        bonkSponsored: true,
        streamingCapable: true,
        cameras: 6,
      },
    ]

    const mockLiveStreams: LiveStream[] = [
      {
        id: "stream-1",
        matchId: "match-3",
        title: "SV Westfalia Herne vs SV Dortmund-Aplerbeck - LIVE!",
        streamer: "AmateurFootballTV",
        viewers: 1247,
        quality: "4K",
        hasCommentary: true,
        language: "German",
        bonkReward: 25,
        chatEnabled: true,
        donations: 450,
      },
    ]

    setTeams(mockTeams)
    setMatches(mockMatches)
    setStadiums(mockStadiums)
    setLiveStreams(mockLiveStreams)
  }, [])

  const filteredTeams = teams.filter((team) => {
    const matchesSearch =
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.district.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLeague = selectedLeague === "all" || team.league === selectedLeague
    const matchesCity = selectedCity === "all" || team.city === selectedCity

    return matchesSearch && matchesLeague && matchesCity
  })

  const sortedTeams = filteredTeams.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points
    const goalDiffA = a.goalsFor - a.goalsAgainst
    const goalDiffB = b.goalsFor - b.goalsAgainst
    if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA
    return b.goalsFor - a.goalsFor
  })

  const getFormIcon = (result: string) => {
    switch (result) {
      case "W":
        return <div className="w-2 h-2 bg-green-500 rounded-full" />
      case "D":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full" />
      case "L":
        return <div className="w-2 h-2 bg-red-500 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-gray-300 rounded-full" />
    }
  }

  const getLeagueColor = (league: string) => {
    switch (league) {
      case "Bezirksliga":
        return "bg-purple-100 text-purple-800"
      case "Kreisliga A":
        return "bg-blue-100 text-blue-800"
      case "Kreisliga B":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getLeagueRewards = (league: string) => {
    switch (league) {
      case "Bezirksliga":
        return { win: 750, draw: 375 }
      case "Kreisliga A":
        return { win: 500, draw: 250 }
      case "Kreisliga B":
        return { win: 300, draw: 150 }
      default:
        return { win: 500, draw: 250 }
    }
  }

  const handleCreateMatch = () => {
    toast({
      title: "Match erstellt! ⚽",
      description: "Dein Match wurde erfolgreich erstellt und andere Teams können beitreten.",
    })
  }

  const handleJoinTeam = (teamId: string) => {
    toast({
      title: "Beitrittsanfrage gesendet! 🤝",
      description: "Deine Anfrage wurde an das Team gesendet.",
    })
  }

  const handleStartStream = (match: Match) => {
    setSelectedMatch(match)
    setShowStreamModal(true)
  }

  const handleWatchStream = (streamId: string) => {
    toast({
      title: "Stream gestartet! 📺",
      description: "Du schaust jetzt den Live-Stream. +5 BONK für's Zuschauen!",
    })
  }

  const cities = [...new Set(teams.map((team) => team.city))]
  const leagues = [...new Set(teams.map((team) => team.league))]

  return (
    <div className="space-y-4">
      {/* Header with team earnings focus */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-green-600" />
            Amateur Football League 💰
          </CardTitle>
          <div className="space-y-2 text-sm text-gray-600">
            <p>
              🏆 <strong>Team-Belohnungen:</strong> Vereine verdienen BONK-Tokens für Siege und Unentschieden
            </p>
            <p>
              💰 <strong>Liga-System:</strong> Bezirksliga (750 BONK/Sieg) • Kreisliga A (500 BONK/Sieg) • Kreisliga B
              (300 BONK/Sieg)
            </p>
            <p>
              📺 <strong>Live-Streaming:</strong> Teams können Matches streamen und zusätzliche Einnahmen generieren
            </p>
            <p>
              🎯 <strong>Beispiel:</strong> FC Phoenix Dortmund hat bereits 4.000 BONK durch 11 Siege verdient!
            </p>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="streams">Live Streams</TabsTrigger>
          <TabsTrigger value="stadiums">Stadien</TabsTrigger>
          <TabsTrigger value="create">Erstellen</TabsTrigger>
        </TabsList>

        <TabsContent value="rankings" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Team oder Stadt suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Button
                    variant={selectedLeague === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedLeague("all")}
                    className="whitespace-nowrap"
                  >
                    Alle Ligen
                  </Button>
                  {leagues.map((league) => (
                    <Button
                      key={league}
                      variant={selectedLeague === league ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLeague(league)}
                      className="whitespace-nowrap"
                    >
                      {league}
                    </Button>
                  ))}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2">
                  <Button
                    variant={selectedCity === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCity("all")}
                    className="whitespace-nowrap"
                  >
                    Alle Städte
                  </Button>
                  {cities.map((city) => (
                    <Button
                      key={city}
                      variant={selectedCity === city ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCity(city)}
                      className="whitespace-nowrap"
                    >
                      {city}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Earnings Leaderboard */}
          <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-yellow-600" />
                Top Verdiener diese Woche 💰
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teams
                  .sort((a, b) => b.weeklyEarnings - a.weeklyEarnings)
                  .slice(0, 3)
                  .map((team, index) => (
                    <div key={team.id} className="flex items-center justify-between p-2 bg-white rounded-lg">
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                                ? "bg-gray-500 text-white"
                                : "bg-orange-500 text-white"
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        <span className="font-semibold text-sm">{team.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span className="font-bold text-yellow-700">{team.weeklyEarnings.toLocaleString()} BONK</span>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Rankings Table - Enhanced with earnings */}
          <ScrollArea className="h-[500px]">
            <div className="space-y-2">
              {sortedTeams.map((team, index) => (
                <Card
                  key={team.id}
                  className={`hover:shadow-md transition-all duration-200 cursor-pointer animate-in slide-in-from-left-2 ${
                    index === 0
                      ? "border-yellow-300 bg-yellow-50"
                      : index === 1
                        ? "border-gray-300 bg-gray-50"
                        : index === 2
                          ? "border-orange-300 bg-orange-50"
                          : ""
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-3">
                    {/* Top Row - Fixed Layout */}
                    <div className="flex items-center gap-3 mb-3">
                      {/* Rank & Crown */}
                      <div className="flex items-center gap-1 min-w-[50px]">
                        <Badge
                          className={`text-xs px-2 py-1 ${
                            index === 0
                              ? "bg-yellow-500 text-white"
                              : index === 1
                                ? "bg-gray-500 text-white"
                                : index === 2
                                  ? "bg-orange-500 text-white"
                                  : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {index + 1}
                        </Badge>
                        {index === 0 && <Crown className="w-3 h-3 text-yellow-500" />}
                      </div>

                      {/* Team Info */}
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <Avatar className="w-8 h-8 flex-shrink-0">
                          <AvatarImage src={team.logo || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">{team.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 mb-1">
                            <h3 className="font-semibold text-sm truncate">{team.name}</h3>
                            {team.isVerified && <Badge className="bg-blue-500 text-white text-xs px-1">✓</Badge>}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {team.city}
                            </span>
                            <Badge className={`${getLeagueColor(team.league)} text-xs px-1 py-0`}>{team.league}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Stats - Fixed Width */}
                      <div className="flex items-center gap-3 text-center min-w-[120px]">
                        <div>
                          <div className="text-lg font-bold text-green-600">{team.points}</div>
                          <div className="text-xs text-gray-500">Pkt</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold">{team.played}</div>
                          <div className="text-xs text-gray-500">Sp</div>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-blue-600">
                            {team.goalsFor - team.goalsAgainst > 0 ? "+" : ""}
                            {team.goalsFor - team.goalsAgainst}
                          </div>
                          <div className="text-xs text-gray-500">Diff</div>
                        </div>
                      </div>
                    </div>

                    {/* Team Earnings Row */}
                    <div className="bg-green-50 rounded-lg p-2 mb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <div className="flex items-center gap-1">
                            <Coins className="w-3 h-3 text-green-600" />
                            <span className="font-semibold text-green-800">
                              {team.totalEarnings.toLocaleString()} BONK
                            </span>
                            <span className="text-gray-600">gesamt</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-orange-600" />
                            <span className="font-semibold text-orange-800">
                              +{team.weeklyEarnings.toLocaleString()}
                            </span>
                            <span className="text-gray-600">diese Woche</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">{getLeagueRewards(team.league).win} BONK/Sieg</div>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center gap-3">
                        {/* Form */}
                        <div className="flex items-center gap-1">
                          {team.form.map((result, i) => (
                            <div key={i} className="flex items-center justify-center">
                              {getFormIcon(result)}
                            </div>
                          ))}
                        </div>

                        {/* Additional Stats */}
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span>{team.won}S</span>
                          <span>{team.drawn}U</span>
                          <span>{team.lost}N</span>
                          <span>
                            {team.goalsFor}:{team.goalsAgainst}
                          </span>
                        </div>

                        {/* Badges */}
                        <div className="flex gap-1">
                          {team.bonkSponsorship > 0 && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs px-1">
                              <Coins className="w-3 h-3 mr-1" />
                              BONK
                            </Badge>
                          )}
                          {team.canStream && (
                            <Badge className="bg-red-100 text-red-800 text-xs px-1">
                              <Video className="w-3 h-3 mr-1" />
                              Stream
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleJoinTeam(team.id)}
                          className="text-xs px-2 py-1 h-7 hover:scale-105 transition-transform"
                        >
                          <Users className="w-3 h-3 mr-1" />
                          Beitreten
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs px-2 py-1 h-7 bg-green-500 hover:bg-green-600 hover:scale-105 transition-transform"
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="matches" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Aktuelle Matches</h3>
            <Button onClick={handleCreateMatch} className="bg-green-500 hover:bg-green-600">
              <Plus className="w-4 h-4 mr-2" />
              Match erstellen
            </Button>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {matches.map((match, index) => (
                <Card
                  key={match.id}
                  className={`hover:shadow-md transition-all duration-200 animate-in slide-in-from-right-2 ${
                    match.status === "live" ? "border-red-300 bg-red-50" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge className={getLeagueColor(match.league)}>{match.league}</Badge>
                        {match.status === "live" && (
                          <Badge className="bg-red-500 text-white animate-pulse">🔴 LIVE</Badge>
                        )}
                        {match.isStreaming && (
                          <Badge className="bg-purple-500 text-white animate-pulse">
                            <Video className="w-3 h-3 mr-1" />
                            STREAMING
                          </Badge>
                        )}
                        <Badge className="bg-green-100 text-green-800">
                          <Trophy className="w-3 h-3 mr-1" />
                          {match.winnerReward} BONK/Sieg
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {match.date.toLocaleDateString()} •{" "}
                        {match.date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3 flex-1">
                        <div className="text-right flex-1">
                          <div className="font-semibold text-sm">{match.homeTeam}</div>
                          <div className="flex items-center justify-end gap-1 text-xs text-gray-600 mt-1">
                            <HomeIcon className="w-3 h-3" />
                            Heim
                          </div>
                        </div>

                        <div className="text-center px-4">
                          {match.status === "finished" || match.status === "live" ? (
                            <div className="text-2xl font-bold">
                              {match.homeScore} : {match.awayScore}
                            </div>
                          ) : (
                            <div className="text-lg font-semibold text-gray-400">- : -</div>
                          )}
                          {match.status === "live" && <div className="text-xs text-red-600 animate-pulse">LIVE</div>}
                        </div>

                        <div className="text-left flex-1">
                          <div className="font-semibold text-sm">{match.awayTeam}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <Plane className="w-3 h-3" />
                            Gast
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Match Rewards Info */}
                    <div className="bg-yellow-50 rounded-lg p-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Trophy className="w-3 h-3 text-yellow-600" />
                            <span className="font-semibold">Sieg: {match.winnerReward} BONK</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-3 h-3 text-orange-600" />
                            <span className="font-semibold">Unentschieden: {match.drawReward} BONK</span>
                          </span>
                        </div>
                        {match.status === "finished" && (
                          <Badge className="bg-green-500 text-white text-xs">Belohnung ausgezahlt ✓</Badge>
                        )}
                      </div>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {match.stadium}
                      </div>
                      {match.referee && (
                        <div className="flex items-center gap-1">
                          <Shield className="w-3 h-3" />
                          Schiedsrichter: {match.referee}
                        </div>
                      )}
                      {match.viewers && (
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {match.viewers.toLocaleString()} Zuschauer online
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {match.isStreaming ? (
                        <Button
                          size="sm"
                          className="flex-1 text-xs bg-red-500 hover:bg-red-600"
                          onClick={() => handleWatchStream(match.id)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Live schauen ({match.viewers?.toLocaleString()})
                        </Button>
                      ) : match.status === "scheduled" ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs bg-transparent"
                          onClick={() => handleStartStream(match)}
                        >
                          <Camera className="w-3 h-3 mr-1" />
                          Stream starten
                        </Button>
                      ) : null}

                      <Button size="sm" variant="outline" className="flex-1 text-xs bg-transparent">
                        <MessageCircle className="w-3 h-3 mr-1" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="streams" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Radio className="w-5 h-5 text-red-500" />
              Live Streams
            </h3>
            <Badge className="bg-red-100 text-red-800 animate-pulse">{liveStreams.length} Live</Badge>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {liveStreams.map((stream, index) => (
                <Card
                  key={stream.id}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer animate-in slide-in-from-bottom-2 border-red-200 bg-red-50"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="w-16 h-12 bg-black rounded-lg flex items-center justify-center">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs animate-pulse">
                          LIVE
                        </Badge>
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-sm mb-1">{stream.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {stream.viewers.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3" />
                            {stream.quality}
                          </span>
                          {stream.hasCommentary && (
                            <span className="flex items-center gap-1">
                              <Mic className="w-3 h-3" />
                              Kommentar
                            </span>
                          )}
                          <Badge className="bg-orange-100 text-orange-800">
                            <Coins className="w-3 h-3 mr-1" />+{stream.bonkReward} BONK
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500">
                          Streamer: {stream.streamer} • {stream.language}
                        </div>
                      </div>

                      <div className="text-right">
                        <Button
                          size="sm"
                          className="bg-red-500 hover:bg-red-600 text-xs mb-2"
                          onClick={() => handleWatchStream(stream.id)}
                        >
                          <Play className="w-3 h-3 mr-1" />
                          Schauen
                        </Button>
                        <div className="text-xs text-gray-500">💰 {stream.donations} BONK Spenden</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t flex items-center justify-between">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Heart className="w-3 h-3 mr-1" />
                          Like
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Share2 className="w-3 h-3 mr-1" />
                          Teilen
                        </Button>
                        <Button size="sm" variant="outline" className="text-xs bg-transparent">
                          <Coins className="w-3 h-3 mr-1" />
                          Spenden
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="w-3 h-3" />
                        Trending #3
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Stream Setup Guide */}
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Camera className="w-5 h-5 text-purple-600" />
                    Eigenen Stream starten
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      📱 <strong>Handy-Stream:</strong> Einfach mit der App streamen
                    </p>
                    <p>
                      📹 <strong>Profi-Setup:</strong> Mehrere Kameras, Kommentar, Chat
                    </p>
                    <p>
                      💰 <strong>Verdienst:</strong> BONK durch Zuschauer und Spenden
                    </p>
                    <p>
                      🏆 <strong>Belohnungen:</strong> Streamer-Badges und Ranking
                    </p>
                  </div>
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    <Video className="w-4 h-4 mr-2" />
                    Stream-Setup starten
                  </Button>
                </CardContent>
              </Card>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="stadiums" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Lokale Stadien & Sportplätze</h3>
            <Button className="bg-blue-500 hover:bg-blue-600">
              <MapPin className="w-4 h-4 mr-2" />
              Karte anzeigen
            </Button>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="grid gap-4">
              {stadiums.map((stadium, index) => (
                <Card
                  key={stadium.id}
                  className="hover:shadow-md transition-all duration-200 cursor-pointer animate-in slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex">
                    <img
                      src={stadium.image || "/placeholder.svg"}
                      alt={stadium.name}
                      className="w-24 h-24 object-cover rounded-l-lg"
                    />
                    <CardContent className="flex-1 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{stadium.name}</h4>
                            {stadium.bonkSponsored && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                <Coins className="w-3 h-3 mr-1" />
                                BONK
                              </Badge>
                            )}
                            {stadium.streamingCapable && (
                              <Badge className="bg-red-100 text-red-800 text-xs">
                                <Video className="w-3 h-3 mr-1" />
                                Stream
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                            <MapPin className="w-3 h-3" />
                            {stadium.city}, {stadium.district}
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{stadium.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {stadium.capacity} Plätze
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {stadium.surface === "grass"
                            ? "🌱 Rasen"
                            : stadium.surface === "artificial"
                              ? "🏗️ Kunstrasen"
                              : "🌱🏗️ Mixed"}
                        </Badge>
                        {stadium.streamingCapable && (
                          <span className="flex items-center gap-1">
                            <Camera className="w-3 h-3" />
                            {stadium.cameras} Kameras
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-2">
                        {stadium.facilities.slice(0, 3).map((facility, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                        {stadium.facilities.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{stadium.facilities.length - 3} mehr
                          </Badge>
                        )}
                      </div>

                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Heimvereine:</span> {stadium.homeTeams.join(", ")}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="create" className="space-y-4">
          <div className="grid gap-4">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-green-600" />
                  Team erstellen
                </CardTitle>
                <p className="text-sm text-gray-600">Gründe dein eigenes Amateur-Team und verdiene BONK durch Siege</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Teamname (z.B. FC Musterstadt)" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Stadt" />
                  <Input placeholder="Stadtteil" />
                </div>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Liga auswählen</option>
                  <option>Kreisliga A (500 BONK/Sieg)</option>
                  <option>Kreisliga B (300 BONK/Sieg)</option>
                  <option>Bezirksliga (750 BONK/Sieg)</option>
                </select>
                <Input placeholder="Heimstadion" />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="streaming-enabled" />
                  <label htmlFor="streaming-enabled" className="text-sm">
                    Live-Streaming aktivieren (+200 BONK Setup-Bonus)
                  </label>
                </div>
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  <Trophy className="w-4 h-4 mr-2" />
                  Team gründen
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Match organisieren
                </CardTitle>
                <p className="text-sm text-gray-600">Organisiere ein Match und verdiene BONK für dein Team</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <select className="p-2 border border-gray-300 rounded-lg">
                    <option>Heimteam auswählen</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                  <select className="p-2 border border-gray-300 rounded-lg">
                    <option>Gastteam auswählen</option>
                    {teams.map((team) => (
                      <option key={team.id} value={team.id}>
                        {team.name}
                      </option>
                    ))}
                  </select>
                </div>
                <Input type="datetime-local" />
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Stadion auswählen</option>
                  {stadiums.map((stadium) => (
                    <option key={stadium.id} value={stadium.id}>
                      {stadium.name} {stadium.streamingCapable ? "📺" : ""}
                    </option>
                  ))}
                </select>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="bonk-reward" />
                    <label htmlFor="bonk-reward" className="text-sm">
                      BONK-Belohnung für Zuschauer (100 BONK)
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="enable-streaming" />
                    <label htmlFor="enable-streaming" className="text-sm">
                      Live-Streaming aktivieren (+50 BONK pro Zuschauer)
                    </label>
                  </div>
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600" onClick={handleCreateMatch}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Match erstellen
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Stadion registrieren
                </CardTitle>
                <p className="text-sm text-gray-600">Füge einen neuen Sportplatz zur Plattform hinzu</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input placeholder="Stadionname" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Stadt" />
                  <Input placeholder="Stadtteil" />
                </div>
                <Input placeholder="Kapazität" type="number" />
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Bodenbelag</option>
                  <option>Naturrasen</option>
                  <option>Kunstrasen</option>
                  <option>Mixed</option>
                </select>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Ausstattung:</label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {["Flutlicht", "Umkleiden", "Kantine", "Parkplatz", "VIP-Bereich", "Fanshop"].map((facility) => (
                      <label key={facility} className="flex items-center gap-2">
                        <input type="checkbox" />
                        {facility}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Streaming-Setup:</label>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" />
                      Streaming-fähig (Kameras verfügbar)
                    </label>
                    <Input placeholder="Anzahl Kameras" type="number" className="text-sm" />
                  </div>
                </div>
                <Button className="w-full bg-purple-500 hover:bg-purple-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  Stadion registrieren
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Stream Setup Modal */}
      <Dialog open={showStreamModal} onOpenChange={setShowStreamModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Video className="w-5 h-5 text-red-600" />
              Live-Stream starten
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                <strong>Match:</strong> {selectedMatch?.homeTeam} vs {selectedMatch?.awayTeam}
              </p>
              <p>
                <strong>Stadion:</strong> {selectedMatch?.stadium}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Stream-Qualität:</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg mt-1">
                  <option>Mobile (720p) - Handy</option>
                  <option>HD (1080p) - Standard</option>
                  <option>4K (2160p) - Profi</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="commentary" />
                <label htmlFor="commentary" className="text-sm">
                  Live-Kommentar aktivieren (+20 BONK Bonus)
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="chat" />
                <label htmlFor="chat" className="text-sm">
                  Chat für Zuschauer aktivieren
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="donations" />
                <label htmlFor="donations" className="text-sm">
                  BONK-Spenden von Zuschauern erlauben
                </label>
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="text-sm">
                <p className="font-medium text-orange-800 mb-1">💰 Verdienstmöglichkeiten:</p>
                <ul className="text-orange-700 space-y-1">
                  <li>• +5 BONK pro Zuschauer</li>
                  <li>• +20 BONK für Live-Kommentar</li>
                  <li>• +50% der Zuschauer-Spenden</li>
                  <li>• Streamer-Badge nach 10 Streams</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowStreamModal(false)}>
                Abbrechen
              </Button>
              <Button
                className="flex-1 bg-red-500 hover:bg-red-600"
                onClick={() => {
                  setShowStreamModal(false)
                  toast({
                    title: "Stream gestartet! 📺",
                    description: "Dein Live-Stream ist jetzt aktiv. Viel Erfolg!",
                  })
                }}
              >
                <Play className="w-4 h-4 mr-2" />
                Stream starten
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
