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
        setFile_(data.docs)
      })
    }
  }, [])

  const goBack = () => history.goBack()

  const setImage = (e) => {
    setImgSel(
      <div
        className="h-full w-full bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: 'url(' + e + ')' }}
      ></div>,
    )
  }

  const showDoc = (e) => {
    console.log(e)
    const base64 = e.split(',')[1]
    let pdfWindow = window.open('')
    pdfWindow.document.write(
      "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
        encodeURI(base64) +
        "'></iframe>",
    )
  }

  return (
    <>
      <div className="table w-full h-full md:p-10 p-4">
        <Mui.Button variant="contained" color="primary" onClick={goBack}>
          Back
        </Mui.Button>
        <div className="text-center mb-10">
          <div className="py-6 font-bold text-xl">{title}</div>
          <div>{datetime}</div>
        </div>
        {content && (
          <div className="border rounded-lg whitespace-pre-line p-2 leading-relaxed">
            {content}
          </div>
        )}
        <div>
          <div className="p-4 mb-2 grid md:grid-cols-12 gap-4">
            {file_.map((f, index) => {
              return (
                <div className="col-span-6 grid grid-cols-12 gap-2" key={index}>
                  {f.type?.indexOf('image') != -1 ? (
                    <div
                      className="col-span-12 cursor-pointer"
                      onClick={() => setImage(f.base64)}
                    >
                      <img src={f.base64} />
                    </div>
                  ) : (
                    <div className="col-span-12">
                      <div
                        className="border border-white rounded-lg cursor-pointer p-4 flex bg-red-500"
                        onClick={() => showDoc(f.base64)}
                      >
                        <div className="my-auto text-3xl mr-4">
                          <FaIcon.FaFilePdf />
                        </div>
                        <div>{f.name}</div>
                      </div>
                    </div>
                  )}
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
          {imgSel}
        </Mui.Backdrop>
      </div>
    </>
  )
}

export default View
