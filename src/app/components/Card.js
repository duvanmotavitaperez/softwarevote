import React, { useState } from "react";
import styles from '../css/card.module.css'
import ExitButton from "./ExitButton";
export default function Login(){

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
            <ExitButton/>
            <div id="cardGame">
                <div>
                    <input value={`User: ${userData.user}`.toUpperCase()} className={styles['username']} name="userLabel" type="text" id="username" disabled/>
                    <input value={`Global Score: ${userData.score}`.toUpperCase()} className={styles['global-score']} name="scoreLabel" type="text" id="globalScore" disabled/>
                    <input value={`Game Score: ${gameScore}`.toUpperCase()} className={styles['game-score']} name="scoreLabel" type="text" id="gameScore" disabled/>
                    <input value={`Category: ${question["category"]}`.toUpperCase()} className={styles['level']} name="levelLabel" type="text" id="level" disabled/>
                </div>
                <div className={styles["main-container"]}>
                        <div className={styles["quetion"]}>
                            <p>{question.question}</p>
                        </div>
                        <div className={styles["answers"]}>
                        <div className="contain-answers">
                            <form>
                                    <ul>
                                        <li>
                                            <input value={question["1"]} name="answer" type="radio" id="choice_1"/>
                                            <label htmlFor="choice_1">{question["1"]}</label>
                                        </li>                                <li>
                                            <input value={question["2"]} name="answer" type="radio" id="choice_2"/>
                                            <label htmlFor="choice_2">{question["2"]}</label>
                                        </li>
                                        <li>
                                            <input value={question["3"]} name="answer" type="radio" id="choice_3"/>
                                            <label htmlFor="choice_3">{question["3"]}</label>
                                        </li>
                                        <li>
                                            <input value={question["4"]} name="answer" type="radio" id="choice_4"/>
                                            <input value={question["category"]} name="level" type="hidden" id="level"/>
                                            <input value={question["questionId"]} name="questionId" type="hidden" id="level"/>
                                            <label htmlFor="choice_4">{question["4"]}</label>
                                        </li>
                                    </ul>
                            </form>
                            
                        </div>
                        <div className="contain-button">
                            <button onClick={send} >
                                <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                        </div>
                        </div>
                    </div>
            </div>
        </>
    )
}