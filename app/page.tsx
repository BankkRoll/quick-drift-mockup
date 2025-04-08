"use client"

import { useState } from "react"
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { useWallet } from "@solana/wallet-adapter-react"
import { motion, AnimatePresence } from "framer-motion"

import { WalletProvider } from "@/components/wallet-provider"
import { DisconnectedState } from "@/components/disconnected-state"
import { ConnectedState } from "@/components/connected-state"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [manualAddress, setManualAddress] = useState("")
  const [viewingAddress, setViewingAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { connected } = useWallet() // Moved useWallet hook here

  const handleManualView = () => {
    if (manualAddress.trim()) {
      setIsLoading(true)
      // Simulate loading
      setTimeout(() => {
        setViewingAddress(manualAddress)
        setIsLoading(false)
      }, 1000)
    }
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <WalletProvider>
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
          {/* Only show header when connected */}
          {(viewingAddress || connected) && (
            <header className="border-b border-border/40 h-14 flex items-center justify-between px-4 md:px-6 relative z-10">
              <h1 className="text-lg font-semibold tracking-wide">DRIFT PROTOCOL</h1>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <WalletConnectSection
                  manualAddress={manualAddress}
                  setManualAddress={setManualAddress}
                  viewingAddress={viewingAddress}
                  setViewingAddress={setViewingAddress}
                  onManualView={handleManualView}
                  isLoading={isLoading}
                />
              </div>
            </header>
          )}

          <AnimatePresence mode="wait">
            <motion.main
              key={viewingAddress || "disconnected"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col"
            >
              <MainContent
                viewingAddress={viewingAddress}
                setViewingAddress={setViewingAddress}
                isLoading={isLoading}
              />
            </motion.main>
          </AnimatePresence>
        </div>
      </WalletProvider>
    </ThemeProvider>
  )
}

function WalletConnectSection({
  manualAddress,
  setManualAddress,
  viewingAddress,
  setViewingAddress,
  onManualView,
  isLoading,
}: {
  manualAddress: string
  setManualAddress: (address: string) => void
  viewingAddress: string
  setViewingAddress: (address: string) => void
  onManualView: () => void
  isLoading: boolean
}) {
  const { connected, publicKey } = useWallet()

  // If connected with wallet adapter, use that address
  if (connected && publicKey) {
    return <WalletDisconnectButton />
  }

  // If viewing a manual address, show disconnect option
  if (viewingAddress) {
    return (
      <button
        onClick={() => setViewingAddress("")}
        className="px-3 py-1.5 text-sm rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
      >
        Disconnect
      </button>
    )
  }

  // Otherwise show connect options
  return (
    <div className="flex items-center gap-2">
      <WalletMultiButton />
    </div>
  )
}

function MainContent({
  viewingAddress,
  setViewingAddress,
  isLoading,
}: {
  viewingAddress: string
  setViewingAddress: (address: string) => void
  isLoading: boolean
}) {
  const { connected, publicKey } = useWallet()

  // Show connected state if wallet is connected or viewing address
  if (connected || viewingAddress) {
    return <ConnectedState address={publicKey?.toString() || viewingAddress} />
  }

  // Otherwise show disconnected state
  return <DisconnectedState onAddressSubmit={setViewingAddress} isLoading={isLoading} />
}
