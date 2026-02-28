

import Sidebar from "./Sidebar";
import RoleSelector from "../components/RoleSelector";

<div className="p-4">
  <RoleSelector />
</div>

export default function AppLayout({ children }) {
  return (
      
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
