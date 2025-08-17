"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Camera, X, Check, AlertCircle, Loader2, Coins, Ticket, ShoppingBag, Zap, Target, QrCode } from "lucide-react"
import { InternalWalletService } from "@/lib/internal-wallet"

interface QRCodeScannerProps {
  isOpen: boolean
  onClose: () => void
}

interface ScanResult {
  type: "payment" | "ticket" | "shop" | "nft" | "unknown"
  data: any
}

export function QRCodeScanner({ isOpen, onClose }: QRCodeScannerProps) {
  const [scanning, setScanning] = useState(false)
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [detectedQRType, setDetectedQRType] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wallet = InternalWalletService.getWallet()

  // Mock QR code data for different types
  const mockQRData = {
    payment: {
      type: "payment",
      data: {
        merchant: "Signal Iduna Park Kiosk",
        amount: 15.5,
        currency: "BONK",
        description: "Bratwurst + Bier",
        reference: "ord-" + Math.floor(Math.random() * 10000),
        location: "Block 12, Stand 3",
      },
    },
    ticket: {
      type: "ticket",
      data: {
        eventName: "BVB vs Bayern München",
        date: new Date(Date.now() + 86400000 * 3),
        seat: "Block 12, Reihe 5, Platz 23",
        ticketId: "TKT-" + Math.floor(Math.random() * 100000),
        price: 89.99,
        status: "valid",
      },
    },
    shop: {
      type: "shop",
      data: {
        shopName: "BVB Fanshop",
        discount: 15,
        validUntil: new Date(Date.now() + 86400000 * 7),
        minPurchase: 25,
        code: "BONK15",
      },
    },
    nft: {
      type: "nft",
      data: {
        nftName: "Legendary Goal #042",
        collection: "Bundesliga Moments",
        price: 750,
        rarity: "epic",
        creator: "BVB Official",
      },
    },
  }

  // Enhanced scanning simulation
  const startScanning = () => {
    setScanning(true)
    setScanResult(null)
    setSuccess(false)
    setError(null)
    setScanProgress(0)
    setDetectedQRType(null)

    // Simulate scanning progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 200)

    // Simulate QR detection after progress
    setTimeout(() => {
      const qrTypes = Object.keys(mockQRData)
      const randomType = qrTypes[Math.floor(Math.random() * qrTypes.length)] as keyof typeof mockQRData

      setDetectedQRType(randomType)

      setTimeout(() => {
        setScanResult(mockQRData[randomType])
        setScanning(false)
        setScanProgress(0)
      }, 1000)
    }, 2500)
  }

  const processAction = async () => {
    if (!scanResult || !wallet) return

    setProcessing(true)
    setError(null)

    try {
      switch (scanResult.type) {
        case "payment":
          if (wallet.bonkBalance < scanResult.data.amount) {
            throw new Error("Nicht genügend BONK in deinem Wallet")
          }
          wallet.bonkBalance -= scanResult.data.amount
          break

        case "ticket":
          // Simulate ticket validation
          if (scanResult.data.status !== "valid") {
            throw new Error("Ticket ist nicht gültig oder bereits verwendet")
          }
          break

        case "shop":
          // Simulate shop discount activation
          break

        case "nft":
          if (wallet.bonkBalance < scanResult.data.price) {
            throw new Error("Nicht genügend BONK für diesen NFT")
          }
          wallet.bonkBalance -= scanResult.data.price
          break
      }

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setProcessing(false)
      setSuccess(true)

      // Auto close after success
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten")
      setProcessing(false)
    }
  }

  const getQRTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return <Coins className="w-5 h-5 text-orange-500" />
      case "ticket":
        return <Ticket className="w-5 h-5 text-blue-500" />
      case "shop":
        return <ShoppingBag className="w-5 h-5 text-green-500" />
      case "nft":
        return <Zap className="w-5 h-5 text-purple-500" />
      default:
        return <Target className="w-5 h-5 text-gray-500" />
    }
  }

  const getQRTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "border-orange-500 bg-orange-50"
      case "ticket":
        return "border-blue-500 bg-blue-50"
      case "shop":
        return "border-green-500 bg-green-50"
      case "nft":
        return "border-purple-500 bg-purple-50"
      default:
        return "border-gray-500 bg-gray-50"
    }
  }

  const getActionButtonText = (type: string) => {
    switch (type) {
      case "payment":
        return "Bezahlen"
      case "ticket":
        return "Validieren"
      case "shop":
        return "Rabatt aktivieren"
      case "nft":
        return "NFT kaufen"
      default:
        return "Bestätigen"
    }
  }

  // Clean up when component unmounts or closes
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [isOpen])

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setScanning(false)
      setScanResult(null)
      setSuccess(false)
      setError(null)
      setScanProgress(0)
      setDetectedQRType(null)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <Card className="w-full max-w-md overflow-hidden shadow-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <QrCode className="w-5 h-5" />
              QR Scanner 📱
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {success ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-700">
                {scanResult?.type === "payment" && "Zahlung erfolgreich!"}
                {scanResult?.type === "ticket" && "Ticket validiert!"}
                {scanResult?.type === "shop" && "Rabatt aktiviert!"}
                {scanResult?.type === "nft" && "NFT gekauft!"}
              </h3>
              <p className="text-gray-600">
                {scanResult?.type === "payment" &&
                  `${scanResult.data.amount} BONK wurden an ${scanResult.data.merchant} gesendet.`}
                {scanResult?.type === "ticket" &&
                  `Ticket für ${scanResult.data.eventName} wurde erfolgreich validiert.`}
                {scanResult?.type === "shop" && `${scanResult.data.discount}% Rabatt wurde aktiviert!`}
                {scanResult?.type === "nft" && `${scanResult.data.nftName} wurde erfolgreich gekauft!`}
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500 mb-1">Referenz:</div>
                <div className="font-mono text-sm">
                  {scanResult?.data.reference ||
                    scanResult?.data.ticketId ||
                    scanResult?.data.code ||
                    "NFT-" + Math.floor(Math.random() * 10000)}
                </div>
              </div>
            </div>
          ) : scanResult ? (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${getQRTypeColor(scanResult.type)}`}>
                <div className="flex items-center gap-2 mb-3">
                  {getQRTypeIcon(scanResult.type)}
                  <h3 className="font-bold text-gray-800">
                    {scanResult.type === "payment" && "Zahlungsanfrage"}
                    {scanResult.type === "ticket" && "Ticket-Validierung"}
                    {scanResult.type === "shop" && "Shop-Rabatt"}
                    {scanResult.type === "nft" && "NFT-Kauf"}
                  </h3>
                </div>

                <div className="space-y-2">
                  {scanResult.type === "payment" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Händler:</span>
                        <span className="font-medium">{scanResult.data.merchant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Beschreibung:</span>
                        <span className="font-medium">{scanResult.data.description}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Standort:</span>
                        <span className="font-medium">{scanResult.data.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Referenz:</span>
                        <span className="font-mono text-sm">{scanResult.data.reference}</span>
                      </div>
                    </>
                  )}

                  {scanResult.type === "ticket" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Event:</span>
                        <span className="font-medium">{scanResult.data.eventName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Datum:</span>
                        <span className="font-medium">{scanResult.data.date.toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sitzplatz:</span>
                        <span className="font-medium">{scanResult.data.seat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className="bg-green-500 text-white">Gültig</Badge>
                      </div>
                    </>
                  )}

                  {scanResult.type === "shop" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shop:</span>
                        <span className="font-medium">{scanResult.data.shopName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rabatt:</span>
                        <span className="font-medium text-green-600">{scanResult.data.discount}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Min. Einkauf:</span>
                        <span className="font-medium">{scanResult.data.minPurchase}€</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gültig bis:</span>
                        <span className="font-medium">{scanResult.data.validUntil.toLocaleDateString()}</span>
                      </div>
                    </>
                  )}

                  {scanResult.type === "nft" && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">NFT:</span>
                        <span className="font-medium">{scanResult.data.nftName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kollektion:</span>
                        <span className="font-medium">{scanResult.data.collection}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Seltenheit:</span>
                        <Badge className="bg-purple-500 text-white">{scanResult.data.rarity}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Creator:</span>
                        <span className="font-medium">{scanResult.data.creator}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {(scanResult.type === "payment" || scanResult.type === "nft") && (
                <>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-gray-600">
                        {scanResult.type === "payment" ? "Betrag:" : "Preis:"}
                      </div>
                      <div className="text-2xl font-bold text-orange-600">
                        {scanResult.type === "payment" ? scanResult.data.amount : scanResult.data.price} BONK
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Dein Guthaben:</div>
                      <div className="text-lg font-medium text-gray-800">{wallet?.bonkBalance || 0} BONK</div>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-700">{error}</span>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setScanResult(null)} className="flex-1 bg-transparent">
                  Abbrechen
                </Button>
                <Button
                  onClick={processAction}
                  disabled={processing || !wallet}
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                >
                  {processing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verarbeite...
                    </>
                  ) : (
                    <>
                      {getQRTypeIcon(scanResult.type)}
                      <span className="ml-2">{getActionButtonText(scanResult.type)}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
                {scanning ? (
                  <>
                    <video
                      ref={videoRef}
                      className="absolute inset-0 w-full h-full object-cover"
                      autoPlay
                      playsInline
                      muted
                    />
                    <canvas ref={canvasRef} className="hidden" />

                    {/* Scanning overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-48 border-2 border-white/70 rounded-lg relative">
                        <div className="absolute inset-0 border-2 border-orange-500 rounded-lg animate-pulse"></div>
                        {/* Corner indicators */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500"></div>
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500"></div>
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500"></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500"></div>
                      </div>
                    </div>

                    {/* Scanning line */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-48 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-pulse"></div>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Loader2 className="w-4 h-4 text-white animate-spin" />
                          <span className="text-white text-sm">Scanne QR-Code...</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${scanProgress}%` }}
                          ></div>
                        </div>
                        {detectedQRType && (
                          <div className="flex items-center gap-2 mt-2">
                            {getQRTypeIcon(detectedQRType)}
                            <span className="text-white text-sm">
                              {detectedQRType.charAt(0).toUpperCase() + detectedQRType.slice(1)} erkannt!
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900">
                    <Camera className="w-16 h-16 text-gray-400 mb-4" />
                    <p className="text-white text-center px-8 mb-2">
                      Klicke auf "Scannen starten", um einen QR-Code zu scannen
                    </p>
                    <p className="text-gray-400 text-sm text-center px-8">
                      Unterstützt: Zahlungen, Tickets, Shop-Rabatte & NFTs
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={startScanning}
                  disabled={scanning}
                  className="bg-orange-500 hover:bg-orange-600 shadow-lg"
                  size="lg"
                >
                  {scanning ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Scanne...
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 mr-2" />
                      Scannen starten
                    </>
                  )}
                </Button>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-medium text-blue-800 mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  So funktioniert's:
                </h3>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal pl-4">
                  <li>Klicke auf "Scannen starten"</li>
                  <li>Halte die Kamera über den QR-Code</li>
                  <li>Warte auf die automatische Erkennung</li>
                  <li>Bestätige die Aktion</li>
                </ol>

                <div className="mt-3 pt-3 border-t border-blue-200">
                  <div className="text-xs text-blue-600 font-medium mb-2">Unterstützte QR-Codes:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-orange-100 text-orange-800">💰 Zahlungen</Badge>
                    <Badge className="bg-blue-100 text-blue-800">🎫 Tickets</Badge>
                    <Badge className="bg-green-100 text-green-800">🛍️ Shop-Rabatte</Badge>
                    <Badge className="bg-purple-100 text-purple-800">🖼️ NFTs</Badge>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
