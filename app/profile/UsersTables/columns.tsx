'use client'

import { ColumnDef } from '@tanstack/react-table'
import { IStatisticsUser, IUserStatistics } from '@/shared/api/statistics/types'
import { Award } from 'lucide-react'

export const columns: ColumnDef<IUserStatistics>[] = [
  {
    accessorKey: 'event.title',
    header: 'Название'
  },
  {
    accessorKey: 'event.location',
    header: 'Место проведения'
  },
  {
    accessorKey: 'place',
    header: () => {
      return (
        <div className="flex flex-row">
          <span>Место</span>
          <Award className="self-center" />
        </div>
      )
    }
  },
  {
    accessorKey: 'points',
    header: 'Баллы'
  }
]
