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

type SecretDataProps = {}

interface SecretData {
    _id: string
    subject: string
    description: string
    location: string
    submitterType: string
    dateSubmitted: string
    status: string
    images?: string[]
}

const SecretData: React.FC<SecretDataProps> = () => {
    const { data: secretData, refetch } = useSecretData()
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

    const handleStatusChange = async (newStatus: string,id: string) => {
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
                <CardHeader>
                    <CardTitle>গোপন তথ্য পর্যালোচনা</CardTitle>
                    <CardDescription>সংবেদনশীল তথ্য পর্যালোচনা করুন</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {secretData &&
                            secretData
                                .slice()
                                .reverse()
                                .map((info) => (
                                    <Card key={info._id} className="border-l-4 border-l-red-500">
                                        <CardContent className="p-4 flex flex-col-reverse md:flex-row gap-6">
                                            <div className="flex-1 min-w-0 flex-col gap-5 items-start justify-between">
                                                <div className="flex-1 mb-2">
                                                    <h4 className="font-semibold text-lg">{info.subject}</h4>
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
                                                </div>
                                                <div className="flex items-center  flex-wrap gap-2">
                                                    <Badge variant="destructive">গোপনীয়</Badge>
                                                    {info.images && info.images.length > 0 && (
                                                        <Badge variant="secondary" className="text-xs">
                                                            <ImageIcon className="w-3 h-3 mr-1" />
                                                            {info.images.length} ছবি
                                                        </Badge>
                                                    )}
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
                                ))}
                    </div>
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