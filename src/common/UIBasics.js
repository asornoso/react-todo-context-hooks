import React from 'react';
import {NavLink} from "react-router-dom"
import './UIBasics.css'

import ADD from '../common/resources/add.svg'
import BACK from '../common/resources/back.svg'
import CANCEL from '../common/resources/cancel.svg'
import LOGOUT from '../common/resources/logout.svg'
import TICK from '../common/resources/tick.svg'


const Button = ( props ) => {
  const size = props.size ? props.size : 'medium'

  return (
    <div className={`button button-${size}`}>
        {
          props.to ?
            <NavLink to={props.to}>{props.text.toUpperCase()}</NavLink>
          :
            <button type='submit' onClick={props.onClick}>{props.text.toUpperCase()}</button>
        }
    </div>
  )
}

const Input = (props) => {
  const size = props.size ? props.size : 'medium'
  const type = props.type ? props.type : 'text'

  return (
    <div className={`input input-${size}`}>
      <input ref={props.useRef} type={type} id={props.name.toLowerCase()} placeholder={props.name.toUpperCase()} onChange={props.onChange}/>
    </div>
  )
}

const FloatingButton = (props) => {
  const size = props.size ? props.size : 'medium'

  let imgSrc 

  switch(props.type){
    case 'back':
      imgSrc = BACK
      break
    case 'add':
      imgSrc = ADD
      break 
    case 'cancel': 
      imgSrc = CANCEL 
      break
    case 'logout':
      imgSrc = LOGOUT 
      break 
    case 'tick':
      imgSrc = TICK 
      break
  }

  return (
    <div className={`floating-button floating-button-${size} float-button-${props.type}`}>
      <img src={imgSrc} alt={props.type} onClick={props.onClick}/>
    </div>
  )
}

export { Button, Input, FloatingButton}
