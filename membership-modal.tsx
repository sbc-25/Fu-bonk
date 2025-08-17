"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Crown, Star, Zap, Diamond, X, Coins } from "lucide-react"
import { MembershipService, type MembershipTier } from "@/lib/membership"
import { InternalWalletService } from "@/lib/internal-wallet"

interface MembershipModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MembershipModal({ isOpen, onClose }: MembershipModalProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const wallet = InternalWalletService.getWallet()
  const currentMembership = MembershipService.getUserMembership()

  const handlePurchase = async (tier: MembershipTier) => {
    if (!wallet || wallet.bonkBalance < tier.price) {
      alert("Nicht genug BONK für diese Mitgliedschaft!")
      return
    }

    setIsPurchasing(true)
    setSelectedTier(tier.id)

    // Simulate purchase process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Deduct BONK and activate membership
    InternalWalletService.updateBalance(-tier.price)
    MembershipService.purchaseMembership(tier.id)

    setIsPurchasing(false)
    setSelectedTier(null)
    alert(`${tier.name} Mitgliedschaft erfolgreich aktiviert!`)
  }

  const getTierIcon = (tierId: string) => {
    switch (tierId) {
      case "bronze":
        return <Star className="w-6 h-6 text-amber-600" />
      case "silver":
        return <Zap className="w-6 h-6 text-gray-400" />
      case "gold":
        return <Crown className="w-6 h-6 text-yellow-500" />
      case "diamond":
        return <Diamond className="w-6 h-6 text-blue-500" />
      default:
        return <Star className="w-6 h-6" />
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl max-h-[90vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5" />
              Premium Mitgliedschaften
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-white/90">
            Werde Premium-Mitglied und erhalte exklusive Vorteile, höhere Belohnungen und Zugang zu besonderen Features!
          </p>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Current Membership Status */}
          {currentMembership && (
            <Card className="mb-6 bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-800">
                      Aktive Mitgliedschaft:{" "}
                      {MembershipService.TIERS.find((t) => t.id === currentMembership.tier)?.name}
                    </p>
                    <p className="text-sm text-green-600">
                      Gültig bis: {currentMembership.expiresAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Membership Tiers */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MembershipService.TIERS.map((tier) => {
              const isCurrentTier = currentMembership?.tier === tier.id
              const canAfford = wallet && wallet.bonkBalance >= tier.price

              return (
                <Card
                  key={tier.id}
                  className={`relative border-2 transition-all hover:shadow-lg ${
                    tier.id === "diamond"
                      ? "border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50"
                      : tier.id === "gold"
                        ? "border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50"
                        : tier.id === "silver"
                          ? "border-gray-400 bg-gradient-to-br from-gray-50 to-slate-50"
                          : "border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50"
                  }`}
                >
                  {tier.id === "gold" && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white">
                      Beliebt
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="flex justify-center mb-3">{getTierIcon(tier.id)}</div>
                    <CardTitle className="text-lg">{tier.name}</CardTitle>
                    <div className="text-3xl font-bold flex items-center justify-center gap-1">
                      <Coins className="w-6 h-6 text-orange-500" />
                      {tier.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600">{tier.duration} Tage gültig</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Separator />

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Vorteile:</h4>
                      <ul className="space-y-1">
                        {tier.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Staking Multiplikator:</span>
                        <Badge variant="outline">{MembershipService.getStakingMultiplier(tier.id)}x</Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Chat Rabatt:</span>
                        <Badge variant="outline">
                          {tier.id === "diamond"
                            ? "Kostenlos"
                            : tier.id === "gold"
                              ? "80%"
                              : tier.id === "silver"
                                ? "50%"
                                : "0%"}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      onClick={() => handlePurchase(tier)}
                      disabled={isCurrentTier || !wallet || !canAfford || (isPurchasing && selectedTier === tier.id)}
                      className={`w-full ${
                        tier.id === "diamond"
                          ? "bg-blue-500 hover:bg-blue-600"
                          : tier.id === "gold"
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : tier.id === "silver"
                              ? "bg-gray-500 hover:bg-gray-600"
                              : "bg-amber-500 hover:bg-amber-600"
                      }`}
                    >
                      {isPurchasing && selectedTier === tier.id
                        ? "Wird gekauft..."
                        : isCurrentTier
                          ? "Aktiv"
                          : !wallet
                            ? "Wallet erforderlich"
                            : !canAfford
                              ? "Nicht genug BONK"
                              : `${tier.icon} Kaufen`}
                    </Button>

                    {!canAfford && wallet && (
                      <p className="text-xs text-red-500 text-center">
                        Du benötigst {(tier.price - wallet.bonkBalance).toLocaleString()} mehr BONK
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Benefits Comparison */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Vergleich der Mitgliedschaften</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Feature</th>
                      <th className="text-center p-2">Bronze</th>
                      <th className="text-center p-2">Silver</th>
                      <th className="text-center p-2">Gold</th>
                      <th className="text-center p-2">Diamond</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr className="border-b">
                      <td className="p-2">Chat Zugang</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Voting Power</td>
                      <td className="text-center p-2">1x</td>
                      <td className="text-center p-2">2x</td>
                      <td className="text-center p-2">3x</td>
                      <td className="text-center p-2">10x</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">BONK Rewards</td>
                      <td className="text-center p-2">1x</td>
                      <td className="text-center p-2">2x</td>
                      <td className="text-center p-2">5x</td>
                      <td className="text-center p-2">10x</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Exclusive NFTs</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">VIP Chat Rooms</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2">Premium Pools</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                      <td className="text-center p-2">✅</td>
                    </tr>
                    <tr>
                      <td className="p-2">Direct Team Contact</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">❌</td>
                      <td className="text-center p-2">✅</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Wallet Status */}
          {!wallet && (
            <Card className="mt-6 bg-red-50 border-red-200">
              <CardContent className="p-4 text-center">
                <p className="text-red-700">
                  Du benötigst ein Wallet, um Mitgliedschaften zu kaufen. Erstelle zuerst ein Wallet!
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
