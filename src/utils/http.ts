import axios from 'axios'

const http = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

http.interceptors.request.use(config => {
  return config
})

http.interceptors.response.use(response => {
  return response.data
})




export default http
