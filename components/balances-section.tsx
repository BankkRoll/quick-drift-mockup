"use client"

import { useState } from "react"
import { ArrowDownToLine, ArrowUpFromLine, Plus, RefreshCw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DepositModal } from "@/components/deposit-modal"
import { WithdrawModal } from "@/components/withdraw-modal"
import { AddTokenModal } from "@/components/add-token-modal"
import { useToast } from "@/hooks/use-toast"

// Mock balance data
const balances = [
  { token: "USDC", balance: "1,245.32", value: "$1,245.32" },
  { token: "SOL", balance: "12.5", value: "$567.89" },
  { token: "BTC", balance: "0.0045", value: "$89.45" },
  { token: "ETH", balance: "0.125", value: "$234.56" },
]

export function BalancesSection() {
  const [depositOpen, setDepositOpen] = useState(false)
  const [withdrawOpen, setWithdrawOpen] = useState(false)
  const [addTokenOpen, setAddTokenOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState("")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const { toast } = useToast()

  const handleDeposit = (token: string) => {
    setSelectedToken(token)
    setDepositOpen(true)
  }

  const handleWithdraw = (token: string) => {
    setSelectedToken(token)
    setWithdrawOpen(true)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast({
        title: "Balances refreshed",
        description: "Your token balances have been updated.",
      })
    }, 1000)
  }

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Token Balances</h3>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh</span>
          </Button>
        </div>
        <Button variant="outline" size="sm" className="gap-1" onClick={() => setAddTokenOpen(true)}>
          <Plus className="h-4 w-4" /> Add Token
        </Button>
      </div>

      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[25%]">Token</TableHead>
                  <TableHead className="w-[25%] text-right">Balance</TableHead>
                  <TableHead className="w-[25%] text-right">Value</TableHead>
                  <TableHead className="w-[25%] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {balances.map((item) => (
                  <TableRow key={item.token} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          {item.token.substring(0, 2)}
                        </div>
                        {item.token}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{item.balance}</TableCell>
                    <TableCell className="text-right">{item.value}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 hover:bg-primary/10"
                          onClick={() => handleDeposit(item.token)}
                        >
                          <ArrowDownToLine className="h-3.5 w-3.5" />
                          <span>Deposit</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1 hover:bg-primary/10"
                          onClick={() => handleWithdraw(item.token)}
                        >
                          <ArrowUpFromLine className="h-3.5 w-3.5" />
                          <span>Withdraw</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {balances.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No tokens found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <DepositModal open={depositOpen} onOpenChange={setDepositOpen} token={selectedToken} />
      <WithdrawModal open={withdrawOpen} onOpenChange={setWithdrawOpen} token={selectedToken} />
      <AddTokenModal open={addTokenOpen} onOpenChange={setAddTokenOpen} />
    </div>
  )
}
