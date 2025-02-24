import { EVENTS_API } from '@/config'
import { Link as LinkIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

interface Props {
  id: number | string
}

export const Results: React.FC<Props> = ({ id }) => {
  return (
    <Link href={`${EVENTS_API}/statistics/events/excel/${id}`} download className="underline mt-5">
      <Button className="flex gap-2">
        <LinkIcon />
        Скачать отчёт
      </Button>
    </Link>
  )
}
