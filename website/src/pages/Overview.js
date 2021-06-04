import React, { useEffect, useState } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as BsIcon from 'react-icons/bs'
import moment from 'moment'
import Zoom from 'react-reveal/Zoom'

import { useHistory } from 'react-router-dom'
// import VisibilitySensor from  'react-visibility-sensor';
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
        localStorage.removeItem('token')
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

  // const setOpenEditOrView_ = (id) => {
  //   setOpenEditOrView((prevState) => {
  //     if(prevState == id) false
  //   })
  // }

  return (
    <>
      <div className="table w-full h-full">
        <div className="py-6 font-bold text-xl text-center">Overview</div>
        <Mui.Button
          className="absolute right-8 top-8 normal-case rounded-full py-3 bg-rose-600 shadow-rose text-white font-sans"
          variant="contained"
          color="primary"
          onClick={() => logout()}
        >
          Log Out
        </Mui.Button>
        <div className="mb-6">
          <div className="grid-cols-12 md:grid gap-4">
            <div className="col-span-12 ml-2">Total {list.length} Entry</div>
            {list.length ? (
              list.map(
                ({ id, content, datetime, title, diary_id, docs: img }) => {
                  return (
                    <div
                      className="border-b border-perfume m-2 col-span-4"
                      key={id}
                    >
                      <Zoom>
                        <Mui.Card
                          className="mb-2"
                          onClick={() =>
                            setOpenEditOrView((prevState) =>
                              prevState === id ? '' : id,
                            )
                          }
                        >
                          <Mui.CardContent className="grid-cols-12 grid gap-2">
                            <div className={img ? 'col-span-8' : 'col-span-12'}>
                              <Mui.Typography
                                gutterBottom
                                component="h5"
                                variant="h5"
                                className="line-clamp-1 font-bold font-sans"
                              >
                                {title ? title : ''}
                              </Mui.Typography>
                              <Mui.Typography
                                gutterBottom
                                variant="body2"
                                component="p"
                                className="line-clamp-3 font-sans"
                              >
                                {content} ...
                              </Mui.Typography>
                              <div className="flex justify-between">
                                <span>
                                  {moment(datetime).format('DD MMM yyyy')}
                                </span>
                                <span>{moment(datetime).format('dddd')}</span>
                                <span className="italic">
                                  {moment(datetime).format('hh:mm A')}
                                </span>
                              </div>
                            </div>
                            <div
                              className={
                                img
                                  ? 'col-span-4 bg-cover bg-center'
                                  : 'col-span-0 bg-cover bg-center'
                              }
                              style={{ backgroundImage: 'url(' + img + ')' }}
                            ></div>
                          </Mui.CardContent>
                          {openEditOrView === id && (
                            <Mui.CardActions className="flex justify-between">
                              <Mui.Button
                                size="medium"
                                color="secondary"
                                onClick={() =>
                                  editOrView('edit', { id, diary_id })
                                }
                                className="font-sans normal-case"
                              >
                                EDIT
                              </Mui.Button>
                              <Mui.Button
                                size="medium"
                                color="secondary"
                                onClick={() =>
                                  editOrView('view', { id, diary_id })
                                }
                                className="font-sans normal-case"
                              >
                                VIEW
                              </Mui.Button>
                            </Mui.CardActions>
                          )}
                        </Mui.Card>
                      </Zoom>
                    </div>
                  )
                },
              )
            ) : (
              <Mui.Backdrop
                open={true}
                className="z-10 backdrop-filter backdrop-blur-sm"
              >
                <div className="animate-bounce">
                  <Mui.CircularProgress
                    color="inherit"
                    className="text-rose-600 shadow-pop-rose rounded-full"
                  />
                </div>
              </Mui.Backdrop>
            )}
          </div>
        </div>
      </div>
      <Mui.Fab
        className="fixed bottom-10 right-10 bg-gray-900 text-white"
        onClick={() => toNewEntry()}
      >
        <BsIcon.BsPlus className="text-4xl" />
      </Mui.Fab>
    </>
  )
}

export default Overview
