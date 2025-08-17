"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, Home, Gamepad2, Video, Trophy, Target, Users } from 'lucide-react'
import { useState } from "react"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  notifications: number
}

export function Navigation({ activeTab, onTabChange, notifications }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "live", label: "Live", icon: Video },
    { id: "nft", label: "NFTs", icon: Trophy },
    { id: "amateur", label: "Amateur", icon: Target },
    { id: "social", label: "Social", icon: Users },
  ]

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/20 md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  onTabChange(item.id)
                  setIsMenuOpen(false)
                }}
              >
                <item.icon className="w-4 h-4 mr-2" />
                {item.label}
                {item.id === "social" && notifications > 0 && (
                  <Badge className="ml-auto bg-red-500 text-white">
                    {notifications}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </div>
      )}
      {/* Navigation is handled by the main tabs component */}
    </div>
  )
}
