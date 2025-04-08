"use client"

import { useState } from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Sidebar } from "@/components/sidebar"
import { SubaccountContent } from "@/components/subaccount-content"

export function ConnectedState({ address }: { address: string }) {
  const [selectedSubaccount, setSelectedSubaccount] = useState(0)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)

  // Mock subaccount data
  const subaccounts = [
    { id: 0, name: "Subaccount #1", balance: "1,245.32" },
    { id: 1, name: "Subaccount #2", balance: "567.89" },
    { id: 2, name: "Subaccount #3", balance: "89.45" },
    { id: 3, name: "Subaccount #4", balance: "0.00" },
  ]

  return (
    <div className="flex-1 flex">
      <Sidebar
        address={address}
        subaccounts={subaccounts}
        selectedSubaccount={selectedSubaccount}
        setSelectedSubaccount={setSelectedSubaccount}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        isMobile={isMobile}
      />

      <SubaccountContent
        subaccount={subaccounts[selectedSubaccount]}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        isMobile={isMobile}
        sidebarOpen={sidebarOpen}
      />
    </div>
  )
}
