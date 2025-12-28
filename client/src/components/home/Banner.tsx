"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import {
    FileText,
    Shield,
    ArrowRight,
    CheckCircle,
    Users,
    Award,
    TrendingUp,
    Phone,
    Mail,
    MapPin,
    Building,
} from "lucide-react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay, EffectFade } from "swiper/modules"

import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const slides = [
    {
        id: 1,
        title: "আপনার কণ্ঠস্বর",
        highlight: "শুনুন",
        subtitle: "স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে",
        description: "স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তুলুন। আপনার অভিযোগ ও গোপন তথ্য নিরাপদে জমা দিন।",
        features: ["১০০% গোপনীয়তা নিশ্চিত", "দ্রুত ও কার্যকর সমাধান", "২৪/৭ সেবা প্রদান"],
        primaryBtn: { text: "অভিযোগ জানান", href: "/complaint" },
        secondaryBtn: { text: "গোপন তথ্য দিন", href: "/spot-info" },
        // Right side content for slide 1
        rightContent: {
            type: "complaint",
            header: {
                icon: FileText,
                title: "অভিযোগ নিবন্ধন",
                subtitle: "নিরাপদ ও গোপনীয়",
            },
            stats: [
                { value: "100+", label: "সমাধানকৃত অভিযোগ", color: "emerald" },
                { value: "৯৬%", label: "সন্তুষ্টির হার", color: "teal" },
            ],
            services: [
                { icon: Phone, text: "২৪/৭ হটলাইন সেবা" },
                { icon: Mail, text: "তাৎক্ষণিক ইমেইল সাপোর্ট" },
                { icon: MapPin, text: "সদর ব্রাহ্মণবাড়িয়া" },
            ],
            cta: {
                title: "অভিযোগ জানান",
                subtitle: "আপনার কণ্ঠস্বর গুরুত্বপূর্ণ",
            },
            badge: "নিরাপদ ✓",
        },
    },
    {
        id: 2,
        title: "একসাথে গড়ি",
        highlight: "উন্নত জেলা",
        subtitle: "দায়িত্বশীল নাগরিকত্বের প্রতিশ্রুতি",
        description: "আমাদের সাথে যুক্ত হয়ে একটি স্বচ্ছ ও দুর্নীতিমুক্ত সমাজ গড়ার অংশীদার হন। আপনার প্রতিটি তথ্য গুরুত্বপূর্ণ।",
        features: ["বিশ্বস্ত প্ল্যাটফর্ম", "যাচাইকৃত প্রক্রিয়া", "নিরাপদ তথ্য সংরক্ষণ"],
        primaryBtn: { text: "তথ্য জমা দিন", href: "/spot-info" },
        secondaryBtn: { text: "যোগাযোগ করুন", href: "/contact" },
        // Right side content for slide 2
        rightContent: {
            type: "community",
            header: {
                icon: Building,
                title: "কমিউনিটি সেবা",
                subtitle: "একসাথে এগিয়ে চলুন",
            },
            stats: [
                { value: "120+", label: "সফল প্রকল্প", color: "emerald" },
                { value: "250+", label: "উপকৃত পরিবার", color: "teal" },
            ],
            services: [
                { icon: Users, text: "কমিউনিটি সাপোর্ট" },
                { icon: Award, text: "স্বীকৃতিপ্রাপ্ত সেবা" },
                { icon: TrendingUp, text: "ক্রমাগত উন্নতি" },
            ],
            cta: {
                title: "যোগ দিন আজই",
                subtitle: "উন্নত সমাজ গড়ার অংশীদার হন",
            },
            badge: "বিশ্বস্ত ✓",
        },
    },
]

