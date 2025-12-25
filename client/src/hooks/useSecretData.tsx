// hooks/useSecretData.ts

"use client"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "./useAxios"

export type SecretData = {
  _id: string
  dateSubmitted: string
  title: string
  description: string
  name?: string
  hideName?: boolean
  hidePhone?: boolean
  status: string
  subject?: string // Added subject property
  location?: string
  submitterType?: string
  phone?: string
  images?: string[]
  // add other fields if your secret data has more
}

const useSecretData = () => {
  const axiosPublic = useAxiosPublic()

  const fetchSecretData = async (): Promise<SecretData[]> => {
    const response = await axiosPublic.get<{ data: SecretData[] }>("/secretdata")
    return response.data.data
  }

  // Return everything from useQuery
  return useQuery<SecretData[], Error>({
    queryKey: ["secretdata"],
    queryFn: fetchSecretData,
  })
}

export default useSecretData
