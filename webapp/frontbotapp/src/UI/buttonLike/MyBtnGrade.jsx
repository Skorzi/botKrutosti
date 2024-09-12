import React from 'react'
import classes from './MyBtnGrade.module.css'

export default function MyBtnGrade({children, ...props}) {
    return (
        <button className={classes.button_like} {...props} value='like'>{children}</button>
    )
}
