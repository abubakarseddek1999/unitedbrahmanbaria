"use client";
import useAxiosPublic from "@/hooks/useAxios";
import { useEffect, useState } from "react";
interface PageProps {
    params: {
        id: string;
    };
}
interface SecretData {
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
}

const SecretDataDetailsPage = ({ params }: PageProps) => {

    const [secretData, setSecretData] = useState<SecretData | null>(null);
    const [loading, setLoading] = useState(true);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const { id } = params;
    console.log(id)
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosPublic
                .get(`/secretdata/${id}`)
                .then((response) => {
                    setSecretData(response.data.data);
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

    if (!secretData) {
        return (
            <div className="text-center text-red-500 mt-20 text-lg">
                অভিযোগ খুঁজে পাওয়া যায়নি।
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-10">
            <div className="container mx-auto bg-white rounded-xl shadow-lg p-8 border border-gray-200">

                <h1 className="text-2xl font-bold text-gray-800 mb-4">অভিযোগের বিস্তারিত</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div>
                        <span className="font-medium text-gray-800">অবস্থা:</span>{" "}
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded">
                            {secretData.status}
                        </span>
                    </div>

                </div>
                <div className="mb-4">
                    <p className="text-sm text-gray-500">
                        অভিযোগ আইডি: <span className="font-mono">{secretData._id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                        জমা দেওয়ার তারিখ:{" "}
                        {new Date(secretData.dateSubmitted).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <div className="mb-4">


                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-blue-600 mb-2">{secretData.subject}</h2>
                        <p className="text-gray-700 leading-relaxed">{secretData.description}</p>
                    </div>

                    {/* Image gallery */}
                    {secretData.images && secretData.images.length > 0 && (
                        <div className="mb-8">
                            <h3 className="text-lg font-medium mb-4">ছবিগুলো</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {secretData.images.map((img, idx) => (
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
            </div>
        </main>
    );
}

export default SecretDataDetailsPage