import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types";

// ✅ טוען את המוצרים עם מלאי נמוך מה-API
const fetchLowStockProducts = async (): Promise<Product[]> => {
  const response = await fetch("http://localhost:5000/api/products/low-stock");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const raw = await response.json();

  // ✅ חשוב: משתמשים ב-product_id ולא ב-id, כי id שייך לטבלת low_stock_products
  return raw.map((product: any) => ({
    id: product.product_id, // ✅ זה ה-ID האמיתי של המוצר
    name: product.name,
    sku: product.sku,
    stockLevel: product.stock_level,
    lowStockThreshold: product.low_stock_threshold ?? 10,
    timestamp: product.timestamp,
    category: product.category ?? "",
    price: product.price ?? 0,
    cost: product.cost ?? 0,
    description: product.description ?? "",
  }));
};

// ✅ Hook לשימוש בנתוני מוצרים עם מלאי נמוך
export function useLowStockProducts() {
  return useQuery({
    queryKey: ["lowStockProducts"],
    queryFn: fetchLowStockProducts,
  });
}
