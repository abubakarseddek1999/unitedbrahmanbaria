"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import useAxiosPublic from "@/hooks/useAxios";

interface EditMemberProps {
    open: boolean;
    onClose: () => void;
    item: any;
    refetch: () => void;
}

const EditMember = ({ open, onClose, item, refetch }: EditMemberProps) => {
    const { toast } = useToast();
    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(false);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        phone: "",
        gender: "",
        photo: null as File | null,
    });

    // Load initial data
    useEffect(() => {
        if (item) {
            setFormData({
                name: item.name || "",
                designation: item.designation || "",
                phone: item.phone || "",
                gender: item.gender || "",
                photo: null,
            });
            setPhotoPreview(item.photo || null);
        }
    }, [item]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((p) => ({ ...p, [name]: value }));
    };

    const handlegenderChange = (e: any) => {
        setFormData((p) => ({ ...p, gender: e.target.value }));
    };

    const handlePhotoUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((p) => ({ ...p, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        if (!item) return;

        setLoading(true);
        try {
            const fd = new FormData();

            const finalData = {
                name: formData.name,
                designation: formData.designation,
                gender: formData.gender,
                phone: formData.phone,
            };

            fd.append("data", JSON.stringify(finalData));
            if (formData.photo) fd.append("photo", formData.photo);

            const res = await axiosPublic.patch(`/member/${item._id}`, fd);

            if (res.status === 200) {
                toast({
                    title: "✔️ সফলভাবে আপডেট হয়েছে",
                    description: "সদস্যের তথ্য আপডেট করা হয়েছে।",
                });
                refetch();
                onClose();
            }
        } catch (err) {
            toast({
                title: "❌ ত্রুটি",
                description: "তথ্য আপডেট করতে সমস্যা হয়েছে।",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg w-full max-h-[90vh] p-0 flex flex-col overflow-hidden">

                {/* HEADER — Sticky */}
                <DialogHeader className="sticky top-0 bg-white border-b px-6 py-4 z-10">
                    <DialogTitle>সদস্য সম্পাদনা করুন</DialogTitle>
                </DialogHeader>

                {/* BODY — Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">

                    {/* Name */}
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

                    {/* Designation */}
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
                            <option value="তত্ত্বাবধায়ক">তত্ত্বাবধায়ক</option>
                            <option value="কার্যকরী-সদস্য">কার্যকরী সদস্য</option>
                            <option value="প্রধান-নির্বাহী">প্রধান নির্বাহী</option>
                            <option value="পরিচালক">পরিচালক</option>
                            <option value="উপদেষ্টা">উপদেষ্টা</option>
                            <option value="দাতা">দাতা</option>
                        </select>
                    </div>

                    {/* Gender */}
                    <div>
                        <span className="text-sm text-gray-600">লিঙ্গ</span>
                        <select
                            name="gender"
                            value={formData.gender}
                            onChange={handlegenderChange}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">লিঙ্গ নির্বাচন করুন</option>
                            <option value="male">পুরুষ</option>
                            <option value="female">মহিলা</option>
                        </select>
                    </div>

                    {/* Phone */}
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

                    {/* File Upload */}
                    <div>
                        <span className="text-sm text-gray-600">সদস্যের ছবি</span>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="w-full border p-2 rounded"
                        />
                    </div>

                    {/* Preview */}
                    {photoPreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                            <img
                                src={photoPreview}
                                className="w-full h-full object-cover"
                                alt="Preview"
                            />
                        </div>
                    )}
                </div>

                {/* FOOTER — Sticky */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>বাতিল</Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditMember;
