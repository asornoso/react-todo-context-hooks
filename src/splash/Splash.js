import React from 'react';
import {Button} from '../common/UIBasics.js'
import '../login/login.css'

const SplashPage = () => {
  return (
    <div className='login'>
      <div className="grid-container   full-page">

        <div className="logo-container">
            <img className='logo' src={require('../common/resources/logo.png')} alt='logo'/>
        </div>

        <div className="form">
          <Button to='/login' text='Sign in' />
          <Button to='/signup' text='Sign up' />
        </div>

      </div>
    </div>
  )
}

export default SplashPage
