import React, { useState } from "react";
import Weather from "./components/Weather";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <Weather darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
    </div>
  );
};

export default App;
