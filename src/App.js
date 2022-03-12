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


function App() {

  const { tasks  } = useContext(TaskContext);
  const { loading, showAddTask } = useContext(AppContext);

  return (
    <Router>
      {loading && <div className="loader" >
        <ClipLoader color={'#4A83E2'} loading={loading} size={150} />
      </div>}

      {!loading && <div className="container">
        <Header />
        {showAddTask && <AddTask />}
        {tasks.length > 0 ? <Tasks /> : "No tasks to show"}

        <Footer />
      </div>}
    </Router>
  );
}

export default App;
