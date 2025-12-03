"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast"
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

    // Load previous values
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

    // Input Change
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Gender Change
    const handlegenderChange = (e: any) => {
        const { value } = e.target;
        setFormData((prev) => ({ ...prev, gender: value }));
    };

    // Photo Upload + Preview
    const handlePhotoUpload = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, photo: file }));
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Submit Handler
    const handleSubmit = async () => {
        if (!item) return;

        setLoading(true);

        try {
            const fd = new FormData();

            // send all fields
            const finalData = {
                name: formData.name,
                designation: formData.designation,
                gender: formData.gender,
                phone: formData.phone,
            }
            fd.append("data", JSON.stringify(finalData));
            // send photo only if updated
            if (formData.photo) {
                fd.append("photo", formData.photo as Blob);
            }

            const res = await axiosPublic.patch(`/member/${item._id}`, fd);

            if (res.status === 200) {
                toast({
                    title: "✔️ সফলভাবে আপডেট হয়েছে",
                    description: "সদস্যের তথ্য আপডেট করা হয়েছে।",
                });
                refetch();
                onClose();
            }
        } catch (error) {
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>সদস্য সম্পাদনা করুন</DialogTitle>
                </DialogHeader>

                <div className="space-y-3">
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
                            <option value="তত্ত্বাবধায়ক ">তত্ত্বাবধায়ক </option>
                            {/* <option value="সদস্য">সদস্য</option> */}
                            <option value="কার্যকরী-সদস্য">কার্যকরী  সদস্য</option>
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

                    {/* Photo Preview */}
                    {photoPreview && (
                        <div className="mt-2 w-32 h-32 border rounded overflow-hidden">
                            <img
                                src={photoPreview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        বাতিল
                    </Button>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditMember;
