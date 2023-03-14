import { useState } from "react";
import "./App.css";
import List from "./components/List/List";
import Form from "./components/Form/Form";
import add from "./assets/icons/add.svg";
import { TodoI } from "./components/Todo/Todo";

function App() {
  const [todos, setTodos] = useState<TodoI[]>([]);
  const [form, setForm] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  return (
    <div className="app" data-theme={theme}>
      <h1 className="app__logo">Daily Todos</h1>
      <div className="app__wrapper">
        <List />
        <Form form={form} setForm={setForm} />
        {!form && (
          <button className="app__add-todo" onClick={() => setForm(true)}>
            <img src={add} alt="add" />
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
