'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { FileText, Shield } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import banner1 from '../../public/banner1.jpg';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
    {
        id: 1,
        title: <>আপনার কণ্ঠস্বর <span className="text-green-400">শুনুন</span></>,
        description: "স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তুলুন। আপনার অভিযোগ ও গোপন তথ্য নিরাপদে জমা দিন।",
        image: "/banner1.jpg",
    },
    {
        id: 2,
        title: <>আমাদের সাথে <span className="text-green-400">দায়িত্বশীল সমাজ গড়ুন</span></>,
        description: "তথ্য ও অভিযোগ দিয়ে অপরাধ নির্মূলে ভূমিকা রাখুন। আমরা রাখব আপনার পরিচয় গোপন।",
        image: "/banner1.jpg",
    },
    // আরও স্লাইড চাইলে এখানে যোগ করুন
];

const Banner = () => {
    return (
        <div className="banner">
            <Swiper
                pagination={{ dynamicBullets: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <section className="relative min-h-[70vh]">
                            {/* <img
                      src={slide.image}
                      alt="Slide"
                      className="absolute inset-0 w-full h-full object-cover -z-10"
                    /> */}
                            <div className="bg-[#F0FCF6] min-h-[70vh] flex items-center justify-center">
                                <div className="container mx-auto text-center text-black py-20">
                                    <h2 className="text-4xl md:text-6xl font-bold mb-6">{slide.title}</h2>
                                    <p className="text-xl mb-8 max-w-3xl mx-auto">{slide.description}</p>
                                    <div className="flex sm:flex-row gap-4 justify-center">
                                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                                            <Link href="/complaint">
                                                <FileText className="w-5 h-5 mr-2" />
                                                অভিযোগ জানান
                                            </Link>
                                        </Button>
                                        <Button asChild variant="outline" size="lg">
                                            <Link href="/spot-info">
                                                <Shield className="w-5 h-5 mr-2" />
                                                <span className="text-black">গোপন তথ্য দিন</span>
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </SwiperSlide>

                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
