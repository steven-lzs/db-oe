import React, { useState, useEffect } from 'react'
import './NavBar.css'
import { Link } from 'react-router-dom'

import {
  useSpring,
  animated as a,
  config,
  useChain,
  useSpringRef,
} from 'react-spring'

import { PIXABAY_API_KEY } from '@env'

const items = [
  {
    path: '/about',
    name: 'About',
    bgImage: 0,
  },
  {
    path: '/',
    name: 'Projects',
    bgImage: 1,
  },
  {
    path: '/',
    name: 'Contact',
    bgImage: 2,
  },
]

const NavBar = ({ open, onClose }) => {
  // console.log('run');
  const [open_, setOpen] = useState(false)
  const [images, setImages] = useState([])
  const [imagesSel, setImagesSel] = useState('')
  const [{ title, hover }, setOnHover] = useState({ title: '', hover: false })

  const closeNav = () => {
    onClose()
    setOpen(false)
  }

  useEffect(() => {
    setOpen(open)
  }, [open])

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=interior+design&page=1&per_page=3&editors_choice=true&image_type=all`,
    )
      .then((response) => response.json())
      .then((resp) => {
        console.log('nav ', resp)
        setImages(resp.hits)
        // setImagesSel(resp.hits[0]?.largeImageURL)
      })
  }, [])

  const showNavRef = useSpringRef()
  const showNav = useSpring({
    ref: showNavRef,
    from: {
      opacity: 0,
      height: '0%',
      width: '0%',
    },
    opacity: open_ ? 1 : 0,
    height: open_ ? '100%' : '0%',
    width: open_ ? '100%' : '0%',
    config: {
      mass: 1,
      tension: 180,
      friction: 20,
      // duration: 500,
    },
  })

  const textChanged = useSpring({
    from: {
      color: '#fff',
      backgroundColor: '#00FFFFFF',
    },
    color: hover ? '#000' : '#fff',
    backgroundColor: hover ? '#fff' : '#FFFFFFFF',
  })

  const [{ y, o }, set] = useSpring(() => ({ y: 200, o: 1 }))

  const showLineRef = useSpringRef()
  const { x } = useSpring({
    ref: showLineRef,
    from: { x: 0 },
    x: open_ ? 1 : 0,
    config: config.molasses,
  })

  useChain(open_ ? [showNavRef, showLineRef] : [showLineRef, showNavRef])

  return (
    <a.div
      style={{ ...showNav, pointerEvents: open_ ? 'auto' : 'none' }}
      className="w-full h-full fixed top-0 left-0"
    >
      <a.svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 -z-1 w-full h-full"
        strokeDasharray={2500}
        strokeDashoffset={x?.interpolate((x) => (1 - x) * 2700)}
      >
        <line
          x1="0"
          y1="0"
          x2="100%"
          y2="100%"
          stroke="white"
          strokeWidth="1"
        />
        <line
          x1="100%"
          y1="0"
          x2="0"
          y2="100%"
          stroke="white"
          strokeWidth="1"
        />
      </a.svg>
      <div className="table w-full h-full resp-bg-gradient from-transparent via-dark to-black">
        <div className="table-cell h-full w-full align-middle ">
          {
            <a.img
              className="w-full resp-object top-0 -z-1 absolute top-0"
              src={imagesSel}
              alt=""
              style={{
                transform: y?.interpolate((v) => `translateY(${v}%`),
                opacity: o?.interpolate((o) => o),
              }}
            />
          }
          {items.map(({ name, bgImage, path }) => (
            <Link to={path} key={bgImage} onClick={closeNav}>
              <div className="text-center text-6xl font-semibold mb-12 uppercase">
                <div
                  className="inline cursor-pointer"
                  onMouseOver={() => {
                    setTimeout(() => {
                      set({ y: 0, o: 1 })
                      setOnHover({ title: name, hover: true })
                      setImagesSel(images[bgImage].largeImageURL)
                    }, 150)
                  }}
                  onMouseOut={() => {
                    set({ y: 200, o: 0 })
                    setOnHover({ title: '', hover: false })
                  }}
                >
                  <a.div
                    className="inline"
                    style={name === title ? textChanged : null}
                  >
                    {name}
                  </a.div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </a.div>
  )
}

export default NavBar
