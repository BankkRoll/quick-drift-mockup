"use client"

import { useState } from "react"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface ClosePositionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  position: any
}

export function ClosePositionModal({ open, onOpenChange, position }: ClosePositionModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  if (!position) return null

  const handleClose = () => {
    setIsLoading(true)

    // Simulate transaction
    setTimeout(() => {
      toast({
        title: "Position closed",
        description: `Successfully closed ${position.market} position.`,
      })
      setIsLoading(false)
      onOpenChange(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] border-border/50 bg-background/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <X className="h-5 w-5" />
            Close Position
          </DialogTitle>
          <DialogDescription>Are you sure you want to close this position?</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Market</p>
              <p className="font-medium">{position.market}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Size</p>
              <p className={`font-medium ${position.size.startsWith("-") ? "text-red-500" : "text-green-500"}`}>
                {position.size}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Entry Price</p>
              <p className="font-medium">{position.entryPrice}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Mark Price</p>
              <p className="font-medium">{position.markPrice}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Estimated PnL</p>
            <p className={`font-medium ${position.pnl.startsWith("+") ? "text-green-500" : "text-red-500"}`}>
              {position.pnl} ({position.pnlPercent})
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleClose} disabled={isLoading} className="min-w-[100px]">
            {isLoading ? "Processing..." : "Close Position"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
