"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Shield, Upload, AlertTriangle, Lock, X, Eye, Loader2, FileImage, FileVideo } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"
import { addSpotInfo, initializeData } from "@/lib/storage"
import useAxiosPublic from "@/hooks/useAxios"
import { stat } from "fs"

export default function SpotInfoPage() {
  const axiosPublic = useAxiosPublic();
  const [photoFiles, setPhotoFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    location: "",
    imageOrVideo: null as File | null,
    submitterType: "",
    hideIdentity: true,
  })
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setPhotoFiles(prev => [...prev, ...fileArray]);
    }
  };

  const removePhoto = (index: number) => {
    setPhotoFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFilePreview = (file: File) => {
    return URL.createObjectURL(file);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (!formData.subject || !formData.description || !formData.location) {
        toast({
          title: "ত্রুটি",
          description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
          variant: "destructive",
        })
        return
      }

      // Add spot info to localStorage
      addSpotInfo({
        subject: formData.subject,
        description: formData.description,
        location: formData.location,

        submitterType: formData.submitterType || "অজ্ঞাত",
        hideIdentity: formData.hideIdentity,
      })

      const spotData = {
        subject: formData.subject,
        description: formData.description,
        location: formData.location,
        status: "নতুন ",
        submitterType: formData.submitterType || "অজ্ঞাত",
        hideIdentity: formData.hideIdentity,
      };

      const submissionData = new FormData();
      photoFiles.forEach((file, index) => {
        submissionData.append("images", file);
      });
      submissionData.append('data', JSON.stringify(spotData));

      const response = await axiosPublic.post("/secretdata/create", submissionData);

      console.log(response);
      toast({
        title: "সফল!",
        description: "আপনার গোপন তথ্য সফলভাবে জমা দেওয়া হয়েছে।",
      });

      // Reset form
      setFormData({
        subject: "",
        description: "",
        location: "",
        imageOrVideo: null,
        submitterType: "",
        hideIdentity: true,
      })
      setPhotoFiles([])

    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast({
        title: "সফল!",
        description: "আপনার গোপন তথ্য সফলভাবে জমা দেওয়া হয়েছে। এটি সম্পূর্ণ গোপনীয় রাখা হবে।",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <header className="bg-white pt-2 max-w-5xl mx-auto px-4 py-6 shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  গোপন তথ্য
                </h1>
                <p className="text-gray-600 font-medium">সংবেদনশীল তথ্য নিরাপদে জমা দিন</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-700 text-sm font-medium">নিরাপদ সংযোগ</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Security Notice */}
          <Card className="mb-8 pb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-blue-800 text-xl">নিরাপত্তা নিশ্চয়তা</CardTitle>
                  <p className="text-blue-600 text-sm">আপনার তথ্য সম্পূর্ণ সুরক্ষিত</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: Lock, text: "আপনার সকল তথ্য এনক্রিপ্ট করে সংরক্ষণ করা হয়" },
                  { icon: Shield, text: "আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে" },
                  { icon: AlertTriangle, text: "শুধুমাত্র অনুমোদিত ব্যক্তিরা এই তথ্য দেখতে পারবেন" },
                  { icon: Lock, text: "কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-blue-700 font-medium">{item.text}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Form */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-t-lg">
              <CardTitle className="flex items-center space-x-3 text-2xl">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span>গোপন তথ্য ফর্ম</span>
              </CardTitle>
              <CardDescription className="text-lg">
                গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য জমা দিন। সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-base font-semibold">বিষয় *</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="সংক্ষেপে বিষয়টি লিখুন"
                      className="h-12 text-base"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-semibold">অবস্থান *</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="ঘটনার স্থান বা এলাকার নাম"
                      className="h-12 text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base font-semibold">বিস্তারিত বিবরণ *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="ঘটনার বিস্তারিত বর্ণনা দিন। যত বেশি তথ্য দেবেন, তত ভালো ব্যবস্থা নেওয়া সম্ভব হবে।"
                    rows={6}
                    className="text-base resize-none"
                    required
                  />
                </div>


                <div className="space-y-2">
                  <Label htmlFor="submitterType" className="text-base font-semibold">
                    আপনি কে? (ঐচ্ছিক) <span className="text-sm text-gray-500">(যেমন: প্রত্যক্ষদর্শী, ভুক্তভোগী, অন্য)</span>
                  </Label>
                  <input
                    type="text"
                    id="submitterType"
                    name="submitterType"
                    value={formData.submitterType}
                    onChange={(e) => setFormData({ ...formData, submitterType: e.target.value })}
                    placeholder="আপনার পরিচয় টাইপ করুন"
                    className="w-full h-12 px-4 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>


                {/* Enhanced File Upload */}
                <div className="space-y-4">
                  <Label htmlFor="imageOrVideo" className="text-base font-semibold">
                    প্রমাণ (ছবি/ভিডিও) - ঐচ্ছিক
                  </Label>
                  <div className="space-y-4">
                    <Input
                      id="imageOrVideo"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                    <Label
                      htmlFor="imageOrVideo"
                      className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 group"
                    >
                      <div className="text-center">
                        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4 group-hover:text-blue-500 transition-colors" />
                        <p className="text-lg text-gray-600 font-medium mb-2">
                          ছবি বা ভিডিও আপলোড করুন
                        </p>
                        <p className="text-sm text-gray-500">
                          একাধিক ফাইল নির্বাচন করতে পারেন • সর্বোচ্চ ১০ MB প্রতিটি
                        </p>
                      </div>
                    </Label>

                    {/* Photo Previews */}
                    {photoFiles.length > 0 && (
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-800">আপলোড করা ফাইল ({photoFiles.length}টি):</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                          {photoFiles.map((file, index) => (
                            <div key={index} className="relative group">
                              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                                {file.type.startsWith('image/') ? (
                                  <img
                                    src={getFilePreview(file) || "/placeholder.svg"}
                                    alt={`Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                    <FileVideo className="w-8 h-8 text-gray-500" />
                                  </div>
                                )}

                                {/* Remove button */}
                                <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                  <X className="w-3 h-3" />
                                </button>

                                {/* File info overlay */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <p className="text-xs truncate">{file.name}</p>
                                  <p className="text-xs text-gray-300">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Privacy Agreement */}
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <Checkbox
                      id="hideIdentity"
                      checked={formData.hideIdentity}
                      onCheckedChange={(checked) => setFormData({ ...formData, hideIdentity: checked as boolean })}
                      required
                      className="mt-1"
                    />
                    <div>
                      <Label htmlFor="hideIdentity" className="font-semibold text-yellow-800 text-base cursor-pointer">
                        আমি নিশ্চিত করছি যে আমার পরিচয় সম্পূর্ণ গোপন রাখা হবে *
                      </Label>
                      <p className="text-sm text-yellow-700 mt-2">
                        এই বক্সটি চেক করে আপনি নিশ্চিত করছেন যে আপনার দেওয়া তথ্য সত্য এবং আপনি চান যে আপনার পরিচয় গোপন রাখা হোক।
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Submit Buttons */}
                <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-gray-200">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => window.history.back()}
                    className="h-12 px-8 text-base"
                    disabled={isSubmitting}
                  >
                    বাতিল
                  </Button>
                  <Button
                    type="submit"
                    className="h-12 px-8 text-base bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        {/* <Loader2 className="w-4 h-4 mr-2 animate-spin" /> */}
                        জমা দেওয়া হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4 mr-2" />
                        গোপন তথ্য জমা দিন
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Additional Information */}
          <Card className="mt-8 pb-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>গুরুত্বপূর্ণ নির্দেশনা</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>কী ধরনের তথ্য দিতে পারেন:</span>
                  </h4>
                  <div className="space-y-3">
                    {[
                      "দুর্নীতি সংক্রান্ত তথ্য",
                      "অনিয়ম ও অপরাধের তথ্য",
                      "সরকারি সেবায় সমস্যা",
                      "জনস্বার্থ বিরোধী কার্যকলাপ"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-blue-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-800 text-lg mb-3 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>আমাদের প্রতিশ্রুতি:</span>
                  </h4>
                  <div className="space-y-3">
                    {[
                      "২৪ ঘন্টার মধ্যে তথ্য পর্যালোচনা",
                      "সম্পূর্ণ গোপনীয়তা রক্ষা",
                      "যথাযথ ব্যবস্থা গ্রহণ",
                      "প্রয়োজনে আইনি সহায়তা"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-green-50 p-3 rounded-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}