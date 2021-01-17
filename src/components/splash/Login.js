import React, {useState, useEffect, useContext} from 'react';
import { useHistory} from "react-router-dom"
import {Button, Input} from '../../common/UIBasics.js'
import {State, Dispatch} from '../../customContext.js'


const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const history = useHistory()

  useEffect( () => {
    if(sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0)
      history.push('/home')
  })

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

  return (
    <div className="form">
      <form onSubmit={(e) => {submit(email, password, e) }}>
        <Input name="email"type='email' onChange={e => setEmail(e.target.value)} />
        <Input name="password" type='password' onChange={e => setPassword(e.target.value)}/>
        <Button text='Sign in' />
      </form>
    </div>

  )
}

export default LoginForm
