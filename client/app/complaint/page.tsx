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
import { ArrowLeft, Plus, Calendar, User, Eye, EyeOff, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { getComplaints, addComplaint, initializeData, type Complaint } from "@/lib/storage"
import useAxiosPublic from "@/hooks/useAxios"
import useComplaints from "@/hooks/useComplaints"
import Link from "next/link"

export default function ComplaintPage() {
  const { data, isLoading, isError, refetch } = useComplaints()
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  console.log(data)
  const axiosPublic = useAxiosPublic();

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
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setPhotoFiles(fileArray);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      });
      return;
    }

    if (photoFiles.length === 0) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে একটি ছবি আপলোড করুন।",
        variant: "destructive",
      });
      return;

    }



    // বাকী তথ্য JSON string হিসেবে পাঠানোর জন্য
    const complaintData = {
      status: "নতুন",
      dateSubmitted: new Date().toISOString(),
      title: formData.title,
      description: formData.description,
      name: formData.name ? formData.name : "অজ্ঞাত",
      hideName: formData.hideName,
      hidePhone: formData.hidePhone,
      phone: formData.phone ? formData.phone : "অজ্ঞাত",
    };

    const submissionData = new FormData();
    photoFiles.forEach((file, index) => {
      submissionData.append("images", file); // backend এ "images" নামে multiple files যাবে
    });
    submissionData.append('data', JSON.stringify(complaintData));

    for (const [key, value] of submissionData.entries()) {
      console.log(key, value);
    }

    try {
      // axios call - Content-Type নিজে থেকেই হবে multipart/form-data
      const response = await axiosPublic.post("/complaint/create", submissionData);

      console.log(response);
      toast({
        title: "সফল!",
        description: "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে।",
      });

      setIsDialogOpen(false);

      setFormData({
        title: "",
        description: "",
        name: "",
        hideName: true,
        image: null,
        phone: "",
        hidePhone: true,

      });
    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "ত্রুটি",
        description: "অভিযোগ জমা দিতে ব্যর্থ হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    }
  };



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
    <div className="min-h-screen bg-gray-50">
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
              <DialogContent className="max-w-2xl">
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
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      অভিযোগ জমা দিন
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
            {data?.slice().reverse().map((complaint: any) => (
              <Card key={complaint?._id} className="hover:shadow-md transition-shadow flex flex-col-reverse md:flex-row">
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
                        ? complaint.description.split(" ").slice(0, 10).join(" ") + (complaint.description.split(" ").length > 20 ? "..." : "")
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
                <div className="w-full md:w-1/2 p-5 ">
                  {complaint?.images && complaint.images.length > 0 && (
                    <div className=" flex flex-col md:flex-row space-x-2 overflow-x-auto">
                      {complaint.images.slice(0, 1).map((imgUrl: string, index: number) => (
                        <Image
                          key={index}
                          src={imgUrl || "/placeholder.svg"}
                          alt={`অভিযোগের ছবি ${index + 1}`}
                          width={120}
                          height={80}
                          className="rounded-lg w-full object-cover max-h-[300px] shadow-sm"
                        />
                      ))}
                    </div>
                  )}

                </div>

              </Card>
              // <ComplaintCard complaint={complaint} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
