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
import saberImg from "@/asset/images/saber.jpg"
import AjijiImg from "@/asset/images/Ajiji.jpg"
import { useState, useEffect } from "react"
export default function TeamPage() {
    const [isVisible, setIsVisible] = useState(false)
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const [currentSlide, setCurrentSlide] = useState(0)
    useEffect(() => {
        setIsVisible(true)

        // Auto-slide for banner stats
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 4)
        }, 3000)
        return () => clearInterval(interval)
    }, [])
    const teamMembers = [
        {
            id: 1,
            name: "Sheikh Arif Billah  (আজিজী)",
            profession: "প্রধান নির্বাহী",
            image: AjijiImg,
            email: "rahim@unitybb.com",
            phone: "+880 1711-123456",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-green-400 to-green-600",
        },
        {
            id: 2,
            name: "Md Saber Hossain  (সাবের)",
            profession: "পরিচালক",
            image: saberImg,
            email: "fatema@unitybb.com",
            phone: "+880 1712-234567",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-green-500 to-emerald-600",
        },
        {
            id: 3,
            name: "মোঃ আব্দুল করিম",
            profession: "প্রযুক্তি পরিচালক",
            image: "https://i.postimg.cc/65rX96Vt/504265699-122114399060890857-3835222468541346831-n.jpg",
            email: "karim@unitybb.com",
            phone: "+880 1713-345678",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-teal-400 to-green-600",
        },
        {
            id: 4,
            name: "সালমা আক্তার",
            profession: "শিক্ষার্থী সেবা পরিচালক",
            image: "https://i.postimg.cc/65rX96Vt/504265699-122114399060890857-3835222468541346831-n.jpg",
            email: "salma@unitybb.com",
            phone: "+880 1714-456789",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-emerald-400 to-green-600",
        },
        {
            id: 5,
            name: "ড. নাসির উদ্দিন আহমেদ",
            profession: "গবেষণা পরিচালক",
            image: "https://i.postimg.cc/65rX96Vt/504265699-122114399060890857-3835222468541346831-n.jpg",
            email: "nasir@unitybb.com",
            phone: "+880 1715-567890",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-green-400 to-teal-600",
        },
        {
            id: 6,
            name: "রাশিদা বেগম",
            profession: "প্রশাসনিক পরিচালক",
            image: "https://i.postimg.cc/65rX96Vt/504265699-122114399060890857-3835222468541346831-n.jpg",
            email: "rashida@unitybb.com",
            phone: "+880 1716-678901",
            location: "ব্রাহ্মণবাড়িয়া, বাংলাদেশ",
            gradient: "from-green-500 to-green-700",
        },
    ]
    const bannerStats = [
        { label: "দক্ষ মেম্বার ", value: "৫০+", icon: Users, color: "text-green-600" },
        { label: "বছরের অভিজ্ঞতা", value: "১৫+", icon: Calendar, color: "text-blue-600" },
        { label: "সফল প্রকল্প", value: "২০০+", icon: Award, color: "text-purple-600" },
        { label: "সন্তুষ্ট", value: "৫০০+", icon: Heart, color: "text-red-600" },
    ]

    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-green-100/80 to-emerald-200/60 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-br from-blue-100/60 to-green-200/80 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-br from-teal-100/70 to-green-100/60 rounded-full blur-3xl animate-pulse delay-2000"></div>
                <div className="absolute bottom-40 right-1/3 w-88 h-88 bg-gradient-to-br from-emerald-200/60 to-green-300/40 rounded-full blur-3xl animate-pulse delay-3000"></div>
            </div>

            {/* Enhanced Header/Banner Section */}
            <div className="relative z-10 pt-16 pb-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <div className="container mx-auto px-4">
                    {/* Main Banner Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left Content */}
                        <div
                            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`}
                        >
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce">
                                <Star className="w-4 h-4" />
                                ব্রাহ্মণবাড়িয়া জেলার শীর্ষ সংগঠন পরিচালক
                            </div>

                            <div className="mb-6">
                                <h1 className="text-5xl md:text-7xl font-bold leading-snug">
                                    <span className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-3">
                                        আমাদের
                                    </span>
                                    <span className="block bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent leading-snug">
                                        অভিজ্ঞ দল
                                    </span>
                                </h1>
                            </div>


                            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                                দক্ষতা, অভিজ্ঞতা ও উদ্ভাবনের সমন্বয়ে গঠিত আমাদের পেশাদার টিম বাংলাদেশের শিক্ষা ব্যবস্থার উন্নয়নে নিরলসভাবে কাজ করে যাচ্ছে।
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white border-0 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                >
                                    <Users className="w-5 h-5 mr-2" />
                                    আমাদের টিম দেখুন
                                </Button>
                                <Button
                                    size="lg"
                                    className="bg-white/80 backdrop-blur-sm border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105"
                                >
                                    <Mail className="w-5 h-5 mr-2" />
                                    যোগাযোগ করুন
                                </Button>
                            </div>

                            {/* Trust Indicators */}
                            <div className="flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full border-2 border-white"
                                            ></div>
                                        ))}
                                    </div>
                                    <span>৫০+ দক্ষ পেশাদার</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-400">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <Star key={i} className="w-4 h-4 fill-current" />
                                        ))}
                                    </div>
                                    <span>৪.৯/৫ রেটিং</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Content - Interactive Stats */}
                        <div
                            className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        >
                            <div className="relative">
                                {/* Main Stats Card */}
                                <div className="backdrop-blur-lg bg-white/80 border border-green-200/50 rounded-3xl p-8 shadow-2xl">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-800 mb-2">আমাদের অর্জন</h3>
                                        <p className="text-gray-600">সংখ্যায় আমাদের সাফল্য</p>
                                    </div>

                                    {/* Animated Stats Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {bannerStats.map((stat, index) => (
                                            <div
                                                key={index}
                                                className={`text-center p-4 rounded-2xl transition-all duration-500 hover:scale-105 ${currentSlide === index
                                                    ? "bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300"
                                                    : "bg-gray-50 hover:bg-green-50"
                                                    }`}
                                            >
                                                <div
                                                    className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${currentSlide === index
                                                        ? "bg-gradient-to-br from-green-500 to-green-700 animate-pulse"
                                                        : "bg-gray-200"
                                                        }`}
                                                >
                                                    <stat.icon className={`w-6 h-6 ${currentSlide === index ? "text-white" : "text-gray-600"}`} />
                                                </div>
                                                <div
                                                    className={`text-2xl font-bold mb-1 ${currentSlide === index ? "text-green-700" : "text-gray-700"}`}
                                                >
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-gray-600">{stat.label}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Progress Indicators */}
                                    <div className="flex justify-center gap-2 mt-6">
                                        {bannerStats.map((_, index) => (
                                            <div
                                                key={index}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-green-500 w-8" : "bg-gray-300"
                                                    }`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
                                    <Trophy className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center ">
                                    <Award className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Banner Bottom Wave */}
                    <div className="text-center">
                        <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-green-700 mx-auto rounded-full animate-pulse mb-4"></div>
                        <p className="text-gray-500 italic">"শিক্ষার মাধ্যমে জাতি গঠনে আমাদের অঙ্গীকার"</p>
                    </div>
                </div>
            </div>



        
            {/* Team Members Section */}
            <div className="relative z-10 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl p-2 md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                            আমাদের নেতৃত্ব
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">অভিজ্ঞতা ও দক্ষতার সমন্বয়ে গঠিত আমাদের নেতৃত্ব দল</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={member.id}
                                className={``}
                                style={{ animationDelay: `${index * 150}ms` }}
                                onMouseEnter={() => setHoveredCard(member.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Glassmorphism Card */}
                                <div className="backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-3xl overflow-hidden hover:bg-white/95 hover:border-green-300/70 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10 shadow-lg">
                                    {/* Profile Image with Gradient Overlay */}
                                    <div className="relative overflow-hidden">
                                        <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-10 z-10 `}></div>
                                        <Image
                                            // src={member.image || "/placeholder.svg"}
                                            src={member.image}
                                            alt={member.name}
                                            width={400}
                                            height={300}
                                            className="w-full h-[350px] object-contain transition-transform duration-700 group-hover:scale-110"
                                        />

                                        {/* Floating Animation on Hover */}
                                        <div
                                            className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-500 ${hoveredCard === member.id ? "opacity-100" : "opacity-0"}`}
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
                                            {member.profession}
                                        </p>


                                        {/* Location */}
                                        <div className="flex items-center gap-3 text-gray-600 hover:text-green-700 transition-colors duration-300 group/item">

                                            <MapPin className="w-5 h-5 text-black" />
                                            <span className="text-sm font-medium">{member.location}</span>
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
                            <Button
                                size="lg"
                                className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white border-0 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                ক্যারিয়ার সুযোগ দেখুন
                            </Button>
                            <Button
                                size="lg"
                                className="bg-white/80 backdrop-blur-sm border-2 border-green-500 text-green-700 hover:bg-green-50 rounded-xl px-8 py-4 font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            >
                                <Mail className="w-5 h-5 mr-2" />
                                যোগাযোগ করুন
                            </Button>
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
