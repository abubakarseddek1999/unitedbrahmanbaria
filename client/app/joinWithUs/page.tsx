"use client"

import { FormSelect } from "@/components/form/form-select"
import { FormInput, FormTextarea } from "@/components/form/FormInput"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useRef, useState, useEffect } from "react"
import { useForm } from "react-hook-form"

interface VolunteerFormData {
    fullName: string
    fatherName: string
    motherName?: string
    fatherProfession?: string
    motherProfession?: string
    NidNo?: string
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

    birthCertificateNo?: string
    nidCertificateNo?: string
    passportNo?: string
    isBirthCertificate?: string
    isNidCertificate?: string
    isPassport?: string
    isProbashi?: string

    currentProfession: string
    organizationName: string
    workAddress: string
    educationQualification: string
    interestReason: string
}

export default function VolunteerForm() {
    const { toast } = useToast()
    const [photo, setPhoto] = useState<File | null>(null)
    const [photoPreview, setPhotoPreview] = useState("")

    const [signature, setSignature] = useState<File | null>(null)
    const [signaturePreview, setSignaturePreview] = useState("")

    const { register, handleSubmit, watch, resetField, reset } = useForm<VolunteerFormData>()

    const photoRef = useRef<HTMLInputElement>(null)
    const signatureRef = useRef<HTMLInputElement>(null)

    const watchBirthCert = watch("isBirthCertificate")
    const watchNidCert = watch("isNidCertificate")
    const watchPassport = watch("isPassport")

    // watch করে "no" হলে ফিল্ডগুলো রিসেট
    useEffect(() => {
        if (watchBirthCert === "no") resetField("birthCertificateNo")
    }, [watchBirthCert, resetField])

    useEffect(() => {
        if (watchNidCert === "no") resetField("nidCertificateNo")
    }, [watchNidCert, resetField])

    useEffect(() => {
        if (watchPassport === "no") resetField("passportNo")
    }, [watchPassport, resetField])

    const uploadImage = (
        e: React.ChangeEvent<HTMLInputElement>,
        setFile: (f: File | null) => void,
        setPrev: (p: string) => void
    ) => {
        const file = e.target.files?.[0]
        if (!file) return

        const reader = new FileReader()
        reader.onloadend = () => {
            setFile(file)
            setPrev(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    const onSubmit = (data: VolunteerFormData) => {
        if (!data.nidCertificateNo && !data.birthCertificateNo && !data.passportNo) {
            toast({
                title: "ত্রুটি",
                description: "জাতীয় পরিচয়পত্র, জন্মসনদ, পাসপোর্ট যেকোনো একটি দিন",
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

        if (!signature) {
            toast({
                title: "ত্রুটি",
                description: "সাক্ষর নির্বাচন করা আবশ্যক",
            })
            return
        }
        console.log(data)
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
            birthCertificateNo: data.birthCertificateNo,
            nidCertificateNo: data.nidCertificateNo,
            passportNo: data.passportNo,
            isProbashi: data.isProbashi,
            currentProfession: data.currentProfession,
            organizationName: data.organizationName,
            workAddress: data.workAddress,
            educationQualification: data.educationQualification,
            interestReason: data.interestReason,
        }
        console.log(finalData)

        // todo: এখানে ডাটা সাবমিট করার লজিক যোগ করো

        toast({
            title: "সফল!",
            description: "আপলোড সফল হয়েছে",
        })

        // চাইলে ফর্ম রিসেট করতে পারো
        // reset()
        // setPhoto(null)
        // setPhotoPreview("")
        // setSignature(null)
        // setSignaturePreview("")
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

    const yesNo = [
        { value: "yes", label: "হ্যাঁ" },
        { value: "no", label: "না" },
    ]

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4">

                <div className="bg-primary text-white rounded-t-lg p-8">
                    <h2 className="text-2xl font-bold">স্বেচ্ছাসেবক আবেদন</h2>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white rounded-b-lg shadow-lg p-8 space-y-6"
                >
                    {/* BASIC INFO */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="সম্পূর্ণ নাম" required {...register("fullName", { required: true })} />
                        <FormInput label="পিতার নাম" required {...register("fatherName", { required: true })} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="মাতার নাম" {...register("motherName")} />
                        <FormInput label="পিতার পেশা" required {...register("fatherProfession", { required: true })} />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="মাতার পেশা" {...register("motherProfession")} />
                        <FormInput label="মোবাইল নম্বর" required {...register("mobileNumber", { required: true })} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="জন্মদিন" required {...register("birthDate", { required: true })} />
                        <FormInput label="বয়স" required {...register("age", { required: true })} />

                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="ইমেইল" required {...register("email", { required: true })} />
                        <FormInput label="জাতীয়তা" required {...register("nationality", { required: true })} />

                    </div>




                    {/* BLOOD + NATIONALITY */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormSelect label="লিঙ্গ" options={genderOptions} {...register("gender")} />
                        <FormSelect label="ব্লাড গ্রুপ" options={bloodGroupOptions} {...register("bloodGroup")} />
                    </div>

                    {/* ADDRESS */}
                    <h3 className="text-lg font-semibold mt-6">বর্তমান ঠিকানা</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="গ্রাম" required {...register("presentVillage", { required: true })} />
                        <FormInput label="পোস্ট অফিস" required {...register("presentPost", { required: true })} />
                        <FormInput label="থানা" required {...register("presentThana", { required: true })} />
                        <FormInput label="জেলা" required {...register("presentDistrict", { required: true })} />
                    </div>

                    <h3 className="text-lg font-semibold mt-6">স্থায়ী ঠিকানা</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="গ্রাম" required {...register("permanentVillage", { required: true })} />
                        <FormInput label="পোস্ট অফিস" required {...register("permanentPost", { required: true })} />
                        <FormInput label="থানা" required {...register("permanentThana", { required: true })} />
                        <FormInput label="জেলা" required {...register("permanentDistrict", { required: true })} />
                    </div>

                    {/* CERTIFICATES */}
                    <FormSelect label="জাতীয় পরিচয়পত্র আছে?" options={yesNo} {...register("isNidCertificate")} />
                    {watchNidCert === "yes" && <FormInput label="জাতীয় পরিচয়পত্র নম্বর" {...register("nidCertificateNo")} />}

                    <FormSelect label="জন্মসনদ আছে?" options={yesNo} {...register("isBirthCertificate")} />
                    {watchBirthCert === "yes" && <FormInput label="জন্মসনদ নম্বর" {...register("birthCertificateNo")} />}

                    <FormSelect label="পাসপোর্ট আছে?" options={yesNo} {...register("isPassport")} />
                    {watchPassport === "yes" && <FormInput label="পাসপোর্ট নম্বর" {...register("passportNo")} />}

                    <FormSelect label="আপনি কি প্রবাসী?" options={yesNo} {...register("isProbashi")} />

                    {/* PROFESSION */}
                    <h3 className="text-lg font-semibold mt-6">পেশাগত তথ্য</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <FormInput label="বর্তমান পেশা" required {...register("currentProfession", { required: true })} />
                        <FormInput label="প্রতিষ্ঠানের নাম" required {...register("organizationName", { required: true })} />
                    </div>

                    <FormInput label="কর্মস্থলের ঠিকানা" required {...register("workAddress", { required: true })} />
                    <FormInput label="শিক্ষাগত যোগ্যতা" required {...register("educationQualification", { required: true })} />

                    {/* INTEREST */}
                    <FormTextarea label="স্বেচ্ছাসেবক হিসেবে আগ্রহ" required {...register("interestReason", { required: true })} />

                    {/* PHOTO UPLOAD */}
                    <h3 className="text-lg font-semibold">প্রোফাইল ছবি</h3>
                    <div
                        className="border-2 border-dashed rounded-xl p-2 bg-gray-50 text-center relative group cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => photoRef.current?.click()}
                    >
                        {!photoPreview ? (
                            <div>
                                <div className="text-gray-400 text-xl mb-2">📷</div>
                                <p className="text-gray-600">Click to upload photo</p>
                                <p className="text-xs text-gray-400 mt-1">Max size 2MB</p>
                            </div>
                        ) : (
                            <div className="relative w-40 mx-auto">
                                <img src={photoPreview} className="rounded-lg shadow-md" />
                                <button
                                    type="button"
                                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 text-xs"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setPhoto(null)
                                        setPhotoPreview("")
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        <input type="file" ref={photoRef} className="hidden" accept="image/*"
                            onChange={(e) => uploadImage(e, setPhoto, setPhotoPreview)} />
                    </div>

                    {/* SIGNATURE UPLOAD */}
                    <h3 className="text-lg font-semibold">সাক্ষর আপলোড</h3>
                    <div
                        className="border-2 border-dashed rounded-xl p-2 bg-gray-50 text-center relative group cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => signatureRef.current?.click()}
                    >
                        {!signaturePreview ? (
                            <div>
                                <div className="text-gray-400 text-xl mb-2">✍️</div>
                                <p className="text-gray-600">Click to upload signature</p>
                                <p className="text-xs text-gray-400 mt-1">Signature must be clear</p>
                            </div>
                        ) : (
                            <div className="relative w-40 mx-auto">
                                <img src={signaturePreview} className="rounded-lg shadow-md" />
                                <button
                                    type="button"
                                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-7 h-7 text-xs"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setSignature(null)
                                        setSignaturePreview("")
                                    }}
                                >
                                    ✕
                                </button>
                            </div>
                        )}

                        <input type="file" ref={signatureRef} className="hidden" accept="image/*"
                            onChange={(e) => uploadImage(e, setSignature, setSignaturePreview)} />
                    </div>

                    {/* SUBMIT */}
                    <Button type="submit" className="w-full bg-primary text-white py-3 mt-6">
                        আবেদন করুন →
                    </Button>
                </form>
            </div>
        </div>
    )
}
