

// import { useEffect, useState } from "react";
// import { api } from "../api/client";

// export default function Payments() {

//   const [payments, setPayments] = useState([]);

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   async function loadPayments() {

//     try {

//       const data = await api.get("/invoices");

//       const paid =
//         data.filter(inv => inv.status === "PAID");

//       setPayments(paid);

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   return (

//     <div>

//       <h1 className="text-2xl font-bold mb-6">
//         Payment History
//       </h1>

//       <table className="w-full bg-white shadow rounded">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Invoice</th>
//             <th className="p-3">Vendor</th>
//             <th className="p-3">Amount</th>
//             <th className="p-3">Paid Date</th>
//           </tr>
//         </thead>

//         <tbody>

//           {payments.map(p => (

//             <tr key={p.id}>

//               <td className="p-3">
//                 {p.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {p.vendor?.name}
//               </td>

//               <td className="p-3">
//                 ₹ {p.amount}
//               </td>

//               <td className="p-3">
//                 {new Date(p.paidAt)
//                   .toLocaleDateString()}
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

// export default function Payments() {

//   const [payments, setPayments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadPayments();
//   }, []);

//   async function loadPayments() {

//     try {

//       const data = await api.get("/invoices");

//       const paidOnly =
//         Array.isArray(data)
//           ? data.filter(i => i.status === "PAID")
//           : [];

//       setPayments(paidOnly);

//     } catch (err) {

//       alert(err.message);

//     } finally {

//       setLoading(false);

//     }

//   }

//   if (loading)
//     return <p>Loading payments...</p>;

//   return (

//     <div>

//       <h1 className="text-2xl font-bold mb-6">
//         Payments
//       </h1>

//       <table className="w-full bg-white shadow rounded">

//         <thead className="bg-gray-100">
//           <tr>
//             <th className="p-3">Invoice</th>
//             <th className="p-3">Vendor</th>
//             <th className="p-3">Amount</th>
//             <th className="p-3">Payment Ref</th>
//             <th className="p-3">Paid Date</th>
//           </tr>
//         </thead>

//         <tbody>

//           {payments.map(p => (

//             <tr key={p.id} className="border-t">

//               <td className="p-3">
//                 {p.invoiceNumber}
//               </td>

//               <td className="p-3">
//                 {p.vendor?.name}
//               </td>

//               <td className="p-3">
//                 ₹ {p.amount}
//               </td>

//               <td className="p-3">
//                 {p.paymentReference}
//               </td>

//               <td className="p-3">
//                 {p.paidAt
//                   ? new Date(p.paidAt)
//                       .toLocaleDateString()
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

const initialPayments = [
  {
    id: "INV-2024-001",
    vendor: "Acme Corp",
    amount: 15750,
    approvedDate: "Jan 22, 2024",
    status: "PAID"
  },
  {
    id: "INV-2024-002",
    vendor: "TechSupply Inc",
    amount: 8320.5,
    approvedDate: "Jan 25, 2024",
    status: "APPROVED"
  },
  {
    id: "INV-2024-008",
    vendor: "Office Essentials",
    amount: 890,
    approvedDate: "Jan 15, 2024",
    status: "PAID"
  }
];

const formatINR = (amt) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amt);

export default function Payments() {
  const [data, setData] = useState(initialPayments);

  const markAsPaid = (id) => {
    setData(prev =>
      prev.map(p =>
        p.id === id ? { ...p, status: "PAID" } : p
      )
    );
  };

  const readyToPay = data.filter(d => d.status === "APPROVED").length;
  const paidCount = data.filter(d => d.status === "PAID").length;
  const totalOutstanding = data
    .filter(d => d.status === "APPROVED")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Payments</h1>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          Ready to Pay <h2 className="text-xl">{readyToPay}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Paid This Month <h2 className="text-xl">{paidCount}</h2>
        </div>
        <div className="bg-white p-4 rounded shadow">
          Total Outstanding
          <h2 className="text-xl">{formatINR(totalOutstanding)}</h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Payment Queue</h2>
          <p className="text-sm text-gray-500">
            Finance-approved invoices ready for payment processing.
          </p>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="p-4">Invoice #</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Approved Date</th>
              <th className="p-4">Payment Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-4 text-blue-600">{p.id}</td>
                <td className="p-4">{p.vendor}</td>
                <td className="p-4">{formatINR(p.amount)}</td>
                <td className="p-4">{p.approvedDate}</td>

                <td className="p-4">
                  {p.status === "PAID" ? (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Paid
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      Finance Approved
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {p.status === "APPROVED" ? (
                    <button
                      onClick={() => markAsPaid(p.id)}
                      className="bg-blue-600 text-white px-4 py-1 rounded"
                    >
                      Mark as Paid
                    </button>
                  ) : (
                    <span className="text-gray-500">
                      Paid on {p.approvedDate}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}