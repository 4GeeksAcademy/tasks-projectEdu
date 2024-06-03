import React, { useEffect, useState } from "react";

export default function User(props) {
  // props
  const { setUserSelected, userSelected } = props;

  // state
  const [users, setUsers] = useState([]);

  // update users from enpoint
  useEffect(() => {
    actualizarUsuarios();
  }, []);

  async function actualizarUsuarios() {
    const url = "https://playground.4geeks.com/todo/users";
    const response = await fetch(url);
    const data = await response.json();
    const newUsers = data.users;
    setUsers(newUsers);
  }

  return (
    <>
      <label>Select an user:</label>
      <select
        onChange={(e) => setUserSelected(e.target.value)}
        value={userSelected}
      >
        <option value="" disabled>
          -- Select --
        </option>

        {!!users.length &&
          users.map((user) => (
            <option value={user.name} key={user.id}>
              {user.name}
            </option>
          ))}
      </select>
    </>
  );
}
