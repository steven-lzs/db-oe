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
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!!props) {
      setLoading(true)
      diary.getDiaryById(props).then(({ data }) => {
        console.log('get a diary ', data)
        setLoading(false)
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
        <div className="border-2 border-rose-600 rounded-full shadow-pop-rose inline-block">
          <Mui.Button
            className="normal-case text-white px-8 py-2 rounded-full font-sans"
            onClick={goBack}
          >
            Back
          </Mui.Button>
        </div>
        <div className="text-center mb-10">
          <div className="py-6 font-bold text-xl">{title}</div>
          <div>{datetime}</div>
        </div>
        {content && (
          <div className="bg-gray-800 rounded-lg whitespace-pre-line p-2 leading-relaxed">
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
        <Mui.Backdrop
          open={!!imgSel}
          className="z-10 backdrop-filter backdrop-blur-sm"
        >
          <FaIcon.FaTimesCircle
            className="text-4xl cursor-pointer absolute top-8 right-8"
            onClick={() => setImgSel('')}
          />
          {imgSel}
        </Mui.Backdrop>
        <Mui.Backdrop
          open={loading}
          className="z-10 backdrop-filter backdrop-blur-sm"
        >
          <div className="animate-bounce">
            <Mui.CircularProgress
              color="inherit"
              className="text-rose-600 shadow-pop-rose rounded-full"
            />
          </div>
        </Mui.Backdrop>
      </div>
    </>
  )
}

export default View
