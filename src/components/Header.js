import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";
import Button from "./Button";

const Header = ({ title }) => {

  const { showAddTask, setShowAddTask} = useContext(AppContext);

  return (
    <header className="header">
      <h1>{title}</h1>
      <Button color={showAddTask ? 'red' : 'green'} text={showAddTask ? 'Close' : 'Add'} onClick={() => setShowAddTask(!showAddTask)} />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

export default Header;
