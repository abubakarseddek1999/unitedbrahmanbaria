"use client";
import useAxiosPublic from "@/hooks/useAxios";
import { useParams } from "next/navigation";
import { use, useEffect, useState } from "react";

interface PageProps {
    params: {
        id: string;
    };
}

interface Complaint {
    _id: string;
    dateSubmitted: string;
    title: string;
    description: string;
    status: string;
    hideName: boolean;
    name: string;
    hidePhone: boolean;
    phone: string;
    images?: string[];
}

export default function ComplaintDetailsPage({ params }: PageProps) {
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosPublic
                .get(`/complaint/${id}`)
                .then((response) => {
                    setComplaint(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching complaint:", error);
                    setLoading(false);
                });
        }
    }, [id, axiosPublic]);

    function openLightbox(image: string) {
        setActiveImage(image);
        setLightboxOpen(true);
    }
    function closeLightbox() {
        setLightboxOpen(false);
        setActiveImage(null);
    }

    if (loading) {
        return <div className="text-center mt-20 text-lg">লোড হচ্ছে...</div>;
    }

    if (!complaint) {
        return (
            <div className="text-center text-red-500 mt-20 text-lg">
                অভিযোগ খুঁজে পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-10">
            <div className="container mx-auto rounded-xl shadow-lg p-8 border border-gray-200">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">অভিযোগের বিস্তারিত</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium text-gray-800 dark:text-white">অবস্থা:</span>{" "}
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">
                            {complaint.status}
                        </span>
                    </div>

                </div>
                <div className="mb-4 mt-2 text-gray-500 dark:text-white">
                    <p className="text-sm ">
                        অভিযোগ আইডি: <span className="font-mono">{complaint._id}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-white">
                        জমা দেওয়ার তারিখ:{" "}
                        {new Date(complaint.dateSubmitted).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <div className="mb-2 text-gray-500 dark:text-white">
                    <span className="font-medium ">নাম:</span>{" "}
                    {complaint.hideName ? "গোপন রাখা হয়েছে" : complaint.name}
                </div>
                <div className="mb-2 text-gray-500 dark:text-white">
                    <span className="font-medium ">মোবাইল নম্বর:</span>{" "}
                    {complaint.hidePhone ? "গোপন রাখা হয়েছে" : complaint.phone}
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-blue-600 mb-2 dark:text-white">{complaint.title}</h2>
                    <p className="text-gray-700 leading-relaxed max-w-4xl dark:text-gray-400">{complaint.description}</p>
                </div>

                {/* Image gallery */}
                {complaint.images && complaint.images.length > 0 && (
                    <div className="mb-8">
                        <h3 className="text-lg font-medium mb-4 dark:text-white">ছবিগুলো</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {complaint.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`অভিযোগ ছবি ${idx + 1}`}
                                    className="w-full h-48 md:h-56 lg:h-64 object-fit rounded-lg shadow cursor-pointer border border-gray-300"
                                    onClick={() => openLightbox(img)}
                                    loading="lazy"
                                />
                            ))}
                        </div>
                    </div>
                )}


            </div>

            {/* Lightbox modal */}
            {lightboxOpen && activeImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
                    onClick={closeLightbox}
                >
                    <img
                        src={activeImage}
                        alt="Fullscreen complaint"
                        className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button
                        onClick={closeLightbox}
                        className="absolute top-5 right-5 text-white text-3xl font-bold hover:text-gray-400"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>
            )}
        </main>
    );
}
