import React from "react";

export default function TaskQuantity({ tareas }) {
  return (
    <>
      <div className="d-flex align-items-end mt-5">
        <span className="spanNumTareas">
          Numero de tareas: {tareas?.length}
        </span>
      </div>
    </>
  );
}
