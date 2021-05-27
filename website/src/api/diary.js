import api from './api'

const diary = {
  updateDiary(param) {
    return api().post(`/updateDiary`, param)
  },
  getAllDiary() {
    return api().post(`/getDiary`, {})
  },
  getDiaryById(param) {
    return api().post(`/getDiaryById`, param)
  },
  deleteEntry(param) {
    return api().post(`/deleteEntry`, param)
  },
}

export default diary
