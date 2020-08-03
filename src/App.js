import React from 'react';
import {Route, NavLink, HashRouter} from "react-router-dom"
import SplashPage from './Pages/SplashPage'
import './App.css';

const defaultUser = {
  userID: undefined,
  name: undefined,
  userPreferences: {}
}

const UserContext = React.createContext(defaultUser)



function App() {
  return (
    <HashRouter>
      <UserProvider>
      <div className="content">
        <Route exact path="/" component={SplashPage}/>
        <Route path="/stuff" component={LoginPage}/>
        <Route path="/contact" component={ListsPage}/>
        <Route path="/contact" component={ListItemsPage}/>
        <Route path="/contact" component={SettingsPage}/>
      </div>
      </UserProvider>
    </HashRouter>
  );
}

export default App;
