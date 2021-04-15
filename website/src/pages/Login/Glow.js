import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'

const Glow = () => {
  const [r, setR] = useState(false)
  const [PnumberX, setNumberPX] = useState(
    Math.floor(Math.random() * window.screen.width) + 1,
  )
  const [PnumberY, setNumberPY] = useState(
    Math.floor(Math.random() * window.screen.width) + 1,
  )
  const [numberX, setNumberX] = useState(
    Math.floor(Math.random() * window.screen.width) + 1,
  )
  const [numberY, setNumberY] = useState(
    Math.floor(Math.random() * window.screen.width) + 1,
  )
  const glow = useSpring({
    from: {
      filter: 'blur(0px)',
    },
    filter: r ? 'blur(15px)' : 'blur(0px)',
    onRest: () => setR((r) => !r),
    config: {
      duration: 3500,
    },
    // reset: r
  })

  const translate = useSpring({
    from: {
      transform: `translateX(${PnumberX}%) translateY(${PnumberY}%)`,
    },
    transform: `translateX(${numberX}%) translateY(${numberY}%)`,
    config: {
      duration: 3000,
    },
  })

  useEffect(() => {
    // create interval
    const interval = setInterval(
      // set number every 5s
      () => {
        setNumberX((state) => {
          setNumberPX(state)
          return Math.floor(Math.random() * window.screen.width) + 1
        })
        setNumberY((state) => {
          setNumberPY(state)
          return Math.floor(Math.random() * window.screen.height) + 1
        })
      },
      3000,
    )

    // clean up interval on unmount
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className="absolute w-full h-full top-0 left-0">
      {/* <div>({PnumberX} {PnumberY})({numberX} {numberY})</div> */}
      <animated.div
        className="w-12 h-12 bg-red-600 m-auto rounded-full"
        style={{ ...glow, ...translate }}
      ></animated.div>
    </div>
  )
}

export default Glow
