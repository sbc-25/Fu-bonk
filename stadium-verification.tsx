"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, X } from "lucide-react"

interface StadiumVerificationProps {
  isOpen: boolean
  onClose: () => void
}

const verifiedStadiums = [
  {
    id: "signal-iduna",
    name: "Signal Iduna Park",
    team: "Borussia Dortmund",
    location: "Dortmund",
    capacity: 81365,
    isLive: true,
    viewers: 15420,
  },
  {
    id: "allianz-arena",
    name: "Allianz Arena",
    team: "FC Bayern München",
    location: "München",
    capacity: 75000,
    isLive: false,
    viewers: 0,
  },
  {
    id: "veltins-arena",
    name: "Veltins-Arena",
    team: "FC Schalke 04",
    location: "Gelsenkirchen",
    capacity: 62271,
    isLive: true,
    viewers: 8934,
  },
]

export function StadiumVerification({ isOpen, onClose }: StadiumVerificationProps) {
  const [activeTab, setActiveTab] = useState<"verified" | "apply">("verified")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Stadium Verification 🏟️
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center">
            <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verify Your Location</h3>
            <p className="text-gray-600 mb-4">Confirm you're at the stadium to unlock exclusive features!</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600">Start Verification</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
