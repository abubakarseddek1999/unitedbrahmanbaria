"use client"
import useAxiosPublic from "@/hooks/useAxios"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  Star,
  ThumbsUp,
} from "lucide-react"

interface PageProps {
  params: {
    id: string
  }
}

interface successStory {
  _id: string
  dateAdded: string
  title: string
  description: string
  images?: string[]
  subject?: string
  dateSubmitted?: string
  views?: number
  likes?: number
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timeAgo: string
  likes: number
}

interface UsePaginatedDataProps {
  endpoint: string
  limit: number
}

// Mock hook - replace with your actual hook
const usePaginatedData = ({ endpoint, limit }: UsePaginatedDataProps) => {
  const [data, setData] = useState<successStory[]>([])
  const [total, setTotal] = useState(0)
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    axiosPublic
      .get(`${endpoint}?limit=${limit}`)
      .then((response) => {
        setData(response.data.data || [])
        setTotal(response.data.total || 0)
      })
      .catch((error) => {
        console.error("Error fetching data:", error)
      })
  }, [endpoint, limit])

  return { data, total }
}

// Static comments data
const staticComments: Comment[] = [
  {
    id: "1",
    author: "মোহাম্মদ রহিম",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "অসাধারণ একটি সফলতার গল্প! এই ধরনের উদ্যোগ আমাদের এলাকার উন্নয়নে গুরুত্বপূর্ণ ভূমিকা রাখছে।",
    timeAgo: "২ ঘন্টা আগে",
    likes: 12,
  },
  {
    id: "2",
    author: "ফাতেমা খাতুন",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "সত্যিই অনুপ্রেরণামূলক! আমাদের সমাজের এমন ইতিবাচক পরিবর্তন দেখে খুশি হলাম।",
    timeAgo: "৫ ঘন্টা আগে",
    likes: 8,
  },
  {
    id: "3",
    author: "আব্দুল করিম",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়ার এই ধরনের কাজের জন্য ধন্যবাদ। স্বচ্ছতার সাথে কাজ করার জন্য অভিনন্দন।",
    timeAgo: "১ দিন আগে",
    likes: 15,
  },
]

