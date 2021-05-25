import React, { useState, useEffect } from 'react'
import * as Mui from '@material-ui/core'
import { useSpring, animated } from 'react-spring'
import * as FontAwesome from 'react-icons/fa'

const Drawer = ({ open, onClose }) => {
  const [open_, setOpen] = useState(open)

  useEffect(() => {
    setOpen(open)
  }, [open])

  const closeDrawer = () => {
    setOpen(false)
    onClose()
  }

  const showDrawer = useSpring({
    from: {
      transform: 'translate(-100%, -100%) scale(0)',
      opacity: 0,
      height: '0rem',
      width: '0rem',
    },
    transform: open_
      ? 'translate(0%, 0%) scale(1)'
      : 'translate(-100%, -100%) scale(0)',
    opacity: open_ ? 1 : 0,
    height: open_ ? '40rem' : '0rem',
    width: open_ ? '40rem' : '0rem',
    maxWidth: 'calc(100% + 2.5rem)',
    config: {
      mass: 1,
      tension: 170,
      friction: 18,
    },
  })

  return (
    <>
      <animated.div
        style={{ ...showDrawer }}
        className="bg-rose-600 bg-opacity-80 shadow-rose absolute pt-10 pl-10 -top-10 -left-10 z-10 rounded-br-full backdrop-filter backdrop-blur-sm overflow-hidden"
      >
        <div
          className="rounded-br-full p-2 relative"
          style={{ height: '36rem' }}
        >
          <div className="text-right">
            <Mui.Button
              onClick={closeDrawer}
              disableFocusRipple={true}
              className="rounded-full"
            >
              <FontAwesome.FaTimes className="text-4xl text-dark" />
            </Mui.Button>
          </div>
          <div className="absolute w-full overflow-y-scroll h-4/6">
            <Mui.List className="relative">
              {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <Mui.ListItem button key={text}>
                  <Mui.ListItemText primary={text} />
                </Mui.ListItem>
              ))}
            </Mui.List>
          </div>
        </div>
      </animated.div>
    </>
  )
}

export default Drawer
