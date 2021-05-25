import React, { useEffect } from 'react'
import user from 'api/user'

const Test = () => {
  useEffect(() => {
    user.login().then((resp) => {
      console.log(resp)
    })
  })

  return <div className=" absolute top-0 left-0 w-full h-full">test</div>
}

export default Test
