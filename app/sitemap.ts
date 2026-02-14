import { stocks, sectors } from '@/lib/stockData';

export default function sitemap() {
  const baseUrl = 'https://your-domain.com';
  
  const stockUrls = stocks.map((stock) => ({
    url: `${baseUrl}/stocks/${stock.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
  
  const sectorUrls = sectors.map((sector) => ({
    url: `${baseUrl}/sectors/${sector.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    ...stockUrls,
    ...sectorUrls,
  ];
}