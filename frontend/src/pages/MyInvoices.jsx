// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// export default function MyInvoices() {

//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     loadInvoices();
//   }, []);

//   async function loadInvoices() {

//     try {

//       const data = await api.get("/invoices/my");

//       setInvoices(data);

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-2xl font-bold mb-6">
//         My Invoices
//       </h1>

//       <table className="w-full bg-white rounded shadow">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Invoice</th>
//             <th className="p-3">Amount</th>
//             <th className="p-3">Status</th>
//             <th className="p-3">Paid At</th>
//           </tr>
//         </thead>

//         <tbody>

//           {invoices.map(inv => (

//             <tr key={inv.id}>

//               <td className="p-3">
//                 {inv.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 ₹ {inv.amount}
//               </td>

//               <td className="p-3">
//                 {inv.status}
//               </td>

//               <td className="p-3">

//                 {inv.paidAt
//                   ? new Date(inv.paidAt)
//                     .toLocaleDateString()
//                   : "-"
//                 }

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>

//   );

// }

import { useState } from "react";

const invoicesData = [
  {
    id: "INV-2024-001",
    vendor: "Acme Corp",
    amount: 15750,
    status: "Paid",
    date: "Jan 28, 2024"
  },
  {
    id: "INV-2024-002",
    vendor: "TechSupply Inc",
    amount: 8320.5,
    status: "Finance Approved",
    date: "Jan 25, 2024"
  },
  {
    id: "INV-2024-003",
    vendor: "Office Essentials",
    amount: 2450,
    status: "Dept Approved",
    date: "Jan 24, 2024"
  },
  {
    id: "INV-2024-004",
    vendor: "Global Services Ltd",
    amount: 45000,
    status: "Submitted",
    date: "Jan 25, 2024"
  },
  {
    id: "INV-2024-005",
    vendor: "CloudTech Solutions",
    amount: 12800,
    status: "Submitted",
    date: "Jan 26, 2024"
  },
  {
    id: "INV-2024-006",
    vendor: "Acme Corp",
    amount: 3200,
    status: "Draft",
    date: "Jan 27, 2024"
  },
  {
    id: "INV-2024-007",
    vendor: "TechSupply Inc",
    amount: 5600,
    status: "Rejected",
    date: "Jan 21, 2024"
  }
];

// ✅ INR formatter
const formatINR = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amount);

// ✅ Status colors
const getStatusStyle = (status) => {
  switch (status) {
    case "Paid":
      return "bg-green-100 text-green-700";
    case "Finance Approved":
      return "bg-green-100 text-green-700";
    case "Dept Approved":
      return "bg-blue-100 text-blue-700";
    case "Submitted":
      return "bg-yellow-100 text-yellow-700";
    case "Draft":
      return "bg-gray-200 text-gray-600";
    case "Rejected":
      return "bg-red-100 text-red-600";
    default:
      return "";
  }
};

export default function MyInvoices() {
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Invoices</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Last Updated</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {invoicesData.map((inv) => (
              <tr key={inv.id} className="border-t hover:bg-gray-50">
                <td className="p-4 text-blue-600 font-medium cursor-pointer">
                  {inv.id}
                </td>
                <td className="p-4">{inv.vendor}</td>
                <td className="p-4">{formatINR(inv.amount)}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${getStatusStyle(
                      inv.status
                    )}`}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="p-4 text-gray-500">{inv.date}</td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedInvoice(inv)}
                    className="flex items-center gap-1 text-gray-600 hover:text-black"
                  >
                    👁 View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Modal for View */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Invoice Details
            </h2>

            <p><strong>ID:</strong> {selectedInvoice.id}</p>
            <p><strong>Vendor:</strong> {selectedInvoice.vendor}</p>
            <p><strong>Amount:</strong> {formatINR(selectedInvoice.amount)}</p>
            <p><strong>Status:</strong> {selectedInvoice.status}</p>
            <p><strong>Date:</strong> {selectedInvoice.date}</p>

            <button
              onClick={() => setSelectedInvoice(null)}
              className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}