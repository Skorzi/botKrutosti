import React from 'react'
import classes from './MyBtnDislike.module.css'
import dislike from '../../media/gifs/UnSmileGif.gif'

export default function MyBtnDislike({...props}) {
    return (
        <button className={classes.button_dislike} {...props}><img src={dislike}/></button>
    )
}
