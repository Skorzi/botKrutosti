import React, { useEffect } from 'react'
import { useRef } from 'react'
import '../static/css/Inventory.css'

export default function Inventory({children, visible}) {

    const inv = useRef(null)

    useEffect(() => {
        if(visible){
            inv.current.classList.toggle('_active')
        } else {
            inv.current.classList.toggle('_active')
        }

    }, [visible])


    return (
        <div className='inventory' ref={inv}>
            {children}
        </div>
    )
}
