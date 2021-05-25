import React, { useEffect, useState } from 'react'
import user from 'api/user'
import * as Mui from '@material-ui/core'

const Overview = () => {
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')

  const getAllDiary = () => {
    user.getAllDiary().then((resp) => {
      console.log('get all diary ', resp)
    })
  }

  const updateDiary = () => {
    const param = {
      date,
      content,
    }
    user.updateDiary(param).then((resp) => {
      console.log('resp ', resp)
      if (resp.status === 200) {
        setDate('')
        setContent('')
      }
    })
  }

  useEffect(() => {
    getAllDiary()
  }, [])

  return (
    <div className="text-center table w-full h-full">
      Overview
      <div>
        <Mui.TextField
          required
          id="outlined-basic"
          label="Date"
          value={date}
          variant="outlined"
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <Mui.TextField
          required
          label="Content"
          value={content}
          multiline
          rows={4}
          variant="outlined"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Mui.Button variant="contained" color="primary" onClick={updateDiary}>
          submit
        </Mui.Button>
      </div>
    </div>
  )
}

export default Overview
