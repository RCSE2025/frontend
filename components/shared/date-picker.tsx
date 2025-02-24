'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ru } from 'date-fns/locale'
import React from 'react'

interface Props {
  setSelection?: (range: { from: Date; to: Date }) => void
  selection?: { from: Date; to: Date }
}

export const DatePicker: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  setSelection: setSelection,
  selection
}) => {
  const [selected, setSelected] = React.useState<{ from: Date; to: Date }>()

  React.useEffect(() => {
    if (setSelection && selected) {
      setSelection(selected)
    }
  }, [selected, setSelection])

  React.useEffect(() => {
    if (selection) {
      setSelected(selection)
    }
  }, [selection])

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={selected}
          onSelect={(range) => {
            setSelected({
              from: range?.from || new Date(),
              to: range?.to || range?.from || new Date()
            })
          }}
          locale={ru}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
