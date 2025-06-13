"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Shield, Trophy, Camera, Plus, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getSpotInfos,
  getGalleryItems,
  isAdminLoggedIn,
  setAdminLoggedIn,
  initializeData,
  type SpotInfo,
  type GalleryItem,
} from "@/lib/storage"
import { Login } from "@/components/login/Login"
import useComplaints from "@/hooks/useComplaints"
import ComplainCard from "@/components/complaint/ComplainCard"
import useAxiosPublic from "@/hooks/useAxios"
import useSecretData from "@/hooks/useSecretData"
import SecretData from "@/components/secretData/SecretData"
import Image from "next/image"
import useSuccessStories from "@/hooks/useSuccessData"
import Gallery from "@/components/gallery/Gallery"
import SuccessStoryContent from "@/components/success/SuccessStoryContent"
import SuccessCardHeader from "@/components/success/SuccessCardHeader"
import usePaginatedData from "@/hooks/usePaginatedData"
import useGalleryData from "@/hooks/useGalleryData"

export default function AdminPage() {
  const [refresh, setRefresh] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [spotInfos, setSpotInfos] = useState<SpotInfo[]>([])
  const { data: galleryItems, total: galleryDataTotal } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
    endpoint: "/gallerydata",
    limit: 5,
  });


  interface Complaint {
    _id: string;
    photo: string;
    title: string;
    dateSubmitted: string;
    description: string;
    name: string;
    status: string;
  }
  const { data, isLoading, isError, error } = useGalleryData()


  const { data: complaints, loading, ref, refetch, total: complaintsTotal } = usePaginatedData<Complaint>({
    endpoint: "/complaint",
    limit: 8,
  });
  const { data: seceretdata, total: seceretdataTotal } = usePaginatedData({
    endpoint: "/secretdata",
    limit: 8,
  });
  const { data: successStories, total: successStoriesTotal } = usePaginatedData({
    endpoint: "/successdata",
    limit: 8,
  });

  const { data: secretData } = useSecretData()
  // const { data: successStories } = useSuccessStories()

  const [isPageLoading, setIsPageLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    setIsLoggedIn(isAdminLoggedIn())
    if (isAdminLoggedIn()) {
      loadData()
    }
  }, [])

  const loadData = () => {
    setSpotInfos(getSpotInfos())
    // setSuccessStories(getSuccessStories())
    // setGalleryItems(getGalleryItems())
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsPageLoading(true)

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simple authentication (in real app, this would be more secure)
    if (loginData.username.trim() === "admin" && loginData.password.trim() === "admin123") {
      setIsLoggedIn(true)
      setAdminLoggedIn(true)
      loadData()
      toast({
        title: "সফল!",
        description: "অ্যাডমিন প্যানেলে স্বাগতম।",
      })
    } else {
      toast({
        title: "ত্রুটি",
        description: "ভুল ইউজারনেম বা পাসওয়ার্ড।",
        variant: "destructive",
      })
    }
    setIsPageLoading(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setAdminLoggedIn(false)
    setLoginData({ username: "", password: "" })
    toast({
      title: "লগআউট সফল",
      description: "আপনি সফলভাবে লগআউট হয়েছেন।",
    })
  }

  if (!isLoggedIn) {
    return (
      <Login handleLogin={handleLogin}
        loginData={loginData}
        setLoginData={setLoginData}
        isLoading={loading} />
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">অ্যাডমিন ড্যাশবোর্ড</h1>
                <p className="text-gray-600">সিস্টেম ব্যবস্থাপনা</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              লগআউট
            </Button>
          </div>
        </div>
      </header>
      {/* Dashboard Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide">মোট অভিযোগ</p>
                  <p className="text-3xl font-bold text-blue-800">{complaintsTotal || 0}</p>
                  <p className="text-xs text-blue-600 mt-1">সর্বমোট জমাকৃত</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">গোপন তথ্য</p>
                  <p className="text-3xl font-bold text-red-800">{seceretdataTotal || 0}</p>
                  <p className="text-xs text-red-600 mt-1">সংবেদনশীল তথ্য</p>
                </div>
                <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-green-700 uppercase tracking-wide">সফলতার গল্প</p>
                  <p className="text-3xl font-bold text-green-800">{successStoriesTotal || 0}</p>
                  <p className="text-xs text-green-600 mt-1">প্রকাশিত গল্প</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-purple-700 uppercase tracking-wide">গ্যালারি আইটেম</p>
                  {/* <p className="text-3xl font-bold text-purple-800">{galleryItems?.length || 0}</p> */}
                  <p className="text-3xl font-bold text-purple-800">{galleryDataTotal || 0}</p>
                  <p className="text-xs text-purple-600 mt-1">মিডিয়া ফাইল</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Main Content Tabs */}
        <Tabs defaultValue="complaints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 gap-5">
            <TabsTrigger value="complaints">অভিযোগ </TabsTrigger>
            <TabsTrigger value="spotinfo">গোপন তথ্য</TabsTrigger>
            <TabsTrigger value="stories">সফলতার গল্প</TabsTrigger>
            <TabsTrigger value="gallery">গ্যালারি</TabsTrigger>
          </TabsList>

          {/* Complaints Management */}
          <TabsContent value="complaints">
            <Card>
              <CardHeader>
                <CardTitle>অভিযোগ ব্যবস্থাপনা</CardTitle>
                <CardDescription>সকল অভিযোগ দেখুন এবং ব্যবস্থা নিন</CardDescription>
              </CardHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {complaints
                  ?.slice()
                  .reverse()
                  .map((complaint, index) => {
                    const isLast = index === complaints.length - 1
                    return (
                      <div key={complaint._id} ref={isLast ? ref : undefined}>
                        <ComplainCard complaint={complaint} refetch={refetch} />
                      </div>
                    )
                  })}
              </div>
              {loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Card className="border-l-4 border-l-green-500 animate-pulse">
                      <CardContent className="p-4">
                        <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">

                          {/* Text Content Skeleton */}
                          <div className="flex-1 flex flex-col gap-5 md:w-1/2">
                            <div>
                              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" /> {/* Title */}
                              <div className="h-4 bg-gray-200 rounded w-full mb-1" /> {/* Description */}
                              <div className="h-4 bg-gray-200 rounded w-5/6 mb-1" />
                              <div className="h-4 bg-gray-200 rounded w-4/6 mb-4" />
                              <div className="h-3 bg-gray-300 rounded w-1/3" /> {/* Date */}
                            </div>

                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Edit button */}
                              <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Delete button */}
                              <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Delete button */}
                            </div>
                          </div>

                          {/* Image Content Skeleton */}
                          <div className="w-full md:w-1/2">
                            <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                  ))}
                </div>
              )}


            </Card>
          </TabsContent>

          {/* Spot Info Management */}
          <TabsContent value="spotinfo">
            <SecretData />
          </TabsContent>

          {/* Success Stories Management */}
          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <SuccessCardHeader setRefresh={setRefresh} />
              </CardHeader>
              <CardContent>
                <SuccessStoryContent refresh={refresh} setRefresh={setRefresh} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Gallery />

          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
