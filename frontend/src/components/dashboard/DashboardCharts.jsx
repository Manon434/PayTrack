import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
  } from "recharts";
  
  export default function DashboardCharts({ monthlyData, vendorData }) {
  
    return (
  
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  
        {/* Monthly invoices */}
  
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6">
  
          <h3 className="text-lg font-semibold mb-4">
            Monthly Invoice Volume
          </h3>
  
          <ResponsiveContainer width="100%" height={260}>
  
            <BarChart data={monthlyData}>
  
              <defs>
  
                <linearGradient id="invoiceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2}/>
                </linearGradient>
  
              </defs>
  
              <XAxis dataKey="month"/>
              <YAxis/>
  
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                }}
              />
  
              <Bar
                dataKey="invoices"
                fill="url(#invoiceGradient)"
                radius={[8,8,0,0]}
              />
  
            </BarChart>
  
          </ResponsiveContainer>
  
        </div>
  
  
        {/* Vendor spending */}
  
        <div className="bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6">
  
          <h3 className="text-lg font-semibold mb-4">
            Vendor Spending
          </h3>
  
          <ResponsiveContainer width="100%" height={260}>
  
            <BarChart data={vendorData}>
  
              <defs>
  
                <linearGradient id="vendorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14B8A6" stopOpacity={0.9}/>
                  <stop offset="95%" stopColor="#14B8A6" stopOpacity={0.2}/>
                </linearGradient>
  
              </defs>
  
              <XAxis dataKey="vendor"/>
              <YAxis/>
  
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  border: "none",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.1)"
                }}
              />
  
              <Bar
                dataKey="total"
                fill="url(#vendorGradient)"
                radius={[8,8,0,0]}
              />
  
            </BarChart>
  
          </ResponsiveContainer>
  
        </div>
  
      </div>
  
    );
  
  }

