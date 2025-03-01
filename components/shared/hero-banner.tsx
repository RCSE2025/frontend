import Image from 'next/image'
import Link from 'next/link'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageSrc: string
  imageAlt: string
  overlay?: boolean
  position?: 'left' | 'right' | 'center'
}

export function HeroBanner({
  title,
  description,
  buttonText,
  buttonLink = '#',
  imageSrc,
  imageAlt,
  overlay = true,
  position = 'center',
  className,
  ...props
}: HeroBannerProps) {
  return (
    <div
      className={cn(
        'relative w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-8',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 w-full h-full">
        <Image src={imageSrc} alt={imageAlt} fill className="object-cover" priority />
        {overlay && <div className="absolute inset-0 bg-black/30" />}
      </div>

      <div
        className={cn(
          'relative h-full flex flex-col justify-center text-white p-6 md:p-12 max-w-xl',
          position === 'left' && 'items-start',
          position === 'right' && 'items-end ml-auto',
          position === 'center' && 'items-center mx-auto text-center'
        )}
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{title}</h1>
        {description && <p className="text-base md:text-lg mb-6">{description}</p>}
        {buttonText && (
          <Link href={buttonLink}>
            <Button size="lg" className="font-medium">
              {buttonText}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
