import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Indian Stock Insights – Real-Time NSE & BSE Market Data",
  description: "Track live Indian stock prices, market data, and analysis. Get real-time NSE & BSE share prices, top gainers, losers, and sector-wise stock insights for 2026.",
  keywords: ["Indian stocks", "NSE", "BSE", "stock market", "share prices", "stock analysis"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
