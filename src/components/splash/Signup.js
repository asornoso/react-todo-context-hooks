import React, {useState, useEffect} from 'react';
import { useHistory} from "react-router-dom"
import {Button, Input, FloatingButton} from '../../common/UIBasics.js'
import {UserContext} from '../../index.js'

let state, dispatch, history

const submit = ( email, password, confirmPassword, name, e) => {
  e.preventDefault();

  if(name.length > 0 && email.length > 6 && password.length > 5 && confirmPassword.length > 5 && password === confirmPassword){
    state.firebase.createUser(email, password, name).then( data => {
      dispatch({type:'update_user_id', value: data.user.uid})
      dispatch({type:'update_email', value: data.user.email})
      dispatch({type:'update_name', value: data.user.displayName})
      history.push('/home')
    })
  }
  else
    console.log('invalid email, password or confirmPassword')
}

const SignupForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  state = UserContext.useState()
  dispatch = UserContext.useDispatch()
  history = useHistory()


  useEffect( () => {
    if(sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0)
      history.push('/home')
  })


  return (
    <div className="form">
      <form onSubmit={(e) => {submit(email ,password, confirmPassword, name, e) }} >
        <Input name="name" onChange={e => setName(e.target.value)} />
        <Input name="email" type='email' onChange={e => setEmail(e.target.value)} />
        <Input name="password" type='password' onChange={e => setPassword(e.target.value)}/>
        <Input name="confirmPassword" type='password' onChange={e => setConfirmPassword(e.target.value)}/>
        <Button text='Sign up'  />
      </form>
    </div>

  )
}

export default SignupForm
