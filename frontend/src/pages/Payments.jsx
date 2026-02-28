

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

import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function Payments() {

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  async function loadPayments() {

    try {

      const data = await api.get("/invoices");

      const paidOnly =
        Array.isArray(data)
          ? data.filter(i => i.status === "PAID")
          : [];

      setPayments(paidOnly);

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  }

  if (loading)
    return <p>Loading payments...</p>;

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Payments
      </h1>

      <table className="w-full bg-white shadow rounded">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Invoice</th>
            <th className="p-3">Vendor</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Payment Ref</th>
            <th className="p-3">Paid Date</th>
          </tr>
        </thead>

        <tbody>

          {payments.map(p => (

            <tr key={p.id} className="border-t">

              <td className="p-3">
                {p.invoiceNumber}
              </td>

              <td className="p-3">
                {p.vendor?.name}
              </td>

              <td className="p-3">
                ₹ {p.amount}
              </td>

              <td className="p-3">
                {p.paymentReference}
              </td>

              <td className="p-3">
                {p.paidAt
                  ? new Date(p.paidAt)
                      .toLocaleDateString()
                  : "-"
                }
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}