import { userHttp as http } from '../common'
import { CreateBusiness, GetBusinessResponse } from './types'

export const getBusinessInfo = async (inn: number): Promise<GetBusinessResponse | undefined> => {
  const response = await http.get(`/business/get_business_info/${inn}`)

  const suggestions = response.data.suggestions

  if (suggestions.length === 0) return undefined

  return suggestions[0]
}

export const createBusiness = async (req: CreateBusiness) => {
  await http.post('/business', req)
}
