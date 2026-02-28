

// import { NavLink } from "react-router-dom";
// import { Link } from "react-router-dom";

// const links = [
//   { name: "Dashboard", path: "/" },
//   { name: "Invoices", path: "/invoices" },
//   { name: "Create Invoice", path: "/create" }, // kept & highlighted
//   { name: "Approvals", path: "/approvals" },
//   { name: "Payments", path: "/payments" },
//   { name: "Vendors", path: "/vendors" },
//   { name: "Settings", path: "/settings" },
// ];

// <Link to="/admin">Admin</Link>

// export default function Sidebar() {
//   return (
//     <aside className="w-64 bg-slate-900 text-white min-h-screen px-4 py-6">
//       {/* Brand */}
//       <h1 className="text-2xl font-bold mb-10 tracking-tight">
//         PayTrack
//       </h1>

//       {/* Navigation */}
//       <nav className="space-y-1">
//         {links.map((l) => {
//           const isCreate = l.name === "Create Invoice";

//           return (
//             <NavLink
//               key={l.path}
//               to={l.path}
//               className={({ isActive }) =>
//                 `
//                 block px-4 py-2 rounded-md text-sm font-medium
//                 transition-colors
//                 ${
//                   isActive
//                     ? "bg-blue-600 text-white"
//                     : isCreate
//                     ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
//                     : "text-slate-300 hover:bg-slate-800 hover:text-white"
//                 }
//               `
//               }
//             >
//               {l.name}
//             </NavLink>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";

const links = [
  { name: "Dashboard", path: "/" },
  { name: "Invoices", path: "/invoices" },
  { name: "Create Invoice", path: "/create" },
  { name: "Approvals", path: "/approvals" },
  { name: "Payments", path: "/payments" },
  { name: "Vendors", path: "/vendors" },
  { name: "My Invoices", path: "/my-invoices" },

  // ✅ ADD THIS
  { name: "Admin", path: "/admin" },

  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen px-4 py-6">

      {/* Brand */}
      <h1 className="text-2xl font-bold mb-10 tracking-tight">
        PayTrack
      </h1>

      {/* Navigation */}
      <nav className="space-y-1">

        {links.map((l) => {

          const isCreate = l.name === "Create Invoice";
          const isAdmin = l.name === "Admin";

          return (
            <NavLink
              key={l.path}
              to={l.path}
              className={({ isActive }) =>
                `
                block px-4 py-2 rounded-md text-sm font-medium
                transition-colors

                ${
                  isActive
                    ? "bg-blue-600 text-white"

                    : isCreate
                    ? "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"

                    : isAdmin
                    ? "bg-purple-500/10 text-purple-400 hover:bg-purple-500/20"

                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
              `
              }
            >
              {l.name}
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}
