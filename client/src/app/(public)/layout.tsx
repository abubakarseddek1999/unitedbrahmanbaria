import type React from "react"
import Footer from "@/components/share/Footer"
import { Toaster } from "react-hot-toast"
import Topbar from "@/components/share/Topbar"

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="public-layout min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-1">
      <Toaster position="top-right" reverseOrder={false} />
        {children}
      </main>
      <Footer />
    </div>
  )
}