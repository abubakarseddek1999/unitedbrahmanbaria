"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Button } from "../ui/button"
import { useToast } from "@/hooks/use-toast"
import useAxiosPublic from "@/hooks/useAxios"

interface AddMemberProps {
    open: boolean
    onClose: () => void
    refetch: () => void
}

const AddMember = ({ open, onClose, refetch }: AddMemberProps) => {
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()

    const [photo, setPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState<string>("")
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        phone: "",
        gender: "",
        photo: null as File | null,
    })

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string)
                setPhoto(file)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async () => {
        if (!formData.name || !formData.designation || !formData.gender) {
            toast({
                title: "⚠️ সতর্কবার্তা",
                description: "সব তথ্য পূরণ করুন।",
                variant: "destructive",
            })
            return
        }

        if (!photo) {
            toast({
                title: "ত্রুটি",
                description: "ছবি নির্বাচন করা আবশ্যক",
            })
            return
        }

        setLoading(true)

        try {
            const finalData = {
                name: formData.name,
                designation: formData.designation,
                gender: formData.gender,
                phone: formData.phone,
            }

            const fd = new FormData()
            fd.append("data", JSON.stringify(finalData))
            if (photo) fd.append("photo", photo as Blob)

            const res = await axiosPublic.post("/member/create", fd)

            if (res.status === 201) {
                toast({
                    title: "🎉 সফলতা",
                    description: "নতুন সদস্য সফলভাবে যোগ হয়েছে।",
                })
                refetch()
                onClose()

                // Reset
                setFormData({
                    name: "",
                    designation: "",
                    gender: "",
                    phone: "",
                    photo: null,
                })
                setPhotoPreview("")
            }
        } catch (error) {
            toast({
                title: "❌ ত্রুটি",
                description: "সদস্য যোগ করতে সমস্যা হয়েছে।",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] p-0 overflow-hidden">

                {/* HEADER: Sticky */}
                <div className="sticky top-0 bg-white z-10 border-b p-4">
                    <DialogHeader>
                        <DialogTitle>নতুন সদস্য যোগ করুন</DialogTitle>
                    </DialogHeader>
                </div>

                {/* BODY: Scrollable */}
                <div className="p-4 space-y-3 overflow-y-auto max-h-[50vh] mb-16">

                    <div>
                        <span className="text-sm text-gray-600">সদস্যের নাম</span>
                        <input
                            type="text"
                            name="name"
                            placeholder="নাম"
                            className="w-full border p-2 rounded"
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <span className="text-sm text-gray-600">সদস্যের পদবি</span>
                        <select
                            name="designation"
                            value={formData.designation}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">পদবি নির্বাচন করুন</option>
                            <option value="নতুন-আবেদনকারী">নতুন আবেদনকারী</option>
                            <option value="তত্ত্বাবধায়ক ">তত্ত্বাবধায়ক </option>
                            <option value="কার্যকরী-সদস্য">কার্যকরী সদস্য</option>
                            <option value="প্রধান-নির্বাহী">প্রধান নির্বাহী</option>
                            <option value="পরিচালক">পরিচালক</option>
                            <option value="উপদেষ্টা">উপদেষ্টা</option>
                            <option value="উপদেষ্টা">সভাপতি</option>
                            <option value="দাতা">দাতা</option>
                            <option value="দাতা">আজীবন দাতা</option>
                        </select>
                    </div>

                    <div>
                        <span className="text-sm text-gray-600">লিঙ্গ</span>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">লিঙ্গ নির্বাচন করুন</option>
                            <option value="male">পুরুষ</option>
                            <option value="female">মহিলা</option>
                        </select>
                    </div>

                    <div>
                        <span className="text-sm text-gray-600">ফোন নম্বর</span>
                        <input
                            type="text"
                            name="phone"
                            placeholder="ফোন নম্বর"
                            className="w-full border p-2 rounded"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <span className="text-sm text-gray-600">সদস্যের ছবি</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {photoPreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                            <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}

                </div>

                {/* FOOTER: Sticky */}
                <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>বাতিল</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "যোগ হচ্ছে..." : "সদস্য যোগ করুন"}
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default AddMember
