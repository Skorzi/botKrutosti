import React, { useEffect, useRef } from 'react'
import '../../static/css/buttondrag.css'

export default function Buttondrag({visible, checkInventory}) {

    const drag = useRef(null)

    useEffect(() => {
        if(visible){
            drag.current.classList.toggle('_active')
        } else {
            drag.current.classList.toggle('_active')
        }
    }, [visible])


    return (
        <div className='button_drag' onClick={checkInventory} ref={drag}>
            <div className='button_drag_brg1'></div>
            <div className='button_drag_brg2'></div>
            <div className='button_drag_brg3'></div>
        </div>
    )
}
