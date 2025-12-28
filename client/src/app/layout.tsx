"use client"  // অবশ্যই যুক্ত করতে হবে কারণ QueryClientProvider ক্লায়েন্ট সাইডে কাজ করে

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Geist, Geist_Mono, Hind_Siliguri, Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import icon from "@/asset/images/logo.png"
import { GoogleTranslate } from "@/components/language/GoogleTranslate"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import WhatsApp from "@/components/home/WhatsApp"


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
      <body className={inter.className}
        suppressHydrationWarning>
        <GoogleTranslate />
        <QueryClientProvider client={queryClient}>
          {/* <Navbar /> */}
          <Toaster />
          <WhatsApp />
          <Provider store={store}>
          {children}
          </Provider>
        
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
