import React from 'react'
import styles from '../css/card.module.css'
export default function ExitButton(){
    const exit = ()=>{
        
    }
    return(
        <>
            <div className={styles['contain-exit']}>
                <i className="fa fa-sign-out" aria-hidden="true" onClick={exit}></i>
            </div>
        </>
    )
}