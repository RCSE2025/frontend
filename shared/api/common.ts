import axios from 'axios'
import { TICKET_SYSTEM, USERS_API } from '../../config'

export const userHttp = axios.create({
  baseURL: USERS_API
})

export const orderHttp = axios.create({
  baseURL: USERS_API
})

export const ticketHttp = axios.create({
  baseURL: TICKET_SYSTEM
})

//
;[userHttp, orderHttp].forEach((http) =>
  http.interceptors.request.use(function (config) {
    const access_token = localStorage.getItem('access_token')

    config.headers['Authorization'] = `Bearer ${access_token}`

    return config
  })
)
