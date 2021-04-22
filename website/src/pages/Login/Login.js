import React, { useRef, useState, useEffect } from 'react'
import * as Mui from '@material-ui/core'

import { useSpring, useChain, animated } from 'react-spring'
import { useScroll } from 'react-use-gesture'
import * as FontAwesome from 'react-icons/fa'

import { Link } from 'react-router-dom'

import { PIXABAY_API_KEY } from '@env'

const Login = (props) => {
  const [{ width }, set] = useSpring(() => ({ width: '0%' }))
  const [bgVideo, setBgVideo] = useState('')
  const [open, setOpen] = useState(false)
  const [screenWidth] = useState(props.width)
  const AnimatedCard = animated(Mui.Card)

  useEffect(() => {
    fetch(`https://pixabay.com/api/videos/?key=${PIXABAY_API_KEY}&id=20564`)
      .then((response) => response.json())
      .then((resp) => {
        const url = resp.hits[0].videos.large.url
        console.log(url)
        setBgVideo(url)
      })
  }, [])

  const CssTextField = Mui.withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'white',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
          borderWidth: '0px',
          borderRadius: '50px',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
          borderWidth: '0px',
        },
      },
    },
  })(Mui.TextField)

  const AnimatedTextField = animated(CssTextField)

  useScroll(
    ({ xy: [, y] }) => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.offsetHeight
      set({ width: `${(y / height) * 100}%` })
    },
    { domTarget: window },
  )

  // const firstZoomIn = useSpring({
  //   from: {
  //     scale: 0,
  //   },
  //   scale: 1,
  // })

  const inputZoomInRef = useRef()
  const inputZoomIn = useSpring({
    ref: inputZoomInRef,
    from: {
      transform: 'scale(0)',
    },
    transform: open ? 'scale(1)' : 'scale(0)',
  })

  const titleRef = useRef()
  const title = useSpring({
    ref: titleRef,
    from: {
      fontWeight: 'normal',
      fontSize: '15px',
      height: '100%',
      marginTop: '0%',
    },
    fontWeight: open ? 'bold' : 'normal',
    fontSize: open ? '25px' : '15px',
    height: open ? '10%' : '100%',
    marginTop: open ? '10%' : '0%',
  })

  const enlargeRef = useRef()
  const enlarge = useSpring({
    ref: enlargeRef,
    from: {
      width: ['xs', 'sm'].includes(screenWidth) ? '25%' : '10%',
      height: '8%',
      pointerEvents: 'auto',
      cursor: 'pointer',
      borderRadius: '50px',
      boxShadow: `2px 2px 1px rgba(0,0,0,0.15),
                  4px 4px 2px rgba(0,0,0,0.15),
                  6px 6px 4px rgba(0,0,0,0.15),
                  8px 8px 8px rgba(0,0,0,0.15),
                  10px 10px 16px rgba(0,0,0,0.15)`,
    },
    width: open
      ? ['xs', 'sm'].includes(screenWidth)
        ? '90%'
        : '30%'
      : ['xs', 'sm'].includes(screenWidth)
      ? '25%'
      : '10%',
    height: open ? '50%' : '8%',
    pointerEvents: open ? 'none' : 'auto',
    cursor: open ? 'auto' : 'pointer',
    borderRadius: open ? '30px' : '50px',
    config: { mass: 1, tension: 150, friction: 16 },
  })

  useChain(
    open
      ? [enlargeRef, titleRef, inputZoomInRef]
      : [inputZoomInRef, titleRef, enlargeRef],
  )

  const minimize = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  const login = (e) => {
    e.stopPropagation()
    console.log('login')
  }

  return (
    <>
      <div
        className="fixed h-full top-0 right-0 filter brightness-50"
        dangerouslySetInnerHTML={{
          __html: `
      <video autoplay muted loop playsinline class="${'h-full w-full object-cover'}" style="${'object-position: 75% 50%'}">
        <source src=${bgVideo} type="video/mp4"/>
        Your browser does not support the video tag. I suggest you upgrade your browser.
      </video>
      `,
        }}
      />
      <div className="h-full w-full">
        <animated.div
          className="bg-red-600 h-2 fixed top-0 left-0 z-40"
          style={{ width }}
        />
        <div className="table w-full h-full relative">
          <div className="table-cell align-middle relative text-center">
            <AnimatedCard
              onClick={() => setOpen(true)}
              className="mx-auto block bg-gray-800"
              style={{
                // transform: firstZoomIn.scale.interpolate(
                //   (scale) => `scale(${scale})`,
                // ),
                ...enlarge,
              }}
            >
              <animated.div style={{ ...title }} className="table w-full">
                <div className="table-cell align-middle">
                  {open ? (
                    'Login'
                  ) : (
                    <FontAwesome.FaUserCircle className="mx-auto text-3xl" />
                  )}
                </div>
              </animated.div>
              <Mui.CardContent className="pointer-events-auto h-8/10 table w-full">
                <div className="table-cell align-middle h-full">
                  <div className="grid-cols-12 grid gap-4">
                    <div className="col-span-12">
                      <AnimatedTextField
                        className="w-full bg-gray-700 rounded-2xl shadow-inset-black"
                        placeholder="Email"
                        variant="outlined"
                        style={{ ...inputZoomIn }}
                        InputProps={{
                          startAdornment: (
                            <Mui.InputAdornment position="start">
                              <FontAwesome.FaUserAlt className="text-4xl text-gray-700 bg-gray-900 rounded-full p-2" />
                            </Mui.InputAdornment>
                          ),
                        }}
                      ></AnimatedTextField>
                    </div>
                    <div className="col-span-12">
                      <AnimatedTextField
                        className="w-full bg-gray-700 rounded-2xl shadow-inset-black"
                        placeholder="Password"
                        variant="outlined"
                        type="password"
                        style={{ ...inputZoomIn }}
                        InputProps={{
                          startAdornment: (
                            <Mui.InputAdornment position="start">
                              <FontAwesome.FaLock className="text-4xl text-gray-700 bg-gray-900 rounded-full p-2" />
                            </Mui.InputAdornment>
                          ),
                        }}
                      ></AnimatedTextField>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <Link to="/about">
                        <Mui.Button
                          variant="contained"
                          fullWidth
                          color="primary"
                          onClick={login}
                          className="rounded-2xl bg-rose-600 py-4 normal-case shadow-rose font-bold text-gray-200"
                        >
                          Login
                        </Mui.Button>
                      </Link>
                    </div>
                    <div className="col-span-12 md:col-span-6">
                      <Mui.Button
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        onClick={minimize}
                        className="rounded-2xl py-3 normal-case border-2 border-rose-600 text-gray-200 hover:bg-transparent shadow-pop-rose font-bold"
                      >
                        Cancel
                      </Mui.Button>
                    </div>
                  </div>
                </div>
              </Mui.CardContent>
            </AnimatedCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default Mui.withWidth()(Login)
