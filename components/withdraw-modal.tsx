"use client"

import type React from "react"

import { useState } from "react"
import { ArrowUpFromLine } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface WithdrawModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  token: string
}

export function WithdrawModal({ open, onOpenChange, token }: WithdrawModalProps) {
  const [amount, setAmount] = useState("")
  const [selectedToken, setSelectedToken] = useState(token || "USDC")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Get max amount based on token
  const getMaxAmount = () => {
    switch (selectedToken) {
      case "USDC":
        return "1,245.32"
      case "SOL":
        return "12.5"
      case "BTC":
        return "0.0045"
      case "ETH":
        return "0.125"
      default:
        return "0"
    }
  }

  const handleSetMax = () => {
    setAmount(getMaxAmount())
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Withdrawal initiated",
        description: `Withdrawing ${amount} ${selectedToken} from your subaccount.`,
      })
      setIsLoading(false)
      onOpenChange(false)
      setAmount("")
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ArrowUpFromLine className="h-5 w-5" />
            Withdraw Funds
          </DialogTitle>
          <DialogDescription>Withdraw tokens from your Drift subaccount.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Token</Label>
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger id="token">
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="SOL">SOL</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount</Label>
                <Button
                  type="button"
                  variant="link"
                  size="sm"
                  className="h-auto p-0 text-xs text-primary"
                  onClick={handleSetMax}
                >
                  Max: {getMaxAmount()}
                </Button>
              </div>
              <Input
                id="amount"
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-background border-border/50"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
              Cancel
            </Button>
            <Button type="submit" disabled={!amount || isLoading} className="min-w-[100px]">
              {isLoading ? "Processing..." : "Withdraw"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
