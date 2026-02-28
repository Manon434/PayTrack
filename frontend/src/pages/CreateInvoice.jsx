

// import { useState, useEffect, useMemo } from "react";
// import { api } from "../api/client";


// const USD_TO_INR = 83;

// export default function CreateInvoice() {

//   const [vendors, setVendors] = useState([]);
//   const [form, setForm] = useState({
//     vendorId: "",
//     invoiceNumber: "",
//     amount: "",
//     description: ""
//   });

//   const inr = useMemo(() => {
//     if (!form.amount) return "0.00";
//     return (Number(form.amount) * USD_TO_INR).toFixed(2);
//   }, [form.amount]);

//   useEffect(() => {
//     loadVendors();
//   }, []);

//   async function loadVendors() {

//     try {

//       const data = await api.get("/vendors");

//       setVendors(data);

//       if (data.length > 0) {
//         setForm(f => ({ ...f, vendorId: data[0].id }));
//       }

//     } catch (err) {

//       console.error(err);

//     }

//   }

//   async function handleSubmit(e) {

//     e.preventDefault();

//     try {

//       await api.post("/invoices", {

//         vendorId: form.vendorId,
//         invoiceNumber: form.invoiceNumber,
//         amount: Number(form.amount),
//         description: form.description

//       });

//       alert("Invoice created successfully");

//       setForm({
//         vendorId: vendors[0]?.id || "",
//         invoiceNumber: "",
//         amount: "",
//         description: ""
//       });

//     } catch (err) {

//       alert(err.message);

//     }

//   }

//   return (

//     <div className="max-w-3xl mx-auto">

//       <h1 className="text-2xl font-semibold mb-6">
//         Create Invoice
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow p-6 space-y-6"
//       >

//         {/* Vendor */}
//         <div>

//           <label className="block mb-1 font-medium">
//             Vendor
//           </label>

//           <select
//             value={form.vendorId}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 vendorId: e.target.value
//               })
//             }
//             className="w-full border rounded px-3 py-2"
//           >

//             {vendors.map(v => (

//               <option key={v.id} value={v.id}>
//                 {v.name} ({v.id})
//               </option>

//             ))}

//           </select>

//         </div>

//         {/* Invoice Number */}
//         <div>

//           <label className="block mb-1 font-medium">
//             Invoice Number
//           </label>

//           <input
//             value={form.invoiceNumber}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 invoiceNumber: e.target.value
//               })
//             }
//             className="w-full border rounded px-3 py-2"
//             required
//           />

//         </div>

//         {/* Amount */}
//         <div className="grid grid-cols-2 gap-4">

//           <div>

//             <label className="block mb-1 font-medium">
//               Amount USD
//             </label>

//             <input
//               type="number"
//               value={form.amount}
//               onChange={(e) =>
//                 setForm({
//                   ...form,
//                   amount: e.target.value
//                 })
//               }
//               className="w-full border rounded px-3 py-2"
//               required
//             />

//           </div>

//           <div>

//             <label className="block mb-1 font-medium">
//               Amount INR
//             </label>

//             <input
//               value={`₹ ${inr}`}
//               disabled
//               className="w-full border rounded px-3 py-2 bg-gray-100"
//             />

//           </div>

//         </div>

//         {/* Description */}
//         <div>

//           <label className="block mb-1 font-medium">
//             Description
//           </label>

//           <textarea
//             value={form.description}
//             onChange={(e) =>
//               setForm({
//                 ...form,
//                 description: e.target.value
//               })
//             }
//             className="w-full border rounded px-3 py-2"
//             required
//           />

//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded"
//         >

//           Create Invoice

//         </button>

//       </form>

//     </div>

//   );

// }

import { useState, useEffect, useMemo } from "react";
import { api } from "../api/client";
import { uploadInvoice } from "../lib/upload";

const USD_TO_INR = 83;

