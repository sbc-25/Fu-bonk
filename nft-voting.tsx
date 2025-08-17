"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, Coins, Trophy, Users, X } from "lucide-react"
import { BonkPayment } from "./bonk-payment"
import { walletService } from "@/lib/wallet"

interface NFTVotingProps {
  isOpen: boolean
  onClose: () => void
}

export function NFTVoting({ isOpen, onClose }: NFTVotingProps) {
  const [userVotes, setUserVotes] = useState<Record<number, boolean>>({})
  const [bonkBalance, setBonkBalance] = useState(1250)
  const [showPayment, setShowPayment] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null)
  const wallet = walletService.getWallet()

  const nftContestants = [
    {
      id: 1,
      name: "Legendary Haaland Goal",
      creator: "BVBOfficial",
      votes: 15420,
      percentage: 45,
      image: "/placeholder.svg?height=200&width=150",
      rarity: "Legendary",
      voteCost: 10,
    },
    {
      id: 2,
      name: "Epic Reus Freekick",
      creator: "FootballArt",
      votes: 12350,
      percentage: 36,
      image: "/placeholder.svg?height=200&width=150",
      rarity: "Epic",
      voteCost: 5,
    },
    {
      id: 3,
      name: "Rare Stadium Moment",
      creator: "YellowWall",
      votes: 6540,
      percentage: 19,
      image: "/placeholder.svg?height=200&width=150",
      rarity: "Rare",
      voteCost: 3,
    },
  ]

  const handleVote = (nftId: number, voteCost: number) => {
    if (!wallet?.publicKey) {
      // Show wallet connection required
      return
    }

    if (bonkBalance >= voteCost && !userVotes[nftId]) {
      setSelectedNFT(nftId)
      setShowPayment(true)
    }
  }

  const handlePaymentSuccess = (signature: string) => {
    if (selectedNFT) {
      const nft = nftContestants.find((n) => n.id === selectedNFT)
      if (nft) {
        setBonkBalance((prev) => prev - nft.voteCost)
        setUserVotes((prev) => ({ ...prev, [selectedNFT]: true }))
      }
    }
    setShowPayment(false)
    setSelectedNFT(null)
  }

  const totalVotes = nftContestants.reduce((sum, nft) => sum + nft.votes, 0)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Live NFT Voting
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Coins className="w-3 h-3 mr-1" />
              {bonkBalance} BONK
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              <Users className="w-3 h-3 mr-1" />
              {totalVotes.toLocaleString()} Votes
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            {nftContestants.map((nft, index) => (
              <Card
                key={nft.id}
                className={`border-2 ${index === 0 ? "border-yellow-300 bg-yellow-50" : "border-gray-200"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-20 h-24 object-cover rounded-lg"
                      />
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <Trophy className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-sm">{nft.name}</h3>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            nft.rarity === "Legendary"
                              ? "bg-yellow-100 text-yellow-800"
                              : nft.rarity === "Epic"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {nft.rarity}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-5 h-5">
                          <AvatarImage src="/placeholder.svg?height=20&width=20" />
                          <AvatarFallback className="text-xs">{nft.creator[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{nft.creator}</span>
                      </div>

                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{nft.votes.toLocaleString()} votes</span>
                          <span className="text-sm text-gray-600">{nft.percentage}%</span>
                        </div>
                        <Progress value={nft.percentage} className="h-2" />
                      </div>

                      <Button
                        onClick={() => handleVote(nft.id, nft.voteCost)}
                        disabled={bonkBalance < nft.voteCost || userVotes[nft.id] || !wallet?.publicKey}
                        className={`w-full text-sm ${
                          userVotes[nft.id] ? "bg-green-500 hover:bg-green-600" : "bg-orange-500 hover:bg-orange-600"
                        }`}
                      >
                        {!wallet?.publicKey ? (
                          "Connect Wallet"
                        ) : userVotes[nft.id] ? (
                          "Voted ✓"
                        ) : (
                          <>
                            <Coins className="w-3 h-3 mr-1" />
                            Vote ({nft.voteCost} BONK)
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Live Voting Info</span>
            </div>
            <p className="text-xs text-orange-700">
              Voting während Live-Matches erhöht NFT-Werte! Chat-Nachrichten kosten 1 BONK und unterstützen das
              Voting-System.
            </p>
          </div>
        </CardContent>
      </Card>
      <BonkPayment
        isOpen={showPayment}
        onClose={() => {
          setShowPayment(false)
          setSelectedNFT(null)
        }}
        recipient="VOTING_TREASURY_ADDRESS" // Replace with actual treasury address
        amount={selectedNFT ? nftContestants.find((n) => n.id === selectedNFT)?.voteCost : undefined}
        purpose="NFT voting fee"
        onSuccess={handlePaymentSuccess}
      />
    </div>
  )
}
