import React, { useEffect, useState, useRef, useLayoutEffect } from 'react'
import diary from 'api/diary'
import * as Mui from '@material-ui/core'
import * as BsIcon from 'react-icons/bs'
import moment from 'moment'
import Zoom from 'react-reveal/Zoom'
import gsap from 'gsap'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { observer } from 'mobx-react'
import store from '../../store'

import { useHistory } from 'react-router-dom'

const tl = gsap.timeline()

const Overview = ({ outerWrapper }) => {
  const history = useHistory()
  const card = useRef([])
  const cardCont = useRef([])

  const toNewEntry = (state = null) => {
    history.push({ pathname: '/diary/entry', state })
  }
  const toView = (state = null) => {
    history.push({ pathname: '/diary/view', state })
  }

  const [list, setList] = useState([])
  const [openEditOrView, setOpenEditOrView] = useState('')

  const getAllDiary = () => {
    diary.getAllDiary().then((resp) => {
      console.log('get all diary ', resp)
      if (resp.status === 200) {
        setList(resp.data)
        // make change in store when page change to re-render the page height in App.js
        store.setPage('Overview')
      }
    })
  }

  useEffect(() => {
    getAllDiary()
    tl.to('.overview', 0, {
      css: { visibility: 'visible' },
    }).from('.g-fade-in', 1.2, {
      css: { opacity: 0 },
      ease: 'power3.In',
      delay: -1,
    })
  }, [])

  const backToMain = () => {
    history.replace('/main')
  }

  const editOrView = (type, param = null) => {
    // console.log(cardCont)
    // console.log(card.current[3].getBoundingClientRect())
    // offsetTop is the distance from most top  in the screen to the element
    // getBoundingClientRect is the distance from the current viewport to the element
    // const top =
    //   card.current[param.index].offsetTop -
    //   card.current[param.index].getBoundingClientRect().y

    disableBodyScroll(outerWrapper.current)
    if (store.isIOS) {
      outerWrapper.current.style.touchAction = 'none'
    }
    tl.to(`.diary-content-${param.id}`, 0.4, {
      css: { opacity: 0 },
      ease: 'power4.out',
    })
      .to('ul.transition li', {
        duration: 0.5,
        scaleY: 1,
        transformOrigin: 'bottom left',
        stagger: 0.2,
        onComplete: () => {
          if (type == 'edit') {
            toNewEntry(param)
          }
          if (type == 'view') {
            toView(param)
          }
          enableBodyScroll(outerWrapper.current)
          if (store.isIOS) {
            outerWrapper.current.style.touchAction = 'auto'
          }
        },
      })
      .to('ul.transition li', {
        duration: 0.5,
        scaleY: 0,
        transformOrigin: 'bottom left',
        stagger: 0.1,
        delay: 0.1,
      })
    // .to(`.diary-overlay-${param.id}`, 2, {
    //   css: {
    //     zIndex: '100',
    //     height: '100vh',
    //     width: '100vw',
    //     top,
    //     left: -cardCont.current[param.index].getBoundingClientRect().left,
    //     opacity: 1,
    //     backgroundColor: '#303030',
    //   },
    //   ease: 'power4.out',
    //   onComplete: () => {
    //     if (type == 'edit') {
    //       toNewEntry(param)
    //     }
    //     if (type == 'view') {
    //       toView(param)
    //     }
    //     enableBodyScroll(outerWrapper.current)
    //     if (store.isIOS) {
    //       outerWrapper.current.style.touchAction = 'auto'
    //     }
    //   },
    // })
  }

  const cardSelected = (id) => {
    setOpenEditOrView((prevState) => {
      if (prevState) {
        tl.to(`.diary-content-${prevState}`, 0.6, {
          filter: 'blur(0px)',
          ease: 'power4.out',
          delay: -0.6,
        })
          .to(`.card-actions-btn-${prevState}`, 0.8, {
            scale: 0,
            ease: 'power4.out',
            delay: -0.6,
          })
          .to(`.card-actions-${prevState}`, 0.8, {
            height: '0px',
            ease: 'power4.out',
            delay: -0.6,
          })
      }

      if (prevState === id) {
        return ''
      } else {
        return id
      }
    })

    tl.to(`.diary-content-${id}`, 0.6, {
      filter: 'blur(5px)',
      ease: 'power4.in',
      delay: -0.3,
    })
      .to(`.card-actions-${id}`, 1, {
        height: '50px',
        ease: 'elastic.out(1,0.4)',
        delay: -0.3,
      })
      .to(`.card-actions-btn-${id}`, 1, {
        scale: 1,
        ease: 'elastic.out(1,0.4)',
        delay: -0.3,
      })
  }

  return (
    <div className="overview" style={{ visibility: 'hidden' }}>
      <div className="table w-full h-full">
        <Mui.Button
          className=" normal-case rounded-full py-3 bg-rose-600 shadow-rose text-white font-sans g-fade-in"
          variant="contained"
          color="primary"
          onClick={() => backToMain()}
        >
          Back to Main
        </Mui.Button>
        <div className="py-6 font-bold text-xl text-center g-fade-in font-sans">
          Overview
        </div>
        <div className="mb-6">
          <div className="grid-cols-12 md:grid gap-4 g-fade-in">
            <div className="col-span-12 ml-2 g-fade-in font-sans">
              Total {list.length} Entry
            </div>
            {list.length ? (
              list.map(
                (
                  { id, content, datetime, title, diary_id, docs: img },
                  index,
                ) => {
                  return (
                    <>
                      <div
                        className="m-2 col-span-4 relative"
                        ref={(el) => (cardCont.current[index] = el)}
                        key={id}
                      >
                        <div
                          className={
                            'shadow-lg rounded-lg absolute diary-overlay-' + id
                          }
                          style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#424242',
                          }}
                          onClick={() => cardSelected(id)}
                        ></div>
                        <Zoom>
                          <Mui.Card
                            className={
                              'cursor-pointer shadow-none h-full rounded-lg diary-' +
                              id
                            }
                            ref={(el) => (card.current[index] = el)}
                            onClick={() => cardSelected(id)}
                          >
                            <Mui.CardContent
                              className={
                                'grid-cols-12 grid gap-2 diary-content-' + id
                              }
                              style={{ filter: 'blur(0)' }}
                            >
                              <div
                                className={img ? 'col-span-8' : 'col-span-12'}
                              >
                                <Mui.Typography
                                  gutterBottom
                                  component="h5"
                                  variant="h5"
                                  id="box"
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
                                <div className="flex justify-between font-sans">
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

                            <Mui.CardActions
                              className={
                                'flex justify-between card-actions-' + id
                              }
                              style={{ height: 0 }}
                            >
                              <Mui.Button
                                size="medium"
                                color="secondary"
                                onClick={() =>
                                  editOrView('edit', { id, diary_id, index })
                                }
                                className={
                                  'font-sans normal-case card-actions-btn-' + id
                                }
                                style={{ transform: 'scale(0)' }}
                              >
                                EDIT
                              </Mui.Button>
                              <Mui.Button
                                size="medium"
                                color="secondary"
                                onClick={() =>
                                  editOrView('view', { id, diary_id, index })
                                }
                                className={
                                  'font-sans normal-case card-actions-btn-' + id
                                }
                                style={{ transform: 'scale(0)' }}
                              >
                                VIEW
                              </Mui.Button>
                            </Mui.CardActions>
                          </Mui.Card>
                        </Zoom>
                      </div>
                    </>
                  )
                },
              )
            ) : (
              <Mui.Backdrop open={true} className="z-10 bg-transparent">
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
    </div>
  )
}

export default observer(Overview)
