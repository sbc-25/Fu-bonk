"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Gamepad2, Coins, Trophy, Play, Star } from "lucide-react"

interface MiniGamesProps {
  isOpen: boolean
  onClose: () => void
}

export function MiniGames({ isOpen, onClose }: MiniGamesProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const [gameScore, setGameScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const games = [
    {
      id: "penalty",
      name: "Penalty Shootout",
      description: "Test your accuracy and score goals!",
      icon: "⚽",
      reward: 20,
      difficulty: "Easy",
      unlocked: true,
    },
    {
      id: "memory",
      name: "Football Memory",
      description: "Match pairs of football cards",
      icon: "🧠",
      reward: 35,
      difficulty: "Medium",
      unlocked: true,
    },
    {
      id: "reflexes",
      name: "Goalkeeper Reflexes",
      description: "Save as many shots as possible!",
      icon: "⚡",
      reward: 30,
      difficulty: "Hard",
      unlocked: true,
    },
    {
      id: "trivia",
      name: "Football Trivia",
      description: "Test your football knowledge",
      icon: "🧩",
      reward: 25,
      difficulty: "Medium",
      unlocked: false,
      unlockLevel: 5,
    },
    {
      id: "strategy",
      name: "Team Strategy",
      description: "Build the perfect formation",
      icon: "📋",
      reward: 50,
      difficulty: "Expert",
      unlocked: false,
      unlockLevel: 10,
    },
    {
      id: "timing",
      name: "Perfect Timing",
      description: "Hit the target at the right moment",
      icon: "🎯",
      reward: 40,
      difficulty: "Hard",
      unlocked: false,
      unlockLevel: 7,
    },
  ]

  const playGame = (gameId: string) => {
    setSelectedGame(gameId)
    setIsPlaying(true)
    setGameScore(0)

    // Simulate game play
    setTimeout(() => {
      const score = Math.floor(Math.random() * 100) + 50
      setGameScore(score)
      setIsPlaying(false)
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Mini Games 🎮
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {selectedGame && isPlaying ? (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <span className="text-4xl animate-bounce">{games.find((g) => g.id === selectedGame)?.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Playing...</h3>
                <p className="text-gray-600">Game in progress!</p>
              </div>
            </div>
          ) : selectedGame && gameScore > 0 ? (
            <div className="text-center space-y-4">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Game Complete!</h3>
                <p className="text-2xl font-bold text-blue-600">Score: {gameScore}</p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Coins className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-orange-600">
                    +{games.find((g) => g.id === selectedGame)?.reward} BONK
                  </span>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedGame(null)
                  setGameScore(0)
                }}
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                Play Again
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Choose Your Game</h3>
                <p className="text-gray-600">Play games and earn BONK rewards!</p>
              </div>

              <div className="grid gap-4">
                {games.map((game) => (
                  <Card
                    key={game.id}
                    className={`border-2 cursor-pointer transition-all ${
                      game.unlocked
                        ? "border-gray-200 hover:border-blue-300 hover:shadow-md"
                        : "border-gray-100 opacity-60"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{game.icon}</span>
                          <div>
                            <h4 className="font-semibold">{game.name}</h4>
                            <p className="text-sm text-gray-600">{game.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge
                                className={
                                  game.difficulty === "Easy"
                                    ? "bg-green-100 text-green-800"
                                    : game.difficulty === "Medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : game.difficulty === "Hard"
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-red-100 text-red-800"
                                }
                              >
                                {game.difficulty}
                              </Badge>
                              <div className="flex items-center gap-1 text-orange-600">
                                <Coins className="w-3 h-3" />
                                <span className="text-sm font-bold">+{game.reward}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {game.unlocked ? (
                          <Button size="sm" onClick={() => playGame(game.id)} className="bg-blue-500 hover:bg-blue-600">
                            <Play className="w-4 h-4 mr-1" />
                            Play
                          </Button>
                        ) : (
                          <div className="text-center">
                            <Star className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <p className="text-xs text-gray-500">Level {game.unlockLevel}</p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
