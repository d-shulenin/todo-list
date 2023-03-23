import { Dispatch, FC } from "react";
import "./list.css";
import Todo, { TodoI } from "../Todo/Todo";

interface ListProps {
  todos: TodoI[];
  setControls: Dispatch<React.SetStateAction<boolean>>;
}

const List: FC<ListProps> = ({ todos, setControls }) => {
  return (
    <ul className="list">
      {todos
        .sort((todo1, todo2) => +todo1.done - +todo2.done)
        .map((todo) => (
          <Todo key={todo.id} {...todo} setControls={setControls} />
        ))}
    </ul>
  );
};

export default List;
