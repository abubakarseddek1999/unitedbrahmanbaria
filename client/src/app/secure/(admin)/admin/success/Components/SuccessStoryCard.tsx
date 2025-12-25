"use client"

import { Edit, Eye, Loader2, Trash2, Upload } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Swal from "sweetalert2"
import useAxiosPublic from "@/hooks/useAxios"
import SuccessDetails from "./SuccessDetails"

export const SuccessStoryCard = ({ story, setRefresh }: { story: any, setRefresh: any }) => {
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()
    const [modalOpen, setModalOpen] = useState(false)
    const [newStory, setNewStory] = useState({ title: "", description: "", image: null })
    const [photoFiles, setPhotoFiles] = useState<File[]>([])
    const [photoPreview, setPhotoPreview] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const [successDetailsOpen, setSuccessDetailsOpen] = useState(false)

    useEffect(() => {
        if (story) {
            setNewStory({
                title: story.title || "",
                description: story.description || "",
                image: null,
            })
            setPhotoPreview(story.images || [])
            setPhotoFiles([]) // Reset files when story changes
        }
    }, [story])

    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton:
                "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
            cancelButton:
                "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded",
        },
        buttonsStyling: false,
    })

    const handleDeleteSuccessStory = async (id: string) => {
        const result = await swalWithTailwind.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই গল্পটি মুছে ফেলা হবে এবং পরে আর ফেরত আনা যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "না, বাতিল করুন!",
            reverseButtons: true,
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosPublic.delete(`/successdata/${id}`);
                if (res.status === 200) {
                    toast({
                        title: "✅ সফলতা",
                        description: "গল্পটি সফলভাবে মুছে ফেলা হয়েছে।",
                    });
                    setRefresh(true);
                } else {
                    toast({
                        title: "❌ ত্রুটি",
                        description: "গল্পটি মুছে ফেলা যায়নি।",
                        variant: "destructive",
                    });
                }
            } catch (error) {
                toast({
                    title: "⚠️ ত্রুটি",
                    description: "সার্ভার থেকে গল্পটি মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
                    variant: "destructive",
                });
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithTailwind.fire({
                title: "বাতিল করা হয়েছে",
                text: "গল্পটি মুছে ফেলা হয়নি।",
                icon: "error",
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

    const removeImage = (index: number) => {
        const updatedPreview = [...photoPreview]
        updatedPreview.splice(index, 1)
        setPhotoPreview(updatedPreview)

        const updatedFiles = [...photoFiles]
        updatedFiles.splice(index, 1)
        setPhotoFiles(updatedFiles)
    }

    const handleUpdateStory = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const updateData = {
                title: newStory.title,
                description: newStory.description,
            };

            const finalData = new FormData();

            if (photoFiles.length > 0) {
                // নতুন ছবি থাকলে সেগুলো পাঠান
                photoFiles.forEach((file) => {
                    finalData.append("images", file);
                });
            } else if (story.images && story.images.length > 0) {
                // যদি পুরনো ছবি থাকে, এবং নতুন না পাঠানো হয়
                // তাহলে একটা ফিল্ড দিয়ে জানিয়ে দিন
                finalData.append("existingImages", JSON.stringify(story.images));
            }

            finalData.append("data", JSON.stringify(updateData));

            const res = await axiosPublic.patch(`/successdata/${story._id}`, finalData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            if (res.status === 200) {
                toast({ title: "✅ হালনাগাদ সফল", description: "গল্পটি সফলভাবে আপডেট হয়েছে।" });
                setModalOpen(false);
                setRefresh(true);
            } else {
                toast({
                    title: "❌ ত্রুটি",
                    description: "গল্পটি হালনাগাদ করা যায়নি।",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "⚠️ ত্রুটি",
                description: "আপডেট করার সময় সমস্যা হয়েছে।",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-2 md:p-4">
                    <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">
                        <div className="flex-1 flex flex-col gap-5 md:w-1/2">
                            <div>
                                <h4 className="font-semibold text-2xl line-clamp-3">{story.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-[14px] mt-1 line-clamp-4">{story.description}</p>
                                <p className="text-[12px] dark:text-gray-500">
                                    তারিখ:{" "}
                                    {new Date(story.dateSubmitted).toLocaleDateString("bn-BD", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button onClick={() => setModalOpen(true)} size="sm" variant="outline">
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button onClick={() => setSuccessDetailsOpen(true)} size="sm" variant="outline">
                                    <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleDeleteSuccessStory(story._id)}
                                >
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </Button>
                            </div>
                        </div>

                        <div className="w-full md:w-1/2">
                            {story.images && story.images.length > 0 ? (
                                <div className="grid grid-cols-1 lg:grid-cols-1 gap-3">
                                    {story.images.map((image: string, index: number) => (
                                        <div key={index} className="relative group">
                                            <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
                                                <Image
                                                    src={image}
                                                    alt="example"
                                                    width={800}
                                                    height={500}
                                                    className="object-fill w-full aspect-[4/3]"
                                                />
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

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>গল্প হালনাগাদ করুন</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdateStory} className="space-y-4">
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
                                    // multiple
                                    onChange={handlePhotoUpload}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-4">
                            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
                                বাতিল করুন
                            </Button>
                            <Button type="submit">
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <Loader2 className="animate-spin w-4 h-4" />
                                        হালনাগাদ হচ্ছে...
                                    </span>
                                ) : (
                                    "হালনাগাদ করুন"
                                )}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <SuccessDetails open={successDetailsOpen} onClose={() => setSuccessDetailsOpen(false)} story={story} />
        </>
    )
}
