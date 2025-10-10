import { useState, useEffect } from "react";
import { getCryptoData, type CoinData } from "@/api/cryptoService";

export const useCryptoData = () => {
  const [data, setData] = useState<CoinData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCryptoData();
        setData(result);
        setError(null);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        else setError("An error occurred while loading data.");
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // refresh every 60 seconds
    const intervalId = setInterval(fetchData, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return { data, loading, error };
};
