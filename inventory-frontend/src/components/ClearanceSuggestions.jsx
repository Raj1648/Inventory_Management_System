import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/api";
import { Tag, AlertTriangle, ArrowRight } from "lucide-react";

const ClearanceSuggestions = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadSuggestions = async () => {
    try {
      const res = await fetchWithAuth("/products/suggestions");
      if (res.ok) {
        const data = await res.json();
        setSuggestions(data.data || []);
      }
    } catch (err) {
      console.error("Failed to load suggestions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSuggestions();
  }, []);

  const handlePutOnSale = async (product) => {
    const discountStr = window.prompt(`Enter discount percentage for ${product.name} (e.g., 20 for 20%):`);
    if (!discountStr) return;
    
    const discount = parseFloat(discountStr);
    if (isNaN(discount) || discount <= 0 || discount >= 100) {
      alert("Please enter a valid percentage between 1 and 99.");
      return;
    }

    const currentPrice = parseFloat(product.price);
    const newPrice = currentPrice * (1 - discount / 100);

    if (window.confirm(`The new price will be ₹${newPrice.toFixed(2)}. Proceed?`)) {
      try {
        const res = await fetchWithAuth(`/products/${product.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...product,
            unit_price: newPrice.toFixed(2)
          }),
        });

        if (res.ok) {
          alert("Product updated successfully!");
          loadSuggestions(); // Reload suggestions
        } else {
          alert("Failed to update product.");
        }
      } catch (err) {
        alert("Error updating product.");
        console.error(err);
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Tag className="mr-2 text-rose-500" /> Clearance Suggestions
        </h3>
        <p className="text-slate-500 text-sm">Loading suggestions...</p>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center">
          <Tag className="mr-2 text-rose-500" /> Clearance Suggestions
        </h3>
        <p className="text-slate-500 text-sm">No old, low-quantity stock found right now. Great job managing inventory!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-rose-100 p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <AlertTriangle size={100} className="text-rose-500" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center relative z-10">
        <Tag className="mr-2 text-rose-500" /> Clearance Suggestions
      </h3>
      <p className="text-sm text-slate-500 mb-6 relative z-10">
        These items have low stock and have been in the warehouse for over 6 months. Consider applying a discount.
      </p>

      <div className="space-y-4 relative z-10 max-h-[300px] overflow-y-auto pr-2">
        {suggestions.map((p) => (
          <div key={p.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-slate-50 rounded-xl border border-slate-100 gap-4">
            <div>
              <h4 className="font-semibold text-slate-800">{p.name}</h4>
              <div className="text-xs text-slate-500 mt-1 flex gap-3">
                <span>SKU: {p.sku}</span>
                <span className="font-medium text-rose-600">Stock: {p.stock}</span>
                <span>Price: ₹{parseFloat(p.price).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={() => handlePutOnSale(p)}
              className="bg-white border border-rose-200 text-rose-600 px-4 py-2 rounded-lg shadow-sm hover:bg-rose-50 transition-colors text-sm font-medium flex items-center whitespace-nowrap"
            >
              Put on Sale <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClearanceSuggestions;
