import { useEffect, useState } from "react";
import { env } from "../../config/env";
import {
  CircleDollarSign,
  Package,
  AlertCircle,
  Loader2,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

export const PricingEngine = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${env.VITE_API_BASE_URL}/products`);
        const data = await res.json();
        let productList = data?.data || data || [];

        // Sort products: Items where we are undercut (our price > comp price) float to the top
        productList.sort((a: any, b: any) => {
          const aCompPrice = a.competitorPrice?.competitorPrice || a.basePrice;
          const bCompPrice = b.competitorPrice?.competitorPrice || b.basePrice;
          const aDiff = a.basePrice - aCompPrice;
          const bDiff = b.basePrice - bCompPrice;
          return bDiff - aDiff;
        });

        setProducts(productList);
      } catch (error) {
        console.error("Failed to fetch products for pricing", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const totalProducts = products.length;
  const undercutCount = products.filter(
    (p) => p.basePrice > (p.competitorPrice?.competitorPrice || p.basePrice),
  ).length;

  return (
    <div className="p-6 h-full flex flex-col bg-[#F3F0FF] dark:bg-[#1E1B24] overflow-hidden">
      {/* Header & Stats Cards */}
      <div className="mb-6 shrink-0">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-[#4A3D63] dark:text-[#BCA3E0] flex items-center gap-2">
            <CircleDollarSign className="text-[#8264C2] dark:text-[#967BB6]" />
            Pricing Engine
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Dynamic competitor monitoring. Identify where you are losing price
            competitiveness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-[#E5E0F1] dark:border-[#3B3446] bg-white dark:bg-[#2A2533] shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#EADAFF]/50 dark:bg-[#3B3446] text-[#8264C2] dark:text-[#BCA3E0]">
              <Package size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Monitored Products
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-[#E2DFE7]">
                {totalProducts}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-500/5 shadow-sm flex items-center gap-4">
            <div className="p-3 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400">
              <AlertCircle size={24} />
            </div>
            <div>
              <p className="text-sm text-red-600/80 dark:text-red-400/80 font-medium">
                Price Undercut Risk
              </p>
              <p className="text-2xl font-bold text-red-700 dark:text-red-400">
                {undercutCount}{" "}
                <span className="text-sm font-normal">items</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Data Table */}
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
                <th className="px-6 py-4 font-semibold">Our Price</th>
                <th className="px-6 py-4 font-semibold">Competitor</th>
                <th className="px-6 py-4 font-semibold">Comp Price</th>
                <th className="px-6 py-4 font-semibold">Competitive Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0F1] dark:divide-[#3B3446]">
              {products.map((product) => {
                const compPrice = product.competitorPrice?.competitorPrice;
                const compName =
                  product.competitorPrice?.competitorName || "Unknown";

                let statusUI;
                if (!compPrice || product.basePrice === compPrice) {
                  statusUI = (
                    <span className="text-gray-500 dark:text-gray-400 font-medium">
                      Price Matched
                    </span>
                  );
                } else if (product.basePrice > compPrice) {
                  const diff = product.basePrice - compPrice;
                  statusUI = (
                    <span className="inline-flex items-center gap-1.5 text-red-600 dark:text-red-400 font-medium">
                      <TrendingDown size={16} /> Higher by ${diff.toFixed(2)}
                    </span>
                  );
                } else {
                  const diff = compPrice - product.basePrice;
                  statusUI = (
                    <span className="inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                      <TrendingUp size={16} /> Cheaper by ${diff.toFixed(2)}
                    </span>
                  );
                }

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-[#F8F7FA] dark:hover:bg-[#3B3446]/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-[#E2DFE7]">
                      {product.name}
                      <span className="block text-xs font-normal text-gray-400 mt-0.5">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-[#E2DFE7]">
                      ${product.basePrice?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">
                      {compName}
                    </td>
                    <td className="px-6 py-4">
                      ${compPrice?.toFixed(2) || "N/A"}
                    </td>
                    <td className="px-6 py-4">{statusUI}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
