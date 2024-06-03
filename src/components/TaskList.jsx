import React from "react";

export default function TaskList(props) {
  const { tareas, eliminarTarea } = props;

  return (
    <>
      {tareas.map((tarea) => (
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
    </>
  );
}
