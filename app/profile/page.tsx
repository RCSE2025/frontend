'use client'

import { Container } from '@/components/shared/container'
import { HeatMap } from '@/components/shared/heatmap'
import { Title } from '@/components/shared/title'
import { Separator } from '@/components/ui/separator'
import { useStatistics } from '@/shared/store/useStatistics'
import { ChartNoAxesCombined, CircleHelp } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'
import { UsersTable } from './UsersTables/UsersTable'
import { columns } from './UsersTables/columns'
import EquationIcon from './components/EquationIcon'

export default function LK() {
  const {
    selfEventStatistics: statistics,
    selfSummary: summary,
    getSelfEventsStatistics,
    getSelfSummary
  } = useStatistics()

  const router = useRouter()

  const getData = React.useCallback(async () => {
    Promise.all([getSelfEventsStatistics(), getSelfSummary()]).catch((err) => {
      toast.error('Не удалось получить информацию о пользователе')
      router.push('/')
    })
  }, [])

  React.useEffect(() => {
    getData().catch((err) => {})
  }, [])

  return (
    statistics &&
    summary && (
      <Container className="p-5">
        <div className="w-full flex flex-col items-center justify-center mb-5">
          <Title size="xs">Участие в соревнованиях</Title>
          <HeatMap
            className="p-5 w-[55%]"
            values={statistics?.map((s) => ({
              date: new Date(s.event.end_at),
              count: s.points
            }))}
          />
        </div>
        <Separator />
        <div className="flex flex-col gap-2 mt-5 mb-5">
          <div className="flex flex-row items-center gap-1">
            <Title size="xs">Уникальный рейтинг спортсмена:</Title>
            <div className="self-center flex flex-row">
              <ChartNoAxesCombined />
              <span className="text-lg">{summary?.final_rating.toFixed(0)}</span>
            </div>
          </div>
          <div>
            <Title size="xs" className="flex flex-row gap-1">
              <CircleHelp />
              Как мы считаем Ваш рейтинг?
            </Title>
          </div>
          <div>
            <EquationIcon className="dark:invert" />
            <Title size="xs" className="flex flex-col gap-1 mt-5">
              Таким образом, если спортсмен показывает высокие результаты в сложных и актуальных
              соревнованиях, его рейтинг будет высок. Если же результаты старые или получены в
              слабых по уровню мероприятиях, их вклад будет ниже.
            </Title>
          </div>
        </div>
        <Separator />
        <Title className="mt-5" size="xs">
          Результаты
        </Title>
        <UsersTable columns={columns} data={statistics} />
      </Container>
    )
  )
}
