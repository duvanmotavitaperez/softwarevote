import React from 'react'
import {render} from 'react-dom'
import styles from './css/gameover.module.css'

function GameOver(props){

    const exit = () => {
        window.location.href = `${window.origin}`
    }
    return(
        <>
        <div className={styles['main-container']}>
            <div className={styles['icon']}>
                <i className="fa fa-frown-o" aria-hidden="true"></i>
            </div>
            <div className={styles['message']}>
                <h1>JUEGO TERMINADO</h1>
                <p>Lo sentimos, no has ganado ningún punto.</p>
            </div>
            <button><i className="fa fa-sign-out" aria-hidden="true" onClick={exit}></i></button>
        </div>
        </>
    )
}
render(<GameOver/>, document.querySelector('main'))