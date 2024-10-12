import { useState } from 'react'
import { Menu, ShoppingCart, X, MapPin, MessageCircle } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const products = [
  { id: 1, name: "Running Shoes", price: 1499, image: "/placeholder.svg?height=200&width=200", category: "Shoes" },
  { id: 2, name: "T-Shirt", price: 499, image: "/placeholder.svg?height=200&width=200", category: "Clothes" },
  { id: 3, name: "Jeans", price: 999, image: "/placeholder.svg?height=200&width=200", category: "Clothes" },
  { id: 4, name: "Backpack", price: 799, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { id: 5, name: "Cap", price: 299, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { id: 6, name: "Watch", price: 2999, image: "/placeholder.svg?height=200&width=200", category: "Accessories" },
  { id: 7, name: "Dress Shoes", price: 1799, image: "/placeholder.svg?height=200&width=200", category: "Shoes" },
  { id: 8, name: "Dress", price: 1299, image: "/placeholder.svg?height=200&width=200", category: "Clothes" },
]

const categories = [
  "All Products",
  "Clothes",
  "Shoes",
  "Accessories",
]

const newestProduct = {
  id: 9,
  name: "Smart Watch",
  price: 3499,
  image: "/placeholder.svg?height=300&width=600",
  category: "Accessories"
}

export default function ShoppingMall() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [cart, setCart] = useState([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("")

  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

  const handleCheckout = () => {
    alert(`Order submitted! Payment method: ${paymentMethod}`)
    setCart([])
    setIsCheckingOut(false)
    setPaymentMethod("")
  }

  const filteredProducts = selectedCategory === "All Products" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div
      className="flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: 'url("/path-to-your-background-image.jpg")' }}
    >
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <h1 className="text-2xl font-bold">999 Shopping Mall</h1>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className="justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">View cart</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Shopping Cart</SheetTitle>
            </SheetHeader>
            {cart.length === 0 ? (
              <p className="text-center mt-4">Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mt-4">
                    <span>{item.name} - ₱{item.price}</span>
                    <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="mt-4">
                  <strong>Total: ₱{getTotalPrice()}</strong>
                </div>
                <Button className="w-full mt-4" onClick={() => setIsCheckingOut(true)}>
                  Checkout
                </Button>
              </>
            )}
            {isCheckingOut && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Select payment method:</h3>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="store" id="store" />
                    <Label htmlFor="store">In-store cash payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online payment</Label>
                  </div>
                </RadioGroup>
                {paymentMethod === 'store' && (
                  <div className="mt-4">
                    <h4 className="font-semibold flex items-center"><MapPin className="mr-2" /> Store address:</h4>
                    <p>123 Main St, Anytown, Philippines</p>
                    <p className="text-sm text-muted-foreground mt-2">Please keep this order screen. Show it when paying in-store.</p>
                  </div>
                )}
                {paymentMethod === 'online' && (
                  <div className="mt-4">
                    <h4 className="font-semibold flex items-center"><MessageCircle className="mr-2" /> Contact info:</h4>
                    <p>Messenger: @shopowner</p>
                    <p>GCash: 1234567890</p>
                    <p className="text-sm text-muted-foreground mt-2">After payment, please screenshot the order info and transaction record. Contact the seller via Messenger and send your delivery address.</
