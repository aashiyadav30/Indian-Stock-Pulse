import { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorPageComponent from "@/components/SectorPageComponent";
import { getSectorBySlug, getStocksBySector, sectors } from "@/lib/stockData";

type Props = {
  params: { sector: string };
};

export async function generateStaticParams() {
  return sectors.map((sector) => ({
    sector: sector.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const sector = getSectorBySlug(params.sector);
  const stocks = getStocksBySector(params.sector);

  if (!sector) {
    return {
      title: "Sector Not Found",
    };
  }

  return {
    title: `${sector.name} Stocks – Top ${sector.name} Companies in India`,
    description: `Explore ${stocks.length} ${sector.name} stocks listed on NSE & BSE. Track live share prices, performance, and analysis of leading ${sector.name} companies in India.`,
    openGraph: {
      title: `${sector.name} Stocks`,
      description: `Track ${stocks.length} ${sector.name} companies in India`,
      type: "website",
    },
  };
}

export default function Page({ params }: Props) {
  const sector = getSectorBySlug(params.sector);
  const stocks = getStocksBySector(params.sector);

  if (!sector) {
    notFound();
  }

  return <SectorPageComponent sector={sector} stocks={stocks} />;
}
