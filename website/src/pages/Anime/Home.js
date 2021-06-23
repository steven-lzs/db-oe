import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { enableBodyScroll } from 'body-scroll-lock'
import anime from 'api/anime'

const animeList = [
  {
    title: 'この音とまれ',
    page: '/anime/konooto',
    cover: anime.getImage('この音とまれ', 'cover.jpg'),
  },
  {
    title: 'ゆるキャン',
    page: '/anime/yurucamp',
    cover: anime.getImage('ゆるキャン', 'cover.jpg'),
  },
]

const Home = ({ outerWrapper }) => {
  const history = useHistory()

  const goTo = (page) => {
    history.push(page)
  }

  useEffect(() => {
    enableBodyScroll(outerWrapper.current)
  }, [])

  return (
    <div className="w-full h-full">
      <div className="grid-cols-12 grid gap-4">
        {animeList.map(({ title, page, cover }) => {
          return (
            <div
              className="col-span-6 md:col-span-4 lg:col-span-3 h-72 md:h-96 w-full bg-cover bg-center cursor-pointer"
              style={{ backgroundImage: `url(${cover})` }}
              onClick={() => goTo(page)}
            ></div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
