import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { disableBodyScroll } from 'body-scroll-lock'
import { observer } from 'mobx-react'
import store from '../../store'
import is from 'is_js'
import anime from 'api/anime'

const tl = gsap.timeline()

const YuruCamp = ({ outerWrapper }) => {
  const loader1 = anime.getImage('ゆるキャン', '1st_logo.png')
  const loader2 = anime.getImage('ゆるキャン', 'c1_bg.jpg')
  const loader2_mobile = anime.getImage('ゆるキャン', 'index_c1_main.jpg')

  const bg_c4 = anime.getImage('ゆるキャン', 'c4_bg.jpg')
  const bg_c4_mobile = anime.getImage('ゆるキャン', 'c4_bg_mobile.jpg')
  const card_c4 = anime.getImage('ゆるキャン', 'index_c4_main.jpg')
  const c4 = anime.getImage('ゆるキャン', 'index_c4_01.png')
  const movie_c4 = anime.getImage('ゆるキャン', 'index_c4_movie.jpg')
  const title_c4 = anime.getImage('ゆるキャン', '2nd_logo.png')

  const bg_c3 = anime.getImage('ゆるキャン', 'c3_bg.jpg')
  const bg_c3_mobile = anime.getImage('ゆるキャン', 'c3_bg_mobile.jpg')

  const card_c3 = anime.getImage('ゆるキャン', 'index_c3_main.jpg')
  const c3 = anime.getImage('ゆるキャン', 'index_c3_01.png')
  const movie_c3 = anime.getImage('ゆるキャン', 'index_c3_movie.jpg')
  const title_c3 = anime.getImage('ゆるキャン', '1st_logo.png')

  const bg_c2 = anime.getImage('ゆるキャン', 'c2_bg.jpg')
  const bg_c2_mobile = anime.getImage('ゆるキャン', 'c2_bg_mobile.jpg')
  const card_c2 = anime.getImage('ゆるキャン', 'index_c2_main.jpg')
  const c2 = anime.getImage('ゆるキャン', 'index_c2_01.png')
  const movie_c2 = anime.getImage('ゆるキャン', 'index_c2_movie.jpg')
  const title_c2 = anime.getImage('ゆるキャン', 'heya_logo.png')

  const bg_c1 = anime.getImage('ゆるキャン', 'c1_bg.jpg')
  const bg_c1_mobile = anime.getImage('ゆるキャン', 'index_c1_main.jpg')
  const card_c1 = anime.getImage('ゆるキャン', 'index_c1_main.jpg')
  const c1 = anime.getImage('ゆるキャン', 'index_c1_01.png')
  const movie_c1 = anime.getImage('ゆるキャン', 'index_c1_movie.jpg')
  const title_c1 = anime.getImage('ゆるキャン', 'index_logo.png')

  const to_left = anime.getImage('ゆるキャン', 'to_left.png')
  const to_right = anime.getImage('ゆるキャン', 'to_right.png')

  const [loading, setLoading] = useState(true)
  const [activePage, setActivePage] = useState('c1')
  const listIndex = ['c1', 'c2', 'c3', 'c4']

  const list = [
    {
      id: 'c1',
      bg: bg_c1,
      bg_mobile: bg_c1_mobile,
      card: card_c1,
      character: c1,
      subCard: movie_c1,
      title: title_c1,
    },
    {
      id: 'c2',
      bg: bg_c2,
      bg_mobile: bg_c2_mobile,
      card: card_c2,
      character: c2,
      subCard: movie_c2,
      title: title_c2,
    },
    {
      id: 'c3',
      bg: bg_c3,
      bg_mobile: bg_c3_mobile,
      card: card_c3,
      character: c3,
      subCard: movie_c3,
      title: title_c3,
    },
    {
      id: 'c4',
      bg: bg_c4,
      bg_mobile: bg_c4_mobile,
      card: card_c4,
      character: c4,
      subCard: movie_c4,
      title: title_c4,
    },
  ]

  const animConfig = {
    c: {
      x: is.mobile() ? '-80%' : '-120%',
      y: is.mobile() ? '-130%' : '-60%',
    },
    movie: {
      x: is.mobile() ? '70%' : is.ipad() ? '100%' : '110%',
      y: is.mobile() ? '100%' : is.ipad() ? '90%' : '30%',
    },
    title: {
      x: '0%',
      y: is.mobile() || is.ipad() ? '-420%' : '-620%',
    },
  }

  useEffect(() => {
    store.setPage('ゆるキャン')
    disableBodyScroll(outerWrapper.current)
    tl.to('.loader1-yurucamp', 2, {
      opacity: 1,
      ease: 'power3.out',
    })
      .to('.loader1-yurucamp', 1, {
        opacity: 0,
        ease: 'power3.out',
      })
      .to('.loader2-yurucamp', 2, {
        opacity: 1,
        ease: 'power3.out',
      })
      .to('.loader2-yurucamp', 1, {
        opacity: 0,
        ease: 'power3.out',
        onComplete: () => {
          setLoading(false)
          initialize(activePage)
        },
      })
  }, [])

  const initialize = (activePage_) => {
    tl.to(`.bg-${activePage_}-container-yurucamp`, 1, {
      opacity: 1,
      ease: 'power3.out',
    })
      .to(`.card-${activePage_}-img-yurucamp`, 0.2, {
        opacity: 1,
        ease: 'power3.out',
        delay: -0.6,
      })
      .to(`.${activePage_}-img`, 1.5, {
        x: animConfig.c.x,
        y: animConfig.c.y,
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        delay: -0.6,
      })
      .to(`.${activePage_}-movie`, 1.5, {
        x: animConfig.movie.x,
        y: animConfig.movie.y,
        rotate: '15deg',
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        delay: -1.4,
      })
      .to(`.${activePage_}-title`, 1.5, {
        x: animConfig.title.x,
        y: animConfig.title.y,
        scale: 1,
        opacity: 1,
        ease: 'power3.out',
        delay: -1.6,
      })
  }

  const reverse = (index) => {
    tl.to(`.${activePage}-img`, 1, {
      x: '0%',
      y: '0%',
      scale: 0,
      opacity: 0,
      ease: 'power3.out',
    })
      .to(`.${activePage}-movie`, 1, {
        x: '0%',
        y: '0%',
        rotate: '0deg',
        scale: 0,
        opacity: 0,
        ease: 'power3.out',
        delay: -1,
      })
      .to(`.${activePage}-title`, 1, {
        x: '0%',
        y: '0%',
        scale: 0,
        opacity: 0,
        ease: 'power3.out',
        delay: -1,
      })
      .to(`.card-${activePage}-img-yurucamp`, 0.4, {
        opacity: 0,
        ease: 'power3.out',
        delay: -0.5,
      })
      .to(`.bg-${activePage}-container-yurucamp`, 0.5, {
        opacity: 0,
        ease: 'power3.out',
        onComplete: () => {
          setActivePage(listIndex[index])
          initialize(listIndex[index], 2)
        },
      })
  }

  const tilted = (class_, when) => {
    tl.to(class_, 0.4, {
      rotate: when == 'start' ? '-6deg' : '0deg',
      scale: when == 'start' ? '1.07' : '1',
      ease: 'elastic.out(1,0.8)',
    })
  }

  const toPrev = (id, index) => {
    if (index - 1 >= 0) {
      reverse(index - 1)
    } else {
      reverse(3)
    }
  }

  const toNext = (id, index) => {
    if (index + 1 <= 3) {
      reverse(index + 1)
    } else {
      reverse(0)
    }
  }

  return (
    <div className="w-full h-full">
      <div
        className="w-full h-full fixed top-0 left-0 bg-white"
        style={{ zIndex: -1 }}
      ></div>
      {loading ? (
        <>
          <div
            className="flex justify-center items-center h-full w-full loader1-yurucamp"
            style={{ opacity: 0 }}
          >
            <img src={loader1} alt="" className="loader-img h-12" />
          </div>
          {is.mobile() || is.ipad() ? (
            <div
              className="h-full w-full loader2-yurucamp fixed top-0 right-0 bg-cover bg-center"
              style={{
                opacity: 0,
                backgroundImage: `url(${loader2_mobile})`,
              }}
            ></div>
          ) : (
            <div
              className="h-full w-full loader2-yurucamp fixed top-0 right-0 bg-cover bg-center"
              style={{
                opacity: 0,
                backgroundImage: `url(${loader2})`,
              }}
            ></div>
          )}
        </>
      ) : (
        list.map(
          ({ id, bg, bg_mobile, card, character, subCard, title }, index) => {
            return (
              <div
                className={
                  'h-full w-full overflow-y-scroll bg-' +
                  id +
                  '-container-yurucamp fixed top-0 left-0 bg-fixed bg-cover bg-center overflow-hidden'
                }
                style={{
                  opacity: 0,
                  backgroundImage: `url(${
                    is.mobile() || is.ipad() ? bg_mobile : bg
                  })`,
                  display: activePage == id ? '' : 'none',
                }}
                key={index}
              >
                <div className="fixed left-4 md:left-10 top-0 flex h-full justify-center items-center">
                  <img
                    src={to_left}
                    alt=""
                    className="cursor-pointer"
                    style={{ height: is.mobile() ? '5%' : '' }}
                    onClick={() => toPrev(id, index)}
                  />
                </div>
                <div className="fixed right-4 md:right-10 top-0 flex h-full justify-center items-center">
                  <img
                    src={to_right}
                    alt=""
                    className="cursor-pointer"
                    style={{ height: is.mobile() ? '5%' : '' }}
                    onClick={() => toNext(id, index)}
                  />
                </div>
                <div className="h-full flex justify-center items-center">
                  <img
                    src={character}
                    alt=""
                    className={
                      'absolute origin-center translate-x-1/2 translate-y-1/2 ' +
                      id +
                      '-img'
                    }
                    style={{
                      transform: 'scale(0)',
                      height: is.mobile() || is.ipad() ? '20%' : '30%',
                      opacity: 0,
                    }}
                  />
                  <img
                    src={subCard}
                    alt=""
                    className={
                      'absolute origin-center translate-x-1/2 translate-y-1/2 ' +
                      id +
                      '-movie rounded-2xl'
                    }
                    style={{
                      transform: 'scale(0) rotate(0deg)',
                      height: is.mobile() || is.ipad() ? '30%' : '40%',
                      opacity: 0,
                    }}
                  />
                  <img
                    src={title}
                    alt=""
                    className={
                      'absolute origin-center translate-x-1/2 translate-y-1/2 ' +
                      id +
                      '-title'
                    }
                    style={{
                      transform: 'scale(0)',
                      height: is.mobile() || is.ipad() ? '10%' : '7%',
                      opacity: 0,
                    }}
                  />
                  <img
                    src={card}
                    alt=""
                    className={
                      'card-' + id + '-img-yurucamp rounded-2xl cursor-pointer'
                    }
                    onMouseEnter={() =>
                      !is.mobile()
                        ? tilted(`.card-${activePage}-img-yurucamp`, 'start')
                        : ''
                    }
                    onMouseLeave={() =>
                      !is.mobile()
                        ? tilted(`.card-${activePage}-img-yurucamp`, 'end')
                        : ''
                    }
                    style={{
                      opacity: 0,
                      zIndex: 2,
                      height: is.mobile() ? '40%' : is.ipad() ? '50%' : '70%',
                      transform: 'rotate(0deg) scale(1)',
                    }}
                  />
                </div>
              </div>
            )
          },
        )
      )}
    </div>
  )
}

export default observer(YuruCamp)
