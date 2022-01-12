import React from 'react'
import {render} from 'react-dom'
import styles from './css/gameover.module.css'

function gameOver(){
    return(
        <>
        <div className={style['main-container']}>
            <div>
                 <i class="fa fa-frown-o" aria-hidden="true"></i>
            </div>
            <div>
                <p>Game Over</p>
            </div>
        </div>
        </>
    )
}