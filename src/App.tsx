import { useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import "./App.css";
import List from "./components/List/List";
import Form from "./components/Form/Form";
import { TodoI } from "./components/Todo/Todo";
import ThemeSwitch from "./components/ThemeSwitch/ThemeSwitch";
import Controls from "./components/Controls/Controls";

function App() {
  const [todos, setTodos] = useLocalStorage<TodoI[]>("todos", []);
  const [controls, setControls] = useState<boolean>(false);
  const [form, setForm] = useState<boolean>(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const hours = new Date().getHours();
    if (hours >= 6 && hours < 18) return "light";
    else return "dark";
  });
  return (
    <div className="app" data-theme={theme}>
      <header className="app__logo">Daily Todos</header>
      <main className="app__wrapper">
        <List todos={todos} setControls={setControls} />
        <Form form={form} setForm={setForm} setTodos={setTodos} />
        {!form && (
          <button className="app__add-todo" onClick={() => setForm(true)} />
        )}
      </main>
      {controls && (
        <Controls todos={todos} setTodos={setTodos} setControls={setControls} />
      )}
      <ThemeSwitch theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
