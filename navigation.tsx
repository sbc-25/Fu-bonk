"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Home, Trophy, Gamepad2, Video, Users, User, Menu, Wallet, Settings, LogOut, Coins } from "lucide-react"
import { useWallet } from "./wallet-provider"

interface NavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  notifications?: number
}

export function Navigation({ activeTab, onTabChange, notifications = 0 }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { wallet, disconnect } = useWallet()

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "marketplace", label: "Marketplace", icon: Trophy },
    { id: "games", label: "Games", icon: Gamepad2 },
    { id: "live", label: "Live", icon: Video },
    { id: "social", label: "Social", icon: Users },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleNavClick = (tabId: string) => {
    onTabChange(tabId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-gradient-to-b from-orange-500 to-yellow-500 text-white">
            <SheetHeader>
              <SheetTitle className="text-white text-xl font-bold">BONK VS Platform</SheetTitle>
              <SheetDescription className="text-orange-100">The ultimate football fan experience</SheetDescription>
            </SheetHeader>

            <div className="mt-8 space-y-4">
              {wallet && (
                <div className="bg-white/10 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm font-medium">Connected Wallet</span>
                  </div>
                  <div className="text-xs opacity-75 mb-2">
                    {wallet.address.slice(0, 8)}...{wallet.address.slice(-8)}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Coins className="w-3 h-3" />
                      <span>{wallet.balance?.bonk?.toLocaleString() || 0} BONK</span>
                    </div>
                  </div>
                </div>
              )}

              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start text-white hover:bg-white/20 ${
                    activeTab === item.id ? "bg-white/20" : ""
                  }`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {item.id === "social" && notifications > 0 && (
                    <Badge className="ml-auto bg-red-500 text-white">{notifications}</Badge>
                  )}
                </Button>
              ))}

              <div className="border-t border-white/20 pt-4 mt-6 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/20">
                  <Settings className="w-5 h-5 mr-3" />
                  Settings
                </Button>
                {wallet && (
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-white hover:bg-white/20"
                    onClick={disconnect}
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Disconnect Wallet
                  </Button>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation - Hidden for now, can be implemented later */}
      <div className="hidden md:block">{/* Desktop nav implementation would go here */}</div>
    </>
  )
}
