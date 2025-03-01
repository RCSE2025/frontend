import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface PromoBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  buttonText?: string
  buttonLink?: string
  imageSrc: string
  imageAlt: string
  backgroundColor?: string
  textColor?: string
  direction?: "row" | "row-reverse"
}

export function PromoBanner({
  title,
  description,
  buttonText,
  buttonLink = "#",
  imageSrc,
  imageAlt,
  backgroundColor = "bg-secondary",
  textColor = "text-foreground",
  direction = "row",
  className,
  ...props
}: PromoBannerProps) {
  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden mb-12",
        backgroundColor,
        textColor,
        className
      )} 
      {...props}
    >
      <div className={cn(
        "flex flex-col md:flex-row items-center",
        direction === "row-reverse" && "md:flex-row-reverse"
      )}>
        <div className="flex-1 p-6 md:p-8 lg:p-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
          {description && (
            <p className="text-base mb-6">{description}</p>
          )}
          {buttonText && (
            <Link href={buttonLink}>
              <Button variant="default" className="font-medium">
                {buttonText}
              </Button>
            </Link>
          )}
        </div>
        
        <div className="w-full md:w-2/5 h-[200px] md:h-[300px] relative">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}