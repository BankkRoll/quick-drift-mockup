import type React from "react"
import { Layers, Zap, Shield, Users } from "lucide-react"

export function DriftProtocolInfo() {
  return (
    <div className="w-full bg-muted/30 border-t border-border/30 py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">About Drift Protocol</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Drift is a decentralized exchange built on Solana that enables permissionless leverage trading and efficient
            passive yield strategies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={<Layers className="h-5 w-5" />} title="$1.2B+" description="Total Trading Volume" />
          <StatCard icon={<Zap className="h-5 w-5" />} title="10x" description="Maximum Leverage" />
          <StatCard icon={<Shield className="h-5 w-5" />} title="$50M+" description="Total Value Locked" />
          <StatCard icon={<Users className="h-5 w-5" />} title="50,000+" description="Active Traders" />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Perpetual Futures</span> - Trade BTC, ETH, SOL and more with up to 10x
                  leverage
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Cross-Collateral</span> - Use any supported asset as collateral for
                  trading
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Isolated Subaccounts</span> - Manage risk with separate trading accounts
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Zap className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Advanced Order Types</span> - Place limit, market, and scaled orders
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Security & Reliability</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Audited Smart Contracts</span> - Multiple security audits by leading
                  firms
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Insurance Fund</span> - Protection against socialized losses
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Decentralized Oracle Network</span> - Reliable price feeds from multiple
                  sources
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="rounded-full bg-primary/10 p-1 mt-0.5">
                  <Shield className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm">
                  <span className="font-medium">Non-Custodial</span> - You always maintain control of your assets
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-background/40 backdrop-blur-sm border border-border/30 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-full bg-primary/10 p-2">{icon}</div>
        <h3 className="text-2xl font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  )
}
