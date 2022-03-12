import { createContext, useState } from 'react'

export const AppContext = createContext();

const AppContextProvider = (props) => {

  const [showAddTask, setShowAddTask] = useState(false)
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider value={{showAddTask, setShowAddTask, loading, setLoading}}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider