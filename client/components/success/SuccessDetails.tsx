"use client"

import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface SuccessStoryDetailsModalProps {
  open: boolean
  onClose: () => void
  story: any
}

export default function SuccessDetails({
  open,
  onClose,
  story,
}: SuccessStoryDetailsModalProps) {
  if (!story) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {story.title}
          </DialogTitle>
        </DialogHeader>

        {/* Date */}
        <p className="text-sm text-gray-500">
          তারিখ:{" "}
          {new Date(story.dateSubmitted).toLocaleDateString("bn-BD", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Description */}
        <div className="mt-4">
          <p className="text-gray-700 whitespace-pre-line">
            {story.description}
          </p>
        </div>

        {/* Images */}
        {story.images && story.images.length > 0 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {story.images.map((img: string, index: number) => (
              <div
                key={index}
                className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-100"
              >
                <Image
                  src={img}
                  alt={`story-image-${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            বন্ধ করুন
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
