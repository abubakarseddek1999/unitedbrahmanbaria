"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, Shield, Users, ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { initializeData, getSuccessStories, getGalleryItems, type SuccessStory, type GalleryItem } from "@/lib/storage"
import Banner from "@/components/home/Banner"

export default function HomePage() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    initializeData()
    setSuccessStories(getSuccessStories())
    setGalleryItems(getGalleryItems())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া</h1>
                <p className="text-sm text-gray-600">স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম</p>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-700 hover:text-green-600 font-medium">
                হোম
              </Link>
              <Link href="/complaint" className="text-gray-700 hover:text-green-600 font-medium">
                অভিযোগ
              </Link>
              <Link href="/spot-info" className="text-gray-700 hover:text-green-600 font-medium">
                গোপন তথ্য
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-green-600 font-medium">
                অ্যাডমিন
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <Banner />

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">আমাদের সেবাসমূহ</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <CardTitle>অভিযোগ জমা দিন</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  যেকোনো সমস্যা বা অনিয়মের বিষয়ে অভিযোগ জানান। আপনার পরিচয় গোপন রাখার সুবিধা রয়েছে।
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>গোপন তথ্য</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য সম্পূর্ণ গোপনীয়তার সাথে জমা দিন।</CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>সফলতার গল্প</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>আপনার অভিযোগের ভিত্তিতে সমাধান হওয়া সমস্যাগুলোর সফলতার গল্প দেখুন।</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-gray-800">সফলতার গল্প</h3>
            <Badge variant="secondary" className="text-sm">
              {successStories.length}টি সফল সমাধান
            </Badge>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {successStories.slice(0, 3).map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-shadow">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image src={story.image || "/placeholder.svg"} alt={story.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{story.title}</CardTitle>
                  <CardDescription className="text-sm text-gray-500">{story.dateAdded}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{story.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্যালারি</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.slice(0, 8).map((item) => (
              <div key={item.id} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={item.url || "/placeholder.svg"}
                  alt={item.caption}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                  <p className="text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">আজই শুরু করুন</h3>
          <p className="text-xl mb-8 opacity-90">আপনার সমস্যার সমাধানে আমরা আছি। নিরাপদে আপনার কথা বলুন।</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link href="/complaint">
                অভিযোগ জানান
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-green-600 border-white  hover:text-white hover:bg-black"
            >
              <Link href="/spot-info">
                গোপন তথ্য দিন
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold">একযোগে সদর ব্রাহ্মণবাড়িয়া</h4>
              </div>
              <p className="text-gray-400">স্বচ্ছতা ও জবাবদিহিতার মাধ্যমে একটি উন্নত সমাজ গড়ে তোলার প্ল্যাটফর্ম।</p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">দ্রুত লিংক</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white">
                    হোম
                  </Link>
                </li>
                <li>
                  <Link href="/complaint" className="hover:text-white">
                    অভিযোগ
                  </Link>
                </li>
                <li>
                  <Link href="/spot-info" className="hover:text-white">
                    গোপন তথ্য
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white">
                    অ্যাডমিন
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">যোগাযোগ</h5>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  +৮৮০ ১৭১২-৩৪৫৬৭২
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  info@brahmanbaria.gov.bd
                </li>
                <li className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  সদর, ব্রাহ্মণবাড়িয়া
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">গুরুত্বপূর্ণ তথ্য</h5>
              <p className="text-gray-400 text-sm">
                এই প্ল্যাটফর্মে জমা দেওয়া সকল তথ্য সম্পূর্ণ গোপনীয় এবং নিরাপদ। আপনার পরিচয় প্রকাশ করা হবে না।
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; ২০২৫ একযোগে সদর ব্রাহ্মণবাড়িয়া। সকল অধিকার সংরক্ষিত।</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
