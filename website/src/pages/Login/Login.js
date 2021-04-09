import React, { useState, useEffect, useRef } from 'react';
import user from '../../api/user';

import { useTransition, useSpring, useChain, animated, config } from 'react-spring';
// import { useDrag } from 'react-use-gesture';

const calc = (x, y) => [-(y - window.innerHeight / 2) / 20, (x - window.innerWidth / 2) / 20, 1.1]
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

const background = [
    require("../../assets/img/officeBg.svg").default,
    require("../../assets/img/natureBg.svg").default,
    require("../../assets/img/calendarBg.svg").default,
    require("../../assets/img/trainBg.svg").default
];
const img = require('../../assets/img/having_fun.svg').default;

function Login() {
    const [props, set1] = useSpring(() => ({ xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }))
    // const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }))
    // const bind = useDrag(({offset: [x, y]}) => {
    //     set({ xy: [x,y] })
    // })
    const zoomInRef = useRef();
    const zoomIn = useSpring({
        ref: zoomInRef,
        from: {
            scale: 0
        },
        scale: 1,
        config: {
            duration: 2000
        }
    })

    const [index, set] = useState(0)
    const transitionsRef = useRef();
    const transitions = useTransition(background[index], null, {
      ref: transitionsRef,
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.molasses
    })

    const fadeInRef = useRef();
    const fadeIn = useSpring({
        ref: fadeInRef,
        from: {
            opacity: 0,
        },
        opacity: 1,
        config: {
            duration: 1000
        }
    })
    useEffect(() => void setInterval(() => set(state => { 
        console.log(state);
        return (state + 1) % background.length
    }), 3000), [])
    useChain([zoomInRef, fadeInRef, transitionsRef]);


    const first = () => {
        user.login().then(resp => {
            if(resp.status === 200) {
                alert(resp.data.item);
            }
        })

    }

    // useEffect(() => void setInterval(() => set(state => (state + 1) % 4), 2000), [])

    return(
        <div className="table w-full h-full relative">
            {/* <div className="table-cell align-middle w-full h-full" style={{background: `url(${background}) no-repeat center`, backgroundSize: 'contain'}}>
                <img src={require('../../assets/img/having_fun.svg').default} className="m-auto h-5/6 z-10" />
            </div> */}
            <div className="table-cell align-middle w-full h-full relative">
                <div className="absolute table w-full h-full z-20">
                    <animated.div style={fadeIn} className="table-cell align-middle text-center text-6xl font-bold">In Progress</animated.div>
                </div>
                <animated.img style={{
                    transform: zoomIn.scale.interpolate(zoomIn => `scale(${zoomIn})`)
                }} src={require('../../assets/img/having_fun.svg').default} className="mx-auto h-5/6 z-10" />
            </div>
            {
                transitions.map(({ item, props, key }) => (
                    <animated.div
                      key={key}
                      className="bg table-cell align-middle w-full h-full absolute top-0 left-0"
                      style={{ ...props, background: `url(${item}) no-repeat center`, backgroundSize: 'contain', zIndex: -1 }}
                    >
                        {/* <img src={require('../../assets/img/having_fun.svg').default} className="m-auto h-5/6 z-10" /> */}
                    </animated.div>
                  ))
            }
        </div>
    )
}

export default Login;