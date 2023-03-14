import { FC } from "react";
import "./list.css";
import Todo, { TodoI } from "../Todo/Todo";

interface ListI {
  todos: TodoI[];
}

const List: FC<ListI> = ({ todos }) => {
  return (
    <ul className="list">
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} />
      ))}
    </ul>
  );
};

export default List;
