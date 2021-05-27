import React, { useEffect, useState } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as FaIcon from 'react-icons/fa'
import moment from 'moment'

import { useHistory, useLocation } from 'react-router-dom'
import user from 'api/user'

const View = () => {
  const history = useHistory()
  let { state: props } = useLocation()

  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [content, setContent] = useState('')
  const [file_, setFile_] = useState([])
  const [imgSel, setImgSel] = useState('')

  useEffect(() => {
    if (!!props) {
      diary.getDiaryById(props).then(({ data }) => {
        console.log('get a diary ', data)
        setTitle(data.title)
        setDatetime(moment(data.datetime).format('yyyy-MM-DD HH:mmA dddd'))
        setContent(data.content)
        setFile_(data.images)
      })
    }
  }, [])

  const goBack = () => history.goBack()

  return (
    <>
      <div className="table w-full h-full p-10">
        <Mui.Button variant="contained" color="primary" onClick={goBack}>
          Back
        </Mui.Button>
        <div className="text-center mb-10">
          <div className="py-6 font-bold text-xl">{title}</div>
          <div>{datetime}</div>
        </div>
        <div>
          <Mui.TextareaAutosize
            variant="outlined"
            aria-label="Content"
            className="text-white w-full bg-transparent border rounded-lg overflow-y-scroll"
            rowsMin={10}
            value={content}
            inputProps={{ readOnly: true }}
          />
        </div>
        <div>
          <div className="p-4 mb-2 grid md:grid-cols-12 gap-4">
            {file_.map((f, index) => {
              return (
                <div className="col-span-6 grid grid-cols-12 gap-2" key={index}>
                  <div
                    className="col-span-12 cursor-pointer"
                    onClick={() => setImgSel(f)}
                  >
                    <img src={f} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Mui.Backdrop open={!!imgSel} className="z-10">
            <FaIcon.FaTimesCircle
            className="text-4xl cursor-pointer absolute top-8 right-8"
            onClick={() => setImgSel('')}
            />
            <img src={imgSel} />
        </Mui.Backdrop>
      </div>
    </>
  )
}

export default View
