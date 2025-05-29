"use client"  // অবশ্যই যুক্ত করতে হবে কারণ QueryClientProvider ক্লায়েন্ট সাইডে কাজ করে

import React from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/share/Navbar"

const inter = Inter({ subsets: ["latin"] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
