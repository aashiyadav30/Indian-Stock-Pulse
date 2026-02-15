"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, TrendingUp, X, Menu } from "lucide-react";
import { stocks, marketIndices } from "@/lib/stockData";

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const filtered =
    query.length > 0
      ? stocks.filter(
          (s) =>
            s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.symbol.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleStockClick = (slug: string) => {
    router.push(`/stocks/${slug}`);
    setSearchOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Ticker Bar */}
      <div className="w-full bg-secondary/50 border-b border-border/50 overflow-hidden">
        <div className="ticker-scroll flex items-center gap-8 py-1.5 px-4 whitespace-nowrap">
          {[...marketIndices, ...marketIndices].map((idx, i) => (
            <span key={i} className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-foreground">{idx.name}</span>
              <span className="font-mono text-foreground">
                {idx.value.toLocaleString("en-IN")}
              </span>
              <span
                className={`font-mono ${
                  idx.change >= 0 ? "text-gain" : "text-loss"
                }`}
              >
                {idx.change >= 0 ? "+" : ""}
                {idx.change.toFixed(2)} (
                {idx.changePercent >= 0 ? "+" : ""}
                {idx.changePercent.toFixed(2)}%)
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:block">
              Indian Stock <span className="text-primary">Insights</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/sectors/it-stocks"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              IT Stocks
            </Link>
            <Link
              href="/sectors/banking-stocks"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Banking
            </Link>
            <Link
              href="/sectors/auto-stocks"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Auto
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (searchOpen) {
                  setQuery("");
                }
              }}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              aria-label="Toggle search"
            >
              {searchOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors text-muted-foreground md:hidden"
              aria-label="Toggle mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search Dropdown */}
        {searchOpen && (
          <div className="border-t border-border/50 bg-background">
            <div className="container mx-auto px-4 py-3">
              <input
                type="text"
                placeholder="Search stocks... (e.g. Reliance, TCS)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="w-full bg-secondary/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />

              {filtered.length > 0 && (
                <div className="mt-2 glass-card divide-y divide-border/50 max-h-64 overflow-y-auto">
                  {filtered.map((s) => (
                    <button
                      key={s.slug}
                      onClick={() => handleStockClick(s.slug)}
                      className="w-full flex items-center justify-between px-4 py-3 hover:bg-accent/50 transition-colors text-left"
                    >
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {s.name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {s.symbol}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-mono text-foreground">
                          ₹{s.price.toLocaleString("en-IN")}
                        </p>
                        <p
                          className={`text-xs font-mono ${
                            s.change >= 0 ? "text-gain" : "text-loss"
                          }`}
                        >
                          {s.change >= 0 ? "+" : ""}
                          {s.changePercent.toFixed(2)}%
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {query.length > 0 && filtered.length === 0 && (
                <div className="mt-2 glass-card px-4 py-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    No stocks found matching &quot;{query}&quot;
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-border/50 md:hidden bg-background">
            <div className="px-4 py-3 flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/sectors/it-stocks"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                IT Stocks
              </Link>
              <Link
                href="/sectors/banking-stocks"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Banking
              </Link>
              <Link
                href="/sectors/auto-stocks"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Auto
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;