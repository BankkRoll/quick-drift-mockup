"use client"

import { ChevronLeft, ChevronRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent } from "@/components/ui/sheet"

interface Subaccount {
  id: number
  name: string
  balance: string
}

interface SidebarProps {
  address: string
  subaccounts: Subaccount[]
  selectedSubaccount: number
  setSelectedSubaccount: (id: number) => void
  open: boolean
  setOpen: (open: boolean) => void
  isMobile: boolean
}

export function Sidebar({
  address,
  subaccounts,
  selectedSubaccount,
  setSelectedSubaccount,
  open,
  setOpen,
  isMobile,
}: SidebarProps) {
  // Format address for display
  const displayAddress = address ? `${address.substring(0, 4)}...${address.substring(address.length - 4)}` : ""

  const sidebarContent = (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-mono">{displayAddress}</span>
        </div>
      </div>

      <div className="p-4 border-b border-border/40">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Subaccounts</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {subaccounts.map((subaccount) => (
            <button
              key={subaccount.id}
              className={`w-full text-left p-3 rounded-md transition-all mb-1 hover:bg-accent/50 ${
                selectedSubaccount === subaccount.id ? "bg-accent text-accent-foreground" : "text-foreground"
              }`}
              onClick={() => {
                setSelectedSubaccount(subaccount.id)
                if (isMobile) setOpen(false)
              }}
            >
              <div className="font-medium">{subaccount.name}</div>
              <div className="text-sm text-muted-foreground mt-1">${subaccount.balance} USDC</div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )

  // Mobile sidebar uses Sheet component
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 w-[280px] sm:max-w-none border-r border-border/40">
          {sidebarContent}
        </SheetContent>
      </Sheet>
    )
  }

  // Desktop sidebar
  return (
    <div
      className={`border-r border-border/40 h-full transition-all duration-300 relative ${open ? "w-[280px]" : "w-0"}`}
    >
      {open && <div className="h-full w-[280px]">{sidebarContent}</div>}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 absolute -right-4 top-4 z-10 bg-background border border-border/40 rounded-full"
        onClick={() => setOpen(!open)}
      >
        {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </Button>
    </div>
  )
}
