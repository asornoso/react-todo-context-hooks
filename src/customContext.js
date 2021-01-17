import React, {createContext, useReducer} from 'react'

//contains state
export const State = createContext()

//contains dispatch
export const Dispatch = createContext()

//Takes in an initialState, reducer, and children(components) as props
//Returns provider
const CustomContext = ({initialState, reducer, children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
      <State.Provider value={state} >
        <Dispatch.Provider value={dispatch} >
          {children}
        </Dispatch.Provider>
      </State.Provider>
  )

}

export default CustomContext