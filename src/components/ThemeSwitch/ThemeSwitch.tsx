import { FC, Dispatch } from "react";
import "./themeSwitch.css";

interface ThemeSwitchI {
  theme: "light" | "dark";
  setTheme: Dispatch<React.SetStateAction<"light" | "dark">>;
}

const ThemeSwitch: FC<ThemeSwitchI> = ({ theme, setTheme }) => {
  return (
    <button
      className="theme-switch"
      data-theme={theme}
      onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
    />
  );
};

export default ThemeSwitch;
