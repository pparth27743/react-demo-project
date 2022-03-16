import { useDispatch, useSelector } from "react-redux";
import { toggleAddTaskForm } from "../redux/AppSlice";
import Button from "./Button";

const Header = ({ title }) => {

  const showAddTaskForm = useSelector(state => state.appState.showAddTaskForm);
  const dispatch = useDispatch()
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAddTaskForm ? 'red' : 'green'} text={showAddTaskForm ? 'Close' : 'Add'} onClick={() => dispatch(toggleAddTaskForm())} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
