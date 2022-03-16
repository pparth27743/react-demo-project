import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, toggleReminder } from '../redux/TasksSlice';

const Task = ({ task }) => {

  const dispatch = useDispatch()

  return (
    <div
      className={`task${task.reminder ? " reminder" : ""}`}
      onDoubleClick={() => dispatch(toggleReminder(task.id))}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => dispatch(deleteTask(task.id))}
        />
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
