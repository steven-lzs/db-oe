import React, { useEffect, useState } from 'react'
import { useSpring, animated } from 'react-spring'

const PageTrans = (props) => {
  const [open, setOpen] = useState(props.load)
  const transitions = useSpring({
    from: {
      transform: 'translate(100%, 0%)',
    },
    transform: open ? 'translate(0%, 0%)' : 'translate(100%, 0%)',
  })

  useEffect(() => {
    setTimeout(() => {
      setOpen(false)
    }, 3000)
  }, [])

  return (
    <animated.div
      style={{ ...transitions }}
      className=" absolute top-0 left-0 w-full h-full bg-blue-600"
    ></animated.div>
  )
}

export default PageTrans
