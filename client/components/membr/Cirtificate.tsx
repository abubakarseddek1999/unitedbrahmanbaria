"use client"

import { useRef } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"
import html2pdf from "html2pdf.js"

interface MemberCertificateProps {
    open: boolean
    onClose: () => void
    item: any
}

export default function MemberCertificate({ open, onClose, item }: MemberCertificateProps) {
    const certificateRef = useRef<HTMLDivElement>(null)

    const handleDownloadPDF = () => {
        if (!certificateRef.current) return

        const options = {
            filename: `${item.fullName || item.name}_Certificate.pdf`,
            margin: 8,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
        } as any

        html2pdf().set(options).from(certificateRef.current).save()
    }

    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl w-full max-h-[95vh] p-0 overflow-hidden flex flex-col bg-white">

                {/* HEADER */}
                <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex justify-between items-center z-10">
                    <h2 className="text-xl font-bold">সদস্য সনদপত্র</h2>
                    <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded-lg">
                        <X size={22} />
                    </button>
                </div>

                {/* MAIN SCROLL */}
                <div className="flex-1 overflow-y-auto p-6">

                    {/* CERTIFICATE CONTAINER */}
                    <div
                        ref={certificateRef}
                        className="bg-white border-[10px] border-slate-900 rounded-2xl p-8 shadow-2xl max-w-[900px] mx-auto"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'dots\' x=\'0\' y=\'0\' width=\'50\' height=\'50\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'25\' cy=\'25\' r=\'1\' fill=\'%23f0f4f8\' /%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'%23fafbfc\' /%3E%3C/svg%3E")'
                        }}
                    >

                        {/* TITLE */}
                        <div className="text-center mb-10 pb-6 border-b-2 border-slate-900">
                            <div className="inline-block bg-slate-900 text-white rounded-full px-6 py-2">
                                <p className="text-xs font-bold tracking-widest">CERTIFICATE OF MEMBERSHIP</p>
                            </div>

                            <h1 className="text-4xl font-extrabold text-slate-900 mt-5 font-serif">
                                সদস্য পরিচয়পত্র
                            </h1>
                            <p className="text-slate-600 text-sm mt-2">
                                Member Identification Certificate
                            </p>
                        </div>

                        {/* GRID CONTENT */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                            {/* PHOTO */}
                            <div className="flex justify-center md:justify-start">
                                <div className="w-[300px] h-[300px] border-4 border-slate-900 rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={item.photo || "/placeholder.svg"}
                                        alt={item.fullName || item.name}
                                        crossOrigin="anonymous"
                                        className="w-[300px] h-full object-cover"
                                    />
                                </div>
                            </div>

                            {/* DETAILS */}
                            <div className="md:col-span-2 space-y-5">

                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                                        নাম (Name)
                                    </p>
                                    <p className="text-2xl font-bold text-slate-900">
                                        {item.fullName || item.name || "N/A"}
                                    </p>
                                </div>

                                {/* INFO GRID */}
                                <div className="grid grid-cols-2 gap-y-4 text-sm">

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">
                                            পিতার নাম
                                        </p>
                                        <p className="font-medium">{item.fatherName || "N/A"}</p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">
                                            জন্মদিন
                                        </p>
                                        <p className="font-medium">
                                            {item.birthDate
                                                ? new Date(item.birthDate).toLocaleDateString("bn-BD")
                                                : "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">
                                            মোবাইল
                                        </p>
                                        <p className="font-medium">
                                            {item.mobileNumber || item.phone || "N/A"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-slate-500 uppercase">
                                            জাতীয়তা
                                        </p>
                                        <p className="font-medium">{item.nationality || "N/A"}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase">
                                        ইমেইল
                                    </p>
                                    <p className="font-medium break-all">{item.email || "N/A"}</p>
                                </div>
                            </div>
                        </div>

                        {/* FOOTER SEAL AREA */}
                        <div className="mt-5  border-slate-300 flex gap-3 justify-between">
                            <div className="text-center">
                                <img
                                    src={item.signature || "/placeholder.svg"}
                                    alt={item.fullName || item.name}
                                    crossOrigin="anonymous"
                                    className="w-[300px] h-[80px] object-contain"
                                />
                                <p className="border-t border-slate-900 w-32 mx-auto"></p>
                                <p className="text-sm mt-2 font-semibold">Member Signature</p>
                            </div>

                            <div className="text-center">
                                <img
                                    src={item.signature || "/placeholder.svg"}
                                    alt={item.fullName || item.name}
                                    crossOrigin="anonymous"
                                    className="w-[300px] h-[80px] object-contain"
                                />
                                <p className="border-t border-slate-900 w-32 mx-auto"></p>
                                <p className="text-sm mt-2 font-semibold">Authorized Signature</p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* FOOTER BUTTONS */}
                <div className="sticky bottom-0 bg-slate-900 px-6 py-4 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-white text-white hover:bg-slate-700 bg-transparent"
                    >
                        বন্ধ করুন
                    </Button>
                    <Button
                        onClick={handleDownloadPDF}
                        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                        <Download size={18} />
                        পিডিএফ ডাউনলোড
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}
