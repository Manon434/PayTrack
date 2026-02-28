

import { useEffect, useState } from "react";
import { api } from "../api/client";

export default function InvoiceActivity({ invoiceId }) {

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    load();
  }, [invoiceId]);

  async function load() {
    try {
      const data = await api.get(`/invoices/${invoiceId}/activity`);
      setLogs(data);
    } catch (err) {
      console.error("Activity load error:", err);
    }
  }

  return (
    <div className="bg-white shadow rounded p-6 space-y-4">

      <h2 className="text-xl font-semibold mb-4">
        Activity Timeline
      </h2>

      {logs.length === 0 && (
        <p className="text-gray-500">
          No activity recorded.
        </p>
      )}

      {logs.map(log => (
        <div
          key={log.id}
          className="border-l-4 border-indigo-500 pl-4"
        >
          {/* <p className="font-semibold">
            {log.action}
          </p> */}

          <p className="font-semibold">
          {log.action}
          </p>

           {log.metadata && (
         <p className="text-sm text-red-600 mt-1">
         Reason: {log.metadata}
         </p>
        )}

          <p className="text-sm text-gray-500">
            By {log.user?.email}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(log.createdAt).toLocaleString()}
          </p>
        </div>
      ))}

    </div>
  );
}