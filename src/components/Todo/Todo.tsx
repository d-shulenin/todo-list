import { FC } from "react";
import "./todo.css";

export interface TodoI {
  id: string;
  title: string;
  description: string;
  tags: string[];
}

const Todo: FC<TodoI> = ({ title, description, tags }) => {
  return (
    <li className="todo" draggable>
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
