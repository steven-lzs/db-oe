import api from './api'

const prefix = '/diary'

const diary = {
  updateDiary(param) {
    return api().post(`${prefix}/updateDiary`, param)
  },
  getAllDiary() {
    return api().post(`${prefix}/getDiary`, {})
  },
  getDiaryById(param) {
    return api().post(`${prefix}/getDiaryById`, param)
  },
  deleteEntry(param) {
    return api().post(`${prefix}/deleteEntry`, param)
  },
}

export default diary
