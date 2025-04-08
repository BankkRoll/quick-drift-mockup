"use client"

import type React from "react"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { ArrowUpRight, ArrowDownRight, Clock, DollarSign, TrendingUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for the chart
const generateChartData = (days: number, trend: "up" | "down" | "volatile") => {
  const data = []
  let value = 1000

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))

    if (trend === "up") {
      value = value * (1 + Math.random() * 0.03)
    } else if (trend === "down") {
      value = value * (1 - Math.random() * 0.02)
    } else {
      value = value * (1 + (Math.random() * 0.04 - 0.02))
    }

    data.push({
      date: date.getTime(),
      value: Number.parseFloat(value.toFixed(2)),
    })
  }

  return data
}

// Mock trade history data
const tradeHistory = [
  {
    id: 1,
    market: "SOL-PERP",
    type: "Market",
    side: "Buy",
    size: "10.5",
    price: "$24.35",
    value: "$255.68",
    time: "2023-04-08T14:30:00Z",
  },
  {
    id: 2,
    market: "BTC-PERP",
    type: "Limit",
    side: "Sell",
    size: "0.05",
    price: "$28,450.75",
    value: "$1,422.54",
    time: "2023-04-08T12:15:00Z",
  },
  {
    id: 3,
    market: "ETH-PERP",
    type: "Market",
    side: "Sell",
    size: "1.2",
    price: "$1,875.45",
    value: "$2,250.54",
    time: "2023-04-07T23:45:00Z",
  },
  {
    id: 4,
    market: "SOL-PERP",
    type: "Limit",
    side: "Buy",
    size: "15.0",
    price: "$23.10",
    value: "$346.50",
    time: "2023-04-07T18:20:00Z",
  },
  {
    id: 5,
    market: "BTC-PERP",
    type: "Market",
    side: "Buy",
    size: "0.08",
    price: "$27,890.25",
    value: "$2,231.22",
    time: "2023-04-06T09:10:00Z",
  },
]

interface AnalyticsSectionProps {
  subaccount: { id: number; name: string; balance: string }
}

export function AnalyticsSection({ subaccount }: AnalyticsSectionProps) {
  const [timeframe, setTimeframe] = useState("30d")
  const [chartData, setChartData] = useState(() => generateChartData(30, "up"))

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)

    if (value === "7d") {
      setChartData(generateChartData(7, "up"))
    } else if (value === "30d") {
      setChartData(generateChartData(30, "up"))
    } else if (value === "90d") {
      setChartData(generateChartData(90, "volatile"))
    }
  }

  // Calculate PnL metrics
  const startValue = chartData[0]?.value || 0
  const endValue = chartData[chartData.length - 1]?.value || 0
  const pnlValue = endValue - startValue
  const pnlPercent = (endValue / startValue - 1) * 100

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Performance Analytics</h3>
        <Select value={timeframe} onValueChange={handleTimeframeChange}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Days</SelectItem>
            <SelectItem value="30d">30 Days</SelectItem>
            <SelectItem value="90d">90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <MetricCard
          title="Portfolio Value"
          value={`$${endValue.toLocaleString()}`}
          icon={<DollarSign className="h-4 w-4" />}
        />
        <MetricCard
          title="PnL"
          value={`$${pnlValue.toFixed(2)}`}
          change={`${pnlPercent.toFixed(2)}%`}
          trend={pnlValue >= 0 ? "up" : "down"}
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <MetricCard title="Active Since" value="32 days" icon={<Clock className="h-4 w-4" />} />
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Portfolio Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(tick) => format(new Date(tick), "MMM dd")}
                  stroke="rgba(255,255,255,0.5)"
                />
                <YAxis tickFormatter={(tick) => `$${tick}`} stroke="rgba(255,255,255,0.5)" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-background border border-border/50 p-2 rounded-md shadow-md">
                          <p className="text-sm font-medium">
                            {format(new Date(payload[0].payload.date), "MMM dd, yyyy")}
                          </p>
                          <p className="text-sm text-primary">${payload[0].value}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Market</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-2 px-3 text-xs font-medium text-muted-foreground">Side</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Size</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Price</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Value</th>
                  <th className="text-right py-2 px-3 text-xs font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((trade) => (
                  <tr key={trade.id} className="border-b border-border/20 hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 text-sm font-medium">{trade.market}</td>
                    <td className="py-3 px-3 text-sm">{trade.type}</td>
                    <td className="py-3 px-3 text-sm">
                      <span className={trade.side === "Buy" ? "text-green-500" : "text-red-500"}>{trade.side}</span>
                    </td>
                    <td className="py-3 px-3 text-sm text-right">{trade.size}</td>
                    <td className="py-3 px-3 text-sm text-right">{trade.price}</td>
                    <td className="py-3 px-3 text-sm text-right">{trade.value}</td>
                    <td className="py-3 px-3 text-sm text-right">{format(new Date(trade.time), "MMM dd, HH:mm")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function MetricCard({
  title,
  value,
  change,
  trend,
  icon,
}: {
  title: string
  value: string
  change?: string
  trend?: "up" | "down"
  icon: React.ReactNode
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {change && (
              <div className="flex items-center mt-1">
                {trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={trend === "up" ? "text-green-500 text-xs" : "text-red-500 text-xs"}>{change}</span>
              </div>
            )}
          </div>
          <div className="rounded-full bg-primary/10 p-2">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
