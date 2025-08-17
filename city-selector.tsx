"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, MapPin, Users, Calendar } from "lucide-react"

interface CitySelectorProps {
  isOpen: boolean
  onClose: () => void
  onCitySelect: (city: string) => void
  currentCity: string
}

const cities = [
  {
    name: "Berlin",
    team: "Hertha BSC",
    stadium: "Olympiastadion",
    capacity: "74,475",
    nextMatch: "vs Bayern Munich",
    matchDate: "2024-01-15",
    color: "bg-blue-500",
    users: 15420,
  },
  {
    name: "Munich",
    team: "Bayern Munich",
    stadium: "Allianz Arena",
    capacity: "75,000",
    nextMatch: "vs Borussia Dortmund",
    matchDate: "2024-01-20",
    color: "bg-red-500",
    users: 28750,
  },
  {
    name: "Dortmund",
    team: "Borussia Dortmund",
    stadium: "Signal Iduna Park",
    capacity: "81,365",
    nextMatch: "vs RB Leipzig",
    matchDate: "2024-01-18",
    color: "bg-yellow-500",
    users: 22340,
  },
  {
    name: "Hamburg",
    team: "Hamburger SV",
    stadium: "Volksparkstadion",
    capacity: "57,000",
    nextMatch: "vs FC St. Pauli",
    matchDate: "2024-01-22",
    color: "bg-blue-600",
    users: 12890,
  },
  {
    name: "Frankfurt",
    team: "Eintracht Frankfurt",
    stadium: "Deutsche Bank Park",
    capacity: "51,500",
    nextMatch: "vs Bayer Leverkusen",
    matchDate: "2024-01-25",
    color: "bg-red-600",
    users: 18650,
  },
  {
    name: "Cologne",
    team: "1. FC Köln",
    stadium: "RheinEnergieStadion",
    capacity: "50,000",
    nextMatch: "vs Borussia Mönchengladbach",
    matchDate: "2024-01-28",
    color: "bg-red-400",
    users: 14230,
  },
]

export function CitySelector({ isOpen, onClose, onCitySelect, currentCity }: CitySelectorProps) {
  const [selectedCity, setSelectedCity] = useState(currentCity)

  if (!isOpen) return null

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName)
    onCitySelect(cityName)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[80vh] overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Select Your City
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cities.map((city) => (
              <Card
                key={city.name}
                className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                  selectedCity === city.name ? "border-green-500 ring-2 ring-green-200" : "border-gray-200"
                }`}
                onClick={() => handleCitySelect(city.name)}
              >
                <CardHeader className={`${city.color} text-white p-4`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-lg">{city.name}</h3>
                      <p className="text-sm opacity-90">{city.team}</p>
                    </div>
                    {selectedCity === city.name && <Badge className="bg-white text-green-600">Selected</Badge>}
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{city.stadium}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{city.capacity} capacity</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{city.nextMatch}</span>
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Active Users</span>
                      <Badge variant="secondary">{city.users.toLocaleString()}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Why Choose Your City?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Connect with local fans and supporters</li>
              <li>• Access city-specific events and meetups</li>
              <li>• Earn bonus BONK tokens for local activities</li>
              <li>• Get exclusive stadium offers and discounts</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
