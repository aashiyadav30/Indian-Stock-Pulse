"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, BarChart3, Activity, TrendingUp } from "lucide-react";
import StockChart from "@/components/StockChart";
import PriceChangeBadge from "@/components/PriceChangeBadge";
import { Stock } from "@/lib/stockData";

export default function StockDetailPage({ stock }: { stock: Stock }) {
  const isPositive = stock.change >= 0;
  const weekRange52Percent =
    ((stock.price - stock.weekLow52) / (stock.weekHigh52 - stock.weekLow52)) * 100;

  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      {/* Header */}
      <div className="mb-8">

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground font-mono mb-1">{stock.symbol}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{stock.name}</h1>
            <Link href={`/sectors/${stock.sectorSlug}`} className="inline-block mt-2 text-xs px-2.5 py-1 rounded-md bg-accent text-accent-foreground hover:bg-accent/80 transition-colors">
              {stock.sector}
            </Link>
          </div>
          <div className="text-left md:text-right">
            <p className="text-4xl font-bold font-mono text-foreground">
              ₹{stock.price.toLocaleString('en-IN')}
            </p>
            <PriceChangeBadge change={stock.change} changePercent={stock.changePercent} size="md" />
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">Intraday Price Chart</h2>
        <StockChart data={stock.chartData} isPositive={isPositive} />
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Market Cap", value: stock.marketCap, icon: Building2 },
          { label: "P/E Ratio", value: stock.peRatio.toFixed(1), icon: BarChart3 },
          { label: "Volume", value: stock.volume, icon: Activity },
          { label: "Sector", value: stock.sector, icon: TrendingUp },
        ].map((m, i) => (
          <div key={i} className="glass-card p-4">
            <m.icon className="w-4 h-4 text-primary mb-2" />
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className="text-lg font-bold font-mono text-foreground mt-1">{m.value}</p>
          </div>
        ))}
      </div>

      {/* 52-Week Range */}
     <div className="glass-card p-5 mb-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">52-Week Range</h2>
        <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-2">
          <span>₹{stock.weekLow52.toLocaleString('en-IN')}</span>
          <span>₹{stock.weekHigh52.toLocaleString('en-IN')}</span>
        </div>
        <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full rounded-full bg-primary"
            style={{ width: `${Math.min(Math.max(weekRange52Percent, 2), 98)}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-foreground border-2 border-primary"
            style={{ left: `${Math.min(Math.max(weekRange52Percent, 2), 98)}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>
        <p className="text-center text-xs text-muted-foreground mt-2 font-mono">
          Current: ₹{stock.price.toLocaleString('en-IN')}
        </p>
      </div>

      {/* Overview */}
      <div className="glass-card p-5">
        <h2 className="text-sm font-medium text-muted-foreground mb-3">Company Overview</h2>
        <p className="text-foreground leading-relaxed">{stock.overview}</p>
      </div>
    </main>
  );
}
