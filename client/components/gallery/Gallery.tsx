"use client"
import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { useToast } from "../ui/use-toast"
import AddPhoto from "./AddPhoto"
import EditPhoto from "./EditPhoto"
import Swal from "sweetalert2"
import useAxiosPublic from "@/hooks/useAxios"
import usePaginatedData from "@/hooks/usePaginatedData"

type galleryItems = {
    _id: string
    photo?: string
    title: string
    dateSubmitted: string
}

const Gallery = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<galleryItems | null>(null)
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()
    const { data: allItems, loading, hasMore, ref, refetch } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
        endpoint: "/gallerydata",
        limit: 8,
    });
    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton:
                "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
            cancelButton:
                "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded",
        },
        buttonsStyling: false,
    })

    const handleDeleteComplaint = (id: string) => {
        swalWithTailwind
            .fire({
                title: "আপনি কি নিশ্চিত?",
                text: "এই মিডিয়াটি মুছে ফেলা হবে এবং পরে আর ফেরত আনা যাবে না!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
                cancelButtonText: "না, বাতিল করুন!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await axiosPublic.delete(`/gallerydata/${id}`)
                        if (res.status === 200) {
                            toast({
                                title: "✅ সফলতা",
                                description: "মিডিয়াটি সফলভাবে মুছে ফেলা হয়েছে।",
                                variant: "default",
                            })
                            refetch()
                        } else {
                            toast({
                                title: "❌ ত্রুটি",
                                description: "মিডিয়াটি মুছে ফেলা যায়নি।",
                                variant: "destructive",
                            })
                        }
                    } catch (error) {
                        toast({
                            title: "⚠️ ত্রুটি",
                            description: "সার্ভার থেকে মিডিয়া মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
                            variant: "destructive",
                        })
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithTailwind.fire({
                        title: "বাতিল করা হয়েছে",
                        text: "মিডিয়াটি মুছে ফেলা হয়নি।",
                        icon: "error",
                    })
                }
            })
    }

    return (
        <div>
            <Card>
                <CardHeader className="px-2 md:px-6">
                    <div className="flex items-center justify-between my-5">
                        <div>
                            <p className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
                                গ্যালারি ব্যবস্থাপনা
                            </p>
                            <CardDescription className="hidden md:flex">ছবি ও ভিডিও আপলোড ও ব্যবস্থাপনা করুন</CardDescription>
                        </div>
                        <Button
                            onClick={() => setIsGalleryModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <Plus className="w-4 h-4" />
                            যোগ করুন
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="px-2 md:px-6 pb-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {allItems?.map((item, index) => {
                            const isLast = index === allItems.length - 1
                            return (
                                <Card key={item._id} ref={isLast ? ref : undefined}>
                                    <CardContent className="p-4">
                                        <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.photo || "/placeholder.svg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <h4 className="font-medium">{item.title}</h4>
                                        <p className="text-sm text-gray-500">
                                            আপলোড:{" "}
                                            {typeof window !== "undefined"
                                                ? new Date(item.dateSubmitted).toLocaleDateString("bn-BD", {
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })
                                                : ""}
                                        </p>
                                        <div className="flex justify-end space-x-2 mt-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => {
                                                    setSelectedItem(item)
                                                    setIsEditModalOpen(true)
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDeleteComplaint(item._id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            )
                        })}
                    </div>
                    {loading && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <CardContent key={i} className="p-4 animate-pulse">
                                    <div className="aspect-[4/3] bg-gray-300 rounded-lg mb-3" />

                                    <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />

                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-4" />

                                    <div className="flex justify-end space-x-2 mt-3">
                                        <div className="w-8 h-8 bg-gray-300 rounded-md" />
                                        <div className="w-8 h-8 bg-gray-300 rounded-md" />
                                    </div>
                                </CardContent>
                            ))}
                        </div>
                    )}

                </CardContent>
            </Card>

            {/* Modals */}
            <AddPhoto
                open={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
                refetch={refetch}
            />
            <EditPhoto
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={selectedItem}
                refetch={refetch}
            />
        </div >
    )
}

export default Gallery
