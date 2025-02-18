import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="flex items-center justify-between px-5 mt-5">
        <Button className="cursor-pointer" variant="outline">
          Add Product
        </Button>
        <Button className="w-16 cursor-pointer" onClick={fetchProducts}>
          <RefreshCcw className="" />
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {loading ? (
        <div className="flex items-center justify-center text-3xl">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5 border border-green-700 p-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
