// hooks/useGalleryData.ts
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxios"

export type GalleryItem = {
  _id: string
  title: string
  imageUrl: string
  category?: string
  dateSubmitted: string
  dateUploaded: string
  photo
  ?: any
}

const useGalleryData = () => {
  const axiosPublic = useAxiosPublic()

  const fetchGalleryData = async (): Promise<GalleryItem[]> => {
    const response = await axiosPublic.get<{ data: GalleryItem[] }>("/gallerydata")
    return response.data.data
  }

  return useQuery<GalleryItem[], Error>({
    queryKey: ["galleryData"],
    queryFn: fetchGalleryData,
  })
}

export default useGalleryData
