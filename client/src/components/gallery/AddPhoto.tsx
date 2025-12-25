"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useState } from "react"
import useAxiosPublic from "@/hooks/useAxios"
import { useToast } from "@/hooks/use-toast"

type GalleryModalProps = {
  open: boolean
  onClose: () => void
  refetch: () => void
}

const AddPhoto = ({ open, onClose, refetch }: GalleryModalProps) => {
  const axiosPublic = useAxiosPublic()
  const [title, setTitle] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)
  const [photoPreview, setPhotoPreview] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false) // ✅ Loading state added
  const { toast } = useToast()

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!photo) {
      toast({
        title: "ত্রুটি",
        description: "ছবি নির্বাচন করা আবশ্যক",
      })
      return
    }

    const finalData = {
      title: title,
    }

    const formData = new FormData()
    if (photo) {
      formData.append("photo", photo as Blob)
    }
    formData.append("data", JSON.stringify(finalData))

    setIsLoading(true) // ✅ Start loading

    try {
      const response = await axiosPublic.post("/gallerydata/create", formData)

      if (response?.data?.success === true) {
        refetch()
        toast({
          title: "সফল!",
          description: "ছবি সফলভাবে আপলোড হয়েছে",
        })
      } else {
        toast({
          title: "ত্রুটি",
          description: "আপলোড ব্যর্থ হয়েছে",
        })
      }
    } catch (error) {
      console.error(error)
      toast({
        title: "ত্রুটি",
        description: "ছবি আপলোডে সমস্যা হয়েছে",
      })
    } finally {
      setIsLoading(false) // ✅ Stop loading
      setTitle("")
      setPhoto(null)
      setPhotoPreview("")
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>নতুন মিডিয়া যোগ করুন</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>শিরোনাম</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <Label>ছবি নির্বাচন করুন</Label>
            <Input type="file" accept="image/*" onChange={handlePhotoUpload} required />
          </div>

          {photoPreview && (
            <div className="mt-2">
              <Label>ছবির প্রিভিউ</Label>
              <img
                src={photoPreview}
                alt="ছবির প্রিভিউ"
                className="mt-1 w-full max-h-64 object-contain rounded border"
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading} // ✅ Disable while loading
            className="bg-purple-600 hover:bg-purple-700 w-full"
          >
            {isLoading ? "লোড হচ্ছে..." : "জমা দিন"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddPhoto
