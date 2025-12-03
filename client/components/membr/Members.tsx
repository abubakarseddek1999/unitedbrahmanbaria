"use client"

import { useState } from "react"
import { Edit, Eye, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card"
import { useToast } from "../ui/use-toast"
import Swal from "sweetalert2"
import useAxiosPublic from "@/hooks/useAxios"
import usePaginatedData from "@/hooks/usePaginatedData"

import AddMember from "./AddMember"
import EditMember from "./EditMember"
import MemberDetails from "./MemberDetails"   // <-- NEW

export type MemberItem = {
    _id: string
    photo?: string
    name: string
    designation: string
    phone?: string
    gender?: string
}

const Members = () => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

    const [selectedItem, setSelectedItem] = useState<MemberItem | null>(null)

    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()

    const { data: allItems, loading, ref, refetch } =
        usePaginatedData<MemberItem>({
            endpoint: "/member",
            limit: 8,
        })

    const swalWithTailwind = Swal.mixin({
        customClass: {
            confirmButton:
                "bg-green-600 ml-2 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded mr-2",
            cancelButton:
                "bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded",
        },
        buttonsStyling: false,
    })

    const handleDelete = (id: string) => {
        swalWithTailwind
            .fire({
                title: "আপনি কি নিশ্চিত?",
                text: "এই সদস্যকে মুছে ফেলা হবে!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "হ্যাঁ, মুছে ফেলুন!",
                cancelButtonText: "না, বাতিল করুন!",
                reverseButtons: true,
            })
            .then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const res = await axiosPublic.delete(`/member/${id}`)
                        if (res.status === 200) {
                            toast({
                                title: "সফলতা",
                                description: "সদস্য সফলভাবে মুছে ফেলা হয়েছে",
                            })
                            refetch()
                        }
                    } catch (error) {
                        toast({
                            title: "ত্রুটি",
                            description: "সদস্য মুছে ফেলার সময় সমস্যা হয়েছে",
                            variant: "destructive",
                        })
                    }
                }
            })
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between my-5">
                        <div>
                            <p className="text-xl md:text-2xl font-semibold">
                                সদস্য ব্যবস্থাপনা
                            </p>
                            <CardDescription className="hidden md:block">
                                নতুন সদস্য যোগ, দেখুন ও সম্পাদনা করুন
                            </CardDescription>
                        </div>
                        <Button
                            onClick={() => setIsAddModalOpen(true)}
                            className="bg-purple-600 hover:bg-purple-700"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            নতুন সদস্য যোগ করুন
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                        {allItems?.map((item, index) => {
                            const isLast = index === allItems.length - 1

                            return (
                                <Card key={item._id} ref={isLast ? ref : undefined}>
                                    <CardContent className="p-4 flex flex-col justify-between h-full">
                                        {/* CLICKABLE AREA for DETAILS MODAL */}
                                        <div
                                            className="cursor-pointer"
                                            onClick={() => {
                                                setSelectedItem(item)
                                                setIsDetailsModalOpen(true)
                                            }}
                                        >
                                            <div className="aspect-square bg-gray-200 rounded-lg mb-3 overflow-hidden">
                                                <img
                                                    src={item.photo || "/placeholder.svg"}
                                                    alt={item.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <h4 className="font-semibold">{item.name}</h4>
                                            <p className="text-sm">{item.designation}</p>
                                        </div>

                                        {/* BUTTONS SECTION - ALWAYS BOTTOM */}
                                        <div className="flex justify-end space-x-2 mt-3">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedItem(item)
                                                    setIsDetailsModalOpen(true)
                                                }}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setSelectedItem(item)
                                                    setIsEditModalOpen(true)
                                                }}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="destructive"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    handleDelete(item._id)
                                                }}
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
                                    <div className="aspect-square bg-gray-300 rounded-lg mb-3" />
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

            {/* Add Modal */}
            <AddMember
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                refetch={refetch}
            />

            {/* Edit Modal */}
            <EditMember
                open={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                item={selectedItem}
                refetch={refetch}
            />

            {/* Details Modal */}
            <MemberDetails
                open={isDetailsModalOpen}
                onClose={() => setIsDetailsModalOpen(false)}
                item={selectedItem}
            />
        </div>
    )
}

export default Members
