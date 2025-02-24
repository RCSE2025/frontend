'use client'

import { Check, ChevronsUpDown } from 'lucide-react'
import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

export interface IComboBoxOption {
  value: string | number
  label: string
}

interface Props {
  options: IComboBoxOption[]
  onValueChange?: (value: IComboBoxOption) => void
  className?: string
  buttonClassName?: string
  defaultValue?: string
}

export const ComboBox: React.FC<Props> = ({
  options,
  onValueChange,
  className,
  buttonClassName,
  defaultValue: initialValue
}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    const option = options.find((option) => option.label === value)
    option && onValueChange?.(option)
  }, [value, onValueChange, options])

  React.useEffect(() => {
    setValue(initialValue)
    console.log(initialValue)
  }, [initialValue])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-[200px] justify-between', buttonClassName)}
        >
          <div className="w-[calc(100%-1.5rem)] overflow-x-clip">
            {value ? options.find((option) => option.label === value)?.label : 'Выберите опцию...'}
          </div>
          <ChevronsUpDown className="opacity-50 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn('w-[200px] p-0', className)}>
        <Command>
          <CommandInput placeholder="Найти..." />
          <CommandList>
            <CommandEmpty>Не найдено</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? '' : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === option.label ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div>{option.label}</div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
