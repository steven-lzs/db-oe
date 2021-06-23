import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { disableBodyScroll } from 'body-scroll-lock'
import { observer } from 'mobx-react'
import store from '../../store'
import is from 'is_js'
import anime from 'api/anime'

const tl = gsap.timeline()

const Konooto = ({ outerWrapper }) => {
  const bg01 = anime.getImage('この音とまれ', 'bg.jpg')
  const loader = anime.getImage('この音とまれ', 'loader.jpg')
  const mainvisual = anime.getImage('この音とまれ', 'mainvisual.png')
  const logo = anime.getImage('この音とまれ', 'logo.png')

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    store.setPage('この音とまれ')
    disableBodyScroll(outerWrapper.current)
    tl.to('.loader-container-konooto', 2, {
      opacity: 1,
      ease: 'power3.out',
    })
    setTimeout(() => {
      tl.to('.loader-container-konooto', 1, {
        opacity: 0,
        ease: 'power3.out',
        onComplete: () => {
          setLoading(false)
          if (is.ipad() || is.mobile()) {
            tl.to('.bg01-container-konooto', 1, {
              opacity: 1,
              ease: 'power3.in',
            })
              .to('.mainvisual-img-konooto', 1, {
                opacity: 1,
                ease: 'power3.in',
              })
              .to('.logo-img-konooto', 1.5, {
                opacity: 1,
                x: 0,
                ease: 'power3.inOut',
              })
          } else {
            tl.to('.bg01-container-konooto', 1, {
              opacity: 1,
              ease: 'power3.in',
            })
              .to('.mainvisual-img-konooto', 1, {
                opacity: 1,
                ease: 'power3.in',
              })
              .to('.mainvisual-img-konooto', 2, {
                y: 0,
                ease: 'power3.inOut',
              })
              .to('.logo-img-konooto', 1.5, {
                opacity: 1,
                x: 0,
                ease: 'power3.inOut',
              })
          }
        },
      })
    }, 2000)
  }, [])

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full fixed top-0 left-0 bg-white"
        style={{ zIndex: -1 }}
      ></div>
      {loading ? (
        <div
          className="flex justify-center items-center h-full w-full loader-container-konooto"
          style={{ opacity: 0 }}
        >
          <img src={loader} alt="" className="loader-img" />
        </div>
      ) : (
        <div
          className="h-full w-full overflow-y-scroll bg01-container-konooto fixed top-0 left-0 bg-fixed bg-cover bg-center"
          style={{
            opacity: 0,
            backgroundImage: `url(${bg01})`,
          }}
        >
          <img
            src={logo}
            alt=""
            className="absolute left-10 top-10 h-24 md:h-32 lg:h-48 logo-img-konooto m-auto"
            style={{
              opacity: 0,
              zIndex: 2,
              display: is.ipad() || is.mobile() ? 'none' : 'block',
              transform: 'translateX(100%)',
            }}
          />
          <img
            src={mainvisual}
            alt=""
            className="mainvisual-img-konooto md:h-auto"
            style={{
              opacity: 0,
              zIndex: 2,
              transform:
                is.ipad() || is.mobile() ? 'scale(1.4)' : 'translateY(-800px)',
              transformOrigin: is.ipad() || is.mobile() ? 'top center' : '',
            }}
          />
          <img
            src={logo}
            alt=""
            className="m-auto logo-img-konooto absolute bottom-10"
            style={{
              opacity: 0,
              zIndex: 2,
              display: is.ipad() || is.mobile() ? 'block' : 'none',
              transform: 'translateX(100%)',
            }}
          />
        </div>
      )}
    </div>
  )
}

export default observer(Konooto)
