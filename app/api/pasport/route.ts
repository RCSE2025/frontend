import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

function suggestInn(body: any) {
  const url = 'https://service.nalog.ru/inn-proc.do'

  const data = {
    ...body,
    c: 'innMy',
    captcha: '',
    captchaToken: ''
  }

  return axios.post(url, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    const response = await suggestInn(body)

    return NextResponse.json({ data: response.data }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ data: error }, { status: 500 })
  }
}
