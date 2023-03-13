import { useState } from "react";
import "./App.css";
import List from "./components/List/List";
import add from "./assets/icons/add.svg";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  return (
    <div className="app" data-theme={theme}>
      <h1 className="app__logo">Daily Todos</h1>
      <List />
      <button className="app__add-todo">
        <img src={add} alt="add" />
      </button>
    </div>
  );
}

export default App;
