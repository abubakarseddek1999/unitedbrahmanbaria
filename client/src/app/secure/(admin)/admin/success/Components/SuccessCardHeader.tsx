"use client"
import type React from "react"
import { Button } from "@/components/ui/button"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Plus, Upload } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import useAxiosPublic from "@/hooks/useAxios"
import { useToast } from "@/hooks/use-toast"
import usePaginatedData from "@/hooks/usePaginatedData"


const SuccessCardHeader = ( {setRefresh}:{setRefresh:any}) => {
   
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const axiosPublic = useAxiosPublic()
    const [isLoading, setIsLoading] = useState(false)
    const [photoPreview, setPhotoPreview] = useState<string[]>([])
    const [photoFiles, setPhotoFiles] = useState<File[]>([])
    const [newStory, setNewStory] = useState<{ title: string; description: string; image?: File }>({
        title: "",
        description: "",
        image: undefined as File | undefined,
    })
    const { toast } = useToast()



    const handleAddSuccessStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true)

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
            setRefresh(true) // Refresh করার জন্য
            setPhotoPreview([]);
            setPhotoFiles([]);
            setNewStory({
                title: "",
                description: "",
            });
            setIsLoading(false)
            setIsDialogOpen(false) // Dialog বন্ধ করো
        } catch (error) {
            console.error("Error submitting complaint:", error);
            toast({
                title: "ত্রুটি!",
                description: "গল্প যোগ করার সময় একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
                variant: "destructive", // যদি তোমার toast লাইব্রেরি এই ধরনের ভ্যারিয়েন্ট সাপোর্ট করে
            });
        }
       

    };


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



    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="my-4">
                    <p className="my-2 text-xl font-bold">সফলতার গল্প ব্যবস্থাপনা</p>
                    <CardDescription className="hidden md:flex">সফল সমাধানের গল্প যোগ ও সম্পাদনা করুন</CardDescription>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-green-600 hover:bg-green-700">
                            <Plus className="w-4 h-4 " />
                             গল্প যোগ করুন
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

                                <Button type="submit" disabled={isLoading}>
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">
                                            <Loader2 className="animate-spin w-4 h-4" />
                                            লোড হচ্ছে...
                                        </span>
                                    ) : (
                                        "যোগ করুন"
                                    )}
                                </Button>

                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default SuccessCardHeader