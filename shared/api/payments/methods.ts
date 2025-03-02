import { userHttp as http } from '../common'

export const createManualOrder = async (address: string) => {
  await http.post('/order/create_order_manual', { address })
}

export const createYookassaOrder = async (address: string) => {
  const response = await http.post('/order/create_order_yookassa', { address })

  return response.data.confirm_url as string
}
