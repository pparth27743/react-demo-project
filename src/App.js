import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import AddTask from "./components/AddTask"
import Footer from "./components/Footer";
import About from "./components/About";
import { ClipLoader } from "react-spinners";


function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false)

  const url = 'http://localhost:5000/tasks'

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      const getTasks = async () => {
        const tasks = await fetchTasks()
        setTasks(tasks)
      }
      getTasks()
      setLoading(false)
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

  //Delete Task
  const deleteTask = async (id) => {
    await fetch(`${url}/${id}`, { method: 'DELETE' })

    setTasks(tasks.filter((task) => task.id !== id));
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

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  };

  return (
    <Router>
      {loading && <div className="loader" >
        <ClipLoader color={'#4A83E2'} loading={loading} size={150} />
      </div>}

      {!loading && <div className="container">
        <Header showAdd={showAddTask} onAdd={() => setShowAddTask(!showAddTask)} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? (
          <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
        ) : (
          "No tasks to show"
        )}
        {/* <Routes>
          <Route path='/about' element={<About />} />
        </Routes> */}
        <Footer />
      </div>}
    </Router>
  );
}

export default App;
