import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import { useAuth } from "../context/AuthContext";
import ProductModal from "../components/ProductModal";
import { Plus, Edit2, Trash2, PackageSearch, AlertCircle } from "lucide-react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(25);
  const { user } = useAuth();

  const loadProducts = async (currentPage = page) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetchWithAuth(`/products?page=${currentPage}&limit=25`);

      if (!res.ok) {
        let message = `Failed to load products (${res.status})`;

        try {
          const errorPayload = await res.json();
          message = errorPayload?.message || message;
        } catch {
          // Keep the fallback message when the server does not return JSON.
        }

        setProducts([]);
        setTotalItems(0);
        setTotalPages(1);
        setError(message);
        return;
      }

      const responseData = await res.json();

      if (responseData.metadata) {
        setProducts(responseData.data);
        setTotalItems(responseData.metadata.totalItems || 0);
        setTotalPages(responseData.metadata.totalPages || 1);
        setPage(responseData.metadata.currentPage || currentPage);
        setPageSize(responseData.metadata.limit || 25);
      } else {
        setProducts(responseData);
        setTotalItems(Array.isArray(responseData) ? responseData.length : 0);
        setTotalPages(1);
        setPage(currentPage);
        setPageSize(25);
      }
    } catch (err) {
      console.error("Failed to load products. Error:", err);
      setProducts([]);
      setTotalItems(0);
      setTotalPages(1);
      setError("Could not connect to the products API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const rangeStart = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = totalItems === 0 ? 0 : rangeStart + products.length - 1;

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetchWithAuth(`/products/${id}`, { method: "DELETE" });
        if (res.ok) {
          loadProducts(); // refresh
        } else {
          alert("Failed to delete product.");
        }
      } catch (err) {
        alert("Error deleting product.");
      }
    }
  };

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="animate-in fade-in duration-500 pb-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Products</h1>
          <p className="text-slate-500 mt-1">Manage your inventory, pricing, and stock levels.</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
            <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-slate-600">
              {user?.role === "admin" ? "Marketplace catalog" : "Vendor catalog"}
            </span>
            <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
              {totalItems.toLocaleString()} total products
            </span>
            {!loading && !error && totalItems > 0 && (
              <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
                Showing {rangeStart.toLocaleString()}-{rangeEnd.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:bg-indigo-700 hover:shadow transition-all flex items-center gap-2 font-medium"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product Name</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">SKU</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Added On</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock Level</th>
                <th className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                 <tr>
                 <td colSpan="6" className="p-8 text-center text-slate-400">
                   <div className="flex flex-col items-center justify-center">
                     <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3"></div>
                     <p>Loading products...</p>
                   </div>
                 </td>
               </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                        <AlertCircle size={32} className="text-rose-500" />
                      </div>
                      <p className="text-lg font-medium text-slate-700">Unable to load products</p>
                      <p className="text-sm text-slate-500 mt-1 max-w-md">{error}</p>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                        <PackageSearch size={32} className="text-slate-400" />
                      </div>
                      <p className="text-lg font-medium text-slate-700">No products found</p>
                      <p className="text-sm text-slate-500 mt-1 max-w-sm">You haven't added any products yet. Click the "Add Product" button to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id || p.product_id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-sm">
                          {p.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-800">{p.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 font-mono text-sm">{p.sku}</td>
                    <td className="p-4 font-medium text-slate-800">₹{parseFloat(p.price).toFixed(2)}</td>
                    <td className="p-4 text-slate-500 text-sm">
                      {p.created_at ? new Date(p.created_at).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="p-4">
                      {p.stock <= 5 ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100">
                          <AlertCircle size={12} /> Low Stock ({p.stock || 0})
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          In Stock ({p.stock})
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleOpenEditModal(p)}
                          className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        
                        {/* Only admin can delete */}
                        {user?.role === "admin" && (
                          <button 
                            onClick={() => handleDelete(p.id || p.product_id)}
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
             <div className="text-sm text-slate-500">
                Showing <span className="font-medium text-slate-700">{rangeStart.toLocaleString()}-{rangeEnd.toLocaleString()}</span> of <span className="font-medium text-slate-700">{totalItems.toLocaleString()}</span> products
             </div>
             <div className="flex gap-2">
                <button 
                  disabled={page <= 1} 
                  onClick={() => loadProducts(page - 1)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button 
                  disabled={page >= totalPages} 
                  onClick={() => loadProducts(page + 1)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
             </div>
          </div>
        )}
      </div>

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={loadProducts}
      />
    </div>
  );
};

export default Products;
