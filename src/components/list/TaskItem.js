import React, {useContext} from 'react';
import { FloatingButton} from '../../common/UIBasics.js'
import {State} from '../../customContext.js'

import TICK from '../../common/resources/tick.svg'


const TaskItem = (props) => {
    
  const state = useContext(State)
  
    return (
      <div className='taskItem'>
        <div className='status' onClick={()=> {
          console.log('you clicked me')
          state.firebase.updateTask(props.data.id, state.folder.id, state.id, {...props.data, editedOn: Date.now(), status: !props.data.status})
          .then( data => props.update())
        }}>{props.data.status}
          {
            props.data.status ?
               <div className='checkbox checked' > <img src={TICK} alt="tick-box"/>  </div>
            :
               <div className='checkbox' > </div>
          }
        </div>
        <div className='name'>
            {props.data.task.toUpperCase()}
        </div>
        <div className='cancel'>
          <FloatingButton type='cancel' size='small' onClick={ () => {
             console.log(`deleting task ${props.data.task }`)
             state.firebase.deleteTask(props.data.id, state.folder.id, state.id)
             .then( data =>   props.update() )
           }} />
        </div>
  
      </div>
    )
  }
  

  export default TaskItem