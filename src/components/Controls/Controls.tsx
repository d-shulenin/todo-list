import { FC, useState, Dispatch } from "react";
import "./controls.css";
import { TodoI } from "../Todo/Todo";

interface ControlsProps {
  setTodos: Dispatch<React.SetStateAction<TodoI[]>>;
  setControls: Dispatch<React.SetStateAction<boolean>>;
}

const Controls: FC<ControlsProps> = ({ setTodos, setControls }) => {
  const [overDelete, setOverDelete] = useState<boolean>(false);
  const [overDone, setOverDone] = useState<boolean>(false);
  const dropHandler = (e: React.SyntheticEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    const dragged = localStorage.getItem("dragged");
    if (target.dataset.action === "delete") {
      setTodos((prev) => prev.filter((todo) => todo.id !== dragged));
    } else if (target.dataset.action === "done") {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === dragged) return { ...todo, done: true };
          return todo;
        })
      );
    }
    localStorage.setItem("dragged", "");
    setControls(false);
  };
  return (
    <div className="controls">
      <i
        className="controls__icon"
        data-action="delete"
        data-over={overDelete}
        onDragEnter={() => setOverDelete(true)}
        onDragLeave={() => setOverDelete(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      />
      <i
        className="controls__icon"
        data-action="done"
        data-over={overDone}
        onDragEnter={() => setOverDone(true)}
        onDragLeave={() => setOverDone(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropHandler}
      />
    </div>
  );
};

export default Controls;
