import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TaskContext } from "../contexts/TaskContext";
import Task from "./Task";


const Tasks = () => {

  const tasks = useSelector((state) => state.tasksState.tasks)

  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
        />
      ))}
    </>
  );
};

export default Tasks;