const ProfessionalBanner = () => {
    return (
        <div className="relative bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                            <path d="M0 32V0h32" fill="none" stroke="rgb(34 197 94)" strokeWidth="0.5" opacity="0.3" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Floating Elements */}
            {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-20 h-20 bg-emerald-200/30 rounded-full animate-float" />
                <div className="absolute top-40 right-20 w-16 h-16 bg-teal-200/30 rounded-full animate-float-delayed" />
                <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-green-200/30 rounded-full animate-float" />
                <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-emerald-100/40 rounded-full animate-float-delayed" />
            </div> */}

            <Swiper
                // pagination={{
                //     clickable: true,
                //     bulletClass: "swiper-pagination-bullet professional-bullet",
                //     bulletActiveClass: "swiper-pagination-bullet-active professional-bullet-active",
                // }}
                autoplay={{
                    delay: 7000,
                    disableOnInteraction: false,
                }}
                loop={true}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                modules={[Pagination, Autoplay, EffectFade]}
                className="w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <section className="min-h-[80vh] flex items-center lg:py-20">
                            <div className="container mx-auto px-4 lg:px-8 relative z-10">
                                <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                                    {/* Content Side - 7 columns */}
                                    <div className="lg:col-span-7 space-y-6 lg:space-y-8">
                                        {/* Badge */}
                                        <div
                                            className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold animate-slide-up"
                                            style={{ animationDelay: "0.1s" }}
                                        >
                                            <Award className="w-4 h-4" />
                                            {slide.subtitle}
                                        </div>

                                        {/* Main Title */}
                                        <div className="space-y-2 animate-slide-up" style={{ animationDelay: "0.2s" }}>
                                            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
                                                {slide.title}{" "}
                                                <span className="text-emerald-600 relative">
                                                    {slide.highlight}
                                                    <svg
                                                        className="absolute -bottom-2 left-0 w-full h-3 text-emerald-200"
                                                        viewBox="0 0 100 12"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M0 8c30-4 70-4 100 0-30 2-70 2-100 0z" />
                                                    </svg>
                                                </span>
                                            </h1>
                                        </div>

                                        {/* Description */}
                                        <p
                                            className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl animate-slide-up"
                                            style={{ animationDelay: "0.3s" }}
                                        >
                                            {slide.description}
                                        </p>

                                        {/* Features */}
                                        <div className="space-y-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                                            {slide.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-center gap-3">
                                                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                                                    </div>
                                                    <span className="text-gray-700 font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Buttons */}
                                        <div
                                            className="flex flex-col sm:flex-row gap-4 pt-4 animate-slide-up"
                                            style={{ animationDelay: "0.5s" }}
                                        >
                                            <Button
                                                asChild
                                                size="lg"
                                                className="group bg-primary hover:primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 h-14 px-8 text-lg font-semibold"
                                            >
                                                <Link href={slide.primaryBtn.href}>
                                                    <FileText className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                                    {slide.primaryBtn.text}
                                                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </Button>

                                            <Button
                                                asChild
                                                variant="outline"
                                                size="lg"
                                                className="group border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all duration-300 h-14 px-8 text-lg font-semibold"
                                            >
                                                <Link href={slide.secondaryBtn.href}>
                                                    <Shield className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                                                    {slide.secondaryBtn.text}
                                                </Link>
                                            </Button>
                                        </div>

                                        {/* Trust Indicators */}
                                        <div
                                            className="hidden md:block flex flex-wrap items-center gap-6 pt-6 border-t border-gray-200 animate-slide-up"
                                            style={{ animationDelay: "0.6s" }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-emerald-600" />
                                                <span className="text-sm text-gray-600">
                                                    <span className="font-bold text-gray-900">১০০০+</span> সন্তুষ্ট ব্যবহারকারী
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-5 h-5 text-emerald-600" />
                                                <span className="text-sm text-gray-600">
                                                    <span className="font-bold text-gray-900">৯৮%</span> সফলতার হার
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Award className="w-5 h-5 text-emerald-600" />
                                                <span className="text-sm text-gray-600">
                                                    <span className="font-bold text-gray-900">২৪/৭</span> সেবা প্রদান
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dynamic Visual Side - 5 columns */}
                                    <div className="hidden md:block lg:col-span-5 animate-slide-left py-16" style={{ animationDelay: "0.4s" }}>
                                        <div className="relative">
                                            {/* Dynamic Main Card */}
                                            <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-100 relative overflow-hidden">
                                                {/* Dynamic Card Header */}
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${slide.rightContent.type === "complaint" ? "bg-emerald-100" : "bg-emerald-100"
                                                                }`}
                                                        >
                                                            <slide.rightContent.header.icon
                                                                className={`w-6 h-6 ${slide.rightContent.type === "complaint" ? "text-emerald-600" : "text-emerald-600"
                                                                    }`}
                                                            />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-gray-900">{slide.rightContent.header.title}</h3>
                                                            <p className="text-sm text-gray-500">{slide.rightContent.header.subtitle}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <div
                                                                key={i}
                                                                className={`w-2 h-2 rounded-full ${slide.rightContent.type === "complaint" ? "bg-emerald-400" : "bg-emerald-400"
                                                                    }`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Dynamic Stats Grid */}
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    {slide.rightContent.stats.map((stat, idx) => (
                                                        <div
                                                            key={idx}
                                                            className={`rounded-2xl p-4 text-center ${stat.color === "emerald"
                                                                ? "bg-emerald-50"
                                                                : stat.color === "teal"
                                                                    ? "bg-teal-50"
                                                                    : stat.color === "blue"
                                                                        ? "bg-blue-50"
                                                                        : "bg-purple-50"
                                                                }`}
                                                        >
                                                            <div
                                                                className={`text-2xl font-bold mb-1 ${stat.color === "emerald"
                                                                    ? "text-emerald-600"
                                                                    : stat.color === "teal"
                                                                        ? "text-teal-600"
                                                                        : stat.color === "blue"
                                                                            ? "text-blue-600"
                                                                            : "text-purple-600"
                                                                    }`}
                                                            >
                                                                {stat.value}
                                                            </div>
                                                            <div className="text-xs text-gray-600">{stat.label}</div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Dynamic Services */}
                                                <div className="space-y-3 mb-6">
                                                    {slide.rightContent.services.map((service, idx) => (
                                                        <div key={idx} className="flex items-center gap-3 text-sm">
                                                            <service.icon
                                                                className={`w-4 h-4 ${slide.rightContent.type === "complaint" ? "text-emerald-600" : "text-emerald-600"
                                                                    }`}
                                                            />
                                                            <span className="text-gray-700">{service.text}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Dynamic Bottom CTA */}
                                                <div
                                                    className={`rounded-2xl p-4 text-white text-center ${slide.rightContent.type === "complaint"
                                                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                                                        : "bg-gradient-to-r from-emerald-500 to-teal-500"
                                                        }`}
                                                >
                                                    <div className="text-sm font-semibold mb-1">{slide.rightContent.cta.title}</div>
                                                    <div className="text-xs opacity-90">{slide.rightContent.cta.subtitle}</div>
                                                </div>

                                                {/* Decorative Elements */}
                                                <div
                                                    className={`absolute top-4 right-4 w-8 h-8 rounded-full opacity-50 ${slide.rightContent.type === "complaint" ? "bg-emerald-100" : "bg-blue-100"
                                                        }`}
                                                />
                                                <div
                                                    className={`absolute bottom-4 left-4 w-6 h-6 rounded-full opacity-50 ${slide.rightContent.type === "complaint" ? "bg-teal-100" : "bg-purple-100"
                                                        }`}
                                                />
                                            </div>

                                            {/* Dynamic Floating Badge */}
                                            <div
                                                className={`absolute -top-4 -right-4 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg animate-bounce-slow ${slide.rightContent.type === "complaint" ? "bg-emerald-500" : "bg-emerald-500"
                                                    }`}
                                            >
                                                {slide.rightContent.badge}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Custom Styles */}
            <style jsx global>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes float-delayed {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-left {
          animation: slide-left 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }

        .professional-bullet {
          width: 12px !important;
          height: 12px !important;
          background: rgba(16, 185, 129, 0.3) !important;
          border-radius: 50% !important;
          margin: 0 6px !important;
          transition: all 0.3s ease !important;
          cursor: pointer !important;
        }

        .professional-bullet-active {
          background: rgb(16, 185, 129) !important;
          transform: scale(1.2) !important;
        }

        .swiper-pagination {
          bottom: 30px !important;
        }

        @media (max-width: 768px) {
          .swiper-pagination {
            bottom: 20px !important;
          }
        }
      `}</style>
        </div>
    )
}

export default ProfessionalBanner
