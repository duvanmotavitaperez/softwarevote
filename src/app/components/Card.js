import React, { useState } from "react";
import styles from '../css/card.module.css'

export default function Login(){
        const [question, setQuestion] = useState('Bienvenido')
        window.onload = () => {
            const formInit = new FormData()
            formInit.set('level', "starting")
            fetch('/eval',{
                method: 'POST',
                body: formInit,
            })
            .then(data => data.json())
            .then(data => {
                setQuestion(data)
            })
        }
        const send = function (){
            let $form = document.querySelector('form')
            const formData = new FormData($form)
            console.log(formData.get('answer'))
            fetch('/eval',{
                method: 'POST',
                body: formData,
            })
            .then(data => data.json())
            .then(data => {
                setQuestion(data)
            })
        }
        
    return(
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
                                </li>
                                <li>
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
    )
}