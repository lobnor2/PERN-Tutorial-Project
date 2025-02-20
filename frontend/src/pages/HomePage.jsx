import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/useProductStore";
import React, { useEffect } from "react";
import { RefreshCcw } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const {
    products,
    loading,
    error,
    fetchProducts,
    isOpen,
    setIsOpen,
    addProduct,
    setFormData,
    formData,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div className="flex items-center justify-between px-5 mt-5">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="cursor-pointer" variant="outline">
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form onSubmit={addProduct}>
              <div className="grid gap-4 py-4">
                <div className="">
                  <Input
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        name: e.target.value,
                      })
                    }
                    placeholder="Product Name"
                  />
                </div>
                <div className="">
                  <Input
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: e.target.value,
                      })
                    }
                    type="number"
                    placeholder="$ 0.00"
                  />
                </div>
                <div className="">
                  <Input
                    required
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                    type="url"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              <DialogFooter className="">
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Product"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button className="w-16 cursor-pointer" onClick={fetchProducts}>
          <RefreshCcw className="" />
        </Button>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      {products.length === 0 && !loading && (
        <div className="flex items-center justify-center text-3xl">
          No products found
        </div>
      )}
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
