"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Shield, Trophy, Camera, Plus, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  getComplaints,
  getSpotInfos,
  getSuccessStories,
  getGalleryItems,
  updateComplaintStatus,
  updateSpotInfoStatus,
  addSuccessStory,
  deleteComplaint,
  deleteSpotInfo,
  deleteSuccessStory,
  deleteGalleryItem,
  isAdminLoggedIn,
  setAdminLoggedIn,
  initializeData,
  type Complaint,
  type SpotInfo,
  type SuccessStory,
  type GalleryItem,
} from "@/lib/storage"
import { Login } from "@/components/login/Login"
import useComplaints from "@/hooks/useComplaints"
import ComplainCard from "@/components/complaint/ComplainCard"
import useAxiosPublic from "@/hooks/useAxios"

export default function AdminPage() {
  const axiosPublic = useAxiosPublic();
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [spotInfos, setSpotInfos] = useState<SpotInfo[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [newStory, setNewStory] = useState({ title: "", description: "", image: null as File | null })
  const { data: complaints, isLoading, isError, refetch } = useComplaints()
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
    setSuccessStories(getSuccessStories())
    setGalleryItems(getGalleryItems())
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

  const handleUpdateSpotInfoStatus = (id: number, status: string) => {
    updateSpotInfoStatus(id, status)
    setSpotInfos(getSpotInfos())
    toast({
      title: "আপডেট সফল",
      description: `গোপন তথ্যের স্ট্যাটাস "${status}" এ পরিবর্তন করা হয়েছে।`,
    })
  }



  const handleDeleteComplaint = async (id: string) => {
    try {
      const res = await axiosPublic.delete(`/complaint/${id}`);
      console.log(res.data)
      if (res.data.status === 200) {
        toast({
          title: "মুছে ফেলা হয়েছে",
          description: "অভিযোগটি সফলভাবে মুছে ফেলা হয়েছে।",
        });
      } else {
        toast({
          title: "ত্রুটি",
          description: "অভিযোগটি মুছে ফেলা যায়নি।",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "ত্রুটি",
        description: "সার্ভার থেকে অভিযোগ মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
        variant: "destructive",
      });
    }
  };


  const handleDeleteSpotInfo = (id: number) => {
    deleteSpotInfo(id)
    setSpotInfos(getSpotInfos())
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "গোপন তথ্যটি সফলভাবে মুছে ফেলা হয়েছে।",
    })
  }

  const handleAddSuccessStory = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newStory.title || !newStory.description) {
      toast({
        title: "ত্রুটি",
        description: "সকল তথ্য পূরণ করুন।",
        variant: "destructive",
      })
      return
    }

    addSuccessStory({
      title: newStory.title,
      description: newStory.description,
      image: newStory.image ? URL.createObjectURL(newStory.image) : undefined,
    })

    setSuccessStories(getSuccessStories())

    toast({
      title: "সফল!",
      description: "নতুন সফলতার গল্প যোগ করা হয়েছে।",
    })

    setNewStory({ title: "", description: "", image: null })
  }

  const handleDeleteSuccessStory = (id: number) => {
    deleteSuccessStory(id)
    setSuccessStories(getSuccessStories())
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "সফলতার গল্পটি সফলভাবে মুছে ফেলা হয়েছে।",
    })
  }

  const handleDeleteGalleryItem = (id: number) => {
    deleteGalleryItem(id)
    setGalleryItems(getGalleryItems())
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "গ্যালারি আইটেমটি সফলভাবে মুছে ফেলা হয়েছে।",
    })
  }

  if (!isLoggedIn) {
    return (
      <Login handleLogin={handleLogin}
        loginData={loginData}
        setLoginData={setLoginData}
        isLoading={isLoading} />
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
                  <p className="text-3xl font-bold text-blue-800">{complaints?.length || 0}</p>
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
                  <p className="text-3xl font-bold text-red-800">{spotInfos.length}</p>
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
                  <p className="text-3xl font-bold text-green-800">{successStories.length}</p>
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
                  <p className="text-3xl font-bold text-purple-800">{galleryItems.length}</p>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="complaints">অভিযোগ ব্যবস্থাপনা</TabsTrigger>
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
                  .map((complaint) => (
                    <ComplainCard complaint={complaint} refetch={refetch} />
                  ))}
              </div>

            </Card>
          </TabsContent>

          {/* Spot Info Management */}
          <TabsContent value="spotinfo">
            <Card>
              <CardHeader>
                <CardTitle>গোপন তথ্য পর্যালোচনা</CardTitle>
                <CardDescription>সংবেদনশীল তথ্য পর্যালোচনা করুন</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {spotInfos.map((info) => (
                    <Card key={info.id} className="border-l-4 border-l-red-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{info.subject}</h4>
                            <p className="text-gray-600 mt-1">{info.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>অবস্থান: {info.location}</span>
                              <span>ধরন: {info.submitterType}</span>
                              <span>তারিখ: {info.dateSubmitted}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant="destructive">গোপনীয়</Badge>
                            <Select onValueChange={(value) => handleUpdateSpotInfoStatus(info._id, value)}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder={info.status} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="নতুন">নতুন</SelectItem>
                                <SelectItem value="পর্যালোচনাধীন">পর্যালোচনাধীন</SelectItem>
                                <SelectItem value="তদন্তাধীন">তদন্তাধীন</SelectItem>
                                <SelectItem value="সমাধান হয়েছে">সমাধান হয়েছে</SelectItem>
                                <SelectItem value="আর্কাইভ">আর্কাইভ</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSpotInfo(info._id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Success Stories Management */}
          <TabsContent value="stories">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>সফলতার গল্প ব্যবস্থাপনা</CardTitle>
                    <CardDescription>সফল সমাধানের গল্প যোগ ও সম্পাদনা করুন</CardDescription>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <Plus className="w-4 h-4 mr-2" />
                        নতুন গল্প যোগ করুন
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>নতুন সফলতার গল্প</DialogTitle>
                        <DialogDescription>একটি নতুন সফলতার গল্প যোগ করুন</DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleAddSuccessStory} className="space-y-4">
                        <div>
                          <Label htmlFor="storyTitle">শিরোনাম</Label>
                          <Input
                            id="storyTitle"
                            value={newStory.title}
                            onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                            placeholder="সফলতার গল্পের শিরোনাম"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="storyDescription">বিবরণ</Label>
                          <Textarea
                            id="storyDescription"
                            value={newStory.description}
                            onChange={(e) => setNewStory({ ...newStory, description: e.target.value })}
                            placeholder="সফলতার বিস্তারিত বর্ণনা"
                            rows={4}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="storyImage">ছবি</Label>
                          <Input
                            id="storyImage"
                            type="file"
                            accept="image/*"
                            onChange={(e) => setNewStory({ ...newStory, image: e.target.files?.[0] || null })}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline">
                            বাতিল
                          </Button>
                          <Button type="submit">যোগ করুন</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {successStories.map((story) => (
                    <Card key={story.id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{story.title}</h4>
                            <p className="text-gray-600 mt-1">{story.description}</p>
                            <div className="text-sm text-gray-500 mt-2">তারিখ: {story.dateAdded}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSuccessStory(story._id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery Management */}
          <TabsContent value="gallery">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>গ্যালারি ব্যবস্থাপনা</CardTitle>
                    <CardDescription>ছবি ও ভিডিও আপলোড ও ব্যবস্থাপনা করুন</CardDescription>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    নতুন মিডিয়া যোগ করুন
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {galleryItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                          <img
                            src={item.url || "/placeholder.svg"}
                            alt={item.caption}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="font-medium">{item.caption}</h4>
                        <p className="text-sm text-gray-500">আপলোড: {item.dateUploaded}</p>
                        <div className="flex justify-end space-x-2 mt-3">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => item._id && handleDeleteGalleryItem(Number(item._id))}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
