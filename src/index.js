import React from 'react';
import ReactDOM from 'react-dom';
import {Route, HashRouter} from "react-router-dom"
import CustomContext from './customContext.js'

import Firebase from './firebase.js'

import SplashPage from './pages/splash/Splash.js'
import HomePage from './pages/home/Home.js'
import ListPage from './pages/list/List.js'


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


function App() {
  return (
    <HashRouter>
      <CustomContext initialState={initialState} reducer={reducer}>
        <div className="content">
          <Route exact path="/" component={SplashPage}/>
          <Route path="/home" component={HomePage}/>
          <Route path="/list" component={ListPage}/>
        </div>
      </CustomContext>
    </HashRouter>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

