import React, {useState} from 'react' ;
import {Button, FloatingButton} from '../../common/UIBasics.js'
import './login.css'

import LoginForm from '../../components/splash/Login.js'
import SignUpForm from '../../components/splash/Signup.js'

const SplashPage = () => {

  const SPLASH = 0
  const LOGIN = 1
  const SIGNUP = 2
  const [form, setForm] = useState(0)

  const determineForm = () => {
    const splash = (
      <div>
        <Button onClick={()=>setForm(1)} text='Sign in' />
        <Button onClick={()=>setForm(2)} text='Sign up' />
      </div>
    )

    switch(form){
      case SPLASH:
        return splash
        break;
      case LOGIN:
        return <LoginForm />
        break;
      case SIGNUP:
        return <SignUpForm />
        break
      default:
        return splash
    }
  }

  return (
    <div className='login'>
      <div className="grid-container   full-page">

      {form !== 0 &&
        (<div className='back-button'>
          <FloatingButton type="back" size="medium" onClick={ ()=> setForm(SPLASH)}/>
        </div>)
      }

        <div className="logo-container">
            <img className='logo' src={require('../../common/resources/logo.png')} alt='logo'/>
        </div>

        <div className="form">
          {determineForm()}
        </div>

      </div>
    </div>
  )
}

export default SplashPage
