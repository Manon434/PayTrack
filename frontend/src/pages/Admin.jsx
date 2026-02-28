

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Admin() {

  const { dbUser, getToken } = useAuth();

  const [users, setUsers] = useState([]);

  useEffect(() => {

    if (dbUser?.role === "ADMIN") {

      loadUsers();

    }

  }, [dbUser]);

  // ✅ Load all users
  async function loadUsers() {

    try {

      const token = await getToken();

      const res = await fetch(
        "http://localhost:3000/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await res.json();

      setUsers(data);

    } catch (err) {

      console.error(err);

    }

  }

  // ✅ Change role
  async function changeRole(userId, newRole) {

    try {

      const token = await getToken();

      await fetch(
        "http://localhost:3000/admin/users/" + userId + "/role",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            role: newRole
          })
        }
      );

      loadUsers();

    } catch (err) {

      console.error(err);

    }

  }

  // ✅ Admin check
  if (!dbUser || dbUser.role !== "ADMIN") {

    return (
      <div className="p-6 text-red-500">
        Access denied. Admin only.
      </div>
    );

  }

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Admin Panel
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-3 text-left">Email</th>

            <th className="p-3 text-left">Role</th>

            <th className="p-3 text-left">Change Role</th>

          </tr>

        </thead>

        <tbody>

          {users.map(u => (

            <tr key={u.id} className="border-t">

              <td className="p-3">
                {u.email}
              </td>

              <td className="p-3">
                {u.role}
              </td>

              <td className="p-3">

                <select
                  value={u.role}
                  onChange={(e) =>
                    changeRole(u.id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >

                  <option value="ADMIN">ADMIN</option>
                  <option value="DEPARTMENT">DEPARTMENT</option>
                  <option value="FINANCE">FINANCE</option>
                  <option value="ACCOUNTS">ACCOUNTS</option>
                  <option value="VENDOR">VENDOR</option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

