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
import logo from "@/app/asset/images/logo.png";
import usePaginatedData from "@/hooks/usePaginatedData"
import Testimonials from "@/components/home/Testimonial"

export default function HomePage() {
  // const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const { data: galleryItems, total: galleryDataTotal } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
    endpoint: "/gallerydata",
    limit: 15,
  });
  const { data: successStories, total: successStoriesTotal } = usePaginatedData<SuccessStory>({
    endpoint: "/successdata",
    limit: 8,
  });
  const [selectedImage, setSelectedImage] = useState<null | { photo: string; title: string }>(null)

  useEffect(() => {
    initializeData()
    // setSuccessStories(getSuccessStories())
    // setGalleryItems(getGalleryItems())
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [selectedImage])
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
                    <div className="px-4">
                      <CardTitle className="text-lg text-gray-800">{story?.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-500">📅 তারিখ:
                        {story?.dateSubmitted && new Date(story.dateSubmitted).toLocaleDateString('bn-BD', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </CardDescription>
                    </div>

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
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {
              successStories.length === 0 &&
              // Render 3 skeleton cards to fill all grid spots responsively
              [1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse hover:shadow-lg transition-shadow rounded-xl overflow-hidden flex flex-col"
                >
                  {/* Image skeleton */}
                  <div className="relative aspect-[4/3] w-full bg-gray-300 rounded-t-xl" />

                  <div className="flex flex-col flex-1 justify-between p-4">
                    <div>
                      {/* Title skeleton */}
                      <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>

                      {/* Date skeleton */}
                      <div className="h-4 w-1/2 bg-gray-300 rounded mb-4"></div>

                      {/* Description skeleton */}
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                      </div>
                    </div>

                    {/* Button skeleton */}
                    <div className="mt-auto">
                      <div className="h-8 bg-gray-300 rounded w-full"></div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>


        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্যালারি</h3>

          {/* Images */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5">
            {galleryItems.slice(0, 15).map((item) => (
              <div
                key={item._id}
                className="relative aspect-[4/3] group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedImage({ photo: item.photo, title: item.title })}
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

          {/* Skeleton Loaders (if no galleryItems) */}
          {galleryItems.length === 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm bg-gray-300 animate-pulse"
                >
                  <div className="w-full h-full bg-gray-300" />
                  <div className="absolute inset-x-0 bottom-0 bg-opacity-20 h-8 rounded-b-xl flex items-center justify-center">
                    <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null)
            }
          }}
        >
          <div className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 z-10 w-5 h-5 text-gray-600 hover:text-gray-900 bg-white rounded-full  shadow"
            >
              ✕
            </button>
            <Image
              src={selectedImage.photo}
              alt={selectedImage.title}
              width={1200}
              height={900}
              className="w-full h-auto"
            />
            <div className="p-4">
              <h4 className="text-lg font-medium text-gray-800 text-center">{selectedImage.title}</h4>
            </div>
          </div>
        </div>
      )}
      {/* testimonial section */}
      <Testimonials />


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
    
    </div>
  )
}
