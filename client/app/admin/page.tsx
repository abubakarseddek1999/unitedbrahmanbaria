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
import { FileText, Shield, Trophy, Camera, Plus, Edit, Trash2, Eye, Upload } from "lucide-react"
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
import useSecretData from "@/hooks/useSecretData"
import SecretData from "@/components/secretData/SecretData"
import Image from "next/image"
import useSuccessStories from "@/hooks/useSuccessData"

export default function AdminPage() {
  const axiosPublic = useAxiosPublic();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [spotInfos, setSpotInfos] = useState<SpotInfo[]>([])
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [newStory, setNewStory] = useState<{ title: string; description: string; image?: File }>({
    title: "",
    description: "",
    image: undefined as File | undefined,
  })
  const { data: complaints, isLoading, isError, refetch } = useComplaints()
  const { data: secretData } = useSecretData()
  const { data: successStories } = useSuccessStories()

  const [isPageLoading, setIsPageLoading] = useState(false)
  const { toast } = useToast()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const fileArray = Array.from(files)
      setPhotoFiles(fileArray)

      // Create preview URLs for all uploaded photos
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file))
      setPhotoPreview(previewUrls)
    }
  }
  const removeImage = (indexToRemove: number) => {
    // Revoke the URL for the removed image
    URL.revokeObjectURL(photoPreview[indexToRemove])

    // Remove from preview array
    const newPreviews = photoPreview.filter((_, index) => index !== indexToRemove)
    setPhotoPreview(newPreviews)

    // Remove from files array
    const newFiles = photoFiles.filter((_, index) => index !== indexToRemove)
    setPhotoFiles(newFiles)
  }


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


  const handleDeleteSpotInfo = (id: string) => {
    const numericId = Number(id);
    if (!isNaN(numericId)) {
      deleteSpotInfo(numericId);
      setSpotInfos(getSpotInfos());
      toast({
        title: "মুছে ফেলা হয়েছে",
        description: "গোপন তথ্যটি সফলভাবে মুছে ফেলা হয়েছে।",
      });
    } else {
      toast({
        title: "ত্রুটি",
        description: "ID টি সঠিক সংখ্যা নয়।",
        variant: "destructive",
      });
    }
  }

  const handleAddSuccessStory = async (e: React.FormEvent) => {
    e.preventDefault();

    const succesData = {
      title: newStory.title,
      description: newStory.description,
    };

    const submissionData = new FormData()
    photoFiles.forEach((file, index) => {
      submissionData.append("images", file) // backend এ "images" নামে multiple files যাবে
    })
    submissionData.append("data", JSON.stringify(succesData))

    try {
      // axios call - Content-Type নিজে থেকেই হবে multipart/form-data (যদি ফাইল থাকে)
      const response = await axiosPublic.post("/successdata/create", submissionData);

      console.log(response);
      toast({
        title: "সফল!",
        description: "নতুন সফলতার গল্প সফলভাবে যোগ করা হয়েছে।",
      });

      setPhotoPreview([]);
      setPhotoFiles([]);
      setNewStory({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "ত্রুটি!",
        description: "গল্প যোগ করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive", // যদি তোমার toast লাইব্রেরি এই ধরনের ভ্যারিয়েন্ট সাপোর্ট করে
      });
    }
  };






  const handleDeleteSuccessStory = (id: number) => {
    deleteSuccessStory(id)
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
                  <p className="text-3xl font-bold text-red-800">{secretData?.length ?? 0}</p>
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
                  <p className="text-3xl font-bold text-green-800">{successStories?.length ?? 0}</p>
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
                  .map((complaint) => (
                    <ComplainCard complaint={complaint} refetch={refetch} />
                  ))}
              </div>

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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>সফলতার গল্প ব্যবস্থাপনা</CardTitle>
                    <CardDescription>সফল সমাধানের গল্প যোগ ও সম্পাদনা করুন</CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                          <Label htmlFor="image">প্রমাণ (ছবি)</Label>
                          {photoPreview.length > 0 && (
                            <div className="mt-4">
                              <p className="text-sm text-gray-600 mb-2">প্রিভিউ ({photoPreview.length}টি ছবি):</p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                                {photoPreview.map((preview, index) => (
                                  <div key={index} className="relative group">
                                    <div className="relative w-full h-24 bg-gray-100 rounded-lg overflow-hidden">
                                      <Image
                                        src={preview || "/placeholder.svg"}
                                        alt={`Photo preview ${index + 1}`}
                                        fill
                                        className="object-cover"
                                      />
                                    </div>
                                    <Button
                                      type="button"
                                      variant="destructive"
                                      size="sm"
                                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                      onClick={() => removeImage(index)}
                                    >
                                      ×
                                    </Button>
                                  </div>
                                ))}
                              </div>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  photoPreview.forEach((url) => URL.revokeObjectURL(url))
                                  setPhotoPreview([])
                                  setPhotoFiles([])
                                }}
                              >
                                সব ছবি মুছুন
                              </Button>
                            </div>
                          )}
                          <div className="mt-2">
                            <Input
                              id="image"
                              type="file"
                              accept="image/*,video/*"
                              multiple
                              onChange={handlePhotoUpload}
                              className="hidden"
                            />
                            <Label
                              htmlFor="image"
                              className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                            >
                              <div className="text-center">
                                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                <p className="text-sm text-gray-600">
                                  {newStory.image ? newStory.image.name : "ছবি বা ভিডিও আপলোড করুন"}
                                </p>
                              </div>
                            </Label>
                          </div>
                        </div>
                        {/* modal close button বাতিল*/}
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} >
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
                <div className="space-y-4 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {(successStories ?? []).map((story) => (
                    <Card key={story._id} className="border-l-4 border-l-green-500">
                      <CardContent className="p-4">
                        <div className=" flex flex-col-reverse md:flex-row gap-5 items-start justify-between">

                          <div className=" flex flex-1 flex-col gap-5 items-start justify-between md:w-1/2">
                            <div className="flex-1">
                              <h4 className="font-semibold text-2xl">{story.title}</h4>
                              <p className="text-gray-600 text-[14px] mt-1 line-clamp-4">{story.description}</p>
                              <p className="text-[14px]">তারিখ: {new Date(story.dateSubmitted).toLocaleDateString("bn-BD", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}</p>
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

                          <div className=" w-full md:w-1/2">
                            {story.images ? (
                              <div className="grid grid-cols-1  lg:grid-cols-1 gap-3">
                                {story.images.map((image, index) => (
                                  <div key={index} className="relative group">
                                    <div className="relative w-full  bg-gray-100 rounded-lg overflow-hidden">

                                      <Image src={image} alt="example" width={800} height={500} className="object-fill w-full h-[200px]" />


                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="text-gray-500">কোন ছবি নেই</p>
                            )}

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
