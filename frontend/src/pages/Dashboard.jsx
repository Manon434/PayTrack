

// import { useEffect, useState, useMemo } from "react";
// import { api } from "../api/client";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from "recharts";

// export default function Dashboard() {

//   const [invoices, setInvoices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   /* ===============================
//      ANALYTICS STATE
//   =============================== */

//   const [monthlyData, setMonthlyData] = useState([]);
//   const [vendorData, setVendorData] = useState([]);
//   const [approval, setApproval] = useState(null);
//   const [payment, setPayment] = useState(null);

//   /* ===============================
//      LOAD DATA
//   =============================== */

//   useEffect(() => {
//     loadInvoices();
//     loadAnalytics();
//   }, []);

//   async function loadInvoices() {

//     try {

//       const data = await api.get("/invoices");

//       if (Array.isArray(data)) {
//         setInvoices(data);
//       } else if (data?.data) {
//         setInvoices(data.data);
//       } else {
//         setInvoices([]);
//       }

//     } catch (err) {

//       console.error("Invoice load error:", err);

//     } finally {

//       setLoading(false);

//     }

//   }

//   async function loadAnalytics() {

//     try {

//       const monthly =
//         await api.get("/analytics/monthly");

//       const vendor =
//         await api.get("/analytics/vendors");

//       const approval =
//         await api.get("/analytics/approval-time");

//       const payment =
//         await api.get("/analytics/payment-delay");

//       const formattedMonthly =
//         Object.entries(monthly).map(([k, v]) => ({
//           month: k,
//           invoices: v
//         }));

//       setMonthlyData(formattedMonthly);
//       setVendorData(vendor);
//       setApproval(approval.averageHours);
//       setPayment(payment.averagePaymentHours);

//     } catch (err) {

//       console.error("Analytics error:", err);

//     }

//   }

//   /* ===============================
//      STATS CARDS
//   =============================== */

//   const stats = useMemo(() => {

//     const total = invoices.length;

//     const pending = invoices.filter(
//       i =>
//         i.status === "SUBMITTED" ||
//         i.status === "DEPT_APPROVED" ||
//         i.status === "FINANCE_APPROVED"
//     ).length;

//     const approved = invoices.filter(
//       i =>
//         i.status === "DEPT_APPROVED" ||
//         i.status === "FINANCE_APPROVED"
//     ).length;

//     const paid = invoices.filter(
//       i => i.status === "PAID"
//     ).length;

//     return [
//       {
//         label: "Total Invoices",
//         value: total,
//         color: "bg-indigo-100 text-indigo-600",
//         icon: "📄",
//       },
//       {
//         label: "Pending Approval",
//         value: pending,
//         color: "bg-yellow-100 text-yellow-600",
//         icon: "⏳",
//       },
//       {
//         label: "Approved",
//         value: approved,
//         color: "bg-green-100 text-green-600",
//         icon: "✅",
//       },
//       {
//         label: "Paid",
//         value: paid,
//         color: "bg-emerald-100 text-emerald-600",
//         icon: "💰",
//       },
//     ];

//   }, [invoices]);

//   /* ===============================
//      RECENT INVOICES
//   =============================== */

//   const recentInvoices = useMemo(() => {

//     return invoices.slice(0, 5).map(inv => {

//       let statusColor = "bg-gray-100 text-gray-700";

//       if (inv.status === "SUBMITTED")
//         statusColor = "bg-yellow-100 text-yellow-700";

//       if (inv.status === "DEPT_APPROVED")
//         statusColor = "bg-blue-100 text-blue-700";

//       if (inv.status === "FINANCE_APPROVED")
//         statusColor = "bg-emerald-100 text-emerald-700";

//       if (inv.status === "PAID")
//         statusColor = "bg-green-100 text-green-700";

//       return {

