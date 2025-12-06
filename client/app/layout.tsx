// "use client"

// import React, { useEffect } from "react"
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { Toaster } from "@/components/ui/toaster"
// import Navbar from "@/components/share/Navbar"

// const inter = Inter({ subsets: ["latin"] })
// const queryClient = new QueryClient()

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   // 🟢 Google Translate স্ক্রিপ্ট ডাইনামিকভাবে লোড করা হচ্ছে
//   useEffect(() => {
//     // যদি স্ক্রিপ্ট আগে থেকে না থাকে
//     if (!document.getElementById("google-translate-script")) {
//       const script = document.createElement("script")
//       script.id = "google-translate-script"
//       script.src =
//         "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
//       document.body.appendChild(script)

//       // window ফাংশন তৈরি
//       ;(window as any).googleTranslateElementInit = () => {
//         new (window as any).google.translate.TranslateElement(
//           {
//             pageLanguage: "bn", // ডিফল্ট ভাষা
//             includedLanguages: "en,bn,hi", // যে ভাষাগুলো দেখাবে
//             layout: (window as any).google.translate.TranslateElement
//               .InlineLayout.SIMPLE,
//           },
//           "google_translate_element"
//         )
//       }
//     }
//   }, [])

//   return (
//     <html lang="bn">
//       <body className={inter.className}>
//         <QueryClientProvider client={queryClient}>
//           {/* 🌍 Google Translate Dropdown */}
//           <div
//             id="google_translate_element"
//             className="fixed top-3 right-3 z-[9999] bg-white rounded-md shadow p-2"
//           ></div>

//           <Navbar />
//           {children}
//           <Toaster />
//         </QueryClientProvider>
//       </body>
//     </html>
//   )
// }












"use client"  // অবশ্যই যুক্ত করতে হবে কারণ QueryClientProvider ক্লায়েন্ট সাইডে কাজ করে

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Geist, Geist_Mono, Hind_Siliguri, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/share/Navbar"
import icon from "@/app/asset/images/logo.png"
import Topbar from "@/components/share/Topbar"
import Footer from "@/components/share/Footer"
import { GoogleTranslate } from "@/components/language/GoogleTranslate"

// Configure Hind Siliguri with all weights and subsets
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const inter = Inter({ subsets: ["latin"] })
const queryClient = new QueryClient()
// export const metadata: Metadata = {
//   title: {
//     default: "ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া",
//     template: "%s | ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া",
//   },
//   description: "স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম",
//   keywords: "স্বচ্ছতা, জবাবদিহিতা, প্ল্যাটফর্ম,ঐক্যবদ্ধ, ব্রাহ্মণবাড়িয়া",
// }
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${geist.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href={icon.src} sizes="any" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.__GOOGLE_TRANSLATION_CONFIG__ = {
                languages: [
                  { title: 'English', name: 'en' },
                  { title: 'Bangla', name: 'bn' },
                  { title: 'Arabic', name: 'ar' }
                ],
                defaultLanguage: 'bn'
              };
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <GoogleTranslate />
        <QueryClientProvider client={queryClient}>
          {/* <Navbar /> */}
          <Toaster />
          <Topbar />
          {children}
          <Footer />
        </QueryClientProvider>

        {/* Load Google Translate Script */}
        <script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
          defer
        />
      </body>
    </html>
  )
}
