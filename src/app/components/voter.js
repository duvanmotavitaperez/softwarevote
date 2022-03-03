import React from "react";
import InputItem from "./InputItem";
export default function Voters(){
    return(
        <>
            <div className="main-container">
            <form id="formdata" method="post" action='/login'>
                <input type="hidden" value="{{token}}"/>
                <p className="alert hidden">Por favor completa todos los campos</p>
                <InputItem name="username" id="username" placeholder="Nombre del usuario"/>
                <div>
                <button>
                  <SendButton icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>} msg=""/>
                </button>
                </div>
            </form>
        </div>
        </>
    )
}