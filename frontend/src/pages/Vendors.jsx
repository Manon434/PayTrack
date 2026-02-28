const vendors = [
  {
    id: 1,
    name: "Acme Corporation",
    invoices: 5,
    total: 52000,
    status: "Active",
  },
  {
    id: 2,
    name: "TechSupply Inc",
    invoices: 3,
    total: 20920,
    status: "Active",
  },
  {
    id: 3,
    name: "Office Essentials",
    invoices: 2,
    total: 3230,
    status: "Inactive",
  },
];

export default function Vendors() {
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Vendors</h1>

      <div className="grid grid-cols-3 gap-6">
        {vendors.map((vendor) => (
          <div
            key={vendor.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <h2 className="text-lg font-semibold mb-2">
              {vendor.name}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              Total Invoices: {vendor.invoices}
            </p>

            <p className="text-xl font-bold mb-4">
              ₹ {vendor.total.toLocaleString("en-IN")}
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm ${
                vendor.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {vendor.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
