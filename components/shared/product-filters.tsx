import { Check, ChevronDown, ChevronUp } from 'lucide-react'
import * as React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { cn } from '@/lib/utils'
import type { ProductFilters } from '@/shared/types'
import { ProductCategory, productCategoryMap } from '@/shared/types'

interface ProductFiltersProps {
  filters: ProductFilters
  onFilterChange: (filters: ProductFilters) => void
  availableCategories?: ProductCategory[]
  availableBrands?: string[]
  minPrice?: number
  maxPrice?: number
  className?: string
}

export function ProductFilters({
  filters,
  onFilterChange,
  availableCategories = Object.values(ProductCategory),
  availableBrands = [],
  minPrice = 1,
  maxPrice = 100_000_000,
  className
}: ProductFiltersProps) {
  const [expanded, setExpanded] = React.useState({
    categories: true,
    price: true,
    brands: true,
    rating: true,
    other: true
  })

  const toggleSection = (section: keyof typeof expanded) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCategoryChange = (category: ProductCategory, checked: boolean) => {
    const updatedCategories = checked
      ? [...(filters.categories || []), category]
      : (filters.categories || []).filter((c) => c !== category)

    onFilterChange({
      ...filters,
      categories: updatedCategories.length > 0 ? updatedCategories : undefined
    })
  }

  const handlePriceChange = (value: number[]) => {
    onFilterChange({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1]
      }
    })
  }

  const handleBrandChange = (brand: string, checked: boolean) => {
    const updatedBrands = checked
      ? [...(filters.brands || []), brand]
      : (filters.brands || []).filter((b) => b !== brand)

    onFilterChange({
      ...filters,
      brands: updatedBrands.length > 0 ? updatedBrands : undefined
    })
  }

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? undefined : rating
    })
  }

  const handleInStockChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      inStock: checked || undefined
    })
  }

  const handleOnSaleChange = (checked: boolean) => {
    onFilterChange({
      ...filters,
      onSale: checked || undefined
    })
  }

  const handleSortChange = (value: ProductFilters['sortBy']) => {
    onFilterChange({
      ...filters,
      sortBy: value
    })
  }

  const handleClearFilters = () => {
    onFilterChange({})
  }

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== undefined && (!Array.isArray(value) || value.length > 0)
  )

  return (
    <div className={cn('w-full space-y-4', className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Фильтры</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Сбросить все
          </Button>
        )}
      </div>

      {/* Активные фильтры */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.categories?.map((category) => (
            <Badge key={category} variant="secondary" className="flex items-center gap-1">
              {productCategoryMap[category]}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleCategoryChange(category, false)}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.priceRange && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.priceRange.min} - {filters.priceRange.max} ₽
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onFilterChange({ ...filters, priceRange: undefined })}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.brands?.map((brand) => (
            <Badge key={brand} variant="secondary" className="flex items-center gap-1">
              {brand}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => handleBrandChange(brand, false)}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.rating && (
            <Badge variant="secondary" className="flex items-center gap-1">
              {filters.rating}+ звезд
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onFilterChange({ ...filters, rating: undefined })}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.inStock && (
            <Badge variant="secondary" className="flex items-center gap-1">
              В наличии
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onFilterChange({ ...filters, inStock: undefined })}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          )}
          {filters.onSale && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Со скидкой
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => onFilterChange({ ...filters, onSale: undefined })}
              >
                <Check className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      <Separator />

      {/* Категории */}
      <div>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-0 font-medium"
          onClick={() => toggleSection('categories')}
        >
          <span>Категории</span>
          {expanded.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {expanded.categories && (
          <div className="mt-2 space-y-2">
            {availableCategories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={filters.categories?.includes(category) || false}
                  onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {productCategoryMap[category]}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Цена */}
      <div>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-0 font-medium"
          onClick={() => toggleSection('price')}
        >
          <span>Цена</span>
          {expanded.price ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expanded.price && (
          <div className="mt-4 px-2">
            <Slider
              defaultValue={[
                filters.priceRange?.min || minPrice,
                filters.priceRange?.max || maxPrice
              ]}
              min={minPrice}
              max={maxPrice}
              step={100}
              onValueChange={handlePriceChange}
              className="mb-6"
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">{filters.priceRange?.min || minPrice} ₽</span>
              <span className="text-sm">{filters.priceRange?.max || maxPrice} ₽</span>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Бренды */}
      {availableBrands.length > 0 && (
        <>
          <div>
            <Button
              variant="ghost"
              className="flex w-full items-center justify-between p-0 font-medium"
              onClick={() => toggleSection('brands')}
            >
              <span>Бренды</span>
              {expanded.brands ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
            {expanded.brands && (
              <div className="mt-2 space-y-2">
                {availableBrands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands?.includes(brand) || false}
                      onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
                    />
                    <label
                      htmlFor={`brand-${brand}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {brand}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Separator />
        </>
      )}

      {/* Рейтинг */}
      <div>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-0 font-medium"
          onClick={() => toggleSection('rating')}
        >
          <span>Рейтинг</span>
          {expanded.rating ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {expanded.rating && (
          <div className="mt-2 space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-2">
                <Checkbox
                  id={`rating-${rating}`}
                  checked={filters.rating === rating}
                  onCheckedChange={(checked) =>
                    checked ? handleRatingChange(rating) : handleRatingChange(0)
                  }
                />
                <label
                  htmlFor={`rating-${rating}`}
                  className="flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <svg
                        key={i}
                        className={cn(
                          'h-4 w-4',
                          i < rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 fill-gray-300'
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  <span className="ml-1">и выше</span>
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Другие фильтры */}
      <div>
        <Button
          variant="ghost"
          className="flex w-full items-center justify-between p-0 font-medium"
          onClick={() => toggleSection('other')}
        >
          <span>Другие фильтры</span>
          {expanded.other ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
        {expanded.other && (
          <div className="mt-2 space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="in-stock"
                checked={filters.inStock || false}
                onCheckedChange={(checked) => handleInStockChange(checked as boolean)}
              />
              <label
                htmlFor="in-stock"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Только в наличии
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="on-sale"
                checked={filters.onSale || false}
                onCheckedChange={(checked) => handleOnSaleChange(checked as boolean)}
              />
              <label
                htmlFor="on-sale"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Со скидкой
              </label>
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Сортировка */}
      <div>
        <h3 className="mb-2 font-medium">Сортировка</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={filters.sortBy === 'price-asc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('price-asc')}
          >
            Сначала дешевле
          </Button>
          <Button
            variant={filters.sortBy === 'price-desc' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('price-desc')}
          >
            Сначала дороже
          </Button>
          <Button
            variant={filters.sortBy === 'rating' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('rating')}
          >
            По рейтингу
          </Button>
          <Button
            variant={filters.sortBy === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleSortChange('newest')}
          >
            Новинки
          </Button>
        </div>
      </div>
    </div>
  )
}
