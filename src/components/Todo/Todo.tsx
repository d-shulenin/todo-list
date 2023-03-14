import { FC } from "react";
import "./todo.css";

export interface TodoI {
  title: string;
  description: string;
}

const Todo: FC<TodoI> = ({ title, description }) => {
  return (
    <li className="todo" draggable>
      <h4 className="todo__title">{title}</h4>
      <p className="todo__description">{description}</p>
    </li>
  );
};

export default Todo;
