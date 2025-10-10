import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface CryptoData {
    id: number;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
    total_volume: number;
    last_updated: string;
    price_change_percentage_24h: number;
    quantity: number;
}

export function useCryptoData_(){
    const [data, setData] = useState<CryptoData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("cryptos")
        .select("*")
        .order("market_cap", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setData(data || []);
      }

      setLoading(false);
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}