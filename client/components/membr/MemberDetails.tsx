"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface MemberDetailsProps {
    open: boolean
    onClose: () => void
    item: any
}

export default function MemberDetails({ open, onClose, item }: MemberDetailsProps) {
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl w-full max-h-[90vh] p-0 flex flex-col overflow-hidden">
                {/* HEADER — Sticky */}
                <DialogHeader className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 border-b px-6 py-4 z-10">
                    <DialogTitle className="text-xl font-bold text-gray-800">সদস্যের বিস্তারিত তথ্য</DialogTitle>
                </DialogHeader>

                {/* BODY — Scrollable */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                    {/* PHOTO & SIGNATURE SECTION */}
                    <div className="grid md:grid-cols-1 gap-6">
                        {/* PHOTO */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-600 mb-2">প্রোফাইল ছবি</h3>
                            <div className="w-full rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-square">
                                <img
                                    src={item.photo || "/placeholder.svg"}
                                    alt={item.fullName || item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* SIGNATURE */}
                        {item.signature && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-600 mb-2">সাক্ষর</h3>
                                <div className="w-full rounded-lg overflow-hidden  border-gray-200 bg-gray-50">
                                    <img
                                        src={item.signature || "/placeholder.svg"}
                                        alt="Signature"
                                        className="w-full h-[100px] object-contain"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BASIC INFO */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">মৌলিক তথ্য</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">সম্পূর্ণ নাম</p>
                                <p className="text-gray-800 mt-1">{item.fullName || item.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পিতার নাম</p>
                                <p className="text-gray-800 mt-1">{item.fatherName || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">মাতার নাম</p>
                                <p className="text-gray-800 mt-1">{item.motherName || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">মোবাইল নম্বর</p>
                                <p className="text-gray-800 mt-1">{item.mobileNumber || item.phone || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">ইমেইল</p>
                                <p className="text-gray-800 mt-1">{item.email || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জাতীয়তা</p>
                                <p className="text-gray-800 mt-1">{item.nationality || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* PERSONAL DETAILS */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">ব্যক্তিগত তথ্য</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জন্মদিন</p>
                                <p className="text-gray-800 mt-1">
                                    {item.birthDate ? new Date(item.birthDate).toLocaleDateString("bn-BD") : "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">বয়স</p>
                                <p className="text-gray-800 mt-1">{item.age || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">লিঙ্গ</p>
                                <p className="text-gray-800 mt-1">
                                    {item.gender === "male" ? "পুরুষ" : item.gender === "female" ? "মহিলা" : item.gender || "N/A"}
                                </p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">ব্লাড গ্রুপ</p>
                                <p className="text-gray-800 mt-1">{item.bloodGroup || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পদবি</p>
                                <p className="text-gray-800 mt-1">{item.designation || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* FAMILY INFO */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">পারিবারিক তথ্য</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পিতার পেশা</p>
                                <p className="text-gray-800 mt-1">{item.fatherProfession || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">মাতার পেশা</p>
                                <p className="text-gray-800 mt-1">{item.motherProfession || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* PRESENT ADDRESS */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">বর্তমান ঠিকানা</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">গ্রাম</p>
                                <p className="text-gray-800 mt-1">{item.presentVillage || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পোস্ট অফিস</p>
                                <p className="text-gray-800 mt-1">{item.presentPost || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">থানা</p>
                                <p className="text-gray-800 mt-1">{item.presentThana || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জেলা</p>
                                <p className="text-gray-800 mt-1">{item.presentDistrict || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* PERMANENT ADDRESS */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">স্থায়ী ঠিকানা</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">গ্রাম</p>
                                <p className="text-gray-800 mt-1">{item.permanentVillage || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পোস্ট অফিস</p>
                                <p className="text-gray-800 mt-1">{item.permanentPost || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">থানা</p>
                                <p className="text-gray-800 mt-1">{item.permanentThana || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জেলা</p>
                                <p className="text-gray-800 mt-1">{item.permanentDistrict || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* CERTIFICATES */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">সনদপত্র তথ্য</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জাতীয় পরিচয়পত্র নম্বর</p>
                                <p className="text-gray-800 mt-1">{item.nidCertificateNo || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">জন্মসনদ নম্বর</p>
                                <p className="text-gray-800 mt-1">{item.birthCertificateNo || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">পাসপোর্ট নম্বর</p>
                                <p className="text-gray-800 mt-1">{item.passportNo || "N/A"}</p>
                            </div>
                        </div>
                    </div>

                    {/* PROFESSIONAL INFO */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">পেশাগত তথ্য</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">বর্তমান পেশা</p>
                                <p className="text-gray-800 mt-1">{item.currentProfession || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500 uppercase">প্রতিষ্ঠানের নাম</p>
                                <p className="text-gray-800 mt-1">{item.organizationName || "N/A"}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase">কর্মস্থলের ঠিকানা</p>
                                <p className="text-gray-800 mt-1">{item.workAddress || "N/A"}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-xs font-semibold text-gray-500 uppercase">শিক্ষাগত যোগ্যতা</p>
                                <p className="text-gray-800 mt-1">{item.educationQualification || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER — Sticky */}
                <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                    >
                        বন্ধ করুন
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
