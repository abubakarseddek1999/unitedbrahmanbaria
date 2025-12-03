"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"

interface MemberDetailsProps {
    open: boolean
    onClose: () => void
    item: any
}

export default function MemberDetails({ open, onClose, item }: MemberDetailsProps) {
    if (!item) return null

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        সদস্যের বিস্তারিত তথ্য
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Photo */}
                    <div className="w-40 h-40 mx-auto rounded-lg overflow-hidden border ">
                        <img
                            src={item.photo || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Info */}
                    <div className="space-y-2 text-left">
                        <p className="text-lg font-bold">{item.name}</p>

                        <p className="text-sm text-gray-600">
                            পদবি: {item.designation}
                        </p>

                        {item.gender && (
                            <p className="text-sm text-gray-600">
                                লিঙ্গ: {item.gender === "male" ? "পুরুষ" : "মহিলা"}
                            </p>
                        )}

                        {item.phone && (
                            <p className="text-sm text-gray-600">
                                ফোন: {item.phone}
                            </p>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
