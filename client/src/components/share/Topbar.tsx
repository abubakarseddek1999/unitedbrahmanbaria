'use client';

import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/asset/images/logo-1.jpg";
import { LanguageSwitcher } from "../language/LanguageSwitcher";

const Topbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const pathname = usePathname();

    // Auto close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
        setOpenDropdown(null);
    }, [pathname]);

    // Navigation + Dropdown structure
    const navLinks = [
        { href: "/", label: "হোম" },
        { href: "/joinWithUs", label: "যোগ দিন" },
        {
            href: "/team/members",
            label: "টিম",
            dropdown: "team",
            submenu: [
                { href: "/team/advisor", label: "উপদেষ্টা মন্ডলী" },
                { href: "/team/members", label: "পরিচালনা পরিষদ" },
                { href: "/team/generalMembers", label: "কার্যকর সদস্য " },
            ]
        },
        { href: "/about", label: "সম্পর্কে" },
        { href: "/gallery", label: "গ্যালারি" },
        { href: "/complaint", label: "অভিযোগ" },
        { href: "/spot-info", label: "গোপন তথ্য" },
    ];

    return (
        <header className="bg-white px-2 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto py-2">
                
                <div className="flex items-center justify-between item-center">

                    {/* Logo Section */}
                    <div className="flex items-center space-x-2">
                        <Link href="/" className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center">
                            <Image src={logo} alt="Logo" width={100} height={100} />
                        </Link>
                        <div>
                            <h1 className="text-[14px] md:text-xl font-bold text-gray-800">
                                ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া
                            </h1>
                            <p className="text-[10px] md:text[12px] text-gray-800">অন্যায় ও দুর্নীতি বিরোধী আন্দোলন </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="flex justify-between items-center gap-8">
                        <nav className="hidden lg:flex  items-center relative flex-wrap justify-center gap-5 lg:gap-8">

                            {navLinks.map((link) => {


                                if (link.dropdown) {
                                    return (
                                        <div key={link.href} className="relative group">

                                            <div className="flex items-center gap-1 cursor-pointer"
                                                onClick={() =>
                                                    setOpenDropdown(openDropdown === link.dropdown ? null : link.dropdown)
                                                }
                                            >
                                                <Link href={link.href} className="hover:text-green-600 font-medium">
                                                    {link.label}
                                                </Link>

                                                <ChevronDown
                                                    className={`w-4 h-4 transition ${openDropdown === link.dropdown ? "rotate-180" : ""}`}
                                                />
                                            </div>


                                            {openDropdown === link.dropdown && (
                                                <div className="absolute left-0 mt-2 w-40 bg-white border shadow-lg rounded-md py-2 z-50">
                                                    {link.submenu?.map((sub) => (
                                                        <Link
                                                            key={sub.href}
                                                            href={sub.href}
                                                            className="block px-4 py-2 text-sm hover:bg-green-100 hover:text-green-700"
                                                        >
                                                            {sub.label}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    );
                                }


                                return (
                                    <Link key={link.href} href={link.href}>
                                        <span className={`hover:text-green-600 font-medium `}>
                                            {link.label}
                                        </span>
                                    </Link>
                                );
                            })}

                        </nav>
                        <div className="flex items-center gap-2">
                            <div className="">
                                <LanguageSwitcher />
                            </div>
                            <div className="hidden lg:block">
                                {/* donation button */}
                                <Link href="/donate">
                                    <button className="bg-primary px-4 py-1 text-white rounded-md">
                                        Donation
                                    </button>
                                </Link>
                            </div>
                            {/* Mobile menu button */}
                            <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Dropdown */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 bg-white rounded-lg overflow-hidden ">

                        {navLinks.map((link) => {

                            // Dropdown Items (Mobile)
                            if (link.dropdown) {
                                return (
                                    <div key={link.href} className="border-b">

                                        <button
                                            className="w-full flex justify-between items-center px-4 py-3 font-medium text-left"
                                            onClick={() =>
                                                setOpenDropdown(openDropdown === link.dropdown ? null : link.dropdown)
                                            }
                                        >
                                            {link.label}
                                            <ChevronDown className={`w-4 h-4 transition ${openDropdown === link.dropdown ? "rotate-180" : ""}`} />
                                        </button>

                                        {openDropdown === link.dropdown && (
                                            <div className="bg-gray-50">
                                                {link.submenu?.map((sub) => (
                                                    <Link
                                                        key={sub.href}
                                                        href={sub.href}
                                                        className="block px-6 py-3 text-sm hover:bg-green-100"
                                                    >
                                                        {sub.label}
                                                    </Link>
                                                ))}

                                            </div>
                                        )}

                                    </div>
                                );
                            }

                            // Normal Mobile Links
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block px-4 py-3 hover:bg-green-100 border-b font-medium"
                                >
                                    {link.label}
                                </Link>
                            );
                        })}

                        {/* login button */}
                        <Link
                        className="block px-4 py-3 hover:bg-green-100 border-b font-medium"
                         href="/donate">
                            <button className="bg-primary px-4 py-1 text-white rounded-md">
                                Donation
                            </button>
                        </Link>

                    </div>
                )}
            </div>
        </header>
    );
};

export default Topbar;
