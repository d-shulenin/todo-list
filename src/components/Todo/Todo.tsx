import { FC, Dispatch } from "react";
import "./todo.css";

export interface TodoI {
  id: string;
  title: string;
  description: string;
  tags: string[];
  done: boolean;
}

interface TodoProps extends TodoI {
  setControls: Dispatch<React.SetStateAction<boolean>>;
}

const Todo: FC<TodoProps> = ({
  id,
  title,
  description,
  tags,
  done,
  setControls,
}) => {
  const dragStartHandler = () => {
    localStorage.setItem("dragged", id);
    setControls(true);
  };
  const dragEndHandler = () => {
    localStorage.setItem("dragged", "");
    setControls(false);
  };
  return (
    <li
      className={done ? "todo todo_done" : "todo"}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      <h4 className="todo__title">{title}</h4>
      <p className="todo__description">{description}</p>
      <ul className="todo__tags">
        {tags.map(
          (tag, index) =>
            Boolean(tag) && (
              <li key={index} className={`todo__tag todo__tag_${index}`}>
                {tag}
              </li>
            )
        )}
      </ul>
    </li>
  );
};

export default Todo;
