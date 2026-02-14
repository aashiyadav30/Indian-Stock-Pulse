export interface Stock {
  symbol: string;
  name: string;
  slug: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  volume: string;
  weekHigh52: number;
  weekLow52: number;
  sector: string;
  sectorSlug: string;
  overview: string;
  chartData: { time: string; price: number }[];
}

const generateChartData = (basePrice: number, positive: boolean): { time: string; price: number }[] => {
  const data: { time: string; price: number }[] = [];
  let price = basePrice * (positive ? 0.97 : 1.03);
  for (let i = 9; i <= 15; i++) {
    for (let m = 0; m < 60; m += 15) {
      const drift = positive ? 0.001 : -0.001;
      const noise = (Math.random() - 0.5) * basePrice * 0.005;
      price = price * (1 + drift) + noise;
      data.push({
        time: `${i.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`,
        price: Math.round(price * 100) / 100,
      });
    }
  }
  return data;
};

export const stocks: Stock[] = [
  {
    symbol: "RELIANCE.NS", name: "Reliance Industries Ltd", slug: "reliance",
    price: 2876.45, change: 42.30, changePercent: 1.49, marketCap: "₹19.5L Cr",
    peRatio: 28.5, volume: "12.4M", weekHigh52: 3024.90, weekLow52: 2220.30,
    sector: "Energy", sectorSlug: "energy",
    overview: "Reliance Industries Limited is an Indian multinational conglomerate, headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.",
    chartData: generateChartData(2876, true),
  },
  {
    symbol: "TCS.NS", name: "Tata Consultancy Services Ltd", slug: "tcs",
    price: 4125.80, change: -28.15, changePercent: -0.68, marketCap: "₹15.1L Cr",
    peRatio: 32.1, volume: "4.8M", weekHigh52: 4592.25, weekLow52: 3311.80,
    sector: "Information Technology", sectorSlug: "it-stocks",
    overview: "Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai. It is part of the Tata Group and operates in 150 locations across 46 countries.",
    chartData: generateChartData(4125, false),
  },
  {
    symbol: "HDFCBANK.NS", name: "HDFC Bank Ltd", slug: "hdfc-bank",
    price: 1724.55, change: 18.90, changePercent: 1.11, marketCap: "₹13.1L Cr",
    peRatio: 21.4, volume: "8.2M", weekHigh52: 1880.00, weekLow52: 1363.55,
    sector: "Banking", sectorSlug: "banking-stocks",
    overview: "HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai. It is India's largest private sector bank by assets and the world's 10th largest bank by market capitalisation.",
    chartData: generateChartData(1724, true),
  },
  {
    symbol: "INFY.NS", name: "Infosys Ltd", slug: "infosys",
    price: 1856.30, change: 24.65, changePercent: 1.35, marketCap: "₹7.7L Cr",
    peRatio: 29.8, volume: "6.1M", weekHigh52: 1997.40, weekLow52: 1358.35,
    sector: "Information Technology", sectorSlug: "it-stocks",
    overview: "Infosys Limited is an Indian multinational corporation that provides business consulting, information technology and outsourcing services. The company was founded in Pune and is headquartered in Bangalore.",
    chartData: generateChartData(1856, true),
  },
  {
    symbol: "ICICIBANK.NS", name: "ICICI Bank Ltd", slug: "icici-bank",
    price: 1198.75, change: -8.40, changePercent: -0.70, marketCap: "₹8.4L Cr",
    peRatio: 18.9, volume: "9.5M", weekHigh52: 1362.35, weekLow52: 970.05,
    sector: "Banking", sectorSlug: "banking-stocks",
    overview: "ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in Mumbai with its registered office in Vadodara. It offers a wide range of banking products and financial services.",
    chartData: generateChartData(1198, false),
  },
  {
    symbol: "HINDUNILVR.NS", name: "Hindustan Unilever Ltd", slug: "hindustan-unilever",
    price: 2534.20, change: 15.80, changePercent: 0.63, marketCap: "₹5.9L Cr",
    peRatio: 58.2, volume: "2.1M", weekHigh52: 2769.65, weekLow52: 2172.05,
    sector: "FMCG", sectorSlug: "fmcg-stocks",
    overview: "Hindustan Unilever Limited is a British-Indian consumer goods company headquartered in Mumbai. It is a subsidiary of Unilever, a British company. Its products include foods, beverages, cleaning agents, personal care products, water purifiers.",
    chartData: generateChartData(2534, true),
  },
  {
    symbol: "SBIN.NS", name: "State Bank of India", slug: "sbi",
    price: 812.30, change: -12.55, changePercent: -1.52, marketCap: "₹7.2L Cr",
    peRatio: 10.8, volume: "18.7M", weekHigh52: 912.10, weekLow52: 600.65,
    sector: "Banking", sectorSlug: "banking-stocks",
    overview: "State Bank of India is an Indian multinational public sector bank and financial services statutory body headquartered in Mumbai. SBI is the 43rd largest bank in the world and ranked 221st in the Fortune Global 500 list.",
    chartData: generateChartData(812, false),
  },
  {
    symbol: "BHARTIARTL.NS", name: "Bharti Airtel Ltd", slug: "bharti-airtel",
    price: 1645.90, change: 32.10, changePercent: 1.99, marketCap: "₹9.8L Cr",
    peRatio: 75.3, volume: "5.3M", weekHigh52: 1779.00, weekLow52: 1200.50,
    sector: "Telecom", sectorSlug: "telecom-stocks",
    overview: "Bharti Airtel Limited is an Indian multinational telecommunications services company headquartered in New Delhi. It operates in 18 countries across South Asia and Africa. Airtel provides mobile, broadband and DTH services.",
    chartData: generateChartData(1645, true),
  },
  {
    symbol: "WIPRO.NS", name: "Wipro Ltd", slug: "wipro",
    price: 542.15, change: -6.80, changePercent: -1.24, marketCap: "₹2.8L Cr",
    peRatio: 24.6, volume: "7.9M", weekHigh52: 598.75, weekLow52: 408.40,
    sector: "Information Technology", sectorSlug: "it-stocks",
    overview: "Wipro Limited is an Indian multinational corporation that provides information technology, consulting, and business process services. Headquartered in Bangalore, Wipro is one of the leading IT companies in India.",
    chartData: generateChartData(542, false),
  },
  {
    symbol: "ITC.NS", name: "ITC Ltd", slug: "itc",
    price: 468.75, change: 5.20, changePercent: 1.12, marketCap: "₹5.8L Cr",
    peRatio: 27.9, volume: "14.2M", weekHigh52: 528.55, weekLow52: 399.35,
    sector: "FMCG", sectorSlug: "fmcg-stocks",
    overview: "ITC Limited is an Indian conglomerate company headquartered in Kolkata. ITC has a diversified presence across industries such as FMCG, hotels, software, packaging, paperboards and specialty papers, and agri-business.",
    chartData: generateChartData(468, true),
  },
  {
    symbol: "TATAMOTORS.NS", name: "Tata Motors Ltd", slug: "tata-motors",
    price: 978.40, change: 22.85, changePercent: 2.39, marketCap: "₹3.6L Cr",
    peRatio: 8.5, volume: "11.3M", weekHigh52: 1069.00, weekLow52: 620.55,
    sector: "Automobile", sectorSlug: "auto-stocks",
    overview: "Tata Motors Limited is an Indian multinational automotive manufacturing company, headquartered in Mumbai. The company produces passenger cars, trucks, vans, coaches, buses, luxury cars, sports cars, and construction equipment.",
    chartData: generateChartData(978, true),
  },
  {
    symbol: "MARUTI.NS", name: "Maruti Suzuki India Ltd", slug: "maruti-suzuki",
    price: 12450.60, change: -185.30, changePercent: -1.47, marketCap: "₹3.9L Cr",
    peRatio: 32.7, volume: "1.2M", weekHigh52: 13680.00, weekLow52: 9737.65,
    sector: "Automobile", sectorSlug: "auto-stocks",
    overview: "Maruti Suzuki India Limited is an Indian automobile manufacturer headquartered in New Delhi. It is a 56.37% owned subsidiary of the Japanese automobile and motorcycle manufacturer Suzuki Motor Corporation.",
    chartData: generateChartData(12450, false),
  },
];

