import React, {useEffect, useState, useContext} from 'react';
import {useHistory} from "react-router-dom"
import { FloatingButton} from '../../common/UIBasics.js'
import {State, Dispatch} from '../../customContext'
import './home.css'

import AddFolderInput from '../../components/home/AddFolderInput.js'
import FolderItem from '../../components/home/FolderItem.js'



const HomePage = () => {


  const state = useContext(State)
  const dispatch = useContext(Dispatch)
  const history = useHistory()

  const [folders, setFolders] = useState([])
  const [folderChanges, setFolderChange] = useState(0)

  useEffect( () => {
    if(!sessionStorage.getItem('id'))
      history.push('/login')
    else{
      let id = sessionStorage.getItem('id')
      if(!state.id){
        dispatch({type: 'update_user_id', value: id})
        dispatch({type: 'update_email', value:sessionStorage.getItem('email')})
        dispatch({type: 'update_name', value:sessionStorage.getItem('name')})
      }
      state.firebase.getFolders(id).then( data => {
        setFolders(data)
      }).catch( error => console.log(error))
    }
  }, [folderChanges])

  const logout = () => {
    state.firebase.logout()
    history.push('/')
  }



  return (

    <div className='home '>
      <div className='grid-container full-page'>

        <div className='menu-button'>
          <FloatingButton type="logout" size="medium" onClick={ ()=>{  logout() }}/>
        </div>

        <div className="header">
          <h2>FOLDERS</h2>
        </div>

        <div className="folders-list">
            <AddFolderInput update={() => {
               setFolderChange(folderChanges + 1)}
             }/>

            { folders.map( folder =>
              <FolderItem folder={folder} key={folder.id} update={ ()  =>{
                 setFolderChange(folderChanges + 1)}
               }/>
            )}
        </div>

      </div>
    </div>
  )
}



export default HomePage
