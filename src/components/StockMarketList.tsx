import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCryptoData } from "@/hooks/useCryptoData"; // <-- Yeni Hook'umuz

const getLogoColor = (symbol: string) => {
    const colors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500", "bg-indigo-500"];
    let hash = 0;
    for (let i = 0; i < symbol.length; i++) {
        hash = symbol.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
};

export function StockMarketList() {
    // hook entegration
    const { data: cryptoData, loading, error } = useCryptoData();

    //handling loading and error events
    if (loading) {
        return (
            <div className="p-4 rounded-xl bg-gray-900 shadow-lg border border-gray-800 flex flex-col items-center justify-center h-[250px]">
                 <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
         return (
            <div className="p-4 rounded-xl bg-red-900/50 shadow-lg border border-red-800 text-red-300">
                Market data could not be loaded.
            </div>
        );
    }
    
    
    const marketDisplay = cryptoData.slice(0, 5);

    return (
        <div className="p-4 rounded-xl bg-gray-900 shadow-lg border border-gray-800">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-white">Stock Market</h3>
                <Button variant="link" className="text-blue-400 p-0 h-auto hover:text-blue-300">See All</Button>
            </div>

            <div className="space-y-3">
                {marketDisplay.map((item) => {
                    const isUp = item.price_change_percentage_24h >= 0;
                    const logoColor = getLogoColor(item.symbol);
                    
                    return (
                        <div key={item.id} className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
                            <div className="flex items-center space-x-3">
                                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white", logoColor)}>
                                    {item.symbol[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{item.symbol}</p>
                                    <p className="text-xs text-gray-400">{item.name}</p>
                                </div>
                            </div>
                            
                            <div className="text-right">
                                <p className="text-sm font-medium text-white">${item.current_price.toFixed(2)}</p>
                                <p className={cn("text-xs flex items-center justify-end", isUp ? "text-green-500" : "text-red-500")}>
                                    {isUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                                    {item.price_change_percentage_24h.toFixed(2)}%
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}