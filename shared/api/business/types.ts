import type { DaDataApi } from 'dadata-api'

export type GetBusinessResponse = DaDataApi.Suggestion<DaDataApi.Party>

export interface CreateBusiness {
  address: string
  full_name: string
  inn: number
  ogrn: number
  owner: string
  short_name: string
}
