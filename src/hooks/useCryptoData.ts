import { useState, useEffect } from "react"
import { getCryptoData, type CoinData } from "@/api/cryptoService"

export const useCryptoData = () => {
    const [ data, setData ] = useState<CoinData[]>([])
    const [ loading, setLoading ]= useState(true)
    const [ error, setError ] = useState<string | null>(null)

    useEffect(()=> {
        const fetchData = async () => {
            try {
                setLoading(true)
                const result = await getCryptoData(10)
                setData(result)
                setError(null)
            } catch (e){
                if (e instanceof Error){
                    setError(e.message)
                } else{
                    setError("Veri yükleme sırasında bir hata oluştu.")
                }
                setData([]) //if error occured then delete the data
            } finally {
                setLoading(false)
            }
        }

        fetchData()

        // every 60 second fetch data for current data 
        const intervalId = setInterval(fetchData, 60000)

        return () => clearInterval(intervalId)
    }, [])
    return { data, loading, error}
}