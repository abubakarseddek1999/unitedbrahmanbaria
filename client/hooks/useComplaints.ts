// hooks/useComplaints.ts
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxios"

export type Complaint = {
  status: string
  _id: string
  dateSubmitted: string
  title: string
  description: string
  name: string
  hideName: boolean
  hidePhone: boolean
  phone: string
  images: string[]

}

const useComplaints = () => {
  const axiosPublic = useAxiosPublic()

  const fetchComplaints = async (): Promise<Complaint[]> => {
    const response = await axiosPublic.get<{ data: Complaint[] }>("/complaint")
    return response.data.data
  }

  // useQuery থেকে সব return করে দাও
  return useQuery<Complaint[], Error>({
    queryKey: ["complaints"],
    queryFn: fetchComplaints,
  })
}

export default useComplaints
