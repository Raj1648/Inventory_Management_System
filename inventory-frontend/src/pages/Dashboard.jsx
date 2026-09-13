import { useAuth } from "../context/AuthContext";
import { TrendingUp, Package, ShoppingBag, ArrowUpRight, DollarSign, Activity } from "lucide-react";
import ClearanceSuggestions from "../components/ClearanceSuggestions";

const Dashboard = () => {
  const { user } = useAuth();
  
  const metrics = [
    { title: "Total Products", value: "1,248", change: "+12%", icon: <Package className="text-indigo-500" size={24} />, trend: "up" },
    { title: "Active Orders", value: "84", change: "+5%", icon: <ShoppingBag className="text-emerald-500" size={24} />, trend: "up" },
    { title: "Revenue (MTD)", value: "₹45,230", change: "-2%", icon: <DollarSign className="text-amber-500" size={24} />, trend: "down" },
    { title: "System Health", value: "99.9%", change: "Optimal", icon: <Activity className="text-blue-500" size={24} />, trend: "neutral" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome back, {user?.name.split(' ')[0]} </h1>
        <p className="text-slate-500 mt-2 text-lg">Here's what's happening with your inventory today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            {/* Decorative background glow behind icon */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-50 rounded-full group-hover:bg-indigo-50 transition-colors opacity-50 -z-10"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-white transition-colors border border-slate-100">
                {metric.icon}
              </div>
              <span className={`flex items-center text-sm font-medium px-2.5 py-1 rounded-full ${
                metric.trend === 'up' ? 'text-emerald-700 bg-emerald-50' : 
                metric.trend === 'down' ? 'text-rose-700 bg-rose-50' : 'text-slate-600 bg-slate-100'
              }`}>
                {metric.trend === 'up' && <TrendingUp size={14} className="mr-1" />}
                {metric.change}
              </span>
            </div>
            
            <div>
              <h2 className="text-slate-500 font-medium">{metric.title}</h2>
              <p className="text-3xl font-bold text-slate-800 mt-1">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6 min-h-[400px]">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-bold text-slate-800">Revenue Overview</h3>
             <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center">
               View Report <ArrowUpRight size={16} className="ml-1" />
             </button>
           </div>
           
           {/* Placeholder for a chart */}
           <div className="w-full h-[300px] flex items-center justify-center border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 relative overflow-hidden mb-6">
             <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 to-emerald-500/5"></div>
             <p className="text-slate-400 font-medium flex items-center">
               <Activity className="mr-2" /> Chart integration goes here
             </p>
           </div>
           
           <ClearanceSuggestions />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h3>
           <div className="space-y-6">
             {[
               { user: "Admin User", action: "added a new product", item: "MacBook Pro M3", time: "2 hours ago" },
               { user: "Vendor One", action: "updated inventory for", item: "AirPods Pro", time: "4 hours ago" },
               { user: "System", action: "processed order", item: "#ORD-8923", time: "5 hours ago" },
               { user: "Admin User", action: "deleted product", item: "Legacy Mouse", time: "1 day ago" },
             ].map((activity, i) => (
               <div key={i} className="flex gap-4">
                 <div className="w-2 h-2 mt-2 rounded-full bg-indigo-500 flex-shrink-0"></div>
                 <div>
                   <p className="text-sm text-slate-800">
                     <span className="font-semibold">{activity.user}</span> {activity.action} <span className="font-medium text-indigo-600">{activity.item}</span>
                   </p>
                   <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;