export default function CreateInvoice() {

  const [vendors, setVendors] = useState([]);
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    vendorId: "",
    invoiceNumber: "",
    amount: "",
    description: ""
  });

  /* Currency conversion */
  const inr = useMemo(() => {

    if (!form.amount) return "0.00";

    return (
      Number(form.amount) * USD_TO_INR
    ).toFixed(2);

  }, [form.amount]);

  /* Load vendors */
  useEffect(() => {

    loadVendors();

  }, []);

  async function loadVendors() {

    try {

      const data = await api.get("/vendors");

      setVendors(data);

      if (data.length > 0) {

        setForm(prev => ({
          ...prev,
          vendorId: data[0].id
        }));

      }

    } catch (err) {

      alert("Failed to load vendors");

    }

  }

  /* File selection */
  function handleFileChange(e) {

    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.size > 10 * 1024 * 1024) {

      alert("File too large (max 10MB)");
      return;

    }

    setFile(selected);

  }

  /* Submit invoice */
  async function handleSubmit(e) {

    e.preventDefault();

    if (!form.vendorId) {

      alert("Please select vendor");
      return;

    }

    setLoading(true);

    try {

      let fileUrl = null;

      /* Upload file to Supabase Storage */
      if (file) {

        fileUrl = await uploadInvoice(file);

      }

      /* Create invoice */
      await api.post("/invoices", {

        vendorId: form.vendorId,

        invoiceNumber: form.invoiceNumber.trim(),

        amount: Number(form.amount),

        description: form.description.trim(),

        fileUrl

      });

      alert("Invoice created successfully");

      /* Reset form */
      setForm({

        vendorId: vendors[0]?.id || "",

        invoiceNumber: "",

        amount: "",

        description: ""

      });

      setFile(null);

    } catch (err) {

      alert(err.message);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="max-w-3xl mx-auto">

      <h1 className="text-2xl font-semibold mb-6">
        Create Invoice
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 space-y-6"
      >

        {/* Vendor */}
        <div>

          <label className="block mb-1 font-medium">
            Vendor
          </label>

          <select
            value={form.vendorId}
            onChange={(e) =>
              setForm({
                ...form,
                vendorId: e.target.value
              })
            }
            className="w-full border rounded px-3 py-2"
            required
          >

            {vendors.length === 0 &&
              <option>
                No vendors found
              </option>
            }

            {vendors.map(v => (

              <option key={v.id} value={v.id}>

                {v.name} ({v.email})

              </option>

            ))}

          </select>

        </div>

        {/* Invoice Number */}
        <div>

          <label className="block mb-1 font-medium">
            Invoice Number
          </label>

          <input
            value={form.invoiceNumber}
            onChange={(e) =>
              setForm({
                ...form,
                invoiceNumber: e.target.value
              })
            }
            className="w-full border rounded px-3 py-2"
            placeholder="INV-2025-001"
            required
          />

        </div>

        {/* Amount */}
        <div className="grid grid-cols-2 gap-4">

          <div>

            <label className="block mb-1 font-medium">
              Amount (USD)
            </label>

            <input
              type="number"
              value={form.amount}
              onChange={(e) =>
                setForm({
                  ...form,
                  amount: e.target.value
                })
              }
              className="w-full border rounded px-3 py-2"
              required
            />

          </div>

          <div>

            <label className="block mb-1 font-medium">
              Amount (INR)
            </label>

            <input
              value={`₹ ${inr}`}
              disabled
              className="w-full border rounded px-3 py-2 bg-gray-100"
            />

          </div>

        </div>

        {/* Description */}
        <div>

          <label className="block mb-1 font-medium">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value
              })
            }
            className="w-full border rounded px-3 py-2"
            rows={4}
            required
          />

        </div>

        {/* File Upload */}
        <div>

          <label className="block mb-2 font-medium">
            Upload Invoice PDF
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full"
          />

          {file &&
            <p className="text-green-600 mt-2 text-sm">
              ✔ {file.name}
            </p>
          }

        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >

          {loading
            ? "Creating..."
            : "Create Invoice"
          }

        </button>

      </form>

    </div>

  );

}