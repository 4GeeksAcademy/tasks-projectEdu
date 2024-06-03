import React, { useState, useEffect } from "react";

export default function Tasks(props) {
  // props
  const { userSelected } = props;

  // states
  const [tareas, setTareas] = useState([]);
  const [tareaNombre, setTareaNombre] = useState("");

  // update users from endpoint
  useEffect(() => {
    consultarUsuarioYSusTareas();
  }, [userSelected]); // cada vez que userSelected cambia, se ejecuta la funcion.

  // functions
  async function consultarUsuarioYSusTareas() {
    const url = `https://playground.4geeks.com/todo/users/${userSelected}`;
    const response = await fetch(url);
    const data = await response.json();
    const newTodos = data.todos;
    setTareas(newTodos);
  }

  const agregarTarea = async () => {
    if (tareaNombre === "") {
      alert("Por Favor Agrega Una Tarea");
      return;
    }

    const url = `https://playground.4geeks.com/todo/todos/${userSelected}`;
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        label: tareaNombre,
        is_done: false,
      }),
    };

    // agregando la tarea
    await fetch(url, fetchOptions);
    setTareaNombre("");

    // actualizamos el listado de tareas
    consultarUsuarioYSusTareas();
  };

  const eliminarTarea = async (tareaId) => {
    const url = `https://playground.4geeks.com/todo/todos/${tareaId}`;
    const fetchOptions = {
      method: "delete",
    };
    // borrando la tarea
    await fetch(url, fetchOptions);
    // actualizando las tareas
    await consultarUsuarioYSusTareas();
  };

  const pressEnter = async (e) => {
    if (e.key === "Enter") {
      await agregarTarea();
    }
  };

  const borrarTodasLasTareas = async () => {
    const respuesta = prompt(
      "Estás seguro de querer borrar TODAS las tareas? (sí/no)"
    );

    if (respuesta.toLowerCase() === "sí" || respuesta.toLowerCase() === "si") {
      console.info("borrando todo...");
      for (const tarea of tareas) {
        // await eliminarTarea(tarea.id);
      }
      alert("Todas las tareas han sido borradas");
    }
  };

  return (
    <>
      <div className="divBotonInput d-flex">
        <input
          type="text"
          value={tareaNombre}
          onChange={(e) => setTareaNombre(e.target.value)}
          onKeyDown={pressEnter}
          placeholder="Agregar Tareas"
        />
        <button onClick={agregarTarea}>Agregar</button>
        <button onClick={borrarTodasLasTareas}>Borrar todas las tareas</button>
      </div>
      <div className="headLista2">
        <div className="headLista3"></div>
      </div>
      <div className="headLista1"></div>

      <div className="lista">
        <ul>
          {!!tareas?.length &&
            tareas.map((tarea) => (
              <li key={tarea.id}>
                <span className="viñeta">•</span>
                <span className="textoTarea">{tarea.label}</span>
                <span
                  className="BotonEliminarTarea"
                  onClick={() => eliminarTarea(tarea.id)}
                >
                  X
                </span>
              </li>
            ))}
        </ul>
        <div className="d-flex align-items-end mt-5">
          <span className="spanNumTareas">
            Numero de tareas: {tareas?.length}
          </span>
        </div>
      </div>
    </>
  );
}
