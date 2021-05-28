import React, { useEffect, useState, useRef } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as FaIcon from 'react-icons/fa'
import moment from 'moment'

import { useHistory, useLocation } from 'react-router-dom'

import Picker, { SKIN_TONE_NEUTRAL } from 'emoji-picker-react'

const Entry = () => {
  const history = useHistory()

  const inputRef = useRef(null)

  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [content, setContent] = useState('')
  const [file_, setFile_] = useState([])
  const [imgSel, setImgSel] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)

  const onEmojiClick = (event, emojiObject) => {
    const { selectionStart, selectionEnd } = inputRef.current
    // replace selected text with clicked emoji
    const content_ =
      content.slice(0, selectionStart) +
      emojiObject.emoji +
      content.slice(selectionEnd)
    setContent(content_)
  }

  let { state: props } = useLocation()

  const updateDiary = () => {
    let datetime_ = moment(datetime).format('yyyy-MM-DD HH:mm:ss')
    const param = {
      datetime: datetime_,
      content,
      title,
      props,
      file: file_,
    }

    diary.updateDiary(param).then((resp) => {
      console.log(resp)
      if (resp.status === 200) {
        setDatetime('')
        setContent('')
        setTitle('')
        setFile_([])
      }
      history.goBack()
    })
  }

  useEffect(() => {
    if (!!props) {
      diary.getDiaryById(props).then(({ data }) => {
        console.log('get a diary ', data)
        setTitle(data.title)
        setDatetime(moment(data.datetime).format('yyyy-MM-DDTHH:mm'))
        setContent(data.content)
        setFile_(data.docs)
      })
    }
  }, [])

  const getFile = async ({ target: { files } }) => {
    let fileArray = []
    for (var i = 0; i < files.length; i++) {
      let reader = new FileReader()
      let file = files[i]
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFile_((prevState) => {
          fileArray = [
            ...prevState,
            { name: file.name, type: file.type, base64: reader.result },
          ]
          return fileArray
        })
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
  }

  const goBack = () => history.goBack()

  const deleteEntry = () => {
    diary.deleteEntry({ id: props.id }).then((resp) => {
      if (resp.status === 200) {
        history.goBack()
      }
    })
  }

  const removeImg = (index) => {
    let files = [...file_]
    files.splice(index, 1)
    setFile_(files)
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
    <div className="table w-full h-full p-10">
      <div className="flex justify-between">
        <Mui.Button variant="contained" color="primary" onClick={goBack}>
          Back
        </Mui.Button>
        {!!props && (
          <Mui.Button
            variant="contained"
            color="secondary"
            onClick={() => setConfirmDelete(true)}
          >
            Delete
          </Mui.Button>
        )}
      </div>
      <div className="py-6 font-bold text-xl text-center">
        {!!props ? 'Edit Entry' : 'New Entry'}
      </div>
      <div className="mb-6">
        <Mui.TextField
          id="date"
          label="Date"
          type="datetime-local"
          variant="outlined"
          value={datetime}
          InputLabelProps={{
            shrink: true,
          }}
          className="w-full"
          onChange={(e) => setDatetime(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Mui.TextField
          label="Title"
          value={title}
          variant="outlined"
          multiline
          className="w-full"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-6">
        Content
        <Mui.TextareaAutosize
          variant="outlined"
          ref={inputRef}
          aria-label="Content"
          className="text-white w-full bg-transparent border rounded-lg overflow-y-scroll"
          rowsMin={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <Picker
          onEmojiClick={onEmojiClick}
          skinTone={SKIN_TONE_NEUTRAL}
          pickerStyle={{ width: '100%' }}
        />
      </div>
      <div className="mb-12">
        <div className="border-dashed border rounded-lg p-4 mb-2 grid md:grid-cols-12 gap-4">
          {file_.length > 0 ? (
            file_.map((f, index) => {
              return (
                <div className="col-span-6 grid grid-cols-12 gap-2" key={index}>
                  {f.type?.indexOf('image') != -1 ? (
                    <div
                      className="col-span-11 cursor-pointer"
                      onClick={() => setImgSel(f.base64)}
                    >
                      <img src={f.base64} />
                    </div>
                  ) : (
                    <div className="col-span-11">
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
                  <div className="col-span-1">
                    <FaIcon.FaTimesCircle
                      className="text-xl cursor-pointer"
                      onClick={() => removeImg(index)}
                    />
                  </div>
                </div>
              )
            })
          ) : (
            <div className="col-span-12">Images Preview Here</div>
          )}
        </div>
        <div className="text-right">
          <Mui.Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              accept="image/*, .pdf"
              multiple
              hidden
              onChange={(e) => getFile(e)}
            />
          </Mui.Button>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full z-10">
        <Mui.Button
          variant="contained"
          color="primary"
          onClick={updateDiary}
          className="w-full py-6"
        >
          submit
        </Mui.Button>
      </div>
      <Mui.Backdrop open={!!imgSel} className="z-10">
        <FaIcon.FaTimesCircle
          className="text-4xl cursor-pointer absolute top-8 right-8"
          onClick={() => setImgSel('')}
        />
        <img src={imgSel} />
      </Mui.Backdrop>
      <Mui.Dialog open={confirmDelete}>
        <Mui.DialogContent>
          Are you sure you want to delete this entry?
        </Mui.DialogContent>
        <Mui.DialogActions>
          <Mui.Button onClick={() => setConfirmDelete(false)} color="primary">
            cancel
          </Mui.Button>
          <Mui.Button onClick={() => deleteEntry()} color="primary" autoFocus>
            yes
          </Mui.Button>
        </Mui.DialogActions>
      </Mui.Dialog>
    </div>
  )
}

export default Entry