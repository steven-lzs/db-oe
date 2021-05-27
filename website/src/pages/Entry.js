import React, { useEffect, useState } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as FaIcon from 'react-icons/fa'
import moment from 'moment'

import { useHistory, useLocation } from 'react-router-dom'

const Entry = () => {
  const history = useHistory()

  const [title, setTitle] = useState('')
  const [datetime, setDatetime] = useState('')
  const [content, setContent] = useState('')
  const [file_, setFile_] = useState([])
  const [imgSel, setImgSel] = useState('')
  const [confirmDelete, setConfirmDelete] = useState(false)
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
        setFile_(data.images)
      })
    }
  }, [])

  const getFile = async ({ target: { files } }) => {
    let fileArray = []
    for (var file of files) {
      let reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setFile_((prevState) => {
          fileArray = [...prevState, reader.result]
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
          aria-label="Content"
          className="text-white w-full bg-transparent border rounded-lg overflow-y-scroll"
          rowsMin={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mb-12">
        <div className="border-dashed border rounded-lg p-4 mb-2 grid md:grid-cols-12 gap-4">
          {file_.length > 0
            ? file_.map((f, index) => {
                return (
                  <div
                    className="col-span-6 grid grid-cols-12 gap-2"
                    key={index}
                  >
                    <div
                      className="col-span-11 cursor-pointer"
                      onClick={() => setImgSel(f)}
                    >
                      <img src={f} />
                    </div>
                    <div className="col-span-1">
                      <FaIcon.FaTimesCircle
                        className="text-xl cursor-pointer"
                        onClick={() => removeImg(index)}
                      />
                    </div>
                  </div>
                )
              })
            : 'Images Preview Here'}
        </div>
        <div className="text-right">
          <Mui.Button variant="contained" component="label">
            Upload File
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={(e) => getFile(e)}
            />
          </Mui.Button>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full">
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
