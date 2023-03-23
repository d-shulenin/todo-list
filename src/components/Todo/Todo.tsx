import { FC, Dispatch, useState } from "react";
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
  const [touched, setTouched] = useState<boolean>(false);
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
      className={`todo ${done && "todo_done"} ${touched && "todo_touched"}`}
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
      onTouchStart={() => setTouched(true)}
      onTouchEnd={() => setTouched(false)}
    >
      <h4 className="todo__title">{title}</h4>
      {Boolean(description) && (
        <p className="todo__description">{description}</p>
      )}
      {Boolean(tags.filter(Boolean).length) && (
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
      )}
    </li>
  );
};

export default Todo;
