import React, { useEffect, useRef, useState } from 'react'
import Inventory from './components/Inventory'
import Continventory from './more_content/Continventory'
import './static/css/app.css'
import Buttondrag from './UI/buttonDrag/Buttondrag'
import Main from './components/Main'
import useTelegram from './hooks/useTelegram'


export default function App() {

    //рефактор?
    const [modal, setmodal] = useState(true)
    const {user} = useTelegram()

    function checkInventory() {
        if (modal) {
            setmodal(false)
        } else {
            setmodal(true)
        }
    }


    return (
        <div className='app'>
            <Main/>
            <div className='footer'>
                <Buttondrag visible={modal} checkInventory={checkInventory} />
                <Inventory visible={modal}>
                    <Continventory visible={modal} />
                </Inventory>
            </div>
        </div>
    )
}
