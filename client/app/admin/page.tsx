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
import { ArrowLeft, FileText, Shield, Trophy, Camera, Plus, Edit, Trash2, Eye } from "lucide-react"
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

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [spotInfos, setSpotInfos] = useState<SpotInfo[]>([])
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [newStory, setNewStory] = useState({ title: "", description: "", image: null as File | null })
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    setIsLoggedIn(isAdminLoggedIn())
    if (isAdminLoggedIn()) {
      loadData()
    }
  }, [])

  const loadData = () => {
    setComplaints(getComplaints())
    setSpotInfos(getSpotInfos())
    setSuccessStories(getSuccessStories())
    setGalleryItems(getGalleryItems())
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

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
    setIsLoading(false)
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

  const handleUpdateComplaintStatus = (id: number, status: string) => {
    updateComplaintStatus(id, status)
    setComplaints(getComplaints())
    toast({
      title: "আপডেট সফল",
      description: `অভিযোগের স্ট্যাটাস "${status}" এ পরিবর্তন করা হয়েছে।`,
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

  const handleDeleteComplaint = (id: number) => {
    deleteComplaint(id)
    setComplaints(getComplaints())
    toast({
      title: "মুছে ফেলা হয়েছে",
      description: "অভিযোগটি সফলভাবে মুছে ফেলা হয়েছে।",
    })
  }

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">অ্যাডমিন লগইন</CardTitle>
            <CardDescription>অ্যাডমিন প্যানেলে প্রবেশ করুন</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">ইউজারনেম</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  placeholder="Enter your username"
                  required
                  disabled={isLoading}
                />
              </div>
              <div>
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Input
                  id="password"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "লগইন হচ্ছে..." : "লগইন করুন"}
              </Button>
            </form>
            {/* <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>ডেমো লগইন:</strong>
                <br />
                ইউজারনেম: admin
                <br />
                পাসওয়ার্ড: admin123
              </p>
            </div> */}
            <div className="mt-4 text-center">
              <Button variant="outline" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  হোমে ফিরুন
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  হোমে ফিরুন
                </Link>
              </Button>
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
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">মোট অভিযোগ</p>
                  <p className="text-3xl font-bold text-blue-600">{complaints.length}</p>
                </div>
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">গোপন তথ্য</p>
                  <p className="text-3xl font-bold text-red-600">{spotInfos.length}</p>
                </div>
                <Shield className="w-8 h-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">সফলতার গল্প</p>
                  <p className="text-3xl font-bold text-green-600">{successStories.length}</p>
                </div>
                <Trophy className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">গ্যালারি আইটেম</p>
                  <p className="text-3xl font-bold text-purple-600">{galleryItems.length}</p>
                </div>
                <Camera className="w-8 h-8 text-purple-600" />
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
              <CardContent>
                <div className="space-y-4">
                  {complaints.map((complaint) => (
                    <Card key={complaint.id} className="border-l-4 border-l-blue-500">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{complaint.title}</h4>
                            <p className="text-gray-600 mt-1">{complaint.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                              <span>জমাদাতা: {complaint.name}</span>
                              <span>তারিখ: {complaint.dateSubmitted}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Select onValueChange={(value) => handleUpdateComplaintStatus(complaint.id, value)}>
                              <SelectTrigger className="w-40">
                                <SelectValue placeholder={complaint.status} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="নতুন">নতুন</SelectItem>
                                <SelectItem value="পর্যালোচনাধীন">পর্যালোচনাধীন</SelectItem>
                                <SelectItem value="সমাধানাধীন">সমাধানাধীন</SelectItem>
                                <SelectItem value="সমাধান হয়েছে">সমাধান হয়েছে</SelectItem>
                                <SelectItem value="বাতিল">বাতিল</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteComplaint(complaint.id)}>
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
                            <Select onValueChange={(value) => handleUpdateSpotInfoStatus(info.id, value)}>
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
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSpotInfo(info.id)}>
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
                            <Button size="sm" variant="destructive" onClick={() => handleDeleteSuccessStory(story.id)}>
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
                          <Button size="sm" variant="destructive" onClick={() => handleDeleteGalleryItem(item.id)}>
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
