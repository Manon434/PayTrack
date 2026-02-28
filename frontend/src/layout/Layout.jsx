// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// export default function Layout({ children }) {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-1">
//         <Topbar />
//         <main className="p-6 bg-gray-50 min-h-[calc(100vh-56px)]">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        {/* Top bar with RoleSelector */}
        <Topbar />

        {/* Page content */}
        <main className="p-6 bg-gray-50 min-h-[calc(100vh-56px)]">
          {children}
        </main>

      </div>

    </div>
  );
}
