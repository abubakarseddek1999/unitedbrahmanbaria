/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa";

import comma from "@/asset/images/Comma 4.png";
import comma2 from "@/asset/images/Comma 4 (1).png";

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Load dummy data
    useEffect(() => {
        const dummyData = [
            {
                name: "সোহাগ মিয়া",
                position: "শিক্ষক, ব্রাহ্মণবাড়িয়া হাই স্কুল",
                quote: "এই প্ল্যাটফর্মের মাধ্যমে আমি সহজেই আমার কথা বলার সুযোগ পেয়েছি। তাদের দ্রুত সাড়া ও নিষ্ঠার জন্য আমি কৃতজ্ঞ।",
                image: "https://i.pravatar.cc/150?img=1",
                rating: 5,
            },
            {
                name: "নুসরাত জাহান",
                position: "ছাত্রী, দশম শ্রেণি",
                quote: "আমি একটি অভিযোগ দিয়েছিলাম এবং কয়েক দিনের মধ্যেই সহযোগিতা পেয়েছি। শুনতে পাওয়াটা সত্যিই শক্তি জুগিয়েছে।",
                image: "https://i.postimg.cc/qRsnd9qR/RS103517-Unmi-in-school-garden-lpr-Sarah-Ester-CARE.avif",
                rating: 4,
            },
            {
                name: "রাকিব হাসান",
                position: "চাকরিজীবী ",
                quote: "আপনাদের জন্য অনেক দোয়া । তারা ব্যক্তিগতভাবে ফলো আপ করেছে এবং আমাদের এলাকার সমস্যা সমাধান করেছে।",
                image: "https://i.postimg.cc/TwVkHNXj/photo-1690037901153-7fd75205941a.jpg",
                rating: 5,
            },
            {
                name: "মিরা জাহান",
                position: "ছাত্রী, নবম  শ্রেণি",
                quote: "আমি একটি অভিযোগ দিয়েছিলাম এবং কয়েক দিনের মধ্যেই সহযোগিতা পেয়েছি। আপনাদের জন্য অনেক  অনেক শুভকামনা  ",
                image: "https://i.postimg.cc/xjsGTVgJ/images.jpg",
                rating: 4,
            },
        ];


        setTimeout(() => {
            setTestimonials(dummyData);
            setLoading(false);
        }, 500); // simulate API delay
    }, []);
    return (
        <div className=" py-16 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-[50px]">
                    {/* <span className="text-base font-bold mb-4">মতামত</span> */}
                    <h2 className="text-3xl md:text-[40px] font-bold text-blue-900 mb-2">
                        সাধারণ মানুষের মতামত
                    </h2>
                    <p className="text-xl">দেখুন আমাদের সম্পর্কে মানুষ কী বলছেন</p>
                </div>


                {loading ? (
                    <p className="text-center text-gray-500">Loading reviews...</p>
                ) : testimonials.length === 0 ? (
                    <p className="text-center text-gray-500">No reviews available</p>
                ) : (
                    <Swiper
                        breakpoints={{
                            640: { width: 640, slidesPerView: 1 },
                            768: { width: 768, slidesPerView: 2 },
                            1024: { slidesPerView: 3, spaceBetween: 20 },
                        }}
                        speed={1000}
                        spaceBetween={30}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        modules={[Pagination, Autoplay]}
                        className="mySwiper"
                    >
                        {testimonials?.map((testimonial, index) => (
                            <SwiperSlide key={index}>
                                <div className="h-full py-16 flex justify-center items-center">
                                    <div
                                        className="relative bg-white shadow-xl rounded-2xl p-8 border border-blue-300 w-full max-w-2xl mx-auto"
                                        style={{
                                            background:
                                                "linear-gradient(to right, rgba(232, 242, 255, 0.37), rgba(152, 199, 255, 0.25))",
                                        }}
                                    >
                                        {/* Top Left Quote */}
                                        <div className="absolute -top-8 left-8 bg-white rounded-full p-3 border border-blue-300 shadow-md">
                                            <Image src={comma} alt="User" width={35} height={35} />
                                        </div>

                                        {/* Profile Image */}
                                        <div className="absolute left-1/2 -top-14 transform -translate-x-1/2">
                                            <div className="w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
                                                <Image src={testimonial?.image} alt="User" width={96} height={120} className="object-cover h-24 w-24" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="mt-12 text-left px-5 md:px-[10px] lg:px-[36px]">
                                            <p className="text-gray-600 text-base leading-relaxed mb-[24px] ">
                                                {testimonial?.quote}
                                            </p>

                                            <div className="flex justify-between items-center mb-[30px]">
                                                {/* Name & Position */}
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">
                                                        {testimonial?.name}
                                                    </h3>
                                                    <p className="text-sm font-medium">{testimonial?.position}</p>
                                                </div>

                                                {/* Star Ratings */}
                                                <div className="flex justify-center gap-1 mt-4">
                                                    {[...Array(testimonial?.rating)].map((_, idx) => (
                                                        <FaStar key={idx} className="w-5 h-5 text-blue-500" />
                                                    ))}
                                                    {[...Array(5 - testimonial?.rating)].map((_, idx) => (
                                                        <FaStar key={idx + testimonial?.rating} className="w-5 h-5 text-blue-300" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Right Quote */}
                                        <div className="absolute -bottom-8 right-8 bg-white rounded-full p-3 border border-blue-300 shadow-md">
                                            <Image src={comma2} alt="User" width={35} height={35} />
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
}
