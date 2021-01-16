import React, {useEffect, useState, useRef} from 'react';
import { useHistory} from "react-router-dom"
import { FloatingButton, Input} from '../../common/UIBasics.js'
import {UserContext} from '../../index.js'
import './list.css'

let state, dispatch, history

function logout(){
  state.firebase.logout()
  history.push('/login')
}

const ListPage = () => {
  state = UserContext.useState()
  dispatch = UserContext.useDispatch()

  history = useHistory()

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

const TaskItem = (props) => {
  return (
    <div className='taskItem'>
      <div className='status' onClick={()=> {
        console.log('you clicked me')
        state.firebase.updateTask(props.data.id, state.folder.id, state.id, {...props.data, editedOn: Date.now(), status: !props.data.status})
        .then( data => props.update())
      }}>{props.data.status}
        {
          props.data.status ?
             <div className='checkbox checked' > <img src={require('../../common/resources/tick.svg')}/>  </div>
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

const AddTaskInput = (props) => {
  const [taskName, setTaskName] = useState("")
  const input = useRef('')


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

export default ListPage
