"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import useAxiosPublic from "@/hooks/useAxios"
import { FormSelect } from "@/components/form/form-select"
import { useForm } from "react-hook-form"
import { FormInput } from "@/components/form/FormInput"

interface EditMemberProps {
    open: boolean
    onClose: () => void
    item: any
    refetch: () => void
}

interface EditMemberFormData {
    fullName: string
    fatherName: string
    motherName?: string
    fatherProfession?: string
    motherProfession?: string
    mobileNumber: string
    email: string
    birthDate?: string
    gender?: string
    age?: string
    bloodGroup?: string
    nationality?: string
    presentVillage?: string
    presentPost?: string
    presentThana?: string
    presentDistrict?: string
    permanentVillage?: string
    permanentPost?: string
    permanentThana?: string
    permanentDistrict?: string
    nidCertificateNo?: string
    birthCertificateNo?: string
    passportNo?: string
    currentProfession?: string
    organizationName?: string
    workAddress?: string
    educationQualification?: string
    designation?: string
}

const EditMember = ({ open, onClose, item, refetch }: EditMemberProps) => {
    const { toast } = useToast()
    const axiosPublic = useAxiosPublic()
    const [loading, setLoading] = useState(false)
    const [photoPreview, setPhotoPreview] = useState<string | null>(null)
    const [signaturePreview, setSignaturePreview] = useState<string | null>(null)
    const photoRef = useRef<HTMLInputElement>(null)
    const signatureRef = useRef<HTMLInputElement>(null)

    const { register, handleSubmit, watch, setValue, reset } = useForm<EditMemberFormData>()

    useEffect(() => {
        if (open && item) {
            // Modal open হলে data set হবে
            reset({
                fullName: item.fullName || item.name || "",
                fatherName: item.fatherName || "",
                motherName: item.motherName || "",
                fatherProfession: item.fatherProfession || "",
                motherProfession: item.motherProfession || "",
                mobileNumber: item.mobileNumber || item.phone || "",
                email: item.email || "",

                birthDate: item.birthDate || "",
                gender: item.gender || "",
                age: item.age || "",
                bloodGroup: item.bloodGroup || "",
                nationality: item.nationality || "",
                presentVillage: item.presentVillage || "",
                presentPost: item.presentPost || "",
                presentThana: item.presentThana || "",
                presentDistrict: item.presentDistrict || "",
                permanentVillage: item.permanentVillage || "",
                permanentPost: item.permanentPost || "",
                permanentThana: item.permanentThana || "",
                permanentDistrict: item.permanentDistrict || "",
                nidCertificateNo: item.nidCertificateNo || "",
                birthCertificateNo: item.birthCertificateNo || "",
                passportNo: item.passportNo || "",
                currentProfession: item.currentProfession || "",
                organizationName: item.organizationName || "",
                workAddress: item.workAddress || "",
                designation: item.designation || "",
                educationQualification: item.educationQualification || "",
            })

            setPhotoPreview(item.photo || null)
            setSignaturePreview(item.signature || null)
        }
    }, [open, item, reset])


    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setPhotoPreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }
    const uploadSignature = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setSignaturePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = async (data: EditMemberFormData) => {
        if (!item) return

        setLoading(true)
        try {
            const fd = new FormData()

            const finalData = {
                fullName: data.fullName,
                fatherName: data.fatherName,
                motherName: data.motherName,
                fatherProfession: data.fatherProfession,
                motherProfession: data.motherProfession,
                mobileNumber: data.mobileNumber,
                email: data.email,
                birthDate: data.birthDate,
                gender: data.gender,
                designation: data.designation,
                age: data.age,
                bloodGroup: data.bloodGroup,
                nationality: data.nationality,
                presentVillage: data.presentVillage,
                presentPost: data.presentPost,
                presentThana: data.presentThana,
                presentDistrict: data.presentDistrict,
                permanentVillage: data.permanentVillage,
                permanentPost: data.permanentPost,
                permanentThana: data.permanentThana,
                permanentDistrict: data.permanentDistrict,
                nidCertificateNo: data.nidCertificateNo,
                birthCertificateNo: data.birthCertificateNo,
                passportNo: data.passportNo,
                currentProfession: data.currentProfession,
                organizationName: data.organizationName,
                workAddress: data.workAddress,
                educationQualification: data.educationQualification,
            }

            fd.append("data", JSON.stringify(finalData))

            const photoFile = photoRef.current?.files?.[0]
            const signatureFile = signatureRef.current?.files?.[0]
            if (photoFile) {
                fd.append("photo", photoFile as Blob)
            }
            if (signatureFile) {
                fd.append("signature", signatureFile as Blob)
            }

            const res = await axiosPublic.patch(`/member/${item._id}`, fd)

            if (res.status === 200) {
                toast({
                    title: "✔️ সফলভাবে আপডেট হয়েছে",
                    description: "সদস্যের তথ্য আপডেট করা হয়েছে।",
                })
                refetch()
                onClose()
            }
        } catch (err) {
            toast({
                title: "❌ ত্রুটি",
                description: "তথ্য আপডেট করতে সমস্যা হয়েছে।",
                variant: "destructive",
            })
        } finally {
            setLoading(false)
        }
    }

    const genderOptions = [
        { value: "male", label: "পুরুষ" },
        { value: "female", label: "মহিলা" },
        { value: "other", label: "অন্যান্য" },
    ]

    const bloodGroupOptions = [
        { value: "A+", label: "A+" },
        { value: "A-", label: "A-" },
        { value: "B+", label: "B+" },
        { value: "B-", label: "B-" },
        { value: "AB+", label: "AB+" },
        { value: "AB-", label: "AB-" },
        { value: "O+", label: "O+" },
        { value: "O-", label: "O-" },
    ]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl w-full max-h-[90vh] p-0 flex flex-col overflow-hidden">
                {/* HEADER — Sticky */}
                <DialogHeader className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-6 py-4 z-10">
                    <DialogTitle className="text-xl font-bold text-gray-800">সদস্য তথ্য সম্পাদনা</DialogTitle>
                </DialogHeader>

                {/* BODY — Scrollable */}
                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* BASIC INFO */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="সম্পূর্ণ নাম" required {...register("fullName")} />
                        <FormInput label="পিতার নাম" {...register("fatherName")} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="মাতার নাম" {...register("motherName")} />
                        <FormInput label="পিতার পেশা" {...register("fatherProfession")} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="মাতার পেশা" {...register("motherProfession")} />
                        <FormInput label="মোবাইল নম্বর" {...register("mobileNumber")} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="ইমেইল" type="email" {...register("email")} />
                        <FormInput label="জাতীয়তা" {...register("nationality")} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="জন্মদিন" type="date" {...register("birthDate")} />
                        <FormInput label="বয়স" type="number" {...register("age")} />
                    </div>

                    {/* BLOOD + GENDER */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormSelect
                            label="লিঙ্গ"
                            options={genderOptions}
                            value={watch("gender")}
                            onValueChange={(value) => setValue("gender", value)}
                        />
                        <FormSelect
                            label="ব্লাড গ্রুপ"
                            options={bloodGroupOptions}
                            value={watch("bloodGroup")}
                            onValueChange={(value) => setValue("bloodGroup", value)}
                        />
                    </div>
                    <div>
                        <FormSelect
                            label="সদস্যের পদবি"
                            options={[
                                { value: "", label: "পদবি নির্বাচন করুন" },
                                { value: "নতুন-আবেদনকারী", label: "নতুন আবেদনকারী" },
                                { value: "তত্ত্বাবধায়ক", label: "তত্ত্বাবধায়ক" },
                                { value: "কার্যকরী-সদস্য", label: "কার্যকরী সদস্য" },
                                { value: "প্রধান-নির্বাহী", label: "প্রধান নির্বাহী" },
                                { value: "পরিচালক", label: "পরিচালক" },
                                { value: "উপদেষ্টা", label: "উপদেষ্টা" },
                                { value: "সভাপতি", label: "সভাপতি" },
                                { value: "দাতা", label: "দাতা" },
                                { value: "আজীবন-দাতা", label: "আজীবন দাতা" },
                            ]}
                            value={watch("designation")} // react-hook-form থেকে ভ্যালু নেবে
                            onValueChange={(value) => setValue("designation", value)} // react-hook-form এ আপডেট করবে
                        />

                    </div>


                    {/* ADDRESS */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-800">বর্তমান ঠিকানা</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="গ্রাম" {...register("presentVillage")} />
                        <FormInput label="পোস্ট অফিস" {...register("presentPost")} />
                        <FormInput label="থানা" {...register("presentThana")} />
                        <FormInput label="জেলা" {...register("presentDistrict")} />
                    </div>

                    <h3 className="text-lg font-semibold mt-6 text-gray-800">স্থায়ী ঠিকানা</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="গ্রাম" {...register("permanentVillage")} />
                        <FormInput label="পোস্ট অফিস" {...register("permanentPost")} />
                        <FormInput label="থানা" {...register("permanentThana")} />
                        <FormInput label="জেলা" {...register("permanentDistrict")} />
                    </div>

                    {/* CERTIFICATES */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-800">সনদপত্র তথ্য</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="জাতীয় পরিচয়পত্র নম্বর" {...register("nidCertificateNo")} />
                        <FormInput label="জন্মসনদ নম্বর" {...register("birthCertificateNo")} />
                    </div>
                    <FormInput label="পাসপোর্ট নম্বর" {...register("passportNo")} />

                    {/* PROFESSION */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-800">পেশাগত তথ্য</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="বর্তমান পেশা" {...register("currentProfession")} />
                        <FormInput label="প্রতিষ্ঠানের নাম" {...register("organizationName")} />
                    </div>

                    <FormInput label="কর্মস্থলের ঠিকানা" {...register("workAddress")} />
                    <FormInput label="শিক্ষাগত যোগ্যতা" {...register("educationQualification")} />

                    {/* PHOTO UPLOAD */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-800">প্রোফাইল ছবি</h3>
                    <div
                        className="border-2 border-dashed rounded-xl p-4 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => !photoPreview && photoRef.current?.click()}
                    >
                        {!photoPreview ? (
                            <div>
                                <div className="text-gray-400 text-3xl mb-2">📷</div>
                                <p className="text-gray-600 font-medium">ছবি আপলোড করতে ক্লিক করুন</p>
                                <p className="text-xs text-gray-400 mt-1">সর্বোচ্চ ২MB</p>
                            </div>
                        ) : (
                            <div className="relative w-40 mx-auto">

                                {/* REMOVE BUTTON */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setPhotoPreview(null)
                                        if (photoRef.current) photoRef.current.value = ""
                                    }}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                                >
                                    ✖
                                </button>

                                <img src={photoPreview || "/placeholder.svg"} alt="Preview" className="rounded-lg shadow-md w-full" />
                            </div>
                        )}
                        <input ref={photoRef} type="file" className="hidden" accept="image/*" onChange={uploadImage} />
                    </div>


                    {/* signature upload */}
                    <h3 className="text-lg font-semibold mt-6 text-gray-800">সাক্ষর আপলোড</h3>
                    <div
                        className="border-2 border-dashed rounded-xl p-4 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => !signaturePreview && signatureRef.current?.click()}
                    >
                        {!signaturePreview ? (
                            <div>
                                <div className="text-gray-400 text-3xl mb-2">✍️</div>
                                <p className="text-gray-600 font-medium">সাক্ষর আপলোড করতে ক্লিক করুন</p>
                                <p className="text-xs text-gray-400 mt-1">সর্বোচ্চ ২MB</p>
                            </div>
                        ) : (
                            <div className="relative w-40 mx-auto">

                                {/* REMOVE BUTTON */}
                                <button
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSignaturePreview(null)
                                        if (signatureRef.current) signatureRef.current.value = ""
                                    }}
                                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-600 transition"
                                >
                                    ✖
                                </button>

                                <img src={signaturePreview || "/placeholder.svg"} alt="Preview" className="rounded-lg shadow-md w-full" />
                            </div>
                        )}
                        <input ref={signatureRef} type="file" className="hidden" accept="image/*" onChange={uploadSignature} />
                    </div>

                </form>

                {/* FOOTER — Sticky */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>
                        বাতিল
                    </Button>
                    <Button onClick={handleSubmit(onSubmit)} disabled={loading}>
                        {loading ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditMember
