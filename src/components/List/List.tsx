import { FC } from "react";
import "./list.css";
import Todo from "../Todo/Todo";

interface ListI {}

const List: FC<ListI> = () => {
  return (
    <ul className="list">
      <Todo title="Lorem ipsum dolor" description=""></Todo>
      <Todo
        title="Lorem ipsum dolor"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      ></Todo>
    </ul>
  );
};

export default List;
