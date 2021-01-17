import React, {useState, useEffect, useContext} from 'react';
import { useHistory} from "react-router-dom"
import {Button, Input} from '../../common/UIBasics.js'
import {State, Dispatch} from '../../customContext.js'



const SignupForm = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const history = useHistory()



  useEffect( () => {
    if(sessionStorage.getItem('id') && sessionStorage.getItem('id').length > 0)
      history.push('/home')
  })

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
