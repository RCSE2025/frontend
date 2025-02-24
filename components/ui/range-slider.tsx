'use client'

import React, { useEffect, useState } from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/lib/utils'

interface SliderProps {
  className?: string
  min: number
  max: number
  step: number
  formatLabel?: (value: number) => string
  value?: number[] | ReadonlyArray<number>
  onValueChange?: (value: number[]) => void
}

export const RangeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    { className, min, max, step, formatLabel, value, onValueChange, ...props }: SliderProps,
    ref
  ) => {
    const initialValue = value || [min, max]
    const [values, setValues] = useState(initialValue)

    useEffect(() => {
      setValues(value || [min, max])
    }, [min, max, value])

    const handleValueChange = (value: number[]) => {
      setValues(value)
      onValueChange?.(value)
    }

    return (
      <SliderPrimitive.Root
        ref={ref}
        min={min}
        max={max}
        step={step}
        value={values as number[]}
        onValueChange={handleValueChange}
        className={cn('relative flex w-full touch-none select-none mb-6 items-center', className)}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-primary/20">
          <SliderPrimitive.Range className="absolute h-full bg-primary" />
        </SliderPrimitive.Track>
        {values.map((value, index) => (
          <React.Fragment key={index}>
            <div
              className="absolute text-center top-[10px]"
              style={{
                left: `calc(${((value - min) / (max - min)) * 100}% + 0px)`
              }}
            >
              <span className="text-sm">{formatLabel?.(value) || value}</span>
            </div>
            <SliderPrimitive.Thumb
              className={cn(
                'block h-4 w-4 rounded-full border border-primary/50 bg-white shadow transition-colors focus-visible:outline-none',
                'focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer'
              )}
            />
          </React.Fragment>
        ))}
      </SliderPrimitive.Root>
    )
  }
)

RangeSlider.displayName = 'RangeSlider'
