
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext.jsx";

// export default function RoleSelector() {

//   const { userId, switchUser } = useAuth();
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   async function loadUsers() {
//     try {
//       const res = await fetch("http://localhost:3000/users", {
//         headers: {
//           "x-user-id": userId || "temp"
//         }
//       });

//       const data = await res.json();

//       if (Array.isArray(data)) {
//         setUsers(data);
//       }

//     } catch (err) {
//       console.error(err);
//     }
//   }

//   return (
//     <select
//       value={userId || ""}
//       onChange={(e) => switchUser(e.target.value)}
//       className="border rounded px-3 py-1 bg-white"
//     >
//       <option value="">Select Role</option>

//       {users.map(user => (
//         <option key={user.id} value={user.id}>
//           {user.role} ({user.email})
//         </option>
//       ))}

//     </select>
//   );
// }

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function RoleSelector() {

  const { userId, switchUser } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {

    try {

      const res = await fetch(
        "http://localhost:3000/users"
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await res.json();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        setUsers([]);
      }

    } catch (err) {

      console.error("RoleSelector loadUsers error:", err);

      setUsers([]);

    } finally {

      setLoading(false);

    }
  }

  function handleChange(e) {

    const id = e.target.value;

    switchUser(id);
  }

  if (loading) {
    return (
      <div className="text-sm text-gray-400">
        Loading roles...
      </div>
    );
  }

  return (
    <select
      value={userId || ""}
      onChange={handleChange}
      className="border rounded px-3 py-1 bg-white text-sm"
    >

      <option value="">
        Select Role
      </option>

      {users.map(user => (

        <option key={user.id} value={user.id}>

          {user.role.toUpperCase()} ({user.email})

        </option>

      ))}

    </select>
  );
}