//         id: inv.invoiceNumber,
//         vendor: inv.vendor?.name || "Unknown",
//         amount: `₹ ${inv.amount}`,
//         status: formatStatus(inv.status),
//         statusColor,
//         date: new Date(inv.createdAt).toLocaleDateString(),

//       };

//     });

//   }, [invoices]);

//   function formatStatus(status) {

//     if (status === "SUBMITTED") return "Submitted";
//     if (status === "DEPT_APPROVED") return "Dept Approved";
//     if (status === "FINANCE_APPROVED") return "Finance Approved";
//     if (status === "PAID") return "Paid";
//     if (status === "REJECTED") return "Rejected";

//     return status;

//   }

//   if (loading)
//     return <div className="p-6">Loading dashboard...</div>;

//   return (

//     <div className="space-y-8">

//       <h1 className="text-2xl font-bold">Dashboard</h1>

//       {/* ===============================
//          STATS
//       =============================== */}

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

//       {/* ===============================
//          ANALYTICS METRICS
//       =============================== */}

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

//         <div className="bg-white p-5 rounded-lg shadow">
//           <p className="text-sm text-gray-500">
//             Avg Approval Time
//           </p>
//           <p className="text-2xl font-semibold">
//             {approval || 0} hrs
//           </p>
//         </div>

//         <div className="bg-white p-5 rounded-lg shadow">
//           <p className="text-sm text-gray-500">
//             Avg Payment Delay
//           </p>
//           <p className="text-2xl font-semibold">
//             {payment || 0} hrs
//           </p>
//         </div>

//       </div>

//       {/* ===============================
//          CHARTS
//       =============================== */}

//       {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"> */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

// {/* {/* ===============================
//     MONTHLY INVOICE CHART
// =============================== */}

// <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6">

//   <h3 className="text-lg font-semibold mb-4">
//     Monthly Invoice Volume
//   </h3>

//   <ResponsiveContainer width="100%" height={260}>

//     <BarChart data={monthlyData}>

//       <defs>

//         <linearGradient id="invoiceGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9}/>
//           <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
//         </linearGradient>

//       </defs>

//       <XAxis dataKey="month" stroke="#6b7280"/>
//       <YAxis stroke="#6b7280"/>

//       <Tooltip
//         contentStyle={{
//           borderRadius: "12px",
//           border: "none",
//           boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
//         }}
//       />

//       <Bar
//         dataKey="invoices"
//         fill="url(#invoiceGradient)"
//         radius={[8,8,0,0]}
//       />

//     </BarChart>

//   </ResponsiveContainer>

// </div>


// {/* ===============================
//     VENDOR SPENDING CHART
// =============================== */}

// <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6">

//   <h3 className="text-lg font-semibold mb-4">
//     Vendor Spending
//   </h3>

//   <ResponsiveContainer width="100%" height={260}>

//     <BarChart data={vendorData}>

//       <defs>

//         <linearGradient id="vendorGradient" x1="0" y1="0" x2="0" y2="1">
//           <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.9}/>
//           <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.2}/>
//         </linearGradient>

//       </defs>

//       <XAxis dataKey="vendor" stroke="#6b7280"/>
//       <YAxis stroke="#6b7280"/>

//       <Tooltip
//         contentStyle={{
//           borderRadius: "12px",
//           border: "none",
//           boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
//         }}
//       />

//       <Bar
//         dataKey="total"
//         fill="url(#vendorGradient)"
//         radius={[8,8,0,0]}
//       />

//     </BarChart>

//   </ResponsiveContainer>

// </div>

// </div>


//         {/* Monthly invoices */}

//         <div className="bg-white p-5 rounded-lg shadow">

//           <h3 className="font-semibold mb-4">
//             Monthly Invoice Volume
//           </h3>

//           <ResponsiveContainer width="100%" height={250}>

//             <BarChart data={monthlyData}>

//               <XAxis dataKey="month" />
//               <YAxis />
//               <Tooltip />

