"use client"

import * as React from "react"
import { useSearchParams, useRouter } from "next/navigation"

import { Container } from "@/components/shared/container"
import { SearchInput } from "@/components/shared/search-input"
import { ProductFilters } from "@/components/shared/product-filters"
import { ProductCard } from "@/components/shared/product-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ProductCategory, type ProductFilters as Filters } from "@/shared/types"

// Моковые данные для демонстрации
const allProducts = [
  {
    id: '1',
    title: 'Беспроводные наушники с шумоподавлением',
    price: 199.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop',
    discount: 15,
    category: ProductCategory.ELECTRONICS,
    brand: 'SoundMaster'
  },
  {
    id: '2',
    title: 'Умные часы с мониторингом здоровья',
    price: 249.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
    category: ProductCategory.ELECTRONICS,
    brand: 'TechWear'
  },
  {
    id: '3',
    title: 'Портативная Bluetooth колонка водонепроницаемая',
    price: 89.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=2069&auto=format&fit=crop',
    discount: 10,
    category: ProductCategory.ELECTRONICS,
    brand: 'SoundMaster'
  },
  {
    id: '4',
    title: 'Профессиональная камера 4K с стабилизацией',
    price: 799.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=2070&auto=format&fit=crop',
    category: ProductCategory.ELECTRONICS,
    brand: 'OptiView'
  },
  {
    id: '5',
    title: 'Ультратонкий ноутбук с сенсорным экраном',
    price: 1299.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop',
    category: ProductCategory.ELECTRONICS,
    brand: 'TechPro'
  },
  {
    id: '6',
    title: 'Умная лампа с голосовым управлением',
    price: 49.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1507643179773-3e975d7ac515?q=80&w=1932&auto=format&fit=crop',
    discount: 20,
    category: ProductCategory.HOME,
    brand: 'SmartHome'
  },
  {
    id: '7',
    title: 'Беспроводная зарядная станция для нескольких устройств',
    price: 79.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=2070&auto=format&fit=crop',
    category: ProductCategory.ELECTRONICS,
    brand: 'PowerTech'
  },
  {
    id: '8',
    title: 'Игровая консоль нового поколения',
    price: 499.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?q=80&w=2072&auto=format&fit=crop',
    discount: 5,
    category: ProductCategory.ELECTRONICS,
    brand: 'GameMaster'
  },
  {
    id: '9',
    title: 'Умный термостат с Wi-Fi',
    price: 129.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?q=80&w=2080&auto=format&fit=crop',
    category: ProductCategory.HOME,
    brand: 'SmartHome'
  },
  {
    id: '10',
    title: 'Робот-пылесос с самоочисткой',
    price: 349.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
    discount: 12,
    category: ProductCategory.HOME,
    brand: 'CleanTech'
  },
  {
    id: '11',
    title: 'Электрическая зубная щетка с датчиком давления',
    price: 89.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1559766025-08fc9f6f8e4e?q=80&w=2070&auto=format&fit=crop',
    category: ProductCategory.BEAUTY,
    brand: 'HealthTech'
  },
  {
    id: '12',
    title: 'Кофемашина с автоматическим капучинатором',
    price: 299.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=2070&auto=format&fit=crop',
    discount: 8,
    category: ProductCategory.HOME,
    brand: 'BrewMaster'
  },
  {
    id: '13',
    title: 'Спортивные кроссовки для бега',
    price: 129.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
    category: ProductCategory.SPORTS,
    brand: 'SportPro'
  },
  {
    id: '14',
    title: 'Фитнес-браслет с GPS и пульсометром',
    price: 149.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop',
    discount: 15,
    category: ProductCategory.ELECTRONICS,
    brand: 'FitTech'
  },
  {
    id: '15',
    title: 'Стильная сумка для ноутбука',
    price: 79.99,
    rating: 4.2,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2070&auto=format&fit=crop',
    category: ProductCategory.FASHION,
    brand: 'UrbanStyle'
  },
  {
    id: '16',
    title: 'Набор кухонных ножей из нержавеющей стали',
    price: 199.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=2036&auto=format&fit=crop',
    category: ProductCategory.HOME,
    brand: 'ChefChoice'
  }
]

// Получение уникальных брендов из данных
const availableBrands = Array.from(new Set(allProducts.map(product => product.brand).filter(Boolean))) as string[]

export default function CatalogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  // Парсинг параметров из URL
  const initialFilters: Filters = React.useMemo(() => {
    const query = searchParams.get('query')
    const categories = searchParams.get('categories')?.split(',').map(c => c as ProductCategory)
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
      priceRange: (minPrice || maxPrice) ? {
        min: minPrice ? parseInt(minPrice) : 0,
        max: maxPrice ? parseInt(maxPrice) : 10000
      } : undefined,
      rating: rating ? parseInt(rating) : undefined,
      inStock: inStock === 'true' ? true : undefined,
      onSale: onSale === 'true' ? true : undefined,
      sortBy: sortBy || undefined
    }
  }, [searchParams])

  const [filters, setFilters] = React.useState<Filters>(initialFilters)
  const [searchValue, setSearchValue] = React.useState(initialFilters.searchQuery || '')

  // Применение фильтров к товарам
  const filteredProducts = React.useMemo(() => {
    return allProducts.filter(product => {
      // Поиск по запросу
      if (filters.searchQuery && !product.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false
      }

      // Фильтрация по категориям
      if (filters.categories && !filters.categories.includes(product.category as ProductCategory)) {
        return false
      }

      // Фильтрация по брендам
      if (filters.brands && product.brand && !filters.brands.includes(product.brand)) {
        return false
      }

      // Фильтрация по цене
      if (filters.priceRange) {
        const { min, max } = filters.priceRange
        if (product.price < min || product.price > max) {
          return false
        }
      }

      // Фильтрация по рейтингу
      if (filters.rating && product.rating < filters.rating) {
        return false
      }

      // Фильтрация по наличию скидки
      if (filters.onSale && !product.discount) {
        return false
      }

      return true
    }).sort((a, b) => {
      // Сортировка
      if (filters.sortBy === 'price-asc') {
        return a.price - b.price
      }
      if (filters.sortBy === 'price-desc') {
        return b.price - a.price
      }
      if (filters.sortBy === 'rating') {
        return b.rating - a.rating
      }
      // По умолчанию сортировка по новизне (по ID в обратном порядке)
      return parseInt(b.id) - parseInt(a.id)
    })
  }, [filters])

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
    setFilters(prev => ({
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
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Найдено {filteredProducts.length} товаров
              </p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant={filters.sortBy === 'price-asc' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterChange({...filters, sortBy: 'price-asc'})}
                >
                  По цене ↑
                </Button>
                <Button 
                  variant={filters.sortBy === 'price-desc' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterChange({...filters, sortBy: 'price-desc'})}
                >
                  По цене ↓
                </Button>
                <Button 
                  variant={filters.sortBy === 'rating' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => handleFilterChange({...filters, sortBy: 'rating'})}
                >
                  По рейтингу
                </Button>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      rating: product.rating,
                      image: product.image,
                      discount: product.discount,
                      category: product.category.toString()
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
                <Button onClick={() => handleFilterChange({})}>
                  Сбросить все фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}