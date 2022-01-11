import React from 'react'
import {render} from 'react-dom'
import InputItem from './components/InputItem'
import SendButton from './components/SendButton'
 
function Login(){
    window.onload = () => {
        const $form = document.getElementById('formdata')
        const $eye = document.getElementById('showText')
        const $textArea = document.querySelector('textarea')
        const $buttonSend = document.querySelector('.button-send')
        const $alert = document.querySelector('.alert')
        const $password = document.querySelector('.input-item.password')
        $eye.addEventListener('click', () => {
            $eye.classList.toggle('show-text')
        })
        $buttonSend.addEventListener('click', () => {
            const form = new FormData($form)
            const username = form.get('username')
            const pass = form.get('userpass')
            if(username == '' || pass == ''){
                        $alert.textContent = 'Por favor completa todos los campos'
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 5000);
            }
            else{
                fetch('/login', {
                    method: 'POST',
                    body: formData,
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if(data.error){
                        $alert.textContent = data.error
                        $alert.classList.remove('hidden')
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 5000);
                    }
                    else{
                        $alert.textContent = 'Registro exitoso'
                        $alert.style.color = '#F7901E'
                        $alert.classList.remove('hidden')
                        setTimeout(()=>{
                            $alert.textContent = 'Por favor ingresa tus datos y comienza el juego'
                        }, 4000)
                        setTimeout(() => {
                            $alert.classList.add('hidden')
                        }, 10000);
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
                    <input className='input-item password' type="password" name="pin" placeholder="Contraseña"/>
                    <span className="unmask-eye show-text" id="showText" style={{display: "inline-block"}}></span>
                </div> 
                <button>
                  <SendButton/>
                </button>
            </form>
        </div>
    )
}
render(<Login/>, document.querySelector('main')); 
