export default function Settings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-500">
          Manage your account and application preferences
        </p>
      </div>

      {/* ================= PROFILE INFORMATION ================= */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-1">
          Profile Information
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Update your personal information and contact details
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm block mb-1">First Name</label>
            <input
              type="text"
              placeholder="John"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm block mb-1">Email</label>
          <input
            type="email"
            placeholder="john.doe@company.com"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div className="mt-4">
          <label className="text-sm block mb-1">Department</label>
          <input
            type="text"
            placeholder="Finance"
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button className="mt-6 px-5 py-2 bg-indigo-600 text-white rounded-md">
          Save Changes
        </button>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-1">
          Notifications
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Configure how you receive notifications
        </p>

        <div className="space-y-4">
          <Toggle
            title="Email Notifications"
            desc="Receive email updates for invoice activities"
          />
          <Toggle
            title="Approval Reminders"
            desc="Get reminded about pending approvals"
          />
          <Toggle
            title="Payment Notifications"
            desc="Notifications when payments are processed"
          />
        </div>
      </div>

      {/* ================= COMPANY SETTINGS ================= */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-1">
          Company Settings
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Company-wide configuration (Admin only)
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-sm block mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Acme Corporation"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm block mb-1">Default Currency</label>
            <input
              type="text"
              placeholder="USD"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          <Toggle
            title="Require Finance Approval"
            desc="All invoices must be approved by finance"
          />
        </div>
      </div>
    </div>
  );
}

/* ================= TOGGLE COMPONENT ================= */
function Toggle({ title, desc }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
      <input type="checkbox" className="h-5 w-5" />
    </div>
  );
}
