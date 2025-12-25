"use client"

import { Dialog, DialogContent } from "../ui/dialog"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import useAxiosPublic from "@/hooks/useAxios"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

type EditPhotoProps = {
    open: boolean
    onClose: () => void
    item: {
        _id: string
        title: string
        photo?: string
    } | null
    refetch: () => void
}

const EditPhoto = ({ open, onClose, item, refetch }: EditPhotoProps) => {
    const [title, setTitle] = useState("")
    const [photoFiles, setPhotoFiles] = useState<File[]>([])
    const [photoPreview, setPhotoPreview] = useState<string[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const axiosPublic = useAxiosPublic()
    const { toast } = useToast()

    useEffect(() => {
        if (item) {
            setTitle(item.title || "")
            setPhotoFiles([])
            setPhotoPreview(item.photo ? [item.photo] : [])
        }
    }, [item])

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            const fileArray = Array.from(files)
            setPhotoFiles(fileArray)

            // Preview for each photo
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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!item) return
        setIsLoading(true) // লোডিং শুরু
        const updateData = {
            title: title,
        }
        const formData = new FormData()

        if (photoFiles.length > 0) {
            // নতুন ছবি থাকলে শুধু সেগুলো পাঠাবেন
            photoFiles.forEach((file) => {
                formData.append("photo", file);
            });
        }
        formData.append("data", JSON.stringify(updateData))
        try {
            const res = await axiosPublic.put(`/gallerydata/${item._id}`, formData)
            if (res.status === 200) {
                toast({
                    title: "✅ সফলতা",
                    description: "ছবি সফলভাবে আপডেট হয়েছে।",
                })
                refetch()
                onClose()
            } else {
                throw new Error("Update failed")
            }
        } catch (error) {
            console.error(error)
            toast({
                title: "❌ ত্রুটি",
                description: "ছবি আপডেট করতে সমস্যা হয়েছে।",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false) // লোডিং বন্ধ
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="শিরোনাম"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    {/* Multiple image previews */}
                    <div className="flex gap-2 flex-wrap">
                        {photoPreview.length > 0 && (
                            <div className="mt-4">
                                <p className="text-sm text-gray-600 mb-2">প্রিভিউ ({photoPreview.length}টি ছবি):</p>
                                <div className=" mb-3">
                                    {photoPreview.map((preview, index) => (
                                        <div key={index} className="relative group">
                                            <div className="relative aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
                                                <Image
                                                    src={preview || "/placeholder.svg"}
                                                    alt={`Photo preview ${index + 1}`}
                                                    fill
                                                    className="object-cover w-full h-full"
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
                    </div>

                    <Input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700"
                        disabled={isLoading}
                    >
                        {isLoading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </Button>

                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditPhoto
