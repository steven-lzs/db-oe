import api from './api'

const prefix = '/user';

const user = {
  login(param) {
    return api().post(`${prefix}/login`, param);
  },
  logout() {
    return api().post(`${prefix}/logout`, {})
  },
}

export default user
