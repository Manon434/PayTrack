

// import { useEffect, useState } from "react";
// import { api } from "../api/client";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Invoices() {

//   const { dbUser } = useAuth();

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Pagination state
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // ===============================
//   // LOAD INVOICES (WITH PAGINATION)
//   // ===============================
//   // async function loadInvoices(pageNumber = 1) {

//   //   try {

//   //     setLoading(true);

//   //     // const response =
//   //     //   await api.get(`/invoices?page=${pageNumber}&limit=10`);

//   //     // setInvoices(response.data);
//   //     // setPage(response.page);
//   //     // setTotalPages(response.totalPages);

//   //     const response =
//   //     await api.get(`/invoices?page=${pageNumber}&limit=10`);

//   //     setInvoices(response.data);
//   //     setPage(response.data.page);
//   //      setTotalPages(response.data.totalPages);

//   //   } catch (err) {

//   //     console.error(err);
//   //     alert("Failed to load invoices");

//   //   } finally {

//   //     setLoading(false);

//   //   }

//   // }

//   async function loadInvoices(pageNumber = 1) {

//     try {
  
//       setLoading(true);
  
//       const response =
//         await api.get(`/invoices?page=${pageNumber}&limit=10`);
  
//       // backend returns { data, page, totalPages }
//       setInvoices(response.data || []);
//       setPage(response.page || 1);
//       setTotalPages(response.totalPages || 1);
  
//     } catch (err) {
  
//       console.error("Invoice load error:", err);
  
//       setInvoices([]);
  
//     } finally {
  
//       setLoading(false);
  
//     }
  
//   }

//   // ===============================
//   // ACTIONS
//   // ===============================

