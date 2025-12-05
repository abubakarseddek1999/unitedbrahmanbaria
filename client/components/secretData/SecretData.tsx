"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Eye, ImageIcon, X } from "lucide-react"
import useSecretData from "@/hooks/useSecretData"
import useAxiosPublic from "@/hooks/useAxios"
import { useToast } from "@/hooks/use-toast"
import Swal from "sweetalert2"
import PhotoCollageMini from "./PhotoCollegeMini"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import usePaginatedData from "@/hooks/usePaginatedData"

type SecretDataProps = {}

type SecretDataItem = {
    _id: string;
    photo: string;
    title: string;
    description: string;
    dateSubmitted: string;
    location: string;
    submitterType: string;
    status: string;
    images?: string[];
    subject: string;
};

const SecretData: React.FC<SecretDataProps> = () => {
    // const { data: secretData, refetch } = useSecretData()
    const { data: secretData, loading, hasMore, ref, refetch } = usePaginatedData<SecretDataItem>({
        endpoint: "/secretdata",
        limit: 8,
    });
    const axiosPublic = useAxiosPublic()
    const { toast } = useToast()
    const [isImageModalOpen, setIsImageModalOpen] = useState(false)
    const [currentImages, setCurrentImages] = useState<string[]>([])
    const [currentSubject, setCurrentSubject] = useState("")

    const handleDeleteSecretData = (id: string, refetch: () => void) => {
        const swalWithTailwind = Swal.mixin({
            customClass: {
                confirmButton: "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
                cancelButton: "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded",
            },
            buttonsStyling: false,
        })

        swalWithTailwind
            .fire({
                title: "আপনি কি নিশ্চিত?",
                text: "এই তথ্যটি মুছে ফেলা হবে এবং পরে আর ফেরত আনা যাবে না!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
                cancelButtonText: "না, বাতিল করুন!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await axiosPublic.delete(`/secretdata/${id}`)
                        if (res.status === 200) {
                            toast({
                                title: "✅ সফলতা",
                                description: "তথ্যটি সফলভাবে মুছে ফেলা হয়েছে।",
                                variant: "default",
                            })
                            refetch()
                        } else {
                            toast({
                                title: "❌ ত্রুটি",
                                description: "তথ্য মুছে ফেলা যায়নি।",
                                variant: "destructive",
                            })
                        }
                    } catch (error) {
                        console.error("Delete error:", error)
                        toast({
                            title: "⚠️ ত্রুটি",
                            description: "সার্ভার থেকে তথ্য মুছে ফেলার সময় সমস্যা হয়েছে।",
                            variant: "destructive",
                        })
                    }
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    swalWithTailwind.fire({
                        title: "বাতিল করা হয়েছে",
                        text: "তথ্যটি মুছে ফেলা হয়নি।",
                        icon: "error",
                    })
                }
            })
    }

    const handleViewAllImages = (images: string[], subject: string) => {
        setCurrentImages(images)
        setCurrentSubject(subject)
        setIsImageModalOpen(true)
    }

    const handleStatusChange = async (newStatus: string, id: string) => {
        try {
            const res = await axiosPublic.put(`/secretdata/${id}`, { status: newStatus });

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

    return (
        <div>
            <Card className="pb-6">
                <CardHeader className="mb-5">
                    <CardTitle>গোপন তথ্য পর্যালোচনা</CardTitle>
                    <p className=" text-sm text-gray-700">সংবেদনশীল তথ্য পর্যালোচনা করুন</p>
                </CardHeader>
                <CardContent className="px-2 md:px-6">
                    <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {secretData &&
                            secretData
                                .slice()
                                .map((info) => {
                                    const isLast = info._id === secretData[secretData.length - 1]._id
                                    return (
                                        <div key={info._id} ref={isLast ? ref : undefined} >
                                            <Card className="border-l-4 border-l-red-500">
                                                <CardContent className="p-2 md:p-4 flex flex-col-reverse md:flex-row gap-6">
                                                    <div className="flex-1 min-w-0 flex-col gap-5 items-start justify-between">
                                                        <div className="flex-1 mb-2">
                                                            <h4 className="font-semibold text-lg">{info.title}</h4>
                                                            <p className="text-gray-600 mt-1 line-clamp-4">{info.description}</p>
                                                            <div className="mt-2 text-sm text-gray-500">
                                                                <p>অবস্থান: {info.location}</p>
                                                                <p>ধরন: {info.submitterType}</p>
                                                                <p className="text-sm text-gray-500">
                                                                    জমা দেওয়ার তারিখ:{" "}
                                                                    {new Date(info.dateSubmitted).toLocaleDateString("bn-BD", {
                                                                        year: "numeric",
                                                                        month: "long",
                                                                        day: "numeric",
                                                                    })}
                                                                </p>
                                                            </div>
                                                            <Badge variant="destructive">গোপনীয়</Badge>
                                                            {info.images && info.images.length > 0 && (
                                                                <Badge variant="secondary" className="text-xs">
                                                                    <ImageIcon className="w-3 h-3 mr-1" />
                                                                    {info.images.length} ছবি
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center  flex-wrap gap-2">
                                                         
                                                            <Select onValueChange={(value => handleStatusChange(value, info._id))} defaultValue={info.status} >
                                                                <SelectTrigger className="w-40">
                                                                    <SelectValue placeholder={info.status} />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    <SelectItem value="নতুন">নতুন</SelectItem>
                                                                    <SelectItem value="পর্যালোচনাধীন">পর্যালোচনাধীন</SelectItem>
                                                                    <SelectItem value="তদন্তাধীন">তদন্তাধীন</SelectItem>
                                                                    <SelectItem value="সমাধান হয়েছে">সমাধান হয়েছে</SelectItem>
                                                                    <SelectItem value="বাতিল">বাতিল</SelectItem>
                                                                </SelectContent>
                                                            </Select>
                                                            <Link href={`/secretdata-details/${info._id}`}>
                                                                <Button
                                                                    size="sm"
                                                                    variant="outline"
                                                                    disabled={!info.images || info.images.length === 0}
                                                                >
                                                                    <Eye className="w-4 h-4" />
                                                                </Button>
                                                            </Link>
                                                            <Button
                                                                size="sm"
                                                                variant="destructive"
                                                                onClick={() => handleDeleteSecretData(info._id, refetch)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="flex-shrink-0 md:w-[50%]">
                                                        <PhotoCollageMini
                                                            images={info.images || []}
                                                            maxDisplay={3}
                                                            onViewAll={(images) => handleViewAllImages(images, info.subject || "Secrete Subject")}
                                                        />
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    )
                                }
                                )}
                    </div>
                    {/* skeleton */}
                    {loading && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <Card className="border-l-4 border-l-green-500 animate-pulse">
                                    <CardContent className="p-4">
                                        <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">

                                            {/* Text Content Skeleton */}
                                            <div className="flex-1 flex flex-col gap-5 md:w-1/2">
                                                <div>
                                                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" /> {/* Title */}
                                                    <div className="h-4 bg-gray-200 rounded w-full mb-1" /> {/* Description */}
                                                    <div className="h-4 bg-gray-200 rounded w-5/6 mb-1" />
                                                    <div className="h-4 bg-gray-200 rounded w-4/6 mb-4" />
                                                    <div className="h-3 bg-gray-300 rounded w-1/3" /> {/* Date */}
                                                </div>

                                                <div className="flex items-center space-x-2">
                                                    <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Edit button */}
                                                    <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Delete button */}
                                                    <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Delete button */}
                                                </div>
                                            </div>

                                            {/* Image Content Skeleton */}
                                            <div className="w-full md:w-1/2">
                                                <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                            ))}
                        </div>
                    )}

                </CardContent>
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

export default SecretData