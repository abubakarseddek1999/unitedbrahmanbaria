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
import { ArrowLeft, Shield, Upload, AlertTriangle, Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { addSpotInfo, initializeData } from "@/lib/storage"

export default function SpotInfoPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

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
      imageOrVideo: formData.imageOrVideo ? URL.createObjectURL(formData.imageOrVideo) : undefined,
      submitterType: formData.submitterType || "অজ্ঞাত",
      hideIdentity: formData.hideIdentity,
    })

    toast({
      title: "সফল!",
      description: "আপনার গোপন তথ্য সফলভাবে জমা দেওয়া হয়েছে। এটি সম্পূর্ণ গোপনীয় রাখা হবে।",
    })

    setFormData({
      subject: "",
      description: "",
      location: "",
      imageOrVideo: null,
      submitterType: "",
      hideIdentity: true,
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, imageOrVideo: e.target.files[0] })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                ফিরে যান
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">গোপন তথ্য</h1>
              <p className="text-gray-600">সংবেদনশীল তথ্য নিরাপদে জমা দিন</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Security Notice */}
          <Card className="mb-8 border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-blue-600" />
                <CardTitle className="text-blue-800">নিরাপত্তা নিশ্চয়তা</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                <div className="flex items-start space-x-2">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>আপনার সকল তথ্য এনক্রিপ্ট করে সংরক্ষণ করা হয়</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Shield className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে</p>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>শুধুমাত্র অনুমোদিত ব্যক্তিরা এই তথ্য দেখতে পারবেন</p>
                </div>
                <div className="flex items-start space-x-2">
                  <Lock className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <p>কোনো তথ্য তৃতীয় পক্ষের সাথে শেয়ার করা হয় না</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>গোপন তথ্য ফর্ম</span>
              </CardTitle>
              <CardDescription>গুরুত্বপূর্ণ ও সংবেদনশীল তথ্য জমা দিন। সকল তথ্য সম্পূর্ণ গোপনীয় রাখা হবে।</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="subject">বিষয় *</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="সংক্ষেপে বিষয়টি লিখুন"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">বিস্তারিত বিবরণ *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="ঘটনার বিস্তারিত বর্ণনা দিন। যত বেশি তথ্য দেবেন, তত ভালো ব্যবস্থা নেওয়া সম্ভব হবে।"
                    rows={6}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="location">অবস্থান *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="ঘটনার স্থান বা এলাকার নাম"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="submitterType">আপনি কে? (ঐচ্ছিক)</Label>
                  <Select
                    value={formData.submitterType}
                    onValueChange={(value) => setFormData({ ...formData, submitterType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="প্রত্যক্ষদর্শী">প্রত্যক্ষদর্শী</SelectItem>
                      <SelectItem value="ভুক্তভোগী">ভুক্তভোগী</SelectItem>
                      <SelectItem value="অন্য">অন্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="imageOrVideo">প্রমাণ (ছবি/ভিডিও) - ঐচ্ছিক</Label>
                  <div className="mt-2">
                    <Input
                      id="imageOrVideo"
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Label
                      htmlFor="imageOrVideo"
                      className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400"
                    >
                      <div className="text-center">
                        <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                        <p className="text-sm text-gray-600">
                          {formData.imageOrVideo ? formData.imageOrVideo.name : "ছবি বা ভিডিও আপলোড করুন (ঐচ্ছিক)"}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">সর্বোচ্চ ১০ MB</p>
                      </div>
                    </Label>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Checkbox
                      id="hideIdentity"
                      checked={formData.hideIdentity}
                      onCheckedChange={(checked) => setFormData({ ...formData, hideIdentity: checked as boolean })}
                      required
                    />
                    <Label htmlFor="hideIdentity" className="font-medium text-yellow-800">
                      আমি নিশ্চিত করছি যে আমার পরিচয় সম্পূর্ণ গোপন রাখা হবে *
                    </Label>
                  </div>
                  <p className="text-sm text-yellow-700">
                    এই বক্সটি চেক করে আপনি নিশ্চিত করছেন যে আপনার দেওয়া তথ্য সত্য এবং আপনি চান যে আপনার পরিচয় গোপন রাখা হোক।
                  </p>
                </div>

                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={() => window.history.back()}>
                    বাতিল
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <Shield className="w-4 h-4 mr-2" />
                    গোপন তথ্য জমা দিন
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mt-8 border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg">গুরুত্বপূর্ণ নির্দেশনা</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">কী ধরনের তথ্য দিতে পারেন:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>দুর্নীতি সংক্রান্ত তথ্য</li>
                    <li>অনিয়ম ও অপরাধের তথ্য</li>
                    <li>সরকারি সেবায় সমস্যা</li>
                    <li>জনস্বার্থ বিরোধী কার্যকলাপ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">আমাদের প্রতিশ্রুতি:</h4>
                  <ul className="space-y-1 list-disc list-inside">
                    <li>২৪ ঘন্টার মধ্যে তথ্য পর্যালোচনা</li>
                    <li>সম্পূর্ণ গোপনীয়তা রক্ষা</li>
                    <li>যথাযথ ব্যবস্থা গ্রহণ</li>
                    <li>প্রয়োজনে আইনি সহায়তা</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
