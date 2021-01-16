import React, {useState, useRef} from 'react';

import {Input, FloatingButton} from '../../common/UIBasics.js'
import {UserContext} from '../../index.js'



const AddFolderInput = (props) => {

  const [folderName, setFolderName] = useState("")
  const input = useRef('')

  const state = UserContext.useState()

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

export default AddFolderInput