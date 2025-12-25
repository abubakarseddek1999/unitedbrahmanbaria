"use client"

import { useEffect } from "react"
import usePaginatedData from "@/hooks/usePaginatedData"
import { Card, CardContent } from "@/components/ui/card"
import { SuccessStoryCard } from "./SuccessStoryCard"

type SuccessStory = {
  _id: string
  photo: string
  title: string
  dateSubmitted: string
}

const SuccessStoryContent = ({
  refresh,
  setRefresh,
}: {
  refresh: boolean
  setRefresh: (v: boolean) => void
}) => {
  const {
    data: successStories = [],
    loading,
    hasMore,
    ref,
    refetch,
  } = usePaginatedData<SuccessStory>({
    endpoint: "/successdata",
    limit: 8,
  })

  // External refresh handler
  useEffect(() => {
    if (refresh) {
      refetch()
      setRefresh(false)
    }
  }, [refresh, refetch, setRefresh])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">
      {/* ================= REAL DATA ================= */}
      {successStories.map((story, index) => {
        const isLast =
          index === successStories.length - 1 && !loading && hasMore

        return (
          <div key={story._id} ref={isLast ? ref : undefined}>
            <SuccessStoryCard
              story={story}
              setRefresh={setRefresh}
            />
          </div>
        )
      })}

      {/* ================= SKELETON (APPEND ONLY) ================= */}
      {loading &&
        Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={`skeleton-${i}`}
            className="border-l-4 border-l-green-500 animate-pulse"
          >
            <CardContent className="p-4">
              <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">
                {/* Text Skeleton */}
                <div className="flex-1 flex flex-col gap-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-5/6" />
                  <div className="h-4 bg-gray-200 rounded w-4/6" />
                </div>

                {/* Image Skeleton */}
                <div className="w-full md:w-1/2">
                  <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  )
}

export default SuccessStoryContent
