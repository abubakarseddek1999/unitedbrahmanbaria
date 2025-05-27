import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া - স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম",
  description: "স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তুলুন। আপনার অভিযোগ ও গোপন তথ্য নিরাপদে জমা দিন।",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
