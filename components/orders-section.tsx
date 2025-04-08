"use client"

import { useState } from "react"
import { Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlaceOrderModal } from "@/components/place-order-modal"
import { useToast } from "@/hooks/use-toast"

// Mock orders data
const orders = [
  {
    id: 1,
    market: "SOL-PERP",
    type: "Limit",
    side: "Buy",
    size: "15.0",
    price: "$24.10",
    timeInForce: "GTC",
    status: "Open",
  },
  {
    id: 2,
    market: "BTC-PERP",
    type: "Market",
    side: "Sell",
    size: "0.08",
    price: "Market",
    timeInForce: "IOC",
    status: "Pending",
  },
  {
    id: 3,
    market: "ETH-PERP",
    type: "Limit",
    side: "Sell",
    size: "2.5",
    price: "$1,920.50",
    timeInForce: "GTC",
    status: "Open",
  },
]

export function OrdersSection() {
  const [placeOrderOpen, setPlaceOrderOpen] = useState(false)
  const { toast } = useToast()

  const handleCancelOrder = (order: any) => {
    toast({
      title: "Order cancelled",
      description: `Successfully cancelled ${order.market} ${order.type.toLowerCase()} order.`,
    })
  }

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Open Orders</h3>
        <Button onClick={() => setPlaceOrderOpen(true)} className="gap-1">
          <Plus className="h-4 w-4" /> Place Order
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[16.66%]">Market</TableHead>
                  <TableHead className="w-[16.66%]">Type</TableHead>
                  <TableHead className="w-[16.66%]">Side</TableHead>
                  <TableHead className="w-[16.66%]">Size</TableHead>
                  <TableHead className="w-[16.66%]">Price</TableHead>
                  <TableHead className="w-[16.66%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">{order.market}</TableCell>
                    <TableCell>{order.type}</TableCell>
                    <TableCell className={order.side === "Buy" ? "text-green-500" : "text-red-500"}>
                      {order.side}
                    </TableCell>
                    <TableCell>{order.size}</TableCell>
                    <TableCell>{order.price}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 gap-1 hover:bg-destructive/10 text-destructive"
                        onClick={() => handleCancelOrder(order)}
                        disabled={order.status === "Pending"}
                      >
                        <X className="h-3.5 w-3.5" />
                        <span>Cancel</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <PlaceOrderModal open={placeOrderOpen} onOpenChange={setPlaceOrderOpen} />
    </div>
  )
}
