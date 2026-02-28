// src/components/InvoiceTable.jsx

import { InvoiceAPI } from "../api/client";

export default function InvoiceTable({ invoices, refresh }) {
  const role = localStorage.getItem("role");

  async function handleSubmit(id) {
    try {
      await InvoiceAPI.submit(id);
      alert("Invoice submitted successfully");
      refresh();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleApprove(id) {
    try {
      await InvoiceAPI.approve(id);
      alert("Invoice approved");
      refresh();
    } catch (e) {
      alert(e.message);
    }
  }

  async function handleReject(id) {
    const reason = prompt("Enter rejection reason:");
    if (!reason) return;

    try {
      await InvoiceAPI.reject(id, reason);
      alert("Invoice rejected");
      refresh();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">Invoice #</th>
          <th className="p-2 border">Amount</th>
          <th className="p-2 border">Status</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>

      <tbody>
        {invoices.map((inv) => (
          <tr key={inv.id}>
            <td className="p-2 border">{inv.invoiceNumber}</td>
            <td className="p-2 border">₹{inv.amount}</td>
            <td className="p-2 border">{inv.status}</td>
            <td className="p-2 border space-x-2">

              {/* Vendor → Submit */}
              {role === "VENDOR" && inv.status === "DRAFT" && (
                <button
                  onClick={() => handleSubmit(inv.id)}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Submit
                </button>
              )}

              {/* Department / Finance / Accounts → Approve */}
              {role !== "VENDOR" && inv.status !== "PAID" && (
                <>
                  <button
                    onClick={() => handleApprove(inv.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => handleReject(inv.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </>
              )}

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

  
  