'use client'

import { PageModal } from '@/components/shared/modal'
import { PasportForm } from './components/verify_form'
import { Container } from '@/components/shared/container'
import { useUser } from '@/shared/store/useUser'
import axios from 'axios'
import { format } from 'date-fns'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Pasport() {
  const { user, patchUser } = useUser()

  const router = useRouter()

  const suggestInn = async (
    surname: string,
    name: string,
    patronymic: string,
    birthdate: string,
    doctype: string,
    docnumber: string,
    docdate: string
  ) => {
    const url = '/api/pasport'
    const data = {
      fam: surname,
      nam: name,
      otch: patronymic,
      bdate: birthdate,
      doctype: doctype,
      docno: docnumber,
      docdt: docdate,
      c: 'innMy',
      captchaToken: ''
    }

    const response = await axios.post(url, data)

    return response.data.data as {
      code: 0 | 1
      inn: string
    }
  }

  return (
    <Container className="w-[400px] self-center bg-background p-5 border-[1px] border-border rounded-lg mt-10">
      <PasportForm
        onSubmit={async (data) => {
          const docno = data.series + data.number

          const error = () => {
            toast.success('Паспортные данные введены неверно')
          }

          await suggestInn(
            user.surname,
            user.name,
            user.patronymic,
            format(new Date(user.date_of_birth), 'dd.MM.yyyy'),
            '21',
            docno.replace(/(\d{2})(\d{2})(\d{4})/, '$1 $2 $3'),
            format(new Date(data.date), 'dd.MM.yyyy')
          )
            .then(async (res) => {
              if (res.code === 0) {
                error()
                return
              }

              await patchUser({
                is_pasport_verified: true,
                inn: Number(res.inn)
              })

              toast.success('Паспорт успешно проверен')

              router.back()
            })
            .catch(() => {
              error()
            })
        }}
        className="w-auto justify-center bg-background p-5 border-[1px] border-border rounded-lg"
      />
    </Container>
  )
}
