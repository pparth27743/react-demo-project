import { createContext, useContext, useEffect, useState } from 'react'
import { AppContext } from './AppContext';

export const TaskContext = createContext();

const TaskContextProvider = (props) => {


  const url = 'http://localhost:5000/tasks';
  const [tasks, setTasks] = useState([]);
  
  const {setLoading} = useContext(AppContext);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const getTasks = async () => {
        const tasks = await fetchTasks()
        setTasks(tasks)
        setLoading(false)
      }
      getTasks()
      
    }, 1000);

  }, [])

  // Fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch(`${url}`)
    const data = await res.json()
    return data
  }

  // Fetch a task
  const fetchTask = async (id) => {
    const res = await fetch(`${url}/${id}`)
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {

    const res = await fetch(`${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json()
    setTasks([...tasks, data])
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {

    const data = await fetchTask(id)
    const updatedData = { ...data, reminder: !data.reminder }

    await fetch(`${url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: updatedData.reminder } : task
      )
    );
  };


  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`${url}/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider value={{tasks, deleteTask, toggleReminder, addTask}}>
      {props.children}
    </TaskContext.Provider>
  )
}

export default TaskContextProvider