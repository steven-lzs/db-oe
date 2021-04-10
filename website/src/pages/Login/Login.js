import React, { useRef, useState } from 'react'
// import { Card, Input, Space, Button } from 'antd';
// import { styled } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import TextField from '@material-ui/core/TextField'
import CardContent from '@material-ui/core/CardContent'
// import Backdrop from '@material-ui/core/Backdrop';
// import Checkbox from '@material-ui/core/Checkbox';
// import Select from '@material-ui/core/Select';
// import MenuItem from '@material-ui/core/MenuItem';
// import user from '../../api/user';

import { useSpring, useChain, animated } from 'react-spring'
import { useScroll } from 'react-use-gesture'

function Login(props) {
  // const [scale_, setScale] = useState(1);
  // let [inner, setInner] = useState([]);
  // const zoomInRef = useRef();
  // const zoomIn = useSpring({
  //     ref: zoomInRef,
  //     from: {
  //         scale: 0
  //     },
  //     scale: scale_
  // })

  // const slideInRef = useRef();
  // const slideIn = useSpring({
  //     ref: slideInRef,
  //     from: {
  //         pos: '-120%'
  //     },
  //     pos: '0%'
  // })

  // const scaleDown = (event) => {
  //     event.stopPropagation();
  //     setScale(0.2);
  // }

  // useChain([zoomInRef, slideInRef])
  const [{ width }, set] = useSpring(() => ({ width: '0%' }))
  // const height_ = document.documentElement.scrollHeight;

  useScroll(
    ({ xy: [, y] }) => {
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.offsetHeight
      console.log('what is xy ', y / height)
      set({ width: `${(y / height) * 100}%` })
    },
    { domTarget: window },
  )

  const AnimatedCard = animated(Card)
  const [open, setOpen] = useState(false)
  const [screenWidth] = useState(props.width)

  const firstZoomIn = useSpring({
    from: {
      scale: 0,
    },
    scale: 1,
  })

  const zoomInRef = useRef()
  const zoomIn = useSpring({
    ref: zoomInRef,
    from: {
      scale: 0,
    },
    scale: open ? 1 : 0,
  })

  const title = useSpring({
    from: {
      fontWeight: 'normal',
      fontSize: '15px',
      height: '100%',
    },
    fontWeight: open ? 'bold' : 'normal',
    fontSize: open ? '25px' : '15px',
    height: open ? '10px' : '100%',
  })

  const enlargeRef = useRef()
  const rest = useSpring({
    ref: enlargeRef,
    from: {
      width: ['xs', 'sm'].includes(screenWidth) ? '20%' : '7%',
      height: '5%',
      pointerEvents: 'auto',
      backgroundColor: 'red',
      cursor: 'pointer',
      borderRadius: '50px',
    },
    width: open
      ? ['xs', 'sm'].includes(screenWidth)
        ? '80%'
        : '40%'
      : ['xs', 'sm'].includes(screenWidth)
      ? '20%'
      : '7%',
    height: open ? '60%' : '5%',
    pointerEvents: open ? 'none' : 'auto',
    backgroundColor: open ? 'blue' : 'red',
    cursor: open ? 'auto' : 'pointer',
    borderRadius: open ? '5px' : '50px',
  })

  useChain(open ? [enlargeRef, zoomInRef] : [zoomInRef, enlargeRef])

  const minimize = (e) => {
    e.stopPropagation()
    setOpen(false)
  }

  return (
    <div className="h-full w-full">
      <div className="table w-full h-full relative">
        <div className="table-cell align-middle relative text-center">
          <animated.div
            className="bg-red-600 h-12 fixed top-0"
            style={{ width }}
          />
          {/* <animated.div
                        style={{
                            transform: zoomIn.scale.interpolate(scale => `scale(${scale})`)
                        }} 
                        className="normal-case mx-auto w-10/12 md:w-7/12" 
                        onClick={() => setScale(1)}
                    >   
                    Login
                        <Card className="h-full w-full">
                            <CardContent>
                                <div className="grid-cols-12 grid gap-4 mb-4">
                                    <animated.div style={{transform: slideIn.pos.interpolate(pos => `translateX(${pos})`)}} className="col-span-12">
                                        <TextField className="w-full" variant="outlined" label="Name"></TextField>
                                    </animated.div>
                                </div>
                                <Button color="secondary" variant="contained" onClick={scaleDown}>cancel</Button>
                            </CardContent>
                        </Card>
                    </animated.div> */}
          <AnimatedCard
            onClick={() => setOpen(true)}
            className="mx-auto block"
            style={{
              transform: firstZoomIn.scale.interpolate(
                (scale) => `scale(${scale})`,
              ),
              ...rest,
            }}
          >
            <animated.div style={{ ...title }} className="table w-full">
              <div className="table-cell align-middle">
                {open ? 'Login' : 'Start'}
              </div>
            </animated.div>

            <AnimatedCard
              className="pointer-events-auto"
              style={{
                transform: zoomIn.scale.interpolate(
                  (scale) => `scale(${scale})`,
                ),
              }}
            >
              <CardContent>
                <TextField
                  className="w-full"
                  variant="outlined"
                  label="Name"
                ></TextField>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={minimize}
                >
                  Cancel
                </Button>
              </CardContent>
            </AnimatedCard>
          </AnimatedCard>

          {/* <div className="inline-block">
                        <AnimatedCard style={{transform: zoomIn2.scale.interpolate(scale => `scale(${scale})`) }} className="inline-block">
                            <CardContent>
                                <Button variant="contained" color="primary" className="rounded-full normal-case px-10" onClick={() => setOpen(open => !open)}>Cancel</Button>
                            </CardContent>
                        </AnimatedCard>
                    </div> */}
        </div>
      </div>
      <div>next section</div>
    </div>
  )
}

export default withWidth()(Login)