//   async function submitInvoice(id) {
//     try {
//       await api.post(`/invoices/${id}/submit`);
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function approveInvoice(id) {
//     try {
//       await api.post(`/invoices/${id}/approve`);
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function markPaid(id) {
//     try {
//       await api.post(`/invoices/${id}/pay`, {
//         paymentReference: "Manual Payment"
//       });
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function rejectInvoice(id) {
//     try {
//       const reason = prompt("Enter rejection reason:");
//       if (!reason || reason.trim() === "") return;

//       await api.post(`/invoices/${id}/reject`, {
//         reason
//       });

//       loadInvoices(page);

//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   // ===============================
//   // useEffect (LOAD FIRST PAGE)
//   // ===============================
//   useEffect(() => {
//     loadInvoices(1);
//   }, []);

//   if (loading)
//     return <div className="p-6">Loading invoices...</div>;

//   return (

//     <div className="p-6">

//       <h2 className="text-2xl font-bold mb-4">
//         Invoices
//       </h2>

//       <table className="w-full bg-white shadow rounded">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Invoice #</th>
//             <th className="p-3 text-left">Vendor</th>
//             <th className="p-3 text-left">Amount</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {/* {invoices.map(inv => ( */}
//           {(invoices || []).map(inv => (

//             <tr key={inv.id} className="border-t">

//               <td className="p-3 font-medium">
//                 {inv.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {inv.Vendor?.name || "-"}
//               </td>

//               <td className="p-3">
//                 ₹ {inv.amount}
//               </td>

//               <td className="p-3">
//                 {inv.status}
//               </td>

//               <td className="p-3 space-x-2">

//                 {/* Vendor */}
//                 {dbUser?.role === "VENDOR"
//                   && inv.status === "DRAFT" && (
//                   <button
//                     onClick={() => submitInvoice(inv.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Submit
//                   </button>
//                 )}

//                 {/* Department */}
//                 {dbUser?.role === "DEPARTMENT"
//                   && inv.status === "SUBMITTED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Dept Approve
//                   </button>
//                 )}

//                 {/* Finance */}
//                 {dbUser?.role === "FINANCE"
//                   && inv.status === "DEPT_APPROVED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Finance Approve
//                   </button>
//                 )}

//                 {/* Accounts / Finance */}
//                 {(dbUser?.role === "ACCOUNTS"
//                   || dbUser?.role === "FINANCE")
//                   && inv.status === "FINANCE_APPROVED" && (
//                   <button
//                     onClick={() => markPaid(inv.id)}
//                     className="bg-purple-600 text-white px-3 py-1 rounded"
//                   >
//                     Mark Paid
//                   </button>
//                 )}

//                 {/* Admin Reject */}
//                 {dbUser?.role === "ADMIN"
//                   && inv.status !== "PAID" && (
//                   <button
//                     onClick={() => rejectInvoice(inv.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 )}

//                 {/* View Details */}
//                 <Link
//                   to={`/invoices/${inv.id}`}
//                   className="text-indigo-600 hover:underline ml-2"
//                 >
//                   👁
//                 </Link>

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//       {/* ===============================
//           PAGINATION CONTROLS
//       =============================== */}

//       <div className="flex justify-center items-center mt-6 gap-4">

//         <button
//           disabled={page === 1}
//           onClick={() => loadInvoices(page - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => loadInvoices(page + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>

//   );

// }


// import { useEffect, useState } from "react";
// import { api } from "../api/client";
// import { useAuth } from "../context/AuthContext";
// import { Link } from "react-router-dom";

// export default function Invoices() {

//   const { dbUser } = useAuth();

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   // ===============================
//   // LOAD INVOICES
//   // ===============================
//   async function loadInvoices(pageNumber = 1) {

//     try {

//       setLoading(true);

//       const response =
//         await api.get(`/invoices?page=${pageNumber}&limit=10`);

//       setInvoices(response.data || []);
//       setPage(response.page || 1);
//       setTotalPages(response.totalPages || 1);

//     } catch (err) {

//       console.error("Invoice load error:", err);
//       setInvoices([]);

//     } finally {

//       setLoading(false);

//     }

//   }

//   // ===============================
//   // ACTIONS
//   // ===============================

//   async function submitInvoice(id) {
//     try {
//       await api.post(`/invoices/${id}/submit`);
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function approveInvoice(id) {
//     try {
//       await api.post(`/invoices/${id}/approve`);
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function markPaid(id) {
//     try {
//       await api.post(`/invoices/${id}/pay`, {
//         paymentReference: "Manual Payment"
//       });
//       loadInvoices(page);
//     } catch (err) {
//       alert(err.message);
//     }
//   }

//   async function rejectInvoice(id) {

//     try {

//       const reason = prompt("Enter rejection reason:");
//       if (!reason || reason.trim() === "") return;

//       await api.post(`/invoices/${id}/reject`, { reason });

//       loadInvoices(page);

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   // ===============================
//   // INITIAL LOAD
//   // ===============================
//   useEffect(() => {

//     loadInvoices(1);

//   }, []);

//   if (loading)
//     return <div className="p-6">Loading invoices...</div>;

//   return (

//     <div className="p-6">

//       <h2 className="text-2xl font-bold mb-4">
//         Invoices
//       </h2>

//       <table className="w-full bg-white shadow rounded">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3 text-left">Invoice #</th>
//             <th className="p-3 text-left">Vendor</th>
//             <th className="p-3 text-left">Amount</th>
//             <th className="p-3 text-left">Status</th>
//             <th className="p-3 text-left">Actions</th>
//           </tr>
//         </thead>

//         <tbody>

//           {(invoices || []).map(inv => (

//             <tr key={inv.id} className="border-t">

//               <td className="p-3 font-medium">
//                 {inv.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {inv.vendor?.name || "-"}
//               </td>

//               <td className="p-3">
//                 ₹ {inv.amount}
//               </td>

//               <td className="p-3">
//                 {inv.status}
//               </td>

//               <td className="p-3 space-x-2">

//                 {/* Vendor Submit */}
//                 {dbUser?.role === "VENDOR"
//                   && inv.status === "DRAFT" && (
//                   <button
//                     onClick={() => submitInvoice(inv.id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded"
//                   >
//                     Submit
//                   </button>
//                 )}

//                 {/* Department Approve */}
//                 {dbUser?.role === "DEPARTMENT"
//                   && inv.status === "SUBMITTED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-yellow-500 text-white px-3 py-1 rounded"
//                   >
//                     Dept Approve
//                   </button>
//                 )}

//                 {/* Finance Approve */}
//                 {dbUser?.role === "FINANCE"
//                   && inv.status === "DEPT_APPROVED" && (
//                   <button
//                     onClick={() => approveInvoice(inv.id)}
//                     className="bg-green-600 text-white px-3 py-1 rounded"
//                   >
//                     Finance Approve
//                   </button>
//                 )}

//                 {/* Mark Paid */}
//                 {(dbUser?.role === "ACCOUNTS"
//                   || dbUser?.role === "FINANCE")
//                   && inv.status === "FINANCE_APPROVED" && (
//                   <button
//                     onClick={() => markPaid(inv.id)}
//                     className="bg-purple-600 text-white px-3 py-1 rounded"
//                   >
//                     Mark Paid
//                   </button>
//                 )}

//                 {/* Admin Reject */}
//                 {dbUser?.role === "ADMIN"
//                   && inv.status !== "PAID" && (
//                   <button
//                     onClick={() => rejectInvoice(inv.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Reject
//                   </button>
//                 )}

//                 {/* View Activity */}
//                 <Link
//                   to={`/invoices/${inv.id}`}
//                   className="text-indigo-600 hover:underline ml-2"
//                 >
//                   👁
//                 </Link>

//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//       {/* ===============================
//           PAGINATION
//       =============================== */}

//       <div className="flex justify-center items-center mt-6 gap-4">

//         <button
//           disabled={page === 1}
//           onClick={() => loadInvoices(page - 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Previous
//         </button>

//         <span className="text-sm">
//           Page {page} of {totalPages}
//         </span>

//         <button
//           disabled={page === totalPages}
//           onClick={() => loadInvoices(page + 1)}
//           className="px-3 py-1 border rounded disabled:opacity-50"
//         >
//           Next
//         </button>

//       </div>

//     </div>

//   );

// }

import { DollarSign, CheckCircle, Clock } from "lucide-react";

const formatINR = (amt) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amt);

export default function Invoices() {

  const total = 94010.5;
  const paid = 16640;
  const pending = 68570.5;

  const card = "bg-white p-5 rounded-2xl shadow-sm border";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">Reports</h1>

      {/* 🔥 Top Cards */}
      <div className="grid grid-cols-3 gap-5 mb-6">

        <div className={card}>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Total Invoice Value</p>
              <h2 className="text-2xl font-bold">{formatINR(total)}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <DollarSign className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Paid Amount</p>
              <h2 className="text-2xl font-bold">{formatINR(paid)}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="text-green-600" />
            </div>
          </div>
        </div>

        <div className={card}>
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500">Pending Amount</p>
              <h2 className="text-2xl font-bold">{formatINR(pending)}</h2>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="text-yellow-600" />
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 Progress Bars */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-lg font-semibold mb-4">
          Invoice Status Breakdown
        </h2>

        {[
          { label: "Draft", value: 13, color: "bg-gray-400" },
          { label: "Submitted", value: 25, color: "bg-yellow-500" },
          { label: "Dept Approved", value: 13, color: "bg-blue-500" },
          { label: "Finance Approved", value: 13, color: "bg-green-500" },
          { label: "Paid", value: 25, color: "bg-purple-500" }
        ].map((item, i) => (
          <div key={i} className="mb-4">

            <div className="flex justify-between text-sm mb-1">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>

            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className={`${item.color} h-2 rounded-full transition-all`}
                style={{ width: `${item.value}%` }}
              ></div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}