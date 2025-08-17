"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, MapPin, Star, Users, X } from 'lucide-react'

interface CitySelectorProps {
  isOpen: boolean
  onClose: () => void
  currentCity: string
  onCitySelect: (city: string) => void
}

interface City {
  name: string
  country: string
  stadium: string
  team: string
  users: number
  isPopular?: boolean
  flag: string
}

export function CitySelector({ isOpen, onClose, currentCity, onCitySelect }: CitySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const cities: City[] = [
    {
      name: "Dortmund",
      country: "Germany",
      stadium: "Signal Iduna Park",
      team: "Borussia Dortmund",
      users: 15420,
      isPopular: true,
      flag: "🇩🇪"
    },
    {
      name: "München",
      country: "Germany", 
      stadium: "Allianz Arena",
      team: "Bayern München",
      users: 18750,
      isPopular: true,
      flag: "🇩🇪"
    },
    {
      name: "Madrid",
      country: "Spain",
      stadium: "Santiago Bernabéu",
      team: "Real Madrid",
      users: 22340,
      isPopular: true,
      flag: "🇪🇸"
    },
    {
      name: "Barcelona",
      country: "Spain",
      stadium: "Camp Nou",
      team: "FC Barcelona", 
      users: 19680,
      isPopular: true,
      flag: "🇪🇸"
    },
    {
      name: "London",
      country: "England",
      stadium: "Wembley Stadium",
      team: "Multiple Teams",
      users: 16890,
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
    },
    {
      name: "Manchester",
      country: "England",
      stadium: "Old Trafford",
      team: "Manchester United",
      users: 14230,
      flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿"
    },
    {
      name: "Paris",
      country: "France",
      stadium: "Parc des Princes",
      team: "Paris Saint-Germain",
      users: 12560,
      flag: "🇫🇷"
    },
    {
      name: "Milano",
      country: "Italy",
      stadium: "San Siro",
      team: "AC Milan / Inter",
      users: 11340,
      flag: "🇮🇹"
    }
  ]

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    city.team.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCitySelect = (cityName: string) => {
    onCitySelect(cityName)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <MapPin className="w-6 h-6 text-orange-600" />
              Choose Your City
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search cities or teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <ScrollArea className="h-[50vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredCities.map((city) => (
                <Card
                  key={city.name}
                  className={`cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                    currentCity === city.name 
                      ? 'border-2 border-orange-500 bg-orange-50' 
                      : 'border hover:border-orange-300'
                  }`}
                  onClick={() => handleCitySelect(city.name)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{city.flag}</span>
                        <div>
                          <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            {city.name}
                            {city.isPopular && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                <Star className="w-3 h-3 mr-1" />
                                Popular
                              </Badge>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">{city.country}</p>
                        </div>
                      </div>
                      {currentCity === city.name && (
                        <Badge className="bg-orange-500 text-white">
                          Current
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-1 mb-3">
                      <p className="text-sm text-gray-700">
                        <strong>Stadium:</strong> {city.stadium}
                      </p>
                      <p className="text-sm text-gray-700">
                        <strong>Team:</strong> {city.team}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        {city.users.toLocaleString()} users
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="text-center text-sm text-gray-500">
            <p>Can't find your city? <a href="#" className="text-orange-600 hover:underline">Request it here</a></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
