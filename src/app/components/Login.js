import React from "react";
import InputItem from './InputItem'
import SendButton from './SendButton'

export default function Login(){
    window.onload = () => {
        const $form = document.getElementById('formdata')
        const $eye = document.getElementById('showText')
        const $buttonin = document.querySelector('.button-send')
        const $alert = document.querySelector('.alert')

        $eye.addEventListener('click', () => {
            $eye.classList.toggle('show-text')
        })
        $buttonin.addEventListener('click', () => {
            const formData = new FormData($form)
            const username = formData.get('username')
            const pass = formData.get('userpass')
            if(username == '' || pass == ''){
                        $alert.textContent = 'Por favor completa todos los campos'
                        $alert.style.color = 'red'
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 10000);
            }
            else if(pass.length > 4 || pass.length < 4){
                        $alert.textContent = 'Tu pin debe contener CUATRO digitos'
                        $alert.style.color = 'red'
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 10000);
            }
            else {
                fetch('/login', {
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
                             window.location.href = `${window.origin}/login`
                       
                    }
                })
            }
        })
            

        $form.addEventListener('submit', (event) => {
            event.preventDefault()
        })
    }
    
     
    return(
        <div className="main-container">
            <form id="formdata" method="post" action='/login'>
                <input type="hidden" value="{{token}}"/>
                <p className="alert hidden">Por favor completa todos los campos</p>
                <InputItem name="username" id="username" placeholder="Nombre del usuario"/>
                <div className="content-input">
                    <input className='input-item password' type="password" name="userpass" placeholder="Ingresa tu PIN"/>
                    <span className="unmask-eye show-text" id="showText" style={{display: "inline-block"}}></span>
                </div> 
                <div>
                <button>
                  <SendButton icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>} msg="Ingresar"/>
                </button>
                </div>
                
            </form>
        </div>
    )}
