import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  const roleLabel = user?.role === "admin" ? "Admin" : "Vendor";

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center mb-6 rounded-lg">
      <h2 className="text-lg font-semibold">Welcome back</h2>
      <div className="text-right">
        <p className="text-sm font-medium text-slate-700">{user?.name || "Inventory User"}</p>
        <p className="text-xs text-gray-500">{roleLabel}</p>
      </div>
    </div>
  );
};

export default Navbar;
