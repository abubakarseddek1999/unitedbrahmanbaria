"use client"
import { useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useToast } from "../ui/use-toast"
import useGalleryData from "@/hooks/useGalleryData"
import AddPhoto from "./AddPhoto"
import useAxiosPublic from "@/hooks/useAxios"
import Swal from "sweetalert2"
import EditPhoto from "./EditPhoto"

const Gallery = () => {
    const { data: galleryItems, isLoading, error, refetch } = useGalleryData()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()

    type GalleryItem = {
        _id: string
        photo?: string
        title: string
        dateSubmitted: string
    }

    const handleAddGalleryItem = async (formData: FormData) => {
        try {
            const res = await fetch("/your-api-endpoint/gallery", {
                method: "POST",
                body: formData,
            })
            if (!res.ok) throw new Error("Upload failed")
            toast({ title: "সফল", description: "নতুন মিডিয়া যোগ করা হয়েছে।" })
            refetch()
        } catch (err) {
            toast({ title: "ত্রুটি", description: "মিডিয়া আপলোডে সমস্যা হয়েছে।" })
        }
    }

    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton: "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
            cancelButton: "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        },
        buttonsStyling: false
    })

    const handleDeleteComplaint = (id: string) => {
        swalWithTailwind.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই মিডিয়াটি মুছে ফেলা হবে এবং পরে আর ফেরত আনা যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "না, বাতিল করুন!",
            reverseButtons: true
        }).then(async (result) => {
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
                    icon: "error"
                })
            }
        })
    }
  

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between my-5">
                        <div>
                            <p className="text-xl md:text-2xl font-semibold leading-none tracking-tight">গ্যালারি ব্যবস্থাপনা</p>
                            <CardDescription>ছবি ও ভিডিও আপলোড ও ব্যবস্থাপনা করুন</CardDescription>
                        </div>
                        <Button
                            onClick={() => setIsGalleryModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            নতুন মিডিয়া যোগ করুন
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {galleryItems && galleryItems.slice().reverse().map((item) => (
                            <Card key={item._id}>
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
                                        আপলোড: {new Date(item.dateSubmitted).toLocaleDateString("bn-BD", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                        })}
                                    </p>
                                    <div className="flex justify-end space-x-2 mt-3">
                                        <Button size="sm" variant="outline" onClick={() => {
                                            setSelectedItem(item)
                                            setIsEditModalOpen(true)
                                        }}>
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDeleteComplaint(item._id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Add New Media Modal */}
            <AddPhoto
                open={isGalleryModalOpen}
                onClose={() => setIsGalleryModalOpen(false)}
                refetch={refetch}
            />

            {/* Optional: Edit Modal (Not implemented in this code yet) */}
            {/* You may add EditPhoto component and conditionally render it here */}
            <EditPhoto
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={selectedItem}
                refetch={refetch}
            />

        </div>
    )
}

export default Gallery
