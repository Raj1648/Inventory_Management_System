import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { LayoutDashboard, Package, ShoppingCart, LogOut, UserCircle } from "lucide-react";

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-slate-50 font-sans">

      {/* Sidebar */}
      <div className="w-72 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Package className="text-white" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Nexus<span className="text-indigo-400">Inventory</span></h2>
        </div>

        <nav className="space-y-1.5 px-4 flex-grow mt-4">
          <NavLink to="/" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "hover:bg-slate-800 hover:text-white"
            }`
          }>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>

          <NavLink to="/products" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "hover:bg-slate-800 hover:text-white"
            }`
          }>
            <Package size={20} />
            Products
          </NavLink>

          <NavLink to="/orders" className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
              isActive ? "bg-indigo-500/10 text-indigo-400 font-medium" : "hover:bg-slate-800 hover:text-white"
            }`
          }>
            <ShoppingCart size={20} />
            Orders
          </NavLink>
        </nav>
        
        {/* User Info & Logout */}
        {user && (
          <div className="mt-auto p-4 m-4 bg-slate-800/50 rounded-2xl border border-slate-700/50">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <UserCircle className="text-indigo-400" size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 capitalize flex items-center gap-1 mt-0.5">
                  <span className={`w-2 h-2 rounded-full ${user.role === 'admin' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                  {user.role} Account
                </p>
              </div>
            </div>
            <button 
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-colors text-sm font-medium"
            >
                <LogOut size={16} />
                Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Subtle background gradient */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-indigo-50 to-transparent -z-10"></div>
          
          <div className="flex-1 p-8 overflow-auto">
              <Navbar />
              {children}
          </div>
      </div>

    </div>
  );
};

export default MainLayout;