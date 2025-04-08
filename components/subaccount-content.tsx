"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { CustomTabs } from "@/components/custom-tabs"
import { BalancesSection } from "@/components/balances-section"
import { PositionsSection } from "@/components/positions-section"
import { OrdersSection } from "@/components/orders-section"
import { AnalyticsSection } from "@/components/analytics-section"

interface SubaccountContentProps {
  subaccount: { id: number; name: string; balance: string }
  toggleSidebar: () => void
  isMobile: boolean
  sidebarOpen: boolean
}

export function SubaccountContent({ subaccount, toggleSidebar, isMobile, sidebarOpen }: SubaccountContentProps) {
  const [activeTab, setActiveTab] = useState("balances")

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <div className="border-b border-border/40 p-4 flex items-center justify-between">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
        )}

        <h2 className={`font-semibold text-lg ${isMobile ? "" : "ml-2"}`}>{subaccount.name}</h2>

        <div className="text-sm font-medium">
          Balance: <span className="text-primary">${subaccount.balance} USDC</span>
        </div>
      </div>

      <CustomTabs
        value={activeTab}
        onValueChange={setActiveTab}
        tabs={[
          { value: "balances", label: "Balances" },
          { value: "positions", label: "Perp Positions" },
          { value: "orders", label: "Open Orders" },
          { value: "analytics", label: "Analytics" },
        ]}
      />

      <div className="flex-1 overflow-auto">
        {activeTab === "balances" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <BalancesSection />
          </motion.div>
        )}

        {activeTab === "positions" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <PositionsSection />
          </motion.div>
        )}

        {activeTab === "orders" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <OrdersSection />
          </motion.div>
        )}

        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
            <AnalyticsSection subaccount={subaccount} />
          </motion.div>
        )}
      </div>
    </div>
  )
}
