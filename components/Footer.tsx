import Link from "next/link";
import { TrendingUp } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-secondary/30 mt-20">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-foreground">Indian Stock Insights</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Real-time NSE & BSE market data, stock analysis, and insights for Indian investors.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Sectors</h4>
          <div className="flex flex-col gap-2">
            <Link href="/sectors/it-stocks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">IT Stocks</Link>
            <Link href="/sectors/banking-stocks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Banking Stocks</Link>
            <Link href="/sectors/energy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Energy</Link>
            <Link href="/sectors/fmcg-stocks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FMCG</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Popular Stocks</h4>
          <div className="flex flex-col gap-2">
            <Link href="/stocks/reliance" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reliance Industries</Link>
            <Link href="/stocks/tcs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">TCS</Link>
            <Link href="/stocks/hdfc-bank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">HDFC Bank</Link>
            <Link href="/stocks/infosys" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Infosys</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-3 text-sm">Disclaimer</h4>
          <p className="text-xs text-muted-foreground">
            Data is for informational purposes only. Not investment advice. Stock prices may be delayed. Please verify with official exchanges before making investment decisions.
          </p>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © 2026 Indian Stock Insights. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
