import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/useProductStore";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();
  return (
    <div
      key={product.id}
      className="border border-red-700 flex flex-col justify-between items-center p-5"
    >
      <div className="border border-blue-500 flex flex-col items-center">
        <div>
          <img
            src={product.image}
            className="aspect-4/3 object-contain"
            alt={product.name}
          />
        </div>
        <div>{product.name}</div>
        <div>${product.price}</div>
      </div>
      <div className="flex mt-3 border border-blue-600 gap-5 w-full justify-center">
        <Link to={`/product/${product.id}`}>
          <Button variant={"outline"} className="cursor-pointer">
            Edit
          </Button>
        </Link>
        <Button
          onClick={() => deleteProduct(product.id)}
          className="cursor-pointer"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
