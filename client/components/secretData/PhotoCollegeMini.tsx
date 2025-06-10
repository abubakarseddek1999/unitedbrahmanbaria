"use client"

import Image from "next/image"

interface PhotoCollageMiniProps {
  images: string[]
  maxDisplay?: number
  onViewAll?: (images: string[]) => void
}

export default function PhotoCollageMini({ images, maxDisplay = 5, onViewAll }: PhotoCollageMiniProps) {
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-32 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-2xl mb-1">📷</div>
          <p className="text-xs">কোন ছবি নেই</p>
        </div>
      </div>
    )
  }

  const displayImages = images.slice(0, maxDisplay)
  const remainingCount = Math.max(0, images.length - maxDisplay)

  const handleViewAllClick = () => {
    if (onViewAll && images && images.length > 0) {
      onViewAll(images)
    }
  }

  // Single image layout
  if (images.length === 1) {
    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <Image
          src={images[0] || "/placeholder.svg?height=200&width=300"}
          alt="Secret data image"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    )
  }

  // Two images layout
  if (images.length === 2) {
    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        {displayImages.map((image, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            <Image
              src={image || "/placeholder.svg?height=200&width=150"}
              alt={`Image ${index + 1}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    )
  }

  // Three images layout
  if (images.length === 3) {
    return (
      <div className="grid grid-cols-2 gap-1 h-48">
        <div className="relative rounded-lg overflow-hidden">
          <Image
            src={displayImages[0] || "/placeholder.svg?height=200&width=150"}
            alt="Image 1"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="grid grid-rows-2 gap-1">
          {displayImages.slice(1, 3).map((image, index) => (
            <div key={index + 1} className="relative rounded-lg overflow-hidden">
              <Image
                src={image || "/placeholder.svg?height=95&width=150"}
                alt={`Image ${index + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Four or more images layout (collage style)
  return (
    <div className="grid grid-cols-2 gap-1 h-48">
      {/* First large image */}
      <div className="row-span-2 relative rounded-lg overflow-hidden">
        <Image
          src={displayImages[0] || "/placeholder.svg?height=200&width=150"}
          alt="Image 1"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Top right */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={displayImages[1] || "/placeholder.svg?height=95&width=150"}
          alt="Image 2"
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Bottom right */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={displayImages[2] || "/placeholder.svg?height=95&width=150"}
          alt="Image 3"
          fill
          className="object-cover"
        />
        {remainingCount > 0 && (
          <div
            onClick={handleViewAllClick}
            className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg cursor-pointer hover:bg-opacity-70 transition-all"
          >
            <span className="text-white text-lg font-semibold">+{remainingCount}</span>
          </div>
        )}
      </div>
    </div>
  )
}
