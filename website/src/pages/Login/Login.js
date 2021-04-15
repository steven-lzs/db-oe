import React, { useRef, useState } from 'react'
import * as Mui from '@material-ui/core'

import { useSpring, useChain, animated } from 'react-spring'
import { useScroll } from 'react-use-gesture'
import * as FontAwesome from 'react-icons/fa'

import { Link } from 'react-router-dom'

const Login = (props) => {
  const [{ width }, set] = useSpring(() => ({ width: '0%' }))
  const [open, setOpen] = useState(false)
  const [screenWidth] = useState(props.width)
  const AnimatedCard = animated(Mui.Card)

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

  const firstZoomIn = useSpring({
    from: {
      scale: 0,
    },
    scale: 1,
  })

  const slideInRef = useRef()
  const slideIn = useSpring({
    ref: slideInRef,
    from: {
      transform: 'translateX(-120%)',
    },
    transform: open ? 'translateX(0%)' : 'translateX(-120%)',
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
      width: ['xs', 'sm'].includes(screenWidth) ? '20%' : '7%',
      height: '8%',
      pointerEvents: 'auto',
      cursor: 'pointer',
      borderRadius: '50px',
    },
    width: open
      ? ['xs', 'sm'].includes(screenWidth)
        ? '80%'
        : '30%'
      : ['xs', 'sm'].includes(screenWidth)
      ? '20%'
      : '7%',
    height: open ? '50%' : '8%',
    pointerEvents: open ? 'none' : 'auto',
    cursor: open ? 'auto' : 'pointer',
    borderRadius: open ? '30px' : '50px',
    config: { mass: 1, tension: 150, friction: 16 },
  })

  useChain(
    open
      ? [enlargeRef, titleRef, slideInRef]
      : [slideInRef, titleRef, enlargeRef],
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
    <div className="h-full w-full">
      <animated.div
        className="bg-red-600 h-2 fixed top-0 left-0 z-40"
        style={{ width }}
      />
      <div className="table w-full h-full relative">
        <div className="table-cell align-middle relative text-center">
          <AnimatedCard
            onClick={() => setOpen(true)}
            className="mx-auto block bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose"
            style={{
              transform: firstZoomIn.scale.interpolate(
                (scale) => `scale(${scale})`,
              ),
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
                      className="w-full bg-rose-700 rounded-2xl shadow-inset-black"
                      placeholder="Email"
                      variant="outlined"
                      style={{ ...slideIn }}
                      InputProps={{
                        startAdornment: (
                          <Mui.InputAdornment position="start">
                            <FontAwesome.FaUserAlt className="text-4xl text-rose-700 bg-rose-900 rounded-full p-2" />
                          </Mui.InputAdornment>
                        ),
                      }}
                    ></AnimatedTextField>
                  </div>
                  <div className="col-span-12">
                    <AnimatedTextField
                      className="w-full bg-rose-700 rounded-2xl shadow-inset-black"
                      placeholder="Password"
                      variant="outlined"
                      type="password"
                      style={{ ...slideIn }}
                      InputProps={{
                        startAdornment: (
                          <Mui.InputAdornment position="start">
                            <FontAwesome.FaLock className="text-4xl text-rose-700 bg-rose-900 rounded-full p-2" />
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
                        className="rounded-2xl bg-black py-4 normal-case shadow-black font-bold text-gray-200"
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
                      className="rounded-2xl py-3 normal-case border-2 border-black text-gray-200 hover:bg-transparent shadow-pop-black font-bold"
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
  )
}

export default Mui.withWidth()(Login)
