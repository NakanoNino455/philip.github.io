export default function Component() {
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
      style={{ backgroundImage: 'url("your-background-image")' }}
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
                    <p className="text-sm text-muted-foreground mt-2">After payment, please screenshot the order info and transaction record. Contact the seller via Messenger and send your delivery address.</p>
                  </div>
                )}
                <SheetFooter>
                  <Button className="w-full mt-4" onClick={handleCheckout} disabled={!paymentMethod}>
                    Submit Order
                  </Button>
                </SheetFooter>
              </div>
            )}
          </SheetContent>
        </Sheet>
      </header>
      <div className="flex flex-1">
        <aside className="hidden md:flex flex-col w-64 p-4 bg-gray-100">
          <nav className="space-y-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </nav>
        </aside>
        <main className="flex-1 p-4">
          <h2 className="text-2xl font-semibold mb-4">{selectedCategory}</h2>
          {selectedCategory === "All Products" && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row">
                  <img
                    src={newestProduct.image}
                    alt={newestProduct.name}
                    className="w-full md:w-1/2 h-48 md:h-auto object-cover rounded-md"
                  />
                  <div className="md:ml-4 mt-4 md:mt-0">
                    <h3 className="font-semibold text-lg">New Arrival: {newestProduct.name}</h3>
                    <p className="text-lg font-bold text-primary mt-2">₱{newestProduct.price}</p>
                    <Button className="mt-4" onClick={() => addToCart(newestProduct)}>
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id}>
                <CardContent className="p-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-md"
                  />
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-lg font-bold text-primary">₱{product.price}</p>
                  <Button className="w-full mt-2" onClick={() => addToCart(product)}>
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
