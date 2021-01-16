import React from 'react';
import {NavLink} from "react-router-dom"
import {Input, FloatingButton} from '../../common/UIBasics.js'
import {UserContext} from '../../index.js'


const FolderItem = (props) => {

  const state = UserContext.useState()
  const dispatch = UserContext.useDispatch()

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