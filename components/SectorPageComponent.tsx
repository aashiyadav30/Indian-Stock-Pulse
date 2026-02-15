"use client";

import Link from "next/link";
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

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{sector.name}</h1>
        <p className="text-muted-foreground">
          Tracking {stocks.length} {sector.name.toLowerCase()} companies
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {stocks.map((stock, i) => (
          <StockCard key={stock.slug} stock={stock} index={i} />
        ))}
      </div>
    </main>
  );
}