import React,  {useContext} from 'react';
import {NavLink} from "react-router-dom"
import { FloatingButton} from '../../common/UIBasics.js'
import {State, Dispatch} from '../../customContext'


const FolderItem = (props) => {

  const state = useContext(State)
  const dispatch = useContext(Dispatch)

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

export default FolderItem