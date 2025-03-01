import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface Category {
  id: string
  title: string
  image: string
  link: string
}

interface CategoryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  categories: Category[]
  columns?: 2 | 3 | 4
}

export function CategoryGrid({
  title,
  categories,
  columns = 4,
  className,
  ...props
}: CategoryGridProps) {
  return (
    <section className={cn("mb-12", className)} {...props}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      
      <div className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        columns === 4 && "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
      )}>
        {categories.map((category) => (
          <Link key={category.id} href={category.link}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="relative w-full aspect-square mb-4">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="text-center font-medium">{category.title}</h3>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}