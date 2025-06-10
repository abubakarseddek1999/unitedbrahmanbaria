// hooks/useSuccessStories.ts
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxios"

export type SuccessStory = {
  _id: string
  title: string
  description: string
  images: string[]
  dateSubmitted: string
}

const useSuccessStories = () => {
  const axiosPublic = useAxiosPublic()

  const fetchSuccessStories = async (): Promise<SuccessStory[]> => {
    const response = await axiosPublic.get<{ data: SuccessStory[] }>("/successdata")
    return response.data.data
  }

  return useQuery<SuccessStory[], Error>({
    queryKey: ["successStories"],
    queryFn: fetchSuccessStories,
  })
}

export default useSuccessStories
