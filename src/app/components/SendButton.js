import React from "react"

export default function SendButton(props){
    return(
        <div className="contain-button">
            <span className="button-send">
                {props.icon}&nbsp;{props.msg}
            </span>
        </div>  
    )
}