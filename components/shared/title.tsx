import clsx from 'clsx'
import React from 'react'

enum TitleSize {
  xs = 'h5',
  sm = 'h4',
  md = 'h3',
  lg = 'h2',
  xl = 'h1',
  '2xl' = 'h1'
}

interface Props {
  size?: keyof typeof TitleSize
  className?: string
  text?: string
}

export const Title: React.FC<React.PropsWithChildren<Props>> = ({
  size = 'sm',
  className,
  text,
  children
}) => {
  const mapClassNameBySize = {
    xs: 'text-[16px]',
    sm: 'text-[22px]',
    md: 'text-[26px]',
    lg: 'text-[28px]',
    xl: 'text-[40px]',
    '2xl': 'text-[48px]'
  } as const

  return React.createElement(
    TitleSize[size],
    {
      className: clsx(mapClassNameBySize[size], className)
    },
    text || children
  )
}
