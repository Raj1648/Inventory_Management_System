import { Search, ShoppingCart, Filter, MoreHorizontal } from "lucide-react";

const Orders = () => {
  const dummyOrders = [
    { id: "ORD-7032", customer: "Acme Corp", date: "Oct 24, 2026", total: "₹1,240", status: "Completed" },
    { id: "ORD-7033", customer: "Global Tech", date: "Oct 24, 2026", total: "₹890", status: "Processing" },
    { id: "ORD-7034", customer: "Stark Industries", date: "Oct 23, 2026", total: "₹15,400", status: "Shipped" },
    { id: "ORD-7035", customer: "Wayne Enterprises", date: "Oct 22, 2026", total: "₹4,200", status: "Completed" },
    { id: "ORD-7036", customer: "Daily Planet", date: "Oct 21, 2026", total: "₹350", status: "Cancelled" },
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case "Completed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Processing": return "bg-amber-50 text-amber-700 border-amber-100";
      case "Shipped": return "bg-blue-50 text-blue-700 border-blue-100";
      case "Cancelled": return "bg-rose-50 text-rose-700 border-rose-100";
      default: return "bg-slate-50 text-slate-700 border-slate-100";
    }
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Orders</h1>
          <p className="text-slate-500 mt-1">Track and manage incoming customer orders.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search orders..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-2 border border-slate-200 bg-white rounded-xl hover:bg-slate-50 text-slate-600 transition-colors shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Order ID</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {dummyOrders.map((order, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-medium text-slate-800">{order.id}</td>
                  <td className="p-4 text-slate-600">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {order.customer.charAt(0)}
                      </div>
                      {order.customer}
                    </div>
                  </td>
                  <td className="p-4 text-slate-500">{order.date}</td>
                  <td className="p-4 font-medium text-slate-800">{order.total}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
          <p>Showing <span className="font-medium text-slate-800">1</span> to <span className="font-medium text-slate-800">5</span> of <span className="font-medium text-slate-800">12</span> orders</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1 border border-slate-200 rounded hover:bg-slate-50 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
