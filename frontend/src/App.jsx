
console.log("ROOT APP LOADED");
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useAuth } from "./context/AuthContext.jsx";

import Layout from "./layout/Layout";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import Approvals from "./pages/Approvals";
import Vendors from "./pages/Vendors";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Admin from "./pages/Admin";
import MyInvoices from "./pages/MyInvoices";
import InvoiceDetails from "./pages/InvoiceDetails";


export default function App() {

  const { user, loading } = useAuth();

  // Prevent flicker while checking session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading PayTrack...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Login />;
  }

  // Logged in
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/create" element={<CreateInvoice />} />
          <Route path="/approvals" element={<Approvals />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/my-invoices" element={<MyInvoices />} />
          <Route path="/invoices/:id" element={<InvoiceDetails />} />
        </Routes>
      </Layout>
    </Router>
  );
}

