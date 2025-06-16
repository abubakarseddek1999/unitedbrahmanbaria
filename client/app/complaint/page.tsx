"use client"
import type React from "react"
import { useState, useEffect } from "react"
// import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Calendar, User, Eye, EyeOff, Upload, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import useAxiosPublic from "@/hooks/useAxios"
import useComplaints from "@/hooks/useComplaints"
import Link from "next/link"
import usePaginatedData from "@/hooks/usePaginatedData"
import PhotoCollageMini from "@/components/secretData/PhotoCollegeMini"

export default function ComplaintPage() {
  // const { data, isError, refetch } = useComplaints()
  const { data, loading, hasMore, ref, refetch } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
    endpoint: "/complaint",
    limit: 8,
  });
  const [photoPreview, setPhotoPreview] = useState<string[]>([])
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const axiosPublic = useAxiosPublic()

  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [currentImages, setCurrentImages] = useState<string[]>([])
  const [currentSubject, setCurrentSubject] = useState("")
  const handleViewAllImages = (images: string[], subject: string) => {
    setCurrentImages(images)
    setCurrentSubject(subject)
    setIsImageModalOpen(true)
  }

  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    hideName: true,
    hidePhone: true,
    image: null as File | null,
    phone: "",
  })
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
    // Cleanup function to revoke object URLs when component unmounts
    return () => {
      photoPreview.forEach((url) => {
        URL.revokeObjectURL(url)
      })
    }
  }, [photoPreview])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      })
      return
    }

    if (photoFiles.length === 0) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে একটি ছবি আপলোড করুন।",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    // বাকী তথ্য JSON string হিসেবে পাঠানোর জন্য
    const complaintData = {
      status: "নতুন ",
      dateSubmitted: new Date().toISOString(),
      title: formData.title,
      description: formData.description,
      name: formData.name ? formData.name : "অজ্ঞাত",
      hideName: formData.hideName,
      hidePhone: formData.hidePhone,
      phone: formData.phone ? formData.phone : "অজ্ঞাত",
    }

    const submissionData = new FormData()
    photoFiles.forEach((file, index) => {
      submissionData.append("images", file) // backend এ "images" নামে multiple files যাবে
    })
    submissionData.append("data", JSON.stringify(complaintData))

    for (const [key, value] of submissionData.entries()) {
      console.log(key, value)
    }

    try {
      // axios call - Content-Type নিজে থেকেই হবে multipart/form-data
      const response = await axiosPublic.post("/complaint/create", submissionData)

      console.log(response)
      toast({
        title: "সফল!",
        description: "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে।",
      })
      refetch() // Refresh the complaints list
      setIsDialogOpen(false)
      setPhotoPreview([])
      setPhotoFiles([])
      setFormData({
        title: "",
        description: "",
        name: "",
        hideName: true,
        image: null,
        phone: "",
        hidePhone: true,
      })
    } catch (error) {
      console.error("Error submitting complaint:", error)
      toast({
        title: "ত্রুটি",
        description: "অভিযোগ জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      })
    }
    setIsLoading(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "নতুন":
        return "bg-blue-100 text-blue-800"
      case "পর্যালোচনাধীন":
        return "bg-yellow-100 text-yellow-800"
      case "সমাধানাধীন":
        return "bg-green-100 text-green-800"
      case "সমাধান হয়েছে":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className=" shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  নতুন অভিযোগ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>নতুন অভিযোগ জমা দিন</DialogTitle>
                  <DialogDescription>
                    আপনার সমস্যার বিস্তারিত তথ্য দিন। আপনার পরিচয় গোপন রাখতে চাইলে সেই অপশন নির্বাচন করুন।
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="title">অভিযোগের শিরোনাম *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="সংক্ষেপে আপনার সমস্যার কথা লিখুন"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">বিস্তারিত বিবরণ *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="আপনার সমস্যার বিস্তারিত বর্ণনা দিন..."
                      rows={4}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">আপনার ফোন নম্বর (ঐচ্ছিক)</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="আপনার ফোন নম্বর লিখুন"
                      type="tel"
                    />
                  </div>
                  {/* for hidden phone number */}
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hidePhone"
                      checked={formData.hidePhone}
                      onCheckedChange={(checked) => setFormData({ ...formData, hidePhone: checked as boolean })}
                    />
                    <Label htmlFor="hidePhone" className="flex items-center">
                      {formData.hidePhone ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      আমার ফোন নম্বর গোপন রাখুন
                    </Label>
                  </div>
                  <div>
                    <Label htmlFor="name">আপনার নাম (ঐচ্ছিক)</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="আপনার নাম লিখুন"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hideName"
                      checked={formData.hideName}
                      onCheckedChange={(checked) => setFormData({ ...formData, hideName: checked as boolean })}
                    />
                    <Label htmlFor="hideName" className="flex items-center">
                      {formData.hideName ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
                      আমার নাম গোপন রাখুন
                    </Label>
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
                            {formData.image ? formData.image.name : "ছবি বা ভিডিও আপলোড করুন"}
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      বাতিল
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="animate-spin w-4 h-4" />
                          অভিযোগ জমা হচ্ছে
                        </span>
                      ) : (
                        "অভিযোগ জমা দিন"
                      )}
                    </Button>

                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">সকল অভিযোগ</h2>
            <Badge variant="secondary">{data?.length}টি অভিযোগ</Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data
              ?.slice()
              .map((complaint: any) => (
                <Card
                  key={complaint?._id}
                  className="hover:shadow-md transition-shadow flex flex-col-reverse md:flex-row"
                >
                  <div className="w-full md:w-1/2">
                    <CardHeader>
                      <div className="flex flex-col md:flex-row items-start justify-between">
                        <div className="flex-1 mb-2">
                          <CardTitle className="text-lg mb-2">{complaint?.title}</CardTitle>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {complaint.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(complaint.dateSubmitted).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })}
                            </div>
                          </div>
                          <Badge className={getStatusColor(complaint?.status)}>{complaint.status}</Badge>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-gray-700">
                        {complaint?.description
                          ? complaint.description.split(" ").slice(0, 10).join(" ") +
                          (complaint.description.split(" ").length > 20 ? "..." : "")
                          : ""}
                      </CardDescription>
                    </CardContent>

                    <Link href={`/complaint-details/${complaint._id}`}>
                      <button className="flex items-center mx-5 my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm text-xs">
                        <span className="inline-block w-2 h-2 mr-2 rounded-full bg-white animate-pulse"></span>
                        বিস্তারিত জানুন
                      </button>
                    </Link>
                  </div>
                  {/* images */}
                  <div className="w-full md:w-1/2 p-5 ">
                    <PhotoCollageMini
                      images={complaint.images || []}
                      maxDisplay={3}
                      onViewAll={(images) => handleViewAllImages(images, complaint.subject || "Secrete Subject")}
                    />
                  </div>
                </Card>
                // <ComplaintCard complaint={complaint} />
              ))}


            {!data?.length &&
              [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse hover:shadow-md transition-shadow flex flex-col-reverse md:flex-row bg-white rounded-md overflow-hidden"
                >
                  {/* Left (text) section */}
                  <div className="w-full md:w-1/2 p-4">
                    <div className="mb-4">
                      {/* Title */}
                      <div className="h-5 w-3/4 bg-gray-300 rounded mb-3"></div>

                      {/* Name and Date */}
                      <div className="flex flex-col sm:flex-row gap-3 text-sm mb-4">
                        <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
                      </div>

                      {/* Status Badge */}
                      <div className="h-6 w-20 bg-gray-300 rounded-full mb-4"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-6">
                      <div className="h-3 w-full bg-gray-300 rounded"></div>
                      <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
                    </div>

                    {/* Button */}
                    <div className="h-8 w-32 bg-gray-300 rounded-sm"></div>
                  </div>

                  {/* Right (image) section */}
                  <div className="w-full md:w-1/2 p-5 grid grid-cols-2 gap-2">
                    <div className="aspect-[4/3] bg-gray-300 rounded"></div>
                    <div className="aspect-[4/3] bg-gray-300 rounded"></div>
                    <div className="aspect-[4/3] bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </main>

      {/* Image Viewer Modal */}
      <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <DialogContent className="max-w-[90vw] lg:max-w-[800px] h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{currentSubject} - সকল ছবি</span>

            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentImages.map((img, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={img}
                  alt={`Image ${index + 1}`}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
                />
                <p className="text-center mt-2 text-gray-500 text-sm">
                  Image {index + 1}/{currentImages.length}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
