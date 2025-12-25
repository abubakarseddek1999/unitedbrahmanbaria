// // app/gallery/page.tsx
// import Image from "next/image";
// import Link from "next/link";
// import { apiUrl } from "@/config/constants";
// interface ImageItem {
//   _id: string;
//   image: string;
//   alt?: string;
// }
// interface GalleryPageProps {
//   searchParams?: Promise<{ limit?: string }>;
// }
// export default async function GalleryPage({ searchParams }: GalleryPageProps) {
//   const params = await searchParams; // unwrap Promise
//   const page = 1; // all time page 1
//   const currentLimit = parseInt(params?.limit || "1"); // default 1
//   const nextLimit = currentLimit + 1;
//   let images: ImageItem[] = [];
//   let totalCount = 0;
//   try {
//     const res = await fetch(`${apiUrl}/gallery?page=${page}&limit=${currentLimit}`, {
//       cache: "no-store",
//     });
//     const json = await res.json();

//     images = json?.data || [];
//     totalCount = json?.meta?.total || 0; //from meta total images
//   } catch (err) {
//     console.error("Failed to fetch images:", err);
//   }
//   return (
//     <div className="px-4 py-8 container mx-auto">
//       <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {images.map((item, idx) => (
//           <div
//             key={item._id || idx}
//             className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer group"
//           >
//             <Image
//               src={item.image}
//               alt={item.alt || `Gallery ${idx + 1}`}
//               fill
//               className="object-cover group-hover:scale-110 transition duration-300"
//             />
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-between items-center">
//         <p className="mt-4 text-center text-sm text-gray-500">
//           Showing {images.length} of {totalCount} images
//         </p>
//         {/* Load More button */}
//         <div>
//           {images.length < totalCount && (
//             <div className="mt-8 flex justify-center">
//               <Link
//                 href={`?limit=${nextLimit}`} // relative URL → same page handle করবে
//                 className="px-2 py-2 bg-primary text-white rounded hover:bg-blue-700 transition"
//               >
//                 Load More
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


"use client"
import Image from "next/image";
import SSRLoadMoreData from "@/components/SSRLoadMoreData";
import { apiUrl } from "@/config/constants";
import { useEffect, useState } from "react";

interface ImageItem {
    _id: string;
    photo: string;
    title: string;
    alt?: string;
}

interface GalleryPageProps {
    searchParams?: Promise<{ limit?: string }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {

    const [selectedImage, setSelectedImage] = useState<null | { photo: string; title: string }>(null)

    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [selectedImage])
    return (
        <SSRLoadMoreData<ImageItem>
            apiUrl={`${apiUrl}/gallerydata`}
            searchParams={searchParams}
            defaultLimit={15}
        >
            {(images) => {
                if (!images || images.length === 0) {
                    return (
                        <div className="text-center py-10 text-gray-500">
                            No data available
                        </div>
                    );
                }

                return (
                    <>
                        <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">গ্যালারি</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">

                            {images.map((item) => (
                                <div
                                    key={item._id}
                                    onClick={() => setSelectedImage({ photo: item.photo, title: item.title })}
                                    className="relative aspect-[4/3] group overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                                // onClick={() => setSelectedImage({ photo: item.photo, title: item.title })}
                                >
                                    <Image
                                        src={item.photo || "/placeholder.svg"}
                                        alt={item.title}
                                        fill
                                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-opacity-20 group-hover:bg-opacity-40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                        <p className="text-white text-center text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2">
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {images.length === 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-5 mt-8">
                                    {[...Array(10)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-sm bg-gray-300 animate-pulse"
                                        >
                                            <div className="w-full h-full bg-gray-300" />
                                            <div className="absolute inset-x-0 bottom-0 bg-opacity-20 h-8 rounded-b-xl flex items-center justify-center">
                                                <div className="h-4 w-3/4 bg-gray-400 rounded"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>

                );
            }}
        </SSRLoadMoreData>
    );
}