export const sectors = [
  { name: "Information Technology", slug: "it-stocks", icon: "💻", count: 3 },
  { name: "Banking", slug: "banking-stocks", icon: "🏦", count: 3 },
  { name: "Energy", slug: "energy", icon: "⚡", count: 1 },
  { name: "FMCG", slug: "fmcg-stocks", icon: "🛒", count: 2 },
  { name: "Telecom", slug: "telecom-stocks", icon: "📡", count: 1 },
  { name: "Automobile", slug: "auto-stocks", icon: "🚗", count: 2 },
];

export const getStockBySlug = (slug: string): Stock | undefined =>
  stocks.find((s) => s.slug === slug);

export const getStocksBySector = (sectorSlug: string): Stock[] =>
  stocks.filter((s) => s.sectorSlug === sectorSlug);

export const getTopGainers = (): Stock[] =>
  [...stocks].sort((a, b) => b.changePercent - a.changePercent).slice(0, 5);

export const getTopLosers = (): Stock[] =>
  [...stocks].sort((a, b) => a.changePercent - b.changePercent).slice(0, 5);

export const getSectorBySlug = (slug: string) =>
  sectors.find((s) => s.slug === slug);

export const marketIndices = [
  { name: "NIFTY 50", value: 24580.25, change: 142.30, changePercent: 0.58 },
  { name: "SENSEX", value: 80845.75, change: 468.85, changePercent: 0.58 },
  { name: "NIFTY BANK", value: 52340.10, change: -128.45, changePercent: -0.25 },
  { name: "NIFTY IT", value: 41250.80, change: 215.60, changePercent: 0.53 },
];
