// export default function Dashboard() {
//   const stats = [
//     {
//       label: "Total Invoices",
//       value: 8,
//       color: "bg-indigo-100 text-indigo-600",
//       icon: "📄",
//     },
//     {
//       label: "Pending Approval",
//       value: 4,
//       color: "bg-yellow-100 text-yellow-600",
//       icon: "⏳",
//     },
//     {
//       label: "Approved",
//       value: 2,
//       color: "bg-green-100 text-green-600",
//       icon: "✅",
//     },
//     {
//       label: "Paid",
//       value: 1,
//       color: "bg-emerald-100 text-emerald-600",
//       icon: "💰",
//     },
//   ];

//   const recentInvoices = [
//     {
//       id: "INV-2024-001",
//       vendor: "Acme Corporation",
//       amount: "$15,750.00",
//       status: "Paid",
//       statusColor: "bg-green-100 text-green-700",
//       date: "Jan 15, 2024",
//     },
//     {
//       id: "INV-2024-002",
//       vendor: "TechSupply Inc",
//       amount: "$8,420.50",
//       status: "Finance Approved",
//       statusColor: "bg-emerald-100 text-emerald-700",
//       date: "Jan 18, 2024",
//     },
//     {
//       id: "INV-2024-003",
//       vendor: "Office Essentials",
//       amount: "$2,340.00",
//       status: "Dept Approved",
//       statusColor: "bg-blue-100 text-blue-700",
//       date: "Jan 20, 2024",
//     },
//     {
//       id: "INV-2024-004",
//       vendor: "Global Services LLC",
//       amount: "$45,000.00",
//       status: "Submitted",
//       statusColor: "bg-yellow-100 text-yellow-700",
//       date: "Jan 22, 2024",
//     },
//   ];

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold">Dashboard</h1>

//       {/* Stats cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat) => (
//           <div
//             key={stat.label}
//             className="bg-white p-5 rounded-lg shadow flex items-center gap-4"
//           >
//             <div
//               className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${stat.color}`}
//             >
//               {stat.icon}
//             </div>
//             <div>
//               <p className="text-sm text-gray-500">{stat.label}</p>
//               <p className="text-2xl font-semibold">{stat.value}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Recent invoices */}
//       <div className="bg-white rounded-lg shadow p-6">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">Recent Invoices</h2>
//           <button className="text-sm text-indigo-600 hover:underline">
//             View All
//           </button>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead className="text-left text-gray-500 border-b">
//               <tr>
//                 <th className="py-3">Invoice</th>
//                 <th>Vendor</th>
//                 <th>Amount</th>
//                 <th>Status</th>
//                 <th>Date</th>
//                 <th></th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentInvoices.map((inv) => (
//                 <tr
//                   key={inv.id}
//                   className="border-b last:border-none hover:bg-gray-50"
//                 >
//                   <td className="py-3 font-medium">{inv.id}</td>
//                   <td>{inv.vendor}</td>
//                   <td>{inv.amount}</td>
//                   <td>
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-medium ${inv.statusColor}`}
//                     >
//                       {inv.status}
//                     </span>
//                   </td>
//                   <td>{inv.date}</td>
//                   <td className="text-right">👁️</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState, useMemo } from "react";
import { api } from "../api/client";

export default function Dashboard() {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {
    try {

      const data = await api.get("/invoices");

      if (Array.isArray(data)) {
        setInvoices(data);
      } else {
        setInvoices([]);
      }

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // ✅ Calculate stats dynamically (UI unchanged)
  const stats = useMemo(() => {

    const total = invoices.length;

    const pending = invoices.filter(
      i =>
        i.status === "SUBMITTED" ||
        i.status === "DEPT_APPROVED" ||
        i.status === "FINANCE_APPROVED"
    ).length;

    const approved = invoices.filter(
      i =>
        i.status === "DEPT_APPROVED" ||
        i.status === "FINANCE_APPROVED"
    ).length;

    const paid = invoices.filter(
      i => i.status === "PAID"
    ).length;

    return [
      {
        label: "Total Invoices",
        value: total,
        color: "bg-indigo-100 text-indigo-600",
        icon: "📄",
      },
      {
        label: "Pending Approval",
        value: pending,
        color: "bg-yellow-100 text-yellow-600",
        icon: "⏳",
      },
      {
        label: "Approved",
        value: approved,
        color: "bg-green-100 text-green-600",
        icon: "✅",
      },
      {
        label: "Paid",
        value: paid,
        color: "bg-emerald-100 text-emerald-600",
        icon: "💰",
      },
    ];

  }, [invoices]);


  // ✅ Recent invoices logic (UI unchanged)
  const recentInvoices = useMemo(() => {

    return invoices.slice(0, 5).map(inv => {

      let statusColor = "bg-gray-100 text-gray-700";

      if (inv.status === "SUBMITTED")
        statusColor = "bg-yellow-100 text-yellow-700";

      if (inv.status === "DEPT_APPROVED")
        statusColor = "bg-blue-100 text-blue-700";

      if (inv.status === "FINANCE_APPROVED")
        statusColor = "bg-emerald-100 text-emerald-700";

      if (inv.status === "PAID")
        statusColor = "bg-green-100 text-green-700";

      return {

        id: inv.invoiceNumber,
        vendor: inv.vendor?.name || "Unknown",
        amount: `₹ ${inv.amount}`,
        status: formatStatus(inv.status),
        statusColor,
        date: new Date(inv.createdAt).toLocaleDateString(),

      };

    });

  }, [invoices]);


  function formatStatus(status) {

    if (status === "SUBMITTED") return "Submitted";
    if (status === "DEPT_APPROVED") return "Dept Approved";
    if (status === "FINANCE_APPROVED") return "Finance Approved";
    if (status === "PAID") return "Paid";
    if (status === "REJECTED") return "Rejected";

    return status;

  }


  if (loading)
    return <div className="p-6">Loading dashboard...</div>;


  return (

    <div className="space-y-8">

      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat) => (

          <div
            key={stat.label}
            className="bg-white p-5 rounded-lg shadow flex items-center gap-4"
          >

            <div
              className={`w-12 h-12 flex items-center justify-center rounded-lg text-xl ${stat.color}`}
            >
              {stat.icon}
            </div>

            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>

          </div>

        ))}

      </div>


      {/* Recent invoices */}
      <div className="bg-white rounded-lg shadow p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>

          <button className="text-sm text-indigo-600 hover:underline">
            View All
          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="text-left text-gray-500 border-b">
              <tr>
                <th className="py-3">Invoice</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {recentInvoices.map((inv) => (

                <tr
                  key={inv.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >

                  <td className="py-3 font-medium">{inv.id}</td>

                  <td>{inv.vendor}</td>

                  <td>{inv.amount}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${inv.statusColor}`}
                    >
                      {inv.status}
                    </span>
                  </td>

                  <td>{inv.date}</td>

                  <td className="text-right">👁️</td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}