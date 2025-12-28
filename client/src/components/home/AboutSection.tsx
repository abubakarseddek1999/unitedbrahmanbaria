"use client"

import { FileText, Lock, Trophy, ArrowRight, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

export function AboutSection() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.3 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    const services = [
        {
            icon: FileText,
            bengaliTitle: "অভিযোগ জমা দিন",
            englishTitle: "File Complaint",
            description: "যেকোনো সমস্যা বা অন্যায় অনিয়মের বিষয়ে অভিযোগ জানান। আপনার পরিচয় গোপন রাখার সুবিধা রয়েছে।",
            color: "from-teal-500 to-teal-600",
            delay: 0,
        },
        {
            icon: Lock,
            bengaliTitle: "গোপন তথ্য",
            englishTitle: "Confidential Information",
            description: "গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য সম্পূর্ণ গোপনীয়তার সাথে জমা দিন।",
            color: "from-emerald-500 to-teal-600",
            delay: 1,
        },
        {
            icon: Trophy,
            bengaliTitle: "সফলতার গল্প",
            englishTitle: "Success Stories",
            description: "আপনার অভিযোগের ভিত্তিতে সমাধান হওয়া সমস্যাগুলোর সফলতার গল্প দেখুন।",
            color: "from-cyan-500 to-teal-600",
            delay: 2,
        },
    ]

    return (
        <section ref={sectionRef} className="py-20 px-4 bg-white overflow-hidden">
            <div className="container mx-auto">
                {/* Header */}
                <div
                    className={`mb-16 space-y-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                >
                    <p className="text-sm font-bold text-teal-600 tracking-widest uppercase">আমাদের সেবাসমূহ</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-balance">অন্যায় ও দুর্নীতির বিরুদ্ধে লড়াই।</h2>
                </div>
                {/* About Organization */}
                <div
                    className={`mb-20 p-6 md:p-10 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 transition-all duration-1000 transform ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                    style={{ transitionDelay: "200ms" }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া</h3>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        আমরা <span className="font-bold text-teal-700">একটি অন্যায় ও দুর্নীতি বিরোধী আন্দোলন সংস্থা</span> যা সমাজের প্রতিটি
                        স্তরের মানুষের অধিকার রক্ষায় প্রতিশ্রুতিবদ্ধ। স্বচ্ছতা, জবাবদিহিতা এবং সুশাসনের মাধ্যমে আমরা একটি ন্যায্য সমাজ গড়তে কাজ করছি।
                    </p>
                </div>
                <section className="py-10 bg-gradient-to-b ">
                    <div className="container mx-auto">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                            {/* Card 1 */}
                            <div className="group perspective">
                                <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                                    <div>
                                        <FileText className="w-14 h-14 text-green-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">অন্যায় ও দুর্নীতির বিরুদ্ধে</h4>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            যেকোনো সমস্যা বা অন্যায় অনিয়মের ও দুর্নীতির বিরুদ্ধে কাজ করা
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="group perspective">
                                <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                                    <div>
                                        <FileText className="w-14 h-14 text-green-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">অভিযোগ জমা দিন</h4>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            যেকোনো সমস্যা বা অনিয়মের বিষয়ে অভিযোগ জানান। 
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 */}
                            <div className="group perspective">
                                <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                                    <div>
                                        <Shield className="w-14 h-14 text-blue-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">গোপন তথ্য</h4>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য সম্পূর্ণ গোপনীয়তার সাথে জমা দিন।
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="group perspective">
                                <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                                    <div>
                                        <Users className="w-14 h-14 text-purple-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                                        <h4 className="text-xl font-bold text-gray-800 mb-2">সফলতার গল্প</h4>
                                        <p className="text-gray-600 text-base leading-relaxed">
                                            সমাধান হওয়া সমস্যাগুলোর সফলতার গল্প দেখুন।
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
          }
        }

        .group:hover .animate-pulse {
          animation: glow 2s infinite;
        }
      `}</style>
        </section>
    )
}
