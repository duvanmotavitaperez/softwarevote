import React, { useState } from "react";
import { render } from "react-dom";
import styles from '../css/card.module.css'
import SendButton from './SendButton'

export default function Login(){
        const [question, setQuestion] = useState('Bienvenido')
        window.onload = () => {
            fetch('/min')
            .then(data => data.json())
            .then(data => {
                setQuestion(data)
            })
        }
        const send = function (){
            fetch('/min')
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
                            <label htmlFor="choice_4">{question["4"]}</label>
                         </li>
                       </ul>
                   </div>
                   <div className="contain-button">
                       <button onClick={send} >
                          <SendButton icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>} msg="Registro"/>
                       </button>
                   </div>
                </div>
            </div>
    )
}