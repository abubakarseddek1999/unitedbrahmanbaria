"use client";

import Image from "next/image";
import { CheckCircle, Heart, Leaf, MonitorSmartphone, ShieldCheck, Star, Target, Users, Zap } from "lucide-react";
import aboutimg from "@/asset/images/meeting.jpg";
import { useEffect, useState } from "react";

export function AboutContent() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  useEffect(() => {
    setIsVisible(true)

    // Auto-slide for banner stats
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4)
    }, 3000)

    return () => clearInterval(interval)
  }, [])


  const missionPoints = [
    "জনগণের সমস্যা ও অনিয়ম সমাধানে স্বচ্ছ ও জবাবদিহিমূলক প্ল্যাটফর্ম তৈরি করা",
    "নাগরিকদের অভিযোগ গ্রহণ করে তা সংশ্লিষ্ট ব্যক্তির কাছে পৌঁছে দেওয়া",
    "গোপনীয় তথ্য নিরাপদভাবে সংগ্রহ ও সংরক্ষণ করা",
    "সমস্যার সমাধান ও সফলতার গল্প তুলে ধরে জনগণকে সচেতন করা",
    "সঠিক তথ্য ও জনমতের মাধ্যমে প্রশাসন ও সমাজে ইতিবাচক পরিবর্তন আনা",
  ];

  const visionPoints = [
    "একটি স্বচ্ছ, জবাবদিহিমূলক এবং ন্যায়ভিত্তিক সমাজ গড়ে তোলা",
    "যেখানে নাগরিকরা ভয় ছাড়াই তথ্য দিতে পারে এবং সমাধান দেখতে পারে",
    "জনগণ ও প্রশাসনের মধ্যে সেতুবন্ধন তৈরি করা",
  ];

  const goalPoints = [
    "অভিযোগ গ্রহণ ও দ্রুত ব্যবস্থা নেওয়ার প্রক্রিয়া উন্নত করা",
    "গোপন রিপোর্টিং সিস্টেম আরও শক্তিশালী করা",
    "সফলতার গল্পগুলো মানুষের সামনে তুলে ধরে বিশ্বাস বৃদ্ধি করা",
    "মানুষের সমস্যাকে গুরুত্ব দিয়ে প্রকৃত সহায়তা নিশ্চিত করা",
    "সমাজের উন্নয়ন, ন্যায়বিচার ও স্বচ্ছতা প্রতিষ্ঠায় কাজ করা",
    "প্ল্যাটফর্মটিকে প্রযুক্তিগতভাবে উন্নত এবং ব্যবহারবান্ধব করা",
  ];

  const achievements = [
    {
      year: "২০২৫",
      title: "টিমের আত্মপ্রকাশ",
      description: "মানবতার পাশে দাঁড়ানোর সংকল্প নিয়ে আমাদের যাত্রা শুরু হয় ২০২৫ সালে",
      icon: Users,
      color: "from-teal-400 to-cyan-500",
    },

    {
      year: "২০২৫",
      title: "পরিবেশ সচেতনতা অভিযান",
      description: "রাস্তায় গাছ লাগানো, দেওয়াল আর্ট রক্ষা ও পরিচ্ছন্নতা কার্যক্রম চালানো হয়",
      icon: Leaf,
      color: "from-green-400 to-emerald-500",
    },
    {
      year: "২০২৫",
      title: "গোপন অভিযোগ গ্রহণ ব্যবস্থা চালু",
      description: "নিপীড়িতদের সহায়তায় একটি অনলাইন গোপন অভিযোগ ফর্ম চালু করা হয়",
      icon: ShieldCheck,
      color: "from-purple-500 to-indigo-600",
    },
    {
      year: "২০২৫",
      title: "মানবিক সহযোগিতায় প্রযুক্তি ব্যবহার",
      description: "ওয়েবসাইট ও ফেসবুক পেজ চালু করে আরও সহজে মানুষের পাশে দাঁড়ানোর পথ তৈরি হয়",
      icon: MonitorSmartphone,
      color: "from-blue-400 to-sky-600",
    },
    {
      year: "২০২৫",
      title: "কালোবাজারি ধরা পড়ে",
      description: "রেলস্টেশনে টিকিট কালোবাজারি ধরতে সক্রিয় ভূমিকা পালন করি",
      icon: ShieldCheck,
      color: "from-red-400 to-pink-500",
    },
    {
      year: "২০২৫",
      title: "রেলওয়ে কর্তৃপক্ষের সাথে বৈঠক",
      description: "সেবার মানোন্নয়ন ও জন-অসুবিধা লাঘবে আলোচনা সভায় অংশ নেই",
      icon: Users,
      color: "from-slate-500 to-gray-700",
    },

    {
      year: "২০২৫",
      title: "অপরাধীকে জনগণের সহায়তায় আটক",
      description: "রেলস্টেশন এলাকায় অপরাধীকে ধাওয়া করে জনগণের সহায়তায় পুলিশের হাতে তুলে দেওয়া হয়",
      icon: ShieldCheck,
      color: "from-orange-400 to-amber-500",
    },
    {
      year: "২০২৫",
      title: "গোপন তথ্য দিয়ে অপরাধী ধরতে সহায়তা",
      description: "অনেক অপরাধী গোপন তথ্যের ভিত্তিতে আইনশৃঙ্খলা বাহিনীর হাতে ধরা পড়ে",
      icon: MonitorSmartphone,
      color: "from-yellow-500 to-amber-600",
    },
  ];
  const values = [
    {
      icon: Target,
      title: "লক্ষ্য অর্জন",
      description: "আমরা প্রতিটি প্রকল্পে সর্বোচ্চ মানের সেবা প্রদানে প্রতিশ্রুতিবদ্ধ",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Zap,
      title: "উদ্ভাবন",
      description: "নতুন প্রযুক্তি ও পদ্ধতি ব্যবহার করে আধুনিক সমাধান প্রদান",
      color: "from-emerald-400 to-green-600",
    },
    {
      icon: Heart,
      title: "সেবার মনোভাব",
      description: "শিক্ষার্থী ও ক্লায়েন্টদের সন্তুষ্টিই আমাদের প্রধান লক্ষ্য",
      color: "from-teal-400 to-green-600",
    },
    {
      icon: Star,
      title: "উৎকর্ষতা",
      description: "প্রতিটি কাজে সর্বোচ্চ মানের নিশ্চয়তা প্রদান",
      color: "from-green-500 to-emerald-600",
    },
  ]

  return (
    <div className="bg-white">
      {/* About Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image src={aboutimg} alt="আমাদের সম্পর্কে" fill className="object-cover" />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
                ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া পরিচয়
              </h2>

              <p className="text-muted-foreground mb-6">
                ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া হলো একটি স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম।
                এখানে আপনি অভিযোগ, গোপন তথ্য বা যেকোনো সমস্যার বিবরণ সম্পূর্ণ নিরাপদভাবে জমা দিতে পারেন।
                আপনার তথ্যের গোপনীয়তা ও নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার।
              </p>

              <p className="text-muted-foreground">
                আমরা প্রশাসনের সাথে কাজ করে সমস্যা সমাধান, সফলতার গল্প তুলে ধরা এবং সমাজে ইতিবাচক পরিবর্তন আনার লক্ষ্যে কাজ করে যাচ্ছি।
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Values Section */}
      <div className="relative z-10 py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl pb-2 md:text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              আমাদের মূল্যবোধ
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">যে নীতিমালার উপর ভিত্তি করে আমরা কাজ করি</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group backdrop-blur-sm bg-white/80 border border-green-200/50 rounded-2xl p-6 hover:bg-white/95 hover:border-green-300/70 transition-all duration-500 hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-xl "
              >
                <div
                  className={`bg-gradient-to-br ${value.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-md`}
                >
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Achievements Section */}
      <div className="relative z-10 py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-600 p-2 to-green-800 bg-clip-text text-transparent leading-relaxed">
              আমাদের গৌরবময় অর্জন
            </h2>


            <p className="text-lg text-gray-600 max-w-2xl mx-auto">বছরের পর বছর ধরে আমাদের নিরলস প্রচেষ্টার ফসল</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={``}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="backdrop-blur-sm bg-white/90 border border-green-200/50 rounded-2xl p-6 hover:bg-white hover:border-green-300/70 transition-all duration-500 hover:shadow-2xl shadow-lg h-full">
                  {/* Year Badge */}
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    {achievement.year}
                  </div>

                  {/* Icon */}
                  <div
                    className={`bg-gradient-to-br ${achievement.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg`}
                  >
                    <achievement.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-700 transition-colors duration-300">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary">নীতি ও আদর্শ</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">আমাদের মিশন</h3>
              <ul className="space-y-3">
                {missionPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-xl font-semibold mb-6 text-primary">আমাদের ভিশন</h3>
              <ul className="space-y-3">
                {visionPoints.map((point, idx) => (
                  <li key={idx} className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Goals */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-primary text-center">
            লক্ষ্য-উদ্দেশ্য
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {goalPoints.map((goal, idx) => (
              <div key={idx} className="bg-muted p-6 rounded-lg border-l-4 border-primary">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center flex-shrink-0 font-semibold">
                    {idx + 1}
                  </div>
                  <p className="text-muted-foreground">{goal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