const SuccessDetailsPage = ({ params }: PageProps) => {
  const [selectedStory, setSelectedStory] = useState<successStory | null>(null)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const { id } = params
  const axiosPublic = useAxiosPublic()

  // Fetch all success stories for sidebar
  const { data: successStories, total: successStoriesTotal } = usePaginatedData({
    endpoint: "/successdata",
    limit: 10,
  })

  // Fetch initial story based on ID
  useEffect(() => {
    if (id) {
      setLoading(true)
      axiosPublic
        .get(`/successdata/${id}`)
        .then((response) => {
          setSelectedStory(response.data.data)
          setLikeCount(response.data.data.likes || Math.floor(Math.random() * 50) + 10)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching success story:", error)
          setLoading(false)
        })
    }
  }, [id, axiosPublic])

  // Handle story selection from sidebar
  const handleStorySelect = (story: successStory) => {
    setSelectedStory(story)
    setLikeCount(story.likes || Math.floor(Math.random() * 50) + 10)
    setLiked(false)
    // Update URL without page reload
    window.history.pushState(null, "", `/success-details/${story._id}`)

    // Scroll to top smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1))
  }

  function openLightbox(image: string) {
    setActiveImage(image)
    setLightboxOpen(true)
  }

  function closeLightbox() {
    setLightboxOpen(false)
    setActiveImage(null)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours} ঘন্টা আগে`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} দিন আগে`
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">লোড হচ্ছে...</span>
      </div>
    )
  }

  if (!selectedStory) {
    return <div className="text-center text-red-500 mt-20 text-lg">সফলতার গল্প খুঁজে পাওয়া যায়নি।</div>
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1 lg:w-2/3 space-y-6">
            {/* Main Story Card */}
            <Card className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-0">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors">
                      <Award className="w-3 h-3 mr-1" />
                      সফলতার গল্প
                    </Badge>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{selectedStory.views || Math.floor(Math.random() * 1000) + 100}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(selectedStory.dateAdded || selectedStory.dateSubmitted || "")}</span>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                    {selectedStory.title || selectedStory.subject}
                  </h1>

                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Clock className="w-4 h-4" />
                    <span>{getTimeAgo(selectedStory.dateAdded || selectedStory.dateSubmitted || "")}</span>
                    <span className="mx-2">•</span>
                    <span>গল্প আইডি: {selectedStory._id.slice(-8)}</span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <div className="prose prose-lg max-w-none mb-8">
                    <p className="text-gray-700 leading-relaxed text-justify text-lg whitespace-pre-line">
                      {selectedStory.description}
                    </p>
                  </div>

                  {/* Image Gallery */}
                  {selectedStory.images && selectedStory.images.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                        সংযুক্ত ছবিসমূহ
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedStory.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
                            onClick={() => openLightbox(img)}
                          >
                            <img
                              src={img || "/placeholder.svg"}
                              alt={`সফলতার গল্প ছবি ${idx + 1}`}
                              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                              <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-4">
                      <Button
                        variant={liked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                        className={`transition-all duration-300 ${liked ? "bg-red-500 hover:bg-red-600" : "hover:bg-red-50 hover:text-red-600 hover:border-red-200"}`}
                      >
                        <Heart className={`w-4 h-4 mr-2 ${liked ? "fill-current" : ""}`} />
                        {likeCount}
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        মন্তব্য
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        শেয়ার
                      </Button>
                    </div>

                    <Badge variant="secondary" className="bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      যাচাইকৃত
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="w-5 h-5 text-blue-600" />
                  মন্তব্যসমূহ ({staticComments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {staticComments.map((comment) => (
                    <div key={comment.id} className="flex gap-4 group">
                      <Avatar className="w-10 h-10 ring-2 ring-gray-100">
                        <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {comment.author.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-2xl p-4 group-hover:bg-gray-100 transition-colors duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-800">{comment.author}</h4>
                            <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                        </div>

                        <div className="flex items-center gap-4 mt-2 ml-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-xs h-8 px-3 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <ThumbsUp className="w-3 h-3 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs h-8 px-3 hover:bg-gray-100">
                            উত্তর দিন
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                <div className="flex gap-4">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-blue-100 text-blue-600">আ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-2xl p-4 border-2 border-dashed border-gray-200">
                      <p className="text-gray-500 text-sm">আপনার মন্তব্য লিখুন...</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            {/* Organization Header */}
            <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl shadow-xl border-0 overflow-hidden">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold mb-2">ঐক্যবদ্ধ সদর ব্রাহ্মণবাড়িয়া</h2>
                  <p className="text-sm opacity-90 leading-relaxed">স্বচ্ছতা ও জবাবদিহিতার প্ল্যাটফর্ম</p>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <TrendingUp className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">১২৫+</div>
                    <div className="text-xs opacity-80">প্রকল্প</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <Users className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">৫০০+</div>
                    <div className="text-xs opacity-80">পরিবার</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 backdrop-blur-sm">
                    <Star className="w-5 h-5 mx-auto mb-1" />
                    <div className="text-lg font-bold">৯৮%</div>
                    <div className="text-xs opacity-80">সন্তুষ্টি</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories List */}
            <Card className="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">অন্যান্য সফলতার গল্প</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {successStoriesTotal}টি গল্প
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[500px]">
                  <div className="p-4 space-y-3">
                    {successStories.map((story, index) => (
                      <div
                        key={story._id}
                        className={`group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                          selectedStory._id === story._id
                            ? "border-blue-500 bg-blue-50 shadow-md"
                            : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                        }`}
                        onClick={() => handleStorySelect(story)}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <div className="flex gap-3">
                          {/* Thumbnail */}
                          <div className="flex-shrink-0 relative overflow-hidden rounded-lg">
                            <img
                              src={story.images?.[0] || "/placeholder.svg"}
                              alt={story.title || story.subject || ""}
                              className="w-20 h-14 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                              {story.title || story.subject}
                            </h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2 leading-relaxed">
                              {story.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{getTimeAgo(story.dateAdded || story.dateSubmitted || "")}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Eye className="w-3 h-3" />
                                <span>{Math.floor(Math.random() * 500) + 50}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Load More Button */}
                <div className="p-4 border-t bg-gray-50">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
                  >
                    আরও গল্প দেখুন
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && activeImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <div className="relative max-w-4xl max-h-full animate-in zoom-in duration-300">
            <img
              src={activeImage || "/placeholder.svg"}
              alt="বড় ছবি"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
            <button
              onClick={closeLightbox}
              className="absolute -top-4 -right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 backdrop-blur-sm"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </main>
  )
}

export default SuccessDetailsPage