//               <Bar dataKey="invoices" />

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//         {/* Vendor spending */}

//         <div className="bg-white p-5 rounded-lg shadow">

//           <h3 className="font-semibold mb-4">
//             Vendor Spending
//           </h3>

//           <ResponsiveContainer width="100%" height={250}>

//             <BarChart data={vendorData}>

//               <XAxis dataKey="vendor" />
//               <YAxis />
//               <Tooltip />

//               <Bar dataKey="total" />

//             </BarChart>

//           </ResponsiveContainer>

//         </div>

//       </div> */}

//       {/* ===============================
//          RECENT INVOICES
//       =============================== */}

//       <div className="bg-white rounded-lg shadow p-6">

//         <div className="flex justify-between items-center mb-4">

//           <h2 className="text-lg font-semibold">
//             Recent Invoices
//           </h2>

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

//                   <td className="py-3 font-medium">
//                     {inv.id}
//                   </td>

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

//                   <td className="text-right">
//                     👁️
//                   </td>

//                 </tr>

//               ))}

//             </tbody>

//           </table>

//         </div>

//       </div>

//     </div>

//   );

// }



// import { useEffect, useState, useMemo } from "react";
// import { api } from "../api/client";

// import DashboardStats from "../components/dashboard/DashboardStats";
// import DashboardCharts from "../components/dashboard/DashboardCharts";
// import RecentInvoices from "../components/dashboard/RecentInvoices";

// export default function Dashboard() {

//   const [invoices, setInvoices] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [vendorData, setVendorData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadInvoices();
//     loadAnalytics();
//   }, []);

//   async function loadInvoices() {

//     try {

//       const data = await api.get("/invoices");

//       if (Array.isArray(data)) setInvoices(data);
//       else if (data?.data) setInvoices(data.data);

//     } catch (err) {

//       console.error(err);

//     } finally {

//       setLoading(false);

//     }

//   }

//   async function loadAnalytics() {

//     try {

//       const monthly =
//         await api.get("/analytics/monthly");

//       const vendor =
//         await api.get("/analytics/vendors");

//       const formattedMonthly =
//         Object.entries(monthly).map(([k,v])=>({
//           month:k,
//           invoices:v
//         }));

//       setMonthlyData(formattedMonthly);
//       setVendorData(vendor);

//     } catch (err) {

//       console.error(err);

//     }

//   }

//   const stats = useMemo(()=>{

//     const total = invoices.length;

//     const paid =
//       invoices.filter(i=>i.status==="PAID").length;

//     const approved =
//       invoices.filter(i=>
//         i.status==="DEPT_APPROVED" ||
//         i.status==="FINANCE_APPROVED"
//       ).length;

//     const pending =
//       invoices.filter(i=>
//         i.status==="SUBMITTED"
//       ).length;

//     return [

//       {
//         label:"Total Invoices",
//         value:total,
//         icon:"📄",
//         color:"bg-indigo-100 text-indigo-600"
//       },

//       {
//         label:"Pending Approval",
//         value:pending,
//         icon:"⏳",
//         color:"bg-yellow-100 text-yellow-600"
//       },

//       {
//         label:"Approved",
//         value:approved,
//         icon:"✅",
//         color:"bg-green-100 text-green-600"
//       },

//       {
//         label:"Paid",
//         value:paid,
//         icon:"💰",
//         color:"bg-emerald-100 text-emerald-600"
//       }

//     ];

//   },[invoices]);

//   const recentInvoices = useMemo(()=>{

//     return invoices.slice(0,5).map(inv=>({

//       id:inv.invoiceNumber,
//       vendor:inv.vendor?.name || "Unknown",
//       amount:`₹ ${inv.amount}`,
//       status:inv.status,
//       statusColor:"bg-gray-100 text-gray-700",
//       date:new Date(inv.createdAt).toLocaleDateString()

//     }));

//   },[invoices]);

