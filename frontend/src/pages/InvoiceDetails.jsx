
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { api } from "../api/client";
// import InvoiceActivity from "./InvoiceActivity";

// export default function InvoiceDetails() {

//   const { id } = useParams();

//   const [invoice, setInvoice] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     load();
//   }, [id]);

//   async function load() {
//     try {
//       const data = await api.get("/invoices");
//       const found = data.find(i => i.id === id);
//       setInvoice(found);
//     } catch (err) {
//       console.error("Invoice load error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading)
//     return <div className="p-6">Loading invoice...</div>;

//   if (!invoice)
//     return <div className="p-6">Invoice not found</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6 space-y-6">

//       {/* Invoice Summary */}
//       <div className="bg-white shadow rounded p-6">

//         <h1 className="text-2xl font-bold mb-4">
//           Invoice #{invoice.invoiceNumber}
//         </h1>

//         <div className="grid grid-cols-2 gap-4 text-sm">

//           <div>
//             <p className="text-gray-500">Vendor</p>
//             <p className="font-medium">
//               {invoice.vendor?.name}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500">Amount</p>
//             <p className="font-medium">
//               ₹ {invoice.amount}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500">Status</p>
//             <p className="font-medium">
//               {invoice.status}
//             </p>
//           </div>

//           <div>
//             <p className="text-gray-500">Created At</p>
//             <p className="font-medium">
//               {new Date(invoice.createdAt).toLocaleString()}
//             </p>
//           </div>

//         </div>

//         {/* Payment Section */}
//         {invoice.status === "PAID" && (
//           <div className="mt-6 border-t pt-4">
//             <h3 className="font-semibold mb-2">
//               Payment Details
//             </h3>
//             <p>
//               Paid At: {new Date(invoice.paidAt).toLocaleString()}
//             </p>
//             <p>
//               Reference: {invoice.paymentReference}
//             </p>
//             {invoice.paymentNotes && (
//               <p>Notes: {invoice.paymentNotes}</p>
//             )}
//           </div>
//         )}

//         {/* Rejection Section */}
//         {invoice.status === "REJECTED" && invoice.rejectionReason && (
//           <div className="mt-6 border-t pt-4 text-red-600">
//             <h3 className="font-semibold">
//               Rejection Reason
//             </h3>
//             <p>{invoice.rejectionReason}</p>
//           </div>
//         )}

//       </div>

//       {/* Activity Timeline */}
//       <InvoiceActivity invoiceId={id} />

//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/client";
import InvoiceActivity from "./InvoiceActivity";

export default function InvoiceDetails() {

  const { id } = useParams();

  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [id]);

  async function load() {
    try {

      // ✅ Fetch single invoice properly
      const data = await api.get(`/invoices`);

      const found = data.find(i => i.id === id);

      setInvoice(found || null);

    } catch (err) {
      console.error("Invoice load error:", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <div className="p-6">Loading invoice...</div>;

  if (!invoice)
    return <div className="p-6">Invoice not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Invoice Summary */}
      <div className="bg-white shadow rounded p-6">

        <h1 className="text-2xl font-bold mb-4">
          Invoice #{invoice.invoiceNumber}
        </h1>

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div>
            <p className="text-gray-500">Vendor</p>
            <p className="font-medium">
              {invoice.vendor?.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Amount</p>
            <p className="font-medium">
              ₹ {invoice.amount}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">
              {invoice.status}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Created At</p>
            <p className="font-medium">
              {new Date(invoice.createdAt).toLocaleString()}
            </p>
          </div>

        </div>

        {/* Payment Section */}
        {invoice.status === "PAID" && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">
              Payment Details
            </h3>
            <p>
              Paid At: {new Date(invoice.paidAt).toLocaleString()}
            </p>
            <p>
              Reference: {invoice.paymentReference}
            </p>
            {invoice.paymentNotes && (
              <p>Notes: {invoice.paymentNotes}</p>
            )}
          </div>
        )}

        {/* 🔥 IMPORTANT CHANGE */}
        {/* Rejection reason is now stored in activity metadata */}
        {/* So we do NOT check invoice.rejectionReason anymore */}

      </div>

      {/* Activity Timeline (handles reject reason display) */}
      <InvoiceActivity invoiceId={id} />

    </div>
  );
}