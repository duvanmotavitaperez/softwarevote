import React, { useState } from "react";
import styles from '../css/card.module.css'
import SendButton from "./SendButton";
import ExitButton from "./ExitButton";
export default function Card(){

        const [question, setQuestion] = useState('Bienvenido')
        const [userData, setData] = useState('')
        const [gameScore, setScore] = useState(0)
        var $cardGame = document.getElementById('cardGame')
        window.onload = () => {
            
            const formInit = new FormData()
            formInit.set('level', "starting")
            //Obtine la primera ronda de preguntas
            fetch('/eval',{
                method: 'POST',
                body: formInit,
            })
            .then(data => data.json())
            .then(data => {
                setQuestion(data.data)
                setData(data.userdata)
            })
        }
        const send = function (){
            let $form = document.querySelector('form')
            const formData = new FormData($form)
            fetch('/eval',{
                method: 'POST',
                body: formData,
            })
            .then(data => data.json())
            .then(data => {
                if(data.refused){
                    window.location.href = `${window.origin}/finish`
                }
                else if(data.end){
                        let $gameScore = document.getElementById('gameScore').value.split(':')[1]
                        let $globalScore = document.getElementById('globalScore').value.split(':')[1]
                        let score = parseInt($gameScore) + parseInt($globalScore) + data.score
                        console.log(score)
                        let formData = new FormData()
                        formData.set('score', score)
                        fetch('/savedata', {
                            method: 'POST',
                            body: formData,
                        })
                        .then((data) => data.json())
                        .then(data => {
                            if(data.conf){
                                window.location.href = `${window.origin}/winner`
                            }
                            else{
                                alert("Ha ocurrido un error, por favor intentalo nuevamente")
                            }  
                        })
                }
                else{
                    setQuestion(data.data)
                    setScore(gameScore + data.score)
                    document.getElementById('choice_1').checked = false
                    document.getElementById('choice_2').checked = false
                    document.getElementById('choice_3').checked = false
                    document.getElementById('choice_4').checked = false
                } 
                
            })
        }
        
    return(
        <>      
            <form>
               <div className={styles["main-container"]}>
                    <div className={`${styles["container-box"]} ${styles["box-grow"]}`}>
                            <img src="/media/bachillerato/image1.jpg" alt="" />
                    </div>
                    <div className={`${styles["container-box"]} ${styles["box-grow"]}`}>
                            <img src="/media/bachillerato/image2.jpg" alt="" />
                    </div>
                    <div className={`${styles["container-box"]} ${styles["box-grow"]}`}>
                            <img src="/media/bachillerato/image3.jpg" alt="" />
                    </div>
                    <div className={`${styles["container-box"]} ${styles["box-grow"]}`}>
                            <img src="/media/bachillerato/image4.jpg" alt="" />
                    </div>
                    <div className={`${styles["container-box"]} ${styles["box-grow"]}`}>
                            <img src="/media/bachillerato/image5.jpg" alt="" />
                    </div>
                    <button id={styles["send"]}>
                        <SendButton icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>} msg=""/>
                    </button>
                </div>
            </form>
        </>
    )
}