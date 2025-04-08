"use client"

import type React from "react"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface PlaceOrderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PlaceOrderModal({ open, onOpenChange }: PlaceOrderModalProps) {
  const [market, setMarket] = useState("SOL-PERP")
  const [orderType, setOrderType] = useState("limit")
  const [side, setSide] = useState("buy")
  const [size, setSize] = useState("")
  const [price, setPrice] = useState("")
  const [isScaled, setIsScaled] = useState(false)
  const [startPrice, setStartPrice] = useState("")
  const [endPrice, setEndPrice] = useState("")
  const [steps, setSteps] = useState("5")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate transaction
    setTimeout(() => {
      if (isScaled) {
        toast({
          title: "Scaled order placed",
          description: `Placed ${steps} ${side} orders for ${market} from ${startPrice} to ${endPrice}.`,
        })
      } else {
        toast({
          title: "Order placed",
          description: `Successfully placed ${orderType} ${side} order for ${size} ${market}.`,
        })
      }
      setIsLoading(false)
      onOpenChange(false)
      resetForm()
    }, 1500)
  }

  const resetForm = () => {
    setSize("")
    setPrice("")
    setIsScaled(false)
    setStartPrice("")
    setEndPrice("")
    setSteps("5")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Place Order
          </DialogTitle>
          <DialogDescription>Create a new perpetual futures order.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="market">Market</Label>
              <Select value={market} onValueChange={setMarket}>
                <SelectTrigger id="market">
                  <SelectValue placeholder="Select market" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SOL-PERP">SOL-PERP</SelectItem>
                  <SelectItem value="BTC-PERP">BTC-PERP</SelectItem>
                  <SelectItem value="ETH-PERP">ETH-PERP</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Order Type</Label>
                <RadioGroup value={orderType} onValueChange={setOrderType} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="limit" id="limit" />
                    <Label htmlFor="limit" className="cursor-pointer">
                      Limit
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="market" id="market" />
                    <Label htmlFor="market" className="cursor-pointer">
                      Market
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Side</Label>
                <RadioGroup value={side} onValueChange={setSide} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buy" id="buy" />
                    <Label htmlFor="buy" className="cursor-pointer text-green-500">
                      Buy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sell" id="sell" />
                    <Label htmlFor="sell" className="cursor-pointer text-red-500">
                      Sell
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                type="text"
                placeholder="Enter size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="bg-background border-border/50"
              />
            </div>

            {orderType === "limit" && (
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="text"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-background border-border/50"
                />
              </div>
            )}

            {orderType === "limit" && (
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox id="scaled" checked={isScaled} onCheckedChange={(checked) => setIsScaled(checked === true)} />
                <Label htmlFor="scaled" className="cursor-pointer">
                  Create scaled order
                </Label>
              </div>
            )}

            {isScaled && orderType === "limit" && (
              <div className="space-y-4 pl-6 border-l-2 border-border/50">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startPrice">Start Price</Label>
                    <Input
                      id="startPrice"
                      type="text"
                      placeholder="Enter start price"
                      value={startPrice}
                      onChange={(e) => setStartPrice(e.target.value)}
                      className="bg-background border-border/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endPrice">End Price</Label>
                    <Input
                      id="endPrice"
                      type="text"
                      placeholder="Enter end price"
                      value={endPrice}
                      onChange={(e) => setEndPrice(e.target.value)}
                      className="bg-background border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="steps">Number of Orders</Label>
                  <Select value={steps} onValueChange={setSteps}>
                    <SelectTrigger id="steps">
                      <SelectValue placeholder="Select number of orders" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 Orders</SelectItem>
                      <SelectItem value="5">5 Orders</SelectItem>
                      <SelectItem value="10">10 Orders</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !size ||
                (orderType === "limit" && !price && !isScaled) ||
                (isScaled && (!startPrice || !endPrice)) ||
                isLoading
              }
              className={`min-w-[100px] ${side === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {isLoading ? "Processing..." : `${side === "buy" ? "Buy" : "Sell"} ${market}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
