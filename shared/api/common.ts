import { USERS_API } from '../../config'
import axios from 'axios'

export const userHttp = axios.create({
  baseURL: USERS_API
})

//
;[userHttp].forEach((http) =>
  http.interceptors.request.use(function (config) {
    const access_token = localStorage.getItem('access_token')

    config.headers['Authorization'] = `Bearer ${access_token}`

    return config
  })
)
