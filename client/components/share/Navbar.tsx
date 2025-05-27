'use client';

import { Shield, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    //   const router = useRouter();

    useEffect(() => {
        setIsMenuOpen(false); // close menu on route change
    }, [pathname]);

    return (
        <header className="bg-white px-4  shadow-md sticky top-0 z-50">
            <div className="container mx-auto py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া</h1>
                            <p className="text-sm text-gray-600">স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম</p>
                        </div>
                    </div>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex space-x-6">
                        <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">হোম</Link>
                        <Link href="/complaint" className="text-gray-700 hover:text-green-600 font-medium">অভিযোগ</Link>
                        <Link href="/spot-info" className="text-gray-700 hover:text-green-600 font-medium">গোপন তথ্য</Link>
                        <Link href="/admin" className="text-gray-700 hover:text-green-600 font-medium">অ্যাডমিন</Link>
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg overflow-hidden transition-all">
                        <Link href="/" className="block px-4 py-3 hover:bg-green-100 hover:text-green-700">হোম</Link>
                        <Link href="/complaint" className="block px-4 py-3 hover:bg-green-100 hover:text-green-700">অভিযোগ</Link>
                        <Link href="/spot-info" className="block px-4 py-3 hover:bg-green-100 hover:text-green-700">গোপন তথ্য</Link>
                        <Link href="/admin" className="block px-4 py-3 hover:bg-green-100 hover:text-green-700">অ্যাডমিন</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Navbar;
