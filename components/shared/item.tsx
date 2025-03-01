import Image from 'next/image'
import { useState } from 'react'

interface ItemProps {
  name: string
  description: string
  id: number
  price: number
  quantity: number
  images: string[]
  reviews: number
  rating: number
}

export const ShopItem = ({ name, price, images, reviews, rating }: ItemProps) => {
  return <></>
}
