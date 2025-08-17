"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Sparkles, Coins, Trophy, Timer, Zap, Upload, Camera } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface NFTMintingProps {
  isOpen: boolean
  onClose: () => void
}

interface MintedNFT {
  id: string
  name: string
  description: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  image: string
  value: number
  attributes: Array<{ trait_type: string; value: string }>
}

export function NFTMinting({ isOpen, onClose }: NFTMintingProps) {
  const [step, setStep] = useState<"upload" | "details" | "minting" | "success">("upload")
  const [isMinting, setIsMinting] = useState(false)
  const [mintProgress, setMintProgress] = useState(0)
  const [mintedNFT, setMintedNFT] = useState<MintedNFT | null>(null)
  const [nftName, setNftName] = useState("")
  const [nftDescription, setNftDescription] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  const rarities = [
    { name: "Common", probability: 60, color: "bg-gray-500", cost: 50 },
    { name: "Rare", probability: 25, color: "bg-blue-500", cost: 100 },
    { name: "Epic", probability: 12, color: "bg-purple-500", cost: 200 },
    { name: "Legendary", probability: 3, color: "bg-orange-500", cost: 500 },
  ]

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleMint = async () => {
    if (!nftName || !nftDescription || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload an image",
        variant: "destructive",
      })
      return
    }

    setStep("minting")
    setIsMinting(true)
    setMintProgress(0)

    const interval = setInterval(() => {
      setMintProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsMinting(false)

          // Generate random rarity based on probabilities
          const random = Math.random() * 100
          let selectedRarity = "Common"
          let cumulativeProbability = 0

          for (const rarity of rarities) {
            cumulativeProbability += rarity.probability
            if (random <= cumulativeProbability) {
              selectedRarity = rarity.name
              break
            }
          }

          const newNFT: MintedNFT = {
            id: `nft_${Date.now()}`,
            name: nftName,
            description: nftDescription,
            rarity: selectedRarity as "Common" | "Rare" | "Epic" | "Legendary",
            image: previewUrl,
            value: Math.floor(Math.random() * 1000) + 100,
            attributes: [
              { trait_type: "Creator", value: "You" },
              { trait_type: "Rarity", value: selectedRarity },
              { trait_type: "Mint Date", value: new Date().toLocaleDateString() },
              { trait_type: "Type", value: "Football Moment" },
            ],
          }

          setMintedNFT(newNFT)
          setStep("success")

          toast({
            title: "NFT Minted Successfully!",
            description: `Your ${selectedRarity} NFT has been created`,
          })

          return 100
        }
        return prev + 5
      })
    }, 100)
  }

  const resetMinting = () => {
    setStep("upload")
    setIsMinting(false)
    setMintProgress(0)
    setMintedNFT(null)
    setNftName("")
    setNftDescription("")
    setSelectedFile(null)
    setPreviewUrl("")
  }

  const getRarityColor = (rarity: string) => {
    const rarityData = rarities.find((r) => r.name === rarity)
    return rarityData?.color || "bg-gray-500"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              NFT Minting Studio
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {step === "upload" && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <Upload className="w-16 h-16 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Upload Your Football Moment</h3>
                <p className="text-gray-600 text-sm">Turn your epic football photos into valuable NFTs!</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Image</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {previewUrl ? (
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                      ) : (
                        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      )}
                      <p className="text-sm text-gray-600">
                        {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </div>

                <Button
                  onClick={() => setStep("details")}
                  disabled={!selectedFile}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {step === "details" && (
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-bold text-gray-800 mb-2">NFT Details</h3>
                <p className="text-gray-600 text-sm">Add information about your NFT</p>
              </div>

              {previewUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="NFT Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">NFT Name</label>
                  <Input
                    placeholder="e.g., Epic Goal Moment #001"
                    value={nftName}
                    onChange={(e) => setNftName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <Textarea
                    placeholder="Describe your football moment..."
                    value={nftDescription}
                    onChange={(e) => setNftDescription(e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Rarity Chances</h4>
                  <div className="space-y-2">
                    {rarities.map((rarity) => (
                      <div key={rarity.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${rarity.color}`} />
                          <span className="text-sm font-medium">{rarity.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">{rarity.probability}%</span>
                          <Badge variant="outline" className="text-xs">
                            {rarity.cost} BONK
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep("upload")} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleMint}
                    disabled={!nftName || !nftDescription}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    Mint NFT
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === "minting" && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                <Zap className="w-16 h-16 text-purple-600 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Minting Your NFT...</h3>
                <p className="text-gray-600 text-sm">Creating something amazing on the blockchain!</p>
              </div>
              <div className="space-y-3">
                <Progress value={mintProgress} className="w-full" />
                <p className="text-sm text-gray-500">{mintProgress}% Complete</p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>Estimated time: {Math.max(1, Math.ceil((100 - mintProgress) / 10))} seconds</span>
                </div>
              </div>
            </div>
          )}

          {step === "success" && mintedNFT && (
            <div className="text-center space-y-6">
              <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-16 h-16 text-green-600" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-green-600 mb-2">🎉 NFT Minted Successfully!</h3>
                <p className="text-gray-600 text-sm">Your football moment is now immortalized on the blockchain</p>
              </div>

              <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
                <CardContent className="p-4">
                  <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                    <img
                      src={mintedNFT.image || "/placeholder.svg"}
                      alt={mintedNFT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center space-y-2">
                    <h4 className="font-bold text-gray-800">{mintedNFT.name}</h4>
                    <Badge className={`${getRarityColor(mintedNFT.rarity)} text-white`}>{mintedNFT.rarity}</Badge>
                    <div className="flex items-center justify-center gap-2 text-orange-600">
                      <Coins className="w-4 h-4" />
                      <span className="font-bold">Estimated Value: {mintedNFT.value} BONK</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <Button onClick={onClose} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                  View in Collection
                </Button>
                <Button variant="outline" onClick={resetMinting} className="w-full bg-transparent">
                  Mint Another NFT
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
