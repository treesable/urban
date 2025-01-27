'use client'
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  className?: string
}

const OptimizedImage = ({ src, alt, className = '' }: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover
          duration-700 ease-in-out
          ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
        `}
        onLoad={() => setIsLoading(false)}
        priority
      />
    </div>
  )
}

export default OptimizedImage 