import axios from 'axios'

let url = ''
let csrf_url = ''

if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
  // url = "http://chope2-api.localhost/api";
  url = 'http://127.0.0.1:8000/api'
} else {
  url = 'http://api.db-oe.com/api'
}

if (window.location.href.includes('localhost') || window.location.href.includes('127.0.0.1')) {
  // url = "http://chope2-api.localhost/api";
  csrf_url = 'http://127.0.0.1:8000'
} else {
  csrf_url = 'http://api.db-oe.com'
}

const BaseApi = axios.create({
  baseURL: url,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
})

BaseApi.defaults.withCredentials = true;

const Api = () => {
  const token = localStorage.getItem('token')
  if (token != null) {
    BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
  return BaseApi
}

Api().get(`${csrf_url}/sanctum/csrf-cookie`); //get csrf cookie

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
