import React, { useEffect, useState } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as BsIcon from 'react-icons/bs'
import moment from 'moment'

import { useHistory } from 'react-router-dom'
import user from 'api/user'

const Overview = () => {
  const history = useHistory()
  const toNewEntry = (state = null) => {
    history.push({ pathname: '/entry', state })
  }
  const toView = (state = null) => {
    history.push({ pathname: '/view', state })
  }

  const [list, setList] = useState([])
  const [openEditOrView, setOpenEditOrView] = useState('')

  const getAllDiary = () => {
    diary.getAllDiary().then((resp) => {
      console.log('get all diary ', resp)
      if (resp.status === 200) {
        setList(resp.data)
      }
    })
  }

  useEffect(() => {
    getAllDiary()
  }, [])

  const logout = () => {
    user.logout().then((resp) => {
      if (resp.status === 200) {
        history.replace('/login')
        localStorage.removeItem('token');
      }
    })
  }

  const editOrView = (type, param = null) => {
    if (type == 'edit') {
      toNewEntry(param)
    }
    if (type == 'view') {
      toView(param)
    }
  }

  return (
    <>
      <div className="table w-full h-full">
        <div className="py-6 font-bold text-xl text-center">Overview</div>
        <Mui.Button
          className="absolute right-8 top-8"
          variant="contained"
          color="primary"
          onClick={() => logout()}
        >
          Log Out
        </Mui.Button>
        <div className="mb-6">
          <div>Total {list.length} Entry</div>
          {list.length ? (
            list.map(({ id, content, datetime, title, diary_id }) => {
              return (
                <>
                  <div className="border-b border-perfume" key={id}>
                    <Mui.Card
                      className="my-2"
                      onClick={() => setOpenEditOrView(id)}
                    >
                      <Mui.CardContent>
                        <Mui.Typography
                          gutterBottom
                          component="h5"
                          variant="h5"
                          className="line-clamp-1 font-bold"
                        >
                          {title ? title : ''}
                        </Mui.Typography>
                        <Mui.Typography
                          gutterBottom
                          variant="body2"
                          component="p"
                          className="line-clamp-3"
                        >
                          {content} ...
                        </Mui.Typography>
                        <div className="flex justify-between">
                          <span>{moment(datetime).format('DD MMM yyyy')}</span>
                          <span>{moment(datetime).format('dddd')}</span>
                          <span className="italic">
                            {moment(datetime).format('hh:mm A')}
                          </span>
                        </div>
                      </Mui.CardContent>
                      {openEditOrView == id && (
                        <Mui.CardActions className="flex justify-between">
                          <Mui.Button
                            size="medium"
                            color="secondary"
                            onClick={() => editOrView('edit', { id, diary_id })}
                          >
                            edit
                          </Mui.Button>
                          <Mui.Button
                            size="medium"
                            color="secondary"
                            onClick={() => editOrView('view', { id, diary_id })}
                          >
                            view
                          </Mui.Button>
                        </Mui.CardActions>
                      )}
                    </Mui.Card>
                  </div>
                </>
              )
            })
          ) : (
            <Mui.Backdrop open={true} className="z-10">
              <Mui.CircularProgress color="inherit" />
            </Mui.Backdrop>
          )}
        </div>
      </div>
      <Mui.Fab
        className="fixed bottom-10 right-10"
        onClick={() => toNewEntry()}
      >
        <BsIcon.BsPlus className="text-4xl" />
      </Mui.Fab>
    </>
  )
}

export default Overview
