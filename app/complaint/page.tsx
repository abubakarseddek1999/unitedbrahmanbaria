"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
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

export default function ComplaintPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    name: "",
    hideName: true,
    image: null as File | null,
  })
  const { toast } = useToast()

  useEffect(() => {
    initializeData()
    setComplaints(getComplaints())
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      toast({
        title: "ত্রুটি",
        description: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য পূরণ করুন।",
        variant: "destructive",
      })
      return
    }

    // Add complaint to localStorage
    addComplaint({
      title: formData.title,
      description: formData.description,
      name: formData.hideName ? "গোপনীয়" : formData.name || "অজ্ঞাত",
      hideName: formData.hideName,
      image: formData.image ? URL.createObjectURL(formData.image) : undefined,
    })

    // Refresh complaints list
    setComplaints(getComplaints())

    toast({
      title: "সফল!",
      description: "আপনার অভিযোগ সফলভাবে জমা দেওয়া হয়েছে।",
    })

    setIsDialogOpen(false)
    setFormData({
      title: "",
      description: "",
      name: "",
      hideName: true,
      image: null,
    })
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] })
    }
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ফিরে যান
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">অভিযোগ পাতা</h1>
                <p className="text-gray-600">আপনার সমস্যার কথা বলুন</p>
              </div>
            </div>

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
                    <Label htmlFor="image">প্রমাণ (ছবি/ভিডিও)</Label>
                    <div className="mt-2">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleImageChange}
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
            <Badge variant="secondary">{complaints.length}টি অভিযোগ</Badge>
          </div>

          <div className="grid gap-6">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{complaint.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {complaint.name}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {complaint.dateSubmitted}
                        </div>
                      </div>
                      <Badge className={getStatusColor(complaint.status)}>{complaint.status}</Badge>
                    </div>
                    {complaint.image && (
                      <div className="ml-4">
                        <Image
                          src={complaint.image || "/placeholder.svg"}
                          alt="অভিযোগের ছবি"
                          width={120}
                          height={80}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-700">{complaint.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
