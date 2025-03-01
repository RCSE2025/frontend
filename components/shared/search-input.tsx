import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface SearchInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  className?: string
}

export function SearchInput({
  placeholder = "Поиск товаров...",
  value = "",
  onChange,
  onSearch,
  className,
  ...props
}: SearchInputProps) {
  const [searchValue, setSearchValue] = React.useState(value)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    onChange?.(e.target.value)
  }

  const handleSearch = () => {
    onSearch?.(searchValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className={cn("relative flex w-full max-w-lg items-center", className)} {...props}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="pr-10"
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3"
        onClick={handleSearch}
        aria-label="Поиск"
      >
        <Search className="h-4 w-4" />
      </Button>
    </div>
  )
}