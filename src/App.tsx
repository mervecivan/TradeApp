import { Search, Bell, Settings } from "lucide-react"
import { Sidebar } from "./components/Sidebar"
import { Input } from "./components/ui/input"
import {Avatar, AvatarFallback, AvatarImage} from "./components/ui/avatar"
import { StockControl } from "./components/StockControl"
import Watchlist from "./components/Watchlist"
import { StockMarketList } from "./components/StockMarketList"
import { BottomFooter } from "./components/Footer"

function App() {

  return (
      <div className="flex min-h-screen bg-[#0E0E10] text-white">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <header className="flex justify-between items-center p-4 h-16 border-b border-gray-800 bg-black sticky top-0 z-10">
            <div className="flex items-center space-x-2 w-1/3">
            <Search className="h-5 w-5 text-gray-500"/>
            <Input
            placeholder="Search stocks, news, and more"
            className="bg-gray-900 border-none placeholder:text-gray-500 focus-visible:ring-0 focus-visible:ring-offset-0"
             />
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer" />
              <Settings className="h-6 w-6 text-gray-400 hover:text-white cursor-pointer"/>
              
              <div className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-900 cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt= "User" />
                  <AvatarFallback>JM</AvatarFallback>
                  </Avatar>
              </div>
            </div>
          </header>

          <main className="flex-1 p-6 space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8">
                <Watchlist />
              </div>

              <div className="col-span-12 lg:col-span-4 space-y-6">
                <StockControl />
                <StockMarketList />
              </div>
            </div>
          </main>
          
          <BottomFooter />
        </div>
      </div>
  )
}

export default App
