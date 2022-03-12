import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import Task from "./Task";

const Tasks = () => {

  const { tasks, deleteTask, toggleReminder } = useContext(TaskContext);

  return (
    <>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        />
      ))}
    </>
  );
};

export default Tasks;

