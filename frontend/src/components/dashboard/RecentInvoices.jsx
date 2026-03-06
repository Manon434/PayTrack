export default function RecentInvoices({ invoices }) {

    return (
  
      <div className="bg-white rounded-lg shadow p-6">
  
        <h2 className="text-lg font-semibold mb-4">
          Recent Invoices
        </h2>
  
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
  
              {invoices.map((inv) => (
  
                <tr
                  key={inv.id}
                  className="border-b last:border-none hover:bg-gray-50"
                >
  
                  <td className="py-3 font-medium">
                    {inv.id}
                  </td>
  
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
  
    );
  
  }

