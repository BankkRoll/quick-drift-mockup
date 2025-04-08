"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Wallet, ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"

export function DisconnectedState({
  onAddressSubmit,
  isLoading,
}: {
  onAddressSubmit: (address: string) => void
  isLoading: boolean
}) {
  const [address, setAddress] = useState("")
  const [isValidAddress, setIsValidAddress] = useState(false)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const { theme } = useTheme()

  // Simple validation for Solana address (should be 44 characters)
  useEffect(() => {
    setIsValidAddress(address.trim().length === 44)
  }, [address])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidAddress) {
      onAddressSubmit(address)
    }
  }

  const features = [
    {
      title: "Real-time Balances",
      description: "Monitor your token balances with live updates from the blockchain",
    },
    {
      title: "Perpetual Positions",
      description: "Manage your perpetual futures positions with advanced TP/SL features",
    },
    {
      title: "Scaled Orders",
      description: "Place multiple orders at once with customizable price ranges",
    },
    {
      title: "Analytics Dashboard",
      description: "Track your performance with detailed charts and metrics",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-10">
        <ThemeToggle />
      </div>

      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"></div>
        <div className="absolute top-[60%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-primary/5 to-transparent blur-3xl"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.02]"></div>
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">
        {/* Left Section - Hero */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center mb-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground mr-4">
              <Wallet className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">DRIFT PROTOCOL</h2>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Advanced Subaccount <br />
            Management
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-xl mb-8"
          >
            Manage your Solana Drift subaccounts with a professional interface. Monitor balances, positions, and execute
            trades with precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-4 mb-12"
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 border border-border rounded-lg transition-all duration-300",
                  hoveredFeature === index ? "bg-accent" : "bg-card/50 backdrop-blur-sm",
                )}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <div className="flex items-center">
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 mr-2 transition-transform duration-300",
                      hoveredFeature === index ? "transform translate-x-1" : "",
                    )}
                  />
                  <div>
                    <h3 className="font-medium text-foreground">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Section - Connect Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex-1 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-card/50 backdrop-blur-sm"
        >
          <div className="w-full max-w-md space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Get Started</h2>
              <p className="text-muted-foreground">
                Connect your wallet or enter a Solana address to explore your subaccounts
              </p>
            </div>

            <WalletMultiButton className="w-full !bg-primary !text-primary-foreground hover:!bg-primary/90 !transition-all !duration-200 !shadow-md hover:!shadow-lg !h-12 !rounded-md !text-base !font-medium" />

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card/50 backdrop-blur-sm px-2 text-muted-foreground">Or continue with address</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="wallet-address" className="block text-sm font-medium text-foreground mb-1">
                  Solana Wallet Address
                </label>
                <Input
                  id="wallet-address"
                  placeholder="Enter Solana Wallet Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="h-12 border-input focus:ring-1 focus:ring-ring"
                />
              </div>

              <Button
                type="submit"
                variant="outline"
                className="w-full h-12 border-input text-foreground hover:bg-accent flex items-center justify-center"
                disabled={!isValidAddress || isLoading}
              >
                {isLoading ? "Loading..." : "View Subaccounts"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-muted-foreground">
                By connecting, you agree to Drift Protocol's Terms of Service
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
