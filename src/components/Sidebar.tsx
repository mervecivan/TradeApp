import { LayoutDashboard, Wallet, User, LogOut, Heart, BarChart3, Users, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  icon: React.ElementType;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { name: "Stock", icon: BarChart3, href: "#stock" },
  { name: "Favorite", icon: Heart, href: "#favorite" }, 
  { name: "Wallet", icon: Wallet, href: "#wallet" },
];

const accountItems: NavItem[] = [
  { name: "Our community", icon: Users, href: "#community" },
  { name: "Profile", icon: User, href: "#profile" },
  { name: "Contact Us", icon: Settings, href: "#contact" },
];

export function Sidebar() {
  const activePath = "#favorite";

  return (
    <div className="flex flex-col w-56 h-screen bg-black text-gray-400 p-4 border-r border-gray-800 sticky top-0">
      <h1 className="text-xl font-bold text-white mb-8">TradeApp</h1>
      
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 p-3 rounded-lg transition-colors",
              item.href === activePath 
                ? "bg-gray-800 text-white font-semibold" 
                : "hover:bg-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="mt-8 pt-4 border-t border-gray-800 space-y-1">
        <p className="uppercase text-xs font-semibold tracking-wider text-gray-500 mb-2">Account</p>
        {accountItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-900 transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </a>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-800">
        <a 
          href="#logout" 
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-900 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </a>
      </div>
    </div>
  );
}