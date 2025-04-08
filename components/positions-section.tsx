"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Settings, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClosePositionModal } from "@/components/close-position-modal"
import { useToast } from "@/hooks/use-toast"

// Mock positions data
const positions = [
  {
    id: 1,
    market: "SOL-PERP",
    size: "10.5",
    entryPrice: "$24.35",
    markPrice: "$25.12",
    pnl: "+$8.12",
    pnlPercent: "+3.2%",
    tpPrice: "",
    slPrice: "",
  },
  {
    id: 2,
    market: "BTC-PERP",
    size: "-0.05",
    entryPrice: "$28,450.75",
    markPrice: "$27,890.25",
    pnl: "+$28.02",
    pnlPercent: "+1.9%",
    tpPrice: "$27,500.00",
    slPrice: "$29,000.00",
  },
  {
    id: 3,
    market: "ETH-PERP",
    size: "1.2",
    entryPrice: "$1,875.45",
    markPrice: "$1,850.30",
    pnl: "-$30.18",
    pnlPercent: "-1.3%",
    tpPrice: "",
    slPrice: "",
  },
]

export function PositionsSection() {
  const [closeModalOpen, setCloseModalOpen] = useState(false)
  const [selectedPosition, setSelectedPosition] = useState<any>(null)
  const [expandedRows, setExpandedRows] = useState<Record<number, boolean>>({})
  const [tpSlValues, setTpSlValues] = useState<Record<number, { tp: string; sl: string }>>({})
  const { toast } = useToast()

  const handleClosePosition = (position: any) => {
    setSelectedPosition(position)
    setCloseModalOpen(true)
  }

  const toggleRow = (id: number) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))

    // Initialize TP/SL values if not already set
    if (!tpSlValues[id]) {
      const position = positions.find((p) => p.id === id)
      setTpSlValues((prev) => ({
        ...prev,
        [id]: {
          tp: position?.tpPrice || "",
          sl: position?.slPrice || "",
        },
      }))
    }
  }

  const handleTpSlChange = (id: number, field: "tp" | "sl", value: string) => {
    setTpSlValues((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }))
  }

  const handleSaveTpSl = (id: number) => {
    toast({
      title: "TP/SL Updated",
      description: `Take profit and stop loss updated for ${positions.find((p) => p.id === id)?.market}.`,
    })

    // Close the expanded row
    toggleRow(id)
  }

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Perpetual Positions</h3>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[16.66%]">Market</TableHead>
                  <TableHead className="w-[16.66%]">Size</TableHead>
                  <TableHead className="w-[16.66%]">Entry Price</TableHead>
                  <TableHead className="w-[16.66%]">Mark Price</TableHead>
                  <TableHead className="w-[16.66%] text-right">Unrealized PnL</TableHead>
                  <TableHead className="w-[16.66%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {positions.map((position) => (
                  <>
                    <TableRow key={position.id} className="hover:bg-muted/30 transition-colors group">
                      <TableCell className="font-medium">{position.market}</TableCell>
                      <TableCell className={position.size.startsWith("-") ? "text-red-500" : "text-green-500"}>
                        {position.size}
                      </TableCell>
                      <TableCell>{position.entryPrice}</TableCell>
                      <TableCell>{position.markPrice}</TableCell>
                      <TableCell
                        className={`text-right ${position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}
                      >
                        {position.pnl} ({position.pnlPercent})
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 hover:bg-primary/10"
                            onClick={() => toggleRow(position.id)}
                          >
                            <Settings className="h-3.5 w-3.5" />
                            <span>TP/SL</span>
                            {expandedRows[position.id] ? (
                              <ChevronUp className="h-3.5 w-3.5" />
                            ) : (
                              <ChevronDown className="h-3.5 w-3.5" />
                            )}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 hover:bg-destructive/10 text-destructive"
                            onClick={() => handleClosePosition(position)}
                          >
                            <X className="h-3.5 w-3.5" />
                            <span>Close</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>

                    {/* Expanded content as a separate row */}
                    {expandedRows[position.id] && (
                      <TableRow className="hover:bg-transparent border-t-0">
                        <TableCell colSpan={6} className="p-0">
                          <div className="bg-muted/30 p-4 rounded-b-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor={`tp-${position.id}`}>Take Profit Price</Label>
                                <Input
                                  id={`tp-${position.id}`}
                                  placeholder="Enter take profit price"
                                  value={tpSlValues[position.id]?.tp || ""}
                                  onChange={(e) => handleTpSlChange(position.id, "tp", e.target.value)}
                                  className="bg-background border-border/50"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor={`sl-${position.id}`}>Stop Loss Price</Label>
                                <Input
                                  id={`sl-${position.id}`}
                                  placeholder="Enter stop loss price"
                                  value={tpSlValues[position.id]?.sl || ""}
                                  onChange={(e) => handleTpSlChange(position.id, "sl", e.target.value)}
                                  className="bg-background border-border/50"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end mt-4">
                              <Button size="sm" onClick={() => handleSaveTpSl(position.id)}>
                                Save
                              </Button>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}

                {positions.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No positions found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <ClosePositionModal open={closeModalOpen} onOpenChange={setCloseModalOpen} position={selectedPosition} />
    </div>
  )
}
