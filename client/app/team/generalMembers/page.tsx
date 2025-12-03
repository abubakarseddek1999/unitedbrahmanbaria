"use client"
import { Button } from "@/components/ui/button"
import {
    Mail,
    Phone,
    MapPin,
    Users,
    Calendar,
    Award,
    Star,
    Heart,
    Target,
    Zap,
    Trophy,
} from "lucide-react"
import Image from "next/image"
import saberImg from "@/app/asset/images/saber.jpg"
import AjijiImg from "@/app/asset/images/Ajiji.jpg"
import { useState, useEffect } from "react"
import Link from "next/link"
import usePaginatedData from "@/hooks/usePaginatedData"
type MemberItem = {
    _id: string
    photo?: any
    name: string
    designation: string
    phone?: string
    gender?: string
    location?: string
}
export default function TeamPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<string | null>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        setIsVisible(true)

        // Auto-slide for banner stats
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 4)
        }, 3000)
        return () => clearInterval(interval)
    }, [])
    const { data: teamMembers, loading, ref, refetch } =
        usePaginatedData<MemberItem>({
            endpoint: "/member",
            limit: 8,
        })

    // filtering only পরিচালক members
    const directors = teamMembers.filter((member) => member.designation === "কার্যকরী-সদস্য")

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            
            {/* Team Members Section */}
            <div className="relative z-10 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl p-2 md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                        কার্যকর সদস্য 
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">অভিজ্ঞতা ও দক্ষতার সমন্বয়ে গঠিত আমাদের পরিষদ</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                        {directors.map((member, index) => (
                            <div
                                key={member._id}
                                className={``}
                                style={{ animationDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setHoveredCard(member?._id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Glassmorphism Card */}
                                <div className="backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-3xl overflow-hidden hover:bg-white/95 hover:border-green-300/70 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 shadow-lg">
                                    {/* Profile Image with Gradient Overlay */}
                                    <div className="relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br opacity-10 z-10 `}></div>
                                        <Image
                                            // src={member.image || "/placeholder.svg"}
                                            src={member?.photo}
                                            alt={member?.name}
                                            width={400}
                                            height={300}
                                            className="w-full h-[350px] object-contain transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Floating Animation on Hover */}
                                        <div
                                            className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${hoveredCard === member._id ? "opacity-100" : "opacity-0"}`}
                                        >
                                            <div className="bg-white/30 backdrop-blur-sm rounded-full p-4 animate-bounce border border-white/50">
                                                <Star className="w-8 h-8 text-white" />
                                            </div>
                                        </div>


                                    </div>

                                    {/* Contact Information */}
                                    <div className="p-6 space-y-4">
                                        {/* Name and Position Overlay */}

                                        <h3 className="text-xl font-bold  mb-1  transition-colors duration-300">
                                            {member.name}
                                        </h3>
                                        <p className="  transition-colors duration-300">
                                            {member.designation}, ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া
                                        </p>


                                        {/* Location */}
                                        <div className="flex items-center gap-3 text-gray-600 hover:text-green-700 transition-colors duration-300 group/item">

                                            <MapPin className="w-5 h-5 text-black" />
                                            <span className="text-sm font-medium">{member.location ? member.location : "ব্রাহ্মণবাড়িয়া, বাংলাদেশ"}</span>
                                        </div>

                                        {/* Contact Buttons */}
                                        <div className="flex gap-2 pt-4">
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                                                <Mail className="w-4 h-4 mr-2" />
                                                যোগাযোগ
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
                                            >
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Animated Border */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10 blur-xl"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="relative z-10 py-20 bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="container mx-auto px-4">
                    <div className="backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-3xl p-12 text-center shadow-xl">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 pt-3 to-green-800 bg-clip-text text-transparent">
                            আমাদের সাথে যোগ দিন
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            আপনিও আমাদের দলের অংশ হয়ে ব্রাহ্মণবাড়িয়ার উন্নয়নে অবদান রাখুন
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/join">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white border-0 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <Users className="w-5 h-5 mr-2" />
                                    যোগ দিন
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-white/80 backdrop-blur-sm border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    যোগাযোগ করুন
                                </Button>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Contact */}
            <div className="relative z-10 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Mail, title: "ইমেইল", info: "team@unitybb.com", gradient: "from-green-400 to-green-600" },
                            { icon: Phone, title: "ফোন", info: "+8801632090523", gradient: "from-emerald-400 to-green-600" },
                            { icon: MapPin, title: "ঠিকানা", info: "ঢাকা, বাংলাদেশ", gradient: "from-teal-400 to-green-600" },
                        ].map((contact, index) => (
                            <div
                                key={index}
                                className="backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-2xl p-6 text-center hover:bg-white/95 hover:border-green-300/70 transition-all duration-500 hover:scale-105 group shadow-lg hover:shadow-xl"
                            >
                                <div
                                    className={`bg-gradient-to-br ${contact.gradient} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-md`}
                                >
                                    <contact.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="font-semibold text-gray-800 mb-2 text-lg">{contact.title}</h3>
                                <p className="text-gray-600 font-medium">{contact.info}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
