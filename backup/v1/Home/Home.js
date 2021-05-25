import React, { useState, useEffect } from 'react'
import ScrollAnimation from 'react-animate-on-scroll'

import { PIXABAY_API_KEY } from '@env'

const Home = () => {
  const [images, setImages] = useState([])
  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=building&page=1&per_page=5`,
    )
      .then((response) => response.json())
      .then((resp) => {
        // const url = resp.hits[0].videos.large.url
        // console.log(resp)
        setImages(resp.hits)
      })
  }, [])

  return (
    <>
      <div className="filter brightness-50">
        {images.map(({ largeImageURL }) => {
          return (
            <div key={largeImageURL}>
              <ScrollAnimation animateIn="zoomIn" animateOut="fadeOut">
                <img src={largeImageURL} alt="" className="w-screen" />
              </ScrollAnimation>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Home
