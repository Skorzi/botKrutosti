import React, { useEffect, useRef, useState } from 'react'
import '../static/css/inventory_content.css'
import govno from '../media/images/govno.png'
import like from '../media/images/like.png'
import { useSpring, animated} from '@react-spring/web'
import useTelegram from '../hooks/useTelegram'
import axios from "axios"


export default function Continventory({ visible }) {
    const inv_cont = useRef(null)

    const [header_anim, api_header] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }))

    const [cool_anim, api_cool] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }))

    const [govno_anim, api_govno] = useSpring(() => ({
        from: { x: 0, y: 0 },
    }))


    useEffect(() => {
        if (visible) {
            inv_cont.current.classList.toggle('_active')

            api_header.start({
                from: { x: -1000 },
                to: { x: 0, y: 0 },
                delay: 30
            })

            api_govno.start({
                to: { x: 0, y: 0 },
                delay: 60
            })

            api_cool.start({
                to: { x: 0, y: 0 },
                delay: 120
            })

        } else {
            inv_cont.current.classList.toggle('_active')

            api_header.start({
                from: { x: 0 },
                to: { x: -1000 },
                delay: 220
            })

            api_govno.start({
                to: { x: 1000, y: 200 },
                delay: 220
            })

            api_cool.start({
                to: { x: -2000, y: 400 },
                delay: 220
            })


        }
    }, [visible])


    const { user, tg } = useTelegram()
    const [amountGrades, setAmount] = useState()

    useEffect(() => {
        axios.get('api/getUserTg?username=' + user.username)
            .then(res => {
                setAmount(res.data[0])
            })
            .catch(err => {
                console.error(err);
                setAmount({ username: 'none', amount_likes: 6, amount_dislikes: 2 })
            })


    //     //cron запрос?!?
    //     // axios.post('clean/delbase')
    //     // .then(res => {
    //     //     console.log('GOOO')
    //     // })
    //     // .catch(err => {
    //     //     console.log(err)
    //     // })

    }, [])


    return (
        <div className='inventory__content' ref={inv_cont}>
            <animated.div className='inventory__header' style={{ ...header_anim }}>У тебя на счету:</animated.div>
            <div className='inventory__count'>
                <animated.div className='count__krut' style={{ ...cool_anim }}>
                    <div className='krut__img_container'><img className='krut_img' src={like} /></div>
                    <div className='krut__num'>{amountGrades ? amountGrades.amount_likes : 6}</div>
                </animated.div>
                <animated.div className='count__shit' style={{ ...govno_anim }}>
                    <div className='shit__img_container'><img className='shit__img' src={govno} /></div>
                    <div className='shit__num'>{amountGrades ? amountGrades.amount_dislikes : 2}</div>
                </animated.div>
            </div>
        </div>
    )
}
