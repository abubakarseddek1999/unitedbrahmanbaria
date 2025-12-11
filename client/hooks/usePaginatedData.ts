// import { useEffect, useState, useCallback, useRef } from "react";
// import { useInView } from "react-intersection-observer";
// import useAxiosPublic from "@/hooks/useAxios";

// type FetchParams = {
//     endpoint: string;
//     limit?: number;
// };

// const usePaginatedData = <T,>({ endpoint, limit = 8 }: FetchParams) => {
//     const axiosPublic = useAxiosPublic();
//     const [data, setData] = useState<T[]>([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [hasMore, setHasMore] = useState(true);
//     const { ref, inView } = useInView();

//     // এটা হবে loading state এর latest value ধরে রাখার জন্য
//     const loadingRef = useRef(false);
//     const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
//     const fetchData = useCallback(
//         async (pageToFetch: number) => {
//             if (loadingRef.current || !hasMore) return;

//             loadingRef.current = true;
//             setLoading(true);

//             try {
//                 // Optional artificial delay for better UX
//                 await delay(500); // 500ms delay
//                 const res = await axiosPublic.get(`${endpoint}?page=${pageToFetch}&limit=${limit}`);
//                 const newItems: T[] = res.data?.data || [];

//                 if (pageToFetch === 1) {
//                     setData(newItems);
//                 } else {
//                     setData((prev) => [...prev, ...newItems]);
//                 }

//                 setPage(pageToFetch);

//                 if (newItems.length < limit) {
//                     setHasMore(false);
//                 }
//             } catch (error) {
//                 console.error("Pagination Error:", error);
//             } finally {
//                 loadingRef.current = false;
//                 setLoading(false);
//             }
//         },
//         [axiosPublic, endpoint, limit, hasMore]
//     );

//     // প্রথমবার মাউন্ট এ শুধু একবার প্রথম পেজ লোড করো
//     useEffect(() => {
//         fetchData(1);
//     }, [fetchData]);

//     // inView true হলে পরবর্তী পেজ লোড করো, কিন্তু লোডিং চলাকালীন বা ডেটা শেষ হলে লোড করো না
//     useEffect(() => {
//         if (inView && !loadingRef.current && hasMore && page >= 1) {
//             fetchData(page + 1);
//         }
//     }, [inView, hasMore, page, fetchData]);


//     const refetch = async () => {
//         setLoading(true);
//         loadingRef.current = true;
//         try {
//             const res = await axiosPublic.get(`${endpoint}?page=1&limit=${limit}`);
//             const newItems: T[] = res.data?.data || [];
//             setData(newItems); // আগের ডাটা replace হচ্ছে, কিন্তু flicker কম
//             setPage(1);
//             setHasMore(newItems.length >= limit);
//         } catch (error) {
//             console.error("Refetch Error:", error);
//         } finally {
//             loadingRef.current = false;
//             setLoading(false);
//         }
//     };
    
//     return { data, loading, hasMore, ref, refetch };
// };

// export default usePaginatedData;




"use client"

import { useEffect, useState, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";
import useAxiosPublic from "@/hooks/useAxios";

type FetchParams = {
    endpoint: string;
    limit?: number;
};

const usePaginatedData = <T,>({ endpoint, limit = 8 }: FetchParams) => {
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState<T[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [total, setTotal] = useState<number | null>(null);  // এখানে total state যুক্ত করলাম
    const { ref, inView } = useInView();

    const loadingRef = useRef(false);
    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    const fetchData = useCallback(
        async (pageToFetch: number) => {
            if (loadingRef.current || !hasMore) return;

            loadingRef.current = true;
            setLoading(true);

            try {
                // await delay(100);
                const res = await axiosPublic.get(`${endpoint}?page=${pageToFetch}&limit=${limit}`);
                const newItems: T[] = res.data?.data || [];

                // total যদি response এ থাকে সেটাও এখানে সেট করো
                if (res.data?.total != null) {
                    setTotal(res.data.total);
                }

                if (pageToFetch === 1) {
                    setData(newItems);
                } else {
                    setData((prev) => [...prev, ...newItems]);
                }

                setPage(pageToFetch);

                if (newItems.length < limit) {
                    setHasMore(false);
                }
            } catch (error) {
                console.error("Pagination Error:", error);
            } finally {
                loadingRef.current = false;
                setLoading(false);
            }
        },
        [axiosPublic, endpoint, limit, hasMore]
    );

    useEffect(() => {
        fetchData(1);
    }, [fetchData]);

    useEffect(() => {
        if (inView && !loadingRef.current && hasMore && page >= 1) {
            fetchData(page + 1);
        }
    }, [inView, hasMore, page, fetchData]);

    const refetch = async () => {
        setLoading(true);
        loadingRef.current = true;
        try {
            const res = await axiosPublic.get(`${endpoint}?page=1&limit=${limit}`);
            const newItems: T[] = res.data?.data || [];
            setData(newItems);
            setPage(1);
            setHasMore(newItems.length >= limit);

            // refetch এর সময়ও total আপডেট করো
            if (res.data?.total != null) {
                setTotal(res.data.total);
            }
        } catch (error) {
            console.error("Refetch Error:", error);
        } finally {
            loadingRef.current = false;
            setLoading(false);
        }
    };

    return { data, loading, hasMore, ref, refetch, total };
};

export default usePaginatedData;
