import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BottomFooter() {
    return (
        <footer className="w-full bg-black border-t border-gray-800 p-8 pt-12">
            
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 text-gray-400">
                
                {/* Sol Banner Alanı */}
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-xl font-semibold text-white mb-2">Stockin</h3>
                    <p className="text-sm leading-relaxed">
                        Ease of shopping is our main focus. With powerful search features and customizable filters, you can easily find the products you are looking for.
                    </p>
                    <div className="flex space-x-3">
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Facebook className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Instagram className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Linkedin className="w-5 h-5" /></a>
                        <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition"><Twitter className="w-5 h-5" /></a>
                    </div>
                    
                    <div className="space-y-2 pt-4">
                        <p className="text-sm font-medium text-white">Subscribe to Newsletter</p>
                        <div className="relative">
                            <Input 
                                placeholder="Enter Your Email Here" 
                                className="bg-gray-900 border-gray-700 text-white pr-16"
                            />
                             <Button size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gray-600 hover:bg-gray-700">Subscribe</Button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Get Started</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Service</a></li>
                            <li><a href="#" className="hover:text-white">Contact Us</a></li>
                            <li><a href="#" className="hover:text-white">Affiliate Program</a></li>
                            <li><a href="#" className="hover:text-white">About Us</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Get Started</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-white">Dashboard</a></li>
                            <li><a href="#" className="hover:text-white">Platform</a></li>
                            <li><a href="#" className="hover:text-white">Workout Library</a></li>
                            <li><a href="#" className="hover:text-white">App Design</a></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">Get Started</h4>
                        <ul className="space-y-2 text-sm">
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="font-semibold text-white">About Us</h4>
                        <ul className="space-y-2 text-sm">
                        </ul>
                    </div>
                </div>

            </div>
            <div className="border-t border-gray-800 mt-8 pt-6 flex justify-between items-center text-sm text-gray-500">
                <span>2025 Merve CIVAN</span>
                <div className="space-x-4">
                    <a href="#" className="hover:text-white">Twitter</a>
                    <a href="#" className="hover:text-white">Instagram</a>
                    <a href="#" className="hover:text-white">Telegram</a>
                </div>
            </div>
        </footer>
    );
}