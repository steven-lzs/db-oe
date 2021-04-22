import React, { useState, useEffect } from 'react'
import { useScroll } from 'react-use-gesture'
import { useSpring, animated } from 'react-spring'
// import { Link } from 'react-router-dom'

const About = () => {
  const [img__, SetImg] = useState([])
  const [props, set] = useSpring(() => ({
    xy: [0, 0],
    config: { mass: 10, tension: 550, friction: 140 },
  }))
  const trans4 = (x, y) => `translate3d(${x / 3.5}px,${y / 3.5}px,0)`
  const trans3 = (x, y) => `translate3d(${x / 5}px,${y / 5}px,0)`

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        let img_ = []
        for (let i = 0; i < 3; i++) {
          img_.push(json[i])
        }
        SetImg(img_)
      })
  }, [])

  useScroll(
    (e) => {
      console.log(e)
      set({ xy: e.xy })
    },
    { domTarget: window },
  )

  return (
    <div className="w-full h-full">
      <div className="text-center text-rose-600 font-bold text-6xl">About</div>
      <animated.div
        className="card4 w-12 h-12 bg-red-600"
        style={{ transform: props.xy.interpolate(trans4) }}
      />
      {/* <div>
        1914 translation by H. Rackham "But I must explain to you how all this
        mistaken idea of denouncing pleasure and praising pain was born and I
        will give you a complete account of the system, and expound the actual
        teachings of the great explorer of the truth, the master-builder of
        human happiness. No one rejects, dislikes, or avoids pleasure itself,
        because it is pleasure, but because those who do not know how to pursue
        pleasure rationally encounter consequences that are extremely painful.
        Nor again is there anyone who loves or pursues or desires to obtain pain
        of itself, because it is pain, but because occasionally circumstances
        occur in which toil and pain can procure him some great pleasure. To
        take a trivial example, which of us ever undertakes laborious physical
        exercise, except to obtain some advantage from it? But who has any right
        to find fault with a man who chooses to enjoy a pleasure that has no
        annoying consequences, or one who avoids a pain that produces no
        resultant pleasure?"
      </div> */}
      <div>
        {img__.map(({ url }) => {
          return (
            <animated.img
              style={{ transform: props.xy.interpolate(trans3) }}
              key={url}
              src={url}
            />
          )
        })}
      </div>
    </div>
  )
}

export default About
