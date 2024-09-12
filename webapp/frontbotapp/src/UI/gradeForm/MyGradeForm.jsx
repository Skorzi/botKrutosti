import React, { useState } from 'react'
import classes from './MyGradeForm.module.css'
import { useSpring, animated } from '@react-spring/web'
import axios from "axios"
import useTelegram from '../../hooks/useTelegram'


export default function MyGradeForm({id, grade, setGrade, api}) {

    const {user, tg} = useTelegram()
    const [reason, setReason] = useState('Без причины')
    const [descrip, setDescrip] = useState('Без описания')

    function animHideStart(e){
        e.preventDefault()
        // console.log(grade)
        api.start({to:{x: -1000}})
        setTimeout(() => {setGrade(null)}, 200)
    }

    function sendGrade(url, likedis){
        let data_descrip = ' '
        let data_reason = ' '
        
        if (reason){
            data_reason = reason
        } else {
            data_reason = 'Без причины'
        }
        if(descrip){
            data_descrip = descrip
        } else {
            data_descrip = 'Без описания'
        }
        axios.post(url, {data: {
                            tg:{username: user.username},
                            grade_form:{
                                userName: user.id,
                                for_model: id,
                                reason: data_reason,
                                description: data_descrip
                            }
                        }
                    })
        .then(res => {
            // console.log(res)
            if(likedis.textContent > 0){
                likedis.textContent = likedis.textContent - 1
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

// http://127.0.0.1:8000/api/catchlog
    function handleClick(e){
        animHideStart(e)
        if(grade=='like'){
            let krut = document.querySelector('.krut__num')
            sendGrade('api/createlike', krut)

        } else if (grade=='dislike'){
            let shit = document.querySelector('.shit__num')
            sendGrade('api/createdislike', shit)
        }
    }


    return (
        <form className={classes.grade_form}>
            <input className={classes.reason_input} onChange={e => setReason(e.target.value)}
                    type="text" maxLength='32' placeholder='Причина отправки'/>
            <textarea className={classes.descrip_reason} onChange={e => setDescrip(e.target.value)} 
                        type="text" maxLength='200' placeholder='Описание причины'></textarea>
            <div className={classes.form__btns}>
                <button className={classes.form__btn_ok} onClick={handleClick} type='submit'>Отправить</button>
                <button className={classes.form__btn_cancel} onClick={animHideStart}>Отмена</button>
            </div>
        </form>
    )
}
