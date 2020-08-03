import React, {useState, useEffect} from 'react';
import { useHistory} from "react-router-dom"
import {Button, Input, FloatingButton} from '../common/UIBasics.js'
import {UserContext} from '../index.js'
import './login.css'

let state, dispatch, history

const submit = ( email, password,e ) => {
  e.preventDefault();

  if(email.length > 6 && password.length > 5){
    state.firebase.signIn(email, password).then( data => {
      dispatch({type:'update_user_id', value: data.user.uid})
      dispatch({type:'update_email', value: data.user.email})
      dispatch({type:'update_name', value: data.user.displayName})

      history.push('/home')

    }).catch( error => {
      console.log(error)
      console.log('invalid email or password')
    })
  }
  else
    console.log('invalid email or password')
}

const LoginPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  state = UserContext.useState()
  dispatch = UserContext.useDispatch()
  history = useHistory()

  useEffect( () => {
    if(sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0)
      history.push('/home')
  })

  return (
    <div className='login'>

      <div className="grid-container   full-page">

        <div className='back-button'>
          <FloatingButton type="back" size="medium" onClick={ ()=>{ history.goBack()}}/>
        </div>

        <div className="logo-container">
            <img className='logo' src={require('../common/resources/logo.png')} alt='logo'/>
        </div>

        <div className="form">
          <form onSubmit={(e) => {submit(email, password, e) }}>
            <Input name="email"type='email' onChange={e => setEmail(e.target.value)} />
            <Input name="password" type='password' onChange={e => setPassword(e.target.value)}/>
            <Button text='Sign in' />
          </form>
        </div>

      </div>
    </div>
  )
}

export default LoginPage
