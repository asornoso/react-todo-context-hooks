import React, {useEffect, useState, useRef} from 'react';
import {NavLink, useHistory} from "react-router-dom"
import { FloatingButton, Input} from '../common/UIBasics.js'
import {UserContext} from '../index.js'
import './home.css'

let state, dispatch, history

function logout(){
  state.firebase.logout()
  history.push('/')
}

const HomePage = () => {
  state = UserContext.useState()
  dispatch = UserContext.useDispatch()
  history = useHistory()

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

const FolderItem = (props) => {
  return (
    <div className='folderItem'>
      <NavLink to='list' className='name' onClick={ ()=>dispatch({type: 'update_folder', value: props.folder})} >
          {props.folder.name.toUpperCase()}
      </NavLink>
      <div className='cancel'>
        <FloatingButton type='cancel' size='small' onClick={ () => {
           state.firebase.deleteFolder(props.folder.id, state.id).then( ()  => {
            props.update()
           })
         }} />
      </div>
    </div>
  )
}

const AddFolderInput = (props) => {
  const [folderName, setFolderName] = useState("")
  const input = useRef('')

  return (
    <div className='folderInput'>
      <div className='userInput'>
        <Input type='text' size='inherit' useRef={input} name='add folder...' value={folderName} onChange={(e) => setFolderName(e.target.value)}/>
      </div>
      <div className='add'>
        <FloatingButton type="add" size="small" onClick={ ()=>{
          if(folderName.length > 0){
            state.firebase.createFolder(folderName, state.id).then( () => {
              input.current.value = ""
              props.update()
            })
          }else
            console.log('folder name invalid')
        }}/>
      </div>

    </div>
  )
}

export default HomePage
