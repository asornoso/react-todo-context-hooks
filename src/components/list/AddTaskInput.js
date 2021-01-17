import React, { useState, useRef, useContext} from 'react';
import { FloatingButton, Input} from '../../common/UIBasics.js'
import {State} from '../../customContext.js'

const AddTaskInput = (props) => {
    const [taskName, setTaskName] = useState("")
    const input = useRef('')
    
    const state = useContext(State)
  
  
    return (
      <div className='taskInput'>
        <div className='userInput'>
          <Input type='text' size='inherit' useRef={input} name='add task...' onChange={(e) => setTaskName(e.target.value)}/>
        </div>
        <div className='add'>
          <FloatingButton type="add" size="small" onClick={ ()=>{
            if(taskName.length > 0){
              state.firebase.addTask(taskName, state.folder.id, state.id).then( (data) => {
                props.update()
                input.current.value = ""
              })
            }else
              console.log('folder name invalid')
          }}/>
        </div>
  
      </div>
    )
  }
  
  export default AddTaskInput
  