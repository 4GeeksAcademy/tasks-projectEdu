import React, { useState } from "react";
import "./App.css";
import User from "./components/User";
import Tasks from "./components/Tasks";

function App() {
  const [userSelected, setUserSelected] = useState("");

  return (
    <div className="contenedor">
      <div className="hoja">
        <h1>Lista de Tareas</h1>

        <User setUserSelected={setUserSelected} userSelected={userSelected} />

        {!!userSelected.length && <Tasks userSelected={userSelected} />}
      </div>
    </div>
  );
}

export default App;
