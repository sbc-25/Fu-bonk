"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Ticket, Calendar, MapPin } from "lucide-react"

interface TicketWalletProps {
  isOpen: boolean
  onClose: () => void
}

export function TicketWallet({ isOpen, onClose }: TicketWalletProps) {
  const tickets = [
    {
      id: "1",
      match: "BVB vs Bayern München",
      date: "2024-02-15",
      time: "20:30",
      stadium: "Signal Iduna Park",
      section: "Südtribüne",
      seat: "Block 12, Row 5, Seat 23",
      price: "45€",
      status: "active",
    },
    {
      id: "2",
      match: "BVB vs RB Leipzig",
      date: "2024-02-28",
      time: "18:30",
      stadium: "Signal Iduna Park",
      section: "Nordtribüne",
      seat: "Block 8, Row 12, Seat 15",
      price: "38€",
      status: "upcoming",
    },
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="w-5 h-5" />
              Ticket Wallet 🎫
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {tickets.map((ticket) => (
              <Card key={ticket.id} className="border-2 border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg">{ticket.match}</h3>
                    <Badge className={ticket.status === "active" ? "bg-green-500" : "bg-blue-500"}>
                      {ticket.status === "active" ? "Active" : "Upcoming"}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>
                        {ticket.date} • {ticket.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{ticket.stadium}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ticket className="w-4 h-4 text-gray-500" />
                      <span>
                        {ticket.section} • {ticket.seat}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-orange-600">{ticket.price}</span>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Show QR Code
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
