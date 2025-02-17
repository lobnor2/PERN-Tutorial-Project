import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
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
      <div className="flex mt-3 border border-blue-600 gap-3">
        <Link to={`/product/${product.id}`}>
          <Button variant={"outline"}>Edit</Button>
        </Link>
        <Button>Delete</Button>
      </div>
    </div>
  );
};

export default ProductCard;