//   if (loading)
//     return <div className="p-6">Loading dashboard...</div>;

//   return (

//     <div className="space-y-8">

//       <h1 className="text-2xl font-bold">
//         Dashboard
//       </h1>

//       <DashboardStats stats={stats}/>

//       <DashboardCharts
//         monthlyData={monthlyData}
//         vendorData={vendorData}
//       />

//       <RecentInvoices invoices={recentInvoices}/>

//     </div>

//   );

// }

import { useMemo } from "react";
import { FileText, Clock, CheckCircle, Wallet } from "lucide-react";

const invoices = [
  { id: "INV-2024-001", vendor: "Acme Corp", amount: 15750, status: "PAID", date: "Jan 15, 2024" },
  { id: "INV-2024-006", vendor: "Acme Corp", amount: 3200, status: "DRAFT", date: "Jan 27, 2024" },
  { id: "INV-2024-005", vendor: "CloudTech Solutions", amount: 12800, status: "SUBMITTED", date: "Jan 26, 2024" },
  { id: "INV-2024-002", vendor: "TechSupply Inc", amount: 8320.5, status: "FINANCE_APPROVED", date: "Jan 20, 2024" },
  { id: "INV-2024-004", vendor: "Global Services Ltd", amount: 45000, status: "SUBMITTED", date: "Jan 25, 2024" }
];

const formatINR = (amt) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(amt);

export default function Dashboard() {

  const stats = useMemo(() => ({
    total: invoices.length,
    pending: invoices.filter(i => i.status === "SUBMITTED").length,
    approved: invoices.filter(i => i.status === "FINANCE_APPROVED").length,
    paid: invoices.filter(i => i.status === "PAID").length
  }), []);

  const cardStyle =
    "bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition";

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

      {/* 🔥 Cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">

        <div className={`${cardStyle}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Invoices</p>
              <h2 className="text-2xl font-bold">{stats.total}</h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-xl">
              <FileText className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className={`${cardStyle}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Pending Approval</p>
              <h2 className="text-2xl font-bold">{stats.pending}</h2>
            </div>
            <div className="bg-yellow-100 p-3 rounded-xl">
              <Clock className="text-yellow-600" />
            </div>
          </div>
        </div>

        <div className={`${cardStyle}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Approved</p>
              <h2 className="text-2xl font-bold">{stats.approved}</h2>
            </div>
            <div className="bg-green-100 p-3 rounded-xl">
              <CheckCircle className="text-green-600" />
            </div>
          </div>
        </div>

        <div className={`${cardStyle}`}>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Paid</p>
              <h2 className="text-2xl font-bold">{stats.paid}</h2>
            </div>
            <div className="bg-purple-100 p-3 rounded-xl">
              <Wallet className="text-purple-600" />
            </div>
          </div>
        </div>

      </div>

      {/* 🔥 Table */}
      <div className="bg-white rounded-2xl shadow-sm border">

        <div className="p-5 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Recent Invoices</h2>
          <span className="text-blue-600 cursor-pointer hover:underline">
            View all →
          </span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4">Invoice Number</th>
              <th className="p-4">Vendor</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Created</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="border-t hover:bg-gray-50 transition">
                <td className="p-4 text-blue-600 font-medium">{inv.id}</td>
                <td className="p-4">{inv.vendor}</td>
                <td className="p-4">{formatINR(inv.amount)}</td>

                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-sm
                    ${inv.status === "PAID" && "bg-green-100 text-green-700"}
                    ${inv.status === "DRAFT" && "bg-gray-200 text-gray-600"}
                    ${inv.status === "SUBMITTED" && "bg-yellow-100 text-yellow-700"}
                    ${inv.status === "FINANCE_APPROVED" && "bg-blue-100 text-blue-700"}
                  `}>
                    {inv.status.replace("_", " ")}
                  </span>
                </td>

                <td className="p-4 text-gray-500">{inv.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}