"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  X,
  ShoppingBag,
  Coffee,
  Pizza,
  Beer,
  Utensils,
  Plus,
  Minus,
  Coins,
  Clock,
  Star,
  Truck,
  MapPin,
  Zap,
  Heart,
  TrendingUp,
  ShoppingCart,
} from "lucide-react"
import { InternalWalletService } from "@/lib/internal-wallet"

interface StadiumShopProps {
  isOpen: boolean
  onClose: () => void
  stadium: string
}

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "food" | "drinks" | "snacks" | "merchandise"
  bonkDiscount?: number
  popular?: boolean
  rating?: number
  reviews?: number
  preparationTime?: number
  calories?: number
  isVegetarian?: boolean
  isVegan?: boolean
  spicyLevel?: number
}

interface CartItem extends MenuItem {
  quantity: number
}

interface DeliveryStatus {
  orderId: string
  status: "preparing" | "ready" | "delivering" | "delivered"
  estimatedTime: number
  currentStep: number
  totalSteps: number
}

export function StadiumShop({ isOpen, onClose, stadium }: StadiumShopProps) {
  const [activeTab, setActiveTab] = useState<"food" | "drinks" | "snacks" | "merchandise">("food")
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus | null>(null)
  const [favorites, setFavorites] = useState<string[]>([])
  const wallet = InternalWalletService.getWallet()

  // Enhanced menu data with more details
  const menuItems: MenuItem[] = [
    {
      id: "bratwurst",
      name: "Original Bratwurst",
      description: "Original deutsche Stadion-Bratwurst mit Senf",
      price: 5.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "food",
      bonkDiscount: 10,
      popular: true,
      rating: 4.8,
      reviews: 234,
      preparationTime: 3,
      calories: 320,
    },
    {
      id: "currywurst",
      name: "Currywurst Spezial",
      description: "Currywurst mit hausgemachter Sauce und Pommes",
      price: 7.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "food",
      popular: true,
      rating: 4.6,
      reviews: 189,
      preparationTime: 5,
      calories: 450,
      spicyLevel: 2,
    },
    {
      id: "veggie-burger",
      name: "Veggie Burger",
      description: "Hausgemachter vegetarischer Burger",
      price: 8.9,
      image: "/placeholder.svg?height=100&width=100",
      category: "food",
      rating: 4.4,
      reviews: 67,
      preparationTime: 6,
      calories: 380,
      isVegetarian: true,
      bonkDiscount: 15,
    },
    {
      id: "pretzel",
      name: "Laugenbrezel",
      description: "Frische Laugenbrezel mit grobem Salz",
      price: 3.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "snacks",
      rating: 4.7,
      reviews: 156,
      preparationTime: 1,
      calories: 280,
      isVegetarian: true,
    },
    {
      id: "beer",
      name: "Stadion Pils 0,5L",
      description: "Frisch gezapftes Pils vom Fass",
      price: 4.8,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      popular: true,
      rating: 4.9,
      reviews: 445,
      preparationTime: 1,
    },
    {
      id: "cola",
      name: "Cola 0,4L",
      description: "Eisgekühlte Cola mit Eis",
      price: 4.0,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      rating: 4.2,
      reviews: 89,
      preparationTime: 1,
    },
    {
      id: "energy-drink",
      name: "Energy Drink",
      description: "Koffeinhaltiger Energy Drink",
      price: 5.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "drinks",
      rating: 4.1,
      reviews: 34,
      preparationTime: 1,
    },
    {
      id: "popcorn",
      name: "Karamell Popcorn",
      description: "Süßes Karamell-Popcorn",
      price: 3.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "snacks",
      rating: 4.5,
      reviews: 78,
      preparationTime: 2,
      calories: 220,
      isVegetarian: true,
    },
    {
      id: "nachos",
      name: "Nachos Supreme",
      description: "Nachos mit Käse, Jalapeños und Salsa",
      price: 6.5,
      image: "/placeholder.svg?height=100&width=100",
      category: "snacks",
      rating: 4.3,
      reviews: 92,
      preparationTime: 4,
      calories: 380,
      isVegetarian: true,
      spicyLevel: 2,
    },
    {
      id: "scarf",
      name: "BVB Fanschal 2024",
      description: "Offizieller BVB Fanschal der Saison 2024",
      price: 19.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "merchandise",
      bonkDiscount: 15,
      rating: 4.8,
      reviews: 234,
      popular: true,
    },
    {
      id: "cap",
      name: "BVB Snapback Cap",
      description: "Schwarzgelbe Fan-Cap mit verstellbarem Verschluss",
      price: 24.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "merchandise",
      rating: 4.6,
      reviews: 167,
    },
    {
      id: "jersey",
      name: "BVB Heimtrikot 2024",
      description: "Offizielles Heimtrikot der Saison 2024/25",
      price: 89.99,
      image: "/placeholder.svg?height=100&width=100",
      category: "merchandise",
      bonkDiscount: 20,
      rating: 4.9,
      reviews: 89,
      popular: true,
    },
  ]

  const products = [
    {
      id: 1,
      name: "BVB Jersey 2024",
      price: "89.95€",
      bonkPrice: "450 BONK",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Stadium Scarf",
      price: "19.95€",
      bonkPrice: "100 BONK",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 3,
      name: "Match Ball",
      price: "29.95€",
      bonkPrice: "150 BONK",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  // Simulate delivery tracking
  useEffect(() => {
    if (deliveryStatus) {
      const interval = setInterval(() => {
        setDeliveryStatus((prev) => {
          if (!prev) return null

          if (prev.currentStep < prev.totalSteps) {
            const newStep = prev.currentStep + 1
            let newStatus = prev.status

            switch (newStep) {
              case 2:
                newStatus = "ready"
                break
              case 3:
                newStatus = "delivering"
                break
              case 4:
                newStatus = "delivered"
                break
            }

            return {
              ...prev,
              currentStep: newStep,
              status: newStatus,
              estimatedTime: Math.max(0, prev.estimatedTime - 1),
            }
          }
          return prev
        })
      }, 3000)

      return () => clearInterval(interval)
    }
  }, [deliveryStatus])

  const addToCart = (item: MenuItem) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...currentCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === itemId)
      if (existingItem && existingItem.quantity > 1) {
        return currentCart.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return currentCart.filter((item) => item.id !== itemId)
      }
    })
  }

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const placeOrder = () => {
    const orderId = "ORD-" + Math.floor(Math.random() * 100000)
    const totalTime = Math.max(...cart.map((item) => item.preparationTime || 5)) + 5

    setDeliveryStatus({
      orderId,
      status: "preparing",
      estimatedTime: totalTime,
      currentStep: 1,
      totalSteps: 4,
    })

    setOrderPlaced(true)
    setShowCart(false)
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getBonkDiscount = () => {
    return cart.reduce((total, item) => {
      const discount = item.bonkDiscount || 0
      return total + (item.price * item.quantity * discount) / 100
    }, 0)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "food":
        return <Utensils className="w-4 h-4" />
      case "drinks":
        return <Beer className="w-4 h-4" />
      case "snacks":
        return <Pizza className="w-4 h-4" />
      case "merchandise":
        return <ShoppingBag className="w-4 h-4" />
      default:
        return <Coffee className="w-4 h-4" />
    }
  }

  const getDeliveryStatusText = (status: string) => {
    switch (status) {
      case "preparing":
        return "Wird zubereitet"
      case "ready":
        return "Bereit zur Lieferung"
      case "delivering":
        return "Unterwegs zu dir"
      case "delivered":
        return "Zugestellt"
      default:
        return "Unbekannt"
    }
  }

  const filteredItems = menuItems.filter((item) => item.category === activeTab)
  const popularItems = filteredItems.filter((item) => item.popular)
  const recommendedItems = filteredItems.filter((item) => item.rating && item.rating >= 4.5)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Stadium Shop 🛍️
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20">
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm opacity-90">{stadium}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {products.map((product) => (
              <Card key={product.id} className="border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{product.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-lg font-bold">{product.price}</span>
                        <Badge className="bg-orange-100 text-orange-800">
                          <Coins className="w-3 h-3 mr-1" />
                          {product.bonkPrice}
                        </Badge>
                      </div>
                    </div>
                    <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                      Buy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Delivery Status */}
          {deliveryStatus && (
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <div className="flex items-center gap-2 mb-2">
                <Truck className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Bestellung #{deliveryStatus.orderId}</span>
                <Badge className="bg-green-500 text-white">{getDeliveryStatusText(deliveryStatus.status)}</Badge>
              </div>
              <Progress value={(deliveryStatus.currentStep / deliveryStatus.totalSteps) * 100} className="mb-2" />
              <div className="flex justify-between text-xs text-gray-600">
                <span>
                  Schritt {deliveryStatus.currentStep} von {deliveryStatus.totalSteps}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {deliveryStatus.estimatedTime} Min
                </span>
              </div>
            </div>
          )}

          {showCart ? (
            <div className="p-6 space-y-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCart(false)}
                className="mb-4 -ml-2 text-yellow-600"
              >
                ← Zurück zum Menü
              </Button>

              <h2 className="text-xl font-bold mb-4">Dein Warenkorb</h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="w-12 h-12 mx-auto text-gray-300 mb-2" />
                  <h3 className="text-lg font-medium text-gray-700 mb-1">Dein Warenkorb ist leer</h3>
                  <p className="text-gray-500 text-sm">Füge Produkte aus dem Menü hinzu</p>
                  <Button className="mt-4 bg-yellow-500 hover:bg-yellow-600" onClick={() => setShowCart(false)}>
                    Zum Menü
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.name}</h3>
                            <span className="font-bold">{(item.price * item.quantity).toFixed(2)} €</span>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-full bg-transparent"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-6 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-6 w-6 rounded-full bg-transparent"
                                onClick={() => addToCart(item)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-500">{item.price.toFixed(2)} € pro Stück</div>
                              {item.preparationTime && (
                                <div className="text-xs text-gray-400 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.preparationTime} Min
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Zwischensumme:</span>
                      <span className="font-medium">{getTotalPrice().toFixed(2)} €</span>
                    </div>
                    {getBonkDiscount() > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>BONK Rabatt:</span>
                        <span className="font-medium">-{getBonkDiscount().toFixed(2)} €</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Liefergebühr:</span>
                      <span className="font-medium">2.50 €</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Gesamtsumme:</span>
                      <span>{(getTotalPrice() - getBonkDiscount() + 2.5).toFixed(2)} €</span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">Lieferadresse</span>
                    </div>
                    <p className="text-sm text-yellow-700 mb-2">Block 12, Reihe 5, Platz 23 - Signal Iduna Park</p>
                    <div className="flex items-center gap-2 text-xs text-yellow-600">
                      <Clock className="w-3 h-3" />
                      <span>
                        Geschätzte Lieferzeit: {Math.max(...cart.map((item) => item.preparationTime || 5)) + 5} Min
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="bg-transparent">
                      Bargeld / Karte
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={placeOrder}>
                      <Coins className="w-4 h-4 mr-2" />
                      Bestellen
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="p-4">
                <div className="bg-yellow-50 p-3 rounded-lg mb-4 border border-yellow-200">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Express-Lieferung zum Sitzplatz</span>
                  </div>
                  <p className="text-xs text-yellow-700 mt-1">
                    Bestelle jetzt und erhalte deine Verpflegung in 10-15 Minuten direkt an deinen Platz!
                  </p>
                </div>

                {/* Popular Items */}
                {popularItems.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-gray-800">Beliebt heute</span>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {popularItems.slice(0, 3).map((item) => (
                        <div
                          key={item.id}
                          className="flex-shrink-0 w-32 bg-white rounded-lg border p-2 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => addToCart(item)}
                        >
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-16 object-cover rounded-md mb-1"
                          />
                          <p className="text-xs font-medium truncate">{item.name}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-bold text-orange-600">{item.price.toFixed(2)}€</span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 fill-current" />
                              <span className="text-xs">{item.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="w-full">
                <TabsList className="grid w-full grid-cols-4 px-4">
                  <TabsTrigger value="food" className="flex flex-col gap-1 py-2">
                    <Utensils className="w-4 h-4" />
                    <span className="text-xs">Essen</span>
                  </TabsTrigger>
                  <TabsTrigger value="drinks" className="flex flex-col gap-1 py-2">
                    <Beer className="w-4 h-4" />
                    <span className="text-xs">Getränke</span>
                  </TabsTrigger>
                  <TabsTrigger value="snacks" className="flex flex-col gap-1 py-2">
                    <Pizza className="w-4 h-4" />
                    <span className="text-xs">Snacks</span>
                  </TabsTrigger>
                  <TabsTrigger value="merchandise" className="flex flex-col gap-1 py-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-xs">Fanartikel</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value={activeTab} className="p-4 space-y-4">
                  {filteredItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex">
                          <div className="w-24 h-24 relative">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                            {item.popular && (
                              <Badge className="absolute top-1 left-1 bg-red-500 text-white text-xs">🔥</Badge>
                            )}
                          </div>
                          <div className="flex-1 p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div className="flex-1">
                                <h3 className="font-medium text-sm">{item.name}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-1 h-auto"
                                onClick={() => toggleFavorite(item.id)}
                              >
                                <Heart
                                  className={`w-4 h-4 ${
                                    favorites.includes(item.id) ? "text-red-500 fill-current" : "text-gray-400"
                                  }`}
                                />
                              </Button>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                              {item.rating && (
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                  <span className="text-xs font-medium">{item.rating}</span>
                                  <span className="text-xs text-gray-400">({item.reviews})</span>
                                </div>
                              )}
                              {item.preparationTime && (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{item.preparationTime} Min</span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-1 mb-2">
                              {item.isVegetarian && (
                                <Badge className="bg-green-100 text-green-800 text-xs">🌱 Vegetarisch</Badge>
                              )}
                              {item.isVegan && <Badge className="bg-green-100 text-green-800 text-xs">🌿 Vegan</Badge>}
                              {item.spicyLevel && (
                                <Badge className="bg-red-100 text-red-800 text-xs">{"🌶️".repeat(item.spicyLevel)}</Badge>
                              )}
                            </div>

                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-bold text-sm">{item.price.toFixed(2)} €</div>
                                {item.bonkDiscount && (
                                  <div className="text-xs text-green-600 flex items-center gap-1">
                                    <Zap className="w-3 h-3" />
                                    {item.bonkDiscount}% BONK Rabatt
                                  </div>
                                )}
                                {item.calories && <div className="text-xs text-gray-500">{item.calories} kcal</div>}
                              </div>
                              <Button
                                size="sm"
                                onClick={() => addToCart(item)}
                                className="bg-yellow-500 hover:bg-yellow-600"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>

              {/* Cart Button */}
              {getTotalItems() > 0 && (
                <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200">
                  <Button onClick={() => setShowCart(true)} className="w-full bg-yellow-500 hover:bg-yellow-600">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Warenkorb ({getTotalItems()}) - {getTotalPrice().toFixed(2)} €
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
