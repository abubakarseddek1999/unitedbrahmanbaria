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
import Navbar from "@/components/share/Navbar"
import usePaginatedData from "@/hooks/usePaginatedData"

export default function HomePage() {
  // const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const { data: galleryItems, total: galleryDataTotal } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
    endpoint: "/gallerydata",
    limit: 10,
  });
  const { data: successStories, total: successStoriesTotal } = usePaginatedData<SuccessStory>({
    endpoint: "/successdata",
    limit: 8,
  });


  useEffect(() => {
    initializeData()
    // setSuccessStories(getSuccessStories())
    // setGalleryItems(getGalleryItems())
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Banner />

      <section className="py-20 px-4 bg-gradient-to-b from-white via-[#f9fdfb] to-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-16">
            আমাদের সেবাসমূহ
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group perspective">
              <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                <div>
                  <FileText className="w-14 h-14 text-green-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">অভিযোগ জমা দিন</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    যেকোনো সমস্যা বা অনিয়মের বিষয়ে অভিযোগ জানান। আপনার পরিচয় গোপন রাখার সুবিধা রয়েছে।
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group perspective">
              <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                <div>
                  <Shield className="w-14 h-14 text-blue-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">গোপন তথ্য</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য সম্পূর্ণ গোপনীয়তার সাথে জমা দিন।
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group perspective">
              <div className="bg-white h-full rounded-2xl border border-gray-200 shadow-xl p-8 text-center flex flex-col justify-between transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:scale-[1.03]">
                <div>
                  <Users className="w-14 h-14 text-purple-600 mx-auto mb-4 drop-shadow-md transition-transform duration-300 group-hover:scale-110" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">সফলতার গল্প</h4>
                  <p className="text-gray-600 text-base leading-relaxed">
                    আপনার অভিযোগের ভিত্তিতে সমাধান হওয়া সমস্যাগুলোর সফলতার গল্প দেখুন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <h3 className="text-3xl font-bold text-gray-800">সফলতার গল্প</h3>
            <Badge variant="secondary" className="text-sm">
              {successStories.length} টি নতুন  সফল সমাধান
            </Badge>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {successStories?.slice(0, 6).map((story) => (
              <Card
                key={story?._id}
                className="hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={story?.images[0] || "/placeholder.svg"}
                    alt={story?.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex flex-col flex-1 justify-between">
                  <div>
                    <CardHeader className="px-4 pt-4 pb-2">
                      <CardTitle className="text-lg text-gray-800">{story?.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">{story.dateAdded}</CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 pb-4">
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {story?.description}
                      </p>
                    </CardContent>
                  </div>
                  <Link href={`/seccess-details/${story?._id}`}>
                    <div className=" mt-auto">
                      <button className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        বিস্তারিত দেখুন
                      </button>
                    </div>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্যালারি</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {galleryItems.slice(0, 10).reverse().map((item) => (
              <div
                key={item._id}
                className="relative aspect-[4/3] group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow"
              >
                <Image
                  src={item.photo || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white text-center text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                    {item.title}
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
                  +8801728306504
                </li>
                <li className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  abubakarseddek1999@gmail.com
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
