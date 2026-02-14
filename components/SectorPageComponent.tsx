"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import StockCard from "@/components/StockCard";
import { Stock } from "@/lib/stockData";

type SectorPageProps = {
  sector: { name: string; slug: string; icon: string; count: number };
  stocks: Stock[];
};

export default function SectorPageComponent({ sector, stocks }: SectorPageProps) {
  return (
    <main className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />
        Back to Markets
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{sector.icon}</span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{sector.name}</h1>
        </div>
        <p className="text-muted-foreground">
          Tracking {stocks.length} {sector.name.toLowerCase()} companies
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stocks.map((stock, i) => (
          <StockCard key={stock.slug} stock={stock} index={i} />
        ))}
      </div>
    </main>
  );
}
