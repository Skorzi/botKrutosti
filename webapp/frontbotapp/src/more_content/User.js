import React, { useEffect, useRef, useState } from 'react'
import MyGradeForm from '../UI/gradeForm/MyGradeForm'
import { useSpring, animated } from '@react-spring/web'
import like_img from '../media/gifs/smileGif.gif'
import dislike_img from '../media/gifs/UnSmileGif.gif'
import MyBtnGrade from '../UI/buttonLike/MyBtnGrade'
import '../static/css/userblock.css'




export default function User({model}) {
    
    const [formVisible, setFormVisible] = useState(null)
    const name = model.name
    const photo = model.photo
    const mainForm = useRef()
    const mainBlock = useRef()

    const configForBtn = {
        from: {width: 140, height: 50, display: 'block'},
        config:{
            mass: 5,
            tension: 180,
            friction: 20
        }
    }

    const configToAnim = {
        to: [
            {width:0},
            {display: 'none'}
        ],
        config:{
            mass: 1,
            tension: 170,
            friction: 26
        }
    }

    const [btn_animLike, api_like] = useSpring(() => (
        configForBtn
    ))

    const [btn_animDislike, api_dislike] = useSpring(() => (
        configForBtn
    ))

    const [form_anim, api_form] = useSpring(() => ({
        from: {x: -200}
    }))

    const [block_anim, api_block] = useSpring(() => ({
        from: {x:0, y:0, z:0},
        config:{
            mass: 5,
            tension: 170,
            friction: 26
        }
    }))

    function handleClickLike(e){
        if(formVisible==null){
            setFormVisible('like')
            mainBlock.current.classList.add('_active')
            api_dislike.start(configToAnim)
            api_like.start({to:{width: configForBtn.from.width * 2, height: 75}})
            api_form.start({to:{x:0}})
            // api_block.start({to:{y:-mainForm.current.offsetWidth /3}})
            // console.log(mainForm.current.offsetWidth)
        }
    }

    function handleClickDisLike(e){
        if(formVisible==null){
            setFormVisible('dislike')
            mainBlock.current.classList.add('_active')
            api_like.start(configToAnim)
            api_dislike.start({to:{width: configForBtn.from.width * 2, height: 75}})
            api_form.start({to:{x: 0}})
            // api_block.start({to:{y:-mainForm.current.offsetWidth}})
        }
    }

    function backToDefault(btn_api){
        btn_api.start({
            to:[
                {display: configForBtn.from.display,},
                {width: configForBtn.from.width, height: configForBtn.from.height,}
            ], 
            config: configForBtn.config
        })       
    }

    useEffect(() => {
        if(formVisible==null){
            backToDefault(api_like)
            backToDefault(api_dislike)
            mainBlock.current.classList.remove('_active')
            // api_block.start({to:{y:0}})
        }
    }, [formVisible])

    //хочу чтобы при нажатии кнопки блок модели аккуратно сдвигался вниз на форм пикселей
    //нужно получить список main__blockов и сместить все те что после того на котором активирована форма
    return (
        <animated.div style={{...block_anim}} className='main__block_user' ref={mainBlock}>
            <div className='user__avatar'><img className='avatar_img' alt='' src={photo}/></div>
            <div className='user__username'>{name}</div>                        
            <div className='user__grade'>
                <div className='grade__btns'>
                    <animated.div style={{...btn_animLike}}>
                        <MyBtnGrade onClick={handleClickLike}><img src={like_img}/></MyBtnGrade>
                    </animated.div>
                    <animated.div style={{...btn_animDislike}}>
                        <MyBtnGrade onClick={handleClickDisLike}><img src={dislike_img}/></MyBtnGrade>
                    </animated.div>
                </div>
                <animated.div ref={mainForm} className='grade__form_block' style={{...form_anim}}>
                    {formVisible && 
                        <MyGradeForm id={model.id} grade={formVisible} setGrade={setFormVisible} api={api_form}/>
                    }
                </animated.div>
            </div>
        </animated.div>
    )
}
