import React from "react";
import InputItem from "./InputItem";
export default function Voters(){
    window.onload = () =>  {
        const $form = document.getElementById('formdata')
        const $eye = document.getElementById('showText')
        const $buttonin = document.querySelector('.button-send')
        const $alert = document.querySelector('.alert')
        $buttonin.addEventListener('click', () => {
            const formData = new FormData($form)
            const username = formData.get('username')
            if(username == ''){
                        $alert.textContent = 'Por favor, ingresa tu nombre de usuario'
                        $alert.style.color = 'red'
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 10000);
            }
            else {
                fetch('/voter', {
                    method: 'POST',
                    body: formData,
                })
                .then(res => res.json())
                .then(data => {
                    if(data.refused){
                        $alert.textContent = data.error
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 5000);
                    }
                    else{
                        window.location.href = `${window.origin}/${data.url}`
                    }
                })
            }
        })
    }  
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