import React from 'react'

export default function useTelegram() {
    
    const tg = window.Telegram.WebApp;

    const onClose = () => {
        tg.close()
    }

    return {
        onClose,
        tg,
        user: tg.initDataUnsafe.user
    }
}
