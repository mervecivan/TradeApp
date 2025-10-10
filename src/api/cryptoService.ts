export interface CoinData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  quantity?: number; // for watchlist use
}

const API_BASE_URL = "http://127.0.0.1:8000"; // backend URL

export const getCryptoData = async (): Promise<CoinData[]> => {
  const url = `${API_BASE_URL}/cryptos`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`API Error ${response.status}: ${text}`);
    }

    const data: any[] = await response.json();

    //backend data turn into frontend model
    return data.map((coin) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      price_change_percentage_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      total_volume: coin.total_volume,
    }));
  } catch (err) {
    console.error("Fetch error:", err);
    if (err instanceof Error) throw err;
    throw new Error("Unknown network error");
  }
  throw new Error("An error occurred while fetching data.");
};
