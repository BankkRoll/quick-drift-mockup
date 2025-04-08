"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"

interface Tab {
  value: string
  label: string
}

interface CustomTabsProps {
  tabs: Tab[]
  value: string
  onValueChange: (value: string) => void
}

export function CustomTabs({ tabs, value, onValueChange }: CustomTabsProps) {
  const [activeTabWidth, setActiveTabWidth] = useState(0)
  const [activeTabLeft, setActiveTabLeft] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  // Update the indicator position when the active tab changes
  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === value)
    if (activeIndex !== -1 && tabRefs.current[activeIndex]) {
      const tabElement = tabRefs.current[activeIndex]
      if (tabElement) {
        setActiveTabWidth(tabElement.offsetWidth)
        setActiveTabLeft(tabElement.offsetLeft)
      }
    }
  }, [value, tabs])

  return (
    <div className="border-b border-border/40 relative">
      <div className="px-4 flex">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => onValueChange(tab.value)}
            className={`relative py-3 px-4 text-sm font-medium transition-colors ${
              value === tab.value ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active tab indicator */}
      <motion.div
        className="absolute bottom-0 h-0.5 bg-primary"
        initial={false}
        animate={{
          width: activeTabWidth,
          left: activeTabLeft,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  )
}
