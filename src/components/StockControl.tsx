"use client";

import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from 'lucide-react';

import { useCryptoData } from "@/hooks/useCryptoData"; 

const formSchema = z.object({
  code: z.string().min(1, { message: "Stok kodu gereklidir." }).max(5, { message: "Kod en fazla 5 karakter olmalıdır." }),
  quantity: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Geçerli bir miktar girin.",
  }),
  price: z.number(), 
});

type StockControlValues = z.infer<typeof formSchema>;

export function StockControl() {
  const { data: cryptoData, loading, error } = useCryptoData();

  const form = useForm<StockControlValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      quantity: "1", 
      price: 0
    },
    mode: "onChange"
  });

  useEffect(() => {
    if (!loading && cryptoData.length > 0) {
        const defaultCoin = cryptoData[0]; 
        
        form.setValue("code", defaultCoin.symbol);
        form.setValue("price", defaultCoin.current_price);
    }
  }, [loading, cryptoData, form]);

  function onSubmit(values: StockControlValues, action: 'Buy' | 'Sell') {
    const quantity = parseFloat(values.quantity);
    console.log(`--- ${action} İşlemi Başlatıldı ---`);
    console.log("Stok Kodu:", values.code);
    console.log("Miktar:", quantity);
    console.log("Fiyat:", values.price);
    
    
    alert(`İşlem başarılı: ${quantity} adet ${values.code} ${action} edildi.`);
  }

  if (loading) {
    return (
        <div className="p-4 rounded-xl bg-gray-900 shadow-lg border border-gray-800 flex items-center justify-center h-[320px]">
            <Loader2 className="w-6 h-6 animate-spin text-blue-500 mr-2" />
            <span className="text-white">Veri hazırlanıyor...</span>
        </div>
    );
  }

  if (error || cryptoData.length === 0) {
    return (
        <div className="p-4 rounded-xl bg-red-900/50 shadow-lg border border-red-800 text-red-300">
            Stock kontrol formu yüklenemedi: {error || "API'den veri gelmedi."}
        </div>
    );
  }

  const currentStock = cryptoData[0];
  const currentPrice = form.watch("price");
  const currentTicker = form.watch("code");
  const currentLogo = currentTicker[0] || 'N';

  return (
    <div className="p-4 rounded-xl bg-gray-900 shadow-lg border border-gray-800">
      <h3 className="text-xl font-semibold mb-6 text-white">Stock</h3>
      
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-white">${currentPrice.toFixed(2)}</span>
          <span className="text-sm ml-2 text-gray-400">USD</span>
        </div>
        <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-white">{currentTicker}</span>
            <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {currentLogo}
            </div> 
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          
          <div className="flex space-x-2">
            
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="flex-1 space-y-1">
                  <FormLabel className="text-gray-400">Code</FormLabel>
                  <FormControl>
                    <Input 
                      className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-600 focus-visible:ring-offset-0" 
                      {...field} 
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex-1">
                <FormLabel className="text-gray-400 block mb-3">Price</FormLabel>
                <div className="relative">
                    <Input 
                        className="bg-black border-gray-700 text-white pl-8 cursor-not-allowed" 
                        value={currentPrice.toFixed(2)} 
                        disabled
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                </div>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
                <FormItem className="space-y-1">
                    <FormLabel className="text-gray-400">Quantity</FormLabel>
                    <FormControl>
                        <Input 
                            className="bg-black border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-blue-600 focus-visible:ring-offset-0" 
                            placeholder="Miktar" 
                            type="number" 
                            min="0.0001"
                            step="0.0001"
                            {...field} 
                            onChange={(e) => field.onChange(e.target.value)}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
          />

          <div className="text-sm text-gray-500 pt-1 pb-4">No extra fees</div>
          
          <div className="flex space-x-2">
            <Button 
                type="button" 
                onClick={form.handleSubmit((values) => onSubmit(values, 'Buy'))}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-semibold"
            >
                Buy
            </Button>
            <Button 
                type="button" 
                onClick={form.handleSubmit((values) => onSubmit(values, 'Sell'))}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-red-600 font-semibold"
            >
                Sell
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}