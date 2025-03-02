import { create } from 'zustand'

interface ICartStore {
  products: {
    [key: string | number]: number
  }
  prices: {
    [key: string | number]: number
  }
  updateProductQuantity: (id: string | number, quantity: number) => void
  setProducts: (products: { [key: string | number]: number }) => void
  setPrices: (prices: { [key: string | number]: number }) => void
}

export const useCart = create<ICartStore>((set) => ({
  products: {},
  prices: {},
  updateProductQuantity: (id: string | number, quantity: number) =>
    set((state) => ({ products: { ...state.products, [id]: quantity } })),
  setProducts: (products: { [key: string | number]: number }) => set({ products }),
  setPrices: (prices: { [key: string | number]: number }) => set({ prices })
}))
