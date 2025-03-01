'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { Container } from '@/components/shared/container'
import { ProductCard } from '@/components/shared/product-card'
import { ProductFilters } from '@/components/shared/product-filters'
import { SearchInput } from '@/components/shared/search-input'
import { Button } from '@/components/ui/button'
import { IProduct, IProductFilterOptions, productApi } from '@/shared/api/product'
import { ProductCategory, type ProductFilters as Filters } from '@/shared/types'

export default function CatalogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Парсинг параметров из URL
  const initialFilters: Filters = React.useMemo(() => {
    const query = searchParams.get('query')
    const categories = searchParams
      .get('categories')
      ?.split(',')
      .map((c) => c as ProductCategory)
    const brands = searchParams.get('brands')?.split(',')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const rating = searchParams.get('rating')
    const inStock = searchParams.get('inStock')
    const onSale = searchParams.get('onSale')
    const sortBy = searchParams.get('sortBy') as Filters['sortBy']

    return {
      searchQuery: query || undefined,
      categories: categories || undefined,
      brands: brands || undefined,
      priceRange:
        minPrice || maxPrice
          ? {
              min: minPrice ? parseInt(minPrice) : 0,
              max: maxPrice ? parseInt(maxPrice) : 10000
            }
          : undefined,
      rating: rating ? parseInt(rating) : undefined,
      inStock: inStock === 'true' ? true : undefined,
      onSale: onSale === 'true' ? true : undefined,
      sortBy: sortBy || undefined
    }
  }, [searchParams])

  const [filters, setFilters] = React.useState<Filters>(initialFilters)
  const [searchValue, setSearchValue] = React.useState(initialFilters.searchQuery || '')
  const [products, setProducts] = React.useState<IProduct[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [availableBrands, setAvailableBrands] = React.useState<string[]>([])

  // Загрузка продуктов с использованием API
  const fetchProducts = React.useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const filterOptions: IProductFilterOptions = {
        categories: filters.categories,
        brands: filters.brands,
        in_stock: filters.inStock,
        on_sale: filters.onSale,
        rating: filters.rating,
        search_query: filters.searchQuery,
        sort_by: filters.sortBy
      }

      const response = await productApi.getAllProductsFilter(filterOptions)
      setProducts(response)

      setAvailableBrands([]) // В API нет поля brand, поэтому пока оставим пустым
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при загрузке товаров')
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters])

  // Загрузка продуктов при изменении фильтров
  React.useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  // Обновление URL при изменении фильтров
  React.useEffect(() => {
    const params = new URLSearchParams()

    if (filters.searchQuery) {
      params.set('query', filters.searchQuery)
    }

    if (filters.categories && filters.categories.length > 0) {
      params.set('categories', filters.categories.join(','))
    }

    if (filters.brands && filters.brands.length > 0) {
      params.set('brands', filters.brands.join(','))
    }

    if (filters.priceRange) {
      params.set('minPrice', filters.priceRange.min.toString())
      params.set('maxPrice', filters.priceRange.max.toString())
    }

    if (filters.rating) {
      params.set('rating', filters.rating.toString())
    }

    if (filters.inStock) {
      params.set('inStock', 'true')
    }

    if (filters.onSale) {
      params.set('onSale', 'true')
    }

    if (filters.sortBy) {
      params.set('sortBy', filters.sortBy)
    }

    const queryString = params.toString()
    router.push(queryString ? `?${queryString}` : '/catalog', { scroll: false })
  }, [filters, router])

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      searchQuery: value || undefined
    }))
  }

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters)
  }

  return (
    <Container>
      <div className="py-6">
        <h1 className="text-3xl font-bold mb-6">Каталог товаров</h1>

        <div className="mb-6">
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            onSearch={handleSearch}
            placeholder="Поиск товаров..."
            className="max-w-full"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {/* Фильтры */}
          <div className="md:col-span-1">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              availableCategories={Object.values(ProductCategory)}
              availableBrands={availableBrands}
              minPrice={0}
              maxPrice={2000}
            />
          </div>

          {/* Список товаров */}
          <div className="md:col-span-3">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <p>Загрузка товаров...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-lg font-medium mb-2 text-red-500">{error}</p>
                <Button onClick={() => fetchProducts()}>Повторить загрузку</Button>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">Найдено {products.length} товаров</p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={filters.sortBy === 'price-asc' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange({ ...filters, sortBy: 'price-asc' })}
                    >
                      По цене ↑
                    </Button>
                    <Button
                      variant={filters.sortBy === 'price-desc' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange({ ...filters, sortBy: 'price-desc' })}
                    >
                      По цене ↓
                    </Button>
                    <Button
                      variant={filters.sortBy === 'rating' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleFilterChange({ ...filters, sortBy: 'rating' })}
                    >
                      По рейтингу
                    </Button>
                  </div>
                </div>

                {products.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={{
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          rating: product.rating,
                          image: product.images.at(0)?.url || '',
                          category: product.category
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <p className="text-lg font-medium mb-2">Товары не найдены</p>
                    <p className="text-muted-foreground text-center mb-4">
                      Попробуйте изменить параметры поиска или фильтры
                    </p>
                    <Button onClick={() => handleFilterChange({})}>Сбросить все фильтры</Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
