

// import RoleSelector from "../components/RoleSelector";
// import { useAuth } from "../context/AuthContext";

// export default function Topbar() {

//   const { user, loading } = useAuth();

//   return (
//     <div className="bg-white border-b px-6 py-3 flex justify-between items-center">

//       <h1 className="text-lg font-semibold text-gray-700">
//         PayTrack
//       </h1>

//       <div className="flex items-center gap-4">

//         <RoleSelector />

//         {!loading && user && (
//           <div className="text-sm font-medium text-gray-600">
//             {user.role.toUpperCase()}
//           </div>
//         )}

//       </div>

//     </div>
//   );
// }

import { useAuth } from "../context/AuthContext";

export default function Topbar() {

  const { user, logout } = useAuth();

  return (

    <div className="bg-white border-b px-6 py-3 flex justify-between items-center">

      <h1 className="text-lg font-semibold">
        PayTrack
      </h1>

      <div className="flex items-center gap-4">

        <span className="text-sm text-gray-600">
          {user?.email}
        </span>

        <button
          onClick={logout}
          className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
        >
          Logout
        </button>

      </div>

    </div>

  );

}
