

import { useEffect, useState } from "react";
import { api } from "../api/client";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Invoices() {

  const { dbUser } = useAuth();

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // ===============================
  // LOAD INVOICES (WITH PAGINATION)
  // ===============================
  async function loadInvoices(pageNumber = 1) {

    try {

      setLoading(true);

      // const response =
      //   await api.get(`/invoices?page=${pageNumber}&limit=10`);

      // setInvoices(response.data);
      // setPage(response.page);
      // setTotalPages(response.totalPages);

      const response =
      await api.get(`/invoices?page=${pageNumber}&limit=10`);

      setInvoices(response.data.data);
      setPage(response.data.page);
       setTotalPages(response.data.totalPages);

    } catch (err) {

      console.error(err);
      alert("Failed to load invoices");

    } finally {

      setLoading(false);

    }

  }

  // ===============================
  // ACTIONS
  // ===============================

  async function submitInvoice(id) {
    try {
      await api.post(`/invoices/${id}/submit`);
      loadInvoices(page);
    } catch (err) {
      alert(err.message);
    }
  }

  async function approveInvoice(id) {
    try {
      await api.post(`/invoices/${id}/approve`);
      loadInvoices(page);
    } catch (err) {
      alert(err.message);
    }
  }

  async function markPaid(id) {
    try {
      await api.post(`/invoices/${id}/pay`, {
        paymentReference: "Manual Payment"
      });
      loadInvoices(page);
    } catch (err) {
      alert(err.message);
    }
  }

  async function rejectInvoice(id) {
    try {
      const reason = prompt("Enter rejection reason:");
      if (!reason || reason.trim() === "") return;

      await api.post(`/invoices/${id}/reject`, {
        reason
      });

      loadInvoices(page);

    } catch (err) {
      alert(err.message);
    }
  }

  // ===============================
  // useEffect (LOAD FIRST PAGE)
  // ===============================
  useEffect(() => {
    loadInvoices(1);
  }, []);

  if (loading)
    return <div className="p-6">Loading invoices...</div>;

  return (

    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Invoices
      </h2>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Invoice #</th>
            <th className="p-3 text-left">Vendor</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map(inv => (

            <tr key={inv.id} className="border-t">

              <td className="p-3 font-medium">
                {inv.invoiceNumber}
              </td>

              <td className="p-3">
                {inv.vendor?.name || "-"}
              </td>

              <td className="p-3">
                ₹ {inv.amount}
              </td>

              <td className="p-3">
                {inv.status}
              </td>

              <td className="p-3 space-x-2">

                {/* Vendor */}
                {dbUser?.role === "VENDOR"
                  && inv.status === "DRAFT" && (
                  <button
                    onClick={() => submitInvoice(inv.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                )}

                {/* Department */}
                {dbUser?.role === "DEPARTMENT"
                  && inv.status === "SUBMITTED" && (
                  <button
                    onClick={() => approveInvoice(inv.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Dept Approve
                  </button>
                )}

                {/* Finance */}
                {dbUser?.role === "FINANCE"
                  && inv.status === "DEPT_APPROVED" && (
                  <button
                    onClick={() => approveInvoice(inv.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Finance Approve
                  </button>
                )}

                {/* Accounts / Finance */}
                {(dbUser?.role === "ACCOUNTS"
                  || dbUser?.role === "FINANCE")
                  && inv.status === "FINANCE_APPROVED" && (
                  <button
                    onClick={() => markPaid(inv.id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}

                {/* Admin Reject */}
                {dbUser?.role === "ADMIN"
                  && inv.status !== "PAID" && (
                  <button
                    onClick={() => rejectInvoice(inv.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                )}

                {/* View Details */}
                <Link
                  to={`/invoices/${inv.id}`}
                  className="text-indigo-600 hover:underline ml-2"
                >
                  👁
                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      {/* ===============================
          PAGINATION CONTROLS
      =============================== */}

      <div className="flex justify-center items-center mt-6 gap-4">

        <button
          disabled={page === 1}
          onClick={() => loadInvoices(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => loadInvoices(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>

      </div>

    </div>

  );

}