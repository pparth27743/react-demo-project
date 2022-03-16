import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import AddTask from "./components/AddTask"
import Footer from "./components/Footer";
import About from "./components/About";
import { ClipLoader } from "react-spinners";
import { TaskContext } from "./contexts/TaskContext";
import { AppContext } from "./contexts/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTasks } from "./redux/TasksSlice";
import { setLoading } from "./redux/AppSlice";




function App() {

  const tasks = useSelector((state) => state.tasksState.tasks)
  const {loading, showAddTaskForm } = useSelector((state) => state.appState)
  const dispatch = useDispatch()

  useEffect(() => {

    dispatch(setLoading(true))
    setTimeout(() => {
      dispatch(fetchAllTasks())
      dispatch(setLoading(false))
    }, 1000);

  }, [])

  return (
    <Router>
      {loading && <div className="loader" >
        <ClipLoader color={'#4A83E2'} loading={loading} size={150} />
      </div>}

      {!loading && <div className="container">
        <Header />
        {showAddTaskForm && <AddTask />}
        {tasks.length > 0 ? <Tasks /> : "No tasks to show"}

        <Footer />
      </div>}
    </Router>
  );
}

export default App;
