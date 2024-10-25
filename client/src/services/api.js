import axios from 'axios'

export default () => {
  const api = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000,
    withCredentials: 'include',
  })

  api.interceptors.request.use(req => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      req.headers.Authorization = `Bearer ${token}`
    }
    return req
  })

  // interceptor for response errors

  return api
}
