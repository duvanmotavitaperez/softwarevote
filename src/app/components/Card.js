import React, { useState } from "react";
import { render } from "react-dom";
import styles from '../css/card.module.css'
import SendButton from './SendButton'

export default function Login(){
    window.onload = () => {
        
        let [question, setQuetion] = useState('')
    }
    return(
        <div className="main-container">
            <div className="card">
                <div className="quetion">
                    <h1>{question}</h1>
                </div>
                <div className="answers">
                    <ul>
                        <li>
                            <input type='radio' name="answer" value={}/>
                        </li>
                        <li>

                        </li>
                        <li>

                        </li>
                        <li>

                        </li>
                    </ul>
                    <div>
                        <button>
                            <SendButton icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>} msg="Verificar"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}