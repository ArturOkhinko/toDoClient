import React from "react";
import style from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main/Main";

function App() {
  return (
    <div className={style.main}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
