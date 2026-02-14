import { Metadata } from "next";
import { notFound } from "next/navigation";
import StockDetailPage from "@/components/StockDetailPage";
import { getStockBySlug, stocks } from "@/lib/stockData";

type Props = {
  params: { symbol: string };
};

export async function generateStaticParams() {
  return stocks.map((stock) => ({
    symbol: stock.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stock = getStockBySlug(params.symbol);

  if (!stock) {
    return {
      title: "Stock Not Found",
    };
  }

  return {
    title: `${stock.name.split(' ')[0]} Share Price Today, Live NSE Stock Price & Analysis`,
    description: `${stock.name} live share price today is ₹${stock.price.toLocaleString('en-IN')}. Get ${stock.name.split(' ')[0]} stock analysis, key metrics, P/E ratio, market cap, and 52-week range.`,
    openGraph: {
      title: `${stock.name.split(' ')[0]} Share Price Today`,
      description: `${stock.name} live share price: ₹${stock.price.toLocaleString('en-IN')}`,
      type: "website",
    },
  };
}

export default function Page({ params }: Props) {
  const stock = getStockBySlug(params.symbol);

  if (!stock) {
    notFound();
  }

  return <StockDetailPage stock={stock} />;
}
