import axios from 'axios'

let url = ''

if (window.location.href.includes('localhost')) {
  // url = "http://chope2-api.localhost/api";
  url = 'http://127.0.0.1:8000/api'
} else {
  url = 'http://api.db-oe.com/api'
}

const BaseApi = axios.create({
  baseURL: url,
  withCredentials: true,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

const Api = () => {
  const token = localStorage.getItem('token')
  if (token != null) {
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return BaseApi
}

BaseApi.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (error) {
    if (error.response.status === 401) {
      window.location.href = '/login'
      return error.response
    }
    if (error.response.status === 429) {
      console.log('Too many requests.')
      window.location.href = '/login'
    }
    if (error.response.status === 403) {
      // window.location.href = "/login";
    }
    if (error.response.status === 404) {
      // store.dispatch("Auth/logout");
      // router.push({ path: '/dashboard' }, () => { })
    }
    if (error.response.status === 500) {
      //   notify(error.response.statusText);
    }
    if (error.response.status === 422) {
      return error.response
    }
    return Promise.reject(error.response)
  },
)

export default Api
