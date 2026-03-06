export default function DashboardStats({ stats }) {

    return (
  
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
  
    );
  
  }


