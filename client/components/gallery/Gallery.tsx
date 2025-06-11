"use client"
import { useEffect, useState } from "react"
import { Edit, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { useToast } from "../ui/use-toast"
import useGalleryData from "@/hooks/useGalleryData"
import AddPhoto from "./AddPhoto"
import useAxiosPublic from "@/hooks/useAxios"
import Swal from "sweetalert2"
import EditPhoto from "./EditPhoto"
import { useInView } from 'react-intersection-observer'

type galleryItems = {
    _id: string
    photo?: string
    title: string
    dateSubmitted: string
}

const Gallery = () => {
    const { data: galleryItems, isLoading, error, refetch } = useGalleryData()
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState<galleryItems | null>(null)
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()

    const [allItems, setAllItems] = useState<galleryItems[]>(galleryItems || []);

    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState(0)

    const itemsPerPage = 8
    const [ref, inView] = useInView()

    const fetchGalleryImages = async () => {
        if (loading) return;

        setLoading(true);
        const nextPage = pages + 1;
        console.log(nextPage)
        try {
            const response = await axiosPublic.get(`/gallerydata?page=${nextPage}&limit=${itemsPerPage}`)
            const newItems = response.data || []
            console.log(newItems)
            if (newItems?.data?.length) {
                setAllItems((prev) => [...prev, ...newItems.data]);
                setPages(nextPage);
            }
        } catch (error) {
            console.error("Error fetching gallery images:", error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     fetchGalleryImages(); // Initial load
    // }, []);

    // useEffect(() => {
    //     if (inView && !loading) {
    //         fetchGalleryImages();
    //     }
    // }, [inView]);

    useEffect(() => {
        if (inView) {
            fetchGalleryImages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

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
                            variant: "default"
                        })
                        refetch()
                        setAllItems((prev) => prev.filter((item) => item._id !== id))
                    } else {
                        toast({
                            title: "❌ ত্রুটি",
                            description: "মিডিয়াটি মুছে ফেলা যায়নি।",
                            variant: "destructive"
                        })
                    }
                } catch (error) {
                    toast({
                        title: "⚠️ ত্রুটি",
                        description: "সার্ভার থেকে মিডিয়া মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
                        variant: "destructive"
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
                            <p className="text-xl md:text-2xl font-semibold leading-none tracking-tight">
                                গ্যালারি ব্যবস্থাপনা
                            </p>
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
                        {allItems?.map((item, index) => {
                            const isLast = index === allItems.length - 1
                            return (
                                <Card key={index} ref={isLast ? ref : undefined}>
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
                                                    year: "numeric"
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
                </CardContent>
            </Card>

            {/* Modals */}
            <AddPhoto open={isGalleryModalOpen} onClose={() => setIsGalleryModalOpen(false)} refetch={refetch} />
            <EditPhoto open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} item={selectedItem} refetch={refetch} />
        </div>
    )
}

export default Gallery
