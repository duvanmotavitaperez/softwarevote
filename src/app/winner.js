import React, { useState }  from 'react'
import {render} from 'react-dom'
import styles from './css/winner.module.css'

function Winner(props){
    const [userData, setData] = useState('')
    window.onload = () => {
        let score = document.cookie.split(';')[2].split('=')[1]
        setData(score)
    }
    const exit = () => {
        window.location.href = `${window.origin}`
    }
    return(
        <>
        <div className={styles['main-container']}>
            <div className={styles['icon']}>
                <i class="fa fa-reddit-alien" aria-hidden="true"></i>
            </div>
            <div className={styles['message']}>
                <h1>¡FELICIDADES!</h1>
                <p>Has obtenido el máxino puntaje</p>
                <p>{`Tu nuevo puntaje es ${userData}.`}</p>
            </div>
            <button><i className="fa fa-sign-out" aria-hidden="true" onClick={exit}></i></button>
        </div>
        </>
    )
}
render(<Winner/>, document.querySelector('main'))