import React, { useEffect, useState } from 'react'
import axios from "axios"
import User from '../more_content/User'
import '../static/css/main.css'
import useTelegram from '../hooks/useTelegram'


export default function Main() {

    const [grandModels, setGrandModels] = useState([])
    const {user, tg} = useTelegram()

    useEffect(()=>{
        axios.get('https://skorzi1.pythonanywhere.com/api/modellist')
        .then(res => {
            // console.log(res.data)
            setGrandModels(res.data)
        })
        .catch(err => {
            console.error(err); 
        })

    }, [])


    return (
        <div className='main'>
            <div className='main__content'>
                {grandModels.map(model =>
                    <User model={model}/>
                )}
            </div>
        </div>
    )
}
