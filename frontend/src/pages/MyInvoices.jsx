import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function MyInvoices() {

  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    loadInvoices();
  }, []);

  async function loadInvoices() {

    try {

      const data = await api.get("/invoices/my");

      setInvoices(data);

    } catch (err) {

      alert(err.message);

    }

  }

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        My Invoices
      </h1>

      <table className="w-full bg-white rounded shadow">

        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Invoice</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Status</th>
            <th className="p-3">Paid At</th>
          </tr>
        </thead>

        <tbody>

          {invoices.map(inv => (

            <tr key={inv.id}>

              <td className="p-3">
                {inv.invoiceNumber}
              </td>

              <td className="p-3">
                ₹ {inv.amount}
              </td>

              <td className="p-3">
                {inv.status}
              </td>

              <td className="p-3">

                {inv.paidAt
                  ? new Date(inv.paidAt)
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