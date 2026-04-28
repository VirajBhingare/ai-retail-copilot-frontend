import { Package, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { env } from "../../config/env";

export const InventoryHub = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${env.VITE_API_BASE_URL}/products`);
        const data = await res.json();
        // Handle both standard arrays or wrapped { data: [...] } API responses
        setProducts(data?.data || data || []);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-6 h-full flex flex-col bg-[#F3F0FF] dark:bg-[#1E1B24] overflow-hidden">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4A3D63] dark:text-[#BCA3E0] flex items-center gap-2">
            <Package className="text-[#8264C2] dark:text-[#967BB6]" />
            Inventory Hub
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Real-time overview of your product catalog and stock levels.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-auto rounded-xl border border-[#E5E0F1] dark:border-[#3B3446] bg-white dark:bg-[#2A2533] shadow-sm">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <Loader2
              size={32}
              className="animate-spin text-[#8264C2] dark:text-[#967BB6]"
            />
          </div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 relative">
            <thead className="sticky top-0 bg-[#F8F7FA] dark:bg-[#15131A] text-xs uppercase text-gray-500 dark:text-gray-400 border-b border-[#E5E0F1] dark:border-[#3B3446] z-10">
              <tr>
                <th className="px-6 py-4 font-semibold">Product Name</th>
                <th className="px-6 py-4 font-semibold">Category</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0F1] dark:divide-[#3B3446]">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#F8F7FA] dark:hover:bg-[#3B3446]/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 dark:text-[#E2DFE7]">
                    {product.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-[#EADAFF]/50 dark:bg-[#3B3446] px-2 py-1 text-xs font-medium text-[#8264C2] dark:text-[#BCA3E0] ring-1 ring-inset ring-[#D5C6EB] dark:ring-[#4A3D63]">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    ${product.basePrice?.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    {product.inventory?.stockLevel} units
                  </td>
                  <td className="px-6 py-4">
                    {product.inventory?.status === "IN_STOCK" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>{" "}
                        In Stock
                      </span>
                    )}
                    {product.inventory?.status === "LOW_STOCK" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>{" "}
                        Low Stock
                      </span>
                    )}
                    {product.inventory?.status === "OUT_OF_STOCK" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700 dark:bg-red-500/10 dark:text-red-400">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>{" "}
                        Out of Stock
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
