import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import gsap from 'gsap'
import * as Mui from '@material-ui/core'

import * as Im from 'react-icons/im'
import * as Gi from 'react-icons/gi'

import main from 'api/main'
import user from 'api/user'

import { observer } from 'mobx-react'
import store from '../store'
import { enableBodyScroll } from 'body-scroll-lock'

const directory = [
  { to: 'diary', icon: <Im.ImBook className="text-xl text-white m-auto" /> },
  {
    to: 'anime',
    icon: (
      <Gi.GiRunningNinja className="text-xl md:text-2xl text-white m-auto" />
    ),
  },
]

const Main = ({ outerWrapper }) => {
  const history = useHistory()
  const tl = gsap.timeline()

  useEffect(() => {
    getMenu()
    enableBodyScroll(outerWrapper.current)
    tl.to('.main-container', 0, {
      css: { visibility: 'visible' },
    }).from('.app-btn', 1, {
      scale: 0,
      stagger: {
        amount: 0.4,
      },
    })
  }, [])

  const getMenu = () => {
    main.getMenu().then((resp) => {
      if (resp.status === 200) {
        console.log(resp)
        store.setPage('Main')
      }
    })
  }

  const toPage = (page) => {
    if (page == 'diary') {
      history.push('/diary')
    } else if (page == 'anime') {
      history.push('/anime')
    }
  }

  const logout = () => {
    user.logout().then((resp) => {
      if (resp.status === 200) {
        history.replace('/login')
        localStorage.removeItem('token')
      }
    })
  }

  return (
    <div
      className="w-full h-screen container mx-auto main-container"
      style={{ visibility: 'hidden' }}
    >
      <div className="container grid-cols-12 grid gap-4 p-6">
        {directory.map(({ to, icon }, index) => {
          return (
            <div
              key={index}
              className="lg:col-span-1 md:col-span-4 col-span-3 bg-gray-800 p-6 rounded-xl shadow-black cursor-pointer app-btn"
              onClick={() => toPage(to)}
            >
              {icon}
            </div>
          )
        })}
      </div>
      <Mui.Button
        className="fixed right-8 bottom-8 normal-case rounded-full py-3 bg-rose-600 shadow-rose text-white font-sans g-fade-in"
        variant="contained"
        color="primary"
        onClick={() => logout()}
      >
        Log Out
      </Mui.Button>
    </div>
  )
}

export default observer(Main)
