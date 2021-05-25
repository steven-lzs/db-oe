import gsap from 'gsap'
import React, { useEffect } from 'react'

const About = () => {
  // const g = gsap.to("h2.title", {duration: 1, opacity: 0.3});

  useEffect(() => {
    gsap.to('.box', { duration: 2, x: 300 })
  }, [])
  return (
    <div>
      About
      {/* <div className="w-12 h-12 bg-red-600 box"></div> */}
    </div>
  )
}

export default About
