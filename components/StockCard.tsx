"use client";

import Link from "next/link";
import type { Stock } from "@/lib/stockData";
import PriceChangeBadge from "./PriceChangeBadge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StockCardProps {
  stock: Stock;
  index?: number;
}

const StockCard = ({ stock, index = 0 }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  return (
    <div>
      <Link href={`/stocks/${stock.slug}`} className="block">
        <div className="glass-card-hover p-5 group">
          <div className="flex items-start justify-between mb-3">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-foreground truncate text-sm">
                {stock.name}
              </h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {stock.symbol}
              </p>
            </div>
            <div className={`p-1.5 rounded-lg ${isPositive ? 'bg-gain' : 'bg-loss'}`}>
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-gain" />
              ) : (
                <TrendingDown className="w-4 h-4 text-loss" />
              )}
            </div>
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-2xl font-bold text-foreground font-mono">
                ₹{stock.price.toLocaleString('en-IN')}
              </p>
            </div>
            <PriceChangeBadge change={stock.change} changePercent={stock.changePercent} />
          </div>

          <div className="mt-3 pt-3 border-t border-border/50 flex justify-between text-xs text-muted-foreground">
            <span>Vol: {stock.volume}</span>
            <span>MCap: {stock.marketCap}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StockCard;
