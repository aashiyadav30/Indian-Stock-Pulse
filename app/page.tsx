import { Metadata } from "next";
import HomePage from "@/components/HomePage";

export const metadata: Metadata = {
  title: "Indian Stock Insights – Real-Time NSE & BSE Market Data",
  description: "Track live Indian stock prices, market data, and analysis. Get real-time NSE & BSE share prices, top gainers, losers, and sector-wise stock insights for 2026.",
  openGraph: {
    title: "Indian Stock Insights – Real-Time NSE & BSE Market Data",
    description: "Track live Indian stock prices, market data, and analysis.",
    type: "website",
  },
};

export default function Page() {
  return <HomePage />;
}
