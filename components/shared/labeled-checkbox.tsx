import React from 'react'
import { Checkbox } from '../ui/checkbox'

interface Props {
  text: string
  value: string
  endAdornment?: React.ReactNode
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
}

export const LabeledCheckbox: React.FC<Props> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        value={value}
        onCheckedChange={onCheckedChange}
        checked={checked}
        className="h-6 w-6 rounded-8px"
        id={`checkbox-${value}`}
      />
      <label htmlFor={`checkbox-${value}`} className="leading-none cursor-pointer flex-1">
        {text}
      </label>
      {endAdornment}
    </div>
  )
}
