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
        <div className="p-4">
            <Card className="hover:shadow-md transition-shadow flex flex-col-reverse md:flex-row  border-l-4 border-l-red-500">
                <div className="p-6 ">
                    <div className="flex gap-6">
                        {/* Left Content Section */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-3">
                                <h4 className="font-bold text-xl text-gray-900 leading-tight pr-4">{complaint.title}</h4>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-4 line-clamp-4 text-base">{complaint.description}</p>

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
                            <div className="flex items-center gap-3">
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
                                    <Button size="sm" variant="outline" className="h-9 px-3">
                                        <Eye className="w-4 h-4 mr-1" />
                                        দেখুন
                                    </Button>
                                </Link>
                                <button
                                    className="relative z-10 flex justify-center items-center bg-red-600 text-white py-1.5 px-4 rounded"
                                    onClick={() => handleDeleteComplaint(complaint._id)}
                                >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    <span>মুছুন</span>
                                </button>

                            </div>
                        </div>

                        {/* Right Image Section */}
                        <div className="flex-shrink-0 w-[50%]">
                            {complaint.images && complaint.images.length > 0 ? (
                                <div className="space-y-3">
                                    {complaint.images.slice(0, 1).map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image || "/placeholder.svg?height=120&width=240"}
                                                alt={`Complaint image ${index + 1}`}
                                                className="w-full h-[200px] object-fill rounded-lg border border-gray-200 shadow-sm group-hover:shadow-md transition-shadow duration-200"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 rounded-lg transition-all duration-200"></div>
                                        </div>
                                    ))}
                                    {complaint.images.length > 1 && (
                                        <div className="text-center">
                                            <Badge variant="secondary" className="text-xs">
                                                +{complaint.images.length - 1} আরও ছবি
                                            </Badge>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-full h-28 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                                    <div className="text-center text-gray-500">
                                        <div className="text-2xl mb-1">📷</div>
                                        <p className="text-xs">কোন ছবি নেই</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
