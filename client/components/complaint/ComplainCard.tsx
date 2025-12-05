"use client"

import { Eye, Trash2, Calendar, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Swal from "sweetalert2";
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import Link from "next/link"
import useAxiosPublic from "@/hooks/useAxios"
import { useToast } from "@/hooks/use-toast"
import PhotoCollageMini from "../secretData/PhotoCollegeMini"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface Complaint {
    _id: string
    title: string
    description: string
    name: string
    dateSubmitted: string
    status: string
    images?: string[]
}

export default function ComplainCard({ complaint, refetch }: { complaint: Complaint; refetch: () => void }) {
    // const { data: complaints, isLoading, isError, refetch } = useComplaints()
    const axiosPublic = useAxiosPublic();
    const { toast } = useToast()
    const handleStatusChange = async (newStatus: string) => {
        try {
            const res = await axiosPublic.put(`/complaint/${complaint._id}`, { status: newStatus });

            if (res.status === 200) {
                toast({
                    title: "স্ট্যাটাস পরিবর্তন হয়েছে",
                    description: "অভিযোগের স্ট্যাটাস সফলভাবে পরিবর্তন হয়েছে।",
                });
                refetch(); // ডেটা আবার লোড করার জন্য (যদি প্রয়োজন হয়)
            } else {
                toast({
                    title: "ত্রুটি",
                    description: "স্ট্যাটাস পরিবর্তন করা যায়নি।",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast({
                title: "ত্রুটি",
                description: "স্ট্যাটাস আপডেট করার সময় একটি সমস্যা হয়েছে।",
                variant: "destructive",
            });
        }
    };

    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [currentImages, setCurrentImages] = useState<string[]>([])
    const [currentSubject, setCurrentSubject] = useState("")
    const handleViewAllImages = (images: string[], subject: string) => {
        setCurrentImages(images)
        setCurrentSubject(subject)
        setIsImageModalOpen(true)
    }

    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton: "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
            cancelButton: "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
        },
        buttonsStyling: false
    });
    const handleDeleteComplaint = (id: string) => {
        swalWithTailwind.fire({
            title: "আপনি কি নিশ্চিত?",
            text: "এই অভিযোগটি মুছে ফেলা হবে এবং পরে আর ফেরত আনা যাবে না!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
            cancelButtonText: "না, বাতিল করুন!",
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosPublic.delete(`/complaint/${id}`);
                    console.log(res.data);

                    if (res.status === 200) {
                        toast({
                            title: "✅ সফলতা",
                            description: "অভিযোগটি সফলভাবে মুছে ফেলা হয়েছে।",
                            variant: "default",
                        });
                        refetch();
                    } else {
                        toast({
                            title: "❌ ত্রুটি",
                            description: "অভিযোগটি মুছে ফেলা যায়নি।",
                            variant: "destructive",
                        });
                    }
                } catch (error) {
                    console.error("Delete error:", error);
                    toast({
                        title: "⚠️ ত্রুটি",
                        description: "সার্ভার থেকে অভিযোগ মুছে ফেলার সময় একটি সমস্যা হয়েছে।",
                        variant: "destructive",
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithTailwind.fire({
                    title: "বাতিল করা হয়েছে",
                    text: "অভিযোগটি মুছে ফেলা হয়নি।",
                    icon: "error"
                });
            }
        });
    };

    return (
        <div className=" p-2 md:p-4">
            <Card className="hover:shadow-md transition-shadow flex flex-col-reverse md:flex-row gap-2  border-l-4 border-l-red-500 p-2 md:p-5">
                {/* Left Content Section */}
                <div className="w-full md:w-1/2">
                    <div className="flex items-start justify-between my-3">
                        <h4 className="font-bold text-base md:text-xl text-gray-900 leading-tight pr-4">{complaint.title}</h4>
                    </div>

                    <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4 text-xs md:text-base">{complaint.description}</p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>
                                জমাদাতা: <span className="font-medium text-gray-800">{complaint.name}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                                তারিখ:{" "}
                                <span className="font-medium text-gray-800">
                                    {new Date(complaint.dateSubmitted).toLocaleDateString("bn-BD", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </span>
                            </span>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <Select value={complaint.status} onValueChange={handleStatusChange}>
                            <SelectTrigger className="w-44 h-9">
                                <SelectValue placeholder="স্ট্যাটাস পরিবর্তন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="নতুন">নতুন</SelectItem>
                                <SelectItem value="পর্যালোচনাধীন">পর্যালোচনাধীন</SelectItem>
                                <SelectItem value="সমাধানাধীন">সমাধানাধীন</SelectItem>
                                <SelectItem value="সমাধান হয়েছে">সমাধান হয়েছে</SelectItem>
                                <SelectItem value="বাতিল">বাতিল</SelectItem>
                            </SelectContent>
                        </Select>

                        <Link href={`/complaint-details/${complaint._id}`}>
                            <Button size="sm" variant="outline" className="h-9 px-2 md:px-3">
                                <Eye className="w-4 h-4 mr-1" />
                                দেখুন
                            </Button>
                        </Link>
                        <button
                            className="relative z-10 flex justify-center items-center bg-red-600 text-white py-1.5 px-2 md:px-3 rounded"
                            onClick={() => handleDeleteComplaint(complaint._id)}
                        >
                            <Trash2 className="w-4 h-4 mr-1" />
                            <span>মুছুন</span>
                        </button>

                    </div>
                </div>

                {/* Right Image Section */}
                <div className="w-full md:w-1/2 ">
                    <PhotoCollageMini
                        images={complaint.images || []}
                        maxDisplay={3}
                        onViewAll={(images) => handleViewAllImages(images, complaint.title || "Secrete Subject")}
                    />
                </div>


            </Card>
            {/* Image Viewer Modal */}
            <Dialog open={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
                <DialogContent className="max-w-[90vw] lg:max-w-[800px] h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <span>{currentSubject} - সকল ছবি</span>

                        </DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {currentImages.map((img, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md"
                                />
                                <p className="text-center mt-2 text-gray-500 text-sm">
                                    Image {index + 1}/{currentImages.length}
                                </p>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
