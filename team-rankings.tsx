"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Trophy, Users, MapPin, X, Search, Plus, Calendar } from "lucide-react"
import { PointsSystem, type TeamStats } from "@/lib/points-system"

interface TeamRankingsProps {
  isOpen: boolean
  onClose: () => void
  city: string
}

export function TeamRankings({ isOpen, onClose, city }: TeamRankingsProps) {
  const [activeTab, setActiveTab] = useState("professional")
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateMatch, setShowCreateMatch] = useState(false)

  const professionalTeams = PointsSystem.getRankings("professional")
  const amateurTeams = PointsSystem.getRankings("amateur")
  const localTeams = PointsSystem.getTeamsByCity(city)

  const filteredTeams = (teams: TeamStats[]) => {
    return teams.filter((team) => team.teamName.toLowerCase().includes(searchQuery.toLowerCase()))
  }

  const teams = [
    { name: "Borussia Dortmund", points: 45, wins: 14, draws: 3, losses: 2 },
    { name: "FC Bayern München", points: 43, wins: 13, draws: 4, losses: 2 },
    { name: "RB Leipzig", points: 38, wins: 12, draws: 2, losses: 5 },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Team Rankings 🏆
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{city}</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 overflow-y-auto max-h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 m-4 mb-0">
              <TabsTrigger value="professional">Profi Liga</TabsTrigger>
              <TabsTrigger value="amateur">Amateur Liga</TabsTrigger>
              <TabsTrigger value="local">Lokal ({city})</TabsTrigger>
            </TabsList>

            <div className="p-4">
              <div className="flex gap-3 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Team suchen..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setShowCreateMatch(true)} className="bg-green-500 hover:bg-green-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Match erstellen
                </Button>
              </div>
            </div>

            <TabsContent value="professional" className="px-4 pb-4">
              <div className="space-y-3">
                {filteredTeams(professionalTeams).map((team, index) => (
                  <div key={team.teamId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"} text-white`}
                      >
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-semibold text-sm">{team.teamName}</p>
                        <p className="text-xs text-gray-600">
                          {team.wins}W {team.draws}D {team.losses}L
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{team.points}</p>
                      <p className="text-xs text-gray-600">pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="amateur" className="px-4 pb-4">
              <div className="space-y-3">
                {filteredTeams(amateurTeams).map((team, index) => (
                  <div key={team.teamId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"} text-white`}
                      >
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-semibold text-sm">{team.teamName}</p>
                        <p className="text-xs text-gray-600">
                          {team.wins}W {team.draws}D {team.losses}L
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{team.points}</p>
                      <p className="text-xs text-gray-600">pts</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="local" className="px-4 pb-4">
              <div className="space-y-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-green-800 mb-2">Teams in {city}</h4>
                    <p className="text-sm text-green-700">
                      Hier findest du alle Teams aus deiner Stadt. Erstelle Matches und lade andere Teams zum Spielen
                      ein!
                    </p>
                  </CardContent>
                </Card>

                {localTeams.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-500 mb-2">Keine Teams in {city}</h3>
                    <p className="text-gray-400 mb-4">Sei der erste und erstelle ein Team!</p>
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Team erstellen
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {localTeams.map((team, index) => (
                      <div key={team.teamId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : "bg-orange-600"} text-white`}
                          >
                            {index + 1}
                          </Badge>
                          <div>
                            <p className="font-semibold text-sm">{team.teamName}</p>
                            <p className="text-xs text-gray-600">
                              {team.wins}W {team.draws}D {team.losses}L
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{team.points}</p>
                          <p className="text-xs text-gray-600">pts</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>

        {/* Create Match Modal */}
        {showCreateMatch && (
          <div className="fixed inset-0 bg-black/50 z-60 flex items-center justify-center p-4">
            <Card className="w-full max-w-md">
              <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Match erstellen
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Heimteam</label>
                  <Input placeholder="Dein Team" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gastteam</label>
                  <Input placeholder="Gegnerisches Team" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Datum & Zeit</label>
                  <Input type="datetime-local" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Spielort</label>
                  <Input placeholder="z.B. Sportplatz Musterstraße" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Liga</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg">
                    <option>Amateur</option>
                    <option>Kreisliga A</option>
                    <option>Kreisliga B</option>
                    <option>Bezirksliga</option>
                  </select>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setShowCreateMatch(false)} className="flex-1">
                    Abbrechen
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCreateMatch(false)
                      alert("Match erstellt! Andere Teams können jetzt beitreten.")
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    Erstellen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </Card>
    </div>
  )
}
