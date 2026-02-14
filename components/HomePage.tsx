"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { TrendingUp, TrendingDown, BarChart3, Zap } from "lucide-react";
import StockCard from "@/components/StockCard";
import { stocks, sectors, getTopGainers, getTopLosers } from "@/lib/stockData";

export default function HomePage() {
  const gainers = getTopGainers();
  const losers = getTopLosers();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 pt-16 pb-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Live Market Data
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4">
              Indian Stock{" "}
              <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Real-time NSE & BSE market data, stock analysis, and investment insights.
              Track top Indian stocks, sectors, and market trends.
            </p>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10"
          >
            {[
              { label: "Stocks Tracked", value: `${stocks.length}+`, icon: BarChart3 },
              { label: "Sectors", value: `${sectors.length}`, icon: TrendingUp },
              { label: "Market Cap Coverage", value: "₹80L Cr+", icon: Zap },
              { label: "Data Points", value: "Real-Time", icon: TrendingDown },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4">
                <stat.icon className="w-4 h-4 text-primary mb-2" />
                <p className="text-xl font-bold text-foreground font-mono">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Gainers & Losers */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Top Gainers */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-gain" />
              <h2 className="text-xl font-bold text-foreground">Top Gainers</h2>
            </div>
            <div className="grid gap-3">
              {gainers.map((stock, i) => (
                <StockCard key={stock.slug} stock={stock} index={i} />
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <TrendingDown className="w-5 h-5 text-loss" />
              <h2 className="text-xl font-bold text-foreground">Top Losers</h2>
            </div>
            <div className="grid gap-3">
              {losers.map((stock, i) => (
                <StockCard key={stock.slug} stock={stock} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-foreground mb-6">Explore by Sector</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {sectors.map((sector, i) => (
            <motion.div
              key={sector.slug}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Link href={`/sectors/${sector.slug}`}>
                <div className="glass-card-hover p-4 text-center">
                  <span className="text-2xl mb-2 block">{sector.icon}</span>
                  <p className="text-sm font-medium text-foreground">{sector.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{sector.count} stocks</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* All Stocks */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-xl font-bold text-foreground mb-6">All Indian Stocks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {stocks.map((stock, i) => (
            <StockCard key={stock.slug} stock={stock} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
