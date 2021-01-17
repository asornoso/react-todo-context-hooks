import React, {useEffect, useState, useContext} from 'react';
import { useHistory} from "react-router-dom"
import { FloatingButton} from '../../common/UIBasics.js'
import {State, Dispatch} from '../../customContext.js'
import './list.css'

import TaskItem from '../../components/list/TaskItem'
import AddTaskInput from '../../components/list/AddTaskInput'


const ListPage = () => {
  const state = useContext(State)
  const dispatch = useContext(Dispatch)

  const history = useHistory()

  const [tasks, setTasks] = useState([])
  const [taskChanges, setTaskChange] = useState(0)

  useEffect( () => {
    if(!sessionStorage.getItem('id') || state.id == null)
      history.push('/login')
    else{
      let id = sessionStorage.getItem('id')
      if(!state.id){
        dispatch({type: 'update_user_id', value: id})
        dispatch({type: 'update_email', value:sessionStorage.getItem('email')})
        dispatch({type: 'update_name', value:sessionStorage.getItem('name')})
      }
      state.firebase.getTasks(id, state.folder.id).then( tasks => {
        console.log(tasks)
        setTasks(tasks)
      }).catch( error => console.log(error))
    }
  }, [taskChanges])

  const logout = () => {
    state.firebase.logout()
    history.push('/login')
  }



  return (

    <div className='list '>
      <div className='grid-container full-page'>

        <div className='back-button'>
          <FloatingButton type="back" size="medium" onClick={ ()=>{ history.goBack() } }/>
        </div>

        <div className='menu-button'>
          <FloatingButton type="logout" size="medium" onClick={ ()=>{  logout() }}/>
        </div>

        <div className="header">
          <h2>{state?.folder?.name.toUpperCase()}</h2>
        </div>

        <div className="folders-list">
          {
            <AddTaskInput update={() => {
              console.log('updating....')
               setTaskChange(taskChanges + 1)}
             }/>
           }
            {tasks.map( task =>
                <TaskItem data={task} key={task.id}
                update={ ()  =>{
                  console.log('updating...')
                  setTaskChange(taskChanges + 1)}
                }
              />)
            }

        </div>

      </div>
    </div>
  )
}

export default ListPage