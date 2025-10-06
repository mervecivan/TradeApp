// API functions
const API_BASE_URL = "https://api.coingecko.com/api/v3";
export interface CoinData {
    id: string
    symbol: string
    name: string
    current_price: number
    price_change_percentage_24h: number
    market_cap: number
    total_volume: number
}

export const getCryptoData = async (count: number = 10): Promise<CoinData[]> => {

    const url = `${API_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${count}&page=1&sparkline=false&locale=en`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            const errorDetail = response.text()
            throw new Error(`API Hatası ${response.status}: ${response.statusText}. Detay: ${(await errorDetail).substring(0, 100)}`)
        }

        const data: any[] = await response.json()

        return data.map(coin => ({
            id: coin.id,
            symbol: coin.symbol,
            name: coin.name,
            current_price: coin.current_price,
            price_change_percentage_24h: coin.price_change_percentage_24h,
            market_cap: coin.market_cap,
            total_volume: coin.total_volume,

        }))
    } catch (error){
        console.error("API isteği hatası: ", error)
        if (error instanceof Error){
            throw error
        }
        throw new Error("Veri yüklenirken bilinmeyen bir ağ hatası oluştu.")
    }
}