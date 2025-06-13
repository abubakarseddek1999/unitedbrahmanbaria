import useSuccessStories from "@/hooks/useSuccessData"
import { SuccessStoryCard } from "./SuccessStoryCard"
import usePaginatedData from "@/hooks/usePaginatedData";
import { Card, CardContent } from "../ui/card";
import { useEffect } from "react";


const SuccessStoryContent = ({ refresh, setRefresh }: { refresh: boolean; setRefresh: any }) => {
    const { data: successStories, loading, hasMore, ref, refetch } = usePaginatedData<{ _id: string; photo: string; title: string; dateSubmitted: string }>({
        endpoint: "/successdata",
        limit: 8,
    });
    useEffect(() => {
        if (refresh) {
            refetch()
            setRefresh(false)
        }
    }, [refresh, refetch]);
    return (
        <div>
            <div className="space-y-4 pb-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(successStories ?? []).slice().reverse().map((story, index) => {
                    const isLast = index === successStories.length - 1
                    return (

                        <div key={story._id} ref={isLast ? ref : undefined}>
                            <SuccessStoryCard story={story} setRefresh={setRefresh} />
                        </div>

                    );
                })}
            </div>
            {loading && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <Card className="border-l-4 border-l-green-500 animate-pulse">
                            <CardContent className="p-4">
                                <div className="flex flex-col-reverse md:flex-row gap-5 items-start justify-between">

                                    {/* Text Content Skeleton */}
                                    <div className="flex-1 flex flex-col gap-5 md:w-1/2">
                                        <div>
                                            <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" /> {/* Title */}
                                            <div className="h-4 bg-gray-200 rounded w-full mb-1" /> {/* Description */}
                                            <div className="h-4 bg-gray-200 rounded w-5/6 mb-1" />
                                            <div className="h-4 bg-gray-200 rounded w-4/6 mb-4" />
                                            <div className="h-3 bg-gray-300 rounded w-1/3" /> {/* Date */}
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Edit button */}
                                            <div className="w-8 h-8 bg-gray-300 rounded-md" /> {/* Delete button */}
                                        </div>
                                    </div>

                                    {/* Image Content Skeleton */}
                                    <div className="w-full md:w-1/2">
                                        <div className="w-full h-[200px] bg-gray-200 rounded-lg" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    ))}
                </div>
            )}

        </div>
    )
}


export default SuccessStoryContent