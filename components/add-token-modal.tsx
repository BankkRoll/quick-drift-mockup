"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
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
import { useToast } from "@/hooks/use-toast"

// Mock token list
const availableTokens = [
  { symbol: "USDT", name: "Tether", balance: "0.00" },
  { symbol: "USDC", name: "USD Coin", balance: "0.00" },
  { symbol: "SOL", name: "Solana", balance: "0.00" },
  { symbol: "BTC", name: "Bitcoin", balance: "0.00" },
  { symbol: "ETH", name: "Ethereum", balance: "0.00" },
  { symbol: "BONK", name: "Bonk", balance: "0.00" },
  { symbol: "JTO", name: "Jito", balance: "0.00" },
  { symbol: "JUP", name: "Jupiter", balance: "0.00" },
  { symbol: "RNDR", name: "Render", balance: "0.00" },
  { symbol: "PYTH", name: "Pyth Network", balance: "0.00" },
]

interface AddTokenModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddTokenModal({ open, onOpenChange }: AddTokenModalProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedToken, setSelectedToken] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const filteredTokens = availableTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedToken) return

    setIsLoading(true)

    // Simulate adding token
    setTimeout(() => {
      toast({
        title: "Token added",
        description: `${selectedToken} has been added to your subaccount.`,
      })
      setIsLoading(false)
      onOpenChange(false)
      setSelectedToken("")
      setSearchQuery("")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Token
          </DialogTitle>
          <DialogDescription>Add a new token to your Drift subaccount.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tokens..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background border-border/50"
              />
            </div>

            <div className="space-y-2">
              <Label>Select Token</Label>
              <div className="max-h-[300px] overflow-y-auto pr-1 space-y-1 rounded-md border border-border/50 p-1">
                <RadioGroup value={selectedToken} onValueChange={setSelectedToken}>
                  {filteredTokens.map((token) => (
                    <div
                      key={token.symbol}
                      className="flex items-center space-x-2 p-2 rounded-md hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={token.symbol} id={token.symbol} />
                      <Label htmlFor={token.symbol} className="flex-1 flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            {token.symbol.substring(0, 1)}
                          </div>
                          <div>
                            <div className="font-medium">{token.symbol}</div>
                            <div className="text-xs text-muted-foreground">{token.name}</div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">{token.balance}</div>
                      </Label>
                    </div>
                  ))}

                  {filteredTokens.length === 0 && (
                    <div className="p-4 text-center text-muted-foreground">No tokens found</div>
                  )}
                </RadioGroup>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedToken || isLoading} className="min-w-[100px]">
              {isLoading ? "Processing..." : "Add Token"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
