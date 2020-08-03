import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from "react-router-dom"
import CustomContext from './customContext.js'

import Firebase from './firebase.js'

import SplashPage from './splash/Splash.js'
import HomePage from './home/Home.js'
import ListPage from './list/List.js'
import LoginPage from './login/Login.js'
import SignupPage from './signup/Signup.js'


//Setup the user context(
//Keep it to a minimum to prevent performance issues as this is a global context
//This means, that if something changes in this context's state, then the whole app re-renders
const initialState = {
  email: undefined,
  id: undefined,
  name: undefined,
  folder: undefined,
  firebase: new Firebase()
}

const reducer = (state, action) => {
    switch(action.type){
      case 'update_user_id': {
        return {...state, id: action.value}
      }
      case 'update_name': {
        return { ...state, name:  action.value}
      }
      case 'update_email': {
        return { ...state, email:  action.value}
      }
      case 'update_folder': {
        return { ...state, folder:  action.value}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
}

const UserContext = new CustomContext(initialState, reducer)

function App() {
  return (
    <HashRouter>
      <UserContext.Provider>
        <div className="content">
          <Route exact path="/" component={SplashPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/signup" component={SignupPage}/>
          <Route path="/home" component={HomePage}/>
          <Route path="/list" component={ListPage}/>
        </div>
      </UserContext.Provider>
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

export {UserContext}
