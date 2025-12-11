import { Mail, MapPin, Phone, Shield } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/app/asset/images/logo-1.jpg";
export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-4">
                            <Link href="/" className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center">
                                <Image className="rounded-full" src={logo} alt="Logo" width={100} height={100} />
                            </Link>
                            <div>
                                <h4 className="text-lg font-bold">ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া</h4>
                                <p className="text-gray-400 text-[14px]">অন্যায় ও দুর্নীতি বিরোধী আন্দোলন </p>
                            </div>
                        </div>
                        <p className="text-gray-400">স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তোলার প্ল্যাটফর্ম।</p>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">দ্রুত লিংক</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    হোম
                                </Link>
                            </li>
                            <li>
                                <Link href="/complaint" className="hover:text-white">
                                    অভিযোগ
                                </Link>
                            </li>
                            <li>
                                <Link href="/spot-info" className="hover:text-white">
                                    গোপন তথ্য
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin" className="hover:text-white">
                                    অ্যাডমিন
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-4">যোগাযোগ</h5>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                +8801632090523
                            </li>
                            <li className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                skarifbillah1234@gmail.com
                            </li>
                            <li className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                সদর, ব্রাহ্মণবাড়িয়া
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h5 className="font-semibold mb-4">গুরুত্বপূর্ণ তথ্য</h5>
                        <p className="text-gray-400 text-sm">
                            এই প্ল্যাটফর্মে জমা দেওয়া সকল তথ্য সম্পূর্ণ গোপনীয় এবং নিরাপদ। আপনার পরিচয় প্রকাশ করা হবে না।
                        </p>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; ২০২৫ ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া সকল অধিকার সংরক্ষিত।</p>
                </div>
            </div>
        </footer>

    )
}