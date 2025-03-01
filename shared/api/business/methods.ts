import axios from 'axios'
import { userHttp as http } from '../common'
import { CheckSelfEmployedResponse, CreateBusiness, GetBusinessResponse } from './types'

export const getBusinessInfo = async (inn: number): Promise<GetBusinessResponse | undefined> => {
  const response = await http.get(`/business/get_business_info/${inn}`)

  const suggestions = response.data.suggestions

  if (suggestions.length === 0) return undefined

  return suggestions[0]
}

export const createBusiness = async (req: CreateBusiness) => {
  await http.post('/business', req)
}

export const checkStatus = async (inn: number): Promise<CheckSelfEmployedResponse> => {
  const dateStr = new Date().toISOString().substring(0, 10)
  const url = 'https://statusnpd.nalog.ru/api/v1/tracker/taxpayer_status'

  const data = {
    inn: inn,
    requestDate: dateStr
  }

  const resp = await axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return resp.data
}
