

// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// export default function Approvals() {

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadInvoices();
//   }, []);

//   async function loadInvoices() {
//     try {

//       const data = await api.get("/invoices");

//       if (Array.isArray(data)) {
//         setInvoices(data);
//       } else {
//         setInvoices([]);
//       }

//     } catch (err) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function submitInvoice(id) {

//     try {
//       await api.post(`/invoices/${id}/submit`);
//       alert("Invoice submitted");
//       loadInvoices();
//     } catch (err) {
//       alert(err.message);
//     }

//   }

//   async function approveInvoice(id) {

//     try {
//       await api.post(`/invoices/${id}/approve`);
//       alert("Invoice approved");
//       loadInvoices();
//     } catch (err) {
//       alert(err.message);
//     }

//   }

//   async function rejectInvoice(id) {

//     try {
//       await api.post(`/invoices/${id}/reject`);
//       alert("Invoice rejected");
//       loadInvoices();
//     } catch (err) {
//       alert(err.message);
//     }

//   }

//   if (loading) return <p>Loading approvals...</p>;

//   return (
//     <div>

//       <h1 className="text-2xl font-bold mb-6">
//         Approvals
//       </h1>

//       <table className="w-full bg-white rounded shadow">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Invoice</th>
//             <th className="p-3 text-left">Vendor</th>
//             <th className="p-3 text-left">Amount</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {invoices.map(inv => (

//             <tr key={inv.id} className="border-t">

//               <td className="p-3">
//                 {inv.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {inv.vendor?.name}
//               </td>

//               <td className="p-3">
//                 ₹ {inv.amount}
//               </td>

//               <td className="p-3">
//                 {inv.status}
//               </td>

//               <td className="p-3 space-x-2">

//                 {inv.status === "DRAFT" && (
//                   <button
//                     onClick={() => submitInvoice(inv.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Submit
//                   </button>
//                 )}

//                 {inv.status === "SUBMITTED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Dept Approve
//                   </button>
//                 )}

//                 {inv.status === "DEPT_APPROVED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Finance Approve
//                   </button>
//                 )}

//                 {inv.status === "FINANCE_APPROVED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-purple-600 text-white px-3 py-1 rounded"
//                   >
//                     Mark Paid
//                   </button>
//                 )}

//                 {inv.status !== "PAID" && (
//                   <button
//                     onClick={() => rejectInvoice(inv.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 )}

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>
//   );

// }

// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// export default function Approvals() {

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadInvoices();
//   }, []);

//   async function loadInvoices() {

//     try {

//       const data = await api.get("/invoices");

//       setInvoices(Array.isArray(data) ? data : []);

//     } catch (err) {

//       alert(err.message);

//     } finally {

//       setLoading(false);

//     }

//   }

//   async function submitInvoice(id) {

//     try {

//       await api.post(`/invoices/${id}/submit`);

//       alert("Invoice submitted");

//       loadInvoices();

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   async function approveInvoice(id) {

//     try {

//       await api.post(`/invoices/${id}/approve`);

//       alert("Approved");

//       loadInvoices();

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   async function rejectInvoice(id) {

//     const reason = prompt("Enter reject reason:");

//     if (!reason) return;

//     try {

//       await api.post(`/invoices/${id}/reject`, {
//         reason
//       });

//       alert("Rejected");

//       loadInvoices();

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   async function markPaid(id) {

//     const paymentReference =
//       prompt("Enter payment reference number:");

//     if (!paymentReference) return;

//     try {

//       await api.post(`/invoices/${id}/pay`, {
//         paymentReference
//       });

//       alert("Invoice marked as PAID");

//       loadInvoices();

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   if (loading)
//     return <p>Loading approvals...</p>;

//   return (

//     <div>

//       <h1 className="text-2xl font-bold mb-6">
//         Approvals
//       </h1>

//       <table className="w-full bg-white rounded shadow">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Invoice</th>
//             <th className="p-3 text-left">Vendor</th>
//             <th className="p-3 text-left">Amount</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {invoices.map(inv => (

//             <tr key={inv.id} className="border-t">

//               <td className="p-3">
//                 {inv.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {inv.vendor?.name}
//               </td>

//               <td className="p-3">
//                 ₹ {inv.amount}
//               </td>

//               <td className="p-3">
//                 {inv.status}
//               </td>

//               <td className="p-3 space-x-2">

//                 {inv.status === "DRAFT" && (
//                   <button
//                     onClick={() => submitInvoice(inv.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Submit
//                   </button>
//                 )}

//                 {inv.status === "SUBMITTED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-500 text-white px-3 py-1 rounded"
//                   >
//                     Dept Approve
//                   </button>
//                 )}

//                 {inv.status === "DEPT_APPROVED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Finance Approve
//                   </button>
//                 )}

//                 {inv.status === "FINANCE_APPROVED" && (
//                   <button
//                     onClick={() => markPaid(inv.id)}
//                     className="bg-purple-600 text-white px-3 py-1 rounded"
//                   >
//                     Mark Paid
//                   </button>
//                 )}

//                 {inv.status !== "PAID" && (
//                   <button
//                     onClick={() => rejectInvoice(inv.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 )}

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>

//   );

// }

import { useState } from "react";

const initialData = [
  {
    id: "INV-2024-004",
    vendor: "Global Services Ltd",
    amount: 45000,
    date: "Jan 25, 2024",
    status: "PENDING"
  },
  {
    id: "INV-2024-005",
    vendor: "CloudTech Solutions",
    amount: 12800,
    date: "Jan 26, 2024",
    status: "PENDING"
  }
];

// INR formatter
const formatINR = (amt) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amt);

export default function Approvals() {
  const [data, setData] = useState(initialData);

  const handleApprove = (id) => {
    setData(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, status: "APPROVED" } : inv
      )
    );
  };

  const handleReject = (id) => {
    setData(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, status: "REJECTED" } : inv
      )
    );
  };

  const pending = data.filter(i => i.status === "PENDING");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Approvals</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <div className="bg-gray-100 px-4 py-2 rounded">
          Department <span className="ml-2 bg-yellow-200 px-2 rounded">{pending.length}</span>
        </div>
        <div className="bg-gray-100 px-4 py-2 rounded">
          Finance <span className="ml-2 bg-blue-200 px-2 rounded">1</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">
            Pending Department Approval
          </h2>
          <p className="text-sm text-gray-500">
            Review and approve invoices submitted by vendors.
          </p>
        </div>

        <table className="w-full text-left">
          <thead className="text-gray-600 bg-gray-50">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Submitted</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {pending.map(inv => (
              <tr key={inv.id} className="border-t">
                <td className="p-4 text-blue-600">{inv.id}</td>
                <td className="p-4">{inv.vendor}</td>
                <td className="p-4">{formatINR(inv.amount)}</td>
                <td className="p-4">{inv.date}</td>

                <td className="p-4 flex gap-3">
                  <button
                    onClick={() => handleApprove(inv.id)}
                    className="bg-green-500 text-white px-4 py-1 rounded"
                  >
                    ✓ Approve
                  </button>

                  <button
                    onClick={() => handleReject(inv.id)}
                    className="border border-red-500 text-red-500 px-4 py-1 rounded"
                  >
                    ✕ Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}