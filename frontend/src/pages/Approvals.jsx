

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

import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Approvals() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {

    try {

      const data = await api.get("/invoices");

      setInvoices(Array.isArray(data) ? data : []);

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  }

  async function submitInvoice(id) {

    try {

      await api.post(`/invoices/${id}/submit`);

      alert("Invoice submitted");

      loadInvoices();

    } catch (err) {

      alert(err.message);

    }

  }

  async function approveInvoice(id) {

    try {

      await api.post(`/invoices/${id}/approve`);

      alert("Approved");

      loadInvoices();

    } catch (err) {

      alert(err.message);

    }

  }

  async function rejectInvoice(id) {

    const reason = prompt("Enter reject reason:");

    if (!reason) return;

    try {

      await api.post(`/invoices/${id}/reject`, {
        reason
      });

      alert("Rejected");

      loadInvoices();

    } catch (err) {

      alert(err.message);

    }

  }

  async function markPaid(id) {

    const paymentReference =
      prompt("Enter payment reference number:");

    if (!paymentReference) return;

    try {

      await api.post(`/invoices/${id}/pay`, {
        paymentReference
      });

      alert("Invoice marked as PAID");

      loadInvoices();

    } catch (err) {

      alert(err.message);

    }

  }

  if (loading)
    return <p>Loading approvals...</p>;

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Approvals
      </h1>

      <table className="w-full bg-white rounded shadow">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Invoice</th>
            <th className="p-3 text-left">Vendor</th>
            <th className="p-3 text-left">Amount</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map(inv => (

            <tr key={inv.id} className="border-t">

              <td className="p-3">
                {inv.invoiceNumber}
              </td>

              <td className="p-3">
                {inv.vendor?.name}
              </td>

              <td className="p-3">
                ₹ {inv.amount}
              </td>

              <td className="p-3">
                {inv.status}
              </td>

              <td className="p-3 space-x-2">

                {inv.status === "DRAFT" && (
                  <button
                    onClick={() => submitInvoice(inv.id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Submit
                  </button>
                )}

                {inv.status === "SUBMITTED" && (
                  <button
                    onClick={() => approveInvoice(inv.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    Dept Approve
                  </button>
                )}

                {inv.status === "DEPT_APPROVED" && (
                  <button
                    onClick={() => approveInvoice(inv.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Finance Approve
                  </button>
                )}

                {inv.status === "FINANCE_APPROVED" && (
                  <button
                    onClick={() => markPaid(inv.id)}
                    className="bg-purple-600 text-white px-3 py-1 rounded"
                  >
                    Mark Paid
                  </button>
                )}

                {inv.status !== "PAID" && (
                  <button
                    onClick={() => rejectInvoice(inv.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}