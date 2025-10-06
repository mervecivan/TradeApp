import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
// import { Input } from "./ui/input" 
// import { Badge } from "./ui/badge" 
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCryptoData } from "@/hooks/useCryptoData"

const getLogoColor = (symbol: string) => {
  const colors = ["bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-indigo-500"]
  let hash = 0
  for (let i = 0; i < symbol.length; i++) {
    hash = symbol.charCodeAt(i) + ((hash << 5) - hash)
  }
  return colors[Math.abs(hash) % colors.length] 
}

const Watchlist = () => {
  const { data: cryptoData, loading, error } = useCryptoData();

  if (loading) {
    return (
      <div className="bg-gray-900  rounded-xl shadow-lg border border-gray-800 p-6 flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500 mr-2" />
        <span className="text-white">Loading Live Crypto Datas...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-900/50 rounded-xl shadow-lg border border-red-800 p-6 text-red-300">
        <p className="font-bold mb-2">Data Fetch Error:</p>
        <p>{error}</p>
      </div>
    );
  }

  const watchlistDisplay = cryptoData.slice(0, 8);
  const updateTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Watchlist</h2>
          <p className="text-sm text-gray-500">Update {new Date().toLocaleDateString()} at {updateTime}</p>
        </div>
        <Button variant="outline" className="bg-green-600 hover:bg-green-700 text-white border-green-600">
          + Watchlist
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="border-b border-gray-700/50">
            <TableRow className="border-gray-800 hover:bg-gray-800/50">
              <TableHead className="w-[180px] text-gray-400 font-normal py-3 px-4">Stock Name</TableHead>
              <TableHead className="text-gray-400 font-normal py-3 px-4">Price</TableHead>
              <TableHead className="text-gray-400 font-normal py-3 px-4">Value</TableHead>
              <TableHead className="text-gray-400 font-normal py-3 px-4">Balance (Volume)</TableHead>
              <TableHead className="text-gray-400 font-normal py-3 px-4">Chart</TableHead>
              <TableHead className="text-right text-gray-400 font-normal py-3 px-4">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {watchlistDisplay.map((item) => {
              const isUp = item.price_change_percentage_24h >= 0;
              const logoColor = getLogoColor(item.symbol);
              const chartColor = isUp ? 'stroke-green-500' : 'stroke-red-500';
              const valueColor = isUp ? 'text-green-500' : 'text-red-500';

              const valueChangeUSD = Math.abs(item.price_change_percentage_24h * item.current_price / 100).toFixed(2);

              return (
                <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/70">
                  <TableCell className="font-medium flex items-center space-x-3 py-4">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white", logoColor)}>
                      {item.symbol[0]}
                    </div>
                    <div>
                      <p className="text-white text-sm">{item.symbol} **</p>
                      <p className="text-xs text-gray-400">{item.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">${item.current_price.toFixed(2)}</TableCell>
                  <TableCell className={cn("font-medium", valueColor)}>
                    <div className="flex items-center">
                      {isUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                      ${valueChangeUSD}
                    </div>
                  </TableCell>
                  <TableCell className="text-white">
                    ${(item.total_volume / 1000000).toFixed(2)}M
                  </TableCell>
                  
                  <TableCell>
                    <svg width="60" height="20" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path 
                        d={isUp 
                            ? "M1 18L10 10L20 15L30 5L40 12L50 8L59 15" 
                            : "M1 5L10 13L20 8L30 18L40 11L50 15L59 8"} 
                        className={chartColor} 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                      />
                    </svg>
                  </TableCell>
                  
                  <TableCell className="text-right">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">Buy</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Watchlist