import { FC, useState, Dispatch, DragEvent, MouseEvent } from "react";
import "./controls.css";
import { TodoI } from "../Todo/Todo";

interface ControlsProps {
  todos: TodoI[];
  setTodos: Dispatch<React.SetStateAction<TodoI[]>>;
  setControls: Dispatch<React.SetStateAction<boolean>>;
}

const Controls: FC<ControlsProps> = ({ todos, setTodos, setControls }) => {
  const isDone = todos.find(
    (todo) => todo.id === localStorage.getItem("dragged")
  )?.done;
  const [overDelete, setOverDelete] = useState<boolean>(false);
  const [overDone, setOverDone] = useState<boolean>(false);
  const dropOrClickHandler = (
    e: DragEvent<HTMLButtonElement> | MouseEvent<HTMLButtonElement>
  ): void => {
    e.preventDefault();
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
    <div className="controls" onClick={() => setControls(false)}>
      <button
        className="controls__icon controls__icon_delete"
        data-action="delete"
        data-over={overDelete}
        onDragEnter={() => setOverDelete(true)}
        onDragLeave={() => setOverDelete(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropOrClickHandler}
        onClick={dropOrClickHandler}
      />
      {!isDone && (
        <button
          className="controls__icon controls__icon_done"
          data-action="done"
          data-over={overDone}
          onDragEnter={() => setOverDone(true)}
          onDragLeave={() => setOverDone(false)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropOrClickHandler}
          onClick={dropOrClickHandler}
        />
      )}
    </div>
  );
};

export default Controls;
